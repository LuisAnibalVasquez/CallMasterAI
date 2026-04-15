import { Repository, ObjectLiteral, FindManyOptions, FindOneOptions, SaveOptions } from 'typeorm';
import { TenantContextService } from '../tenant-context/tenant-context.service';
import { BaseRepository } from './base.repository';

// Dummy entity for testing
class DummyEntity {
  id: string;
  tenant_id: string;
  name: string;
}

// Dummy repo extending BaseRepository
class DummyRepository extends BaseRepository<DummyEntity> {
  constructor(
    repository: Repository<DummyEntity>,
    tenantContextService: TenantContextService,
  ) {
    super(repository.target, repository.manager, repository.queryRunner, tenantContextService);
    // Mocking the underlying manager methods is hard, so we usually test that the overridden methods
    // append the tenant_id to the query options before calling super or manager.
  }
}

describe('BaseRepository', () => {
  let repository: DummyRepository;
  let tenantContextService: TenantContextService;

  beforeEach(() => {
    tenantContextService = new TenantContextService();
    // Mock the typeorm repository dependencies
    const mockRepo = {
      target: DummyEntity,
      manager: {
        find: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
      },
      queryRunner: undefined,
    } as unknown as Repository<DummyEntity>;

    repository = new DummyRepository(mockRepo, tenantContextService);
  });

  describe('find', () => {
    it('should append tenant_id to the where clause if in context', async () => {
      tenantContextService.run('tenant-123', async () => {
        const options: FindManyOptions<DummyEntity> = { where: { name: 'test' } };
        
        // Mock super.find by overriding it on the prototype or manager
        jest.spyOn(Repository.prototype, 'find').mockResolvedValue([]);
        
        await repository.find(options);
        
        expect(Repository.prototype.find).toHaveBeenCalledWith({
          where: { name: 'test', tenant_id: 'tenant-123' },
        });
      });
    });

    it('should not append tenant_id if out of context', async () => {
      const options: FindManyOptions<DummyEntity> = { where: { name: 'test' } };
      jest.spyOn(Repository.prototype, 'find').mockResolvedValue([]);
      
      await repository.find(options);
      
      expect(Repository.prototype.find).toHaveBeenCalledWith({
        where: { name: 'test' },
      });
    });
  });

  describe('findOne', () => {
    it('should append tenant_id to where clause', async () => {
      tenantContextService.run('tenant-123', async () => {
        const options: FindOneOptions<DummyEntity> = { where: { id: '1' } };
        jest.spyOn(Repository.prototype, 'findOne').mockResolvedValue(null);
        
        await repository.findOne(options);
        
        expect(Repository.prototype.findOne).toHaveBeenCalledWith({
          where: { id: '1', tenant_id: 'tenant-123' },
        });
      });
    });
  });

  describe('save', () => {
    it('should append tenant_id to the entity before saving', async () => {
      tenantContextService.run('tenant-123', async () => {
        const entity = new DummyEntity();
        entity.name = 'test';
        
        jest.spyOn(Repository.prototype, 'save').mockResolvedValue(entity as any);
        
        await repository.save(entity);
        
        expect(Repository.prototype.save).toHaveBeenCalledWith(
          expect.objectContaining({ name: 'test', tenant_id: 'tenant-123' }),
          undefined
        );
      });
    });
  });
});
