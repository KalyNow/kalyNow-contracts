import type { UUID, ISODateString, PaginatedResponse, ApiResponse } from "../types/common";
import type {
  Offer,
  OfferSummary,
  CreateOfferPayload,
  UpdateOfferPayload,
  OfferStatus,
  OfferCategory,
} from "../types/offer";

// ─── Request shapes ───────────────────────────────────────────────────────────

/** Query parameters for listing / searching offers */
export interface ListOffersQuery {
  page?: number;
  pageSize?: number;
  status?: OfferStatus;
  category?: OfferCategory;
  sellerId?: UUID;
  /** Free-text search term */
  q?: string;
  /** Minimum price (in the platform's base currency) */
  minPrice?: number;
  /** Maximum price (in the platform's base currency) */
  maxPrice?: number;
  /** City name filter */
  city?: string;
  /** Sort field */
  sortBy?: "createdAt" | "price" | "viewCount";
  sortOrder?: "asc" | "desc";
}

// ─── Response shapes ──────────────────────────────────────────────────────────

/** GET /offers */
export type ListOffersResponse = ApiResponse<PaginatedResponse<OfferSummary>>;

/** GET /offers/:id */
export type GetOfferResponse = ApiResponse<Offer>;

/** POST /offers */
export type CreateOfferRequest = CreateOfferPayload;
export type CreateOfferResponse = ApiResponse<Offer>;

/** PATCH /offers/:id */
export type UpdateOfferRequest = UpdateOfferPayload;
export type UpdateOfferResponse = ApiResponse<Offer>;

/** DELETE /offers/:id */
export interface DeleteOfferResponse {
  success: true;
  deletedAt: ISODateString;
}

// ─── Reservation ─────────────────────────────────────────────────────────────

/** POST /offers/:id/reserve */
export interface ReserveOfferRequest {
  buyerId: UUID;
  /** Desired reservation duration in seconds (default: 3600) */
  durationSeconds?: number;
}

export interface ReservationResult {
  offerId: UUID;
  buyerId: UUID;
  reservedAt: ISODateString;
  expiresAt: ISODateString;
}

export type ReserveOfferResponse = ApiResponse<ReservationResult>;

/** DELETE /offers/:id/reserve */
export interface CancelReservationResponse {
  success: true;
  cancelledAt: ISODateString;
}
