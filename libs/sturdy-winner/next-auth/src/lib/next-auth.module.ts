import { DynamicModule, Module } from '@nestjs/common';
import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';

import { NextAuthController } from './next-auth.controller';
import { createNextAuthHandlerProvider } from './next-auth-handler.service';
import { createNextAuthOptionsProvider } from './next-auth-options.service';
import { NextAuthService } from './next-auth.service';

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
}

interface NextAuthModuleOptions {
  nextAuthOptions: NextAuthOptions;
}
