import { BaseEntity } from './base.entity';
import { IDomainEvent } from './domain-event.interface';
export declare abstract class AggregateRoot extends BaseEntity {
    private readonly _domainEvents;
    get domainEvents(): ReadonlyArray<IDomainEvent>;
    protected addDomainEvent(event: IDomainEvent): void;
    clearDomainEvents(): void;
}
