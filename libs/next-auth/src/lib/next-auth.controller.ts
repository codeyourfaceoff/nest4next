import { All, Controller, Req, Res } from '@nestjs/common';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextAuthHandlerService } from './next-auth-handler.service';

@Controller()
export class NextAuthController {
  constructor(private nextAuthHandlerService: NextAuthHandlerService) {}

  @All('*')
  handler(@Req() req: NextApiRequest, @Res() res: NextApiResponse) {
    return this.nextAuthHandlerService.handler()(req, res);
  }
}
