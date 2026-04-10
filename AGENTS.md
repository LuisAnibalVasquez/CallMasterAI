# AGENTS.md — CallMasterAI

## Stack

| Layer | Technology |
|-------|------------|
| Backend | NestJS 11 + TypeScript + TypeORM |
| Frontend | Angular 21 (standalone, signals, zoneless) |
| Database | PostgreSQL |
| Auth | JWT + Passport |
| Package manager | npm workspaces (monorepo) |

## Workspace Commands

```bash
# Backend only
npm run start:backend      # nest start --watch
npm run build --workspace=backend

# Frontend only
npm run start:frontend     # ng serve
npm run build --workspace=frontend

# Root
npm run build              # builds both workspaces
```

## Backend Dev

```bash
npm run lint --workspace=backend    # eslint + prettier
npm run test --workspace=backend    # Jest (src/**/*.spec.ts)
npm run test:watch --workspace=backend
npm run test:e2e --workspace=backend
```

- API prefix: `/api/v1`
- Swagger docs: `http://localhost:3000/api/docs`
- ESLint config: `backend/eslint.config.mjs` (typescript-eslint flat config)

## Frontend Dev

```bash
npm run test --workspace=frontend    # Vitest via ng test
```

- Uses `provideZonelessChangeDetection()`
- Angular CDK + Material available
- Use signals for state, `@if`/`@for`/`@switch` (NOT *ngIf/*ngFor)

## Architecture

### Backend (Clean Architecture per module)
```
src/modules/{module}/
├── application/use-cases/   # Business logic
├── domain/                  # Entities, value objects
├── infrastructure/
│   ├── http/               # Controllers
│   ├── persistence/        # Repositories, ORM entities
│   └── security/           # JWT, password hashing
```

### Frontend
```
src/app/
├── core/                   # Guards, interceptors, shared services
├── features/               # Lazy-loaded feature modules
└── layouts/               # Layout components
```

## Database

- Uses `host.docker.internal` for local Docker PostgreSQL
- Config in `backend/.env`
- TypeORM with `autoLoadEntities: true` — no manual entity registration needed

## Project Skills (auto-loaded)

- **nestjs-best-practices**: NestJS architecture patterns, dependency injection, security
- **angular-best-practices**: Angular 21 signals, standalone components, zoneless

## Key Patterns

### Backend
- Use injection tokens from `application/constants/injection-tokens`
- Password hashing via `BcryptPasswordHasher` (interface-based)
- JWT strategy in `infrastructure/security/jwt.strategy.ts`

### Frontend
- Guards: `authGuard`, `roleGuard`, `forcePasswordChangeGuard`
- Auth interceptor: `core/infrastructure/interceptors/auth.interceptor`
- Route roles match backend roles (e.g., `PlatformOwner`, `TenantAdmin`)

## Common Mistakes to Avoid

- Don't use `nest build --watch` — use `npm run start:backend`
- Don't create new TypeORM entities without adding to module's `TypeOrmModule.forFeature()`
- Don't use `src/**/*.spec.ts` for Jest (backend rootDir is `src/`, not repo root)
