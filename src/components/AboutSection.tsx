import React from 'react';
import { Shield, Target, Lock, Award, ArrowRight } from 'lucide-react';
import { FIRM_DETAILS } from '../data/legalData';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onNavigateToTeam: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenBooking,
  onNavigateToTeam,
}) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F8F6F1] text-[#17243A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Documentary Photography */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-lg overflow-hidden border border-[#E9E3D9] shadow-xl bg-white">
                <img
                  src="/src/assets/images/legal_about_consultation_1794339703172.jpg"
                  alt="Senior legal advisors reviewing strategic corporate agreements in private conference"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] sm:h-[500px] object-cover"
                />
              </div>

              {/* Subdued Editorial Statement Block */}
              <div className="mt-4 p-5 bg-white border border-[#E9E3D9] rounded-lg shadow-xs">
                <div className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold">
                  Our Founding Principle
                </div>
                <p className="mt-1 font-serif text-lg text-[#17243A] italic">
                  &ldquo;A legal agreement should serve as an instrument of business growth and risk immunity, not an insurmountable barrier to progress.&rdquo;
                </p>
                <div className="mt-2 text-xs text-slate-500">
                  — Arthur Vance, Senior Founding Partner
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C3A36B] font-semibold">
              About Aegis & Vance Legal Advisory
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#17243A] leading-tight text-balance">
              Legal Expertise Built Around Your Interests.
            </h2>

            <p className="text-base sm:text-lg text-[#30343B] leading-relaxed">
              Founded in {FIRM_DETAILS.establishedYear}, Aegis & Vance was created to bridge a critical divide in legal services: between rigid, slow-moving institutional law factories and modern agile enterprises requiring decisive, business-literate counsel.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We specialize in corporate governance, commercial transactions, real estate lease defense, and regulatory risk containment. Our consultants are seasoned attorneys and industry advisors who treat client objectives as our primary mandate—protecting balance sheets, defending intellectual assets, and negotiating without unnecessary friction.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white border border-[#E9E3D9] rounded-lg">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#17243A]">
                  <Lock className="w-4 h-4 text-[#C3A36B]" />
                  <span>Uncompromising Confidentiality</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Every advisory engagement is sheltered under strict professional confidentiality, backed by military-grade digital security protocols.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E9E3D9] rounded-lg">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#17243A]">
                  <Target className="w-4 h-4 text-[#C3A36B]" />
                  <span>Pragmatic Business Solutions</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  We avoid academic over-lawyering. We draft clear fallback redlines and actionable negotiation playbooks designed to close deals.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E9E3D9] rounded-lg">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#17243A]">
                  <Shield className="w-4 h-4 text-[#C3A36B]" />
                  <span>Transparent Fee Governance</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Clear fixed-milestone pricing and pre-approved retainers. You will never encounter unexpected ancillary billing or phantom hours.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E9E3D9] rounded-lg">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#17243A]">
                  <Award className="w-4 h-4 text-[#C3A36B]" />
                  <span>Verified Senior Credentials</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  All matters are directed exclusively by senior practitioners with verified bar admissions, top-tier law degrees, and over a decade of practice.
                </p>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#17243A] hover:bg-[#202F46] text-white text-xs font-semibold tracking-wider uppercase rounded transition-colors shadow-sm"
              >
                <span>Schedule Confidential Briefing</span>
                <ArrowRight className="w-4 h-4 text-[#C3A36B]" />
              </button>

              <button
                onClick={onNavigateToTeam}
                className="text-xs font-semibold text-[#17243A] hover:text-[#C3A36B] py-3 px-2 underline underline-offset-4 transition-colors"
              >
                Meet Our Advisory Partners &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
