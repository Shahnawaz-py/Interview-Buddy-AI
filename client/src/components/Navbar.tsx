'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-16 w-full px-gutter-lg flex items-center justify-between">
        <div className="flex items-center gap-space-lg">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-space-sm group">
            <div className="w-8 h-8 rounded bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </div>
            <span className="font-geist text-title-md font-semibold text-on-surface tracking-tight">
              Interview Buddy
            </span>
          </Link>

          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-high/60 border border-outline-variant/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container"></span>
            </span>
            <span className="font-mono text-label-sm text-on-surface uppercase tracking-wider">
              Live Session Ready
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-space-xs">
            <Link
              href="/"
              className={`px-space-md py-space-sm text-body-md transition-colors rounded-lg font-medium ${
                pathname === '/'
                  ? 'text-on-surface bg-surface-container-high border-b-2 border-primary-container'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Practice
            </Link>
            <Link
              href="/history"
              className={`px-space-md py-space-sm text-body-md transition-colors rounded-lg font-medium ${
                pathname === '/history'
                  ? 'text-on-surface bg-surface-container-high border-b-2 border-primary-container'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              History & Reports
            </Link>
          </nav>
        </div>

        {/* Right Side Pill & Profile */}
        <div className="flex items-center gap-space-md">
          <div className="flex items-center bg-surface-container-low border border-outline-variant/50 rounded-full p-space-xs">
            <button
              aria-label="Dark Mode Enabled"
              className="flex items-center justify-center w-7 h-7 rounded-full bg-surface-container-highest text-primary-container shadow-inner"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">dark_mode</span>
            </button>
          </div>
          <div className="h-4 w-[1px] bg-outline-variant/40 hidden sm:block"></div>
          <div className="flex items-center gap-space-xs">
            <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/60 flex items-center justify-center text-primary-container text-xs font-mono font-bold">
              DEV
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
