import { Injectable, Provider } from '@nestjs/common';
import { NextAuthOptions } from 'next-auth';
// helper function is not exported by package so need to bypass esm check by going direct to the folder
import { init } from 'node_modules/next-auth/core/init';

@Injectable()
export class NextAuthOptionProvider {
  private options: NextAuthOptions;
  private _initialized = false;
  constructor(private _options: NextAuthOptions) {
    this.init(_options);
  }

  async init(options: NextAuthOptions) {
    const initialized = await init({
      userOptions: options,
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
