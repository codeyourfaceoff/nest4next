import { Injectable, Provider } from '@nestjs/common';
import { NextAuthOptions } from 'next-auth';
// helper function is not exported by package so need to bypass esm check by going direct to the folder
import { init } from 'next-auth/core/init';
import { isSecureCookeEnvironment } from './next-auth.utils';
@Injectable()
export class NextAuthOptionProvider {
  private options: NextAuthOptions;
  private _initialized = false;
  constructor(private _options: NextAuthOptions) {
    this.init(_options);
  }

  async init(options: NextAuthOptions) {
    const initialized = await init({
      userOptions: {
        useSecureCookies: isSecureCookeEnvironment(), // by default the package will look this up for you unless you override it, this mimics that behavior while still allwoing overwriting from the options
        ...options,
      },
      action: '',
      cookies: {},
      isPost: false,
    });

    this.options = initialized.options;
    this._initialized = true;
  }

  async get() {
    if (!this._initialized) await this.init(this._options);
    return {
      ...this.options,
    };
  }
}

export const createNextAuthOptionsProvider = (
  nextAuthOptions: NextAuthOptions
): Provider<NextAuthOptionProvider> => {
  return {
    provide: NextAuthOptionProvider,
    useValue: new NextAuthOptionProvider(nextAuthOptions),
  };
};
