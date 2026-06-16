"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = { role: 'user' | 'model', text: string };

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hey there! 🏍️ I am your Ashoka Motors AI Assistant. Looking for a track monster like the R15M or a street fighter like the MT-15?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    const newMessages: Message[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the ENTIRE history so the AI remembers context!
        body: JSON.stringify({ history: newMessages })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'model', text: data.reply || "Sorry, I hit a speedbump!" }]);
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: "Network error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', 
          background: 'var(--accent-gradient)', color: 'white', 
          border: 'none', borderRadius: '50%', width: '64px', height: '64px',
          boxShadow: '0 8px 24px rgba(4, 107, 210, 0.4)', cursor: 'pointer',
          display: isOpen ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="glass-panel"
            style={{
              position: 'fixed', bottom: '2rem', right: '2rem',
              width: '380px', height: '600px',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              zIndex: 1000,
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div style={{ background: 'rgba(2,6,23,0.8)', padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🤖</div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Yamaha AI Copilot</h3>
                  <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span> Online
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.5rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>×</button>
            </div>
            
            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.2rem', background: 'rgba(15, 23, 42, 0.4)' }}>
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    color: 'white',
                    padding: '0.8rem 1.2rem', 
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', 
                    maxWidth: '85%',
                    fontSize: '0.95rem', lineHeight: '1.5',
                    position: 'relative'
                  }}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isLoading && (
                <div className="chat-bubble-ai" style={{ alignSelf: 'flex-start', padding: '0.8rem 1.2rem', borderRadius: '18px 18px 18px 4px', color: 'var(--text-secondary)' }}>
                  <span className="cursor-blink">● ● ●</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: '1rem', background: 'rgba(2,6,23,0.8)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(30,41,59,0.5)', borderRadius: '24px', padding: '0.3rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <input 
                  type="text" 
                  value={input} 
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about specs, price, or EMI..."
                  style={{ flex: 1, padding: '0.8rem 1.2rem', borderRadius: '20px', border: 'none', background: 'transparent', color: 'white', outline: 'none', fontSize: '0.95rem' }}
                />
                <button 
                  onClick={handleSend} 
                  disabled={isLoading || !input.trim()} 
                  style={{ 
                    background: isLoading || !input.trim() ? 'rgba(255,255,255,0.1)' : 'var(--accent-gradient)', 
                    color: 'white', border: 'none', width: '40px', height: '40px', 
                    borderRadius: '50%', cursor: isLoading || !input.trim() ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
