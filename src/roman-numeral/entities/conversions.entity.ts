import { ConversionEntity } from './conversion.entity';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ConversionsEntity {
  @ValidateNested({ each: true })
  @Type(() => ConversionEntity)
  @ApiProperty({
    isArray: true,
    type: ConversionEntity,
    example: '[{"input":"1","output":"I"},{"input":"2","output":"II"},{"input":"3","output":"III"}]',
  })
  conversions: ConversionEntity[] = new Array<ConversionEntity>();
}
