# RF-6.13: Respuesta HTTP 429 por Exceso de Rate Limit

## Información General
- **ID:** RF-6.13
- **Dominio:** DOM-6 — Integration API
- **Bounded Context:** `IntegrationAPI`
- **Trazabilidad:** Visión §9
- **Dependencias:** RF-6.11, RF-6.12 (rate limits)

## Resumen
Al exceder el rate limit, la API debe responder con **HTTP 429** (Too Many Requests) y documentar reintentos con backoff exponencial.

## User Story

**DADO QUE** un sistema excede el rate limit establecido,
**CUANDO** la API rechaza la solicitud,
**ENTONCES** retorna HTTP 429 con headers indicando cuándo puede reintentar (`Retry-After`) y un cuerpo JSON con mensaje descriptivo.

## Criterios Mínimos de Aceptación

- [ ] La respuesta HTTP es **429 Too Many Requests**.
- [ ] Se incluye el header `Retry-After` con el número de segundos para esperar antes de reintentar.
- [ ] El body incluye un mensaje descriptivo: `{ "error": { "code": "rate_limit_exceeded", "message": "...", "retry_after": <seconds> } }`.
- [ ] La documentación de API incluye guía de reintentos con **backoff exponencial**.
- [ ] La respuesta no revela información interna del sistema (solo el hecho del rate limit).
