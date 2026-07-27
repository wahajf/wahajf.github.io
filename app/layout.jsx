import './globals.css';
import CursorTrail from './components/CursorTrail';

export const metadata = {
  title: 'Wahaj Farooq — Developer & Media Creator',
  description: 'Personal portfolio of Wahaj Farooq. Developer and creator based in Vancouver, BC. Creator of @thatyvrspotter.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
