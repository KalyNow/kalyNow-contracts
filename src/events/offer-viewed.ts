import type { BaseEvent } from "./base-event";
import type { UUID, ISODateString } from "../types/common";

export const OFFER_VIEWED = "offer_viewed" as const;

/** Payload carried by the offer_viewed event */
export interface OfferViewedPayload {
  offerId: UUID;
  sellerId: UUID;
  /** The user who viewed the offer; undefined for anonymous sessions */
  viewerId?: UUID;
  /** Anonymous session identifier */
  sessionId: string;
  /** Device/platform from which the view originated */
  platform: "web" | "ios" | "android";
  /** Referral source, e.g. "search", "recommendation", "direct" */
  referrer?: string;
  viewedAt: ISODateString;
}

/** Full offer_viewed event type */
export type OfferViewedEvent = BaseEvent<typeof OFFER_VIEWED, OfferViewedPayload>;

/**
 * Factory helper — creates a well-formed OfferViewedEvent.
 */
export function createOfferViewedEvent(
  payload: OfferViewedPayload,
  source: string,
  correlationId?: string
): OfferViewedEvent {
  return {
    eventId: crypto.randomUUID(),
    eventName: OFFER_VIEWED,
    occurredAt: new Date().toISOString(),
    source,
    correlationId,
    payload,
  };
}
