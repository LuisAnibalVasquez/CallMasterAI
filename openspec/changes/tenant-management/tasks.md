# Tasks: Tenant Management

## Phase 1: Backend Infrastructure (Data Isolation)

- [x] 1.1 Create `backend/src/core/tenant-context/tenant-context.service.ts` using `AsyncLocalStorage`.
- [x] 1.2 Create `backend/src/core/tenant-context/tenant.middleware.ts` to extract `tenantId` from JWT.
- [x] 1.3 Create `backend/src/core/database/base.repository.ts` overriding TypeORM methods to automatically append `tenant_id`.

## Phase 2: Backend Domain

- [x] 2.1 Create `backend/src/modules/tenant/domain/entities/Tenant.ts` (Fields: `name`, `phone`, `adminEmail`, `isActive` default `true`, `incurredSpend` default `0`).
- [x] 2.2 Create `backend/src/modules/tenant/domain/entities/Environment.ts` (Enum/types for SANDBOX, PRODUCTION).
- [x] 2.3 Register entities in `TenantModule` via `TypeOrmModule.forFeature()`.

## Phase 3: Backend Application Layer

- [x] 3.1 Create `backend/src/modules/tenant/application/ports/IUserProvisioningService.ts`.
- [x] 3.2 Create `backend/src/modules/tenant/application/use-cases/CreateTenantUseCase.ts` (Orchestrates creation, generates secure dynamic temporary password).
- [x] 3.3 Create `backend/src/modules/tenant/application/use-cases/GetTenantsUseCase.ts`.
- [x] 3.4 Create `backend/src/modules/tenant/application/use-cases/ToggleTenantStatusUseCase.ts`.

## Phase 4: Backend API & Adapters

- [x] 4.1 Create `backend/src/modules/tenant/infrastructure/adapters/UserProvisioningAdapter.ts` connecting to IdentityModule.
- [x] 4.2 Create `backend/src/modules/tenant/infrastructure/http/dto/create-tenant.dto.ts` with `name`, `phone`, `adminEmail`, and `isActive`.
- [x] 4.3 Create `backend/src/modules/tenant/infrastructure/http/tenants.controller.ts` with endpoints for creation, listing, and status toggle.

## Phase 5: Frontend Feature

- [x] 5.1 Create `frontend/src/app/features/admin-dashboard/tenant.service.ts` to consume tenant REST APIs.
- [x] 5.2 Create `frontend/src/app/features/admin-dashboard/admin-dashboard.component.ts` layout and signal state.
- [x] 5.3 Create `frontend/src/app/features/admin-dashboard/components/tenant-form.component.ts` (Reactive form for `name`, `phone`, `adminEmail`, `isActive`).
- [x] 5.4 Create `frontend/src/app/features/admin-dashboard/components/tenant-list.component.ts` displaying mocked spend and status toggle.

## Phase 6: Testing

- [ ] 6.1 Write unit tests for `CreateTenantUseCase.spec.ts` verifying static password and user provisioning.
- [x] 6.2 Write unit tests for `TenantContextService.spec.ts` verifying ALS state.
- [x] 6.3 Write integration tests for `BaseRepository.spec.ts` validating automatic `tenant_id` appending.
- [ ] 6.4 Write E2E test in `backend/src/modules/tenant/test/tenants.e2e-spec.ts` for `POST /api/v1/tenants`.
