import type { BaseEvent } from "./base-event";
import type { UUID, ISODateString, Money, Address } from "../types/common";
import type { OfferCategory } from "../types/offer";

export const OFFER_CREATED = "offer_created" as const;

/** Payload carried by the offer_created event */
export interface OfferCreatedPayload {
  offerId: UUID;
  sellerId: UUID;
  title: string;
  price: Money;
  category: OfferCategory;
  address: Address;
  tags: string[];
  createdAt: ISODateString;
}

/** Full offer_created event type */
export type OfferCreatedEvent = BaseEvent<typeof OFFER_CREATED, OfferCreatedPayload>;

/**
 * Factory helper — creates a well-formed OfferCreatedEvent.
 * Services should use this to guarantee the envelope is filled in correctly.
 */
export function createOfferCreatedEvent(
  payload: OfferCreatedPayload,
  source: string,
  correlationId?: string
): OfferCreatedEvent {
  return {
    eventId: crypto.randomUUID(),
    eventName: OFFER_CREATED,
    occurredAt: new Date().toISOString(),
    source,
    correlationId,
    payload,
  };
}
