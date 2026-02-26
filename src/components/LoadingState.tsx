'use client';

import { useEffect, useState } from 'react';
import { LOADING_MESSAGES } from '@/lib/constants';

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12" aria-live="polite">
      <div
        className="w-16 h-16 rounded-full mb-6"
        style={{ animation: 'pulse-teal 1.5s ease-in-out infinite' }}
      />
      <p className="font-[family-name:var(--font-body)] text-xl text-[#5C5C5C]">
        {LOADING_MESSAGES[messageIndex]}
      </p>
    </div>
  );
}
