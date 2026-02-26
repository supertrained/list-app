import { EXAMPLE_QUESTIONS } from '@/lib/constants';

interface ExampleQuestionsProps {
  onSelect: (question: string) => void;
}

export default function ExampleQuestions({ onSelect }: ExampleQuestionsProps) {
  return (
    <div className="mt-8">
      <p className="text-xl text-[#4a4a5a] mb-4">
        Not sure where to start? Try one of these:
      </p>
      <div className="flex flex-col gap-3">
        {EXAMPLE_QUESTIONS.map((q) => (
          <button
            key={q.text}
            onClick={() => onSelect(q.text)}
            className="text-left bg-white border-2 border-[#d0d0cc] rounded-lg px-6 py-4 text-lg text-[#1a1a2e] hover:border-[#1d6fb5] hover:bg-[#eef4fb] cursor-pointer transition-colors min-h-[56px]"
          >
            <span className="text-sm font-semibold text-[#1d6fb5] uppercase tracking-wide block mb-1">
              {q.category}
            </span>
            {q.text}
          </button>
        ))}
      </div>
    </div>
  );
}
