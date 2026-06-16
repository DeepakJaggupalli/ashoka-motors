export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#111111', color: '#ffffff',
      padding: '3rem 2rem 1.5rem', marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#046bd2' }}>Ashoka Motors</h2>
          <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
            Your authorized Yamaha dealership in Hyderabad. Offering the best sports and commuter bikes with top-notch service.
          </p>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</a></li>
            <li><a href="/vehicles" style={{ color: '#9ca3af', textDecoration: 'none' }}>Vehicles</a></li>
            <li><a href="/about" style={{ color: '#9ca3af', textDecoration: 'none' }}>About Us</a></li>
            <li><a href="/contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact</a></li>
          </ul>
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Contact Info</h3>
          <p style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>📍 TMR Complex, Mettuguda, Secunderabad</p>
          <p style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>📞 +91 98765 43210</p>
          <p style={{ color: '#9ca3af' }}>✉️ info@ashokamotors.in</p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #333333', marginTop: '2rem', paddingTop: '1.5rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} Ashoka Motors. All rights reserved. (Capstone Project)
      </div>
    </footer>
  );
}
