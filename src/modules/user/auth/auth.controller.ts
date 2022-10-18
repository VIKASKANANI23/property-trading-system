import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransformInterceptor } from 'src/dispatchers/transform.interceptor';
import { SuccessResponse } from 'src/interfaces/response';
import { LoginRequestDto } from 'src/modules/admin/auth/dto/login.request.dto';
import { LoginResponseDto } from 'src/modules/admin/auth/dto/login.response.dto';
import { UserRegisterRequestDto } from 'src/modules/admin/auth/dto/register.request.dto';
import { AuthService } from './auth.service';
import { RegisterResponseDto } from './dto/register.response.dto';
@Controller('v1/user/auth')
@ApiTags('Auth (User)')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'register user ' })
  @Post('/register')
  @HttpCode(201)
  async addEmployee(
    @Body() registerDto: UserRegisterRequestDto,
  ): Promise<SuccessResponse<RegisterResponseDto>> {
    const data = await this.authService.registerUser(registerDto);
    return { data, message: 'User added successfully' };
  }

  @ApiOperation({ summary: 'Login into the system' })
  @ApiResponse({ status: 200, description: 'Success', type: LoginResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid email or password' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('/login')
  @HttpCode(201)
  protected async userLogin(
    @Body() requestDto: LoginRequestDto,
  ): Promise<SuccessResponse<LoginResponseDto>> {
    const data = await this.authService.login(requestDto);
    return { data, message: 'Logged in successfully' };
  }
}
