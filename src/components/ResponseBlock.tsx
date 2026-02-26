'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ResponseBlock as ResponseBlockType } from '@/types';
import { preprocessCitationMarkers } from '@/lib/citations';
import CitationRef from './CitationRef';
import CitationModal from './CitationModal';

interface ResponseBlockProps {
  block: ResponseBlockType;
  isChild: boolean;
  onExplainMore: () => void;
  isLoading: boolean;
  isReading: boolean;
  onReadAloud: () => void;
  speechSupported: boolean;
}

export default function ResponseBlock({
  block,
  isChild,
  onExplainMore,
  isLoading,
  isReading,
  onReadAloud,
  speechSupported,
}: ResponseBlockProps) {
  const [activeCitation, setActiveCitation] = useState<{ number: number; url: string } | null>(null);
  const processedContent = preprocessCitationMarkers(block.content, block.citations.length);

  return (
    <div className="mt-6" style={{ animation: 'fadeInUp 0.4s ease-out' }}>
      {block.type !== 'initial' && (
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-[#D1C9BD]" />
          {isChild && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A5C5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          )}
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
              a: ({ href, children }) => {
                if (href && href.startsWith('citation:')) {
                  const citationNum = parseInt(href.replace('citation:', ''), 10);
                  const citationUrl = block.citations[citationNum - 1];
                  if (citationUrl) {
                    return (
                      <CitationRef
                        number={citationNum}
                        url={citationUrl}
                        onOpen={() => setActiveCitation({ number: citationNum, url: citationUrl })}
                      />
                    );
                  }
                  return <span>{children}</span>;
                }
                return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
              },
            }}
          >
            {processedContent}
          </ReactMarkdown>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-3 print:hidden">
        {speechSupported && (
          <button
            onClick={onReadAloud}
            aria-label={isReading ? 'Stop reading this section' : 'Read this section aloud'}
            className={`flex items-center gap-1.5 font-[family-name:var(--font-body)] text-base font-medium px-3 py-2 rounded-lg min-h-[40px] cursor-pointer transition-colors duration-150 ${
              isReading
                ? 'text-[#C45D3E] hover:bg-[rgba(196,93,62,0.08)]'
                : 'text-[#1A5C5E] hover:bg-[rgba(26,92,94,0.08)]'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {isReading ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </>
              )}
            </svg>
            <span>{isReading ? 'Stop' : 'Read Aloud'}</span>
          </button>
        )}
        {speechSupported && <div className="w-px h-5 bg-[#D1C9BD]" aria-hidden="true" />}
        <button
          onClick={onExplainMore}
          disabled={isLoading}
          aria-label="Explain this section in more detail"
          className="flex items-center gap-1.5 text-[#1A5C5E] font-[family-name:var(--font-body)] text-base font-medium px-3 py-2 rounded-lg hover:bg-[rgba(26,92,94,0.08)] min-h-[40px] cursor-pointer transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
          </svg>
          <span>{isLoading ? 'Loading...' : 'Explain More'}</span>
        </button>
      </div>

      {activeCitation && (
        <CitationModal
          citationNumber={activeCitation.number}
          url={activeCitation.url}
          onClose={() => setActiveCitation(null)}
        />
      )}
    </div>
  );
}
