import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Interview Buddy - AI Realistic Technical Interview Simulator',
  description: 'AI-powered dynamic software engineering interview simulator with webcam recording, speech recognition, and comprehensive evaluation reports.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-geist text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col">
        <Navbar />
        <main className="w-full pt-16 bg-surface min-h-screen flex-1">
          {children}
        </main>
        <footer className="w-full border-t border-outline-variant/30 bg-surface-container-low/80 py-6 text-center text-xs text-on-surface-variant">
          <div className="max-w-7xl mx-auto px-gutter-lg flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="font-mono">© 2026 Interview Buddy • Realistic AI Technical Interview Simulator</span>
            <span className="text-outline font-mono text-[10px]">Stitch Professional Developer Theme v2.4</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
