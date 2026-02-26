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
      <div className="w-16 h-16 rounded-full bg-[#0d7a4f] animate-pulse mb-6" />
      <p className="text-xl text-[#4a4a5a]">
        {LOADING_MESSAGES[messageIndex]}
      </p>
    </div>
  );
}
