import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';
import { TenantService } from './tenant.service';
import { TenantListComponent } from './components/tenant-list.component';
import { TenantFormComponent } from './components/tenant-form.component';
import { CreateTenantRequest } from './tenant.model';

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
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <div class="header-info">
          <h1 class="mat-h1">Gestión de Tenants</h1>
          <p class="mat-body-1 text-muted">Administra los clientes de la plataforma y sus estados.</p>
        </div>
        
        <div class="header-actions">
          <button mat-stroked-button (click)="tenantsResource.reload()" [disabled]="tenantsResource.status() === 'loading'">
            <mat-icon [class.animate-spin]="tenantsResource.status() === 'loading'">refresh</mat-icon>
            Actualizar
          </button>
          
          <button mat-flat-button color="primary" (click)="openCreateDialog()">
            <mat-icon>add</mat-icon>
            Nuevo Tenant
          </button>
        </div>
      </header>

      @if (tenantsResource.status() === 'error') {
        <div class="error-banner">
          <mat-icon color="warn">error</mat-icon>
          <span>Error al cargar los tenants. Por favor intente nuevamente.</span>
        </div>
      }

      <div class="dashboard-content">
        @if (tenantsResource.status() === 'loading' && !tenantsResource.value()) {
          <div class="loading-container">
            <mat-spinner diameter="48"></mat-spinner>
          </div>
        } @else {
          <app-tenant-list 
            [tenants]="tenantsResource.value() || []" 
            (toggleStatus)="onToggleStatus($event)"
          />
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      background-color: var(--mat-sys-surface-container-lowest, #f9fafb);
      min-height: 100vh;
    }
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 16px;
    }
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }
    .header-info h1 {
      margin: 0;
      color: var(--mat-sys-on-surface);
    }
    .text-muted {
      color: var(--mat-sys-on-surface-variant, #666);
    }
    .header-actions {
      display: flex;
      gap: 12px;
    }
    .error-banner {
      display: flex;
      align-items: center;
      gap: 12px;
      background-color: #fef2f2;
      border: 1px solid #fecaca;
      border-left: 4px solid #ef4444;
      padding: 16px;
      border-radius: 4px;
      margin-bottom: 24px;
      color: #b91c1c;
    }
    .loading-container {
      display: flex;
      justify-content: center;
      padding: 64px 0;
    }
    .animate-spin {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Dialog styling classes */
    .dialog-success-title { color: #15803d; }
    .cred-container {
      background-color: #eff6ff;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #dbeafe;
      margin: 16px 0;
    }
    .cred-label { font-weight: 600; color: #1e40af; font-size: 14px; margin-bottom: 8px; display: block; }
    .cred-row { font-size: 14px; margin-bottom: 4px; }
    .temp-pass { 
      background: white; 
      padding: 2px 8px; 
      border-radius: 4px; 
      border: 1px solid #bfdbfe; 
      font-family: monospace; 
      color: #1e3a8a;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent {
  private readonly tenantService = inject(TenantService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  tenantsResource = resource({
    loader: () => firstValueFrom(this.tenantService.getTenants())
  });

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
      
      this.dialog.open(TenantCreatedDialog, {
        data: response,
        width: '450px'
      });

    } catch (error) {
      this.snackBar.open('Error al crear el tenant', 'Cerrar', { duration: 5000 });
    }
  }

  async onToggleStatus(id: string) {
    try {
      await firstValueFrom(this.tenantService.toggleStatus(id));
      this.tenantsResource.reload();
      this.snackBar.open('Estado actualizado correctamente', 'Cerrar', { duration: 3000 });
    } catch (error) {
      this.snackBar.open('Error al actualizar estado', 'Cerrar', { duration: 5000 });
    }
  }
}

@Component({
  selector: 'app-tenant-created-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  template: `
    <h2 mat-dialog-title class="dialog-success-title">¡Tenant Creado!</h2>
    <mat-dialog-content>
      <p>El tenant <strong>{{ data.name }}</strong> ha sido registrado exitosamente.</p>
      
      <div class="cred-container">
        <span class="cred-label">Credenciales del Administrador:</span>
        <div class="cred-row"><strong>Email:</strong> {{ data.initialUser.email }}</div>
        <div class="cred-row">
          <strong>Password Temporal:</strong> 
          <span class="temp-pass">{{ data.initialUser.temporaryPassword }}</span>
        </div>
        <p style="font-size: 11px; color: #2563eb; margin-top: 12px; font-style: italic;">
          * Por favor, copie esta contraseña. Solo se mostrará esta vez.
        </p>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-flat-button color="primary" [mat-dialog-close]="true">Entendido</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-success-title { color: #15803d; margin: 0; }
    .cred-container {
      background-color: #eff6ff;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #dbeafe;
      margin: 16px 0;
    }
    .cred-label { font-weight: 600; color: #1e40af; font-size: 14px; margin-bottom: 8px; display: block; }
    .cred-row { font-size: 14px; margin-bottom: 4px; }
    .temp-pass { 
      background: white; 
      padding: 2px 8px; 
      border-radius: 4px; 
      border: 1px solid #bfdbfe; 
      font-family: monospace; 
      color: #1e3a8a;
      user-select: all;
    }
  `]
})
class TenantCreatedDialog {
  data = inject(MAT_DIALOG_DATA);
}

