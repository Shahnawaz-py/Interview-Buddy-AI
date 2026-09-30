'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] px-6 sm:px-10 lg:px-16 py-4 sm:py-4.5 transition-all">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-6 lg:gap-8">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/40 flex items-center justify-center text-primary group-hover:scale-105 group-hover:bg-primary/25 transition-all shadow-[0_0_12px_rgba(37,99,235,0.3)]">
              <span className="material-symbols-outlined text-[22px] text-primary">psychology</span>
            </div>
            <span className="font-geist text-lg font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">
              Interview Buddy
            </span>
          </Link>

          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high/80 border border-outline-variant/40">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
            </span>
            <span className="font-mono text-xs text-on-surface-variant font-medium uppercase tracking-wider">
              Live Session Ready
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className={`px-4 py-2 text-sm transition-all rounded-lg font-medium ${
                pathname === '/'
                  ? 'text-on-surface bg-surface-container-high border-b-2 border-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Practice
            </Link>
            <Link
              href="/history"
              className={`px-4 py-2 text-sm transition-all rounded-lg font-medium ${
                pathname === '/history'
                  ? 'text-on-surface bg-surface-container-high border-b-2 border-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              History & Reports
            </Link>
          </nav>
        </div>

        {/* Right Side Pill & Profile */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-surface-container border border-outline-variant/50 rounded-full p-1">
            <button
              aria-label="Dark Mode Enabled"
              className="flex items-center justify-center w-7 h-7 rounded-full bg-surface-container-highest text-secondary shadow-inner"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">dark_mode</span>
            </button>
          </div>
          <div className="h-4 w-[1px] bg-outline-variant/40 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary text-xs font-mono font-bold shadow-[0_0_10px_rgba(37,99,235,0.25)]">
              DEV
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
