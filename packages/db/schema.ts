import { pgTable, uuid, text, timestamp, boolean, decimal, integer, pgEnum, date, time, jsonb } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['customer', 'pandit', 'admin']);
export const bookingStatusEnum = pgEnum('booking_status', ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']);
export const categoryEnum = pgEnum('category', ['puja', 'wedding', 'astrology', 'remedy']);
export const paymentStatusEnum = pgEnum('payment_status', ['unpaid', 'paid', 'refunded']);
export const consultationTypeEnum = pgEnum('consultation_type', ['kundali', 'matchmaking', 'muhurat', 'career', 'marriage']);
export const consultationModeEnum = pgEnum('consultation_mode', ['chat', 'video', 'call']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  phone: text('phone').unique().notNull(),
  email: text('email'),
  passwordHash: text('password_hash'),
  role: roleEnum('role').notNull().default('customer'),
  profilePhoto: text('profile_photo'),
  locationLat: decimal('location_lat', { precision: 10, scale: 7 }),
  locationLng: decimal('location_lng', { precision: 10, scale: 7 }),
  preferredLanguage: text('preferred_language').default('English'),
  isVerified: boolean('is_verified').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const pandits = pgTable('pandits', {
  userId: uuid('user_id').primaryKey().references(() => users.id),
  bio: text('bio'),
  experienceYears: integer('experience_years'),
  languagesSpoken: text('languages_spoken').array(),
  specializations: text('specializations').array(),
  aadharVerified: boolean('aadhar_verified').default(false),
  ratingsAvg: decimal('ratings_avg', { precision: 2, scale: 1 }).default('0.0'),
  totalBookings: integer('total_bookings').default(0),
  serviceRadiusKm: integer('service_radius_km'),
  availabilitySchedule: jsonb('availability_schedule'),
  subscriptionTier: text('subscription_tier').default('free'),
});

export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  category: categoryEnum('category').notNull(),
  description: text('description'),
  basePrice: decimal('base_price', { precision: 10, scale: 2 }).notNull(),
  durationMinutes: integer('duration_minutes'),
  imageUrl: text('image_url'),
  isActive: boolean('is_active').default(true),
  popularityScore: integer('popularity_score').default(0),
});

export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').references(() => users.id).notNull(),
  panditId: uuid('pandit_id').references(() => pandits.userId).notNull(),
  serviceId: uuid('service_id').references(() => services.id).notNull(),
  scheduledDate: date('scheduled_date').notNull(),
  scheduledTime: time('scheduled_time').notNull(),
  locationAddress: text('location_address'),
  locationLat: decimal('location_lat', { precision: 10, scale: 7 }),
  locationLng: decimal('location_lng', { precision: 10, scale: 7 }),
  status: bookingStatusEnum('status').default('pending').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  platformCommission: decimal('platform_commission', { precision: 10, scale: 2 }).notNull(),
  panditPayout: decimal('pandit_payout', { precision: 10, scale: 2 }).notNull(),
  paymentStatus: paymentStatusEnum('payment_status').default('unpaid').notNull(),
  paymentId: text('payment_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  bookingId: uuid('booking_id').references(() => bookings.id).notNull(),
  customerId: uuid('customer_id').references(() => users.id).notNull(),
  panditId: uuid('pandit_id').references(() => pandits.userId).notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
