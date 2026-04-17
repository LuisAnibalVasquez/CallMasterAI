/**
 * Servicio de tokens JWT — implementación de `ITokenService`.
 *
 * Encapsula la generación y verificación de tokens mediante `JwtService` de Nest.
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenService } from '../../application/ports/ITokenService';
import { JwtPayload } from '../../domain/value-objects/AuthResult';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Genera un JWT firmado asincrónicamente con el payload proporcionado.
   * @param payload {JwtPayload}
   * @returns {Promise<string>} Token JWT
   */
  async generateToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  /**
   * Verifica y decodifica un JWT.
   * @param token {string}
   * @returns {Promise<JwtPayload>} Payload decodificado
   */
  async verifyToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token);
  }
}
