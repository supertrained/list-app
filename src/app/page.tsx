'use client';

import { useCompletion } from '@ai-sdk/react';
import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { APP_TAGLINE } from '@/lib/constants';
import { buildExplainMorePrompt, buildSpecificExplainPrompt, buildFollowUpPrompt } from '@/lib/prompts';
import { generateBlockId, findInsertIndex } from '@/lib/utils';
import { extractCitations } from '@/lib/citations';
import { getSavedResponseById, saveResponse, loadSavedResponses } from '@/lib/savedResponses';
import type { ResponseBlock } from '@/types';
import QuestionInput from '@/components/QuestionInput';
import AnswerThread from '@/components/AnswerThread';
import LoadingState from '@/components/LoadingState';
import ExampleQuestions from '@/components/ExampleQuestions';
import ErrorMessage from '@/components/ErrorMessage';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import ExplainMoreModal from '@/components/ExplainMoreModal';
import ResultsHeader from '@/components/ResultsHeader';

type AppPhase = 'idle' | 'loading' | 'results';

export default function Page() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}

function Home() {
  const [question, setQuestion] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState('');
  const [phase, setPhase] = useState<AppPhase>('idle');
  const [thread, setThread] = useState<ResponseBlock[]>([]);
  const [streamingHeading, setStreamingHeading] = useState('');
  const [showExplainModal, setShowExplainModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [explainMoreTargetId, setExplainMoreTargetId] = useState<string | null>(null);
  const activeBlockTypeRef = useRef<ResponseBlock['type'] | null>(null);
  const [activeBlockType, setActiveBlockType] = useState<ResponseBlock['type'] | null>(null);
  const activeBlockHeadingRef = useRef('');
  const activeBlockParentRef = useRef<string | undefined>(undefined);
  const resultsTopRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Derive streamingParentId from the ref for passing to AnswerThread
  const streamingParentId = activeBlockParentRef.current;

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
      const parentId = activeBlockParentRef.current;
      activeBlockTypeRef.current = null;
      setActiveBlockType(null);
      activeBlockHeadingRef.current = '';
      activeBlockParentRef.current = undefined;
      if (completionText) {
        const { cleanText, citations } = extractCitations(completionText);
        const newBlock: ResponseBlock = {
          id: generateBlockId(),
          type: blockType,
          heading: blockHeading,
          content: cleanText,
          citations,
          timestamp: Date.now(),
          parentId,
        };
        setThread(prev => {
          if (parentId) {
            const insertIdx = findInsertIndex(prev, parentId);
            return [...prev.slice(0, insertIdx), newBlock, ...prev.slice(insertIdx)];
          }
          return [...prev, newBlock];
        });
      }
      setExplainMoreTargetId(null);
      setStreamingHeading('');
      setCompletion('');
    },
  });

  // Transition: loading → results when first streamed token arrives
  useEffect(() => {
    if (phase === 'loading' && completion) {
      setPhase('results');
    }
  }, [phase, completion]);

  // Scroll to question card when initial response starts streaming
  useEffect(() => {
    if (phase === 'results' && thread.length === 0) {
      resultsTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [phase, thread.length]);

  // Transition: loading → idle on error before any tokens
  useEffect(() => {
    if (phase === 'loading' && error && !isLoading) {
      setPhase('idle');
    }
  }, [phase, error, isLoading]);

  // Load saved response from URL param
  useEffect(() => {
    const loadId = searchParams.get('load');
    if (!loadId) return;
    const saved = getSavedResponseById(loadId);
    if (saved) {
      setQuestion(saved.question);
      setSubmittedQuestion(saved.question);
      setThread([{
        id: generateBlockId(),
        type: 'initial',
        heading: 'Your Answer',
        content: saved.completion,
        citations: [],
        timestamp: Date.now(),
      }]);
      setIsSaved(true);
      setPhase('results');
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
    setSubmittedQuestion(question);
    setPhase('loading');
    setThread([]);
    setIsSaved(false);
    setCompletion('');
    activeBlockTypeRef.current = 'initial';
    setActiveBlockType('initial');
    activeBlockHeadingRef.current = 'Your Answer';
    activeBlockParentRef.current = undefined;
    setExplainMoreTargetId(null);
    setStreamingHeading('Your Answer');
    await complete(question, { body: { interactionType: 'initial' } });
  };

  const handleExampleSelect = (text: string) => {
    setQuestion(text);
    setSubmittedQuestion(text);
    setPhase('loading');
    setThread([]);
    setIsSaved(false);
    setCompletion('');
    activeBlockTypeRef.current = 'initial';
    setActiveBlockType('initial');
    activeBlockHeadingRef.current = 'Your Answer';
    activeBlockParentRef.current = undefined;
    setExplainMoreTargetId(null);
    setStreamingHeading('Your Answer');
    complete(text, { body: { interactionType: 'initial' } });
  };

  const handleReset = () => {
    setPhase('idle');
    setQuestion('');
    setSubmittedQuestion('');
    setCompletion('');
    setThread([]);
    activeBlockTypeRef.current = null;
    setActiveBlockType(null);
    activeBlockHeadingRef.current = '';
    activeBlockParentRef.current = undefined;
    setExplainMoreTargetId(null);
    setStreamingHeading('');
    setIsSaved(false);
    setTimeout(() => {
      const input = document.getElementById('question-input') as HTMLTextAreaElement | null;
      input?.focus();
    }, 400);
  };

  const handleExplainMoreClick = (blockId: string) => {
    setExplainMoreTargetId(blockId);
    setShowExplainModal(true);
  };

  const handleGeneralDeepDive = () => {
    setShowExplainModal(false);
    const targetBlock = thread.find(b => b.id === explainMoreTargetId);
    const targetContent = targetBlock?.content ?? '';
    const contextQuestion = targetBlock?.type === 'initial' ? question : targetBlock?.heading ?? question;
    activeBlockTypeRef.current = 'explain-more';
    setActiveBlockType('explain-more');
    activeBlockHeadingRef.current = 'Explained in More Detail';
    activeBlockParentRef.current = explainMoreTargetId ?? undefined;
    setStreamingHeading('Explained in More Detail');
    setCompletion('');
    complete(buildExplainMorePrompt(contextQuestion, targetContent), { body: { interactionType: 'explain-more' } });
  };

  const handleSpecificRequest = (instructions: string) => {
    setShowExplainModal(false);
    const targetBlock = thread.find(b => b.id === explainMoreTargetId);
    const targetContent = targetBlock?.content ?? '';
    const contextQuestion = targetBlock?.type === 'initial' ? question : targetBlock?.heading ?? question;
    activeBlockTypeRef.current = 'explain-more';
    setActiveBlockType('explain-more');
    activeBlockHeadingRef.current = instructions;
    activeBlockParentRef.current = explainMoreTargetId ?? undefined;
    setStreamingHeading(instructions);
    setCompletion('');
    complete(buildSpecificExplainPrompt(contextQuestion, targetContent, instructions), { body: { interactionType: 'explain-more' } });
  };

  const handleFollowUp = (followUpQuestion: string) => {
    const latestContent = thread[thread.length - 1]?.content ?? '';
    activeBlockTypeRef.current = 'follow-up';
    setActiveBlockType('follow-up');
    activeBlockHeadingRef.current = followUpQuestion;
    activeBlockParentRef.current = undefined;
    setStreamingHeading(followUpQuestion);
    setCompletion('');
    complete(buildFollowUpPrompt(question, latestContent, followUpQuestion), { body: { interactionType: 'follow-up' } });
  };

  const handleSave = () => {
    if (isSaved) return;
    const initialBlock = thread.find(b => b.type === 'initial');
    if (!initialBlock) return;
    saveResponse(question, initialBlock.content);
    setIsSaved(true);
  };

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

      {/* === PHASE-DRIVEN STAGE === */}

      {phase === 'idle' && (
        <div key="idle" className="print:hidden" style={{ animation: 'phaseEnter 0.4s ease-out' }}>
          <QuestionInput
            value={question}
            onChange={setQuestion}
            onSubmit={handleSubmit}
          />
          <ExampleQuestions onSelect={handleExampleSelect} />
        </div>
      )}

      {phase === 'loading' && (
        <div key="loading" className="print:hidden" style={{ animation: 'phaseEnter 0.5s ease-out' }}>
          <LoadingState question={submittedQuestion} />
        </div>
      )}

      {phase === 'results' && (
        <div key="results" style={{ animation: 'phaseEnter 0.4s ease-out' }}>
          <div ref={resultsTopRef}>
            <ResultsHeader question={submittedQuestion} />
          </div>
          <AnswerThread
            thread={thread}
            streamingContent={completion}
            streamingHeading={streamingHeading}
            streamingParentId={streamingParentId}
            isLoading={isLoading}
            activeBlockType={activeBlockType}
            onExplainMore={handleExplainMoreClick}
            onAskAnother={handleReset}
            onFollowUp={handleFollowUp}
            onSave={handleSave}
            isSaved={isSaved}
          />
        </div>
      )}

      {error && !isLoading && (
        <ErrorMessage onRetry={handleReset} />
      )}

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
