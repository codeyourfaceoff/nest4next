import { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Server } from 'http';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { extractApiRouteFromPath } from './extract-api-route-from-path';

export function bootstrapServer<HandlerType = unknown>({
  module,
  path = extractApiRouteFromPath() || 'api/route',
  options = { bodyParser: true }, // default to use nestjs' bodyParsing, in favor of nextjs' default
  onCreate,
}: BootstrapServerConfig): NextApiHandlerWithNest<HandlerType> {
  const appOptions: NestApplicationOptions = {
    bodyParser: true,
    ...options,
  };
  const appProm = bootstrapApp({
    appOptions,
    module,
    path,
    onCreate,
  });
  let app: INestApplication, server: Server;
  const handler: NextApiHandlerWithNest = async (req, res) => {
    if (!app) {
      app = await appProm;
      server = app.getHttpServer();
    }

    // only grab 1 handler, because we can't reuse req/res across multiple handles
    const [requestHandler] = server.listeners('request');

    res.on('close', () => app.close());

    requestHandler(req, res);

    return app;
  };

  handler.app = () => appProm;

  handler.withNextJsConfig = (config = {}) =>
    (handler.config = {
      ...config,
      api: {
        externalResolver: true,
        bodyParser: appOptions.bodyParser
          ? false
          : {
              ...config.api?.bodyParser,
            },
      },
    });

  handler.config = handler.withNextJsConfig();

  return handler;
}

async function bootstrapApp({
  module,
  onCreate,
  appOptions,
  path,
}: Omit<BootstrapServerConfig, 'options' | 'path'> & {
  path: string;
  appOptions: NestApplicationOptions;
}) {
  const app = await NestFactory.create(module, appOptions);

  // because our routes are served under `/api`
  app.setGlobalPrefix(path);
  await onCreate?.(app);

  await app.init();
  return app;
}

export interface BootstrapServerConfig {
  module: unknown;
  path?: string;
  options?: NestApplicationOptions;
  onCreate?: (app: INestApplication) => void | Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface NextApiHandlerWithNest<ResponseType = any> {
  (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ): Promise<INestApplication>;

  config: PageConfig;
  withNextJsConfig: (config?: PageConfig) => PageConfig;
  app: () => Promise<INestApplication>;
}
