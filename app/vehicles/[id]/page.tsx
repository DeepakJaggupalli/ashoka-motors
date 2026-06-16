import { PrismaClient } from '@prisma/client';
import BookingModal from '../../components/BookingModal';

const prisma = new PrismaClient();

export default async function VehicleDetails({ params }: { params: { id: string } }) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!vehicle) {
    return <main className="main-container" style={{ padding: '4rem 2rem' }}><h1>Vehicle not found</h1></main>;
  }

  return (
    <main className="main-container" style={{ padding: '4rem 2rem', alignItems: 'center' }}>
      <div style={{ maxWidth: '1000px', width: '100%', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 500px' }}>
          <img src={vehicle.imageUrl} alt={vehicle.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '300px' }} />
        </div>
        <div style={{ flex: '1 1 400px', padding: '3rem' }}>
          <div style={{ display: 'inline-block', backgroundColor: '#e0f2fe', color: '#046bd2', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {vehicle.type}
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#111111' }}>{vehicle.name}</h1>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#046bd2', marginBottom: '2rem' }}>₹{vehicle.price.toLocaleString('en-IN')}</p>
          
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#334155' }}>Key Specifications</h3>
          <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.6', marginBottom: '2rem' }}>
            {vehicle.specs}
          </p>
          
          <BookingModal vehicleName={vehicle.name} />
        </div>
      </div>
    </main>
  );
}
