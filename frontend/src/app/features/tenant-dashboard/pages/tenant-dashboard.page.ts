import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tenant-dashboard',
  standalone: true,
  template: `
    <h1>Dashboard del Tenant</h1>
    <div class="dashboard-grid">
      <section class="card">
        <header class="card-header"><h2>Mis Campañas</h2></header>
        <div class="card-content"><p>Vista rápida de sus campañas activas y resultados recientes.</p></div>
      </section>
    </div>
  `,
  styles: `h1 { margin-bottom: 24px; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantDashboardPage {}
/**
 * Página de dashboard para TenantAdmin.
 * Muestra información resumida del tenant (campañas, métricas, estado).
 */
