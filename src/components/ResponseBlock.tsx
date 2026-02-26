'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ResponseBlock as ResponseBlockType } from '@/types';

interface ResponseBlockProps {
  block: ResponseBlockType;
  isLatest: boolean;
  onExplainMore: () => void;
  isLoading: boolean;
  isReading: boolean;
  onReadAloud: () => void;
  speechSupported: boolean;
}

export default function ResponseBlock({
  block,
  isLatest,
  onExplainMore,
  isLoading,
  isReading,
  onReadAloud,
  speechSupported,
}: ResponseBlockProps) {
  return (
    <div className="mt-6" style={{ animation: 'fadeInUp 0.4s ease-out' }}>
      {block.type !== 'initial' && (
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-[#D1C9BD]" />
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[#1A5C5E] shrink-0">
            {block.heading}
          </h3>
          <div className="h-px flex-1 bg-[#D1C9BD]" />
        </div>
      )}

      <div className="bg-white border-2 border-[#D1C9BD] border-l-4 border-l-[#1A5C5E] rounded-xl px-6 py-6 print:border-none print:p-0">
        <div className="max-w-none font-[family-name:var(--font-body)] text-[#2D2D2D] [&_h2]:font-[family-name:var(--font-heading)] [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#0E3B3D] [&_h2]:mt-6 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-3 [&_li]:text-lg [&_li]:leading-relaxed [&_p]:text-lg [&_p]:leading-relaxed [&_p]:my-3 [&_a]:text-[#4A7FA5] [&_a]:underline [&_strong]:text-[#2D2D2D] [&_strong]:font-semibold">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
              ),
            }}
          >
            {block.content}
          </ReactMarkdown>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-4 print:hidden">
        {speechSupported && (
          <button
            onClick={onReadAloud}
            className="flex-1 bg-transparent text-[#1A5C5E] font-[family-name:var(--font-body)] text-lg font-semibold px-6 py-3 rounded-lg border-2 border-[#D1C9BD] hover:bg-[#FAF6F0] min-h-[48px] cursor-pointer transition-colors duration-150"
          >
            {isReading ? 'Stop Reading' : 'Read This Section Aloud'}
          </button>
        )}
        {isLatest && (
          <button
            onClick={onExplainMore}
            disabled={isLoading}
            className="flex-1 bg-transparent text-[#1A5C5E] font-[family-name:var(--font-body)] text-lg font-semibold px-6 py-3 rounded-lg border-2 border-[#1A5C5E] hover:bg-[rgba(26,92,94,0.08)] min-h-[48px] cursor-pointer transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Getting more detail...' : 'Explain This in More Detail'}
          </button>
        )}
      </div>
    </div>
  );
}
