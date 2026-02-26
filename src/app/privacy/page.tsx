import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy — L.I.S.T.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-[700px]">
      <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">
        Your Privacy
      </h2>

      <div className="space-y-6 text-xl text-[#1a1a2e] leading-relaxed">
        <p>
          L.I.S.T. is built with your privacy as a top priority. Here is
          exactly what we do — and what we do not do — with your information.
        </p>

        <h3 className="text-2xl font-semibold text-[#14507e] mt-8">
          What we do NOT do
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>No tracking</strong> — we do not use cookies, tracking pixels, or analytics tools to follow your activity</li>
          <li><strong>No advertising</strong> — we will never show you ads or share your information with advertisers</li>
          <li><strong>No profiling</strong> — we do not build a profile about you or your interests</li>
          <li><strong>No data selling</strong> — we will never sell or share your personal information</li>
        </ul>

        <h3 className="text-2xl font-semibold text-[#14507e] mt-8">
          How your questions are handled
        </h3>
        <p>
          When you ask a question, it is sent to a search service to find the
          most relevant and up-to-date information. Your question is used only
          to find your answer — nothing more.
        </p>
        <p>
          We do not store your questions after your session ends. Once you close
          the page, your questions are gone.
        </p>

        <h3 className="text-2xl font-semibold text-[#14507e] mt-8">
          Important information
        </h3>
        <p>
          To find answers to your questions, we use a third-party search
          service. This means your question text is sent to servers that may be
          located outside Australia for processing. No personal account
          information is sent — only the text of your question.
        </p>

        <h3 className="text-2xl font-semibold text-[#14507e] mt-8">
          Questions or concerns?
        </h3>
        <p>
          If you have any questions about how we handle your information,
          please do not hesitate to reach out. Your trust is the most important
          thing to us.
        </p>

        <div className="bg-white border-2 border-[#d0d0cc] rounded-lg px-6 py-4 mt-8">
          <p className="text-lg text-[#4a4a5a]">
            This privacy information was last updated in February 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
