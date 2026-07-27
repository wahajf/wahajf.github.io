import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Experience({ experience }) {
  return (
    <section style={{ marginBottom: '40px' }}>
      <h2 className="section-title">
        <Briefcase size={18} style={{ color: 'var(--accent-color)' }} />
        <span>Experience</span>
        <sup>{experience.length}</sup>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {experience.map((item) => (
          <div key={item.id} className="card" style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div>
                <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-main)' }}>
                  {item.role}
                </span>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-color)', marginLeft: '8px', fontWeight: '500' }}>
                  @ {item.organization}
                </span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={13} /> {item.period}
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.5' }}>
              {item.description}
            </p>

            {item.highlights && item.highlights.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {item.highlights.map((point, idx) => (
                  <div key={idx} style={{ fontSize: '0.82rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={13} style={{ color: 'var(--accent-color)', shrink: 0 }} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
