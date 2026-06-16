"use client";
import { useState } from 'react';

export default function BookingModal({ vehicleName }: { vehicleName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Submitting...');
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch('/api/book-ride', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          date: formData.get('date'),
          vehicleName
        })
      });
      if (res.ok) {
        setStatus('Booking confirmed!');
        setTimeout(() => { setIsOpen(false); setStatus(''); }, 2000);
      } else {
        setStatus('Error booking test ride.');
      }
    } catch {
      setStatus('Error booking test ride.');
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={{ width: '100%', backgroundColor: '#046bd2', color: 'white', padding: '1rem', borderRadius: '8px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s' }}>
        Book a Test Ride
      </button>

      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '400px' }}>
            <h2 style={{ marginBottom: '1rem' }}>Book Test Ride: {vehicleName}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input name="name" required placeholder="Your Name" style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              <input name="phone" required placeholder="Your Phone Number" style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              <input name="date" type="date" required style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              <button type="submit" style={{ backgroundColor: '#111', color: 'white', padding: '0.75rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Submit Booking</button>
            </form>
            {status && <p style={{ marginTop: '1rem', color: '#046bd2' }}>{status}</p>}
            <button onClick={() => setIsOpen(false)} style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
