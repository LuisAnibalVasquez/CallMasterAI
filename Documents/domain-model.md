# Modelo de Dominio — CallMasterAI MVP (Parte 1: Entidades y Enumeraciones)

> [!NOTE]
> Referencia para generar clases TypeScript (NestJS). Cada elemento está trazado a los [specs funcionales](file:///c:/Users/luisa/source/repos/CallMasterAI/Documents/specs). Para interfaces y servicios ver [Parte 2](file:///c:/Users/luisa/source/repos/CallMasterAI/Documents/domain-model-services.md). Para el diagrama ER ver [entity-relationship.md](file:///c:/Users/luisa/source/repos/CallMasterAI/Documents/entity-relationship.md).

---

## Enumeraciones

```csharp
// Compartida
public enum EnvironmentType { Sandbox, Production }

// DOM-1: Identity
public enum UserRole { PlatformOwner, TenantAdmin }

// DOM-2: Tenant Management
public enum TenantStatus { Active, Inactive }
public enum PasswordPolicyDays { Days30 = 30, Days60 = 60, Days90 = 90, Days180 = 180 }

// DOM-3: Campaign Management
public enum CampaignStatus { Draft, Ready, Running, Paused, Completed, Cancelled }
public enum CampaignFileType { ContactsCsv, Script }
public enum ContactStatus { Pending, InCall, Answered, NoAnswer, Busy, InvalidNumber, Error }

// DOM-4: Voice Agent
public enum CallStatus { Initiated, Ringing, Connected, Completed, Failed, NoAnswer, Busy }

// DOM-6: Integration API
public enum ApiKeyScope { Full, ReadOnly }
public enum ApiKeyStatus { Active, Revoked }

// DOM-7: Notification
public enum NotificationType { CampaignClosure, PasswordRecovery }
public enum NotificationStatus { Pending, Sent, Failed }

// DOM-8: Audit
public enum ActorType { User, System }
```

---

## Entidades del Dominio

### DOM-1: Identity

#### `User` — Aggregate Root
| Propiedad | Tipo | Descripción | Requisito |
|:---|:---|:---|:---|
| `Id` | `Guid` | PK | — |
| `Email` | `string` | Login, único | RF-1.01 |
| `PasswordHash` | `string` | BCrypt/Argon2 | RF-1.01 |
| `Role` | `UserRole` | Owner o TenantAdmin | RF-1.07 |
| `TenantId` | `Guid?` | null para Owner | RF-2.05 |
| `MustChangePassword` | `bool` | true en primer login | RF-2.02, RF-1.06 |
| `PasswordLastChangedAt` | `DateTime` | Para evaluar caducidad | RF-1.05 |
| `IsActive` | `bool` | | — |
| `CreatedAt` | `DateTime` | | — |
| `LastLoginAt` | `DateTime?` | | — |

**Navegación:** `Tenant?`

#### `PasswordResetToken`
| Propiedad | Tipo | Descripción | Requisito |
|:---|:---|:---|:---|
| `Id` | `Guid` | PK | — |
| `UserId` | `Guid` | FK → User | RF-1.04 |
| `TokenHash` | `string` | Hash del token enviado | RF-1.04 |
| `ExpiresAt` | `DateTime` | Expiración (ej: 30 min) | RF-1.04 |
| `UsedAt` | `DateTime?` | null = no usado | RF-1.04 |
| `CreatedAt` | `DateTime` | | — |

---

### DOM-2: Tenant Management

#### `Tenant` — Aggregate Root
| Propiedad | Tipo | Descripción | Requisito |
|:---|:---|:---|:---|
| `Id` | `Guid` | PK | — |
| `Name` | `string` | Único | RF-2.01 |
| `ContactEmail` | `string` | Email de contacto | RF-2.01 |
| `Status` | `TenantStatus` | Active/Inactive | RF-2.03 |
| `PasswordPolicy` | `PasswordPolicyDays` | Default: 90 | RF-1.05 |
| `CreatedAt` | `DateTime` | | — |
| `UpdatedAt` | `DateTime` | | — |

**Navegación:** `Users`, `ApiKeys`, `Campaigns`, `DialingConfiguration?`

---

### DOM-3: Campaign Management

#### `Campaign` — Aggregate Root
| Propiedad | Tipo | Descripción | Requisito |
|:---|:---|:---|:---|
| `Id` | `Guid` | PK | — |
| `TenantId` | `Guid` | FK → Tenant | RF-2.05 |
| `Name` | `string` | | RF-3.01 |
| `Description` | `string?` | | RF-3.01 |
| `CampaignType` | `string?` | Libre: "comercial", "cobranza" | RF-3.01 |
| `Environment` | `EnvironmentType` | Sandbox/Production | RF-2.06 |
| `Status` | `CampaignStatus` | | RF-3.04 |
| `PauseReason` | `string?` | "fuera_de_horario", "dia_feriado" | RF-5.04, RF-5.05 |
| `TotalContacts` | `int` | | RF-3.05 |
| `ContactsProcessed` | `int` | | RF-3.05 |
| `TotalCostUsd` | `decimal` | | RF-3.06 |
| `CreatedAt` | `DateTime` | | — |
| `StartedAt` | `DateTime?` | | — |
| `CompletedAt` | `DateTime?` | | — |

**Navegación:** `Tenant`, `Files`, `Contacts`, `Interactions`

#### `CampaignFile`
| Propiedad | Tipo | Descripción | Requisito |
|:---|:---|:---|:---|
| `Id` | `Guid` | PK | — |
| `CampaignId` | `Guid` | FK → Campaign | RF-3.02, RF-3.03 |
| `FileType` | `CampaignFileType` | CSV o Script | RF-3.02, RF-3.03 |
| `OriginalFileName` | `string` | | — |
| `StoragePath` | `string` | Ruta en storage | — |
| `SizeBytes` | `long` | | — |
| `UploadedAt` | `DateTime` | | — |
| `DeletedAt` | `DateTime?` | Eliminación automática | RF-3.08 |

#### `Contact`
| Propiedad | Tipo | Descripción | Requisito |
|:---|:---|:---|:---|
| `Id` | `Guid` | PK | — |
| `CampaignId` | `Guid` | FK → Campaign | RF-3.02 |
| `Name` | `string` | Campo obligatorio CSV | RF-3.02 |
| `Phone` | `string` | Campo obligatorio CSV | RF-3.02 |
| `Status` | `ContactStatus` | | RF-3.05 |
| `ProcessedAt` | `DateTime?` | | — |

#### `CampaignAggregate` — Datos persistentes post-limpieza
| Propiedad | Tipo | Descripción | Requisito |
|:---|:---|:---|:---|
| `Id` | `Guid` | PK | — |
| `CampaignId` | `Guid` | Referencia (no FK) | RF-3.09 |
| `TenantId` | `Guid` | | RF-3.09 |
| `Environment` | `EnvironmentType` | | — |
| `TotalContacts` | `int` | | RF-3.09 |
| `TotalCallsMade` | `int` | | RF-3.09 |
| `TotalCallsAnswered` | `int` | | RF-3.09 |
| `TotalCallsNoAnswer` | `int` | | RF-3.09 |
| `TotalCallsFailed` | `int` | | RF-3.09 |
| `TotalCostUsd` | `decimal` | | RF-3.09 |
| `TotalDurationSeconds` | `long` | | RF-3.09 |
| `CampaignCompletedAt` | `DateTime` | | — |

---

### DOM-4: Voice Agent

#### `CallInteraction`
| Propiedad | Tipo | Descripción | Requisito |
|:---|:---|:---|:---|
| `Id` | `Guid` | PK | — |
| `CampaignId` | `Guid` | FK → Campaign | RF-4.01 |
| `ContactId` | `Guid` | FK → Contact | RF-4.01 |
| `Status` | `CallStatus` | | RF-4.01 |
| `Language` | `string` | "es" / "en" | RF-4.04 |
| `StartedAt` | `DateTime` | | — |
| `EndedAt` | `DateTime?` | | — |
| `DurationSeconds` | `int?` | | RF-4.03 |
| `Transcript` | `string?` | Temporal (RF-3.10) | RF-4.03 |
| `RequestedNegotiation` | `bool` | Contacto pidió negociar | RF-4.05 |
| `CreatedAt` | `DateTime` | | — |

---

### DOM-5: Dialing Rules

#### `DialingConfiguration` — 1:1 con Tenant
| Propiedad | Tipo | Descripción | Requisito |
|:---|:---|:---|:---|
| `Id` | `Guid` | PK | — |
| `TenantId` | `Guid` | FK → Tenant (unique) | RF-5.01 |
| `TimeZoneId` | `string` | IANA: "America/Caracas" | RF-5.01 |
| `WindowStartTime` | `TimeOnly` | Ej: 08:00 | RF-5.02 |
| `WindowEndTime` | `TimeOnly` | Ej: 18:00 | RF-5.02 |
| `JurisdictionId` | `Guid` | FK → Jurisdiction | RF-5.03 |
| `UpdatedAt` | `DateTime` | | — |

#### `Jurisdiction`
| Propiedad | Tipo | Descripción | Requisito |
|:---|:---|:---|:---|
| `Id` | `Guid` | PK | — |
| `CountryCode` | `string` | "VE", "PR" | RF-5.03 |
| `Name` | `string` | "Venezuela", "Puerto Rico" | RF-5.03 |
| `IsActive` | `bool` | | — |
| `CreatedAt` | `DateTime` | | — |

#### `Holiday`
| Propiedad | Tipo | Descripción | Requisito |
|:---|:---|:---|:---|
| `Id` | `Guid` | PK | — |
| `JurisdictionId` | `Guid` | FK → Jurisdiction | RF-5.05, RF-5.08 |
| `Date` | `DateOnly` | | RF-5.05 |
| `Name` | `string` | "Día de la Independencia" | RF-5.08 |
| `CreatedAt` | `DateTime` | | — |

---

### DOM-6: Integration API

#### `ApiKey` — Aggregate Root
| Propiedad | Tipo | Descripción | Requisito |
|:---|:---|:---|:---|
| `Id` | `Guid` | PK | — |
| `TenantId` | `Guid` | FK → Tenant | RF-6.07 |
| `Name` | `string` | Nombre descriptivo | RF-6.04 |
| `KeyHash` | `string` | Hash (nunca texto plano) | RF-1.02 |
| `KeyLastFour` | `string` | Últimos 4 chars | RF-6.04 |
| `Environment` | `EnvironmentType` | | RF-6.07 |
| `Scope` | `ApiKeyScope` | Inmutable | RF-6.08 |
| `Status` | `ApiKeyStatus` | | RF-6.05 |
| `CreatedAt` | `DateTime` | | — |
| `RevokedAt` | `DateTime?` | | RF-6.05 |
| `RevokedByUserId` | `Guid?` | Quién revocó | RF-6.06, RF-8.07 |

---

### DOM-7: Notification

#### `NotificationLog`
| Propiedad | Tipo | Descripción | Requisito |
|:---|:---|:---|:---|
| `Id` | `Guid` | PK | — |
| `TenantId` | `Guid` | | RF-7.01 |
| `CampaignId` | `Guid?` | null si no vinculado | RF-7.01 |
| `Type` | `NotificationType` | | RF-7.01, RF-7.02 |
| `RecipientEmail` | `string` | | — |
| `Subject` | `string` | | — |
| `Status` | `NotificationStatus` | | — |
| `SentAt` | `DateTime?` | | — |
| `RetryCount` | `int` | | RF-7.01 |
| `ErrorMessage` | `string?` | | — |
| `CreatedAt` | `DateTime` | | — |

---

### DOM-8: Audit

#### `AuditEvent` — Inmutable
| Propiedad | Tipo | Descripción | Requisito |
|:---|:---|:---|:---|
| `Id` | `Guid` | PK | — |
| `EventType` | `string` | "api_key.created", etc. | RF-8.11 |
| `ActorId` | `string` | User ID o "system" | RF-8.11 |
| `ActorType` | `ActorType` | | RF-8.11 |
| `TenantId` | `Guid?` | | RF-8.11 |
| `Environment` | `string?` | "sandbox"/"production" | RF-8.11 |
| `ResourceId` | `string` | ID del recurso afectado | RF-8.11 |
| `Details` | `string?` | JSON sin secretos | RF-8.12 |
| `Timestamp` | `DateTime` | UTC, milisegundos | RF-8.11 |
