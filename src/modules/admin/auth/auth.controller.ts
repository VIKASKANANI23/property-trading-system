import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ROLE } from 'src/config';
import { Roles } from 'src/decorators/roles.decorator';
import { HouseListSearchRequestDto } from 'src/dto/house.list.search.request.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { PaginationInterface } from 'src/interfaces/pagination';
import { TransformInterceptor } from '../../../dispatchers/transform.interceptor';
import { SuccessResponse } from '../../../interfaces/response';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { UserListResponseDto } from './dto/register.response.dto';

@Controller('v1/admin/auth')
@ApiTags('Auth (Admin)')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login into the system' })
  @ApiResponse({ status: 200, description: 'Success', type: LoginResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid email or password' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('/login')
  @HttpCode(201)
  protected async adminLogin(
    @Body() requestDto: LoginRequestDto,
  ): Promise<SuccessResponse<LoginResponseDto>> {
    const data = await this.authService.login(requestDto);
    return { data, message: 'Logged in successfully' };
  }
  @ApiOperation({ summary: 'Login into the system' })
  @ApiResponse({ status: 200, description: 'Success', type: LoginResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid email or password' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(ROLE.ADMIN)
  @Get('/getall/users')
  @HttpCode(201)
  protected async getUser() {
    const data = await this.authService.getUser();
    return { data, message: 'user get  in successfully' };
  }
  @ApiOperation({ summary: 'get-all-user list' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiBadRequestResponse({ description: 'Invalid token' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/get_all_user')
  @ApiBearerAuth()
  @HttpCode(200)
  async getUserlist(
    @Query() SearchDto: HouseListSearchRequestDto,
  ): Promise<SuccessResponse<PaginationInterface<UserListResponseDto[]>>> {
    const data = await this.authService.getUserList(SearchDto);
    return { data, message: 'employee data successfully get' };
  }
}
