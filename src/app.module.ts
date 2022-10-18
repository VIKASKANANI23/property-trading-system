import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [DatabaseModule, AdminModule, UserModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
