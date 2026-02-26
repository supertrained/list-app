'use client';

import { getDomainFromUrl } from '@/lib/citations';

interface CitationRefProps {
  number: number;
  url: string;
  onOpen: () => void;
}

export default function CitationRef({ number, url, onOpen }: CitationRefProps) {
  const domain = getDomainFromUrl(url);

  return (
    <span className="relative inline-block group">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Source ${number}: ${domain}. Click to view source details.`}
        className="inline-flex items-center justify-center text-xs font-bold text-[#1A5C5E] bg-[#1A5C5E]/10 hover:bg-[#1A5C5E]/20 rounded px-1.5 py-0.5 mx-0.5 align-super cursor-pointer transition-colors duration-150 min-w-[1.5em] min-h-[1.5em] focus-visible:outline-2 focus-visible:outline-[#C8922A] focus-visible:outline-offset-1"
      >
        {number}
      </button>

      {/* Tooltip — desktop hover only */}
      <span
        role="tooltip"
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#0E3B3D] text-white text-sm font-[family-name:var(--font-body)] rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-10 hidden sm:block"
      >
        {domain}
        {/* Arrow */}
        <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#0E3B3D]" />
      </span>
    </span>
  );
}
