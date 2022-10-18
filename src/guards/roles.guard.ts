import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as _ from 'lodash';
import { ROLE } from '../config';
import { JwtHelper } from '../utils/jwt.helper';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtToken: JwtHelper,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requireRoles = this.reflector.getAllAndOverride<ROLE[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = this.jwtToken.getTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({
        isError: true,
        message: 'Login  token required',
      });
    }

    const user = await this.jwtToken.verify(token);

    if (!user) {
      throw new UnauthorizedException({
        isError: true,
        message: 'Login required',
      });
    }

    // console.log(user);

    const isAdmin = requireRoles.some((role) => user.role.includes(role));

    if (!isAdmin) {
      throw new UnauthorizedException({
        isError: true,
        message: 'Unauthorized admin user',
      });
    }

    request.user = user;
    return request;
  }
}
