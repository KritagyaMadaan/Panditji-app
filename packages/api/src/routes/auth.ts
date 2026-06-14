import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '@bookpanditji/db';
import { users } from '@bookpanditji/db/schema';
import { eq } from 'drizzle-orm';
import twilio from 'twilio';

const sendOtpSchema = z.object({
  phone: z.string().min(10).max(15),
});

const verifyOtpSchema = z.object({
  phone: z.string().min(10).max(15),
  otp: z.string().length(6),
});

const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN 
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/send-otp', async (request, reply) => {
    const { phone } = sendOtpSchema.parse(request.body);
    
    if (twilioClient && process.env.TWILIO_SERVICE_SID) {
      try {
        await twilioClient.verify.v2
          .services(process.env.TWILIO_SERVICE_SID)
          .verifications.create({ to: `+91${phone}`, channel: 'sms' });
        
        return { success: true, message: 'OTP sent successfully' };
      } catch (err: any) {
        return reply.code(500).send({ success: false, message: err.message });
      }
    }
    
    console.log(`[MOCK] Sending OTP to ${phone}`);
    return { success: true, message: 'OTP sent successfully (Mock)' };
  });

  fastify.post('/verify-otp', async (request, reply) => {
    const { phone, otp } = verifyOtpSchema.parse(request.body);

    if (twilioClient && process.env.TWILIO_SERVICE_SID) {
      try {
        const verification = await twilioClient.verify.v2
          .services(process.env.TWILIO_SERVICE_SID)
          .verificationChecks.create({ to: `+91${phone}`, code: otp });
        
        if (!verification.valid) {
          return reply.code(400).send({ success: false, message: 'Invalid or expired OTP' });
        }
      } catch (err: any) {
        return reply.code(500).send({ success: false, message: err.message });
      }
    } else {
      if (otp !== '123456' && phone !== '9876543210') {
        return reply.code(400).send({ success: false, message: 'Invalid OTP' });
      }
    }

    let user = await db.query.users.findFirst({
      where: eq(users.phone, phone),
    });

    if (!user) {
      const [newUser] = await db.insert(users).values({
        phone,
        name: 'New User',
        role: 'customer',
      }).returning();
      user = newUser;
    }

    const token = fastify.jwt.sign({ 
      id: user.id, 
      role: user.role,
      phone: user.phone 
    });

    return { 
      success: true, 
      token, 
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
        name: user.name
      }
    };
  });

  fastify.get('/me', {
    onRequest: [fastify.authenticate]
  }, async (request) => {
    return { user: request.user };
  });
}
