import Link from 'next/link';
import { APP_NAME, APP_FULL_NAME } from '@/lib/constants';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#0E3B3D] shadow-md">
      {/* Gold accent strip */}
      <div className="h-1 bg-[#C8922A]" />
      <div className="max-w-[800px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="no-underline group">
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white leading-tight group-hover:text-[#D4A94E] transition-colors duration-150">
              {APP_NAME}
            </h1>
            <p className="font-[family-name:var(--font-body)] text-base text-[#C8C0B5]">
              {APP_FULL_NAME}
            </p>
          </div>
        </Link>
        <nav className="flex gap-6">
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
      </div>
    </header>
  );
}
