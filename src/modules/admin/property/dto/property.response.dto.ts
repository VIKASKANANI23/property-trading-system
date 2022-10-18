import { ApiProperty } from '@nestjs/swagger';
import { Property } from 'src/entities/property.entity';

export class PropertyResponseDto {
  @ApiProperty()
  readonly housed_id: string;

  @ApiProperty()
  readonly house_name: string;

  @ApiProperty()
  readonly house_type: string;

  @ApiProperty()
  readonly built_up_area: string;

  @ApiProperty()
  readonly Furnished_status: string;

  @ApiProperty()
  readonly apporval: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  readonly price_breakup: number;

  @ApiProperty()
  readonly phoneNo: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly is_sold: string;

  constructor(property: Property) {
    this.housed_id = property.house_id;
    this.house_name = property.house_name;
    this.house_type = property.house_type;
    this.built_up_area = property.built_up_area;
    this.Furnished_status = property.Furnished_status;
    this.apporval = property.apporval;
    this.address = property.address;
    this.price_breakup = property.price;
    this.phoneNo = property.phoneno;
    this.description = property.description;
    this.is_sold = property.is_sold;
  }
}
