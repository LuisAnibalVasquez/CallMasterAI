import { SetMetadata } from '@nestjs/common';
import { SystemRole } from '../../modules/identity/domain/enums/SystemRole.enum';

export const ROLES_KEY = 'roles';

/**
 * Decorator para restringir acceso por rol.
 * Uso: @Roles(SystemRole.PlatformOwner, SystemRole.TenantAdmin)
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
