import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Tenant } from '../tenant.model';

@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    CurrencyPipe,
    DatePipe
  ],
  template: `
    <div class="table-container mat-elevation-z1">
      <table mat-table [dataSource]="tenants()" class="full-width-table">
        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nombre</th>
          <td mat-cell *matCellDef="let tenant">
            <div class="tenant-name">{{ tenant.name }}</div>
            <div class="tenant-id">{{ tenant.id }}</div>
          </td>
        </ng-container>

        <!-- Email Column -->
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Admin Email</th>
          <td mat-cell *matCellDef="let tenant">{{ tenant.adminEmail }}</td>
        </ng-container>

        <!-- Status Column -->
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Estado</th>
          <td mat-cell *matCellDef="let tenant">
            <mat-chip-set>
              <mat-chip [class.status-chip-active]="tenant.isActive" 
                        [class.status-chip-inactive]="!tenant.isActive">
                {{ tenant.isActive ? 'Activo' : 'Inactivo' }}
              </mat-chip>
            </mat-chip-set>
          </td>
        </ng-container>

        <!-- Spend Column -->
        <ng-container matColumnDef="spend">
          <th mat-header-cell *matHeaderCellDef>Gasto</th>
          <td mat-cell *matCellDef="let tenant" class="spend-cell">
            {{ tenant.incurredSpend | currency:'USD' }}
          </td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef class="actions-header">Acciones</th>
          <td mat-cell *matCellDef="let tenant" class="actions-cell">
            <button mat-icon-button [color]="tenant.isActive ? 'warn' : 'primary'"
                    (click)="toggleStatus.emit(tenant.id)"
                    [matTooltip]="tenant.isActive ? 'Desactivar' : 'Activar'">
              <mat-icon>{{ tenant.isActive ? 'power_settings_new' : 'play_arrow' }}</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="tenant-row"></tr>
      </table>

      @if (tenants().length === 0) {
        <div class="empty-state">
          <mat-icon>info_outline</mat-icon>
          <p>No hay tenants registrados.</p>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .table-container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--mat-sys-outline-variant, #e0e0e0);
    }
    .full-width-table {
      width: 100%;
    }
    .tenant-name {
      font-weight: 500;
      color: var(--mat-sys-on-surface);
    }
    .tenant-id {
      font-size: 11px;
      color: var(--mat-sys-on-surface-variant, #757575);
    }
    .spend-cell {
      font-family: 'Roboto Mono', monospace;
      font-weight: 500;
    }
    .actions-header, .actions-cell {
      text-align: right;
    }
    .tenant-row:hover {
      background-color: var(--mat-sys-surface-container-low, #f5f5f5);
    }
    .empty-state {
      padding: 48px;
      text-align: center;
      color: var(--mat-sys-on-surface-variant, #757575);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .empty-state mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
    .status-chip-active {
      --mdc-chip-elevated-container-color: #e8f5e9 !important;
      --mdc-chip-label-text-color: #2e7d32 !important;
    }
    .status-chip-inactive {
      --mdc-chip-elevated-container-color: #ffeeb2 !important;
      --mdc-chip-label-text-color: #e65100 !important;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantListComponent {
  tenants = input.required<Tenant[]>();
  toggleStatus = output<string>();

  displayedColumns: string[] = ['name', 'email', 'status', 'spend', 'actions'];
}
