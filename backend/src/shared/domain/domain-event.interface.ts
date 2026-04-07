/**
 * Interfaz base para todos los Domain Events.
 * Patrón Observer para comunicación entre bounded contexts.
 */
export interface IDomainEvent {
  readonly occurredAt: Date;
  readonly eventName: string;
}
