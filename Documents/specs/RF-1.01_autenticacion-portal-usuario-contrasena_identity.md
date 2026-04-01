# RF-1.01: Autenticación de Portal Web con Usuario y Contraseña

## Información General
- **ID:** RF-1.01
- **Dominio:** DOM-1 — Identity & Access
- **Bounded Context:** `Identity`
- **Trazabilidad:** Visión §7.1

## Resumen
El sistema debe autenticar usuarios del portal web mediante **usuario y contraseña**. Este mecanismo aplica tanto para usuarios Owner (administrador de plataforma) como para usuarios de Tenant.

## User Story

**DADO QUE** un usuario registrado (Owner o Tenant) accede a la página de inicio de sesión del portal web,
**CUANDO** ingresa su usuario y contraseña correctos y envía el formulario de login,
**ENTONCES** el sistema valida las credenciales, crea una sesión autenticada y redirige al usuario al dashboard correspondiente según su rol.

---

**DADO QUE** un usuario accede a la página de inicio de sesión del portal web,
**CUANDO** ingresa credenciales incorrectas (usuario inexistente o contraseña inválida),
**ENTONCES** el sistema rechaza la autenticación, muestra un mensaje genérico de error (sin revelar si el usuario existe o no) y no crea ninguna sesión.

---

**DADO QUE** un usuario no autenticado intenta acceder a una ruta protegida del portal,
**CUANDO** el sistema detecta que no existe una sesión válida,
**ENTONCES** redirige al usuario a la página de inicio de sesión.

## Criterios Mínimos de Aceptación

- [ ] El formulario de login acepta campos de usuario (email) y contraseña.
- [ ] Las contraseñas se almacenan hasheadas (nunca en texto plano).
- [ ] Se genera un token de sesión (JWT o cookie segura) tras autenticación exitosa.
- [ ] Credenciales inválidas retornan un mensaje genérico de error (no revelar si el usuario existe).
- [ ] Las rutas protegidas redirigen a login si no hay sesión activa.
- [ ] La sesión tiene un tiempo de expiración configurable.
- [ ] Se protege contra ataques de fuerza bruta (rate limiting en el endpoint de login).
