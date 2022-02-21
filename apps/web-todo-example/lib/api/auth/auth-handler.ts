import { NextAuthModule } from '@cyfo/sturdy-winner/next-auth';
import { bootstrapServer } from '@cyfo/sturdy-winner/bootstrap-server';

import { options } from '~/auth';

export const handler = bootstrapServer({
  path: '*',
  module: NextAuthModule.forRoot({
    nextAuthOptions: options,
  }),
});

export const config = handler.config;
export default handler;
