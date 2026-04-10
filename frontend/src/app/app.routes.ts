import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { forcePasswordChangeGuard } from './core/guards/force-password-change.guard';

export const routes: Routes = [
  // Rutas Públicas de Auth
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login.page').then(m => m.LoginPage)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./features/auth/pages/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
      },
      {
        path: 'reset-password/:token',
        loadComponent: () => import('./features/auth/pages/reset-password/reset-password.page').then(m => m.ResetPasswordPage)
      }
    ]
  },

  // Flujo de Password Forzado
  {
    path: 'password/force-change',
    canActivate: [authGuard],
    loadComponent: () => import('./features/password/pages/force-change-password/force-change-password.page').then(m => m.ForceChangePasswordPage)
  },

  // Panel Platform Owner
  {
    path: 'owner',
    loadComponent: () => import('./layouts/owner-layout/owner-layout.component').then(m => m.OwnerLayoutComponent),
    canActivate: [authGuard, roleGuard, forcePasswordChangeGuard],
    data: { role: 'PlatformOwner' },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/owner-dashboard/pages/owner-dashboard.page').then(m => m.OwnerDashboardPage)
      },
      {
        path: 'change-password',
        loadComponent: () => import('./features/password/pages/change-password/change-password.page').then(m => m.ChangePasswordPage)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Panel Tenant Admin
  {
    path: 'tenant',
    loadComponent: () => import('./layouts/tenant-layout/tenant-layout.component').then(m => m.TenantLayoutComponent),
    canActivate: [authGuard, roleGuard, forcePasswordChangeGuard],
    data: { role: 'TenantAdmin' },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/tenant-dashboard/pages/tenant-dashboard.page').then(m => m.TenantDashboardPage)
      },
      {
        path: 'settings/password-policy',
        loadComponent: () => import('./features/tenant-dashboard/pages/password-policy/password-policy.page').then(m => m.PasswordPolicyPage)
      },
      {
        path: 'change-password',
        loadComponent: () => import('./features/password/pages/change-password/change-password.page').then(m => m.ChangePasswordPage)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Redirección por defecto
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];
