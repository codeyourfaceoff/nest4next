import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

export const NextAuthJwt = createParamDecorator(
  async (_: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest() as NextApiRequest;
    return await getToken({ req });
  }
);
