export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface ChangePasswordRequestDto {
  currentPassword: string;
  newPassword: string;
}

export interface RequestPasswordResetDto {
  email: string;
}

export interface CompletePasswordResetDto {
  token: string;
  newPassword: string;
}
