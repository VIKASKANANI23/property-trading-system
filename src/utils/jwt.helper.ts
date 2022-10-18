import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtTokenInterface } from '../interfaces/jwt.token.interface';
import { UserSessions } from '../entities/users.sessions.entity';
import { Users } from '../entities/users.entity';

@Injectable()
export class JwtHelper {
  public async generateToken(tokenDto: JwtTokenInterface): Promise<string> {
    const token = jwt.sign(tokenDto, process.env.JWT_SECRET || '', {
      expiresIn: process.env.JWT_EXPIRED_TIME,
    });
    return token;
  }

  public async verify(token: string): Promise<false | Users> {
    try {
      jwt.verify(token, process.env.JWT_SECRET || '') as JwtTokenInterface;
      const session = await UserSessions.findOne({
        where: { jwttoken: token },
        include: [
          {
            attributes: [
              'id',
              'email',
              'first_name',
              'last_name',
              'role',
              'phoneno',
              'is_active',
            ],
            model: Users,
            required: true,
          },
        ],
        raw: true,
        nest: true,
      });

      if (!session) {
        return false;
      }

      return session.user;
    } catch (e) {
      // console.log(e);
      return false;
    }
  }

  public getTokenFromHeader(request: Request): string | null {
    let token =
      request.headers['x-access-token'] || request.headers['authorization'];
    if (!token) {
      return null;
    }

    if (Array.isArray(token)) {
      token = token[0];
    }

    if (token && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      return (token = token.slice(7, token.length));
    }
    return token;
  }
}
