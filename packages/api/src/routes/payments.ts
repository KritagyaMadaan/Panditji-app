import { FastifyInstance } from 'fastify';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { db } from '@bookpanditji/db';
import { bookings } from '@bookpanditji/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_placeholder',
});

export async function paymentRoutes(fastify: FastifyInstance) {
  // Create Razorpay Order
  fastify.post('/create-order', {
    onRequest: [fastify.authenticate]
  }, async (request) => {
    const { bookingId } = z.object({ bookingId: z.string() }).parse(request.body);

    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, bookingId)
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    const options = {
      amount: Math.round(Number(booking.amount) * 100), // Amount in paise
      currency: 'INR',
      receipt: `receipt_booking_${bookingId}`,
    };

    const order = await rzp.orders.create(options);
    
    // Update booking with Razorpay Order ID
    await db.update(bookings)
      .set({ paymentId: order.id })
      .where(eq(bookings.id, bookingId));

    return { 
      success: true, 
      orderId: order.id, 
      amount: options.amount 
    };
  });

  // Verify Signature
  fastify.post('/verify', async (request, reply) => {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = request.body as any;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_placeholder')
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment Successful
      await db.update(bookings)
        .set({ 
          paymentStatus: 'paid', 
          status: 'confirmed' 
        })
        .where(eq(bookings.paymentId, razorpay_order_id));

      return { success: true, message: 'Payment verified' };
    } else {
      return reply.code(400).send({ success: false, message: 'Invalid signature' });
    }
  });
}
