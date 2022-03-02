import { Controller, Get, UseGuards } from '@nestjs/common';
import { NextAuthGuard } from '@nest4next/next-auth';

@Controller()
export class AppController {
  @Get()
  @UseGuards(NextAuthGuard)
  async get() {
    return { hello: 'world' };
  }
}
