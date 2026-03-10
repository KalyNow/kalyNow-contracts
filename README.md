# kalyNow-contracts

Shared contracts for the **kalyNow** microservices platform — event schemas, shared TypeScript types, and REST API contracts.

---

## Overview

This package is the single source of truth for all data structures and contracts shared across kalyNow services. Every service that produces or consumes events, or calls another service's REST API, should depend on this package to avoid type drift.

```
src/
├── types/          # Shared TypeScript types (Offer, User, Notification, common primitives)
├── events/         # Typed event envelopes + factory helpers for every domain event
└── api/            # Request/response shapes for REST API endpoints

schemas/
├── events/         # JSON Schema files for domain events (for validation in any language)
└── api/            # JSON Schema files for API request bodies
```

---

## Domain Events

| Event name             | Published by         | Description                                               |
|------------------------|----------------------|-----------------------------------------------------------|
| `offer_created`        | offer-service        | A seller published a new offer.                           |
| `offer_reserved`       | offer-service        | A buyer placed a reservation on an offer.                 |
| `offer_viewed`         | offer-service        | An offer detail page was viewed (authenticated or guest). |
| `notification_opened`  | notification-service | A recipient opened a notification on any channel.         |

Every event shares a common envelope:

```ts
{
  eventId:        string  // UUID v4
  eventName:      string  // discriminator
  occurredAt:     string  // ISO 8601
  source:         string  // originating service
  correlationId?: string  // distributed tracing
  payload:        object  // event-specific data
}
```

### Usage (TypeScript)

```ts
import { createOfferCreatedEvent } from "@kalynow/contracts";

const event = createOfferCreatedEvent(
  {
    offerId:    "11111111-...",
    sellerId:   "22222222-...",
    title:      "Cozy apartment",
    price:      { amount: 250_000, currency: "USD" },
    category:   "real_estate",
    address:    { street: "123 Main St", city: "New York", state: "NY", country: "US", postalCode: "10001" },
    tags:       ["apartment", "furnished"],
    createdAt:  new Date().toISOString(),
  },
  "offer-service",
  correlationId
);
```

---

## Shared Types

| Module                   | Key types exported                                                                          |
|--------------------------|---------------------------------------------------------------------------------------------|
| `types/common`           | `UUID`, `ISODateString`, `Money`, `Address`, `ApiResponse`, `PaginatedResponse`             |
| `types/offer`            | `Offer`, `OfferSummary`, `CreateOfferPayload`, `OfferStatus`, `OfferCategory`               |
| `types/user`             | `User`, `UserProfile`, `UserRole`, `UserStatus`                                             |
| `types/notification`     | `Notification`, `CreateNotificationPayload`, `NotificationChannel`, `NotificationStatus`    |

---

## API Contracts

| Module                  | Endpoints covered                                                                                                                             |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `api/offers`            | `GET /offers`, `GET /offers/:id`, `POST /offers`, `PATCH /offers/:id`, `DELETE /offers/:id`, `POST /offers/:id/reserve`, `DELETE /offers/:id/reserve` |
| `api/notifications`     | `GET /notifications`, `GET /notifications/:id`, `POST /notifications`, `PATCH /notifications/:id/open`, `POST /notifications/batch-open`, `GET /notifications/unread-count` |

---

## JSON Schemas

Language-agnostic JSON Schema (draft-07) files are located in `schemas/` and can be used for runtime validation in any language via AJV, jsonschema, etc.

```
schemas/
├── events/
│   ├── offer-created.schema.json
│   ├── offer-reserved.schema.json
│   ├── offer-viewed.schema.json
│   └── notification-opened.schema.json
└── api/
    ├── offers.schema.json
    └── notifications.schema.json
```

---

## Development

```bash
# Install dependencies
npm install

# Build (emit JS + type declarations to dist/)
npm run build

# Run tests
npm test

# Lint
npm run lint

# Validate all JSON schema files
npm run validate-schemas
```

---

## Publishing

Bump the `version` in `package.json` and publish to the internal registry:

```bash
npm publish --access restricted
```

Consumers install it with:

```bash
npm install @kalynow/contracts
```
