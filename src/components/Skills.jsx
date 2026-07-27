import React from 'react';
import { Cpu, Check } from 'lucide-react';

export default function Skills({ skills }) {
  return (
    <section style={{ marginBottom: '40px' }}>
      <h2 className="section-title">
        <Cpu size={18} style={{ color: 'var(--accent-color)' }} />
        <span>Skills & Technologies</span>
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '12px'
      }}>
        {skills.map((skill, idx) => (
          <div key={idx} className="card" style={{ padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-main)' }}>
                {skill.name}
              </span>
              <span className="badge" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                {skill.category}
              </span>
            </div>

            {/* Proficiency Bar */}
            <div style={{
              width: '100%',
              height: '4px',
              borderRadius: '2px',
              background: 'var(--border-color)',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${skill.level}%`,
                height: '100%',
                background: 'var(--accent-color)',
                borderRadius: '2px',
                transition: 'width 0.6s ease'
              }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
