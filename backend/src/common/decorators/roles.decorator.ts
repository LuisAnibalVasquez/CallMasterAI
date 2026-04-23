import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Decorator para restringir acceso por rol.
 * Uso: @Roles(SystemRole.PlatformOwner, SystemRole.TenantAdmin)
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
