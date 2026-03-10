import {
  OFFER_CREATED,
  createOfferCreatedEvent,
  OFFER_RESERVED,
  createOfferReservedEvent,
  OFFER_VIEWED,
  createOfferViewedEvent,
  NOTIFICATION_OPENED,
  createNotificationOpenedEvent,
} from "../events";

describe("Event factories", () => {
  const source = "test-service";
  const correlationId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";

  describe("createOfferCreatedEvent", () => {
    const payload = {
      offerId: "11111111-1111-1111-1111-111111111111",
      sellerId: "22222222-2222-2222-2222-222222222222",
      title: "Test Offer",
      price: { amount: 100, currency: "USD" as const },
      category: "electronics" as const,
      address: {
        street: "1 Test St",
        city: "Testville",
        state: "TS",
        country: "US",
        postalCode: "00000",
      },
      tags: ["test"],
      createdAt: "2024-01-01T00:00:00Z",
    };

    it("sets eventName to offer_created", () => {
      const event = createOfferCreatedEvent(payload, source);
      expect(event.eventName).toBe(OFFER_CREATED);
    });

    it("populates source and payload", () => {
      const event = createOfferCreatedEvent(payload, source, correlationId);
      expect(event.source).toBe(source);
      expect(event.correlationId).toBe(correlationId);
      expect(event.payload).toEqual(payload);
    });

    it("generates a non-empty eventId and occurredAt", () => {
      const event = createOfferCreatedEvent(payload, source);
      expect(event.eventId).toBeTruthy();
      expect(event.occurredAt).toBeTruthy();
    });
  });

  describe("createOfferReservedEvent", () => {
    const payload = {
      offerId: "11111111-1111-1111-1111-111111111111",
      sellerId: "22222222-2222-2222-2222-222222222222",
      buyerId: "33333333-3333-3333-3333-333333333333",
      reservationDurationSeconds: 3600,
      reservedAt: "2024-01-01T00:00:00Z",
      expiresAt: "2024-01-01T01:00:00Z",
    };

    it("sets eventName to offer_reserved", () => {
      const event = createOfferReservedEvent(payload, source);
      expect(event.eventName).toBe(OFFER_RESERVED);
    });

    it("carries correct payload", () => {
      const event = createOfferReservedEvent(payload, source);
      expect(event.payload.buyerId).toBe(payload.buyerId);
      expect(event.payload.reservationDurationSeconds).toBe(3600);
    });
  });

  describe("createOfferViewedEvent", () => {
    const payload = {
      offerId: "11111111-1111-1111-1111-111111111111",
      sellerId: "22222222-2222-2222-2222-222222222222",
      sessionId: "sess_abc123",
      platform: "web" as const,
      viewedAt: "2024-01-01T00:00:00Z",
    };

    it("sets eventName to offer_viewed", () => {
      const event = createOfferViewedEvent(payload, source);
      expect(event.eventName).toBe(OFFER_VIEWED);
    });

    it("allows optional viewerId to be undefined", () => {
      const event = createOfferViewedEvent(payload, source);
      expect(event.payload.viewerId).toBeUndefined();
    });
  });

  describe("createNotificationOpenedEvent", () => {
    const payload = {
      notificationId: "55555555-5555-5555-5555-555555555555",
      recipientId: "44444444-4444-4444-4444-444444444444",
      channel: "push" as const,
      category: "offer_activity" as const,
      openedAt: "2024-01-01T00:00:00Z",
    };

    it("sets eventName to notification_opened", () => {
      const event = createNotificationOpenedEvent(payload, source);
      expect(event.eventName).toBe(NOTIFICATION_OPENED);
    });

    it("carries correct payload", () => {
      const event = createNotificationOpenedEvent(payload, source);
      expect(event.payload.channel).toBe("push");
      expect(event.payload.category).toBe("offer_activity");
    });
  });
});
