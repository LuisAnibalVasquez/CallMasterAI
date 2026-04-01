# RF-6.05: Crear, Rotar y Desactivar API Keys (Self-Service)

## Información General
- **ID:** RF-6.05
- **Dominio:** DOM-6 — Integration API
- **Bounded Context:** `IntegrationAPI`
- **Trazabilidad:** Visión §10.1

## Resumen
El tenant debe poder **crear, rotar y desactivar** sus API Keys de forma autónoma (self-service) desde el portal.

## User Story

**DADO QUE** un administrador del tenant accede a la gestión de API Keys,
**CUANDO** selecciona una key activa y ejecuta la acción de rotar,
**ENTONCES** el sistema genera una nueva key que reemplaza a la anterior, invalida la key anterior y muestra la nueva key una única vez.

---

**DADO QUE** un administrador del tenant decide desactivar una key,
**CUANDO** ejecuta la acción de desactivar sobre una key activa,
**ENTONCES** la key queda invalidada inmediatamente y las solicitudes que la usen serán rechazadas.

## Criterios Mínimos de Aceptación

- [ ] **Crear:** generar nueva key con nombre, ambiente y alcance (ver RF-6.04).
- [ ] **Rotar:** generar nueva key que reemplaza a la anterior; la anterior queda invalidada inmediatamente.
- [ ] **Desactivar:** invalidar una key; las solicitudes con esa key se rechazan con HTTP 401.
- [ ] Todas las operaciones son self-service (no requieren intervención del Owner).
- [ ] Se registran eventos de auditoría: `api_key.created`, `api_key.rotated`, `api_key.revoked` (RF-8.01, 8.02, 8.03).
- [ ] La nueva key (en rotación o creación) se muestra **una sola vez**.
- [ ] Confirmar antes de desactivar/rotar (diálogo de confirmación).
