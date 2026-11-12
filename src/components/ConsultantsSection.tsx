import React, { useState } from 'react';
import { ShieldCheck, Calendar, ArrowRight, Award, GraduationCap } from 'lucide-react';
import { CONSULTANTS } from '../data/legalData';
import { LegalConsultant } from '../types';
import { ConsultantDetailModal } from './ConsultantDetailModal';

interface ConsultantsSectionProps {
  onOpenBookingForConsultant: (consultantId: string) => void;
}

export const ConsultantsSection: React.FC<ConsultantsSectionProps> = ({
  onOpenBookingForConsultant,
}) => {
  const [selectedConsultant, setSelectedConsultant] = useState<LegalConsultant | null>(null);

  return (
    <section id="consultants" className="py-20 lg:py-28 bg-[#F8F6F1] text-[#17243A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#C3A36B] font-semibold">
            Advisory Partners & Legal Consultants
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#17243A]">
            Meet the Professionals Behind Your Legal Guidance.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
            Every client matter is directed exclusively by seasoned practitioners with verified bar admissions, top-tier legal qualifications, and extensive transaction records.
          </p>
        </div>

        {/* Editorial Profile Layout (2x2 Grid with Rich Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {CONSULTANTS.map((consultant) => (
            <div
              key={consultant.id}
              className="bg-white rounded-xl border border-[#E9E3D9] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Top Info Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-[#E9E3D9]">
                  <img
                    src={consultant.portraitUrl}
                    alt={consultant.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-[#C3A36B]/40 shrink-0 shadow-xs"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('1794339703301')) {
                        target.src = '/src/assets/images/legal_consultant_portrait_1794339703301.jpg';
                      }
                    }}
                  />
                  <div className="space-y-1">
                    <div className="text-[11px] uppercase tracking-wider text-[#C3A36B] font-semibold">
                      {consultant.designation}
                    </div>
                    <h3 className="text-2xl font-serif text-[#17243A] font-semibold">
                      {consultant.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">{consultant.roleTitle}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                      <GraduationCap className="w-3.5 h-3.5 text-[#C3A36B]" />
                      <span>{consultant.almaMater}</span>
                    </div>
                  </div>
                </div>

                {/* Bio Excerpt */}
                <p className="py-4 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {consultant.bio}
                </p>

                {/* Verified Credentials Box */}
                <div className="p-3 bg-[#F8F6F1] rounded border border-[#E9E3D9] space-y-1.5 text-xs text-[#17243A] mb-4">
                  <div className="flex items-center gap-1.5 text-[#17243A] font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C3A36B]" />
                    <span>Bar Admission: {consultant.barAdmissions[0]}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 pl-5">
                    {consultant.experienceYears}+ years verified practice · {consultant.mattersAdvised} matters advised
                  </div>
                </div>

                {/* Practice Areas */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {consultant.practiceAreas.slice(0, 3).map((area, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 bg-[#E9E3D9]/60 text-slate-800 rounded font-normal"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-[#E9E3D9] flex items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="text-slate-500">Consultation: </span>
                  <span className="font-semibold text-[#17243A] font-serif">{consultant.consultationFee.split('/')[0]}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedConsultant(consultant)}
                    className="px-3 py-1.5 text-xs text-slate-700 hover:text-[#17243A] hover:bg-[#E9E3D9]/50 rounded transition-colors"
                  >
                    View Credentials
                  </button>
                  <button
                    onClick={() => onOpenBookingForConsultant(consultant.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#17243A] hover:bg-[#202F46] text-white text-xs font-semibold rounded transition-colors"
                  >
                    <Calendar className="w-3 h-3 text-[#C3A36B]" />
                    <span>Consult</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consultant Detail Modal */}
      <ConsultantDetailModal
        consultant={selectedConsultant}
        onClose={() => setSelectedConsultant(null)}
        onBookWithConsultant={(id) => {
          setSelectedConsultant(null);
          onOpenBookingForConsultant(id);
        }}
      />
    </section>
  );
};
