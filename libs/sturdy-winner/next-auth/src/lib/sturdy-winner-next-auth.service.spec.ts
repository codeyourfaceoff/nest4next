import { Test } from '@nestjs/testing';
import { SturdyWinnerNextAuthService } from './sturdy-winner-next-auth.service';

describe('SturdyWinnerNextAuthService', () => {
  let service: SturdyWinnerNextAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SturdyWinnerNextAuthService],
    }).compile();

    service = module.get(SturdyWinnerNextAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
