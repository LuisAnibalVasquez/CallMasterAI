export interface IApiKeyValidationPort {
  hasActiveApiKey(tenantId: string): Promise<boolean>;
}
