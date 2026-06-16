"use client";
import { motion } from 'framer-motion';

export default function About() {
  return (
    <main className="main-container" style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-panel"
        style={{ maxWidth: '800px', width: '100%', padding: '3rem' }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>About Ashoka Motors</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          Welcome to Ashoka Motors, the premier Yamaha dealership in Hyderabad and Secunderabad. Established with a passion for exceptional two-wheelers, we have been serving the riding community with dedication and excellence.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          As an authorized Yamaha dealer, we offer the complete range of Yamaha motorcycles and scooters, including the popular R-series, MT-series, and FZ-series. Our commitment goes beyond just selling bikes; we strive to provide an unparalleled ownership experience.
        </p>
        <h2 style={{ fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem', color: 'white', fontWeight: 700 }}>Our Services</h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <li>New Yamaha Motorcycle & Scooter Sales</li>
          <li>Authorized Service & Maintenance</li>
          <li>Genuine Yamaha Spare Parts & Accessories</li>
          <li>Easy Financing Options</li>
        </ul>

        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', color: 'var(--yamaha-cyan)', fontWeight: 600, letterSpacing: '0.5px' }}>
            Developed by Team GITAM Interns 🚀
          </p>
        </div>
      </motion.div>
    </main>
  );
}
