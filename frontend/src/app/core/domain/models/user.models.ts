export interface User {
  id: string;
  email: string;
  roleId: string;
  tenantId: string | null;
  mustChangePassword: boolean;
  passwordLastChangedAt: string | Date;
  isActive: boolean;
  createdAt: string | Date;
  lastLoginAt: string | Date | null;
}
