import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/dispatchers/transform.interceptor';
import { SuccessResponse } from 'src/interfaces/response';
import { PropertyService } from './property.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PropertyRequestDto } from 'src/modules/admin/property/dto/property.request.dto';
import { PropertyResponseDto } from 'src/modules/admin/property/dto/property.response.dto';
import { PropertyUpdateRequestDto } from 'src/modules/admin/property/dto/Property.update.request.dto';
import { PropertyUpdateResponseDto } from 'src/modules/admin/property/dto/property.update.response.dto';
import { SoldOutequestDto } from 'src/modules/admin/property/dto/sold.out.house.request.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/config';

@Controller('v1/user/trading/property')
@ApiTags('property (User)')
@UseGuards(RolesGuard)
@Roles(ROLE.BUYER)
@ApiBearerAuth()
@UseInterceptors(TransformInterceptor)
@ApiResponse({ status: 200, description: 'Success' })
@ApiBadRequestResponse({ description: 'Invalid token' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}
  @ApiOperation({ summary: 'register property ' })
  @Post('/register')
  async addEmployee(
    @Body() propertyRequestDto: PropertyRequestDto,
  ): Promise<SuccessResponse<PropertyResponseDto>> {
    const data = await this.propertyService.addproperty(propertyRequestDto);
    return { data, message: 'property added successfully' };
  }
  @HttpCode(201)
  @ApiOperation({ summary: 'all  property ' })
  @Get('/get/properties')
  async getallproperty(): Promise<SuccessResponse<PropertyResponseDto[]>> {
    const data = await this.propertyService.getallproperty();
    return { data, message: 'property get all successfully' };
  }
  @Put('/soldOut/property/:id')
  async soldOutProperty(
    @Body() soldOutequestDto: SoldOutequestDto,
    @Param('id') id: string,
  ): Promise<SuccessResponse<PropertyResponseDto>> {
    const data = await this.propertyService.soldOutByHouseId(
      soldOutequestDto,
      id,
    );
    return { data, message: 'property added successfully' };
  }
  @HttpCode(201)
  @ApiOperation({ summary: 'all  property ' })
  @Get('/get/is_not_sold')
  async getallPropertySold(): Promise<SuccessResponse<PropertyResponseDto[]>> {
    const data = await this.propertyService.getallPropertySold();
    return { data, message: 'property get all successfully' };
  }
  @ApiOperation({ summary: 'update property' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiBadRequestResponse({ description: 'Invalid token' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Put('/update_property/:id')
  @HttpCode(201)
  async updateemployee(
    @Body() propertyupdatedto: PropertyUpdateRequestDto,
    @Param('id') id: string,
  ): Promise<SuccessResponse<PropertyUpdateResponseDto>> {
    const data = await this.propertyService.updateEmployee(
      propertyupdatedto,
      id,
    );
    return { data, message: 'Property data successfully update' };
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @ApiBadRequestResponse({ description: 'Invalid token' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete('/delete/:id')
  @HttpCode(202)
  async deleteEmployee(@Param('id') id: string): Promise<SuccessResponse<any>> {
    const data = await this.propertyService.deleteProperty(id);
    return { data, message: 'DELETE DATA SUCCESSFULLY' };
  }
}
