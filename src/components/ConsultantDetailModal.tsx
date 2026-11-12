import React from 'react';
import { X, Calendar, Award, BookOpen, Globe, CheckCircle2, Shield, MapPin } from 'lucide-react';
import { LegalConsultant } from '../types';

interface ConsultantDetailModalProps {
  consultant: LegalConsultant | null;
  onClose: () => void;
  onBookWithConsultant: (consultantId: string) => void;
}

export const ConsultantDetailModal: React.FC<ConsultantDetailModalProps> = ({
  consultant,
  onClose,
  onBookWithConsultant,
}) => {
  if (!consultant) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#17243A] text-white w-full max-w-3xl rounded-xl shadow-2xl border border-[#202F46] overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-[#0F172A] border-b border-[#202F46] flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={consultant.portraitUrl}
              alt={consultant.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#C3A36B]/50 shrink-0"
            />
            <div>
              <div className="text-xs uppercase tracking-widest text-[#C3A36B] font-semibold">
                {consultant.designation}
              </div>
              <h2 className="text-2xl font-serif text-white">{consultant.name}</h2>
              <div className="text-xs text-slate-300 mt-0.5">{consultant.roleTitle}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-[#202F46] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#202F46]/60 rounded-lg border border-[#202F46] text-xs">
            <div>
              <div className="text-slate-400">Experience</div>
              <div className="text-base font-serif text-[#C3A36B] font-semibold">{consultant.experienceYears}+ Years</div>
            </div>
            <div>
              <div className="text-slate-400">Matters Advised</div>
              <div className="text-base font-serif text-white font-semibold">{consultant.mattersAdvised}</div>
            </div>
            <div>
              <div className="text-slate-400">Consultation Session</div>
              <div className="text-sm font-medium text-[#C3A36B]">{consultant.consultationFee.split('/')[0]}</div>
            </div>
            <div>
              <div className="text-slate-400">Advisory Desk</div>
              <div className="text-xs font-medium text-white truncate">{consultant.officeLocation}</div>
            </div>
          </div>

          {/* Biography */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2">
              Professional Biography
            </h3>
            <p className="text-sm text-[#E9E3D9] leading-relaxed">
              {consultant.bio}
            </p>
          </div>

          {/* Bar Admissions & Credentials */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#C3A36B]" />
              <span>Verified Bar Admissions & Professional Registrations</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {consultant.barAdmissions.map((bar, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C3A36B] shrink-0" />
                  <span>{bar}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Education & Qualifications */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#C3A36B]" />
              <span>Academic Credentials & Law Degrees</span>
            </h3>
            <div className="space-y-1 text-xs text-slate-300">
              {consultant.qualifications.map((qual, idx) => (
                <div key={idx} className="p-2 bg-[#0F172A] rounded border border-[#202F46]">
                  {qual}
                </div>
              ))}
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2">
              Core Practice Focus
            </h3>
            <div className="flex flex-wrap gap-2">
              {consultant.practiceAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 bg-[#202F46] text-[#E9E3D9] rounded border border-[#C3A36B]/20"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Languages & Office */}
          <div className="pt-2 border-t border-[#202F46] flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#C3A36B]" />
              <span>Languages: {consultant.languages.join(', ')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C3A36B]" />
              <span>{consultant.officeLocation}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-[#0F172A] border-t border-[#202F46] flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBookWithConsultant(consultant.id);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Consultation with {consultant.name.split(',')[0]}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
