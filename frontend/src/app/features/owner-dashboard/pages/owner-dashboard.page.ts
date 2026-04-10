import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  template: `
    <h1>Bienvenido, Platform Owner</h1>
    <div class="dashboard-grid">
      <section class="card">
        <header class="card-header"><h2>Estadísticas Globales</h2></header>
        <div class="card-content"><p>Resumen de todos los tenants y actividad de la plataforma.</p></div>
      </section>
    </div>
  `,
  styles: `h1 { margin-bottom: 24px; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwnerDashboardPage {}
