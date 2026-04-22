import {
  Repository,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  SaveOptions,
  EntityTarget,
  EntityManager,
  QueryRunner,
} from 'typeorm';
import { TenantContextService } from '../tenant-context/tenant-context.service';

export class BaseRepository<
  T extends { tenant_id?: string },
> extends Repository<T> {
  constructor(
    target: EntityTarget<T>,
    manager: EntityManager,
    queryRunner: QueryRunner | undefined,
    protected readonly tenantContextService: TenantContextService,
  ) {
    super(target, manager, queryRunner);
  }

  private get tenantId(): string | undefined {
    return this.tenantContextService.getTenantId();
  }

  private appendTenantIdToWhere<O extends { where?: unknown }>(options?: O): O {
    const tenantId = this.tenantId;
    if (!tenantId) {
      return options || ({} as O);
    }

    const opts = options || ({} as O);
    opts.where = { ...((opts.where as object) || {}), tenant_id: tenantId };
    return opts;
  }

  find(options?: FindManyOptions<T>): Promise<T[]> {
    return super.find(this.appendTenantIdToWhere(options));
  }

  findOne(options: FindOneOptions<T>): Promise<T | null> {
    return super.findOne(this.appendTenantIdToWhere(options));
  }

  save<E extends DeepPartial<T>>(
    entity: E,
    options?: SaveOptions,
  ): Promise<E & T>;
  save<E extends DeepPartial<T>>(
    entities: E[],
    options?: SaveOptions,
  ): Promise<(E & T)[]>;
  save(
    entityOrEntities: DeepPartial<T> | DeepPartial<T>[],
    options?: SaveOptions,
  ): Promise<unknown> {
    const tenantId = this.tenantId;
    if (tenantId) {
      if (Array.isArray(entityOrEntities)) {
        entityOrEntities.forEach(
          (e) => ((e as { tenant_id?: string }).tenant_id = tenantId),
        );
      } else {
        (entityOrEntities as { tenant_id?: string }).tenant_id = tenantId;
      }
    }
    // TypeORM super.save is overloaded and TypeScript struggles to resolve it with union types
    // @ts-expect-error TypeScript cannot properly infer the save overload
    return super.save(entityOrEntities, options);
  }
}
