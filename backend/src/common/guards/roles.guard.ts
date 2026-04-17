import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * RolesGuard
 *
 * Verifica que el usuario autenticado tenga alguno de los roles requeridos
 * especificados por el decorador `@Roles(...)`.
 *
 * Uso típico:
 *  @UseGuards(AuthGuard('jwt'), RolesGuard)
 *  @Roles('PlatformOwner')
 *
 * Este guard asume que la estrategia JWT ha poblado `request.user` con
 * `roleName` o `role`.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<{ user?: { roleName?: string; role?: string } }>();
    const user = request.user;
    const userRole = user?.roleName || user?.role;

    if (!userRole) return false;

    return requiredRoles.includes(userRole);
  }
}
