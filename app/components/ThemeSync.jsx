'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ThemeSync() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      const savedAccent = localStorage.getItem('accent') || 'orange';
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.documentElement.setAttribute('data-accent', savedAccent);
    } catch (e) {
      console.error('Failed to sync theme on route change:', e);
    }
  }, [pathname]);

  return null;
}
