# RF-8.02: Evento de Auditoría — api_key.rotated

## Información General
- **ID:** RF-8.02
- **Dominio:** DOM-8 — Audit & Compliance
- **Bounded Context:** `Audit`
- **Trazabilidad:** Visión §10.2
- **Dependencias:** RF-6.05 (rotación de API Keys)

## Resumen
Registrar evento `api_key.rotated` cuando se sustituye una API Key por otra nueva (la anterior queda inválida).

## User Story

**DADO QUE** un administrador del tenant rota una API Key existente,
**CUANDO** el sistema genera la nueva key y desactiva la anterior,
**ENTONCES** registra un evento de auditoría `api_key.rotated` con referencia a la key anterior y la nueva.

## Criterios Mínimos de Aceptación

- [ ] Se registra el evento `api_key.rotated` al completar la rotación.
- [ ] El evento incluye los campos obligatorios (RF-8.11).
- [ ] Se registra referencia al ID de la key anterior (desactivada) y al ID de la nueva.
- [ ] NO se almacenan los valores de las keys (RF-8.12).
- [ ] El evento se registra de forma asíncrona.
