'use client';
import { useState } from 'react';

const MOODS = [
  { value: 'Ishq — Deep Love',       emoji: '🌹' },
  { value: 'Dard — Heartbreak Pain', emoji: '💔' },
  { value: 'Sukoon — Inner Peace',   emoji: '🌙' },
  { value: 'Junoon — Wild Obsession',emoji: '🔥' },
  { value: 'Tanhai — Loneliness',    emoji: '🌫️' },
  { value: 'Intezaar — Longing',     emoji: '⏳' },
  { value: 'Gussa — Rage & Pride',   emoji: '⚡' },
  { value: 'Khushi — Pure Joy',      emoji: '✨' },
];

export default function Home() {
  const [mood, setMood]       = useState(MOODS[0].value);
  const [hook, setHook]       = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [copied, setCopied]   = useState(false);

  const generateHook = async () => {
    setLoading(true);
    setError('');
    setHook('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setHook(data.hook);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyHook = () => {
    navigator.clipboard.writeText(hook);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedMoodEmoji = MOODS.find(m => m.value === mood)?.emoji || '';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0a0612 0%, #110a20 50%, #0d0a18 100%)',
      color: '#e8dcc8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 10vw, 4rem)',
          color: '#c9a84c',
          margin: 0,
          letterSpacing: '0.15em',
          textShadow: '0 0 40px rgba(201,168,76,0.4)',
        }}>
          MADHOSH
        </h1>
        <p style={{ color: 'rgba(232,220,200,0.45)', fontSize: '0.85rem', marginTop: '0.4rem', letterSpacing: '0.2em' }}>
          VIRAL HOOK GENERATOR
        </p>
      </div>

      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: '20px',
        padding: '1.8rem',
        backdropFilter: 'blur(10px)',
      }}>
        <label style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'rgba(201,168,76,0.7)', display: 'block', marginBottom: '0.5rem' }}>
          SELECT MOOD
        </label>
        <select
          value={mood}
          onChange={e => setMood(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: '12px',
            padding: '12px 14px',
            color: '#e8dcc8',
            fontSize: '0.95rem',
            marginBottom: '1.2rem',
            cursor: 'pointer',
            outline: 'none',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c9a84c' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 14px center',
            paddingRight: '36px',
          }}
        >
          {MOODS.map(m => (
            <option key={m.value} value={m.value}>{m.emoji} {m.value}</option>
          ))}
        </select>

        <button
          onClick={generateHook}
          disabled={loading}
          style={{
            width: '100%',
            background: loading
              ? 'rgba(124,63,158,0.4)'
              : 'linear-gradient(135deg, #7c3f9e, #c0406a, #c9a84c)',
            color: 'white',
            fontWeight: '700',
            padding: '14px',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            letterSpacing: '0.1em',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? `GENERATING ${selectedMoodEmoji}...` : `✦ GENERATE HOOK`}
        </button>

        {error && (
          <div style={{
            marginTop: '1rem',
            padding: '10px 14px',
            background: 'rgba(255,80,80,0.1)',
            border: '1px solid rgba(255,80,80,0.3)',
            borderRadius: '10px',
            color: '#f99',
            fontSize: '0.85rem',
          }}>
            ⚠ {error}
          </div>
        )}

        {hook && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1.5rem',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '16px',
            background: 'rgba(201,168,76,0.05)',
          }}>
            <div style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: '1.7', color: '#f0e6d0' }}>
              "{hook}"
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'rgba(201,168,76,0.5)' }}>
              {selectedMoodEmoji} {mood}
            </div>
            <button
              onClick={copyHook}
              style={{
                marginTop: '1rem',
                width: '100%',
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.25)',
                borderRadius: '8px',
                color: '#c9a84c',
                padding: '8px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                letterSpacing: '0.1em',
              }}
            >
              {copied ? '✓ COPIED' : '⎘ COPY HOOK'}
            </button>
          </div>
        )}
      </div>
      <p style={{ marginTop: '2rem', fontSize: '0.7rem', color: 'rgba(232,220,200,0.2)', letterSpacing: '0.1em' }}>
        POWERED BY GROQ × LLAMA 3
      </p>
    </div>
  );
  }
