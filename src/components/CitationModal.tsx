'use client';

import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { getDomainFromUrl } from '@/lib/citations';

interface CitationModalProps {
  citationNumber: number;
  url: string;
  onClose: () => void;
}

export default function CitationModal({
  citationNumber,
  url,
  onClose,
}: CitationModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const domain = getDomainFromUrl(url);
  const displayUrl = url.length > 80 ? url.slice(0, 77) + '...' : url;

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ animation: 'backdropFadeIn 0.2s ease-out forwards' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="citation-modal-title"
        className="relative bg-[#FAF6F0] rounded-xl shadow-xl max-w-md w-full p-6 border-2 border-[#D1C9BD]"
        style={{ animation: 'modalSlideUp 0.25s ease-out forwards' }}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close source details"
          className="absolute top-3 right-3 text-[#5C5C5C] hover:text-[#0E3B3D] cursor-pointer transition-colors duration-150"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Citation badge + domain */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[#1A5C5E] rounded-lg">
            {citationNumber}
          </span>
          <h2
            id="citation-modal-title"
            className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#0E3B3D]"
          >
            {domain}
          </h2>
        </div>

        {/* URL display */}
        <div className="bg-white border border-[#D1C9BD] rounded-lg px-4 py-3 mb-5">
          <p className="font-[family-name:var(--font-body)] text-sm text-[#5C5C5C] break-all leading-relaxed">
            {displayUrl}
          </p>
        </div>

        {/* Visit Source button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#1A5C5E] text-white font-[family-name:var(--font-body)] text-lg font-semibold px-6 py-3 rounded-lg hover:bg-[#0E3B3D] min-h-[48px] cursor-pointer transition-colors duration-150 text-center no-underline"
          onClick={onClose}
        >
          Visit Source
        </a>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
