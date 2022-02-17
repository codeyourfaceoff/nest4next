import { NextApiHandlerWithNest } from '..';
import { bootstrapServer, BootstrapServerConfig } from './bootstrap-server';

export class BootstrapModule {
  static bootstrapHandler(
    props?: BootstraphandlerConfig
  ): NextApiHandlerWithNest {
    return bootstrapServer({
      module: this,
      ...props,
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BootstraphandlerConfig
  extends Omit<BootstrapServerConfig, 'module'> {}
