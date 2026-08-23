'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function StudioClient() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 999999,
      backgroundColor: '#0e0e10',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <NextStudio config={config} />
    </div>
  );
}
