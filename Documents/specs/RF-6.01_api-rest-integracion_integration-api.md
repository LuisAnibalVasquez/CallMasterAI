# RF-6.01: API REST para Integración

## Información General
- **ID:** RF-6.01
- **Dominio:** DOM-6 — Integration API
- **Bounded Context:** `IntegrationAPI`
- **Trazabilidad:** Visión §7

## Resumen
El sistema debe exponer una **API REST** para integración con sistemas del tenant, permitiendo gestionar campañas programáticamente.

## User Story

**DADO QUE** un sistema del tenant necesita integrar programáticamente la gestión de campañas,
**CUANDO** consume los endpoints REST de la plataforma con una API Key válida,
**ENTONCES** puede realizar todas las operaciones disponibles según el alcance de la key (crear campañas, subir archivos, iniciar ejecución, consultar estados y resultados).

## Criterios Mínimos de Aceptación

- [ ] La API sigue principios RESTful (HTTP verbs, status codes, rutas de recursos).
- [ ] Los endpoints retornan JSON como formato de respuesta.
- [ ] La API está versionada (ej: `/api/v1/...`).
- [ ] Existe documentación de API generada automáticamente (ej: OpenAPI/Swagger).
- [ ] Los errores retornan respuestas consistentes: `{ "error": { "code": "...", "message": "..." } }`.
- [ ] La API soporta HTTPS exclusivamente (no HTTP plano).
- [ ] Todos los endpoints requieren autenticación (RF-1.02).
