# RF-6.12: Rate Limit en Sandbox

## Información General
- **ID:** RF-6.12
- **Dominio:** DOM-6 — Integration API
- **Bounded Context:** `IntegrationAPI`
- **Trazabilidad:** Visión §9

## Resumen
**Rate limit en sandbox:** 15 solicitudes/min por key; burst hasta 30 en 10s; concurrencia máxima 5 peticiones en vuelo. La mitad de producción.

## User Story

**DADO QUE** un sistema consume la API con una key de sandbox,
**CUANDO** envía solicitudes dentro de los límites (≤ 15/min, ≤ 30 en 10s, ≤ 5 concurrentes),
**ENTONCES** todas las solicitudes son procesadas normalmente.

---

**DADO QUE** un sistema excede los límites de rate en sandbox,
**CUANDO** supera cualquiera de los límites,
**ENTONCES** las solicitudes excedentes reciben HTTP 429 (RF-6.13).

## Criterios Mínimos de Aceptación

- [ ] Límite por key: **15 solicitudes por minuto** (mitad de producción).
- [ ] Burst: hasta **30 solicitudes en 10 segundos**.
- [ ] Concurrencia máxima: **5 peticiones en vuelo**.
- [ ] Los límites se aplican **por API Key**.
- [ ] Los headers de respuesta incluyen información de límites.
- [ ] La documentación indica claramente que sandbox tiene límites más restrictivos.
