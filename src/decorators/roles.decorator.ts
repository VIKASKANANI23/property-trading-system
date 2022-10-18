import { SetMetadata } from '@nestjs/common';
import { ROLE } from '../config';

export const Roles = (...roles: ROLE[]) => SetMetadata('roles', roles);
