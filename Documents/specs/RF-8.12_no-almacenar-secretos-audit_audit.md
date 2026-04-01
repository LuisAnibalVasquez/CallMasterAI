# RF-8.12: No Almacenar Secretos en Registros de Auditoría

## Información General
- **ID:** RF-8.12
- **Dominio:** DOM-8 — Audit & Compliance
- **Bounded Context:** `Audit`
- **Trazabilidad:** Visión §10.2

## Resumen
**No almacenar** secretos ni payloads sensibles en los registros de auditoría. Los eventos deben ser informativos sin comprometer la seguridad.

## User Story

**DADO QUE** el sistema registra un evento de auditoría,
**CUANDO** el evento involucra un recurso sensible (API Key, contraseña, datos de contacto),
**ENTONCES** el registro incluye solo referencias (IDs, nombres descriptivos) y NUNCA incluye valores secretos, contraseñas, keys completas ni datos personales de contactos.

## Criterios Mínimos de Aceptación

- [ ] Los registros de auditoría **NUNCA** contienen: valores de API Keys, contraseñas (actuales, nuevas o anteriores), tokens de sesión, contenido de CSV ni transcripciones.
- [ ] Para API Keys, se registra solo el ID interno o las últimas 4 cifras (enmascarada).
- [ ] Para usuarios, se registra solo el ID del usuario (no datos personales adicionales).
- [ ] Se implementa una validación/sanitización antes de persistir eventos para asegurar que no se filtren secretos.
- [ ] Los payloads de request/response NO se incluyen en los eventos de auditoría.
