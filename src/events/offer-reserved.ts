import type { BaseEvent } from "./base-event";
import type { UUID, ISODateString } from "../types/common";

export const OFFER_RESERVED = "offer_reserved" as const;

/** Payload carried by the offer_reserved event */
export interface OfferReservedPayload {
  offerId: UUID;
  sellerId: UUID;
  buyerId: UUID;
  /** Duration in seconds for which the offer is held */
  reservationDurationSeconds: number;
  reservedAt: ISODateString;
  /** When the reservation automatically expires if not confirmed */
  expiresAt: ISODateString;
}

/** Full offer_reserved event type */
export type OfferReservedEvent = BaseEvent<typeof OFFER_RESERVED, OfferReservedPayload>;

/**
 * Factory helper — creates a well-formed OfferReservedEvent.
 */
export function createOfferReservedEvent(
  payload: OfferReservedPayload,
  source: string,
  correlationId?: string
): OfferReservedEvent {
  return {
    eventId: crypto.randomUUID(),
    eventName: OFFER_RESERVED,
    occurredAt: new Date().toISOString(),
    source,
    correlationId,
    payload,
  };
}
