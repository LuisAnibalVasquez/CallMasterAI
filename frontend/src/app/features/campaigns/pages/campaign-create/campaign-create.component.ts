import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CampaignService } from '../../services/campaign.service';
import { CampaignType, CreateCampaignDto } from '../../models/campaign.model';

@Component({
  selector: 'app-campaign-create',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="create-container">
      <div class="header-actions">
        <button mat-icon-button routerLink="/tenant/campaigns">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>Crear Nueva Campaña</h1>
      </div>

      <mat-card>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nombre de la campaña</mat-label>
              <input matInput formControlName="name" placeholder="Ej: Cobranza Morosos Julio">
              <mat-error *ngIf="form.get('name')?.hasError('required')">El nombre es requerido</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Tipo de campaña</mat-label>
              <mat-select formControlName="type">
                <mat-option [value]="CampaignType.COMMERCIAL">Comercial</mat-option>
                <mat-option [value]="CampaignType.NOTIFICATION">Notificación / Cobranza</mat-option>
                <mat-option [value]="CampaignType.OTHER">Otro</mat-option>
              </mat-select>
              <mat-error *ngIf="form.get('type')?.hasError('required')">El tipo es requerido</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Descripción (Opcional)</mat-label>
              <textarea matInput formControlName="description" rows="3" placeholder="Detalles internos de la campaña"></textarea>
            </mat-form-field>

            <div class="form-actions">
              <button mat-button type="button" routerLink="/tenant/campaigns">Cancelar</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || isSubmitting()">
                {{ isSubmitting() ? 'Creando...' : 'Crear Campaña' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .create-container { padding: 24px; max-width: 600px; margin: 0 auto; }
    .header-actions { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
    h1 { margin: 0; }
    .form-container { display: flex; flex-direction: column; gap: 16px; padding-top: 16px; }
    .full-width { width: 100%; }
    .form-actions { display: flex; justify-content: flex-end; gap: 16px; margin-top: 16px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignCreateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly campaignService = inject(CampaignService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  CampaignType = CampaignType;
  isSubmitting = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    type: [CampaignType.COMMERCIAL, Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) return;
    
    this.isSubmitting.set(true);
    const dto = this.form.getRawValue() as CreateCampaignDto;
    
    this.campaignService.createCampaign(dto).subscribe({
      next: (campaign) => {
        this.snackBar.open('Campaña creada en borrador', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/tenant/campaigns', campaign.id]);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.snackBar.open(err.error?.message || 'Error al crear la campaña (¿Tienes API Key activa?)', 'Cerrar', { duration: 5000 });
      }
    });
  }
}
