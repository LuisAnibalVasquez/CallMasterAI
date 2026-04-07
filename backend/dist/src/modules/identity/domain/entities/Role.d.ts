export declare class Role {
    readonly id: string;
    name: string;
    description: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: string, name: string, description: string | null | undefined, createdAt: Date, updatedAt: Date);
}
