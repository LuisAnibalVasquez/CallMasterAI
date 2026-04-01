# RF-3.09: Conservación de Datos Agregados No Sensibles

## Información General
- **ID:** RF-3.09
- **Dominio:** DOM-3 — Campaign Management
- **Bounded Context:** `CampaignManagement`
- **Trazabilidad:** Visión §9
- **Dependencias:** RF-3.08 (eliminación de archivos)

## Resumen
El sistema debe conservar únicamente información **no sensible y agregada** tras la entrega de resultados: número de campañas, llamadas, estados de contacto y costo incurrido.

## User Story

**DADO QUE** una campaña ha completado su ejecución y los resultados han sido entregados al tenant,
**CUANDO** se aplica la política de minimización de datos (RF-3.08),
**ENTONCES** el sistema conserva exclusivamente datos agregados no sensibles: contadores de campañas, número de llamadas realizadas/respondidas/rechazadas, estados finales de contacto y costo incurrido, eliminando cualquier dato personal o sensible de los contactos.

---

**DADO QUE** los datos agregados de una campaña están conservados,
**CUANDO** el Owner o el tenant consulta métricas históricas o gasto,
**ENTONCES** los datos agregados están disponibles para analítica básica y facturación/cobro.

## Criterios Mínimos de Aceptación

- [ ] Se conservan: número de campañas creadas/ejecutadas por tenant, total de contactos por campaña, llamadas realizadas y rechazadas, estados finales, costo incurrido.
- [ ] NO se conservan: nombres de contactos, teléfonos, transcripciones completas, contenido del guion, contenido del CSV.
- [ ] Los datos agregados alimentan el dashboard del Owner (RF-2.04) y del tenant (RF-3.06).
- [ ] Los datos de costo son la base para facturación y margen bruto por tenant.
- [ ] Los datos agregados no tienen fecha de expiración (se conservan indefinidamente para analítica y facturación).
