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
  templateUrl: './tenant-list.component.html',
  styleUrl: './tenant-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantListComponent {
  tenants = input.required<Tenant[]>();
  toggleStatus = output<string>();

  displayedColumns: string[] = ['name', 'email', 'status', 'spend', 'actions'];
}
