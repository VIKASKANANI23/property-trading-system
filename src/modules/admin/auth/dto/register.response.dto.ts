import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../../../entities/users.entity';
export class UserListResponseDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly phoneNo: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  readonly role: string;

  @ApiProperty()
  readonly isActive: boolean;

  @ApiProperty()
  readonly createdDate: Date;

  constructor(user: Users) {
    this.id = user.id;
    this.email = user.email;
    (this.fullName = user.first_name + ' ' + user.last_name),
      (this.role = user.role);
    this.role = user.role;
    this.phoneNo = user.phoneno;
    this.isActive = user.is_active;
    this.createdDate = user.created_date;
  }
}
