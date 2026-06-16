"use client";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

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
      <div style={{ maxWidth: '1000px', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="glass-panel" 
          style={{ flex: '1 1 350px', padding: '2.5rem' }}
        >
          <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>Get In Touch</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Name</label>
              <input name="name" type="text" required style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(2,6,23,0.6)', color: 'white', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Email</label>
              <input name="email" type="email" required style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(2,6,23,0.6)', color: 'white', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Message</label>
              <textarea name="message" rows={4} required style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(2,6,23,0.6)', color: 'white', outline: 'none', resize: 'vertical' }} />
            </div>
            <button type="submit" disabled={isSubmitting} className="cta-button" style={{ marginTop: '0.5rem', width: '100%', display: 'flex', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{ flex: '1 1 400px' }}
        >
          <div className="glass-panel" style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'white', fontWeight: 700 }}>Visit Our Showroom</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flexGrow: 1 }}>
              <div>
                <h3 style={{ color: 'var(--yamaha-cyan)', fontSize: '1rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Address</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>D.No 12-8-452 & 453, TMR Complex,<br/>Opposite Railway Kalyan, Mettuguda,<br/>Secunderabad, Hyderabad - 500017</p>
              </div>
              <div>
                <h3 style={{ color: 'var(--yamaha-cyan)', fontSize: '1rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>+91 98765 43210</p>
              </div>
              <div>
                <h3 style={{ color: 'var(--yamaha-cyan)', fontSize: '1rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Business Hours</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>Mon - Sat: 9:00 AM - 8:00 PM<br/>Sunday: 10:00 AM - 5:00 PM</p>
              </div>
              
              <div style={{ marginTop: '1rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.917467657922!2d78.5135118749354!3d17.43260710174066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9b027c9f6d77%3A0xc3f2c5e523f669a0!2sAshoka%20Motors%20-%20Yamaha%20Motorcycle%20Dealer!5e0!3m2!1sen!2sin!4v1718501234567!5m2!1sen!2sin" 
                  width="100%" 
                  height="200" 
                  style={{ border: 0, display: 'block' }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
