'use client';

import { useState } from 'react';
import Link from 'next/link';
import { APP_NAME, APP_FULL_NAME } from '@/lib/constants';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0E3B3D] shadow-md">
      {/* Gold accent strip */}
      <div className="h-1 bg-[#C8922A]" />
      <div className="max-w-[800px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="no-underline group" onClick={closeMenu}>
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white leading-tight group-hover:text-[#D4A94E] transition-colors duration-150">
              {APP_NAME}
            </h1>
            <p className="font-[family-name:var(--font-body)] text-base text-[#C8C0B5]">
              {APP_FULL_NAME}
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex gap-6">
          <Link
            href="/about"
            className="font-[family-name:var(--font-body)] text-lg text-white/80 hover:text-[#C8922A] no-underline transition-colors duration-150"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="font-[family-name:var(--font-body)] text-lg text-white/80 hover:text-[#C8922A] no-underline transition-colors duration-150"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="font-[family-name:var(--font-body)] text-lg text-white/80 hover:text-[#C8922A] no-underline transition-colors duration-150"
          >
            Terms
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden flex flex-col justify-center items-center w-12 h-12 -mr-2 cursor-pointer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`sm:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${menuOpen ? 'max-h-60' : 'max-h-0'}`}
      >
        <nav className="flex flex-col border-t border-white/10 px-6 pb-4">
          <Link
            href="/about"
            onClick={closeMenu}
            className="font-[family-name:var(--font-body)] text-lg text-white/80 hover:text-[#C8922A] no-underline py-3 border-b border-white/10 transition-colors duration-150"
          >
            About
          </Link>
          <Link
            href="/privacy"
            onClick={closeMenu}
            className="font-[family-name:var(--font-body)] text-lg text-white/80 hover:text-[#C8922A] no-underline py-3 border-b border-white/10 transition-colors duration-150"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            onClick={closeMenu}
            className="font-[family-name:var(--font-body)] text-lg text-white/80 hover:text-[#C8922A] no-underline py-3 transition-colors duration-150"
          >
            Terms
          </Link>
        </nav>
      </div>
    </header>
  );
}
