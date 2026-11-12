import React, { useState } from 'react';
import { ArrowRight, Building2, Briefcase, Cpu, ShoppingBag, ShieldCheck } from 'lucide-react';
import { INDUSTRY_SECTORS } from '../data/legalData';

interface IndustriesSectionProps {
  onOpenBooking: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onOpenBooking }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(INDUSTRY_SECTORS[0].id);

  const activeSector = INDUSTRY_SECTORS.find((s) => s.id === selectedIndustry) || INDUSTRY_SECTORS[0];

  return (
    <section id="industries" className="py-20 lg:py-28 bg-[#17243A] text-white border-t border-b border-[#202F46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#C3A36B] font-semibold">
            Industry Focus & Cross-Sector Experience
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
            Tailored Legal Counsel for Specialized Industries.
          </h2>
          <p className="text-sm sm:text-base text-[#E9E3D9] font-light leading-relaxed">
            Different sectors operate under vastly distinct regulatory pressures, procurement cycles, and contractual standards. We bring deep commercial literacy to each industry we advise.
          </p>
        </div>

        {/* Master-Detail Interactive Sector Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sector Buttons */}
          <div className="lg:col-span-5 space-y-2">
            {INDUSTRY_SECTORS.map((sector) => {
              const isActive = sector.id === selectedIndustry;
              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedIndustry(sector.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-150 flex items-center justify-between border ${
                    isActive
                      ? 'bg-[#202F46] border-[#C3A36B] text-white shadow-md'
                      : 'bg-[#1D2B42]/40 border-[#202F46] text-slate-300 hover:bg-[#202F46]/60 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="text-sm font-medium">{sector.name}</div>
                    <div className="text-[11px] text-[#C3A36B] font-mono mt-0.5">{sector.highlightMetric}</div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-[#C3A36B] translate-x-1' : 'text-slate-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Sector Panel */}
          <div className="lg:col-span-7 bg-[#202F46] p-6 sm:p-8 rounded-xl border border-[#C3A36B]/30 shadow-xl space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#C3A36B] font-semibold">
                Industry Practice Overview
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1">
                {activeSector.name}
              </h3>
              <p className="mt-3 text-sm text-[#E9E3D9] leading-relaxed">
                {activeSector.description}
              </p>
            </div>

            {/* Common Matters Advised */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-3">
                Frequent Legal Matters We Handle
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeSector.commonMatters.map((matter, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#17243A] rounded border border-[#202F46] flex items-center gap-2 text-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C3A36B] shrink-0" />
                    <span>{matter}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Representative Scenario / Engagement Record */}
            <div className="p-4 bg-[#0F172A] rounded-lg border border-[#202F46] space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Representative Advisory Engagement
              </div>
              <p className="text-xs sm:text-sm text-[#E9E3D9] italic">
                &ldquo;{activeSector.representativeCase}&rdquo;
              </p>
            </div>

            {/* Sector Call to Action */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#202F46]">
              <div className="text-xs text-slate-400">
                Discuss industry-specific regulations with our practice head.
              </div>
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
              >
                Discuss Your Industry Requirements
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
