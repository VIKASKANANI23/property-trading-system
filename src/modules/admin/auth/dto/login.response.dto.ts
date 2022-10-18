import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from 'src/config';
import { Users } from '../../../../entities/users.entity';

export class LoginResponseDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly token: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly fullName: string;

  @ApiProperty({ enum: ['ADMIN', 'BUYER', 'SELLER'] })
  readonly role: ROLE;

  // @ApiProperty()
  // readonly phoneNo: string;

  @ApiProperty()
  readonly isActive: boolean;

  constructor(user: Users, token: string) {
    this.id = user.id;
    this.email = user.email;
    this.fullName = user.first_name + ' ' + user.last_name;
    this.role = user.role;
    this.token = token;
    //this.phoneNo = user.phoneno;
    this.isActive = user.is_active;
  }
}
