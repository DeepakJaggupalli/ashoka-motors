"use client";
import { motion } from 'framer-motion';

export default function About() {
  return (
    <main className="main-container" style={{ padding: '4rem 2rem', alignItems: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: '800px', width: '100%', backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#046bd2' }}>About Ashoka Motors</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#334155' }}>
          Welcome to Ashoka Motors, the premier Yamaha dealership in Hyderabad and Secunderabad. Established with a passion for exceptional two-wheelers, we have been serving the riding community with dedication and excellence.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#334155' }}>
          As an authorized Yamaha dealer, we offer the complete range of Yamaha motorcycles and scooters, including the popular R-series, MT-series, and FZ-series. Our commitment goes beyond just selling bikes; we strive to provide an unparalleled ownership experience.
        </p>
        <h2 style={{ fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem', color: '#111111' }}>Our Services</h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8', color: '#334155' }}>
          <li>New Yamaha Motorcycle & Scooter Sales</li>
          <li>Authorized Service & Maintenance</li>
          <li>Genuine Yamaha Spare Parts & Accessories</li>
          <li>Easy Financing Options</li>
        </ul>
      </motion.div>
    </main>
  );
}
