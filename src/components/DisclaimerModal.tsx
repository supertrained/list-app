'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { DISCLAIMER_STORAGE_KEY } from '@/lib/constants';

export default function DisclaimerModal() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(DISCLAIMER_STORAGE_KEY);
      if (!accepted) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = useCallback(() => {
    try {
      localStorage.setItem(DISCLAIMER_STORAGE_KEY, 'true');
    } catch {
      // Silently fail — worst case the modal shows again next visit
    }
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    buttonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      aria-describedby="disclaimer-body"
    >
      {/* Overlay backdrop */}
      <div className="absolute inset-0 bg-[#0E3B3D]/60 backdrop-blur-sm" />

      {/* Modal card */}
      <div
        ref={modalRef}
        className="relative bg-[#FAF6F0] border-2 border-[#D1C9BD] rounded-xl shadow-2xl max-w-[560px] w-full max-h-[90vh] overflow-y-auto"
        style={{ animation: 'fadeInUp 0.4s ease-out' }}
      >
        {/* Gold accent strip at top */}
        <div className="h-1.5 bg-[#C8922A] rounded-t-[10px]" />

        <div className="px-8 py-8 sm:px-10 sm:py-10">
          {/* Info icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#1A5C5E] flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
          </div>

          <h2
            id="disclaimer-title"
            className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#0E3B3D] text-center mb-4"
          >
            Before you begin
          </h2>

          <div id="disclaimer-body" className="space-y-4">
            <p className="font-[family-name:var(--font-body)] text-lg text-[#2D2D2D] leading-relaxed text-center">
              Welcome to <strong>L.I.S.T.</strong> — Life in Simple Terms.
            </p>
            <p className="font-[family-name:var(--font-body)] text-lg text-[#2D2D2D] leading-relaxed">
              L.I.S.T. provides <strong>general information only</strong> to help
              you understand Australian government services and everyday life admin.
            </p>

            {/* Key disclaimers in a highlighted box */}
            <div className="bg-white border-2 border-[#D1C9BD] border-l-4 border-l-[#C8922A] rounded-xl px-5 py-4">
              <p className="font-[family-name:var(--font-body)] text-lg text-[#2D2D2D] leading-relaxed font-semibold mb-2">
                L.I.S.T. does not provide:
              </p>
              <ul className="space-y-2 font-[family-name:var(--font-body)] text-lg text-[#2D2D2D]">
                <li className="flex items-start gap-2">
                  <span className="text-[#C8922A] font-bold mt-0.5" aria-hidden="true">*</span>
                  <span>Medical or health advice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8922A] font-bold mt-0.5" aria-hidden="true">*</span>
                  <span>Legal advice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8922A] font-bold mt-0.5" aria-hidden="true">*</span>
                  <span>Financial advice</span>
                </li>
              </ul>
            </div>

            <p className="font-[family-name:var(--font-body)] text-lg text-[#5C5C5C] leading-relaxed">
              For advice about your personal situation, please speak to a qualified
              professional or contact the relevant government service directly.
            </p>
          </div>

          <button
            ref={buttonRef}
            onClick={handleDismiss}
            className="w-full mt-8 bg-[#C8922A] text-white font-[family-name:var(--font-body)] text-xl font-semibold px-8 py-4 rounded-lg hover:bg-[#A67720] hover:shadow-sm active:scale-[0.98] min-h-[56px] cursor-pointer transition-all duration-150"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
