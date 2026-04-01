# RF-6.04: Múltiples API Keys por Tenant

## Información General
- **ID:** RF-6.04
- **Dominio:** DOM-6 — Integration API
- **Bounded Context:** `IntegrationAPI`
- **Trazabilidad:** Visión §9

## Resumen
Cada tenant debe poder crear **múltiples API Keys** para diferentes integraciones, ambientes y niveles de acceso.

## User Story

**DADO QUE** un administrador del tenant accede a la gestión de API Keys en el portal,
**CUANDO** crea una nueva API Key especificando nombre descriptivo, ambiente (sandbox/producción) y alcance (full/read_only),
**ENTONCES** el sistema genera una nueva key, la muestra una única vez para que el usuario la copie, y la agrega al listado de keys del tenant.

---

**DADO QUE** un tenant tiene múltiples API Keys,
**CUANDO** accede a la gestión de keys,
**ENTONCES** ve un listado con: nombre, ambiente, alcance, estado (activa/revocada), fecha de creación y últimas cifras de la key (para identificación sin exponer la key completa).

## Criterios Mínimos de Aceptación

- [ ] Se permite crear múltiples keys por tenant (sin límite estricto en MVP, pero razonable).
- [ ] Cada key se crea con: nombre descriptivo, ambiente (sandbox/producción) y alcance (full/read_only).
- [ ] La key completa se muestra **una sola vez** al momento de la creación (no es recuperable después).
- [ ] En el listado, solo se muestran las últimas 4 cifras de la key (enmascarada).
- [ ] Se registra el evento de auditoría `api_key.created` (RF-8.01).
