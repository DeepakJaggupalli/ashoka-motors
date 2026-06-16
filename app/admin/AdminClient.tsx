"use client";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { TestRideBooking, ContactMessage } from '@prisma/client';

export default function AdminClient({ initialBookings, initialMessages }: { initialBookings: TestRideBooking[], initialMessages: ContactMessage[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [messages, setMessages] = useState(initialMessages);

  const updateBooking = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/booking/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
        toast.success(`Booking marked as ${status}`);
      }
    } catch {
      toast.error('Failed to update booking');
    }
  };

  const deleteBooking = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/booking/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBookings(bookings.filter(b => b.id !== id));
        toast.success('Booking deleted');
      }
    } catch {
      toast.error('Failed to delete booking');
    }
  };

  const updateMessage = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setMessages(messages.map(m => m.id === id ? { ...m, status } : m));
        toast.success(`Message marked as ${status}`);
      }
    } catch {
      toast.error('Failed to update message');
    }
  };

  const deleteMessage = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages(messages.filter(m => m.id !== id));
        toast.success('Message deleted');
      }
    } catch {
      toast.error('Failed to delete message');
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
      <div style={{ flex: '1 1 500px', backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#046bd2' }}>Test Ride Bookings</h2>
        {bookings.length === 0 ? <p>No bookings yet.</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {bookings.map(b => (
              <div key={b.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p><strong>{b.name}</strong> - {b.phone}</p>
                    <p>Vehicle: {b.vehicleName}</p>
                    <p>Requested Date: {b.date}</p>
                    <p style={{ fontSize: '0.8rem', color: '#888' }}>Submitted: {new Date(b.createdAt).toLocaleString()}</p>
                    <span style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.2rem 0.5rem', fontSize: '0.8rem', borderRadius: '4px', backgroundColor: b.status === 'COMPLETED' ? '#dcfce7' : '#fef9c3', color: b.status === 'COMPLETED' ? '#166534' : '#854d0e' }}>
                      {b.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {b.status !== 'COMPLETED' && (
                      <button onClick={() => updateBooking(b.id, 'COMPLETED')} style={{ padding: '0.4rem', fontSize: '0.8rem', cursor: 'pointer', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '4px' }}>Complete</button>
                    )}
                    <button onClick={() => deleteBooking(b.id)} style={{ padding: '0.4rem', fontSize: '0.8rem', cursor: 'pointer', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '4px' }}>Delete</button>
                  </div>
                </div>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p><strong>{m.name}</strong> ({m.email})</p>
                    <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>"{m.message}"</p>
                    <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>Submitted: {new Date(m.createdAt).toLocaleString()}</p>
                    <span style={{ display: 'inline-block', marginTop: '0.5rem', marginRight: '0.5rem', padding: '0.2rem 0.5rem', fontSize: '0.8rem', borderRadius: '4px', backgroundColor: m.status === 'REPLIED' ? '#dcfce7' : '#fef9c3', color: m.status === 'REPLIED' ? '#166534' : '#854d0e' }}>
                      {m.status}
                    </span>
                    <span style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.2rem 0.5rem', fontSize: '0.8rem', borderRadius: '4px', backgroundColor: m.sentiment === 'URGENT' || m.sentiment === 'COMPLAINT' ? '#fee2e2' : m.sentiment === 'POSITIVE' || m.sentiment === 'SALES' ? '#dbeafe' : '#f1f5f9', color: m.sentiment === 'URGENT' || m.sentiment === 'COMPLAINT' ? '#991b1b' : m.sentiment === 'POSITIVE' || m.sentiment === 'SALES' ? '#1e40af' : '#475569' }}>
                      {m.sentiment || 'NEUTRAL'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {m.status !== 'REPLIED' && (
                      <button onClick={() => updateMessage(m.id, 'REPLIED')} style={{ padding: '0.4rem', fontSize: '0.8rem', cursor: 'pointer', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '4px' }}>Reply Sent</button>
                    )}
                    <button onClick={() => deleteMessage(m.id)} style={{ padding: '0.4rem', fontSize: '0.8rem', cursor: 'pointer', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '4px' }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
