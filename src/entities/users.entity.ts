import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { ROLE } from 'src/config';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class Users extends Model<Users> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(50),
  })
  first_name: string;

  @Column({
    type: DataType.STRING(50),
  })
  last_name: string;

  @Column({
    type: DataType.STRING(255),
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
  })
  password_hash: string;

  @Column({
    type: DataType.ENUM('ADMIN', 'BUYER', 'SELLER'),
    defaultValue: ROLE.BUYER,
  })
  role: ROLE;

  @Column({
    type: DataType.STRING(255),
  })
  phoneno: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  is_active: boolean;

  @CreatedAt
  created_date: Date;

  @UpdatedAt
  updated_date: Date;
}
