export declare abstract class BaseEntity {
    readonly id: string;
    readonly createdAt: Date;
    protected constructor(id: string, createdAt?: Date);
}
