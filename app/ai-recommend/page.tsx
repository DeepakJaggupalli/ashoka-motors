"use client";
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AIRecommend() {
  const [result, setResult] = useState<{ recommendedBike: string, confidenceScore: number, justification: string, vehicleImage: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
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
      toast.success('AI Analysis Complete!');
    } catch (error) {
      toast.error('Error getting recommendation. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main-container" style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--yamaha-blue)' }}>Find Your Perfect Yamaha</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-color)' }}>Our AI Recommendation Engine analyzes your body metrics and riding style to match you with the perfect machine.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', width: '100%', maxWidth: '1000px', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 400px', backgroundColor: 'var(--card-bg)', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Rider Profile</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Height</label>
              <select name="height" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--background)', color: 'var(--text-color)' }}>
                <option value="">Select Height</option>
                <option value="Under 5'4\"">Under 5'4"</option>
                <option value="5'4\" - 5'9\"">5'4" - 5'9"</option>
                <option value="Over 5'9\"">Over 5'9"</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Experience Level</label>
              <select name="experience" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--background)', color: 'var(--text-color)' }}>
                <option value="">Select Experience</option>
                <option value="Beginner">Beginner (First Bike)</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced Rider</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Primary Use</label>
              <select name="commute" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--background)', color: 'var(--text-color)' }}>
                <option value="">Select Primary Use</option>
                <option value="City Commuting">City Commuting</option>
                <option value="Highway Cruising">Highway Cruising</option>
                <option value="Track / Sports">Track / Sports</option>
                <option value="Off-road / Adventure">Off-road / Adventure</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Budget Limit (₹)</label>
              <input name="budget" type="number" placeholder="e.g. 200000" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--background)', color: 'var(--text-color)' }} />
            </div>
            <button type="submit" disabled={isLoading} style={{ backgroundColor: isLoading ? '#94a3b8' : 'var(--yamaha-blue)', color: 'white', padding: '0.75rem', borderRadius: '6px', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer', transition: 'background-color 0.3s', marginTop: '1rem' }}>
              {isLoading ? 'Running ML Engine...' : 'Analyze My Profile'}
            </button>
          </form>
        </div>

        {result && (
          <div style={{ flex: '1 1 400px', backgroundColor: 'var(--card-bg)', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid var(--yamaha-blue)', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.5s ease-in-out' }}>
            <h2 style={{ color: 'var(--yamaha-blue)', marginBottom: '0.5rem' }}>AI Recommendation</h2>
            <div style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '20px', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Confidence Score: {result.confidenceScore}%
            </div>
            
            <img src={result.vehicleImage} alt={result.recommendedBike} style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '8px', marginBottom: '1.5rem', objectFit: 'contain' }} />
            
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{result.recommendedBike}</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', textAlign: 'justify', color: 'var(--text-color)' }}>
              "{result.justification}"
            </p>

            <a href="/vehicles" style={{ marginTop: '2rem', display: 'inline-block', backgroundColor: 'var(--yamaha-black)', color: 'white', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 'bold', textDecoration: 'none' }}>
              View Inventory
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
