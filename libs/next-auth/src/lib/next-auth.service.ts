import { Injectable } from '@nestjs/common';
import { GetServerSidePropsContext } from 'next';
import { encode, decode, JWT } from 'next-auth/jwt';
import { serialize } from 'cookie';
import { NextAuthOptionProvider } from './next-auth-options.service';

@Injectable()
export class NextAuthService {
  constructor(private options: NextAuthOptionProvider) {}

  async createSessionCookie<TokenData extends JWT>(
    token: TokenData,
    path = '/'
  ) {
    const options = await this.options.get();
    const value = await encode({
      token,
      secret: options.secret,
    });
    return serialize(options.cookies.sessionToken.name, value, { path });
  }

  async getUser({
    cookies,
  }: GetServerSidePropsContext['req']): Promise<
    (JWT & { iat: number; exp: number; jti: string }) | null
  > {
    const options = await this.options.get();
    const sessionToken = cookies[options.cookies.sessionToken.name];

    try {
      const result = await decode({
        secret: options.secret,
        token: sessionToken,
      });
      return result as JWT & { iat: number; exp: number; jti: string };
    } catch (err) {
      console.log('Error Parsing Token', {
        secret: options.secret, // probably shouldn't log secret in real version
        token: sessionToken,
      });
    }

    return null;
  }
}
