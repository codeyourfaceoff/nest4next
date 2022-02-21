import { Module } from '@nestjs/common';
import { BootstrapModule } from '@cyfo/sturdy-winner/bootstrap-server';
import { TodosModule } from '~/api/todos';
import { AppController } from './app.controller';

@Module({
  imports: [TodosModule],
  controllers: [AppController],
})
export class AppModule extends BootstrapModule {}
