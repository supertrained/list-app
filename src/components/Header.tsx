import Link from 'next/link';
import { APP_NAME, APP_FULL_NAME } from '@/lib/constants';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-[#d0d0cc] shadow-sm">
      <div className="max-w-[800px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="no-underline">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] leading-tight">
              {APP_NAME}
            </h1>
            <p className="text-base text-[#4a4a5a]">{APP_FULL_NAME}</p>
          </div>
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/about"
            className="text-lg text-[#1d6fb5] hover:text-[#14507e]"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-lg text-[#1d6fb5] hover:text-[#14507e]"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </header>
  );
}
