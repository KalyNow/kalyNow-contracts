import type { UUID, ISODateString } from "./common";

/** Delivery channel for a notification */
export type NotificationChannel = "push" | "email" | "sms" | "in_app";

/** Current read/delivery status of a notification */
export type NotificationStatus = "pending" | "sent" | "delivered" | "opened" | "failed";

/** Category that groups related notifications */
export type NotificationCategory =
  | "offer_activity"
  | "reservation"
  | "account"
  | "marketing"
  | "system";

/** A platform notification sent to a user */
export interface Notification {
  id: UUID;
  recipientId: UUID;
  channel: NotificationChannel;
  status: NotificationStatus;
  category: NotificationCategory;
  title: string;
  body: string;
  /** Deep-link or URL the user is taken to on tap/click */
  actionUrl?: string;
  /** Arbitrary key/value payload delivered alongside push/in-app messages */
  data?: Record<string, unknown>;
  sentAt?: ISODateString;
  deliveredAt?: ISODateString;
  openedAt?: ISODateString;
  createdAt: ISODateString;
}

/** Payload for creating and dispatching a notification */
export interface CreateNotificationPayload {
  recipientId: UUID;
  channel: NotificationChannel;
  category: NotificationCategory;
  title: string;
  body: string;
  actionUrl?: string;
  data?: Record<string, unknown>;
}
