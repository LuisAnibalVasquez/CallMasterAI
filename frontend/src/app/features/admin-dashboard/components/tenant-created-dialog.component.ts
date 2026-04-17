import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tenant-created-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './tenant-created-dialog.component.html',
  styleUrl: './tenant-created-dialog.component.css'
})
export class TenantCreatedDialogComponent {
  /** Datos inyectados que contienen la respuesta del tenant creado (incluye contraseña temporal). */
  data = inject(MAT_DIALOG_DATA);
}