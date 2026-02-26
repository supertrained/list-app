'use client';

import { useState } from 'react';

interface FollowUpInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

export default function FollowUpInput({ onSubmit, isLoading }: FollowUpInputProps) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSubmit(value.trim());
        setValue('');
      }
    }
  };

  const handleSubmit = () => {
    if (value.trim() && !isLoading) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <div className="mt-6 print:hidden">
      <label
        htmlFor="follow-up-input"
        className="block font-[family-name:var(--font-heading)] text-xl font-semibold text-[#0E3B3D] mb-2"
      >
        Ask a follow-up question
      </label>
      <textarea
        id="follow-up-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a follow-up question about this answer..."
        rows={2}
        disabled={isLoading}
        maxLength={500}
        className="w-full font-[family-name:var(--font-body)] text-lg p-4 bg-white border-2 border-[#B5AC9F] rounded-lg text-[#2D2D2D] placeholder:text-[#5C5C5C] focus:border-[#1A5C5E] focus:shadow-sm disabled:bg-[#E8E0D5] disabled:opacity-60 resize-none transition-all duration-150"
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim() || isLoading}
        className="mt-3 bg-transparent text-[#1A5C5E] font-[family-name:var(--font-body)] text-lg font-semibold px-8 py-3 rounded-lg border-2 border-[#1A5C5E] hover:bg-[rgba(26,92,94,0.08)] min-h-[48px] cursor-pointer transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Ask Follow-Up
      </button>
    </div>
  );
}
