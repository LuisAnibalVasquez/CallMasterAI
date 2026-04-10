import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../infrastructure/services/auth.service';

/**
 * RF-1.01: Guard que protege rutas que requieren autenticación.
 * Redirige a /auth/login si no hay sesión válida.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};
