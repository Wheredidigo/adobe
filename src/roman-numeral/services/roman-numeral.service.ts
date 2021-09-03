import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { ConversionDto } from '../dto/conversion.dto';
import { ConversionEntity } from '../entities/conversion.entity';
import { ConversionsDto } from '../dto/conversions.dto';
import { ConversionsEntity } from '../entities/conversions.entity';
import { Cache } from 'cache-manager';
import { rethrow } from '@nestjs/core/helpers/rethrow';

@Injectable()
export class RomanNumeralService {
  constructor(@Inject(CACHE_MANAGER) public cacheManager: Cache) {}
  private readonly logger = new Logger(RomanNumeralService.name);

  public async convertIntToRomanNumeral(input: ConversionDto): Promise<ConversionEntity> {
    const retval = new ConversionEntity();
    retval.input = input.query.toString();
    retval.output = await this.getRomanNumeral(input.query);
    return retval;
  }

  public async convertIntRangeToRomanNumerals(input: ConversionsDto): Promise<ConversionsEntity> {
    const retval = new ConversionsEntity();
    for (let i = input.min; i <= input.max; i++) {
      const tmp = new ConversionEntity();
      tmp.input = i.toString();
      tmp.output = await this.getRomanNumeral(i);
      retval.conversions.push(tmp);
    }
    return retval;
  }

  private readonly romanNumeralMap: Map<number, string> = new Map<number, string>([
    [1, 'I'],
    [4, 'IV'],
    [5, 'V'],
    [9, 'IX'],
    [10, 'X'],
    [40, 'XL'],
    [50, 'L'],
    [90, 'XC'],
    [100, 'C'],
    [400, 'CD'],
    [500, 'D'],
    [900, 'CM'],
    [1000, 'M'],
  ]);

  // https://www.rapidtables.com/convert/number/how-number-to-roman-numerals.html
  async getRomanNumeral(input: number): Promise<string> {
    try {
      const result = await this.cacheManager.get(input.toString());
      if (result) {
        return result as string;
      }
      let check = input;
      let output = '';
      while (check > 0) {
        const entry = [...this.romanNumeralMap.entries()].reduce((previousValue, currentValue) => {
          if (currentValue[0] <= check) {
            return currentValue;
          }
          return previousValue;
        });
        output = `${output}${entry[1]}`;
        check = check - entry[0];
      }
      await this.cacheManager.set(input.toString(), output, 0);
      return output;
    } catch (ex) {
      this.logger.error(ex.message, ex.stack, `${RomanNumeralService.name}.getRomanNumeral`);
      rethrow(ex);
    }
  }
}
