import './globals.css';
import CursorTrail from './components/CursorTrail';
import ProgressiveBlur from './components/ProgressiveBlur';

export const metadata = {
  title: 'Wahaj Farooq — Developer & Media Creator',
  description: 'Personal portfolio of Wahaj Farooq. Developer and creator based in Vancouver, BC. Creator of @thatyvrspotter.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        <CursorTrail />
        {children}
        <ProgressiveBlur />
      </body>
    </html>
  );
}
