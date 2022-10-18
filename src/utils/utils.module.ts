import { Global, Module } from '@nestjs/common';
import { JwtHelper } from './jwt.helper';
import { PasswordHelper } from './password.helper';

const services = [JwtHelper, PasswordHelper];

@Global()
@Module({
  imports: [],
  providers: [...services],
  exports: services,
})
export class UtilsModule {}
