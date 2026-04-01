# RF-3.06: Dashboard del Tenant

## Información General
- **ID:** RF-3.06
- **Dominio:** DOM-3 — Campaign Management
- **Bounded Context:** `CampaignManagement`
- **Trazabilidad:** Visión §7

## Resumen
El **Dashboard del tenant** debe mostrar solo el resumen de **sus** campañas y **sus** gastos/costos. Es la vista principal tras iniciar sesión como usuario de tenant.

## User Story

**DADO QUE** un usuario del tenant inicia sesión en el portal,
**CUANDO** accede al dashboard principal,
**ENTONCES** el sistema muestra un resumen consolidado de sus campañas (activas, completadas, total), gasto incurrido acumulado y métricas clave de efectividad.

---

**DADO QUE** un usuario del tenant visualiza su dashboard,
**CUANDO** hace clic en una campaña del listado,
**ENTONCES** navega a la vista de detalle de esa campaña (RF-3.05) para ver monitoreo detallado.

## Criterios Mínimos de Aceptación

- [ ] El dashboard muestra solo datos del tenant autenticado (nunca datos de otros tenants).
- [ ] Indicadores consolidados: total de campañas, campañas activas, campañas completadas.
- [ ] Gasto total incurrido del tenant (en USD).
- [ ] Listado resumido de campañas recientes con estado y progreso.
- [ ] Acceso rápido a crear nueva campaña.
- [ ] Los datos se actualizan al recargar la página.
- [ ] El dashboard se adapta al ambiente actual (sandbox/producción) mostrando datos solo del ambiente seleccionado.
