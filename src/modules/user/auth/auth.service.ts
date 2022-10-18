import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ROLE } from 'src/config';
import { Op } from 'sequelize';
import { Users } from 'src/entities/users.entity';
import { UserSessions } from 'src/entities/users.sessions.entity';
import { JwtTokenInterface } from 'src/interfaces/jwt.token.interface';
import { JwtHelper } from 'src/utils/jwt.helper';
import { PasswordHelper } from 'src/utils/password.helper';
import { LoginRequestDto } from '../../admin/auth/dto/login.request.dto';
import { LoginResponseDto } from '../../admin/auth/dto/login.response.dto';
import { RegisterResponseDto } from './dto/register.response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly USERS_REPOSITORY: typeof Users,
    @Inject('USER_SESSIONS_REPOSITORY')
    private readonly USER_SESSIONS_REPOSITORY: typeof UserSessions,
    private readonly password: PasswordHelper,
    private readonly jwtToken: JwtHelper,
   
  ) {}

  public async registerUser(registerDto): Promise<RegisterResponseDto> {
    registerDto.email = registerDto.email.toLowerCase();
    const password = registerDto.password;
    const userEmailExist = await this.USERS_REPOSITORY.findOne({
      where: { email: registerDto.email },
    });

    if (userEmailExist) {
      throw new ConflictException('Email is already exist');
    }
    const hashPassword = await this.password.generateSaltAndHash(password);

    const data = await this.USERS_REPOSITORY.create({
      first_name: registerDto.firstName,
      last_name: registerDto.lastName,
      email: registerDto.email,
      password_hash: hashPassword.passwordHash,
      role: registerDto.role,
      phoneno: registerDto.phoneNo,
      is_active: registerDto.isActive,
    });

    return new RegisterResponseDto(data);
  }

  public async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const email = loginDto.email.toLocaleLowerCase();
    const user = await this.USERS_REPOSITORY.findOne({
      where: {
        [Op.and]: [{ email }, { role: ROLE.BUYER }],
      },
    });

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    try {
      await this.password.compare(loginDto.password, user.password_hash);
    } catch (e) {
      throw new BadRequestException('invalid password credentials');
    }

    const tokenDto: JwtTokenInterface = {
      id: user.id,
      email: user.email,
    };

    const jwtToken = await this.jwtToken.generateToken(tokenDto);

    await this.USER_SESSIONS_REPOSITORY.create({
      userid: user.id,
      jwttoken: jwtToken,
    });

    return new LoginResponseDto(user, jwtToken);
  }


}
