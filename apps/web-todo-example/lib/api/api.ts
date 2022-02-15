import { AppModule } from '~/api';
import { resolve } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { generateClientLib } from '@cyfo/sturdy-winner/generate-client-lib';
import { PageConfig } from 'next';

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

export default handler;

// This is needed to tell next that we're letting 'express' handle the req/res lifecycle
// otherwise next will print: "API resolved without sending a response for *"
// See: https://github.com/vercel/next.js/issues/10439#issuecomment-633013628
export const config: PageConfig = {
  api: {
    externalResolver: true,

    // note: by default will use nextjs' body parsing and pass to nest, but turning this off you can then turn on nestjs' bodyParsing in the bootstrap above to use theirs. Only ONE of can be turned on at a time or they will override one another
    // bodyParser: false
  },
};
