import { Property } from 'src/entities/property.entity';

export const propertyProviders = [
  {
    provide: 'PROPERTY_REPOSITORY',
    useValue: Property,
  },
];
