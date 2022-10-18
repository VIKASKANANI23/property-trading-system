import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from 'src/config';
import { Users } from '../../../../entities/users.entity';

export class RegisterResponseDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty({ enum: ['ADMIN', 'BUYER', 'SELLER'] })
  readonly role: ROLE;

  @ApiProperty()
  readonly phoneNo: string;

  @ApiProperty()
  readonly isActive: boolean;

  constructor(user: Users) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.phoneNo = user.phoneno;
    this.role = user.role;
    this.isActive = user.is_active;
  }
}
