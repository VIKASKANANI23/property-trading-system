import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ROLE } from 'src/config';
import { Op, Sequelize, WhereOptions } from 'sequelize';
import { Users } from 'src/entities/users.entity';
import { UserSessions } from 'src/entities/users.sessions.entity';
import { JwtTokenInterface } from 'src/interfaces/jwt.token.interface';
import { JwtHelper } from 'src/utils/jwt.helper';
import { PasswordHelper } from 'src/utils/password.helper';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { HouseListSearchRequestDto } from 'src/dto/house.list.search.request.dto';
import { PaginationInterface } from 'src/interfaces/pagination';
import { Helper } from 'src/utils/helper.service';
import { UserListResponseDto } from 'src/modules/admin/auth/dto/register.response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly USERS_REPOSITORY: typeof Users,
    @Inject('USER_SESSIONS_REPOSITORY')
    private readonly USER_SESSIONS_REPOSITORY: typeof UserSessions,
    private readonly password: PasswordHelper,
    private readonly jwtToken: JwtHelper,
    private readonly helper: Helper,
  ) {}

  /**
   * Login function for Admin
   * @param loginDto - { email, password }
   * @returns - loginResponseDto
   */
  public async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const email = loginDto.email.toLocaleLowerCase();
    const user = await this.USERS_REPOSITORY.findOne({
      where: {
        [Op.and]: [{ email }, { role: ROLE.ADMIN }],
      },
    });
    // console.log(user);

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

  public async getUser() {
    const data = await this.USERS_REPOSITORY.findAll();

    return data;
  }
  async getUserList(
    searchDto: HouseListSearchRequestDto,
  ): Promise<PaginationInterface<UserListResponseDto[]>> {
    const { limit, offset, pagenumber } = this.helper.getPaginateOffset(
      searchDto.currentPage,
      searchDto.recordPerPage,
    );

    let where: WhereOptions[] = [{ role: 'BUYER' }];

    if (searchDto.searchData) {
      where.push({
        [Op.or]: [
          {
            where: Sequelize.where(
              Sequelize.fn(
                'concat',
                Sequelize.col('"Users"."first_name"'),
                ' ',
                Sequelize.col('"Users"."last_name"'),
              ),
              {
                [Op.iLike]: '%' + searchDto.searchData + '%',
              },
            ),
          },
          { phoneno: { [Op.iLike]: `%${searchDto.searchData}%` } },
        ],
      });
    }

    const { count, rows } = await this.USERS_REPOSITORY.findAndCountAll({
      where: { [Op.and]: where },
      nest: true,
      raw: true,
      // logging: true,
      limit,
      offset,
    });

    const data = rows.map((item) => {
      return new UserListResponseDto(item);
    });

    return this.helper.createPagination(count, pagenumber, limit, data);
  }
}
