import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  APPORVAL,
  FURNISHED_STATUS,
  HOUSE_TYPE,
  IS_SOLD,
} from '../../../../config';

export class PropertyRequestDto {
  @ApiProperty()
  @IsEnum(HOUSE_TYPE)
  @MaxLength(24)
  @IsNotEmpty()
  readonly house_type: HOUSE_TYPE;

  @ApiProperty()
  @MaxLength(24)
  @IsNotEmpty()
  readonly house_name: string;

  @ApiProperty({ maxLength: 24, required: true })
  @IsString()
  @MaxLength(24)
  @IsNotEmpty()
  readonly built_up_area: string;

  @ApiProperty()
  @IsEnum(FURNISHED_STATUS)
  @MaxLength(24)
  @IsNotEmpty()
  readonly Furnished_status: FURNISHED_STATUS;

  @ApiProperty()
  @IsEnum(APPORVAL)
  @MaxLength(24)
  @IsNotEmpty()
  readonly apporval: APPORVAL;
  PersonalizeEventType;
  @ApiProperty({ maxLength: 555, required: true })
  @IsString()
  @MaxLength(555)
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty()
  @IsString()
  @MaxLength(14)
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsPhoneNumber()
  @MaxLength(14)
  @IsNotEmpty()
  readonly phoneno: string;

  @ApiProperty({ maxLength: 555, required: true })
  @IsString()
  @MaxLength(555)
  @IsNotEmpty()
  readonly description: string;
  @ApiProperty()
  @IsEnum(IS_SOLD)
  @MaxLength(24)
  @IsNotEmpty()
  readonly is_sold: IS_SOLD;
}
