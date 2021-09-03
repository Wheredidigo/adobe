import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConversionEntity {
  @ApiProperty({
    description: 'Number to be converted',
    example: '4',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  input: string;

  @ApiProperty({
    description: 'Roman Numeral Conversion Result',
    example: 'IV',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  output: string;
}
