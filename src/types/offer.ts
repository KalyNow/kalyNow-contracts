import type { UUID, ISODateString, Money, Address } from "./common";

/** Current lifecycle status of an offer */
export type OfferStatus =
  | "draft"
  | "active"
  | "reserved"
  | "sold"
  | "expired"
  | "cancelled";

/** Category of the offer */
export type OfferCategory =
  | "real_estate"
  | "vehicle"
  | "electronics"
  | "furniture"
  | "clothing"
  | "services"
  | "other";

/** A single image attached to an offer */
export interface OfferImage {
  id: UUID;
  url: string;
  altText?: string;
  isPrimary: boolean;
}

/** Full offer entity */
export interface Offer {
  id: UUID;
  title: string;
  description: string;
  price: Money;
  status: OfferStatus;
  category: OfferCategory;
  sellerId: UUID;
  images: OfferImage[];
  address: Address;
  tags: string[];
  viewCount: number;
  reservationCount: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  expiresAt?: ISODateString;
}

/** Lightweight offer summary used in listings */
export interface OfferSummary {
  id: UUID;
  title: string;
  price: Money;
  status: OfferStatus;
  category: OfferCategory;
  primaryImageUrl?: string;
  city: string;
  createdAt: ISODateString;
}

/** Payload for creating a new offer */
export interface CreateOfferPayload {
  title: string;
  description: string;
  price: Money;
  category: OfferCategory;
  images: Omit<OfferImage, "id">[];
  address: Address;
  tags?: string[];
  expiresAt?: ISODateString;
}

/** Payload for updating an existing offer */
export type UpdateOfferPayload = Partial<CreateOfferPayload>;
