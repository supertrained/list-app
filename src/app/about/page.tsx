import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — L.I.S.T.',
};

export default function AboutPage() {
  return (
    <div className="max-w-[700px]">
      <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">
        About L.I.S.T.
      </h2>

      <div className="space-y-6 text-xl text-[#1a1a2e] leading-relaxed">
        <p>
          <strong>L.I.S.T.</strong> stands for <strong>Life in Simple Terms</strong>.
        </p>

        <p>
          We help Australians get clear, simple answers to questions about
          government services and everyday life admin — things like pensions,
          Medicare, MyGov, aged care, and more.
        </p>

        <h3 className="text-2xl font-semibold text-[#14507e] mt-8">
          Who is L.I.S.T. for?
        </h3>
        <p>
          L.I.S.T. is designed for anyone who finds government websites
          confusing or overwhelming. You do not need to be a computer expert to
          use it. Just type your question in your own words, and we will find
          you a clear answer.
        </p>

        <h3 className="text-2xl font-semibold text-[#14507e] mt-8">
          How does it work?
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>You type a question about a government service or life admin topic</li>
          <li>We search for the most up-to-date, official information</li>
          <li>We give you a clear, plain-English answer with step-by-step guidance</li>
          <li>We include links and phone numbers so you know exactly what to do next</li>
        </ul>

        <h3 className="text-2xl font-semibold text-[#14507e] mt-8">
          Our promise to you
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>No jargon</strong> — we explain things in everyday language</li>
          <li><strong>No tracking</strong> — we do not follow you around the internet</li>
          <li><strong>No ads</strong> — we will never show you advertisements</li>
          <li><strong>No data selling</strong> — your questions are yours alone</li>
        </ul>

        <div className="bg-white border-2 border-[#d0d0cc] rounded-lg px-6 py-4 mt-8">
          <p className="text-lg text-[#4a4a5a]">
            <strong>Please note:</strong> L.I.S.T. provides general information
            to help you understand government services. It does not replace
            official advice. For decisions about your personal situation, please
            contact the relevant government service directly.
          </p>
        </div>
      </div>
    </div>
  );
}
