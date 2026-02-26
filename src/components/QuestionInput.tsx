'use client';

import { MAX_QUESTION_LENGTH } from '@/lib/constants';

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function QuestionInput({
  value,
  onChange,
  onSubmit,
  isLoading,
}: QuestionInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div>
      <label
        htmlFor="question-input"
        className="block text-[26px] font-bold text-[#1a1a2e] mb-3"
      >
        Ask any question about Australian government services
      </label>
      <textarea
        id="question-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your question here... For example: How do I apply for the Age Pension?"
        maxLength={MAX_QUESTION_LENGTH}
        rows={3}
        disabled={isLoading}
        autoFocus
        className="w-full text-xl p-4 bg-white border-2 border-[#4a4a5a] rounded-lg text-[#1a1a2e] placeholder:text-[#7a7a8a] focus:border-[#1d6fb5] disabled:bg-gray-50 disabled:opacity-60 resize-none min-h-[120px]"
      />
      <div className="flex items-center justify-between mt-2">
        <p className="text-base text-[#4a4a5a]">
          Press Enter to search, Shift+Enter for a new line
        </p>
        <p className="text-base text-[#4a4a5a]">
          {value.length}/{MAX_QUESTION_LENGTH}
        </p>
      </div>
      <button
        onClick={onSubmit}
        disabled={!value.trim() || isLoading}
        className="w-full mt-4 bg-[#0d7a4f] text-white text-xl font-bold px-8 py-4 rounded-lg hover:bg-[#095e3c] disabled:bg-[#999] disabled:cursor-not-allowed min-h-[56px] cursor-pointer transition-colors"
      >
        {isLoading ? 'Finding your answer...' : 'Get My Answer'}
      </button>
    </div>
  );
}
