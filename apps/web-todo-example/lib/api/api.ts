import { AppModule } from '~/api';
import { resolve } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { generateClientLib } from '@cyfo/sturdy-winner/generate-client-lib';

const clientLibPath = resolve(
  process.cwd(),
  'apps',
  'web-todo-example',
  'lib',
  'api',
  'client.ts'
);

export const handler = AppModule.bootstrapHandler({
  onCreate: async (app) => {
    const config = new DocumentBuilder().build();
    const document = SwaggerModule.createDocument(app, config);
    if (process.env.NODE_ENV === 'development') {
      await generateClientLib(document, {
        client: 'react-query',
        path: clientLibPath,
      });
    }
  },
});

export const config = handler.config;
export default handler;
