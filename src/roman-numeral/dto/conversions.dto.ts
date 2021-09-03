import { LessThan } from '../validation/validators/less-than.validator';
import { IsInt, Max, Min, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ConversionsDto {
  type: 'range' = 'range';

  @ApiProperty()
  @ValidateIf((i) => i.max != null)
  @IsInt()
  @Type(() => Number)
  @Min(1, {
    message: 'must not be less than 1',
  })
  @Max(3999, {
    message: 'must be less than 3999',
  })
  @LessThan('max', {
    message: 'must be less than max',
  })
  min: number;

  @ApiProperty()
  @ValidateIf((i) => i.min != null)
  @IsInt()
  @Type(() => Number)
  @Min(1, {
    message: 'must not be less than 1',
  })
  @Max(3999, {
    message: 'must be less than 3999',
  })
  max: number;
}
