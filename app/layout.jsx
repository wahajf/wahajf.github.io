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
                  var saved = localStorage.getItem('theme');
                  var theme = saved ? saved : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);

                  var accents = ['orange', 'lime', 'skyblue'];
                  var randomAccent = accents[Math.floor(Math.random() * accents.length)];
                  document.documentElement.setAttribute('data-accent', randomAccent);
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
