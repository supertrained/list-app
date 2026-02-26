'use client';

import { useCompletion } from '@ai-sdk/react';
import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { APP_TAGLINE } from '@/lib/constants';
import { buildExplainMorePrompt, buildSpecificExplainPrompt, buildFollowUpPrompt } from '@/lib/prompts';
import { generateBlockId } from '@/lib/utils';
import { getSavedResponseById, saveResponse, loadSavedResponses } from '@/lib/savedResponses';
import type { ResponseBlock } from '@/types';
import QuestionInput from '@/components/QuestionInput';
import AnswerThread from '@/components/AnswerThread';
import LoadingState from '@/components/LoadingState';
import ExampleQuestions from '@/components/ExampleQuestions';
import ErrorMessage from '@/components/ErrorMessage';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import ExplainMoreModal from '@/components/ExplainMoreModal';

export default function Page() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}

function Home() {
  const [question, setQuestion] = useState('');
  const [thread, setThread] = useState<ResponseBlock[]>([]);
  const [streamingHeading, setStreamingHeading] = useState('');
  const [showExplainModal, setShowExplainModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const activeBlockTypeRef = useRef<ResponseBlock['type'] | null>(null);
  const activeBlockHeadingRef = useRef('');
  const questionSectionRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    completion,
    isLoading,
    error,
    complete,
    setCompletion,
  } = useCompletion({
    api: '/api/ask',
    streamProtocol: 'text',
    onFinish: (_prompt, completionText) => {
      const blockType = activeBlockTypeRef.current ?? 'initial';
      const blockHeading = activeBlockHeadingRef.current || 'Your Answer';
      activeBlockTypeRef.current = null;
      activeBlockHeadingRef.current = '';
      if (completionText) {
        setThread(prev => [...prev, {
          id: generateBlockId(),
          type: blockType,
          heading: blockHeading,
          content: completionText,
          timestamp: Date.now(),
        }]);
      }
      setStreamingHeading('');
      setCompletion('');
    },
  });

  // Load saved response from URL param
  useEffect(() => {
    const loadId = searchParams.get('load');
    if (!loadId) return;
    const saved = getSavedResponseById(loadId);
    if (saved) {
      setQuestion(saved.question);
      setThread([{
        id: generateBlockId(),
        type: 'initial',
        heading: 'Your Answer',
        content: saved.completion,
        timestamp: Date.now(),
      }]);
      setIsSaved(true);
    }
    router.replace('/', { scroll: false });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Check if initial answer is already saved
  useEffect(() => {
    if (thread.length === 0) {
      setIsSaved(false);
      return;
    }
    const initialBlock = thread.find(b => b.type === 'initial');
    if (!initialBlock) return;
    const existing = loadSavedResponses();
    setIsSaved(existing.some((r) => r.question === question && r.completion === initialBlock.content));
  }, [thread, question]);

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setThread([]);
    setIsSaved(false);
    setCompletion('');
    activeBlockTypeRef.current = 'initial';
    activeBlockHeadingRef.current = 'Your Answer';
    setStreamingHeading('Your Answer');
    await complete(question);
  };

  const handleExampleSelect = (text: string) => {
    setQuestion(text);
    setThread([]);
    setIsSaved(false);
    setCompletion('');
    activeBlockTypeRef.current = 'initial';
    activeBlockHeadingRef.current = 'Your Answer';
    setStreamingHeading('Your Answer');
    complete(text);
  };

  const handleReset = () => {
    questionSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => {
      setQuestion('');
      setCompletion('');
      setThread([]);
      activeBlockTypeRef.current = null;
      activeBlockHeadingRef.current = '';
      setStreamingHeading('');
      setIsSaved(false);
      const input = document.getElementById('question-input') as HTMLTextAreaElement | null;
      input?.focus();
    }, 500);
  };

  const handleExplainMoreClick = () => {
    setShowExplainModal(true);
  };

  const handleGeneralDeepDive = () => {
    setShowExplainModal(false);
    const latestContent = thread[thread.length - 1]?.content ?? '';
    activeBlockTypeRef.current = 'explain-more';
    activeBlockHeadingRef.current = 'Explained in More Detail';
    setStreamingHeading('Explained in More Detail');
    setCompletion('');
    complete(buildExplainMorePrompt(question, latestContent));
  };

  const handleSpecificRequest = (instructions: string) => {
    setShowExplainModal(false);
    const latestContent = thread[thread.length - 1]?.content ?? '';
    activeBlockTypeRef.current = 'explain-more';
    activeBlockHeadingRef.current = instructions;
    setStreamingHeading(instructions);
    setCompletion('');
    complete(buildSpecificExplainPrompt(question, latestContent, instructions));
  };

  const handleFollowUp = (followUpQuestion: string) => {
    const latestContent = thread[thread.length - 1]?.content ?? '';
    activeBlockTypeRef.current = 'follow-up';
    activeBlockHeadingRef.current = followUpQuestion;
    setStreamingHeading(followUpQuestion);
    setCompletion('');
    complete(buildFollowUpPrompt(question, latestContent, followUpQuestion));
  };

  const handleSave = () => {
    if (isSaved) return;
    const initialBlock = thread.find(b => b.type === 'initial');
    if (!initialBlock) return;
    saveResponse(question, initialBlock.content);
    setIsSaved(true);
  };

  const hasContent = thread.length > 0 || !!completion;
  const showExamples = !hasContent && !isLoading && !error;

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
      <section className="text-center mb-12 pt-4">
        <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold text-[#0E3B3D] leading-tight tracking-tight mb-3">
          {APP_TAGLINE}
        </h2>
        <p className="font-[family-name:var(--font-body)] text-lg text-[#5C5C5C]">
          No jargon. No tracking. Just plain-English help.
        </p>
      </section>

      <div ref={questionSectionRef} className="print:hidden">
        <QuestionInput
          value={question}
          onChange={setQuestion}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>

      {isLoading && !completion && thread.length === 0 && <LoadingState />}

      {error && !isLoading && (
        <ErrorMessage onRetry={handleReset} />
      )}

      {hasContent && (
        <AnswerThread
          thread={thread}
          streamingContent={completion}
          streamingHeading={streamingHeading}
          isLoading={isLoading}
          onExplainMore={handleExplainMoreClick}
          onAskAnother={handleReset}
          onFollowUp={handleFollowUp}
          onSave={handleSave}
          isSaved={isSaved}
        />
      )}

      {showExamples && <ExampleQuestions onSelect={handleExampleSelect} />}

      <DisclaimerBanner />

      <ExplainMoreModal
        isOpen={showExplainModal}
        onClose={() => setShowExplainModal(false)}
        onGeneralDeepDive={handleGeneralDeepDive}
        onSpecificRequest={handleSpecificRequest}
      />
    </div>
  );
}
