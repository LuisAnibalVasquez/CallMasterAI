import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';
import { TenantService } from './tenant.service';
import { TenantListComponent } from './components/tenant-list.component';
import { TenantFormComponent } from './components/tenant-form.component';
import { CreateTenantRequest } from './tenant.model';
import { TenantCreatedDialogComponent } from './components/tenant-created-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    TenantListComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent {
  private readonly tenantService = inject(TenantService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  tenantsResource = resource({
    loader: () => firstValueFrom(this.tenantService.getTenants())
  });

  /**
   * Abre el diálogo para crear un nuevo tenant y maneja la respuesta.
   */
  async openCreateDialog() {
    const dialogRef = this.dialog.open(TenantFormComponent, {
      width: '500px',
      disableClose: true
    });

    const result = await firstValueFrom(dialogRef.afterClosed());
    
    if (result) {
      this.createTenant(result);
    }
  }

  private async createTenant(request: CreateTenantRequest) {
    try {
      const response = await firstValueFrom(this.tenantService.createTenant(request));
      this.tenantsResource.reload();
      
      this.dialog.open(TenantCreatedDialogComponent, {
        data: response,
        width: '450px'
      });

    } catch (error: any) {
      const errorMsg = error.error?.message || error.message || 'Error desconocido';
      this.snackBar.open(`Error al crear el tenant: ${errorMsg}`, 'Cerrar', { duration: 7000 });
    }
  }

  /** Alterna el estado activo de un tenant dado su id. */
  async onToggleStatus(id: string) {
    try {
      await firstValueFrom(this.tenantService.toggleStatus(id));
      this.tenantsResource.reload();
      this.snackBar.open('Estado actualizado correctamente', 'Cerrar', { duration: 3000 });
    } catch (error: any) {
      const errorMsg = error.error?.message || error.message || 'Error desconocido';
      this.snackBar.open(`Error al actualizar estado: ${errorMsg}`, 'Cerrar', { duration: 7000 });
    }
  }
}

/** Panel principal para PlatformOwner: lista y creación de tenants. */

