const features = [
  { label: "Cold-Air Diffuser Technology", fragra: true, candle: false, spray: false },
  { label: "Safe for Kids and Pets", fragra: true, candle: false, spray: false },
  { label: "Clear, Consistent Scenting", fragra: true, candle: false, spray: false },
  { label: "No Residue or Buildup", fragra: true, candle: false, spray: false },
  { label: "Recyclable and open flame", fragra: false, candle: true, spray: false },
  { label: "Uses wax and residue", fragra: false, candle: true, spray: false },
  { label: "Scents quickly while extinguishing", fragra: false, candle: true, spray: false },
  { label: "Not ideal around kids or pets", fragra: false, candle: true, spray: true },
  { label: "Aerosol chemical releases", fragra: false, candle: false, spray: true },
  { label: "Short-term coverage", fragra: false, candle: false, spray: true },
  { label: "Frequent to spraying or refills", fragra: false, candle: false, spray: true },
];

function Check() {
  return (
    <div className="mx-auto w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Cross() {
  return (
    <div className="mx-auto w-6 h-6 rounded-full bg-[#F0D0C8] flex items-center justify-center flex-shrink-0">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <path d="M3 3l6 6M9 3l-6 6" stroke="#C0503A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function ComparisonTable() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-widest text-[#717171] uppercase mb-3">
            Not All Home Fragrance Is Equal
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] leading-snug">
            The Scenting System Designed<br className="hidden md:block" /> For Real Homes
          </h2>
          <p className="text-[#717171] text-sm mt-3 max-w-lg mx-auto leading-relaxed">
            Frägra home diffusers deliver effortlessly clean scent without open flames, wax mess, or harsh chemicals — refined for where you actually live.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#E5E1D8]">
          <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>

            {/* Column Headers */}
            <thead>
              <tr className="border-b border-[#E5E1D8]">
                <th className="text-left px-6 py-4 text-[#717171] font-normal w-1/2">Feature</th>

                {/* Frägra — highlighted */}
                <th className="px-4 py-4 w-1/6">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center mb-1">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.3">
                        <path d="M12 2C8 2 5 6 5 10c0 5 7 12 7 12s7-7 7-12c0-4-3-8-7-8z" />
                        <circle cx="12" cy="10" r="2.5" fill="white" stroke="none" />
                      </svg>
                    </div>
                    <span className="font-medium text-[#1A1A1A] text-xs">Frägra</span>
                    <span className="text-[10px] text-[#717171]">Diffuser</span>
                  </div>
                </th>

                {/* Candle */}
                <th className="px-4 py-4 w-1/6">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-xl bg-[#F3F0E9] flex items-center justify-center mb-1">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="1.3">
                        <rect x="7" y="10" width="10" height="12" rx="2" />
                        <path d="M12 10V6M10 6c0-2 4-2 4 0" strokeLinecap="round" />
                        <path d="M12 4.5c0 0 1.5-1.5 0-3-1.5 1.5 0 3 0 3z" fill="#717171" />
                      </svg>
                    </div>
                    <span className="font-medium text-[#717171] text-xs">Candle</span>
                    <span className="text-[10px] text-[#B4B2A9]">Wax & Flame</span>
                  </div>
                </th>

                {/* Spray */}
                <th className="px-4 py-4 w-1/6">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-xl bg-[#F3F0E9] flex items-center justify-center mb-1">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="1.3">
                        <rect x="8" y="8" width="8" height="14" rx="2" />
                        <path d="M11 8V5h2v3" />
                        <path d="M13 5c2-1 4 0 4 2" strokeLinecap="round" />
                        <path d="M17 7l2-1M17 9l2 1" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="font-medium text-[#717171] text-xs">Air Spray</span>
                    <span className="text-[10px] text-[#B4B2A9]">Aerosol</span>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {features.map((f, i) => (
                <tr
                  key={i}
                  className="border-b border-[#E5E1D8] last:border-0"
                  style={{ background: i % 2 === 0 ? "white" : "#FAFAF8" }}
                >
                  <td className="px-6 py-3.5 text-[#1A1A1A] text-sm">{f.label}</td>
                  <td className="px-4 py-3.5 text-center">
                    {f.fragra ? <Check /> : <Cross />}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {f.candle ? <Check /> : <Cross />}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {f.spray ? <Check /> : <Cross />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white text-sm font-medium px-8 py-3.5 rounded-full hover:bg-[#333] transition-colors"
          >
            Try Frägra Risk-Free
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H5M12 2v7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <p className="text-xs text-[#717171]">30-Day Money-Back Guarantee · Free Shipping</p>
        </div>

      </div>
    </section>
  );
}