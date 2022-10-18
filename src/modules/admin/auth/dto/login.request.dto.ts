import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { validateEmail } from 'src/vaildations/decorators/email';

export class LoginRequestDto {
  @ApiProperty({ maxLength: 255, required: true })
  //   @Transform((value) => value.trim())
  @MaxLength(255)
  @validateEmail({ message: 'Invalid email format' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ minLength: 8, maxLength: 24, required: true })
  //   @Transform((value) => value.trim())
  @MinLength(8)
  @MaxLength(24)
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
