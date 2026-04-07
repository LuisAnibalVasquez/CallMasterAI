import { JwtPayload } from '../../domain/value-objects/AuthResult';
export interface ITokenService {
    generateToken(payload: JwtPayload): Promise<string>;
    verifyToken(token: string): Promise<JwtPayload>;
}
