import type { Metadata } from 'next';
import SavedList from './SavedList';

export const metadata: Metadata = {
  title: 'Saved Answers — L.I.S.T.',
};

export default function SavedPage() {
  return (
    <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#0E3B3D] mb-2">
        Your Saved Answers
      </h2>
      <p className="font-[family-name:var(--font-body)] text-lg text-[#5C5C5C] mb-8">
        Tap any answer to read it again, or ask follow-up questions.
      </p>
      <SavedList />
    </div>
  );
}
