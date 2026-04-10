import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/infrastructure/services/auth.service';

@Component({
  selector: 'app-tenant-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidenav" role="navigation">
        <mat-toolbar color="primary" class="sidenav-header">Tenant Menu</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/tenant/dashboard" routerLinkActive="active-link">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <div matListItemTitle>Dashboard</div>
          </a>
          <mat-divider></mat-divider>
          <h3 mat-subheader>Configuración</h3>
          <a mat-list-item routerLink="/tenant/settings/password-policy" routerLinkActive="active-link">
            <mat-icon matListItemIcon>policy</mat-icon>
            <div matListItemTitle>Políticas de Contraseña</div>
          </a>
          <mat-divider></mat-divider>
          <h3 mat-subheader>Usuario</h3>
          <a mat-list-item routerLink="/tenant/change-password" routerLinkActive="active-link">
            <mat-icon matListItemIcon>password</mat-icon>
            <div matListItemTitle>Cambiar Contraseña</div>
          </a>
          <a mat-list-item (click)="logout()" style="cursor: pointer;">
            <mat-icon matListItemIcon>logout</mat-icon>
            <div matListItemTitle>Cerrar Sesión</div>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content class="sidenav-content">
        <mat-toolbar color="primary" class="app-toolbar">
          <span>CallMaster AI - Tenant Admin</span>
        </mat-toolbar>
        <div class="main-content">
          <router-outlet />
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    .sidenav-container {
      height: 100vh;
    }
    .sidenav {
      width: 250px;
    }
    .sidenav-header {
      font-weight: 500;
    }
    .app-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .main-content {
      padding: 24px;
    }
    .active-link {
      background-color: rgba(0, 0, 0, 0.04);
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
