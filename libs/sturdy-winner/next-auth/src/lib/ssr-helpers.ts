import { NextAuthOptions, Session } from 'next-auth';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { NextAuthService } from './next-auth.service';
import { NextAuthOptionProvider } from './next-auth-options.service';

export const createGetAuthSession = (options: NextAuthOptions) => {
  const authService = new NextAuthService(new NextAuthOptionProvider(options));
  return async (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
  ): Promise<Session | null> => {
    const res = await authService.getUser(context.req);

    if (!res) return res as null;
    return {
      expires: new Date(res.exp).toISOString(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user: res as any,
    };
  };
};
