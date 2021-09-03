import { IsInt, Max, Min, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ConversionDto {
  type: 'single' = 'single';

  @ApiProperty()
  @ValidateIf((i) => i.query != null)
  @IsInt()
  @Type(() => Number)
  @Min(1, {
    message: 'must not be less than 1',
  })
  @Max(3999, {
    message: 'must be less than 3999',
  })
  query: number;
}
