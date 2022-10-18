import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { a, BUYER, ROLE, SELLER } from 'src/config';
import { Roles } from 'src/decorators/roles.decorator';
import { Property } from 'src/entities/property.entity';
import { PropertyResponseDto } from './dto/property.response.dto';
import { PropertyUpdateRequestDto } from './dto/Property.update.request.dto';
import { PropertyUpdateResponseDto } from './dto/property.update.response.dto';

@Injectable()
export class PropertyService {
  constructor(
    @Inject('PROPERTY_REPOSITORY')
    private readonly PROPERTY_REPOSITORY: typeof Property,
  ) {}
  public async addproperty(payload): Promise<PropertyResponseDto> {
    const findProperty = await this.PROPERTY_REPOSITORY.findOne({
      where: {
        description: payload.description,
      },
    });
    if (findProperty && findProperty.house_name === payload.house_name) {
      throw new ConflictException('already exist house name');
    }
    if (findProperty && findProperty.address === payload.address) {
      throw new ConflictException('already exist adress');
    }
    if (findProperty && findProperty.description === payload.description) {
      throw new ConflictException('already exist description');
    }
    const data = await this.PROPERTY_REPOSITORY.create({
      house_type: payload.house_type,
      house_name: payload.house_name,
      built_up_area: payload.built_up_area,
      Furnished_status: payload.Furnished_status,
      apporval: payload.apporval,
      address: payload.address,
      price: payload.price,
      phoneno: payload.phoneno,
      description: payload.description,
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
    // let type = "SELLER";
    const findHouseId = await this.PROPERTY_REPOSITORY.findOne({
      where: { house_id: id },
      raw: true,
    });
    if (!findHouseId)
      throw new BadRequestException(
        'Property cannot be a properly find , Please choose another!',
      );

      // const dropDown = a[`${type.}`]
      // type === ROLE.BUYER ? BUYER : type === ROLE.SELLER ? SELLER : ''?;

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
      },
      { where: { house_id: id }, returning: true },
    );

    return new PropertyUpdateResponseDto(data[1][0]);
  }

  async deleteProperty(id: string): Promise<any> {
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

    return { message: 'property deleted successfully!!' };
  }
}
