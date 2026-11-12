import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { CASE_STUDIES } from '../data/legalData';
import { CaseStudy } from '../types';

interface CaseStudiesSectionProps {
  onOpenBooking: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenBooking }) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy>(CASE_STUDIES[0]);

  return (
    <section className="py-20 lg:py-28 bg-[#F8F6F1] text-[#17243A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#C3A36B] font-semibold">
            Illustrative Engagements & Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#17243A]">
            Strategic Legal Outcomes Built on Analytical Rigor.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
            Illustrative scenarios demonstrating how our senior advisors dismantle complex corporate challenges, negotiate favorable commercial terms, and protect enterprise balance sheets.
          </p>
        </div>

        {/* Asymmetric Case Study Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Case Navigation Tabs */}
          <div className="lg:col-span-4 space-y-3">
            {CASE_STUDIES.map((study) => {
              const isSelected = study.id === selectedCase.id;
              return (
                <button
                  key={study.id}
                  onClick={() => setSelectedCase(study)}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-white border-[#C3A36B] shadow-md'
                      : 'bg-[#E9E3D9]/40 border-transparent hover:bg-white/80 text-slate-700'
                  }`}
                >
                  <div className="text-[11px] uppercase tracking-wider text-[#C3A36B] font-semibold">
                    {study.sector}
                  </div>
                  <h3 className="text-sm sm:text-base font-serif font-semibold text-[#17243A] mt-1 line-clamp-2">
                    {study.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-2 flex items-center justify-between">
                    <span>Resolution: {study.timeframe}</span>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-[#C3A36B]' : 'text-slate-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Deep-Dive Case Study Content Card */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-xl border border-[#E9E3D9] shadow-sm space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#C3A36B] font-semibold">
                Sector: {selectedCase.sector} · Timeline: {selectedCase.timeframe}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#17243A] mt-1 leading-snug">
                {selectedCase.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Client Profile: {selectedCase.clientProfile}
              </p>
            </div>

            {/* The Legal Challenge */}
            <div className="p-4 bg-[#F8F6F1] rounded-lg border border-[#E9E3D9] space-y-1">
              <div className="text-xs uppercase tracking-wider text-rose-800 font-semibold">
                The Core Legal Challenge
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedCase.legalChallenge}
              </p>
            </div>

            {/* Consultancy Approach */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2">
                Strategic Consultancy Approach
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedCase.consultancyApproach}
              </p>
            </div>

            {/* Scope of Work */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#17243A] font-semibold mb-3">
                Scope of Work Executed
              </h4>
              <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                {selectedCase.scopeOfWork.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C3A36B] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Outcome */}
            <div className="p-4 bg-[#17243A] text-white rounded-lg border border-[#202F46] space-y-1">
              <div className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold">
                Advisory Outcome Achieved
              </div>
              <p className="text-xs sm:text-sm text-[#E9E3D9] leading-relaxed">
                {selectedCase.outcome}
              </p>
            </div>

            {/* Strict Confidentiality Disclaimer Note */}
            <p className="text-[11px] text-slate-400 italic pt-2 border-t border-[#E9E3D9]">
              {selectedCase.disclaimer}
            </p>

            <div className="flex justify-end pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#17243A] hover:bg-[#202F46] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
              >
                <span>Discuss a Similar Matter</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C3A36B]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
