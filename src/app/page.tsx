'use client';

import { useCompletion } from '@ai-sdk/react';
import { useState } from 'react';
import { APP_TAGLINE } from '@/lib/constants';
import QuestionInput from '@/components/QuestionInput';
import AnswerDisplay from '@/components/AnswerDisplay';
import LoadingState from '@/components/LoadingState';
import ExampleQuestions from '@/components/ExampleQuestions';
import ErrorMessage from '@/components/ErrorMessage';
import DisclaimerBanner from '@/components/DisclaimerBanner';

export default function Home() {
  const [question, setQuestion] = useState('');

  const {
    completion,
    isLoading,
    error,
    complete,
    setCompletion,
  } = useCompletion({
    api: '/api/ask',
    streamProtocol: 'text',
  });

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setCompletion('');
    await complete(question);
  };

  const handleExampleSelect = (text: string) => {
    setQuestion(text);
    setCompletion('');
    complete(text);
  };

  const handleReset = () => {
    setQuestion('');
    setCompletion('');
  };

  const showExamples = !completion && !isLoading && !error;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-6">
        {APP_TAGLINE}
      </h2>

      <DisclaimerBanner />

      <div className="print:hidden">
        <QuestionInput
          value={question}
          onChange={setQuestion}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>

      {isLoading && !completion && <LoadingState />}

      {error && !isLoading && (
        <ErrorMessage onRetry={handleReset} />
      )}

      {completion && (
        <AnswerDisplay answer={completion} onAskAnother={handleReset} />
      )}

      {showExamples && <ExampleQuestions onSelect={handleExampleSelect} />}
    </div>
  );
}
