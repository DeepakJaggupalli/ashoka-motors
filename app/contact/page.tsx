"use client";

import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    // Mock API call
    setTimeout(() => {
      setStatus('Message sent successfully! We will get back to you soon.');
    }, 1500);
  };

  return (
    <main className="main-container" style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
        
        <div style={{ flex: '1 1 350px', backgroundColor: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#046bd2' }}>Get In Touch</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
              <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
              <input type="email" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
              <textarea rows={4} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical' }} />
            </div>
            <button type="submit" style={{ backgroundColor: '#046bd2', color: 'white', padding: '0.75rem', borderRadius: '6px', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
              Send Message
            </button>
            {status && <p style={{ marginTop: '1rem', color: status.includes('success') ? '#16a34a' : '#046bd2' }}>{status}</p>}
          </form>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <div style={{ backgroundColor: '#1e293b', color: 'white', padding: '2.5rem', borderRadius: '12px', height: '100%' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Visit Our Showroom</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '0.25rem' }}>Address</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>D.No 12-8-452 & 453, TMR Complex,<br/>Opposite Railway Kalyan, Mettuguda,<br/>Secunderabad, Hyderabad - 500017</p>
              </div>
              <div>
                <h3 style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '0.25rem' }}>Phone</h3>
                <p style={{ fontSize: '1.1rem' }}>+91 98765 43210</p>
              </div>
              <div>
                <h3 style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '0.25rem' }}>Business Hours</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>Mon - Sat: 9:00 AM - 8:00 PM<br/>Sunday: 10:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
