import type {
  Offer,
  OfferSummary,
  CreateOfferPayload,
} from "../types/offer";
import type { User, UserProfile } from "../types/user";
import type { Notification, CreateNotificationPayload } from "../types/notification";
import type { Money, Address, PaginatedResponse, ApiResponse } from "../types/common";

describe("Type contracts (compile-time checks via type assertions)", () => {
  it("Money type accepts valid values", () => {
    const money: Money = { amount: 100, currency: "USD" };
    expect(money.amount).toBe(100);
    expect(money.currency).toBe("USD");
  });

  it("Address type includes required fields", () => {
    const address: Address = {
      street: "1 Main St",
      city: "Springfield",
      state: "IL",
      country: "US",
      postalCode: "62701",
    };
    expect(address.city).toBe("Springfield");
    expect(address.coordinates).toBeUndefined();
  });

  it("Offer type is structurally assignable", () => {
    const offer: Offer = {
      id: "11111111-1111-1111-1111-111111111111",
      title: "Test",
      description: "A test offer",
      price: { amount: 50, currency: "EUR" },
      status: "active",
      category: "electronics",
      sellerId: "22222222-2222-2222-2222-222222222222",
      images: [],
      address: {
        street: "1 Test St",
        city: "London",
        state: "England",
        country: "GB",
        postalCode: "SW1A 1AA",
      },
      tags: [],
      viewCount: 0,
      reservationCount: 0,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };
    expect(offer.status).toBe("active");
  });

  it("OfferSummary omits full description and images", () => {
    const summary: OfferSummary = {
      id: "11111111-1111-1111-1111-111111111111",
      title: "Test",
      price: { amount: 50, currency: "EUR" },
      status: "active",
      category: "electronics",
      city: "London",
      createdAt: "2024-01-01T00:00:00Z",
    };
    expect(summary.title).toBe("Test");
  });

  it("CreateOfferPayload omits server-generated fields", () => {
    const payload: CreateOfferPayload = {
      title: "New Offer",
      description: "Description",
      price: { amount: 200, currency: "GBP" },
      category: "furniture",
      images: [{ url: "https://example.com/img.jpg", isPrimary: true }],
      address: {
        street: "1 Road",
        city: "Manchester",
        state: "England",
        country: "GB",
        postalCode: "M1 1AE",
      },
    };
    expect(payload.category).toBe("furniture");
  });

  it("UserProfile has expected fields", () => {
    const profile: UserProfile = {
      id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      displayName: "Alice",
      role: "seller",
      memberSince: "2023-01-01T00:00:00Z",
    };
    expect(profile.role).toBe("seller");
  });

  it("User extends UserProfile with internal fields", () => {
    const user: User = {
      id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      displayName: "Alice",
      role: "seller",
      memberSince: "2023-01-01T00:00:00Z",
      email: "alice@example.com",
      status: "active",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z",
    };
    expect(user.email).toBe("alice@example.com");
  });

  it("Notification type includes delivery timestamps", () => {
    const notification: Notification = {
      id: "55555555-5555-5555-5555-555555555555",
      recipientId: "44444444-4444-4444-4444-444444444444",
      channel: "push",
      status: "delivered",
      category: "offer_activity",
      title: "New offer nearby!",
      body: "Check out this deal",
      createdAt: "2024-01-01T00:00:00Z",
    };
    expect(notification.channel).toBe("push");
    expect(notification.openedAt).toBeUndefined();
  });

  it("CreateNotificationPayload requires core fields", () => {
    const payload: CreateNotificationPayload = {
      recipientId: "44444444-4444-4444-4444-444444444444",
      channel: "in_app",
      category: "reservation",
      title: "Your reservation is confirmed",
      body: "Offer X has been reserved for you.",
    };
    expect(payload.channel).toBe("in_app");
  });

  it("PaginatedResponse wraps any type", () => {
    const page: PaginatedResponse<string> = {
      data: ["a", "b"],
      total: 2,
      page: 1,
      pageSize: 10,
      hasNextPage: false,
    };
    expect(page.data).toHaveLength(2);
  });

  it("ApiResponse wraps data with success flag", () => {
    const response: ApiResponse<number> = {
      success: true,
      data: 42,
    };
    expect(response.success).toBe(true);
    expect(response.data).toBe(42);
  });
});
