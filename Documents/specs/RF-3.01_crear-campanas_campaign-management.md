# RF-3.01: Creación de Campañas

## Información General
- **ID:** RF-3.01
- **Dominio:** DOM-3 — Campaign Management
- **Bounded Context:** `CampaignManagement`
- **Trazabilidad:** Visión §7
- **Dependencias:** RF-3.11 (validación API Key activa), RF-3.02 (carga CSV), RF-3.03 (carga guion)

## Resumen
El tenant debe poder **crear campañas** de cualquier tipo según su necesidad (comercial, cobranza/notificación, etc.) desde el portal web.

## User Story

**DADO QUE** un usuario del tenant está autenticado y accede a la sección de campañas,
**CUANDO** selecciona la opción de crear nueva campaña e ingresa los datos requeridos (nombre, tipo/propósito, descripción),
**ENTONCES** el sistema valida que el tenant tenga al menos una API Key activa (RF-3.11), crea la campaña con estado "borrador" y permite proceder con la carga de contactos y guion.

---

**DADO QUE** un usuario del tenant intenta crear una campaña,
**CUANDO** el tenant no tiene ninguna API Key activa en el ambiente actual,
**ENTONCES** el sistema rechaza la creación e informa al usuario que debe tener al menos una API Key activa.

---

**DADO QUE** un usuario del tenant crea una campaña exitosamente,
**CUANDO** la campaña está en estado "borrador",
**ENTONCES** el usuario puede subir el CSV de contactos (RF-3.02) y el guion (RF-3.03) para completar la configuración.

## Criterios Mínimos de Aceptación

- [ ] La campaña se crea con estado inicial "borrador" (draft).
- [ ] Datos mínimos requeridos: nombre de la campaña.
- [ ] Se valida que el tenant tenga al menos una API Key activa (RF-3.11) antes de permitir la creación.
- [ ] La campaña queda asociada al tenant y al ambiente (sandbox/producción) del usuario.
- [ ] El tipo de campaña es libre (comercial, cobranza/notificación, otro) — no es un catálogo cerrado en MVP.
- [ ] Se hereda automáticamente la configuración de marcación del tenant (RF-5.01, RF-5.02, RF-5.03).
- [ ] La campaña no puede iniciarse hasta que se carguen el CSV de contactos y el guion.
