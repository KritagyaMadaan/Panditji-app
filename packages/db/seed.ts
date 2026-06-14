import { db } from './index';
import { users, pandits, services, bookings, reviews } from './schema';

async function seed() {
  console.log('Seeding data...');

  // 1. Seed Services
  const insertedServices = await db.insert(services).values([
    {
      name: 'Griha Pravesh Puja',
      category: 'puja',
      description: 'A traditional ceremony performed before entering a new home.',
      basePrice: '5100.00',
      durationMinutes: 120,
    },
    {
      name: 'Satyanarayan Katha',
      category: 'puja',
      description: 'A popular ritual performed on full moon days or special occasions.',
      basePrice: '2100.00',
      durationMinutes: 90,
    },
    {
      name: 'Rudrabhishek',
      category: 'puja',
      description: 'A powerful ritual involving the pouring of water, milk, etc., over a Shiva Lingam.',
      basePrice: '3500.00',
      durationMinutes: 150,
    }
  ]).returning();

  // 2. Seed Admin User
  const [admin] = await db.insert(users).values({
    name: 'Admin User',
    phone: '9999999999',
    role: 'admin',
    isVerified: true,
  }).returning();

  // 3. Seed Pandits
  const panditUser = await db.insert(users).values({
    name: 'Pandit Ramesh Shastri',
    phone: '9876543210',
    role: 'pandit',
    isVerified: true,
  }).returning().then(rows => rows[0]);

  await db.insert(pandits).values({
    userId: panditUser.id,
    bio: 'Vedic scholar with 15 years of experience in performing various pujas.',
    experienceYears: 15,
    languagesSpoken: ['Hindi', 'Sanskrit'],
    specializations: ['Griha Pravesh', 'Marriage'],
    aadharVerified: true,
    ratingsAvg: '4.9',
    totalBookings: 150,
  });

  console.log('Seed completed successfully');
}

seed().catch(console.error).finally(() => process.exit());
