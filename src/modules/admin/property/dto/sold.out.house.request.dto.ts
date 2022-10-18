import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { IS_SOLD } from '../../../../config';

export class SoldOutequestDto {
  @ApiProperty()
  @IsEnum(IS_SOLD)
  @MaxLength(24)
  @IsNotEmpty()
  readonly is_sold: IS_SOLD;
}
