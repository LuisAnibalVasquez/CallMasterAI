export declare class LoginRequestDto {
    email: string;
    password: string;
}
export declare class ChangePasswordRequestDto {
    currentPassword: string;
    newPassword: string;
}
export declare class RequestPasswordResetDto {
    email: string;
}
export declare class CompletePasswordResetDto {
    token: string;
    newPassword: string;
}
