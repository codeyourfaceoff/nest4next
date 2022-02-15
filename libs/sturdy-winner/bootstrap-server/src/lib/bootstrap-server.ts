import { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Server } from 'http';
import { NextApiHandler } from 'next';
import { extractApiRouteFromPath } from './extract-api-route-from-path';

export function bootstrapServer<HandlerType = unknown>({
  module,
  path = extractApiRouteFromPath() || 'api/route',
  options = { bodyParser: true },
  onCreate,
}: BootstrapServerConfig): NextApiHandler<HandlerType> {
  const handler: NextApiHandler = async (req, res) => {
    const app = await NestFactory.create(module, options);

    // because our routes are served under `/api`
    app.setGlobalPrefix(path);
    await onCreate?.(app);

    await app.init();

    const server: Server = app.getHttpServer();
    const requestHandlers = server.listeners('request');

    requestHandlers.forEach((handler) => handler(req, res));
  };

  return handler;
}

export interface BootstrapServerConfig {
  module: unknown;
  path?: string;
  options?: NestApplicationOptions;
  onCreate?: (app: INestApplication) => void | Promise<void>;
}
