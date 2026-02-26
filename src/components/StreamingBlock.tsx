'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface StreamingBlockProps {
  heading: string;
  content: string;
  isLoading: boolean;
}

export default function StreamingBlock({ heading, content, isLoading }: StreamingBlockProps) {
  return (
    <div className="mt-6" style={{ animation: 'fadeInUp 0.4s ease-out' }} aria-live="polite">
      {heading && (
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-[#D1C9BD]" />
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[#1A5C5E] shrink-0">
            {heading}
          </h3>
          <div className="h-px flex-1 bg-[#D1C9BD]" />
        </div>
      )}

      <div className="bg-white border-2 border-[#D1C9BD] border-l-4 border-l-[#1A5C5E] rounded-xl px-6 py-6">
        <div className="max-w-none font-[family-name:var(--font-body)] text-[#2D2D2D] [&_h2]:font-[family-name:var(--font-heading)] [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#0E3B3D] [&_h2]:mt-6 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-3 [&_li]:text-lg [&_li]:leading-relaxed [&_p]:text-lg [&_p]:leading-relaxed [&_p]:my-3 [&_a]:text-[#4A7FA5] [&_a]:underline [&_strong]:text-[#2D2D2D] [&_strong]:font-semibold">
          {content && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>

        {isLoading && (
          <div className="flex items-center gap-2 mt-4">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ animation: 'pulse-teal 1.2s ease-in-out infinite' }} />
              <span className="w-2 h-2 rounded-full" style={{ animation: 'pulse-teal 1.2s ease-in-out 0.2s infinite' }} />
              <span className="w-2 h-2 rounded-full" style={{ animation: 'pulse-teal 1.2s ease-in-out 0.4s infinite' }} />
            </div>
            <span className="font-[family-name:var(--font-body)] text-base text-[#5C5C5C]">
              Still writing...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
