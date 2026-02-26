'use client';

import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';

interface AnswerDisplayProps {
  answer: string;
  onAskAnother: () => void;
  onExplainMore: () => void;
  isLoading: boolean;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, '. ')
    .trim();
}

export default function AnswerDisplay({ answer, onAskAnother, onExplainMore, isLoading }: AnswerDisplayProps) {
  const [isReading, setIsReading] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    setSpeechSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleReadAloud = () => {
    if (!speechSupported) return;

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const plainText = stripMarkdown(answer);
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = 'en-AU';
    utterance.rate = 0.9;
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mt-8" style={{ animation: 'fadeInUp 0.4s ease-out' }}>
      <div className="bg-white border-2 border-[#D1C9BD] border-l-4 border-l-[#1A5C5E] rounded-xl px-6 py-6 print:border-none print:p-0">
        <div className="max-w-none font-[family-name:var(--font-body)] text-[#2D2D2D] [&_h2]:font-[family-name:var(--font-heading)] [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#0E3B3D] [&_h2]:mt-6 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-3 [&_li]:text-lg [&_li]:leading-relaxed [&_p]:text-lg [&_p]:leading-relaxed [&_p]:my-3 [&_a]:text-[#4A7FA5] [&_a]:underline [&_strong]:text-[#2D2D2D] [&_strong]:font-semibold">
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6 print:hidden">
        <button
          onClick={onAskAnother}
          className="flex-1 bg-[#C8922A] text-[#0E3B3D] font-[family-name:var(--font-body)] text-xl font-semibold px-8 py-4 rounded-lg hover:bg-[#A67720] min-h-[56px] cursor-pointer transition-colors duration-150"
        >
          Ask Another Question
        </button>
        <button
          onClick={onExplainMore}
          disabled={isLoading}
          className="flex-1 bg-transparent text-[#1A5C5E] font-[family-name:var(--font-body)] text-xl font-semibold px-8 py-4 rounded-lg border-2 border-[#1A5C5E] hover:bg-[rgba(26,92,94,0.08)] min-h-[56px] cursor-pointer transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Getting more detail...' : 'Explain This in More Detail'}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4 print:hidden">
        {speechSupported && (
          <button
            onClick={handleReadAloud}
            className="flex-1 bg-transparent text-[#1A5C5E] font-[family-name:var(--font-body)] text-xl font-semibold px-8 py-4 rounded-lg border-2 border-[#D1C9BD] hover:bg-[#FAF6F0] min-h-[56px] cursor-pointer transition-colors duration-150"
          >
            {isReading ? 'Stop Reading' : 'Read This Answer Aloud'}
          </button>
        )}
        <button
          onClick={handlePrint}
          className="flex-1 bg-transparent text-[#1A5C5E] font-[family-name:var(--font-body)] text-xl font-semibold px-8 py-4 rounded-lg border-2 border-[#D1C9BD] hover:bg-[#FAF6F0] min-h-[56px] cursor-pointer transition-colors duration-150"
        >
          Print This Answer
        </button>
      </div>
    </div>
  );
}
