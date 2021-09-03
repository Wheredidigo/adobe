import { Test, TestingModule } from '@nestjs/testing';
import { RomanNumeralService } from './roman-numeral.service';
import { CacheModule } from '@nestjs/common';

describe('RomanNumeralService', () => {
  let service: RomanNumeralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register({ ttl: 0 })],
      providers: [RomanNumeralService],
    }).compile();

    service = module.get<RomanNumeralService>(RomanNumeralService);
  });
  it('validate exception is logged and rethrown', async () => {
    await expect(service.getRomanNumeral(null)).rejects.toThrow();
  });

  it('validate multiple calls are retrieved from the cache', async () => {
    const spy = jest.spyOn(service.cacheManager, 'get');
    const first = await service.getRomanNumeral(1);
    const second = await service.getRomanNumeral(1);
    expect(spy).toBeCalledTimes(2);
    expect(first).toBe(second);
  });
});
