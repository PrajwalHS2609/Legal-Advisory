import React from 'react';
import { ArrowRight, ShieldCheck, Calendar, Calculator, CheckCircle2 } from 'lucide-react';
import { FIRM_DETAILS } from '../data/legalData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
  onOpenFeeEstimator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onExploreServices,
  onOpenFeeEstimator,
}) => {
  return (
    <section className="relative bg-[#17243A] text-white overflow-hidden border-b border-[#202F46]">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C3A36B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Subtle editorial kicker (unboxed, no pill badges) */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C3A36B] font-medium">
              <span className="w-6 h-px bg-[#C3A36B]" />
              <span>Independent Corporate & Legal Counsel</span>
            </div>

            {/* Oversized Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal leading-[1.12] tracking-tight text-white text-balance">
              Trusted Legal Guidance. <br />
              <span className="italic font-light text-[#D8B980]">Clear Strategies.</span> <br />
              Confident Decisions.
            </h1>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-[#E9E3D9] max-w-2xl leading-relaxed font-light">
              Professional legal consultancy and advisory services designed to help individuals, founders, and corporate enterprises navigate complex legal frameworks with absolute clarity, discretion, and strategic rigor.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] text-sm font-semibold rounded tracking-wide uppercase transition-all duration-150 shadow-md whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Consultation</span>
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#C3A36B]/60 hover:border-[#C3A36B] hover:bg-[#202F46]/80 text-[#F8F6F1] text-sm font-medium rounded transition-all duration-150 whitespace-nowrap"
              >
                <span>Explore Practice Areas</span>
                <ArrowRight className="w-4 h-4 text-[#C3A36B]" />
              </button>

              <button
                onClick={onOpenFeeEstimator}
                className="inline-flex items-center gap-2 text-xs text-[#C3A36B] hover:text-[#D8B980] py-2 px-1 underline underline-offset-4 transition-colors"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Transparent Fee & Scope Estimator</span>
              </button>
            </div>

            {/* Trust Markers (Unboxed inline text with separators) */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#E9E3D9]/80 font-light border-t border-[#202F46]/80">
              <span className="flex items-center gap-1.5 text-white font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C3A36B]" />
                Direct Senior Partner Access
              </span>
              <span aria-hidden="true" className="text-[#C3A36B]">·</span>
              <span>Strict Attorney-Client Confidentiality</span>
              <span aria-hidden="true" className="text-[#C3A36B]">·</span>
              <span>Transparent Fixed-Fee Schedules</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with Architectural Precision */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#C3A36B]/30 shadow-2xl bg-[#202F46]">
              {/* Actual Generated Image with fallback */}
              <img
                src="/src/assets/images/legal_hero_office_1794339701100.jpg"
                alt="Aegis & Vance executive legal consultancy conference room overlooking modern metropolitan skyline"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[440px] object-cover"
                onError={(e) => {
                  // Fallback styling if image fails
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
              {/* Subdued Bottom Scrim for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#17243A] via-[#17243A]/20 to-transparent pointer-events-none" />

              {/* Discreet Floating Card for Quick Credentials */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-[#17243A]/90 backdrop-blur-md border border-[#202F46] text-xs text-[#E9E3D9] flex items-center justify-between">
                <div>
                  <div className="font-serif text-sm font-semibold text-white">Advisory Headquarters</div>
                  <div className="text-[11px] text-slate-300">450 Lexington Ave, Suite 2800 · NYC</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-medium flex items-center justify-end gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C3A36B]" />
                    <span>Admitted Counsel</span>
                  </div>
                  <div className="text-[10px] text-slate-400">NY Bar & Federal Jurisdictions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Metric Full-Width Row Strip Below Hero Split */}
        <div className="mt-16 pt-8 border-t border-[#202F46] grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-[#C3A36B] tabular-nums font-semibold">
              {FIRM_DETAILS.yearsOfExperience}
            </div>
            <div className="text-xs uppercase tracking-wider text-slate-300 mt-1">Advisory Track Record</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Continuous corporate counsel since {FIRM_DETAILS.establishedYear}</p>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-serif text-[#C3A36B] tabular-nums font-semibold">
              {FIRM_DETAILS.mattersAdvised}
            </div>
            <div className="text-xs uppercase tracking-wider text-slate-300 mt-1">Matters Successfully Advised</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Commercial deals, leases & regulatory cases</p>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-serif text-[#C3A36B] tabular-nums font-semibold">
              {FIRM_DETAILS.clientSatisfaction}
            </div>
            <div className="text-xs uppercase tracking-wider text-slate-300 mt-1">Client Retention Rate</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Recurring outside counsel engagements</p>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-serif text-[#C3A36B] tabular-nums font-semibold">
              3 Desks
            </div>
            <div className="text-xs uppercase tracking-wider text-slate-300 mt-1">Global Presence</div>
            <p className="text-[11px] text-slate-400 mt-0.5">New York, London Liaison & Singapore</p>
          </div>
        </div>
      </div>
    </section>
  );
};
