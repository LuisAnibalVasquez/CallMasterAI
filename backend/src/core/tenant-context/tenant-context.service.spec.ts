import { TenantContextService } from './tenant-context.service';

describe('TenantContextService', () => {
  let service: TenantContextService;

  beforeEach(() => {
    service = new TenantContextService();
  });

  it('should return undefined when outside of context', () => {
    expect(service.getTenantId()).toBeUndefined();
  });

  it('should return the tenantId when inside context', (done) => {
    service.run('tenant-123', () => {
      expect(service.getTenantId()).toBe('tenant-123');
      done();
    });
  });

  it('should maintain separate contexts for concurrent runs', (done) => {
    let completed = 0;

    service.run('tenant-A', () => {
      setTimeout(() => {
        expect(service.getTenantId()).toBe('tenant-A');
        completed++;
        if (completed === 2) done();
      }, 10);
    });

    service.run('tenant-B', () => {
      setTimeout(() => {
        expect(service.getTenantId()).toBe('tenant-B');
        completed++;
        if (completed === 2) done();
      }, 5);
    });
  });
});
