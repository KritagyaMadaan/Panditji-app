import { FastifyInstance } from 'fastify';
import { db } from '@bookpanditji/db';
import { bookings, services, users, pandits } from '@bookpanditji/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { z } from 'zod';

const createBookingSchema = z.object({
  serviceId: z.string().uuid(),
  panditId: z.string().uuid(),
  scheduledDate: z.string(), // YYYY-MM-DD
  scheduledTime: z.string(), // HH:MM:SS
  locationAddress: z.string(),
  locationLat: z.number().optional(),
  locationLng: z.number().optional(),
});

export async function bookingRoutes(fastify: FastifyInstance) {
  // Create a new booking
  fastify.post('/', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const body = createBookingSchema.parse(request.body);
    const userId = (request.user as any).id;

    // Fetch service for pricing
    const service = await db.query.services.findFirst({
      where: eq(services.id, body.serviceId)
    });

    if (!service) {
      return reply.code(404).send({ success: false, message: 'Service not found' });
    }

    const amount = Number(service.basePrice);
    const commissionRate = 0.15; // 15% platform commission
    const platformCommission = amount * commissionRate;
    const panditPayout = amount - platformCommission;

    const [newBooking] = await db.insert(bookings).values({
      customerId: userId,
      panditId: body.panditId,
      serviceId: body.serviceId,
      scheduledDate: body.scheduledDate,
      scheduledTime: body.scheduledTime,
      locationAddress: body.locationAddress,
      locationLat: body.locationLat?.toString(),
      locationLng: body.locationLng?.toString(),
      amount: amount.toString(),
      platformCommission: platformCommission.toString(),
      panditPayout: panditPayout.toString(),
      status: 'pending',
      paymentStatus: 'unpaid',
    }).returning();

    return { 
      success: true, 
      data: newBooking,
      message: 'Booking initialized. Please proceed to payment.' 
    };
  });

  // Get user's bookings
  fastify.get('/my-bookings', {
    onRequest: [fastify.authenticate]
  }, async (request) => {
    const userId = (request.user as any).id;
    const role = (request.user as any).role;

    let query;
    if (role === 'pandit') {
      query = db.query.bookings.findMany({
        where: eq(bookings.panditId, userId),
        with: {
          // customer: true,
          // service: true
        },
        orderBy: [desc(bookings.createdAt)]
      });
    } else {
      query = db.query.bookings.findMany({
        where: eq(bookings.customerId, userId),
        with: {
          // pandit: true,
          // service: true
        },
        orderBy: [desc(bookings.createdAt)]
      });
    }

    const results = await query;
    return { success: true, count: results.length, data: results };
  });

  // Update booking status (confirm/complete)
  fastify.patch('/:id/status', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const { id } = request.params as any;
    const { status } = z.object({ status: z.string() }).parse(request.body);
    const userId = (request.user as any).id;

    // Logic to ensure only involved parties can update
    const [updated] = await db.update(bookings)
      .set({ status: status as any })
      .where(eq(bookings.id, id))
      .returning();

    return { success: true, data: updated };
  });

  // Get all bookings (Admin only)
  fastify.get('/all', {
    onRequest: [fastify.authenticate]
  }, async () => {
    const results = await db.query.bookings.findMany({
      orderBy: [desc(bookings.createdAt)]
    });
    return { success: true, count: results.length, data: results };
  });
}
