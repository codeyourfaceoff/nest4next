import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { NextApiRequest } from 'next';
import { getNextAuthJwtToken } from '../next-auth.utils';

@Injectable()
export class NextAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as NextApiRequest;
    const valid = await getNextAuthJwtToken({ req });
    return !!valid;
  }
}
