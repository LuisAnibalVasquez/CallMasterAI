import { Component, ChangeDetectionStrategy, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Campaign } from '../../models/campaign.model';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatChipsModule],
  template: `
    <div class="campaigns-container">
      <div class="header-actions">
        <h1>Campañas</h1>
        <button mat-raised-color="primary" mat-raised-button color="primary" routerLink="create">
          <mat-icon>add</mat-icon>
          Nueva Campaña
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <table mat-table [dataSource]="campaigns()" class="mat-elevation-z0">
            <!-- Name Column -->
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef> Nombre </th>
              <td mat-cell *matCellDef="let element"> {{element.name}} </td>
            </ng-container>

            <!-- Type Column -->
            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef> Tipo </th>
              <td mat-cell *matCellDef="let element"> {{element.type}} </td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef> Estado </th>
              <td mat-cell *matCellDef="let element">
                <mat-chip>{{element.status}}</mat-chip>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef> Acciones </th>
              <td mat-cell *matCellDef="let element">
                <button mat-icon-button color="primary" [routerLink]="['/tenant/campaigns', element.id]">
                  <mat-icon>visibility</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            
            <tr class="mat-row" *matNoDataRow>
              <td class="mat-cell" colspan="4" style="text-align: center; padding: 20px;">
                No hay campañas creadas aún.
              </td>
            </tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .campaigns-container { padding: 24px; }
    .header-actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    h1 { margin: 0; }
    table { width: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignListComponent implements OnInit {
  // Placeholder para la vista por ahora, luego lo conectamos al Service que traiga el listado real (cuando el backend lo tenga)
  campaigns = signal<Campaign[]>([]);
  displayedColumns: string[] = ['name', 'type', 'status', 'actions'];

  ngOnInit() {
    // Si hubiera un endpoint GET /api/v1/campaigns lo llamaríamos aquí.
  }
}
