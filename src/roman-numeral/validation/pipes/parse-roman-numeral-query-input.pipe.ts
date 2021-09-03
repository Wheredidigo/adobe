/* istanbul ignore file */
import { ArgumentMetadata, BadRequestException, Injectable, Logger, PipeTransform, Type, ValidationError } from '@nestjs/common';
import { ConversionDto } from '../../dto/conversion.dto';
import { ConversionsDto } from '../../dto/conversions.dto';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ParseRomanNumeralQueryInputPipe implements PipeTransform<string, Promise<ConversionDto | ConversionsDto>> {
  private readonly logger = new Logger(ParseRomanNumeralQueryInputPipe.name);

  async transform(value: string, { metatype }: ArgumentMetadata): Promise<ConversionDto | ConversionsDto> {
    const obj = this.getInstance(value, metatype);
    const errors: ValidationError[] = await validate(obj);
    if (errors.length > 0) {
      const ex = new BadRequestException(this.buildErrorMessage(errors));
      this.logger.error(ex.message, ex.stack);
      throw ex;
    }
    return obj;
  }

  private getInstance(value: string, metatype: Type<any>): ConversionDto | ConversionsDto {
    const obj = plainToClass(metatype, value);
    if ('query' in obj) {
      this.logger.debug('transforming input to ConversionDto');
      return plainToClassFromExist(new ConversionDto(), value);
    } else if ('min' in obj && 'max' in obj) {
      this.logger.debug('transforming input to ConversionsDto');
      return plainToClassFromExist(new ConversionsDto(), value);
    }
    const ex = new BadRequestException('must provide either "query" or "min" and "max" query parameters');
    this.logger.error(ex.message, ex.stack);
    throw ex;
  }

  private buildErrorMessage(errors: ValidationError[]): string {
    const message = [];
    errors.forEach((el) => {
      const temp = {};
      temp[el.property] = [];
      Object.entries(el.constraints).forEach((constraint) => {
        message.push(`${el.property}: ${constraint[1]}`);
      });
    });
    return message.join(', ');
  }
}
