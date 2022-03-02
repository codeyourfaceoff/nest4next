import { NextAuthModule } from '@nest4next/next-auth';
import { bootstrapServer } from '@nest4next/bootstrap-server';

import { options } from '~/auth';

export const handler = bootstrapServer({
  path: '*',
  module: NextAuthModule.forRoot({
    nextAuthOptions: options,
  }),
});

export const config = handler.config;
export default handler;
