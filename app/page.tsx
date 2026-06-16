"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="main-container">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hero-section"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: 'relative', zIndex: 10 }}
        >
          <h1 style={{ fontSize: '5rem', letterSpacing: '-2px' }}>
            Unleash The <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Thrill</span>
          </h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '3rem', color: 'var(--text-secondary)' }}>
            Experience the pinnacle of Japanese engineering at Ashoka Motors, Hyderabad's premier Yamaha destination.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/vehicles" className="cta-button">
                Explore Inventory
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/ai-recommend" className="cta-button" style={{ 
                background: 'transparent', 
                border: '2px solid var(--yamaha-cyan)', 
                color: 'var(--yamaha-cyan)',
                boxShadow: 'none'
              }}>
                ✨ AI Matchmaker
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
