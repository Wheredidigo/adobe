import { Test, TestingModule } from '@nestjs/testing';
import { K8sController } from './k8s.controller';
import { RomanNumeralModule } from '../roman-numeral/roman-numeral.module';
import { RomanNumeralService } from '../roman-numeral/services/roman-numeral.service';

describe('K8sController', () => {
  let controller: K8sController;
  let service: RomanNumeralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RomanNumeralModule],
      controllers: [K8sController],
    }).compile();

    controller = module.get<K8sController>(K8sController);
    service = module.get<RomanNumeralService>(RomanNumeralService);
  });

  it('getLiveness', async () => {
    const now = new Date();
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(now.getTime()).toBeLessThan((await controller.getLiveness()).getTime());
  });

  it('getStartup', async () => {
    const now = new Date();
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(now.getTime()).toBeLessThan((await controller.getStartup()).getTime());
  });

  it('getStartup validate romanNumeralService was called', async () => {
    const spy = jest.spyOn(service, 'convertIntRangeToRomanNumerals');
    await controller.getStartup();
    expect(spy).toBeCalledTimes(1);
  });

  it('getReadiness', async () => {
    const now = new Date();
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(now.getTime()).toBeLessThan((await controller.getReadiness()).getTime());
  });
});
