# RF-6.02: Flujo Secuencial de Campaña vía API

## Información General
- **ID:** RF-6.02
- **Dominio:** DOM-6 — Integration API
- **Bounded Context:** `IntegrationAPI`
- **Trazabilidad:** Visión §7
- **Dependencias:** RF-3.04 (lógica de validación compartida)

## Resumen
Vía API, el flujo de campaña es secuencial y explícito: (1) crear campaña, (2) subir contactos, (3) subir guion, (4) **iniciar** campaña. No hay auto-inicio como en el portal.

## User Story

**DADO QUE** un sistema del tenant consume la API para gestionar una campaña,
**CUANDO** sigue el flujo secuencial: POST crear campaña → POST subir CSV → POST subir guion → POST iniciar campaña,
**ENTONCES** cada paso se ejecuta de forma independiente y el inicio requiere una llamada explícita al endpoint de inicio, ejecutando la misma lógica de validación de precondiciones que el portal (RF-3.04).

---

**DADO QUE** un sistema intenta iniciar una campaña que no tiene CSV o guion cargados,
**CUANDO** se llama al endpoint de inicio,
**ENTONCES** la API retorna un error indicando qué requisito falta (CSV y/o guion).

---

**DADO QUE** un sistema intenta subir el guion sin haber creado la campaña primero,
**CUANDO** no existe el ID de campaña referenciado,
**ENTONCES** la API retorna HTTP 404.

## Criterios Mínimos de Aceptación

- [ ] El flujo de API NO auto-inicia: el inicio es un paso explícito (POST).
- [ ] Cada paso valida que el anterior se haya completado correctamente.
- [ ] Se comparte la misma lógica de validación de precondiciones que el portal (RF-3.04).
- [ ] Se valida API Key activa antes de iniciar (RF-3.11).
- [ ] Endpoints provisionales: `POST /campaigns`, `POST /campaigns/{id}/contacts`, `POST /campaigns/{id}/script`, `POST /campaigns/{id}/start`.
- [ ] Cada endpoint retorna el estado actualizado de la campaña.
- [ ] Intentar ejecutar pasos fuera de orden retorna error descriptivo con HTTP 409 o 422.
