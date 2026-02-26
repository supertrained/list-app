'use client';

import { useState, useEffect, useRef } from 'react';
import type { ResponseBlock as ResponseBlockType } from '@/types';
import { stripMarkdown } from '@/lib/utils';
import ResponseBlock from './ResponseBlock';
import StreamingBlock from './StreamingBlock';
import FollowUpInput from './FollowUpInput';

interface AnswerThreadProps {
  thread: ResponseBlockType[];
  streamingContent: string;
  streamingHeading: string;
  isLoading: boolean;
  onExplainMore: () => void;
  onAskAnother: () => void;
  onFollowUp: (question: string) => void;
  onSave: () => void;
  isSaved: boolean;
}

export default function AnswerThread({
  thread,
  streamingContent,
  streamingHeading,
  isLoading,
  onExplainMore,
  onAskAnother,
  onFollowUp,
  onSave,
  isSaved,
}: AnswerThreadProps) {
  const [readingBlockId, setReadingBlockId] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevThreadLength = useRef(thread.length);

  useEffect(() => {
    setSpeechSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  // Cancel speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Auto-scroll when new blocks are added to the thread
  useEffect(() => {
    if (thread.length > prevThreadLength.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    prevThreadLength.current = thread.length;
  }, [thread.length]);

  // Also scroll when streaming starts
  useEffect(() => {
    if (streamingContent && streamingContent.length < 50) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [streamingContent]);

  const handleReadAloud = (blockId: string, content: string) => {
    if (!speechSupported) return;

    if (readingBlockId === blockId) {
      window.speechSynthesis.cancel();
      setReadingBlockId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const plainText = stripMarkdown(content);
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = 'en-AU';
    utterance.rate = 0.9;
    utterance.onend = () => setReadingBlockId(null);
    utterance.onerror = () => setReadingBlockId(null);
    window.speechSynthesis.speak(utterance);
    setReadingBlockId(blockId);
  };

  const handlePrint = () => {
    window.print();
  };

  const isStreaming = isLoading || !!streamingContent;

  return (
    <div className="mt-8" style={{ animation: 'fadeInUp 0.4s ease-out' }}>
      {/* Completed response blocks */}
      {thread.map((block, index) => (
        <ResponseBlock
          key={block.id}
          block={block}
          isLatest={index === thread.length - 1 && !isStreaming}
          onExplainMore={onExplainMore}
          isLoading={isLoading}
          isReading={readingBlockId === block.id}
          onReadAloud={() => handleReadAloud(block.id, block.content)}
          speechSupported={speechSupported}
        />
      ))}

      {/* Currently streaming block */}
      {isStreaming && (
        <StreamingBlock
          heading={streamingHeading}
          content={streamingContent}
          isLoading={isLoading}
        />
      )}

      {/* Scroll anchor */}
      <div ref={bottomRef} />

      {/* Follow-up input (shown when thread has content and not streaming) */}
      {thread.length > 0 && !isStreaming && (
        <FollowUpInput onSubmit={onFollowUp} isLoading={isLoading} />
      )}

      {/* Bottom action bar */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 print:hidden">
        <button
          onClick={onAskAnother}
          className="flex-1 bg-[#C8922A] text-[#0E3B3D] font-[family-name:var(--font-body)] text-xl font-semibold px-8 py-4 rounded-lg hover:bg-[#A67720] min-h-[56px] cursor-pointer transition-colors duration-150"
        >
          Ask Another Question
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex-1 bg-transparent text-[#1A5C5E] font-[family-name:var(--font-body)] text-xl font-semibold px-8 py-4 rounded-lg border-2 border-[#D1C9BD] hover:bg-[#FAF6F0] min-h-[56px] cursor-pointer transition-colors duration-150"
        >
          Print This Answer
        </button>
        <button
          onClick={onSave}
          disabled={isSaved}
          className="flex-1 bg-transparent text-[#1A5C5E] font-[family-name:var(--font-body)] text-xl font-semibold px-8 py-4 rounded-lg border-2 border-[#D1C9BD] hover:bg-[#FAF6F0] min-h-[56px] cursor-pointer transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSaved ? 'Response Saved' : 'Save This Answer'}
        </button>
      </div>
    </div>
  );
}
