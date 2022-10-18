import { Module } from '@nestjs/common';
import { propertyProviders } from 'src/providers/property.providers';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService, ...propertyProviders],
})
export class PropertyModule {}
