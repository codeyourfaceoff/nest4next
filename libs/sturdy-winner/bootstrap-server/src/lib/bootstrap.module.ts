import { NextApiHandler } from 'next';
import { bootstrapServer } from './bootstrap-server';
import { extractApiRouteFromPath } from './extract-api-route-from-path';

export class BootstrapModule {
  static bootstrapHandler(
    apiRoute = extractApiRouteFromPath()
  ): NextApiHandler {
    console.log({ apiRoute });
    return bootstrapServer({
      module: this,
      path: apiRoute,
    });
  }
}
