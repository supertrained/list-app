export default function DisclaimerBanner() {
  return (
    <div className="mt-16 mb-4 bg-[#FAF6F0] border border-[#D1C9BD] rounded-lg px-6 py-4 print:hidden">
      <p className="font-[family-name:var(--font-body)] text-sm text-[#5C5C5C] leading-relaxed text-center">
        <strong className="text-[#0E3B3D]">Please note:</strong>{' '}
        L.I.S.T. provides general information to help you understand government
        services. It does not replace official advice. L.I.S.T. does not provide
        medical, legal, or financial advice.
      </p>
    </div>
  );
}
