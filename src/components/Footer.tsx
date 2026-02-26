import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t-2 border-[#D1C9BD] mt-12 bg-[#E8E0D5]">
      <div className="max-w-[800px] mx-auto px-6 py-6">
        <p className="font-[family-name:var(--font-body)] text-base text-[#5C5C5C] mb-3">
          L.I.S.T. does not track you, show ads, or sell your information.
        </p>
        <div className="flex gap-6 text-base">
          <Link href="/privacy" className="font-[family-name:var(--font-body)] text-[#1A5C5E] hover:text-[#0E3B3D]">
            Privacy
          </Link>
          <Link href="/about" className="font-[family-name:var(--font-body)] text-[#1A5C5E] hover:text-[#0E3B3D]">
            About
          </Link>
          <Link href="/terms" className="font-[family-name:var(--font-body)] text-[#1A5C5E] hover:text-[#0E3B3D]">
            Terms
          </Link>
        </div>
        <p className="font-[family-name:var(--font-body)] text-base text-[#5C5C5C] mt-4">
          &copy; {new Date().getFullYear()} L.I.S.T. &mdash; Life in Simple Terms
        </p>
        <p className="font-[family-name:var(--font-body)] text-sm text-[#5C5C5C] mt-1">
          Built by SuperTrained.ai
        </p>
      </div>
    </footer>
  );
}
