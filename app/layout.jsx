import './globals.css';
import CursorTrail from './components/CursorTrail';
import ThemeSync from './components/ThemeSync';

export const metadata = {
  title: 'Wahaj Farooq — Developer & Media Creator',
  description: 'Personal portfolio of Wahaj Farooq. Developer and creator based in Vancouver, BC. Creator of @thatyvrspotter.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
