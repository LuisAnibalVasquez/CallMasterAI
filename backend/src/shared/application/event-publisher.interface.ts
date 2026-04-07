import { IDomainEvent } from '../domain/domain-event.interface';

/**
 * Abstracción para publicar domain events.
 * La implementación concreta usará NestJS EventEmitter.
 *
 * [DIP] Los use cases dependen de esta abstracción, no del EventEmitter directamente.
 */
export interface IEventPublisher {
  publish(event: IDomainEvent): Promise<void>;
  publishAll(events: IDomainEvent[]): Promise<void>;
}

export const EVENT_PUBLISHER = Symbol('EVENT_PUBLISHER');
