# RF-3.04: Auto-Inicio de Campaña en Portal Web

## Información General
- **ID:** RF-3.04
- **Dominio:** DOM-3 — Campaign Management
- **Bounded Context:** `CampaignManagement`
- **Trazabilidad:** Visión §7
- **Dependencias:** RF-3.02 (CSV cargado), RF-3.03 (guion cargado), RF-3.11 (API Key activa), RF-6.02 (lógica compartida)

## Resumen
En el **portal web**, la campaña debe **iniciarse automáticamente** una vez que se hayan cargado tanto el CSV de contactos como el guion. La lógica de validación interna (precondiciones de inicio) es **compartida** con el flujo de API (RF-6.02).

## User Story

**DADO QUE** un usuario del tenant ha creado una campaña y ya cargó el CSV de contactos,
**CUANDO** carga exitosamente el archivo de guion (o viceversa: ya tenía el guion y carga el CSV),
**ENTONCES** el sistema detecta que ambos requisitos están cumplidos, ejecuta la validación compartida de precondiciones (RF-3.11: API Key activa, reglas de marcación válidas) y si todo es correcto, cambia automáticamente el estado de la campaña a "en ejecución".

---

**DADO QUE** una campaña cumple con CSV y guion cargados,
**CUANDO** la validación de precondiciones falla (ej: no hay API Key activa),
**ENTONCES** el sistema no inicia la campaña, la mantiene en estado "lista para iniciar" y muestra al usuario el motivo por el cual no puede iniciarse automáticamente.

## Criterios Mínimos de Aceptación

- [ ] La campaña se inicia automáticamente solo cuando ambos archivos (CSV y guion) están cargados y validados.
- [ ] Antes del inicio, se ejecuta la misma lógica de validación que usa el endpoint de API (RF-6.02): verificación de API Key activa (RF-3.11) y reglas de marcación vigentes.
- [ ] Si la validación falla, la campaña queda en estado intermedio "lista para iniciar" con mensaje explicativo.
- [ ] El usuario recibe retroalimentación visual inmediata del inicio automático (cambio de estado en pantalla).
- [ ] Una vez iniciada, la campaña no permite reemplazar el CSV ni el guion.
- [ ] El auto-inicio respeta la ventana de marcación del tenant (RF-5.04): si es fuera de horario, la campaña se programa para el próximo período hábil.
