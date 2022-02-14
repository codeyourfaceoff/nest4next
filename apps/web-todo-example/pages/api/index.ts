import { Controller, Get, Module } from '@nestjs/common';
import { BootstrapModule } from '@cyfo/sturdy-winner/bootstrap-server';

@Controller()
class AppController {
  @Get()
  async get() {
    return { hello: 'world' };
  }
}

@Module({
  controllers: [AppController],
})
class AppModule extends BootstrapModule {}

export default AppModule.bootstrapHandler();
