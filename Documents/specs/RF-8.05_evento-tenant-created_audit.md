# RF-8.05: Evento de Auditoría — tenant.created

## Información General
- **ID:** RF-8.05
- **Dominio:** DOM-8 — Audit & Compliance
- **Bounded Context:** `Audit`
- **Trazabilidad:** Visión §10.2
- **Dependencias:** RF-2.01 (creación de tenants)

## Resumen
Registrar evento `tenant.created` cuando el Owner crea un nuevo tenant en la plataforma.

## User Story

**DADO QUE** el Owner crea un nuevo tenant desde el portal administrativo,
**CUANDO** el sistema completa la creación exitosa del tenant,
**ENTONCES** registra un evento de auditoría `tenant.created` incluyendo referencia al usuario inicial si aplica.

## Criterios Mínimos de Aceptación

- [ ] Se registra el evento `tenant.created` al completar la creación del tenant.
- [ ] El evento incluye los campos obligatorios (RF-8.11).
- [ ] Se registra el nombre del tenant y referencia al usuario inicial creado.
- [ ] NO se almacena la contraseña generada (RF-8.12).
- [ ] El evento se registra de forma asíncrona.
