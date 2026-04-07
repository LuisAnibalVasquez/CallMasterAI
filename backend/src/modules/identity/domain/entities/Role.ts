export class Role {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string | null = null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
