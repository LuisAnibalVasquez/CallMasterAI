import { Environment } from './Environment';

describe('Environment', () => {
  it('should have SANDBOX and PRODUCTION values', () => {
    expect(Environment.SANDBOX).toBe('SANDBOX');
    expect(Environment.PRODUCTION).toBe('PRODUCTION');
  });
});
