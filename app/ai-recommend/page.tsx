"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

type RecommendationResult = { 
  recommendedBike: string; 
  confidenceScore: number; 
  justification: string; 
  logicSteps: string[];
  budgetOptions: string[];
  vehicleImage: string; 
};

function Typewriter({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20); // Typing speed
    
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}<span className="cursor-blink">|</span></span>;
}

export default function AIRecommend() {
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null); // Clear previous result
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          height: formData.get('height'),
          experience: formData.get('experience'),
          commute: formData.get('commute'),
          budget: formData.get('budget')
        })
      });

      if (!res.ok) throw new Error('Failed to fetch recommendation');
      
      const data = await res.json();
      setResult(data);
      toast.success('AI Analysis Complete!', { icon: '✨' });
    } catch (error) {
      toast.error('Error getting recommendation. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main-container" style={{ padding: '4rem 2rem', position: 'relative' }}>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(90deg, #046bd2, #00d2ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI Matchmaker
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            Enter your physical metrics, riding style, and budget. Our advanced Gemini ML engine will calculate the absolute perfect Yamaha for you.
          </p>
        </motion.div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', width: '100%', maxWidth: '1200px', margin: '0 auto', alignItems: 'flex-start', position: 'relative', zIndex: 10 }}>
        
        {/* Input Form */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel" 
          style={{ flex: '1 1 400px', padding: '2.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(4, 107, 210, 0.2)', padding: '0.5rem', borderRadius: '8px' }}>🏍️</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Rider Profile</h2>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Rider Height</label>
              <select name="height" required style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(2,6,23,0.6)', color: 'white', fontSize: '1rem', outline: 'none' }}>
                <option value="">Select Height Range</option>
                <option value="Under 5.4">Under 5'4&quot;</option>
                <option value="5.4 - 5.9">5'4&quot; - 5'9&quot;</option>
                <option value="Over 5.9">Over 5'9&quot;</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Experience Level</label>
              <select name="experience" required style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(2,6,23,0.6)', color: 'white', fontSize: '1rem', outline: 'none' }}>
                <option value="">Select Experience Level</option>
                <option value="Beginner">Beginner (First Bike)</option>
                <option value="Intermediate">Intermediate Rider</option>
                <option value="Advanced">Advanced Track Rider</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Primary Use Case</label>
              <select name="commute" required style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(2,6,23,0.6)', color: 'white', fontSize: '1rem', outline: 'none' }}>
                <option value="">Select Primary Use</option>
                <option value="City Commuting">Daily City Commuting</option>
                <option value="Highway Cruising">Weekend Highway Cruising</option>
                <option value="Track / Sports">Track Days / Sports Riding</option>
                <option value="Off-road / Adventure">Off-road / Adventure Trails</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Max Budget (₹)</label>
              <input name="budget" type="number" placeholder="e.g. 200000" required style={{ width: '100%', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(2,6,23,0.6)', color: 'white', fontSize: '1rem', outline: 'none' }} />
            </div>
            <button 
              type="submit" 
              disabled={isLoading} 
              className="cta-button"
              style={{ 
                marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'wait' : 'pointer'
              }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
                  Processing Engine Data...
                </>
              ) : 'Run AI Analysis'}
            </button>
          </form>
        </motion.div>

        {/* AI Result Card */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-panel" 
              style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
            >
              {/* Top Banner / Confidence Score */}
              <div style={{ background: 'rgba(2,6,23,0.8)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--yamaha-cyan)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🎯</span> AI Top Match
                </h3>
                <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.9rem', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                  {result.confidenceScore}% Match
                </div>
              </div>

              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Bike Image & Name */}
                <div style={{ textAlign: 'center' }}>
                  <motion.img 
                    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
                    src={result.vehicleImage} alt={result.recommendedBike} 
                    style={{ width: '100%', maxWidth: '350px', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }} 
                  />
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
                    style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '1.5rem', letterSpacing: '-0.5px' }}
                  >
                    {result.recommendedBike}
                  </motion.h2>
                </div>

                {/* AI Logic Steps */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>AI Logic Matrix</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {result.logicSteps && result.logicSteps.map((step, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 + (idx * 0.2) }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '8px' }}
                      >
                        <span style={{ color: 'var(--yamaha-cyan)', fontSize: '1.2rem' }}>✓</span>
                        <span style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{step}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Typewriter Justification */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} style={{ background: 'rgba(4, 107, 210, 0.1)', borderLeft: '4px solid var(--yamaha-blue)', padding: '1.5rem', borderRadius: '0 8px 8px 0' }}>
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                    "<Typewriter text={result.justification} />"
                  </p>
                </motion.div>

                {/* Budget Alternatives */}
                {result.budgetOptions && result.budgetOptions.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}>
                    <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem' }}>Also Consider (Under Budget)</h4>
                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                      {result.budgetOptions.map((bike, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.08)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                          {bike}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
