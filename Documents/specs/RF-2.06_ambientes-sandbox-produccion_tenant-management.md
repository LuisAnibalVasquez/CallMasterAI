# RF-2.06: Ambientes Sandbox y Producción

## Información General
- **ID:** RF-2.06
- **Dominio:** DOM-2 — Tenant Management
- **Bounded Context:** `TenantManagement`
- **Trazabilidad:** Visión §7, §9

## Resumen
Cada tenant debe poder operar en al menos **dos ambientes**: sandbox y producción, con datos y credenciales completamente independientes. El sandbox permite probar integraciones sin afectar datos reales.

## User Story

**DADO QUE** un tenant ha sido creado en la plataforma,
**CUANDO** el sistema completa el aprovisionamiento,
**ENTONCES** se crean automáticamente dos ambientes independientes (sandbox y producción) con datos y API Keys separadas.

---

**DADO QUE** un tenant opera en el ambiente sandbox,
**CUANDO** crea campañas, sube archivos o ejecuta llamadas de prueba,
**ENTONCES** las operaciones se ejecutan con datos simulados (sin llamadas reales de voz), los resultados se almacenan de forma separada y no afectan el ambiente de producción ni generan costos de telefonia.

---

**DADO QUE** un tenant consume la API con una key de producción,
**CUANDO** el sistema procesa la solicitud,
**ENTONCES** opera exclusivamente sobre los datos del ambiente de producción de ese tenant.

## Criterios Mínimos de Aceptación

- [ ] Al crear un tenant, se provisiona automáticamente sandbox y producción.
- [ ] Los datos de sandbox y producción están completamente separados (campañas, contactos, resultados, métricas).
- [ ] Las API Keys están asociadas a **un ambiente específico** (una key de sandbox no funciona en producción y viceversa).
- [ ] En sandbox, las llamadas de voz no se ejecutan realmente (se simulan resultados).
- [ ] En sandbox, no se generan costos de telefonía ni de IA.
- [ ] El rate limiting en sandbox es más restrictivo que en producción (ver RF-6.11, RF-6.12).
- [ ] El portal permite al usuario del tenant identificar claramente en qué ambiente está operando (indicador visual).
