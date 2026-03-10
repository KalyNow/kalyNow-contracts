/**
 * Common primitive and utility types shared across the kalyNow platform.
 */

/** ISO 8601 datetime string, e.g. "2024-01-15T10:30:00Z" */
export type ISODateString = string;

/** UUID v4 string identifier */
export type UUID = string;

/** Supported currencies in the platform */
export type Currency = "USD" | "EUR" | "GBP" | "BRL";

/** Supported locales */
export type Locale = "en-US" | "en-GB" | "pt-BR" | "es-ES";

/** Generic paginated response wrapper */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

/** Generic API error shape */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/** Generic API success response wrapper */
export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

/** Money value with explicit currency */
export interface Money {
  amount: number;
  currency: Currency;
}

/** Geographic coordinates */
export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

/** Address shared across offer and user types */
export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates?: GeoCoordinates;
}
