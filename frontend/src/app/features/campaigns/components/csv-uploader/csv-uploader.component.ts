import { Component, ChangeDetectionStrategy, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-csv-uploader',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  template: `
    <div class="uploader-container">
      <h3>Contactos (CSV)</h3>
      <p>Sube un archivo CSV con las columnas "nombre" y "telefono".</p>
      
      <div class="upload-area" (click)="fileInput.click()">
        <mat-icon color="primary">cloud_upload</mat-icon>
        <span>Haz clic para seleccionar el archivo CSV</span>
        <input #fileInput type="file" accept=".csv" style="display: none" (change)="onFileSelected($event)">
      </div>

      <div *ngIf="selectedFile()" class="selected-file">
        <mat-icon>insert_drive_file</mat-icon>
        <span>{{ selectedFile()?.name }}</span>
        <button mat-icon-button color="warn" (click)="clearFile(); $event.stopPropagation()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="actions" *ngIf="selectedFile()">
        <button mat-raised-button color="primary" [disabled]="isUploading()" (click)="upload()">
          Subir Contactos
        </button>
      </div>
      
      <mat-progress-bar *ngIf="isUploading()" mode="indeterminate" class="mt-3"></mat-progress-bar>
    </div>
  `,
  styles: [`
    .uploader-container { border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
    .upload-area { border: 2px dashed #ccc; padding: 24px; text-align: center; border-radius: 4px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .upload-area:hover { background: #f9f9f9; border-color: #3f51b5; }
    .selected-file { display: flex; align-items: center; gap: 8px; margin-top: 16px; padding: 8px; background: #f5f5f5; border-radius: 4px; }
    .actions { margin-top: 16px; display: flex; justify-content: flex-end; }
    .mt-3 { margin-top: 16px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsvUploaderComponent {
  fileSelected = output<File>();
  
  selectedFile = signal<File | null>(null);
  isUploading = signal(false);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile.set(input.files[0]);
    }
  }

  clearFile() {
    this.selectedFile.set(null);
  }

  upload() {
    const file = this.selectedFile();
    if (file) {
      this.isUploading.set(true);
      this.fileSelected.emit(file);
      // isUploading will be reset from parent when done, or we can just leave it if it refreshes
    }
  }

  reset() {
    this.selectedFile.set(null);
    this.isUploading.set(false);
  }
}
