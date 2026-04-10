# SPEC: Role Management — Role Resolution from Database

## Problem Statement

Currently, the login flow returns `roleId` (UUID) from the database, but the frontend
compares against `roleName` strings (`"PlatformOwner"`, `"TenantAdmin"`). This causes
all authenticated users to be redirected incorrectly because the comparison always fails.

## Database Structure

### Roles Table (`roles`)
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | Unique role name (e.g., "PlatformOwner", "TenantAdmin") |
| description | VARCHAR | Optional description |
| createdAt | TIMESTAMP | Creation timestamp |
| updatedAt | TIMESTAMP | Update timestamp |

### Users Table (`users`)
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR | Unique email |
| passwordHash | VARCHAR | Bcrypt hashed password |
| roleId | UUID | FK to roles.id |
| tenantId | UUID | FK to tenants.id (nullable for PlatformOwner) |
| mustChangePassword | BOOLEAN | Password policy flag |
| ... | | |

## ADDED Requirements

### Requirement: Role Name in Authentication Response

The system **MUST** include the role name (not just the ID) in authentication
responses to enable client-side role-based routing.

The `AuthResult` **SHALL** contain:
- `roleId: string` — UUID of the role (for foreign key references)
- `roleName: string` — Name of the role (for UI/routing logic)

#### Scenario: Login returns role name

- GIVEN a user with role "PlatformOwner" exists in the database
- WHEN the user successfully authenticates with valid credentials
- THEN the response **MUST** include `roleName: "PlatformOwner"` alongside `roleId`

### Requirement: Role Name in JWT Payload

The system **MUST** include the role name in the JWT payload to enable stateless
role verification on both backend guards and frontend routing.

The `JwtPayload` **SHALL** contain:
- `roleId: string` — UUID of the role
- `roleName: string` — Name of the role

#### Scenario: JWT contains role name

- GIVEN a user is authenticated
- WHEN the JWT is decoded on the frontend
- THEN the payload **MUST** contain both `roleId` and `roleName`

### Requirement: Role Resolution During Login

The system **MUST** resolve the role entity (including name) when authenticating
a user to include accurate role information in the auth response.

#### Scenario: Role relation is loaded during login

- GIVEN a user exists with a valid roleId reference
- WHEN `LoginUseCase` retrieves the user for authentication
- THEN the implementation **MUST** load the associated role entity (using eager loading or explicit join)

---

## MODIFIED Requirements

### Requirement: Login Response Format (Previously: roleId only)

The login response **MUST** include both `roleId` and `roleName` to support
role-based functionality in the frontend.

(Previously: Only `roleId` was returned, causing frontend routing failures)

#### Scenario: Successful login returns complete role info

- GIVEN a user with role "TenantAdmin" exists
- WHEN the user submits valid credentials
- THEN the response **MUST** contain:
  - `success: true`
  - `token: <jwt>`
  - `roleId: <uuid>`
  - `roleName: "TenantAdmin"`
  - `mustChangePassword: <boolean>`

### Requirement: User Repository Query (Previously: No relation loading)

The `UserRepository.findByEmail()` **SHOULD** load the role relation when
fetching a user to enable role-based operations without additional queries.

(Previously: Only `roleId` was loaded, requiring separate role lookup)

#### Scenario: User with role loaded in single query

- GIVEN a user exists in the database with an assigned role
- WHEN `findByEmail("user@example.com")` is called
- THEN the returned user entity **MUST** include the role with `name` populated

---

## REMOVED Requirements

### Requirement: Hardcoded Role Comparison

The system **SHALL NOT** rely on hardcoded role names in the codebase for
determining user permissions or routing.

(Reason: Roles are now database-driven and may evolve; hardcoding breaks extensibility)

---

## Frontend Changes Required

### role.guard.ts
- Compare `userRole` against `roleName` from JWT payload
- Currently: `userRole === requiredRole` where `userRole` is `roleId`
- Fix: `userRole` must resolve to `roleName`

### auth.service.ts
- `userRole` computed signal **MUST** return `roleName` from decoded JWT
- `redirectToDashboard()` comparison **MUST** use `roleName` values

### auth.models.ts (JwtPayload)
```typescript
interface JwtPayload {
  sub: string;        // userId
  email: string;
  roleId: string;     // UUID (for API calls if needed)
  roleName: string;    // "PlatformOwner" | "TenantAdmin" | etc.
  tenantId: string | null;
  mustChangePassword: boolean;
}
```

---

## Implementation Checklist

- [ ] Update `UserRepositoryImpl.findByEmail()` to load role relation
- [ ] Add `roleName` to `AuthResult` value object
- [ ] Add `roleName` to `JwtPayload` interface
- [ ] Update `LoginUseCase` to resolve and include roleName
- [ ] Update `JwtTokenService` to accept roleName in token generation
- [ ] Update `JwtStrategy.validate()` to include roleName in request user
- [ ] Update frontend `auth.service.ts` to expose `roleName`
- [ ] Update frontend `role.guard.ts` to compare roleName
- [ ] Update frontend `redirectToDashboard()` to use roleName
- [ ] Add/update unit tests for affected components
