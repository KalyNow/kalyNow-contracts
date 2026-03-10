import type { UUID, ISODateString } from "../types/common";

/**
 * Base shape shared by every domain event published on the event bus.
 */
export interface BaseEvent<TName extends string, TPayload> {
  /** Globally unique event identifier (UUID v4) */
  eventId: UUID;
  /** Discriminator used to route/handle the event */
  eventName: TName;
  /** ISO 8601 timestamp of when the event was produced */
  occurredAt: ISODateString;
  /** Service that produced the event, e.g. "offer-service" */
  source: string;
  /** Correlation ID for distributed tracing */
  correlationId?: UUID;
  /** The event-specific data */
  payload: TPayload;
}
