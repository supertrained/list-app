import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — L.I.S.T.',
};

export default function AboutPage() {
  return (
    <div className="max-w-[700px]">
      <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#0E3B3D] mb-6">
        About L.I.S.T.
      </h2>

      <div className="space-y-6 font-[family-name:var(--font-body)] text-xl text-[#2D2D2D] leading-relaxed">
        <p>
          <strong>L.I.S.T.</strong> stands for <strong>Life in Simple Terms</strong>.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#0E3B3D] mt-8">
          Our vision
        </h3>
        <p>
          To be Australia&apos;s most trusted and privacy-focused digital guide,
          empowering people over 50 to confidently navigate online information
          and government services — without needing to ask for help.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#0E3B3D] mt-8">
          Why L.I.S.T. exists
        </h3>
        <p>
          Government websites are confusing. Jargon is everywhere. Important
          information is buried under layers of menus and technical language.
          You shouldn&apos;t need a computer expert just to understand your own
          entitlements.
        </p>
        <p>
          L.I.S.T. was created so you can get clear, honest answers in your own
          words — and feel confident doing it yourself. No more asking your kids.
          No more feeling lost on a government website. Just calm, simple help
          when you need it.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#0E3B3D] mt-8">
          Who is L.I.S.T. for?
        </h3>
        <p>
          L.I.S.T. is for anyone who has ever thought:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>&ldquo;I just want it in plain English&rdquo;</li>
          <li>&ldquo;I hate those confusing government websites&rdquo;</li>
          <li>&ldquo;I don&apos;t want to be tracked or followed by ads&rdquo;</li>
          <li>&ldquo;I always feel like I&apos;ll click the wrong thing&rdquo;</li>
        </ul>
        <p>
          Whether you are managing your pension, sorting out Medicare, lodging a
          tax return, navigating aged care for a loved one, or just trying to
          understand any Australian government service — L.I.S.T. is here to make
          it simple.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#0E3B3D] mt-8">
          How does it work?
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>You type a question about a government service or life admin topic</li>
          <li>We search the most up-to-date official information available</li>
          <li>We give you a clear, plain-English answer with step-by-step guidance</li>
          <li>We include links and phone numbers so you know exactly what to do next</li>
        </ul>

        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#0E3B3D] mt-8">
          Our promise to you
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>No jargon</strong> — we explain things in everyday language</li>
          <li><strong>No tracking</strong> — we do not follow you around the internet</li>
          <li><strong>No ads</strong> — we will never show you advertisements</li>
          <li><strong>No data selling</strong> — your questions are yours alone</li>
        </ul>

        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#0E3B3D] mt-8">
          What L.I.S.T. is NOT
        </h3>
        <p>
          L.I.S.T. helps you understand information, but it is not a substitute
          for professional advice. Specifically:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>L.I.S.T. is <strong>not medical advice</strong> — always speak to your doctor about health decisions</li>
          <li>L.I.S.T. is <strong>not legal advice</strong> — contact a lawyer or legal aid service for legal matters</li>
          <li>L.I.S.T. is <strong>not financial advice</strong> — speak to a qualified financial adviser about your finances</li>
          <li>L.I.S.T. is <strong>not a government service</strong> — always confirm details with the relevant government department</li>
        </ul>

        <div className="bg-white border-2 border-[#D1C9BD] border-l-4 border-l-[#C8922A] rounded-xl px-6 py-4 mt-8">
          <p className="font-[family-name:var(--font-body)] text-lg text-[#5C5C5C]">
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
