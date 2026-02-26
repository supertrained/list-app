import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use — L.I.S.T.',
};

export default function TermsPage() {
  return (
    <div className="max-w-[700px]">
      <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#0E3B3D] mb-6">
        Terms of Use
      </h2>

      <div className="space-y-6 font-[family-name:var(--font-body)] text-xl text-[#2D2D2D] leading-relaxed">
        <p>
          These terms explain what you can expect from L.I.S.T. and how the
          service works. We have written them in plain English so they are easy
          to understand.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#0E3B3D] mt-8">
          What L.I.S.T. is
        </h3>
        <p>
          L.I.S.T. (Life in Simple Terms) is an information service that helps
          you understand Australian government services and everyday life admin.
          It searches for up-to-date information and gives you answers in plain
          English.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#0E3B3D] mt-8">
          Information only — not advice
        </h3>
        <p>
          The answers L.I.S.T. provides are <strong>general information
          only</strong>. They are not a substitute for official government
          advice, medical advice, legal advice, or financial advice.
        </p>
        <p>
          Government rules, payment amounts, and eligibility requirements
          change regularly. Always check the official government website or
          contact the relevant service to confirm details before making
          decisions.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#0E3B3D] mt-8">
          No guarantee of accuracy
        </h3>
        <p>
          While we do our best to provide accurate and current information,
          L.I.S.T. cannot guarantee that every answer is correct or complete.
          If you notice something that seems wrong, we encourage you to check
          with the relevant government service directly.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#0E3B3D] mt-8">
          Your privacy
        </h3>
        <p>
          We do not collect personal information, create user accounts, or
          store your questions after your session ends. For full details, please
          read our <a href="/privacy" className="text-[#4A7FA5] underline hover:text-[#1A5C5E]">Privacy page</a>.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#0E3B3D] mt-8">
          Intellectual property
        </h3>
        <p>
          L.I.S.T. is built and owned by SuperTrained.ai. The name, design,
          and content of this service are protected. You are welcome to use
          L.I.S.T. for your personal information needs.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#0E3B3D] mt-8">
          Governing law
        </h3>
        <p>
          These terms are governed by the laws of Australia. If you have any
          concerns or questions about these terms, please contact us.
        </p>

        <div className="bg-white border-2 border-[#D1C9BD] border-l-4 border-l-[#C8922A] rounded-xl px-6 py-4 mt-8">
          <p className="font-[family-name:var(--font-body)] text-lg text-[#5C5C5C]">
            <strong>Last updated:</strong> February 2026
          </p>
        </div>
      </div>
    </div>
  );
}
