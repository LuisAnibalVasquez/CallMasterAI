import { TenantMiddleware } from './tenant.middleware';
import { TenantContextService } from './tenant-context.service';
import { Request, Response } from 'express';

describe('TenantMiddleware', () => {
  let middleware: TenantMiddleware;
  let tenantContextService: TenantContextService;

  beforeEach(() => {
    tenantContextService = new TenantContextService();
    // Use jest spy to verify run is called
    jest.spyOn(tenantContextService, 'run');
    middleware = new TenantMiddleware(tenantContextService);
  });

  it('should call next without running context if no user exists', () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn();

    middleware.use(req, res, next);

    expect(tenantContextService.run).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should call next without running context if user has no tenantId', () => {
    const req = { user: { id: 'user-1' } } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    middleware.use(req, res, next);

    expect(tenantContextService.run).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should run context with tenantId and call next if user has tenantId', () => {
    const req = { user: { id: 'user-1', tenantId: 'tenant-123' } } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    middleware.use(req, res, next);

    expect(tenantContextService.run).toHaveBeenCalledWith('tenant-123', next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
