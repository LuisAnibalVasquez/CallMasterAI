import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class TenantContextService {
  private readonly als = new AsyncLocalStorage<string>();

  getTenantId(): string | undefined {
    return this.als.getStore();
  }

  run<R>(tenantId: string, callback: () => R): R {
    return this.als.run(tenantId, callback);
  }
}
