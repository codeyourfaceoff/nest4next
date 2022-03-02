import { Test } from '@nestjs/testing';
import { NextAuthService } from './next-auth.service';

describe('NextAuthService', () => {
  let service: NextAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NextAuthService],
    }).compile();

    service = module.get(NextAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
