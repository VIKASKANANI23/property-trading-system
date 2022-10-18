import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from './users.entity';

@Table({
  tableName: 'usersessions',
  timestamps: true,
  updatedAt: false,
})
export class UserSessions extends Model<UserSessions> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  usersessionid: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userid: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  jwttoken: string;

  @CreatedAt
  created_date: Date;

  @DeletedAt
  deleted_date: Date;

  @BelongsTo(() => Users)
  user: Users;
}
