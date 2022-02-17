import { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Server } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { extractApiRouteFromPath } from './extract-api-route-from-path';

export function bootstrapServer<HandlerType = unknown>({
  module,
  path = extractApiRouteFromPath() || 'api/route',
  options = { bodyParser: false }, // default to not use nestjs' bodyParsing, in favor of nextjs' default
  onCreate,
}: BootstrapServerConfig): NextApiHandlerWithNest<HandlerType> {
  const handler: NextApiHandlerWithNest = async (req, res) => {
    const app = await NestFactory.create(module, options);

    // because our routes are served under `/api`
    app.setGlobalPrefix(path);
    await onCreate?.(app);

    await app.init();

    const server: Server = app.getHttpServer();

    // only grab 1 handler, because we can't reuse req/res across multiple handles
    const [requestHandler] = server.listeners('request');

    res.on('close', () => app.close());

    requestHandler(req, res);

    return app;
  };

  return handler;
}

export interface BootstrapServerConfig {
  module: unknown;
  path?: string;
  options?: NestApplicationOptions;
  onCreate?: (app: INestApplication) => void | Promise<void>;
}

export interface NextApiHandlerWithNest<ResponseType = any> {
  (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ): Promise<INestApplication>;
}
