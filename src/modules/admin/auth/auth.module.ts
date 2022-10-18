import { Module } from '@nestjs/common';
import { userSessionsProviders } from 'src/providers/user.sessions.providers';
import { usersProviders } from 'src/providers/users.providers';
import { Helper } from 'src/utils/helper.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ...usersProviders, ...userSessionsProviders, Helper],
})
export class AuthModule {}
