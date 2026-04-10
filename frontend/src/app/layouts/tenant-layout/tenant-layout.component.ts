import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/infrastructure/services/auth.service';

@Component({
  selector: 'app-tenant-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="sidenav-container">
      <aside class="sidenav" role="navigation">
        <header class="sidenav-header">Operaciones Tenant</header>
        <nav class="sidenav-nav">
          <a routerLink="/tenant/dashboard" routerLinkActive="active-link">Dashboard</a>
          <a routerLink="/tenant/campaigns" routerLinkActive="active-link">Campañas</a>
          <a routerLink="/tenant/settings/password-policy" routerLinkActive="active-link">Seguridad</a>
          <div class="sidenav-subheader">Configuración</div>
          <a routerLink="/tenant/api-keys" routerLinkActive="active-link">API Keys</a>
          <div class="sidenav-subheader">Usuario</div>
          <a routerLink="/tenant/change-password" routerLinkActive="active-link">Cambiar Contraseña</a>
          <a (click)="logout()">Cerrar Sesión</a>
        </nav>
      </aside>
      <main class="sidenav-content">
        <header class="app-toolbar">CallMaster AI - Portal del Tenant</header>
        <section class="main-content">
          <router-outlet />
        </section>
      </main>
    </div>
  `,
  styles: `
    .sidenav-container {
      height: 100vh;
    }
    .sidenav {
      width: 250px;
    }
    .app-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--mat-sys-primary, #1976d2);
      color: white;
      padding: 12px;
    }
    .main-content {
      padding: 20px;
    }
    .sidenav {
      width: 250px;
      padding: 16px;
      background: #f5f5f5;
    }
    .sidenav-nav a {
      display: block;
      padding: 8px 0;
      color: inherit;
      text-decoration: none;
    }
    .active-link {
      font-weight: 600;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantLayoutComponent {
  private readonly authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
