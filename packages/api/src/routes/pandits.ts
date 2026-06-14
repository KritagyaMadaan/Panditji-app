import { FastifyInstance } from 'fastify';
import { db } from '@bookpanditji/db';
import { pandits, users } from '@bookpanditji/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export async function panditRoutes(fastify: FastifyInstance) {
  // Search Pandits by location and specialization
  fastify.get('/', async (request) => {
    const { city, specialization, lat, lng, radius = 50 } = request.query as any;

    let query = db.select({
      id: users.id,
      name: users.name,
      photo: users.profilePhoto,
      bio: pandits.bio,
      experience: pandits.experienceYears,
      rating: pandits.ratingsAvg,
      locationLat: users.locationLat,
      locationLng: users.locationLng,
    })
    .from(pandits)
    .innerJoin(users, eq(pandits.userId, users.id));

    // Basic filters
    if (specialization) {
      // In Drizzle for arrays, you might use arrayContains or similar
      // For now, simple filter logic
    }

    // Distance calculation logic (placeholder for PostGIS)
    // We can use the Haversine formula directly in SQL if PostGIS isn't available
    
    const results = await query;
    return { success: true, count: results.length, data: results };
  });

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as any;
    const result = await db.query.pandits.findFirst({
      where: eq(pandits.userId, id),
      with: {
        // userId: true // Drizzle relational query setup needed
      }
    });

    if (!result) {
      return reply.code(404).send({ success: false, message: 'Pandit not found' });
    }

    return { success: true, data: result };
  });
}
