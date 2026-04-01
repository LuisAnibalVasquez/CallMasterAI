# RF-8.11: Campos Obligatorios en Eventos de Auditoría

## Información General
- **ID:** RF-8.11
- **Dominio:** DOM-8 — Audit & Compliance
- **Bounded Context:** `Audit`
- **Trazabilidad:** Visión §10.2

## Resumen
Cada evento de auditoría debe incluir: **quién** (usuario o sistema), **qué** (acción), **tenant**, **ambiente** (cuando aplique), **timestamp** e **ID de recurso**.

## User Story

**DADO QUE** ocurre cualquier acción auditable en la plataforma,
**CUANDO** el sistema genera el evento de auditoría correspondiente,
**ENTONCES** incluye obligatoriamente todos los campos requeridos: actor (quién), acción (qué), tenant, ambiente, timestamp UTC e ID del recurso afectado.

---

**DADO QUE** un evento de auditoría es consultado por el Owner o un administrador del tenant,
**CUANDO** accede al log de auditoría,
**ENTONCES** puede identificar sin ambigüedad: quién ejecutó la acción, sobre qué recurso, en qué tenant y ambiente, y cuándo.

## Criterios Mínimos de Aceptación

- [ ] **Quién (actor):** ID del usuario que ejecutó la acción, o "system" si fue automatizado.
- [ ] **Qué (acción):** tipo de evento (ej: `api_key.created`, `tenant.deactivated`).
- [ ] **Tenant:** ID del tenant afectado.
- [ ] **Ambiente:** sandbox o producción (cuando aplique, ej: operaciones de API Key o campaña).
- [ ] **Timestamp:** fecha y hora en UTC con precisión de milisegundos.
- [ ] **ID de recurso:** identificador del recurso afectado (ID de key, ID de tenant, ID de usuario).
- [ ] Los campos son obligatorios: un evento sin alguno de estos campos es considerado inválido.
- [ ] El esquema de eventos es consistente (misma estructura JSON/tabla para todos los tipos).
