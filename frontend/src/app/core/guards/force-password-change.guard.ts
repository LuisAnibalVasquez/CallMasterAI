import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../infrastructure/services/auth.service';

/**
 * RF-1.06: Guard que fuerza el cambio de contraseña si el flag mustChangePassword está activo.
 * Si el usuario debe cambiar su contraseña, lo redirige a la pantalla de cambio obligatorio.
 */
export const forcePasswordChangeGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.mustChangePassword()) {
    // Si la ruta actual ya es la de cambio forzado, permitir
    if (router.url.includes('/password/force-change')) {
      return true;
    }
    return router.createUrlTree(['/password/force-change']);
  }

  return true;
};
