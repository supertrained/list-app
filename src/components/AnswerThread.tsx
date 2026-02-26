'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { ResponseBlock as ResponseBlockType } from '@/types';
import { stripMarkdown, findInsertIndex } from '@/lib/utils';
import ResponseBlock from './ResponseBlock';
import StreamingBlock from './StreamingBlock';
import LoadingState from './LoadingState';
import FollowUpInput from './FollowUpInput';

interface AnswerThreadProps {
  thread: ResponseBlockType[];
  streamingContent: string;
  streamingHeading: string;
  streamingParentId?: string;
  isLoading: boolean;
  activeBlockType: ResponseBlockType['type'] | null;
  onExplainMore: (blockId: string) => void;
  onAskAnother: () => void;
  onFollowUp: (question: string) => void;
  onSave: () => void;
  isSaved: boolean;
}

export default function AnswerThread({
  thread,
  streamingContent,
  streamingHeading,
  streamingParentId,
  isLoading,
  activeBlockType,
  onExplainMore,
  onAskAnother,
  onFollowUp,
  onSave,
  isSaved,
}: AnswerThreadProps) {
  const [readingBlockId, setReadingBlockId] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const streamingTopRef = useRef<HTMLDivElement>(null);
  const hasScrolledForStream = useRef(false);

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

  // Reset scroll flag when streaming ends
  useEffect(() => {
    if (!streamingContent && !isLoading) {
      hasScrolledForStream.current = false;
    }
  }, [streamingContent, isLoading]);

  // Scroll to new section when follow-up/explain-more loading begins
  useEffect(() => {
    if ((isLoading || streamingContent) && !hasScrolledForStream.current && thread.length > 0) {
      hasScrolledForStream.current = true;
      streamingTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isLoading, streamingContent, thread.length]);

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

  // Calculate where the streaming block should be inserted
  const streamingInsertAfterIndex = isStreaming && streamingParentId
    ? findInsertIndex(thread, streamingParentId) - 1
    : null;

  const renderStreamingBlock = () => {
    const showInlineLoading = isLoading && !streamingContent && activeBlockType && activeBlockType !== 'initial';
    const variant = activeBlockType === 'follow-up' ? 'follow-up' : 'explain-more';

    return (
      <div ref={streamingTopRef}>
        {showInlineLoading ? (
          <div className="mt-6" style={{ animation: 'fadeInUp 0.4s ease-out' }}>
            {/* Vertical connector before loading state */}
            {streamingParentId && (
              <div className="flex justify-center my-1">
                <div className="w-px h-5 bg-[#1A5C5E] opacity-30" />
              </div>
            )}
            <LoadingState
              question={streamingHeading}
              variant={variant}
            />
          </div>
        ) : (
          <>
            {streamingParentId && (
              <div className="flex justify-center my-1">
                <div className="w-px h-5 bg-[#1A5C5E] opacity-30" />
              </div>
            )}
            <StreamingBlock
              heading={streamingHeading}
              content={streamingContent}
              isLoading={isLoading}
              isChild={!!streamingParentId}
            />
          </>
        )}
      </div>
    );
  };

  // Whether the streaming block goes at the end (no parent, like follow-ups or initial)
  const streamingAtEnd = isStreaming && streamingInsertAfterIndex === null;

  return (
    <div className="mt-8" style={{ animation: 'fadeInUp 0.4s ease-out' }}>
      {/* Completed response blocks with in-place streaming */}
      {thread.map((block, index) => (
        <React.Fragment key={block.id}>
          {/* Vertical connector before child blocks */}
          {block.parentId && (
            <div className="flex justify-center my-1">
              <div className="w-px h-5 bg-[#1A5C5E] opacity-30" />
            </div>
          )}

          <ResponseBlock
            block={block}
            isChild={!!block.parentId}
            onExplainMore={() => onExplainMore(block.id)}
            isLoading={isLoading}
            isReading={readingBlockId === block.id}
            onReadAloud={() => handleReadAloud(block.id, block.content)}
            speechSupported={speechSupported}
          />

          {/* Insert streaming block after parent's children */}
          {streamingInsertAfterIndex === index && renderStreamingBlock()}
        </React.Fragment>
      ))}

      {/* Streaming at end (follow-ups, initial responses) */}
      {streamingAtEnd && renderStreamingBlock()}

      {/* Follow-up input (shown when thread has content and not streaming) */}
      {thread.length > 0 && !isStreaming && (
        <FollowUpInput onSubmit={onFollowUp} isLoading={isLoading} />
      )}

      {/* Bottom action bar */}
      {thread.length > 0 && !isStreaming && (
        <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t-2 border-[#D1C9BD] print:hidden">
          {/* Utility actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrint}
              aria-label="Print this answer"
              title="Print this answer"
              className="flex items-center justify-center w-11 h-11 rounded-lg text-[#5C5C5C] hover:text-[#1A5C5E] hover:bg-[rgba(26,92,94,0.08)] cursor-pointer transition-colors duration-150"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
            </button>
            <button
              onClick={onSave}
              disabled={isSaved}
              aria-label={isSaved ? 'Answer saved' : 'Save this answer'}
              title={isSaved ? 'Answer saved' : 'Save this answer'}
              className={`flex items-center justify-center w-11 h-11 rounded-lg cursor-pointer transition-colors duration-150 ${
                isSaved
                  ? 'text-[#C8922A] cursor-default'
                  : 'text-[#5C5C5C] hover:text-[#1A5C5E] hover:bg-[rgba(26,92,94,0.08)]'
              } disabled:cursor-default`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>

          {/* Primary CTA */}
          <button
            onClick={onAskAnother}
            className="bg-[#D4A94E] text-[#0E3B3D] font-[family-name:var(--font-body)] text-lg font-semibold px-6 py-3 rounded-lg hover:bg-[#C8922A] min-h-[48px] cursor-pointer transition-colors duration-150"
          >
            Ask a Different Question
          </button>
        </div>
      )}
    </div>
  );
}
