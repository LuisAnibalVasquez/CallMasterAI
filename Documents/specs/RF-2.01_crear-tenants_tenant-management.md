# RF-2.01: Creación de Tenants

## Información General
- **ID:** RF-2.01
- **Dominio:** DOM-2 — Tenant Management
- **Bounded Context:** `TenantManagement`
- **Trazabilidad:** Visión §7
- **Dependencias:** RF-2.02 (usuario inicial), RF-8.05 (auditoría)

## Resumen
El Owner debe poder **crear nuevos tenants** desde el portal administrativo. Cada tenant representa un cliente de la plataforma con datos aislados y configuración independiente.

## User Story

**DADO QUE** el Owner está autenticado en el portal administrativo,
**CUANDO** accede al formulario de creación de tenant, ingresa los datos requeridos (nombre del tenant, datos de contacto, etc.) y confirma la creación,
**ENTONCES** el sistema crea el tenant con estado activo por defecto, genera el usuario inicial con contraseña automática (RF-2.02), provisionas los ambientes sandbox y producción, y muestra la confirmación al Owner con los datos del tenant y las credenciales iniciales.

---

**DADO QUE** el Owner intenta crear un tenant,
**CUANDO** los datos obligatorios están incompletos o inválidos,
**ENTONCES** el sistema rechaza la operación e indica los campos con error.

## Criterios Mínimos de Aceptación

- [ ] Solo usuarios con rol Owner pueden crear tenants.
- [ ] Los datos mínimos requeridos incluyen: nombre del tenant, correo electrónico de contacto.
- [ ] El tenant se crea con estado `activo` por defecto.
- [ ] Se provisiona automáticamente los ambientes sandbox y producción para el nuevo tenant.
- [ ] Se crea automáticamente el usuario inicial del tenant (ver RF-2.02).
- [ ] Se asigna la política de contraseña por defecto (ver RF-1.05).
- [ ] Se registra el evento de auditoría `tenant.created` (ver RF-8.05).
- [ ] No se permiten tenants con nombres duplicados.
