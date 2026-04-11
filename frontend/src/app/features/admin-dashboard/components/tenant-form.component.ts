import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CreateTenantRequest } from '../tenant.model';

@Component({
  selector: 'app-tenant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  template: `
    <h2 mat-dialog-title class="text-xl font-bold text-gray-800">Registrar Nuevo Tenant</h2>
    
    <mat-dialog-content>
      <form [formGroup]="tenantForm" class="form-container">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nombre de la Empresa</mat-label>
          <input matInput formControlName="name" placeholder="Ej. ACME Corp" />
          @if (tenantForm.controls.name.invalid && tenantForm.controls.name.touched) {
            <mat-error>El nombre es obligatorio</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email del Administrador</mat-label>
          <input matInput type="email" formControlName="adminEmail" placeholder="admin@empresa.com" />
          @if (tenantForm.controls.adminEmail.invalid && tenantForm.controls.adminEmail.touched) {
            <mat-error>Ingrese un email válido</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Teléfono de Contacto</mat-label>
          <input matInput formControlName="phone" placeholder="+54 9 11 ..." />
          @if (tenantForm.controls.phone.invalid && tenantForm.controls.phone.touched) {
            <mat-error>El teléfono es obligatorio</mat-error>
          }
        </mat-form-field>

        <div class="toggle-container">
          <mat-slide-toggle formControlName="isActive" color="primary">
            Tenant Activo al Crear
          </mat-slide-toggle>
        </div>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-flat-button color="primary" 
              [disabled]="tenantForm.invalid" 
              (click)="onSubmit()">
        Crear Tenant
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    :host {
      display: block;
    }
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: 320px;
      padding-top: 16px;
    }
    .full-width {
      width: 100%;
    }
    .toggle-container {
      padding: 8px 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject(MatDialogRef<TenantFormComponent>);

  tenantForm = this.fb.group({
    name: ['', [Validators.required]],
    adminEmail: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    isActive: [true]
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.tenantForm.valid) {
      const request: CreateTenantRequest = this.tenantForm.getRawValue();
      this.dialogRef.close(request);
    }
  }
}
