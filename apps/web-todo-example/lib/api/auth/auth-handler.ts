import { NextAuthModule } from '@cyfo/next-auth';
import { bootstrapServer } from '@cyfo/bootstrap-server';

import { options } from '~/auth';

export const handler = bootstrapServer({
  path: '*',
  module: NextAuthModule.forRoot({
    nextAuthOptions: options,
  }),
});

export const config = handler.config;
export default handler;
