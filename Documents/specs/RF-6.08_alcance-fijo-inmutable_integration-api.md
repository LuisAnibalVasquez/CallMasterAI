# RF-6.08: Alcance Fijo e Inmutable de API Key

## Información General
- **ID:** RF-6.08
- **Dominio:** DOM-6 — Integration API
- **Bounded Context:** `IntegrationAPI`
- **Trazabilidad:** Visión §10.1
- **Decisión de producto:** El alcance es inmutable. Para cambiar permisos se crea nueva key y se revoca la anterior.

## Resumen
Cada API Key debe tener un **alcance** (scope) fijo al crearse: `full` o `read_only`. El alcance es **inmutable**.

## User Story

**DADO QUE** un administrador del tenant crea una API Key con alcance `read_only`,
**CUANDO** necesita una key con alcance `full`,
**ENTONCES** debe crear una nueva key con alcance `full` y opcionalmente revocar la de `read_only` — no puede cambiar el alcance de la key existente.

---

**DADO QUE** una key tiene alcance `read_only`,
**CUANDO** se usa para un endpoint que requiere `full` (ej: crear campaña),
**ENTONCES** la API retorna HTTP 403 (Forbidden) indicando permisos insuficientes.

## Criterios Mínimos de Aceptación

- [ ] El alcance se define al crear la key: `full` o `read_only`.
- [ ] El alcance es **inmutable** — no se puede cambiar después de creada.
- [ ] Para cambiar permisos: crear nueva key + revocar la anterior.
- [ ] Endpoints que requieren `full` rechazan keys `read_only` con HTTP 403.
- [ ] El alcance es visible en el listado de keys del tenant.
- [ ] No existe el evento de auditoría `api_key.scope_changed` (decisión de producto).
