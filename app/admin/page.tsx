import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  const bookings = await prisma.testRideBooking.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="main-container" style={{ padding: '4rem 2rem', alignItems: 'flex-start' }}>
      <h1 style={{ marginBottom: '2rem', color: '#111' }}>Admin Dashboard</h1>
      
      <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        
        <div style={{ flex: '1 1 500px', backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#046bd2' }}>Test Ride Bookings</h2>
          {bookings.length === 0 ? <p>No bookings yet.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {bookings.map(b => (
                <div key={b.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                  <p><strong>{b.name}</strong> - {b.phone}</p>
                  <p>Vehicle: {b.vehicleName}</p>
                  <p>Requested Date: {b.date}</p>
                  <p style={{ fontSize: '0.8rem', color: '#888' }}>Submitted: {b.createdAt.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: '1 1 500px', backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#046bd2' }}>Contact Messages</h2>
          {messages.length === 0 ? <p>No messages yet.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map(m => (
                <div key={m.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                  <p><strong>{m.name}</strong> ({m.email})</p>
                  <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>"{m.message}"</p>
                  <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>Submitted: {m.createdAt.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
