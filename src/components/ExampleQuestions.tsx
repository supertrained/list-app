import { EXAMPLE_QUESTIONS } from '@/lib/constants';

interface ExampleQuestionsProps {
  onSelect: (question: string) => void;
}

const categoryColors: Record<string, string> = {
  'MyGov': 'border-l-[#1A5C5E]',
  'Pensions': 'border-l-[#C8922A]',
  'Centrelink': 'border-l-[#4A7FA5]',
  'Aged Care': 'border-l-[#3D7B5F]',
  'NSW Services': 'border-l-[#C45D3E]',
};

export default function ExampleQuestions({ onSelect }: ExampleQuestionsProps) {
  return (
    <div className="mt-8">
      <p className="font-[family-name:var(--font-heading)] text-xl text-[#0E3B3D] mb-4 font-semibold">
        Not sure where to start? Try one of these:
      </p>
      <div className="flex flex-col gap-3">
        {EXAMPLE_QUESTIONS.map((q) => (
          <button
            key={q.text}
            onClick={() => onSelect(q.text)}
            className={`text-left bg-white border-2 border-[#D1C9BD] border-l-4 ${categoryColors[q.category] || 'border-l-[#1A5C5E]'} rounded-xl px-6 py-4 font-[family-name:var(--font-body)] text-lg text-[#2D2D2D] hover:border-[#1A5C5E] hover:bg-[#FAF6F0] cursor-pointer transition-all duration-150 min-h-[56px] hover:shadow-sm`}
          >
            <span className="text-sm font-semibold text-[#1A5C5E] uppercase tracking-wide block mb-1">
              {q.category}
            </span>
            {q.text}
          </button>
        ))}
      </div>
    </div>
  );
}
