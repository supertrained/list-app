'use client';

import { useEffect, useState } from 'react';
import { LOADING_MESSAGES, FOLLOW_UP_LOADING_MESSAGES, EXPLAIN_MORE_LOADING_MESSAGES } from '@/lib/constants';

type LoadingVariant = 'initial' | 'follow-up' | 'explain-more';

interface LoadingStateProps {
  question: string;
  variant?: LoadingVariant;
}

const VARIANT_CONFIG: Record<LoadingVariant, { label: string; messages: string[] }> = {
  'initial': { label: 'Looking up...', messages: LOADING_MESSAGES },
  'follow-up': { label: 'Following up...', messages: FOLLOW_UP_LOADING_MESSAGES },
  'explain-more': { label: 'Digging deeper...', messages: EXPLAIN_MORE_LOADING_MESSAGES },
};

export default function LoadingState({ question, variant = 'initial' }: LoadingStateProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const { label, messages } = VARIANT_CONFIG[variant];
  const isInline = variant !== 'initial';

  useEffect(() => {
    setMessageIndex(0);
  }, [variant]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [messages]);

  const cardClasses = isInline
    ? "bg-white rounded-xl border-2 border-[#D1C9BD] border-l-4 border-l-[#1A5C5E] shadow-sm p-8"
    : "bg-white rounded-xl border-2 border-[#D1C9BD] border-t-4 border-t-[#C8922A] shadow-lg shadow-[#C8922A]/10 p-8";

  return (
    <div>
      {/* Inline heading divider (follow-up / explain-more) */}
      {isInline && question && (
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-[#D1C9BD]" />
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[#1A5C5E] shrink-0">
            {question}
          </h3>
          <div className="h-px flex-1 bg-[#D1C9BD]" />
        </div>
      )}

      <div
        className={cardClasses}
        aria-live="polite"
        aria-busy="true"
      >
        {/* Initial variant: question echo */}
        {!isInline && (
          <>
            <p className="font-[family-name:var(--font-body)] text-sm font-semibold text-[#5C5C5C] uppercase tracking-wide mb-1">
              {label}
            </p>
            <p className="font-[family-name:var(--font-heading)] text-xl text-[#0E3B3D] font-semibold leading-snug mb-8">
              {question}
            </p>
          </>
        )}

        {/* Inline variant: centered label */}
        {isInline && (
          <p className="font-[family-name:var(--font-body)] text-sm font-semibold text-[#5C5C5C] uppercase tracking-wide mb-6 text-center">
            {label}
          </p>
        )}

        {/* Animated dots */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <span
            className="w-3 h-3 rounded-full bg-[#1A5C5E]"
            style={{ animation: 'loadingBounce 1.4s ease-in-out infinite', animationDelay: '0s' }}
          />
          <span
            className="w-3 h-3 rounded-full bg-[#C8922A]"
            style={{ animation: 'loadingBounce 1.4s ease-in-out infinite', animationDelay: '0.2s' }}
          />
          <span
            className="w-3 h-3 rounded-full bg-[#1A5C5E]"
            style={{ animation: 'loadingBounce 1.4s ease-in-out infinite', animationDelay: '0.4s' }}
          />
        </div>

        {/* Rotating status messages with crossfade */}
        <div className="text-center h-8 relative overflow-hidden">
          <p
            key={messageIndex}
            className="font-[family-name:var(--font-body)] text-lg text-[#5C5C5C] absolute inset-x-0"
            style={{ animation: 'messageFade 2.8s ease-in-out' }}
          >
            {messages[messageIndex]}
          </p>
        </div>

        {/* Subtle progress bar */}
        <div className="mt-6 h-1 bg-[#E8E0D5] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1A5C5E] via-[#C8922A] to-[#1A5C5E] rounded-full"
            style={{ animation: 'shimmerBar 2.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </div>
  );
}
