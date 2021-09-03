import { Test, TestingModule } from '@nestjs/testing';
import { RomanNumeralController } from './roman-numeral.controller';
import { RomanNumeralService } from '../services/roman-numeral.service';
import { ConversionEntity } from '../entities/conversion.entity';
import { ConversionDto } from '../dto/conversion.dto';
import { CacheModule } from '@nestjs/common';
import { ConversionsDto } from '../dto/conversions.dto';
import { ConversionsEntity } from '../entities/conversions.entity';

describe('RomanNumeralController', () => {
  let controller: RomanNumeralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register({ ttl: 0 })],
      controllers: [RomanNumeralController],
      providers: [RomanNumeralService],
    }).compile();

    controller = module.get<RomanNumeralController>(RomanNumeralController);
  });

  describe('tests for "Query" parameter', () => {
    it('should return a single conversion for 1', async () => {
      const input = new ConversionDto();
      input.query = 1;
      const result = new ConversionEntity();
      result.input = '1';
      result.output = 'I';

      expect(await controller.getRomanNumeral(input)).toStrictEqual(result);
    });

    it('should return a single conversion for 1449', async () => {
      const input = new ConversionDto();
      input.query = 1449;
      const result = new ConversionEntity();
      result.input = '1449';
      result.output = 'MCDXLIX';

      expect(await controller.getRomanNumeral(input)).toStrictEqual(result);
    });
  });

  describe('tests for "Min" and "Max" parameters', () => {
    it('should return an array of conversions from 1 to 5', async () => {
      const input = new ConversionsDto();
      input.min = 1;
      input.max = 5;
      const result = new ConversionsEntity();
      const convert1 = new ConversionEntity();
      convert1.input = '1';
      convert1.output = 'I';
      result.conversions.push(convert1);
      const convert2 = new ConversionEntity();
      convert2.input = '2';
      convert2.output = 'II';
      result.conversions.push(convert2);
      const convert3 = new ConversionEntity();
      convert3.input = '3';
      convert3.output = 'III';
      result.conversions.push(convert3);
      const convert4 = new ConversionEntity();
      convert4.input = '4';
      convert4.output = 'IV';
      result.conversions.push(convert4);
      const convert5 = new ConversionEntity();
      convert5.input = '5';
      convert5.output = 'V';
      result.conversions.push(convert5);

      expect(await controller.getRomanNumeral(input)).toStrictEqual(result);
    });

    it('should return an array of conversions from 1446 to 1450', async () => {
      const input = new ConversionsDto();
      input.min = 1446;
      input.max = 1450;
      const result = new ConversionsEntity();
      const convert1 = new ConversionEntity();
      convert1.input = '1446';
      convert1.output = 'MCDXLVI';
      result.conversions.push(convert1);
      const convert2 = new ConversionEntity();
      convert2.input = '1447';
      convert2.output = 'MCDXLVII';
      result.conversions.push(convert2);
      const convert3 = new ConversionEntity();
      convert3.input = '1448';
      convert3.output = 'MCDXLVIII';
      result.conversions.push(convert3);
      const convert4 = new ConversionEntity();
      convert4.input = '1449';
      convert4.output = 'MCDXLIX';
      result.conversions.push(convert4);
      const convert5 = new ConversionEntity();
      convert5.input = '1450';
      convert5.output = 'MCDL';
      result.conversions.push(convert5);

      expect(await controller.getRomanNumeral(input)).toStrictEqual(result);
    });
  });
});
