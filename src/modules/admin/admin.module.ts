import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [AuthModule, PropertyModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
