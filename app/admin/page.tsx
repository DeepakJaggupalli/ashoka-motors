import { PrismaClient } from '@prisma/client';
import AdminClient from './AdminClient';
const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  const bookings = await prisma.testRideBooking.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="main-container" style={{ padding: '4rem 2rem', alignItems: 'flex-start' }}>
      <h1 style={{ marginBottom: '2rem', color: '#111' }}>Admin Dashboard</h1>
      
      <AdminClient initialBookings={bookings} initialMessages={messages} />
    </main>
  );
}
