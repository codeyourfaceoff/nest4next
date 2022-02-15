import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next';

@Injectable()
export class NextAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as NextApiRequest;
    const valid = await getToken({ req });
    return valid !== null;
  }
}
