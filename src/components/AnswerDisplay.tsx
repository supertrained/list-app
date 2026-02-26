import ReactMarkdown from 'react-markdown';

interface AnswerDisplayProps {
  answer: string;
  onAskAnother: () => void;
}

export default function AnswerDisplay({ answer, onAskAnother }: AnswerDisplayProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mt-8">
      <div className="bg-white border-2 border-[#d0d0cc] rounded-lg px-6 py-6 print:border-none print:p-0">
        <div className="max-w-none text-[#1a1a2e] [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#14507e] [&_h2]:mt-6 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-3 [&_li]:text-lg [&_li]:leading-relaxed [&_p]:text-lg [&_p]:leading-relaxed [&_p]:my-3 [&_a]:text-[#1d6fb5] [&_a]:underline [&_strong]:text-[#1a1a2e] [&_strong]:font-bold">
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6 print:hidden">
        <button
          onClick={onAskAnother}
          className="flex-1 bg-[#0d7a4f] text-white text-xl font-bold px-8 py-4 rounded-lg hover:bg-[#095e3c] min-h-[56px] cursor-pointer transition-colors"
        >
          Ask Another Question
        </button>
        <button
          onClick={handlePrint}
          className="flex-1 bg-white text-[#1a1a2e] text-xl font-semibold px-8 py-4 rounded-lg border-2 border-[#4a4a5a] hover:bg-[#f5f5f0] min-h-[56px] cursor-pointer transition-colors"
        >
          Print This Answer
        </button>
      </div>
    </div>
  );
}
