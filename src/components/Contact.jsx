import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export default function Contact({ email }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <section style={{ marginBottom: '40px' }}>
      <h2 className="section-title">
        <Mail size={18} style={{ color: 'var(--accent-color)' }} />
        <span>Get in Touch</span>
      </h2>

      <div className="card" style={{ padding: '24px' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 10px' }} className="animate-fade-in">
            <CheckCircle2 size={42} style={{ color: '#10b981', margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px' }}>Message Sent!</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Thank you for reaching out, Wahaj will get back to you shortly.
            </p>
            <button 
              onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
              className="btn"
              style={{ marginTop: '16px', fontSize: '0.82rem' }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="Hi Wahaj, I'd like to talk about a project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                Or email directly at <strong style={{ color: 'var(--text-main)' }}>{email}</strong>
              </span>

              <button type="submit" className="btn btn-primary">
                <Send size={14} /> Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
