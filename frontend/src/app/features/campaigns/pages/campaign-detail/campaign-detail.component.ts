import { Component, input, ChangeDetectionStrategy, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CsvUploaderComponent } from '../../components/csv-uploader/csv-uploader.component';
import { ScriptUploaderComponent } from '../../components/script-uploader/script-uploader.component';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-campaign-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    CsvUploaderComponent,
    ScriptUploaderComponent
  ],
  template: `
    <div class="detail-container">
      <div class="header-actions">
        <button mat-icon-button routerLink="/tenant/campaigns">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>Campaña ID: {{ id() }}</h1>
        <mat-chip color="accent" selected>Borrador</mat-chip>
      </div>

      <div class="content-grid">
        <div class="main-column">
          <mat-card class="mb-3">
            <mat-card-header>
              <mat-card-title>Detalles</mat-card-title>
            </mat-card-header>
            <mat-card-content class="pt-3">
              <p>Aquí verás los detalles de tu campaña en estado Borrador.</p>
              <p>Para poder iniciarla, necesitas subir los Contactos y el Guion.</p>
            </mat-card-content>
          </mat-card>

          <!-- Componentes de carga -->
          <app-csv-uploader #csvUploader (fileSelected)="onCsvSelected($event)"></app-csv-uploader>
          <app-script-uploader #scriptUploader (fileSelected)="onScriptSelected($event)"></app-script-uploader>

        </div>
        
        <div class="side-column">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Acciones</mat-card-title>
            </mat-card-header>
            <mat-card-content class="pt-3">
              <button mat-raised-button color="primary" class="full-width mb-2" disabled>
                <mat-icon>play_arrow</mat-icon> Iniciar Campaña
              </button>
              <small style="color: #666;">Requiere contactos y guion cargados.</small>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-container { padding: 24px; }
    .header-actions { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
    h1 { margin: 0; }
    .content-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
    .pt-3 { padding-top: 16px; }
    .mb-3 { margin-bottom: 24px; }
    .mb-2 { margin-bottom: 8px; }
    .full-width { width: 100%; }
    
    @media (max-width: 768px) {
      .content-grid { grid-template-columns: 1fr; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignDetailComponent {
  id = input.required<string>(); // Viene del router /:id
  
  private readonly campaignService = inject(CampaignService);
  private readonly snackBar = inject(MatSnackBar);

  @ViewChild('csvUploader') csvUploader!: CsvUploaderComponent;
  @ViewChild('scriptUploader') scriptUploader!: ScriptUploaderComponent;

  onCsvSelected(file: File) {
    this.campaignService.uploadContacts(this.id(), file).subscribe({
      next: (res: any) => {
        this.csvUploader.reset();
        this.snackBar.open(`Contactos subidos con éxito! Válidos: ${res.valid || 'N/A'}`, 'Cerrar', { duration: 5000 });
      },
      error: (err) => {
        this.csvUploader.isUploading.set(false);
        this.snackBar.open('Error al subir CSV', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onScriptSelected(file: File) {
    this.campaignService.uploadScript(this.id(), file).subscribe({
      next: () => {
        this.scriptUploader.reset();
        this.snackBar.open('Guion subido con éxito!', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        this.scriptUploader.isUploading.set(false);
        this.snackBar.open('Error al subir Guion', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
