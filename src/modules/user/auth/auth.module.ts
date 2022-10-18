import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { usersProviders } from 'src/providers/users.providers';
import { userSessionsProviders } from 'src/providers/user.sessions.providers';

@Module({
  providers: [AuthService, ...usersProviders, ...userSessionsProviders],
  controllers: [AuthController],
})
export class AuthModule {}
