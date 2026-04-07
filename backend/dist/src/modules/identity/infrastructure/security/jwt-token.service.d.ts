import { JwtService } from '@nestjs/jwt';
import { ITokenService } from '../../application/ports/ITokenService';
import { JwtPayload } from '../../domain/value-objects/AuthResult';
export declare class JwtTokenService implements ITokenService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateToken(payload: JwtPayload): Promise<string>;
    verifyToken(token: string): Promise<JwtPayload>;
}
