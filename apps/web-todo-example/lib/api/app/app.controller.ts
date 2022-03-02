import { Controller, Get, UseGuards } from '@nestjs/common';
import { NextAuthGuard } from '@cyfo/next-auth';

@Controller()
export class AppController {
  @Get()
  @UseGuards(NextAuthGuard)
  async get() {
    return { hello: 'world' };
  }
}
