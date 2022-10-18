import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Property } from 'src/entities/property.entity';
import { PropertyResponseDto } from 'src/modules/admin/property/dto/property.response.dto';
import { PropertyUpdateRequestDto } from 'src/modules/admin/property/dto/Property.update.request.dto';
import { PropertyUpdateResponseDto } from 'src/modules/admin/property/dto/property.update.response.dto';
import { SoldOutequestDto } from 'src/modules/admin/property/dto/sold.out.house.request.dto';

@Injectable()
export class PropertyService {
  constructor(
    @Inject('PROPERTY_REPOSITORY')
    private readonly PROPERTY_REPOSITORY: typeof Property,
  ) {}
  public async addproperty(propertyRequestDto): Promise<PropertyResponseDto> {
    const data = await this.PROPERTY_REPOSITORY.create({
      house_type: propertyRequestDto.house_type,
      house_name: propertyRequestDto.house_name,
      built_up_area: propertyRequestDto.built_up_area,
      Furnished_status: propertyRequestDto.Furnished_status,
      apporval: propertyRequestDto.apporval,
      address: propertyRequestDto.address,
      price: propertyRequestDto.price,
      phoneno: propertyRequestDto.phoneno,
      description: propertyRequestDto.description,
      is_sold: propertyRequestDto.is_sold,
    });
    return new PropertyResponseDto(data);
  }

  public async getallproperty(): Promise<PropertyResponseDto[]> {
    const data = await this.PROPERTY_REPOSITORY.findAll();
    const data1 = data.map((item) => {
      return new PropertyResponseDto(item);
    });
    return data1;
  }

  async updateEmployee(
    propertyupdatedto: PropertyUpdateRequestDto,
    id: string,
  ): Promise<PropertyUpdateResponseDto> {
    const findHouseId = await this.PROPERTY_REPOSITORY.findOne({
      where: { house_id: id },
      raw: true,
    });
    if (!findHouseId)
      throw new BadRequestException(
        'Property cannot be a properly find , Please choose another!',
      );

    const data = await this.PROPERTY_REPOSITORY.update(
      {
        house_type: propertyupdatedto.house_type,
        house_name: propertyupdatedto.house_name,
        built_up_area: propertyupdatedto.built_up_area,
        Furnished_status: propertyupdatedto.Furnished_status,
        apporval: propertyupdatedto.apporval,
        address: propertyupdatedto.address,
        price: propertyupdatedto.price,
        phoneno: propertyupdatedto.phoneno,
        description: propertyupdatedto.description,
        is_sold: propertyupdatedto.is_sold,
      },
      { where: { house_id: id }, returning: true },
    );

    return new PropertyUpdateResponseDto(data[1][0]);
  }

  async deleteProperty(id: string): Promise<[]> {
    const findHouseId = await this.PROPERTY_REPOSITORY.findOne({
      where: { house_id: id },
      raw: true,
    });
    if (!findHouseId)
      throw new BadRequestException(
        'Property cannot be a properly find , Please choose another!',
      );
    await this.PROPERTY_REPOSITORY.destroy({
      where: { house_id: id },
      force: true,
    });

    return [];
  }

  public async getallPropertySold(): Promise<PropertyResponseDto[]> {
    const data = await this.PROPERTY_REPOSITORY.findAll({
      where: { is_sold: 'FALSE' },
    });

    const data1 = data.map((item) => {
      return new PropertyResponseDto(item);
    });
    return data1;
  }

  async soldOutByHouseId(
    soldOutequestDto: SoldOutequestDto,
    id: string,
  ): Promise<any> {
    const findHouseId = await this.PROPERTY_REPOSITORY.findOne({
      where: { house_id: id },
      raw: true,
    });
    if (!findHouseId)
      throw new BadRequestException(
        'Property cannot be a properly find , Please choose another!',
      );

    const data = await this.PROPERTY_REPOSITORY.update(
      {
        is_sold: soldOutequestDto.is_sold,
      },
      { where: { house_id: id }, returning: true },
    );
    return `Yeah..! it is sold out '${findHouseId.house_name}' `;
  }
}
