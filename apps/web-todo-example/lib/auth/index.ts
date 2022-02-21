import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      authorize: async (_credentials) => {
        return {
          id: '12345',
        };
      },
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'email@email.com',
          value: 'email@email.com',
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'password',
          value: 'password',
        },
      },
    }),
  ],
};
