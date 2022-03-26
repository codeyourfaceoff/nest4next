import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit {
  constructor(public readonly prisma: PrismaClient) {}

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.prisma.$on('beforeExit', async () => {
      await app.close();
    });
  }

  static enableShutdownHooks(app: INestApplication) {
    const service = app.get(PrismaService);
    service.enableShutdownHooks(app);
  }
}
