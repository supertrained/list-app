interface ErrorMessageProps {
  onRetry: () => void;
}

export default function ErrorMessage({ onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-white border-2 border-[#C45D3E] border-l-4 border-l-[#C45D3E] rounded-xl px-6 py-6 text-center mt-8">
      <p className="font-[family-name:var(--font-heading)] text-xl text-[#0E3B3D] mb-2 font-semibold">
        Sorry, we could not find an answer right now.
      </p>
      <p className="font-[family-name:var(--font-body)] text-lg text-[#5C5C5C] mb-6">
        Please try again in a moment, or call Services Australia on <strong>132 300</strong> for help.
      </p>
      <button
        onClick={onRetry}
        className="inline-block bg-[#C8922A] text-[#0E3B3D] font-[family-name:var(--font-body)] text-xl font-semibold px-8 py-4 rounded-lg hover:bg-[#A67720] min-h-[56px] cursor-pointer transition-colors duration-150"
      >
        Try Again
      </button>
    </div>
  );
}
