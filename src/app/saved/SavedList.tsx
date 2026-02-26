'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SavedResponse } from '@/types';
import { loadSavedResponses, deleteSavedResponse } from '@/lib/savedResponses';

export default function SavedList() {
  const [items, setItems] = useState<SavedResponse[]>([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setItems(loadSavedResponses());
    setMounted(true);
  }, []);

  const handleLoad = (id: string) => {
    router.push(`/?load=${id}`);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteSavedResponse(id);
    setItems(updated);
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="bg-white border-2 border-[#D1C9BD] border-l-4 border-l-[#C8922A] rounded-xl px-6 py-8 text-center">
        <p className="font-[family-name:var(--font-body)] text-xl text-[#5C5C5C]">
          You haven&apos;t saved any answers yet.
        </p>
        <p className="font-[family-name:var(--font-body)] text-lg text-[#5C5C5C] mt-2">
          After asking a question, tap <strong>Save This Answer</strong> to keep it here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div
          key={item.id}
          style={{
            animation: 'fadeInUp 0.4s ease-out forwards',
            animationDelay: `${i * 60}ms`,
            opacity: 0,
          }}
          className="bg-white border-2 border-[#D1C9BD] border-l-4 border-l-[#1A5C5E] rounded-xl px-6 py-4 hover:border-[#1A5C5E] hover:bg-[#FAF6F0] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-150 hover:shadow-sm cursor-pointer group"
          onClick={() => handleLoad(item.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleLoad(item.id);
            }
          }}
          aria-label={`Load saved answer: ${item.question}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-[#1A5C5E] uppercase tracking-wide block mb-1">
                {new Date(item.savedAt).toLocaleDateString('en-AU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <p className="font-[family-name:var(--font-body)] text-lg text-[#2D2D2D] leading-snug">
                {item.question}
              </p>
            </div>
            <button
              onClick={(e) => handleDelete(item.id, e)}
              aria-label={`Delete saved answer: ${item.question}`}
              className="shrink-0 flex items-center justify-center text-[#5C5C5C] hover:text-[#C45D3E] transition-colors duration-150 min-h-[44px] min-w-[44px] -mr-2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M6 4V3a1 1 0 011-1h6a1 1 0 011 1v1M3 4h14M8 9v6M12 9v6M5 4l1 13h8l1-13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
