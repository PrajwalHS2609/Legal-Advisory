import React from 'react';
import { X, ShieldAlert, CheckCircle2, Scale } from 'lucide-react';
import { FIRM_DETAILS } from '../data/legalData';

export type LegalNoticeType = 'disclaimer' | 'privacy' | 'terms';

interface LegalNoticeModalProps {
  isOpen: boolean;
  type: LegalNoticeType;
  onClose: () => void;
}

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({
  isOpen,
  type,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#17243A] text-white w-full max-w-3xl rounded-xl shadow-2xl border border-[#202F46] overflow-hidden my-8">
        <div className="p-6 bg-[#0F172A] border-b border-[#202F46] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-[#C3A36B]" />
            <h2 className="text-xl font-serif text-white">
              {type === 'disclaimer' && 'Professional Legal Notice & Regulatory Disclaimer'}
              {type === 'privacy' && 'Client Privacy & Data Confidentiality Policy'}
              {type === 'terms' && 'Consultancy Terms of Engagement & Website Conditions'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-[#202F46] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          {type === 'disclaimer' && (
            <>
              <div className="p-4 bg-[#202F46]/60 rounded-lg border border-[#C3A36B]/40 space-y-2">
                <div className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#C3A36B]" />
                  <span>No Attorney-Client Relationship Created by Website Inquiries</span>
                </div>
                <p className="text-xs text-[#E9E3D9]">
                  Transmitting information to {FIRM_DETAILS.name} via this website, electronic mail, or enquiry submission forms does not create an attorney-client relationship. An attorney-client relationship is formally established only after our firm conducts a mandatory conflict-of-interest review and both parties mutually execute a written Scope of Engagement agreement.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-base text-white font-semibold mb-2">
                  1. Information, Not Formal Legal Advice
                </h3>
                <p>
                  The legal summaries, knowledge hub articles, checklists, and fee estimators presented on this site are published exclusively for general educational, strategic briefing, and commercial awareness purposes. They do not constitute formal legal counsel tailored to your specific corporate structure, facts, or local jurisdiction.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-base text-white font-semibold mb-2">
                  2. Jurisdictional Admissions & Bar Compliance
                </h3>
                <p>
                  Our legal advisors and partners are admitted to practice in specific jurisdictions as identified on their verified professional credentials (including the New York State Bar, federal district courts, England & Wales solicitor rolls, and the Bar Council of India). Where legal services require physical in-state trial advocacy or local statutory licensing outside our direct admissions, we coordinate with accredited local co-counsel pursuant to applicable professional conduct regulations.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-base text-white font-semibold mb-2">
                  3. No Guarantee of Legal Outcomes
                </h3>
                <p>
                  Prior advisory results, case studies, and client testimonials do not guarantee or predict identical outcomes in separate legal matters. Every commercial transaction, contract redline, and dispute rests upon its specific evidentiary records and commercial negotiations.
                </p>
              </div>
            </>
          )}

          {type === 'privacy' && (
            <>
              <div>
                <h3 className="font-serif text-base text-white font-semibold mb-2">
                  Client Confidentiality & Data Protection Standard
                </h3>
                <p>
                  {FIRM_DETAILS.name} enforces strict confidentiality policies across all client interactions. We treat all preliminary consultation information with the same rigorous duty of discretion that governs formal attorney-client privileged materials.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-base text-white font-semibold mb-2">
                  Information Collection & Storage
                </h3>
                <p>
                  We collect only contact details and high-level matter descriptions necessary to perform conflicts checks and coordinate scheduled consultation sessions. We do not sell, license, or disclose client communication records to third-party marketing brokers.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-base text-white font-semibold mb-2">
                  Digital Security & Document Handling
                </h3>
                <p>
                  Draft contracts, corporate documents, and client records are stored in encrypted cloud repositories compliant with ISO 27001 and SOC2 Type II security baselines. Access is strictly restricted to designated lead advisory partners.
                </p>
              </div>
            </>
          )}

          {type === 'terms' && (
            <>
              <div>
                <h3 className="font-serif text-base text-white font-semibold mb-2">
                  Website Terms of Use
                </h3>
                <p>
                  By accessing and browsing the {FIRM_DETAILS.name} website, you agree to comply with these terms. All editorial briefings, contract frameworks, calculators, and brand elements are protected under intellectual property and copyright statutes.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-base text-white font-semibold mb-2">
                  Scope of Engagement Letters
                </h3>
                <p>
                  All paid advisory services, contract drafting projects, and corporate governance reviews are governed by individual, countersigned Scope of Engagement letters detailing fixed fees, milestone timelines, deliverables, and limitation of liability provisions.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="p-5 bg-[#0F172A] border-t border-[#202F46] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] font-semibold text-xs rounded transition-colors uppercase tracking-wider"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
