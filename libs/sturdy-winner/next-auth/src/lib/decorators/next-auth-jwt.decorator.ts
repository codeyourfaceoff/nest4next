import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NextApiRequest } from 'next';
import { getNextAuthJwtToken } from '../next-auth.utils';

export const NextAuthJwt = createParamDecorator(
  async (_: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest() as NextApiRequest;
    return await getNextAuthJwtToken({ req });
  }
);
