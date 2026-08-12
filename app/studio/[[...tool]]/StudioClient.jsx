'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';
import PillNavbar from '../../components/PillNavbar';

export default function StudioClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (!projectId || projectId === 'your-project-id') {
    return (
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PillNavbar />
        <main className="inner-content-container" style={{ width: '100%', maxWidth: '620px', paddingTop: '110px', paddingBottom: '96px' }}>
          <div style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '20px',
            padding: '28px',
            boxSizing: 'border-box'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '8px' }}>
              Sanity CMS Setup
            </div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: '600', color: 'var(--text)', margin: '0 0 12px 0' }}>
              Connect Your Sanity Account
            </h1>
            <p style={{ fontSize: '0.92rem', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              Sanity Studio requires your free Sanity Project ID to manage real blog posts and categories. Follow these 2 quick steps:
            </p>

            <ol style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text)', lineHeight: '1.8', margin: '0 0 24px 0' }}>
              <li>
                Create a free project at <a href="https://www.sanity.io/manage" target="_blank" rel="noreferrer" style={{ color: 'var(--text)', textDecoration: 'underline', fontWeight: '600' }}>sanity.io/manage</a>.
              </li>
              <li>
                Add your <strong>Project ID</strong> to your <code>.env.local</code> file in your project root.
              </li>
            </ol>

            <div style={{
              backgroundColor: 'var(--sub-bg)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '14px 16px',
              fontFamily: 'monospace',
              fontSize: '0.84rem',
              color: 'var(--text)',
              marginBottom: '20px',
              overflowX: 'auto'
            }}>
              <div># Create or edit .env.local in your project root:</div>
              <div style={{ color: 'var(--text)', fontWeight: '600', marginTop: '4px' }}>NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id</div>
              <div>NEXT_PUBLIC_SANITY_DATASET=production</div>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--muted)', margin: 0 }}>
              💡 <em>Tip: Also add <code>http://localhost:3000</code> under <strong>API &gt; CORS Origins</strong> in your Sanity Manage dashboard.</em>
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 999999,
      backgroundColor: '#0e0e10',
      margin: 0,
      padding: 0,
      overflow: 'auto'
    }}>
      <NextStudio config={config} />
    </div>
  );
}
