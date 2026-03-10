import type { BaseEvent } from "./base-event";
import type { UUID, ISODateString } from "../types/common";
import type { NotificationChannel, NotificationCategory } from "../types/notification";

export const NOTIFICATION_OPENED = "notification_opened" as const;

/** Payload carried by the notification_opened event */
export interface NotificationOpenedPayload {
  notificationId: UUID;
  recipientId: UUID;
  channel: NotificationChannel;
  category: NotificationCategory;
  /** Deep-link or URL the notification directed the user to */
  actionUrl?: string;
  openedAt: ISODateString;
  /** Milliseconds between delivery and open (for engagement metrics) */
  timeToOpenMs?: number;
}

/** Full notification_opened event type */
export type NotificationOpenedEvent = BaseEvent<
  typeof NOTIFICATION_OPENED,
  NotificationOpenedPayload
>;

/**
 * Factory helper — creates a well-formed NotificationOpenedEvent.
 */
export function createNotificationOpenedEvent(
  payload: NotificationOpenedPayload,
  source: string,
  correlationId?: string
): NotificationOpenedEvent {
  return {
    eventId: crypto.randomUUID(),
    eventName: NOTIFICATION_OPENED,
    occurredAt: new Date().toISOString(),
    source,
    correlationId,
    payload,
  };
}
