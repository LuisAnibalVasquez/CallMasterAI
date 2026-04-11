import { Inject, Injectable } from '@nestjs/common';
import { ITenantRepository } from '../../domain/interfaces/ITenantRepository';
import { TENANT_TOKENS } from '../constants/injection-tokens';

@Injectable()
export class ToggleTenantStatusUseCase {
  constructor(
    @Inject(TENANT_TOKENS.TENANT_REPOSITORY)
    private readonly tenantRepository: ITenantRepository
  ) {}

  async execute(tenantId: string): Promise<void> {
    const tenant = await this.tenantRepository.findById(tenantId);
    if (!tenant) {
      throw new Error('Tenant not found');
    }

    tenant.isActive = !tenant.isActive;
    await this.tenantRepository.update(tenant);
  }
}
