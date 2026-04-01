# RF-3.02: Carga de Contactos mediante CSV

## Información General
- **ID:** RF-3.02
- **Dominio:** DOM-3 — Campaign Management
- **Bounded Context:** `CampaignManagement`
- **Trazabilidad:** Visión §7, §9
- **Dependencias:** RF-3.01 (campaña creada), RF-3.04 (auto-inicio)

## Resumen
El tenant debe poder **cargar contactos** para una campaña mediante archivo CSV. Los campos mínimos obligatorios son nombre y teléfono.

## User Story

**DADO QUE** un usuario del tenant tiene una campaña en estado "borrador",
**CUANDO** sube un archivo CSV con los campos obligatorios (nombre y teléfono) y otros campos opcionales,
**ENTONCES** el sistema valida el formato del archivo, verifica que los campos obligatorios estén presentes, parsea los contactos y los asocia a la campaña, mostrando un resumen del número de contactos cargados.

---

**DADO QUE** un usuario sube un CSV con formato inválido o campos obligatorios faltantes,
**CUANDO** el sistema valida el archivo,
**ENTONCES** rechaza la carga, muestra los errores encontrados (filas con problemas, campos faltantes) y no modifica los datos de la campaña.

---

**DADO QUE** un usuario sube un CSV con algunos registros inválidos (ej: teléfonos mal formateados),
**CUANDO** el sistema valida el archivo,
**ENTONCES** reporta las filas con errores y permite al usuario decidir si proceder solo con los registros válidos o corregir y resubir el archivo completo.

## Criterios Mínimos de Aceptación

- [ ] El archivo debe ser formato CSV (delimitado por comas o punto y coma).
- [ ] Campos obligatorios por fila: `nombre` y `teléfono`.
- [ ] Se valida formato básico de teléfono (longitud mínima, solo dígitos y prefijos).
- [ ] Se reportan errores de validación por fila con detalle comprensible.
- [ ] Se muestra un resumen post-carga: total de registros, válidos, inválidos.
- [ ] El archivo se almacena temporalmente asociado a la campaña (se elimina según RF-3.08).
- [ ] No se permiten archivos vacíos ni archivos sin registros válidos.
- [ ] El tamaño máximo del archivo debe estar limitado (definir en implementación).
