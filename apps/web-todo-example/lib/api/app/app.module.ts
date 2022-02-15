import { Controller, Get, Module, UseGuards } from '@nestjs/common';
import { BootstrapModule } from '@cyfo/sturdy-winner/bootstrap-server';
import { NextAuthGuard } from '@cyfo/sturdy-winner/next-auth';

@Controller()
class AppController {
  @Get()
  @UseGuards(NextAuthGuard)
  async get() {
    return { hello: 'world' };
  }
}

@Module({
  controllers: [AppController],
})
export class AppModule extends BootstrapModule {}
