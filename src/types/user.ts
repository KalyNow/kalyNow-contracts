import type { UUID, ISODateString } from "./common";

/** Role assigned to a platform user */
export type UserRole = "buyer" | "seller" | "admin";

/** Account status */
export type UserStatus = "active" | "suspended" | "pending_verification";

/** Public user profile (safe to expose in events and API responses) */
export interface UserProfile {
  id: UUID;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  memberSince: ISODateString;
}

/** Full user entity (internal use / admin only) */
export interface User extends UserProfile {
  email: string;
  status: UserStatus;
  phoneNumber?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
