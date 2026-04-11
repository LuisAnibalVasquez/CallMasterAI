import { Repository, DeepPartial, FindManyOptions, FindOneOptions, SaveOptions } from 'typeorm';
import { TenantContextService } from '../tenant-context/tenant-context.service';

export class BaseRepository<T extends { tenant_id?: string }> extends Repository<T> {
  constructor(
    target: any,
    manager: any,
    queryRunner: any,
    protected readonly tenantContextService: TenantContextService,
  ) {
    super(target, manager, queryRunner);
  }

  private get tenantId(): string | undefined {
    return this.tenantContextService.getTenantId();
  }

  private appendTenantIdToWhere<O extends { where?: any }>(options?: O): O {
    const tenantId = this.tenantId;
    if (!tenantId) {
      return options || {} as O;
    }

    const opts = options || {} as O;
    opts.where = { ...opts.where, tenant_id: tenantId };
    return opts;
  }

  find(options?: FindManyOptions<T>): Promise<T[]> {
    return super.find(this.appendTenantIdToWhere(options));
  }

  findOne(options: FindOneOptions<T>): Promise<T | null> {
    return super.findOne(this.appendTenantIdToWhere(options));
  }

  save<E extends DeepPartial<T>>(entity: E, options?: SaveOptions): Promise<E & T>;
  save<E extends DeepPartial<T>>(entities: E[], options?: SaveOptions): Promise<(E & T)[]>;
  save(entityOrEntities: any, options?: SaveOptions): Promise<any> {
    const tenantId = this.tenantId;
    if (tenantId) {
      if (Array.isArray(entityOrEntities)) {
        entityOrEntities.forEach((e) => (e.tenant_id = tenantId));
      } else {
        entityOrEntities.tenant_id = tenantId;
      }
    }
    return super.save(entityOrEntities, options);
  }
}
