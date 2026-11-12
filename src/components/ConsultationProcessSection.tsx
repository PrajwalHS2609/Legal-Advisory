import React from 'react';
import { Calendar, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { CONSULTATION_PROCESS_STEPS } from '../data/legalData';

interface ConsultationProcessSectionProps {
  onOpenBooking: () => void;
}

export const ConsultationProcessSection: React.FC<ConsultationProcessSectionProps> = ({
  onOpenBooking,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-[#F8F6F1] text-[#17243A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#C3A36B] font-semibold">
            The Advisory Journey
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#17243A]">
            A Transparent, Rigorous Consultation Process.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
            Working with legal counsel should never be ambiguous or stressful. From initial confidential intake to final execution, every phase is structured for predictable timelines and clear deliverables.
          </p>
        </div>

        {/* Numbered Editorial Timeline (Allowed by §1.B - human editorial numbering) */}
        <div className="space-y-6">
          {CONSULTATION_PROCESS_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-white p-6 sm:p-8 rounded-xl border border-[#E9E3D9] shadow-xs hover:border-[#C3A36B]/60 transition-colors grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
            >
              {/* Step Index & Title */}
              <div className="md:col-span-4 space-y-1">
                <div className="font-serif text-3xl sm:text-4xl text-[#C3A36B] font-bold">
                  {step.stepNumber}.
                </div>
                <h3 className="text-xl font-serif text-[#17243A] font-semibold">
                  {step.title}
                </h3>
                <div className="text-xs text-slate-500 font-medium">{step.tagline}</div>
              </div>

              {/* Description */}
              <div className="md:col-span-5 space-y-2">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#C3A36B]" />
                  <span>Timeline: {step.duration}</span>
                </div>
              </div>

              {/* Client Action Requirement */}
              <div className="md:col-span-3 bg-[#F8F6F1] p-4 rounded-lg border border-[#E9E3D9] text-xs space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-[#C3A36B] font-semibold">
                  Client Action
                </div>
                <p className="text-slate-700 leading-normal">
                  {step.clientAction}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="mt-12 p-8 bg-[#17243A] text-white rounded-xl border border-[#202F46] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl font-serif text-white">
              Ready to Discuss Your Legal Requirements?
            </h3>
            <p className="text-xs sm:text-sm text-[#E9E3D9]">
              Schedule an initial consultation with our senior advisory team. Zero obligation prior to formal engagement letter.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] text-xs font-semibold uppercase tracking-wider rounded transition-colors whitespace-nowrap shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>Start Your Consultation</span>
          </button>
        </div>
      </div>
    </section>
  );
};
