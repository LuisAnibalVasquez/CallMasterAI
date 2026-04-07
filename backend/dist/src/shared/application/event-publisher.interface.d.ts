import { IDomainEvent } from '../domain/domain-event.interface';
export interface IEventPublisher {
    publish(event: IDomainEvent): Promise<void>;
    publishAll(events: IDomainEvent[]): Promise<void>;
}
export declare const EVENT_PUBLISHER: unique symbol;
