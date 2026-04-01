# RF-6.11: Rate Limit en Producción

## Información General
- **ID:** RF-6.11
- **Dominio:** DOM-6 — Integration API
- **Bounded Context:** `IntegrationAPI`
- **Trazabilidad:** Visión §9

## Resumen
**Rate limit en producción:** 30 solicitudes/min por key; burst hasta 60 en 10s; concurrencia máxima 10 peticiones en vuelo.

## User Story

**DADO QUE** un sistema consume la API con una key de producción,
**CUANDO** envía solicitudes dentro de los límites (≤ 30/min, ≤ 60 en 10s, ≤ 10 concurrentes),
**ENTONCES** todas las solicitudes son procesadas normalmente.

---

**DADO QUE** un sistema excede los límites de rate,
**CUANDO** supera 30 solicitudes/min, 60 en 10s o 10 peticiones concurrentes,
**ENTONCES** las solicitudes excedentes reciben HTTP 429 (RF-6.13).

## Criterios Mínimos de Aceptación

- [ ] Límite por key: **30 solicitudes por minuto**.
- [ ] Burst: hasta **60 solicitudes en 10 segundos**.
- [ ] Concurrencia máxima: **10 peticiones en vuelo** simultáneamente.
- [ ] Los límites se aplican **por API Key** (no por tenant ni por IP).
- [ ] Los headers de respuesta incluyen información de límites: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.
