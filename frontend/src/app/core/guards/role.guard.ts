import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../infrastructure/services/auth.service';

/**
 * RF-1.07 / RF-1.08: Guard que protege rutas según el rol del usuario.
 * Requiere que el rol del usuario coincida con el rol definido en la data de la ruta.
 */
export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data['role'] as string;
  const userRole = authService.userRole();

  if (userRole === requiredRole) {
    return true;
  }

  // Si no tiene el rol, redirigir al dashboard que le corresponde
  authService.redirectToDashboard();
  return false;
};
