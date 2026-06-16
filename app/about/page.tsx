"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function About() {
  const [showInterns, setShowInterns] = useState(false);

  const interns = [
    { name: "Deepak", roll: "2023000402" },
    { name: "Arun", roll: "2023000230" },
    { name: "Kritik", roll: "2023000357" },
    { name: "Rishi", roll: "2023001672" },
    { name: "Varsith", roll: "20230001825" },
    { name: "Victor", roll: "2023000296" },
  ];

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

        {/* Team GITAM Interns Section */}
        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <button 
            onClick={() => setShowInterns(!showInterns)}
            style={{ 
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: '1.1rem', color: 'var(--yamaha-cyan)', fontWeight: 600, letterSpacing: '0.5px',
              display: 'inline-flex', alignItems: 'center', gap: '8px'
            }}
          >
            Developed by Team GITAM Interns 🚀
            <motion.span animate={{ rotate: showInterns ? 180 : 0 }} transition={{ duration: 0.3 }}>
              ▼
            </motion.span>
          </button>

          <AnimatePresence>
            {showInterns && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                style={{ overflow: 'hidden', marginTop: '1.5rem' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {interns.map((intern, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }}
                      style={{ background: 'rgba(2, 6, 23, 0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                      <span style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>{intern.name}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.3rem', fontFamily: 'monospace' }}>Roll: {intern.roll}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  );
}
