"use client";
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const promise = fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      })
    }).then(async (res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res;
    });

    toast.promise(promise, {
      loading: 'Sending message...',
      success: 'Message sent successfully! We will get back to you soon.',
      error: 'Error sending message. Please try again.',
    });

    try {
      await promise;
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      // Error handled by toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="main-container" style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
        
        <div style={{ flex: '1 1 350px', backgroundColor: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#046bd2' }}>Get In Touch</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
              <input name="name" type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
              <input name="email" type="email" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
              <textarea name="message" rows={4} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical' }} />
            </div>
            <button type="submit" disabled={isSubmitting} style={{ backgroundColor: isSubmitting ? '#94a3b8' : '#046bd2', color: 'white', padding: '0.75rem', borderRadius: '6px', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'background-color 0.3s' }}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
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
