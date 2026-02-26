'use client';

import { MAX_QUESTION_LENGTH } from '@/lib/constants';

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export default function QuestionInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
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
    <div className="bg-white rounded-xl border-2 border-[#D1C9BD] border-t-4 border-t-[#C8922A] shadow-lg shadow-[#C8922A]/10 p-6 sm:p-8">
      <label
        htmlFor="question-input"
        className="block font-[family-name:var(--font-heading)] text-xl font-semibold text-[#0E3B3D] mb-3"
      >
        Ask any question about Australian government services and life admin
      </label>
      <textarea
        id="question-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your question here... For example: How do I apply for the Age Pension? Or: What concessions can I get in my state?"
        maxLength={MAX_QUESTION_LENGTH}
        rows={3}
        disabled={isLoading}
        autoFocus
        className="w-full font-[family-name:var(--font-body)] text-xl p-4 bg-[#FAF6F0] border-2 border-[#B5AC9F] rounded-lg text-[#2D2D2D] placeholder:text-[#5C5C5C] focus:border-[#C8922A] focus:ring-2 focus:ring-[#C8922A]/30 focus:shadow-md disabled:bg-[#E8E0D5] disabled:opacity-60 resize-none min-h-[120px] transition-all duration-150"
      />
      <div className="flex items-center justify-between mt-2">
        <p className="font-[family-name:var(--font-body)] text-base text-[#5C5C5C]">
          Press Enter to search, Shift+Enter for a new line
        </p>
        <p className="font-[family-name:var(--font-body)] text-base text-[#5C5C5C]">
          {value.length}/{MAX_QUESTION_LENGTH}
        </p>
      </div>
      <button
        onClick={onSubmit}
        disabled={!value.trim() || isLoading}
        className="w-full mt-4 bg-[#C8922A] text-[#0E3B3D] font-[family-name:var(--font-body)] text-xl font-semibold px-8 py-4 rounded-lg hover:bg-[#A67720] hover:shadow-md active:scale-[0.98] disabled:bg-[#E8E0D5] disabled:text-[#B5AC9F] disabled:border-2 disabled:border-[#D1C9BD] disabled:cursor-not-allowed disabled:active:scale-100 min-h-[56px] cursor-pointer transition-all duration-150"
      >
        {isLoading ? 'Finding your answer...' : 'Get My Answer'}
      </button>
    </div>
  );
}
