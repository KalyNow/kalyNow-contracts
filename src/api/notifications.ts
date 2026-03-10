import type { UUID, ISODateString, PaginatedResponse, ApiResponse } from "../types/common";
import type {
  Notification,
  CreateNotificationPayload,
  NotificationStatus,
  NotificationChannel,
  NotificationCategory,
} from "../types/notification";

// ─── Request shapes ───────────────────────────────────────────────────────────

/** Query parameters for listing a user's notifications */
export interface ListNotificationsQuery {
  page?: number;
  pageSize?: number;
  status?: NotificationStatus;
  channel?: NotificationChannel;
  category?: NotificationCategory;
  /** Return only notifications created after this timestamp */
  since?: ISODateString;
}

// ─── Response shapes ──────────────────────────────────────────────────────────

/** GET /notifications */
export type ListNotificationsResponse = ApiResponse<PaginatedResponse<Notification>>;

/** GET /notifications/:id */
export type GetNotificationResponse = ApiResponse<Notification>;

/** POST /notifications  (internal / admin endpoint) */
export type SendNotificationRequest = CreateNotificationPayload;
export type SendNotificationResponse = ApiResponse<Notification>;

/** PATCH /notifications/:id/open — mark a notification as opened */
export interface MarkNotificationOpenedRequest {
  openedAt?: ISODateString;
}

export interface MarkNotificationOpenedResult {
  notificationId: UUID;
  openedAt: ISODateString;
}

export type MarkNotificationOpenedResponse = ApiResponse<MarkNotificationOpenedResult>;

/** POST /notifications/batch-open — mark multiple notifications as opened */
export interface BatchOpenNotificationsRequest {
  notificationIds: UUID[];
  openedAt?: ISODateString;
}

export interface BatchOpenNotificationsResult {
  updatedCount: number;
  updatedIds: UUID[];
}

export type BatchOpenNotificationsResponse = ApiResponse<BatchOpenNotificationsResult>;

/** GET /notifications/unread-count */
export interface UnreadCountResult {
  recipientId: UUID;
  count: number;
}

export type UnreadCountResponse = ApiResponse<UnreadCountResult>;
