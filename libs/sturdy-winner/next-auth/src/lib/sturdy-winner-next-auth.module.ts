import { Module } from '@nestjs/common';
import { SturdyWinnerNextAuthService } from './sturdy-winner-next-auth.service';

@Module({
  controllers: [],
  providers: [SturdyWinnerNextAuthService],
  exports: [SturdyWinnerNextAuthService],
})
export class SturdyWinnerNextAuthModule {}
