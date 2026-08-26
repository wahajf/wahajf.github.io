import './globals.css';
import CursorTrail from './components/CursorTrail';
import ThemeSync from './components/ThemeSync';

export const metadata = {
  title: 'Wahaj',
  description: 'Personal portfolio of Wahaj Farooq. Software Engineer and Computer Science student at Simon Fraser University.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><defs><linearGradient id=%22smoothBlend%22 x1=%220%25%22 y1=%220%25%22 x2=%220%25%22 y2=%22100%25%22><stop offset=%220%25%22 stop-color=%22%233b82f6%22/><stop offset=%22100%25%22 stop-color=%22%23a855f7%22/></linearGradient></defs><circle cx=%2250%22 cy=%2250%22 r=%2248%22 fill=%22url(%23smoothBlend)%22/></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var theme = savedTheme ? savedTheme : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);

                  var savedAccent = localStorage.getItem('accent');
                  var accents = ['orange', 'lime', 'skyblue'];
                  var accent = savedAccent && accents.includes(savedAccent) ? savedAccent : 'orange';
                  document.documentElement.setAttribute('data-accent', accent);
                  localStorage.setItem('accent', accent);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.setAttribute('data-accent', 'orange');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeSync />
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
