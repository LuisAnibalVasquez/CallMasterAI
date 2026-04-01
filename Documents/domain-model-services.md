# Modelo de Dominio — CallMasterAI MVP (Parte 2: Interfaces, Servicios y Eventos)

> [!NOTE]
> Complemento de [Parte 1: Entidades](file:///c:/Users/luisa/source/repos/CallMasterAI/Documents/domain-model.md). Define las abstracciones (DIP), servicios de aplicación, value objects y eventos de dominio.

---

## 1. Interfaces de Proveedores Externos (Infrastructure Layer)

Estas abstracciones permiten reemplazar componentes sin modificar la lógica de negocio (RF-4.07, principio DIP).

### Telefonía — reemplazable (ej: Twilio → Vonage)
```csharp
public interface ITelephonyProvider
{
    Task<CallResult> MakeCallAsync(string phoneNumber, string callbackUrl, CancellationToken ct);
    Task HangUpAsync(string callSid, CancellationToken ct);
}
```

### Speech-to-Text — reemplazable
```csharp
public interface ISpeechToTextService
{
    Task<string> TranscribeAsync(Stream audioStream, string language, CancellationToken ct);
}
```

### Text-to-Speech — reemplazable
```csharp
public interface ITextToSpeechService
{
    Task<Stream> SynthesizeAsync(string text, string language, string voiceId, CancellationToken ct);
}
```

### Motor conversacional / LLM — reemplazable
```csharp
public interface IConversationEngine
{
    Task<ConversationResponse> ProcessTurnAsync(
        string script,
        IReadOnlyList<ConversationMessage> history,
        string userInput,
        string language,
        CancellationToken ct);
}
```

### Almacenamiento de archivos
```csharp
public interface IFileStorageService
{
    Task<string> UploadAsync(string tenantId, string fileName, Stream content, CancellationToken ct);
    Task<Stream> DownloadAsync(string storagePath, CancellationToken ct);
    Task DeleteAsync(string storagePath, CancellationToken ct);
}
```

### Envío de correos
```csharp
public interface IEmailService
{
    Task SendAsync(string to, string subject, string htmlBody, CancellationToken ct);
}
```

---

## 2. Servicios de Aplicación (Application Layer)

Casos de uso del sistema, cada uno alineado a un bounded context.

```csharp
// DOM-1: Identity
public interface IAuthenticationService
{
    Task<AuthResult> LoginAsync(string email, string password, CancellationToken ct);
    Task<ApiKeyAuthResult> AuthenticateApiKeyAsync(string apiKey, CancellationToken ct);
    Task ChangePasswordAsync(Guid userId, string currentPassword, string newPassword, CancellationToken ct);
    Task RequestPasswordResetAsync(string email, CancellationToken ct);
    Task CompletePasswordResetAsync(string token, string newPassword, CancellationToken ct);
}

// DOM-2: Tenant Management
public interface ITenantManagementService
{
    Task<TenantCreatedResult> CreateTenantAsync(CreateTenantRequest request, CancellationToken ct);
    Task ActivateTenantAsync(Guid tenantId, CancellationToken ct);
    Task DeactivateTenantAsync(Guid tenantId, CancellationToken ct);
    Task UpdatePasswordPolicyAsync(Guid tenantId, PasswordPolicyDays policy, CancellationToken ct);
}

// DOM-3: Campaign Management
public interface ICampaignService
{
    Task<Campaign> CreateCampaignAsync(Guid tenantId, CreateCampaignRequest request, CancellationToken ct);
    Task UploadContactsAsync(Guid campaignId, Stream csvStream, CancellationToken ct);
    Task UploadScriptAsync(Guid campaignId, Stream scriptStream, string fileName, CancellationToken ct);
    Task StartCampaignAsync(Guid campaignId, CancellationToken ct);
    Task<Stream> GenerateResultsCsvAsync(Guid campaignId, CancellationToken ct);
}

// DOM-4: Voice Agent
public interface IVoiceAgentOrchestrator
{
    Task ProcessCampaignCallsAsync(Guid campaignId, CancellationToken ct);
    Task HandleCallAsync(Guid interactionId, CancellationToken ct);
}

// DOM-5: Dialing Rules
public interface IDialingRuleEvaluator
{
    Task<bool> CanDialNowAsync(Guid tenantId, CancellationToken ct);
    Task<DateTime> GetNextDialingWindowAsync(Guid tenantId, CancellationToken ct);
    Task<bool> IsHolidayAsync(Guid jurisdictionId, DateOnly date, CancellationToken ct);
}

// DOM-6: API Keys
public interface IApiKeyService
{
    Task<ApiKeyCreatedResult> CreateApiKeyAsync(Guid tenantId, CreateApiKeyRequest request, CancellationToken ct);
    Task<ApiKeyCreatedResult> RotateApiKeyAsync(Guid apiKeyId, CancellationToken ct);
    Task RevokeApiKeyAsync(Guid apiKeyId, Guid revokedByUserId, CancellationToken ct);
    Task<bool> HasActiveApiKeyAsync(Guid tenantId, EnvironmentType environment, CancellationToken ct);
}

// DOM-7: Notification
public interface INotificationService
{
    Task SendCampaignClosureEmailAsync(Guid campaignId, CancellationToken ct);
    Task SendPasswordRecoveryEmailAsync(Guid userId, string resetToken, CancellationToken ct);
}

// DOM-8: Audit (Cross-cutting)
public interface IAuditService
{
    Task LogAsync(string eventType, string actorId, ActorType actorType,
                  Guid? tenantId, string? environment, string resourceId,
                  object? details, CancellationToken ct);
}
```

---

## 3. Value Objects

Sin identidad propia; definidos por sus valores.

```csharp
public record AuthResult(bool Success, string? Token, Guid? UserId, UserRole? Role,
                          bool MustChangePassword, string? ErrorMessage);

public record ApiKeyAuthResult(bool Success, Guid? TenantId, EnvironmentType? Environment,
                                ApiKeyScope? Scope, string? ErrorMessage);

public record ApiKeyCreatedResult(Guid ApiKeyId, string PlainTextKey, string KeyLastFour);

public record TenantCreatedResult(Guid TenantId, Guid InitialUserId, string TemporaryPassword);

public record ConversationMessage(string Role, string Content, DateTime Timestamp);

public record ConversationResponse(string AgentMessage, bool ConversationComplete,
                                    bool RequestedNegotiation);

public record CallResult(string CallSid, CallStatus InitialStatus);
```

---

## 4. Eventos de Dominio

Patrón Observer para procesamiento asíncrono entre bounded contexts.

```csharp
public interface IDomainEvent { DateTime OccurredAt { get; } }

// Tenant lifecycle
public record TenantCreatedEvent(Guid TenantId, Guid InitialUserId, DateTime OccurredAt) : IDomainEvent;
public record TenantStatusChangedEvent(Guid TenantId, TenantStatus NewStatus, DateTime OccurredAt) : IDomainEvent;

// Campaign lifecycle
public record CampaignReadyToStartEvent(Guid CampaignId, DateTime OccurredAt) : IDomainEvent;
public record CampaignCompletedEvent(Guid CampaignId, Guid TenantId, DateTime OccurredAt) : IDomainEvent;
public record AllCallsCompletedEvent(Guid CampaignId, DateTime OccurredAt) : IDomainEvent;

// Calls
public record CallCompletedEvent(Guid InteractionId, Guid CampaignId, CallStatus Status, DateTime OccurredAt) : IDomainEvent;

// Security
public record PasswordChangedEvent(Guid UserId, string Reason, DateTime OccurredAt) : IDomainEvent;
public record ApiKeyCreatedEvent(Guid ApiKeyId, Guid TenantId, DateTime OccurredAt) : IDomainEvent;
public record ApiKeyRevokedEvent(Guid ApiKeyId, Guid TenantId, Guid RevokedBy, DateTime OccurredAt) : IDomainEvent;
```

---

## 5. Trazabilidad: Entidades → Requisitos

| Entidad | Bounded Context | Requisitos |
|:---|:---|:---|
| `User` | Identity | RF-1.01→1.08, RF-2.02 |
| `PasswordResetToken` | Identity | RF-1.04 |
| `Tenant` | TenantManagement | RF-2.01→2.06, RF-1.05 |
| `Campaign` | CampaignManagement | RF-3.01→3.11 |
| `CampaignFile` | CampaignManagement | RF-3.02, 3.03, 3.08 |
| `Contact` | CampaignManagement | RF-3.02 |
| `CampaignAggregate` | CampaignManagement | RF-3.09 |
| `CallInteraction` | VoiceAgent | RF-4.01→4.05 |
| `DialingConfiguration` | DialingRules | RF-5.01→5.03 |
| `Jurisdiction` | DialingRules | RF-5.03, 5.08 |
| `Holiday` | DialingRules | RF-5.05, 5.08 |
| `ApiKey` | IntegrationAPI | RF-6.03→6.08, RF-3.11 |
| `NotificationLog` | Notification | RF-7.01, 7.02 |
| `AuditEvent` | Audit | RF-8.01→8.13 |

---

## [Validación de Arquitectura]

- **SRP:** Cada entidad pertenece a un solo bounded context con una responsabilidad clara.
- **OCP:** Las interfaces de proveedores permiten agregar implementaciones sin modificar lógica existente.
- **LSP:** Implementaciones concretas (TwilioProvider, VonageProvider) son intercambiables.
- **ISP:** Interfaces segregadas por responsabilidad (ITelephonyProvider, ISpeechToTextService, etc.).
- **DIP:** Servicios de aplicación dependen de abstracciones, no de implementaciones concretas.
