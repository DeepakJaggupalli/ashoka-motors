import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function Vehicles() {
  const vehicles = await prisma.vehicle.findMany();

  return (
    <main className="main-container" style={{ padding: '4rem 2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Vehicles</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        {vehicles.map((v) => (
          <div key={v.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <img src={v.imageUrl} alt={v.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{v.name}</h2>
              <p style={{ color: '#64748b', marginBottom: '1rem' }}>Type: {v.type}</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#046bd2', marginBottom: '1.5rem' }}>₹{v.price.toLocaleString('en-IN')}</p>
              <Link href={`/vehicles/${v.id}`} style={{ display: 'inline-block', backgroundColor: '#046bd2', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none' }}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
