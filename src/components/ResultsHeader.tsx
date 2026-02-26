interface ResultsHeaderProps {
  question: string;
}

export default function ResultsHeader({ question }: ResultsHeaderProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-[#D1C9BD] border-t-4 border-t-[#1A5C5E] shadow-sm px-6 py-5 mb-2">
      <p className="font-[family-name:var(--font-body)] text-sm font-semibold text-[#5C5C5C] uppercase tracking-wide mb-1">
        Your Question
      </p>
      <p className="font-[family-name:var(--font-heading)] text-xl text-[#0E3B3D] font-semibold leading-snug">
        {question}
      </p>
    </div>
  );
}
