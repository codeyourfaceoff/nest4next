import { DynamicModule, Module } from '@nestjs/common';
import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';

import { NextAuthController } from './next-auth.controller';
import { NextAuthService } from './next-auth.service';
import {
  NextAuthHandlerService,
  createNextAuthHandlerProvider,
} from './next-auth-handler.service';
import {
  NextAuthOptionProvider,
  createNextAuthOptionsProvider,
} from './next-auth-options.service';

@Module({})
export class NextAuthModule {
  static forRoot(options: NextAuthModuleOptions): DynamicModule {
    const module = NextAuthModule.forFeature(options);
    module.controllers = [NextAuthController];

    return module;
  }

  static forFeature(options: NextAuthModuleOptions): DynamicModule {
    const nextAuth = NextAuth(options.nextAuthOptions) as NextApiHandler;

    const nextAuthOptionsProvider = createNextAuthOptionsProvider(
      options.nextAuthOptions
    );

    const nextAuthHandlerProvider = createNextAuthHandlerProvider(nextAuth);

    return {
      module: NextAuthModule,
      exports: [
        nextAuthOptionsProvider,
        nextAuthHandlerProvider,
        NextAuthService,
      ],
      providers: [
        nextAuthOptionsProvider,
        nextAuthHandlerProvider,
        NextAuthService,
      ],
    };
  }

  static forAsyncFeature(
    optionsCallback: () =>
      | Promise<NextAuthModuleOptions>
      | NextAuthModuleOptions
  ): DynamicModule {
    let nextAuth: NextApiHandler;
    return {
      module: NextAuthModule,
      providers: [
        {
          provide: NextAuthOptionProvider,
          useFactory: async () => {
            const options = await optionsCallback();
            return new NextAuthOptionProvider(options.nextAuthOptions);
          },
        },
        {
          provide: NextAuthHandlerService,
          useFactory: async () => {
            const nextAuth = await getNextAuth();
            return new NextAuthHandlerService(nextAuth);
          },
        },
        NextAuthService,
      ],
      exports: [
        NextAuthService,
        NextAuthOptionProvider,
        NextAuthHandlerService,
      ],
    };

    async function getNextAuth() {
      if (nextAuth) return nextAuth;
      const options = await optionsCallback();
      nextAuth = NextAuth(options.nextAuthOptions);
      return nextAuth;
    }
  }
}

interface NextAuthModuleOptions {
  nextAuthOptions: NextAuthOptions;
}
