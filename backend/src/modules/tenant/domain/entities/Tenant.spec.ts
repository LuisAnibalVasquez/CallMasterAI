import { Tenant } from './Tenant';

describe('Tenant Entity', () => {
  it('should create a tenant with default values', () => {
    const tenant = new Tenant({
      id: 'tenant-1',
      name: 'Acme Corp',
      phone: '+1234567890',
      adminEmail: 'admin@acme.com',
    });

    expect(tenant.isActive).toBe(true);
    expect(tenant.incurredSpend).toBe(0);
  });

  it('should create a tenant with provided values', () => {
    const tenant = new Tenant({
      id: 'tenant-1',
      name: 'Acme Corp',
      phone: '+1234567890',
      adminEmail: 'admin@acme.com',
      isActive: false,
      incurredSpend: 150.5,
    });

    expect(tenant.isActive).toBe(false);
    expect(tenant.incurredSpend).toBe(150.5);
  });
});
