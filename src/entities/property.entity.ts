import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { IS_SOLD } from 'src/config';

@Table({
  tableName: 'property',
  timestamps: true,
})
export class Property extends Model<Property> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  house_id: string;

  @Column({
    type: DataType.ENUM(
      'Single-family homes',
      'Multi-family homes',
      'Townhouses',
      'Apartments',
      'villa',
    ),
    allowNull: false,
  })
  house_type: string;

  @Column({
    type: DataType.STRING(555),
    unique: true,
    allowNull: false,
  })
  house_name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  built_up_area: string;

  @Column({
    type: DataType.ENUM('fully-furnished', 'semi-furnished', 'unfurnished'),
    allowNull: false,
  })
  Furnished_status: string;

  @Column({
    type: DataType.ENUM('NA', 'NOC', 'NONE'),
    allowNull: false,
  })
  apporval: string;

  @Column({
    type: DataType.STRING(555),
    unique: true,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  phoneno: string;

  @Column({
    type: DataType.STRING(2000),
    unique: true,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.ENUM('TRUE', 'FALSE'),
    defaultValue: IS_SOLD.FALSE,
  })
  is_sold: IS_SOLD;

  @CreatedAt
  created_date: Date;

  @UpdatedAt
  updated_date: Date;
}
