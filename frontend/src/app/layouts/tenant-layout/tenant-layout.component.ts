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
  templateUrl: './tenant-layout.component.html',
  styleUrl: './tenant-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantLayoutComponent {
  private readonly authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
