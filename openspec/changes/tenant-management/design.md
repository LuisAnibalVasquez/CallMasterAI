# Design: Tenant Management

## Technical Approach

Implement the Tenant Management domain across the backend `TenantModule` and the frontend Owner Dashboard.
- **Backend**: Introduce `Tenant` and `Environment` entities using Clean Architecture. `CreateTenantUseCase` will handle provisioning of the tenant, environments (sandbox/production), default settings, and initial user creation. Data isolation (RF-2.05) will be enforced at the infrastructure layer using `AsyncLocalStorage` to automatically append `tenant_id` to queries via a custom TypeORM `BaseRepository`.
- **Frontend**: Create a standalone, lazy-loaded Angular 21 feature `admin-dashboard` using signals for state management, restricted to the `PlatformOwner` role.

## Architecture Decisions

### Decision: Multi-tenant Data Isolation Mechanism

**Choice**: `AsyncLocalStorage` (ALS) to inject `tenantId` into a custom TypeORM `BaseRepository`.
**Alternatives considered**: Postgres Row Level Security (RLS) via `SET LOCAL app.current_tenant`, or passing `tenantId` explicitly from controllers down to every repository method.
**Rationale**: Explicitly passing `tenantId` is error-prone and violates the "automatic, no manual omission" requirement (RF-2.05). Postgres RLS is powerful but introduces complexity with connection pooling in Node.js. ALS with a custom TypeORM base repository intercepts all queries transparently while keeping application logic standard.

### Decision: Initial User Provisioning Flow

**Choice**: Define an `IUserProvisioningService` port in `TenantModule`, implemented by an adapter that interacts with `IdentityModule`.
**Alternatives considered**: Asynchronous Domain Events (e.g., `TenantCreatedEvent`).
**Rationale**: The requirement states the generated password must be shown to the Owner in the immediate response (RF-2.02). An asynchronous event makes returning this data impossible. A synchronous port-adapter approach maintains module decoupling (DIP) while allowing the immediate return of the password.

### Decision: Password Generation Location

**Choice**: Generate the random password inside `CreateTenantUseCase` (`TenantModule`), hash it, and pass the hash to `IdentityModule`.
**Alternatives considered**: Delegating generation entirely to `IdentityModule`.
**Rationale**: `IdentityModule` should only deal with password hashes and security protocols. Since `TenantModule` is orchestrating the creation and is responsible for displaying the temporary password to the Owner, it should handle the generation and ephemeral display.

## Data Flow

```text
Owner (UI) ──> TenantsController ──> CreateTenantUseCase
                                        ├──> TenantRepository.save()
                                        ├──> EnvironmentRepository.save() (Sandbox & Prod)
                                        ├──> TenantSettingsRepository.save() (Defaults)
                                        ├──> IUserProvisioningService.provision() (Identity adapter)
                                        └──> AuditService.log('tenant.created')
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `backend/src/modules/tenant/domain/entities/Tenant.ts` | Create | Core Tenant entity (id, name, status, etc.) |
| `backend/src/modules/tenant/domain/entities/Environment.ts` | Create | Sandbox/Production environments |
| `backend/src/modules/tenant/application/use-cases/CreateTenantUseCase.ts` | Create | Orchestrates tenant creation and provisioning |
| `backend/src/modules/tenant/application/use-cases/ToggleTenantStatusUseCase.ts` | Create | Handles activation/deactivation logic |
| `backend/src/modules/tenant/application/use-cases/GetTenantsUseCase.ts` | Create | Queries tenants for the dashboard |
| `backend/src/modules/tenant/application/ports/IUserProvisioningService.ts`| Create | Port for creating the initial user |
| `backend/src/modules/tenant/infrastructure/adapters/UserProvisioningAdapter.ts`| Create | Implements port using `IdentityModule` |
| `backend/src/modules/tenant/infrastructure/http/tenants.controller.ts` | Create | Exposes Owner endpoints |
| `backend/src/core/tenant-context/tenant-context.service.ts` | Create | ALS service to hold current `tenantId` |
| `backend/src/core/tenant-context/tenant.middleware.ts` | Create | Extracts `tenantId` from JWT into ALS |
| `backend/src/core/database/base.repository.ts` | Create | Overrides TypeORM methods to append `tenant_id` |
| `frontend/src/app/features/admin-dashboard/*` | Create | Standalone components for Owner Dashboard |

## Interfaces / Contracts

```typescript
// backend/src/modules/tenant/application/ports/IUserProvisioningService.ts
export interface IUserProvisioningService {
  provisionInitialUser(data: {
    email: string;
    passwordHash: string;
    tenantId: string;
    roleName: string;
    mustChangePassword: true;
  }): Promise<void>;
}

// Creation Response (HTTP 201)
export interface TenantCreatedResponse {
  id: string;
  name: string;
  status: 'ACTIVE';
  environments: { id: string; type: 'SANDBOX' | 'PRODUCTION' }[];
  initialUser: {
    email: string;
    temporaryPassword: string; // Shown strictly once
  };
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `CreateTenantUseCase` | Mock repositories and provisioning service. Verify password complexity generation and sequence of calls. |
| Unit | `TenantContextService` | Verify `AsyncLocalStorage` successfully maintains state across asynchronous boundaries. |
| Integration | `BaseRepository` | Use an SQLite/pg in-memory DB to ensure `find`, `update`, and `delete` operations automatically filter by the `tenantId` provided by ALS, rejecting cross-tenant reads (HTTP 404 behavior). |
| E2E | `POST /api/v1/tenants` | Send creation payload, assert DB state (Tenant, Environments, Settings), verify the response contains the temporary password. |

## Migration / Rollout

No data migration required as this is a core setup for the MVP. Subsequent entities created in the system MUST extend the `BaseRepository` to ensure RF-2.05 compliance.

## Open Questions

- [ ] RF-2.04 mentions "gasto incurrido" (incurred spend). Since there is no Billing module yet, should this be mocked as `0` on the `Tenant` entity for the MVP, or calculated dynamically from voice campaigns? (Assuming mock `0` for MVP).