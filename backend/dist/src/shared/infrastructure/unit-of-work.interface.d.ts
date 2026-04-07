export interface IUnitOfWork {
    begin(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
export declare const UNIT_OF_WORK: unique symbol;
