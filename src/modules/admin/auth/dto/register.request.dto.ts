import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { IS_SOLD, ROLE } from 'src/config';
import { validateEmail } from 'src/vaildations/decorators/email';

export class UserRegisterRequestDto {
  @ApiProperty({ maxLength: 24, required: true })
  @IsString()
  @MaxLength(24)
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ maxLength: 24, required: true })
  @IsString()
  @MaxLength(24)
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @MaxLength(255)
  @IsLowercase()
  @validateEmail({ message: 'Please enter valid email id' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @MaxLength(11)
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsEnum(ROLE)
  @MaxLength(24)
  @IsNotEmpty()
  readonly role: ROLE;

  @ApiProperty()
  @IsPhoneNumber()
  @MaxLength(14)
  @IsNotEmpty()
  readonly phoneNo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;

  @ApiProperty()
  @IsEnum(IS_SOLD)
  @MaxLength(24)
  @IsNotEmpty()
  readonly is_sold: IS_SOLD;
}
