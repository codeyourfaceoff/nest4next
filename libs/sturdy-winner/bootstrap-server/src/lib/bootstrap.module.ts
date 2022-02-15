import { NextApiHandler } from 'next';
import { bootstrapServer, BootstrapServerConfig } from './bootstrap-server';

export class BootstrapModule {
  static bootstrapHandler(props?: BootstraphandlerConfig): NextApiHandler {
    return bootstrapServer({
      module: this,
      ...props,
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BootstraphandlerConfig
  extends Omit<BootstrapServerConfig, 'module'> {}
