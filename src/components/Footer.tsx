import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t-2 border-[#d0d0cc] mt-12 bg-white">
      <div className="max-w-[800px] mx-auto px-6 py-6">
        <p className="text-base text-[#4a4a5a] mb-3">
          L.I.S.T. does not track you, show ads, or sell your information.
        </p>
        <div className="flex gap-6 text-base">
          <Link href="/privacy" className="text-[#1d6fb5] hover:text-[#14507e]">
            Privacy
          </Link>
          <Link href="/about" className="text-[#1d6fb5] hover:text-[#14507e]">
            About
          </Link>
        </div>
        <p className="text-base text-[#4a4a5a] mt-4">
          &copy; {new Date().getFullYear()} L.I.S.T. &mdash; Life in Simple Terms
        </p>
      </div>
    </footer>
  );
}
