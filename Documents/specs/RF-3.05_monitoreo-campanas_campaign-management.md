# RF-3.05: Monitoreo de Campañas

## Información General
- **ID:** RF-3.05
- **Dominio:** DOM-3 — Campaign Management
- **Bounded Context:** `CampaignManagement`
- **Trazabilidad:** Visión §7

## Resumen
El tenant debe poder **monitorear** sus campañas: efectividad, estados de contacto y costo incurrido.

## User Story

**DADO QUE** un usuario del tenant tiene campañas en ejecución o finalizadas,
**CUANDO** accede a la vista de detalle de una campaña,
**ENTONCES** el sistema muestra métricas actualizadas: total de contactos, llamadas realizadas, llamadas respondidas, llamadas no respondidas, estados de cada contacto y costo acumulado de la campaña.

---

**DADO QUE** un usuario del tenant accede al listado de campañas,
**CUANDO** visualiza campañas activas,
**ENTONCES** puede ver el progreso general de cada campaña (porcentaje de contactos procesados) y su estado actual.

## Criterios Mínimos de Aceptación

- [ ] Se muestra el estado actual de la campaña: borrador, en ejecución, pausada, completada.
- [ ] Métricas visibles: total contactos, llamadas realizadas, respondidas, no respondidas, en proceso.
- [ ] Se muestra el costo acumulado de la campaña (en USD).
- [ ] Se muestra el progreso como porcentaje de contactos procesados.
- [ ] Cada contacto tiene un estado visible: pendiente, en llamada, respondido, no respondido, error.
- [ ] Los datos se actualizan al recargar la página (no se requiere tiempo real en MVP).
- [ ] Solo se muestran campañas del tenant autenticado (aislamiento RF-2.05).
