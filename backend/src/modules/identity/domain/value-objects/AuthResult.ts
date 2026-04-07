export class AuthResult {
  constructor(
    public success: boolean,
    public token: string | null = null,
    public userId: string | null = null,
    public roleId: string | null = null,
    public mustChangePassword: boolean = false,
    public errorMessage: string | null = null,
  ) {}
}

export interface JwtPayload {
  sub: string;
  email: string;
  roleId: string;
  tenantId: string | null;
  mustChangePassword: boolean;
}
