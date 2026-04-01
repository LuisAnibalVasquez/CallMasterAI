# RF-3.03: Carga de Guion de Conversación

## Información General
- **ID:** RF-3.03
- **Dominio:** DOM-3 — Campaign Management
- **Bounded Context:** `CampaignManagement`
- **Trazabilidad:** Visión §7, §9
- **Dependencias:** RF-3.01 (campaña creada), RF-3.04 (auto-inicio)

## Resumen
El tenant debe poder **cargar un guion** como documento de texto (archivo separado del CSV). El guion guía la conversación del agente de voz con los contactos.

## User Story

**DADO QUE** un usuario del tenant tiene una campaña en estado "borrador",
**CUANDO** sube un archivo de guion en formato de texto,
**ENTONCES** el sistema valida que el archivo no esté vacío, lo asocia a la campaña y confirma la carga exitosa.

---

**DADO QUE** un usuario sube un archivo de guion vacío o en formato no soportado,
**CUANDO** el sistema valida el archivo,
**ENTONCES** rechaza la carga e indica el motivo del rechazo.

---

**DADO QUE** una campaña ya tiene un guion cargado y el usuario sube uno nuevo,
**CUANDO** el sistema procesa la solicitud,
**ENTONCES** reemplaza el guion anterior por el nuevo (solo si la campaña aún no ha iniciado).

## Criterios Mínimos de Aceptación

- [ ] El archivo de guion debe ser formato texto plano (.txt).
- [ ] El archivo no puede estar vacío.
- [ ] El guion se almacena temporalmente asociado a la campaña (se elimina según RF-3.08).
- [ ] Se permite reemplazar el guion solo si la campaña aún no ha iniciado.
- [ ] El tamaño máximo del archivo debe estar limitado.
- [ ] El guion es independiente del CSV de contactos (archivos separados).
- [ ] Se muestra una vista previa del contenido del guion tras la carga exitosa.
