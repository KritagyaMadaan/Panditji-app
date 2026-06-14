# BookPanditJi – Implementation Plan

## 1. Project Architecture (Monorepo)

We use a Turborepo-powered monorepo to manage all components of the BookPanditJi platform.

```text
bookpanditji-monorepo/
├── apps/
│   ├── customer-web/       # Next.js 14 (App Router) - Customer interface
│   ├── pandit-app/         # React Native (Expo) - Pandit interface
│   └── admin-panel/        # Next.js/Vite - Internal administration
├── packages/
│   ├── api/                # Fastify Backend (Shared API)
│   ├── db/                 # Drizzle ORM + PostgreSQL Schema
│   ├── ui/                 # Shared UI components (Tailwind)
│   ├── types/              # Common TypeScript interfaces
│   └── config/             # ESLint, Prettier, TSConfig
└── package.json            # Root workspace configuration
```

## 2. Tech Stack Justifications

| Layer | Technology | Justification |
| :--- | :--- | :--- |
| **Monorepo** | Turborepo | Fast builds, shared code (types/db), scalable. |
| **Backend** | Fastify (Node.js) | Extremely high performance, schema validation (Zod), low overhead. |
| **DB ORM** | Drizzle ORM | Type-safe, "closer to SQL", faster than Prisma for big queries. |
| **Database** | PostgreSQL | Robust relation management, JSONB for schedules, PostGIS for location. |
| **Customer Web** | Next.js 14 | SSR for SEO, App Router for modern routing and performance. |
| **Mobile** | React Native (Expo) | Cross-platform (iOS/Android) with rapid development cycle. |
| **Realtime** | Socket.io | Bi-directional communication for booking updates and chat. |
| **Payments** | Razorpay | Best-in-class support for Indian UPI, cards, and payouts. |

## 3. Database Schema (Drizzle Entities)

### Core Entities
- **Users**: `id, phone, email, name, role (ENUM), is_verified, photo_url, location (point)`
- **Pandits**: `user_id (PK), bio, experience, languages (json), specializations (json), aadhar_status, rating_avg, pricing_tier`
- **Services**: `id, name, category, description, base_price, duration_mins, image_url, is_active`
- **Bookings**: `id, customer_id, pandit_id, service_id, status (ENUM), scheduled_at, address, total_amount, commission, payout_amount, payment_id`
- **Reviews**: `id, booking_id, customer_id, pandit_id, rating, comment`

### Extended Entities
- **WeddingPackages**: `id, pandit_id, title, description, price_range, inclusions (json)`
- **AstrologyConsultations**: `id, pandit_id, customer_id, type, mode, amount, status`
- **PanditAvailability**: `id, pandit_id, day_of_week, start_time, end_time, is_blocked`
- **AuditLogs**: `id, entity_type, entity_id, action, actor_id, timestamp`

## 4. API Route Map

### Auth & User (`/api/v1/auth`)
- `POST /send-otp` - Phone-based OTP generation.
- `POST /verify-otp` - JWT issuance.
- `GET /me` - Profile recovery.

### Services (`/api/v1/services`)
- `GET /` - List all active services.
- `GET /:id` - Service details.

### Pandits (`/api/v1/pandits`)
- `GET /search` - Search by location (PostGIS), service, and rating.
- `GET /:id/profile` - Public profile details.
- `GET /:id/availability` - Real-time slot checking.

### Bookings (`/api/v1/bookings`)
- `POST /` - Create booking + initiate Razorpay session.
- `GET /:id` - Status tracking.
- `PATCH /:id/status` - (Admin/Pandit) Update lifecycle.

### Payments (`/api/v1/payments`)
- `POST /webhook` - Razorpay event listener (async confirmation).

## 5. Build Phases

### Phase 1: Foundation (Current)
- Setup workspace structure (Done).
- Configure PostgreSQL + Drizzle (In Progress).
- Implement Fastify boilerplate + Auth (OTP via Twilio/MSG91).

### Phase 2: MVP Customer Web
- Landing Page (Spiritually rich UI).
- Search/Discovery with Geolocation.
- Booking flow + Razorpay integration.
- Customer Dashboard.

### Phase 3: Pandit Native App
- Multi-step onboarding (Aadhaar upload).
- Dashboard: "Jobs Near Me".
- Booking management (Accept/Reject).
- Earnings & Calendar.

### Phase 4: Admin & Scale
- Verification queue for Pandits.
- Commission management.
- Real-time Chat (Socket.io).
- Push notifications via FCM.

## 6. Third-Party Integrations

- **SMS**: MSG91 or Twilio (OTP).
- **Payments**: Razorpay (Web Checkout + Payouts).
- **Maps**: Google Maps API (Autocomplete + Static Maps).
- **Storage**: Cloudinary or AWS S3 (Images/Docs).
- **Notifications**: Firebase Cloud Messaging (FCM).

---
**Request for Approval:** Please review the technical choices and schema. Once approved, I will begin initializing the Customer Web UI and refining the API.
