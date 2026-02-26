interface ErrorMessageProps {
  onRetry: () => void;
}

export default function ErrorMessage({ onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-white border-2 border-[#c53030] rounded-lg px-6 py-6 text-center mt-8">
      <p className="text-xl text-[#1a1a2e] mb-2">
        Sorry, we could not find an answer right now.
      </p>
      <p className="text-lg text-[#4a4a5a] mb-6">
        Please try again in a moment, or call Services Australia on <strong>132 300</strong> for help.
      </p>
      <button
        onClick={onRetry}
        className="inline-block bg-[#0d7a4f] text-white text-xl font-bold px-8 py-4 rounded-lg hover:bg-[#095e3c] min-h-[56px] cursor-pointer transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
