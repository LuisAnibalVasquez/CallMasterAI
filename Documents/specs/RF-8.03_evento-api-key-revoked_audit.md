# RF-8.03: Evento de Auditoría — api_key.revoked

## Información General
- **ID:** RF-8.03
- **Dominio:** DOM-8 — Audit & Compliance
- **Bounded Context:** `Audit`
- **Trazabilidad:** Visión §10.2
- **Dependencias:** RF-6.05 (desactivación por tenant), RF-6.06 (revocación por Owner)

## Resumen
Registrar evento `api_key.revoked` cuando se desactiva una API Key, ya sea por acción del tenant o del Owner.

## User Story

**DADO QUE** un administrador del tenant desactiva una API Key o el Owner revoca una key,
**CUANDO** la key queda invalidada,
**ENTONCES** registra un evento de auditoría `api_key.revoked` indicando quién realizó la acción.

## Criterios Mínimos de Aceptación

- [ ] Se registra el evento `api_key.revoked` al desactivar/revocar una key.
- [ ] El evento incluye los campos obligatorios (RF-8.11).
- [ ] Se diferencia si la acción fue realizada por el propio tenant o por el Owner (ver también RF-8.07).
- [ ] NO se almacena el valor de la key (RF-8.12).
- [ ] El evento se registra de forma asíncrona.
