export * from "./base-event";
export * from "./offer-created";
export * from "./offer-reserved";
export * from "./offer-viewed";
export * from "./notification-opened";

import type { OfferCreatedEvent } from "./offer-created";
import type { OfferReservedEvent } from "./offer-reserved";
import type { OfferViewedEvent } from "./offer-viewed";
import type { NotificationOpenedEvent } from "./notification-opened";

/** Discriminated union of all domain events */
export type DomainEvent =
  | OfferCreatedEvent
  | OfferReservedEvent
  | OfferViewedEvent
  | NotificationOpenedEvent;
