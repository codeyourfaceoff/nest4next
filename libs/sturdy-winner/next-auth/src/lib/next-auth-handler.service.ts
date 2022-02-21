import { Injectable, Provider } from '@nestjs/common';
import { NextApiHandler } from 'next';

@Injectable()
export class NextAuthHandlerService {
  constructor(private nextAuthHandler: NextApiHandler) {}
  handler() {
    return this.nextAuthHandler;
  }
}

export const createNextAuthHandlerProvider = (
  nextAuthHandler: NextApiHandler
): Provider<NextAuthHandlerService> => {
  return {
    provide: NextAuthHandlerService,
    useValue: new NextAuthHandlerService(nextAuthHandler),
  };
};
