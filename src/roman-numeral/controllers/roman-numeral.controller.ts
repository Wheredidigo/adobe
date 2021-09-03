import { CacheInterceptor, Controller, Get, Logger, Query, UseInterceptors, UsePipes } from '@nestjs/common';
import { ConversionEntity } from '../entities/conversion.entity';
import { ConversionsEntity } from '../entities/conversions.entity';
import { RomanNumeralService } from '../services/roman-numeral.service';
import { ConversionDto } from '../dto/conversion.dto';
import { ConversionsDto } from '../dto/conversions.dto';
import { ParseRomanNumeralQueryInputPipe } from '../validation/pipes/parse-roman-numeral-query-input.pipe';
import { ApiOkResponse, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('Roman Numeral')
@UseInterceptors(CacheInterceptor)
@Controller('romannumeral')
export class RomanNumeralController {
  constructor(private readonly romanNumeralService: RomanNumeralService) {}
  private readonly logger = new Logger(RomanNumeralController.name);

  @Get()
  @UsePipes(new ParseRomanNumeralQueryInputPipe())
  @ApiQuery({
    name: 'query',
    type: 'number',
    required: false,
    description: 'If query is passed, will return a single "input/output" object.',
  })
  @ApiQuery({
    name: 'min',
    type: 'number',
    required: false,
    description: 'Required if "max" is passed.',
  })
  @ApiQuery({
    name: 'max',
    type: 'number',
    required: false,
    description: 'Required if "min" is passed.',
  })
  @ApiOkResponse({
    description: 'Returns an array of Conversions when Query Parameters "min" and "max" are provided',
    schema: {
      oneOf: [{ $ref: getSchemaPath(ConversionsEntity) }, { $ref: getSchemaPath(ConversionEntity) }],
    },
  })
  public async getRomanNumeral(@Query() input: ConversionDto | ConversionsDto): Promise<ConversionEntity | ConversionsEntity> {
    // We don't need to create a "default" case here because of the ParseRomanNumeralQueryInputPipe validation
    // if we don't have valid input data, the controller method never actually gets called
    switch (input.type) {
      case 'single': {
        this.logger.log(`converting [${input.query}] to a roman numeral`);
        return await this.romanNumeralService.convertIntToRomanNumeral(input);
      }
      case 'range': {
        this.logger.log(`converting [${input.min}:${input.max}] to an array roman numerals`);
        return await this.romanNumeralService.convertIntRangeToRomanNumerals(input);
      }
    }
  }
}
