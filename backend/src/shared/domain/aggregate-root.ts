import { BaseEntity } from './base.entity';
import { IDomainEvent } from './domain-event.interface';

/**
 * Clase base para Aggregate Roots.
 * Acumula domain events que se publican tras persistir.
 */
export abstract class AggregateRoot extends BaseEntity {
  private readonly _domainEvents: IDomainEvent[] = [];

  get domainEvents(): ReadonlyArray<IDomainEvent> {
    return [...this._domainEvents];
  }

  protected addDomainEvent(event: IDomainEvent): void {
    this._domainEvents.push(event);
  }

  clearDomainEvents(): void {
    this._domainEvents.length = 0;
  }
}
