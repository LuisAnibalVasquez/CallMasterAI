# RF-8.01: Evento de Auditoría — api_key.created

## Información General
- **ID:** RF-8.01
- **Dominio:** DOM-8 — Audit & Compliance
- **Bounded Context:** `Audit`
- **Trazabilidad:** Visión §10.2
- **Dependencias:** RF-6.04 (creación de API Keys)

## Resumen
Registrar evento `api_key.created` cuando se crea una nueva API Key, para trazabilidad y cumplimiento.

## User Story

**DADO QUE** un administrador del tenant o el Owner crea una nueva API Key,
**CUANDO** el sistema completa la creación de la key exitosamente,
**ENTONCES** registra automáticamente un evento de auditoría `api_key.created` con los campos obligatorios (RF-8.11).

## Criterios Mínimos de Aceptación

- [ ] Se registra el evento `api_key.created` al completar la creación exitosa de una API Key.
- [ ] El evento incluye los campos obligatorios: quién (usuario), qué (acción), tenant, ambiente, timestamp, ID de recurso (ID de la key).
- [ ] NO se almacena el valor de la key en el registro de auditoría (RF-8.12).
- [ ] Se registra el nombre descriptivo de la key y su alcance (full/read_only).
- [ ] El evento se registra de forma asíncrona (no bloquea la operación principal).
