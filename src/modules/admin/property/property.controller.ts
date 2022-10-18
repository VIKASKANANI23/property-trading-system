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
import { PropertyResponseDto } from './dto/property.response.dto';
import { PropertyRequestDto } from './dto/property.request.dto';
import { PropertyUpdateRequestDto } from './dto/Property.update.request.dto';
import { PropertyUpdateResponseDto } from './dto/property.update.response.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/config';
import { RolesGuard } from 'src/guards/roles.guard';
@Controller('v1/admin/property')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(ROLE.ADMIN)
@ApiTags('property (Admin)')
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
