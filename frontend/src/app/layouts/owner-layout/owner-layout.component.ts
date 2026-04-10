import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/infrastructure/services/auth.service';

@Component({
  selector: 'app-owner-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="sidenav-container">
      <aside class="sidenav" role="navigation">
        <header class="sidenav-header">Menu Owner</header>
        <nav class="sidenav-nav">
          <a routerLink="/owner/dashboard" routerLinkActive="active-link">Dashboard</a>
          <a routerLink="/owner/tenants" routerLinkActive="active-link">Gestión Tenants</a>
          <div class="sidenav-subheader">Usuario</div>
          <a routerLink="/owner/change-password" routerLinkActive="active-link">Cambiar Contraseña</a>
          <a (click)="logout()">Cerrar Sesión</a>
        </nav>
      </aside>
      <main class="sidenav-content">
        <header class="app-toolbar">CallMaster AI - Platform Owner</header>
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
    .sidenav-container {
      height: 100vh;
    }
    .sidenav {
      width: 250px;
      padding: 16px;
      background: #f5f5f5;
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
export class OwnerLayoutComponent {
  private readonly authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
