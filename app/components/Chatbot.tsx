"use client";

import { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Hi! I am the Ashoka Motors AI assistant. How can I help you find your dream Yamaha bike?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply || "Sorry, I couldn't process that." }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: "Network error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', 
          backgroundColor: '#046bd2', color: 'white', 
          border: 'none', borderRadius: '50%', width: '60px', height: '60px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer',
          display: isOpen ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', zIndex: 1000
        }}
      >
        💬
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          width: '350px', height: '500px', backgroundColor: 'white',
          borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          zIndex: 1000
        }}>
          <div style={{ backgroundColor: '#046bd2', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
          </div>
          
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.role === 'user' ? '#046bd2' : '#f1f5f9',
                color: msg.role === 'user' ? 'white' : '#334155',
                padding: '0.75rem 1rem', borderRadius: '8px', maxWidth: '85%',
                fontSize: '0.95rem', lineHeight: '1.4'
              }}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div style={{ alignSelf: 'flex-start', color: '#888', fontStyle: 'italic', fontSize: '0.8rem' }}>AI is typing...</div>}
          </div>

          <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask me about bikes..."
              style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
            <button onClick={handleSend} disabled={isLoading} style={{ backgroundColor: isLoading ? '#94a3b8' : '#046bd2', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
