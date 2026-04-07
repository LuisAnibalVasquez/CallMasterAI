import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Decorator para restringir acceso por rol.
 * Uso: @Roles('PlatformOwner', 'TenantAdmin')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
