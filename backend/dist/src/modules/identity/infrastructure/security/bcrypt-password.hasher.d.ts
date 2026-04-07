import { IPasswordHasher } from '../../application/ports/IPasswordHasher';
export declare class BcryptPasswordHasher implements IPasswordHasher {
    private readonly saltRounds;
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}
