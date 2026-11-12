import React, { useState } from 'react';
import { FileCheck, ShieldAlert, ArrowRight, CheckCircle, FileText, Download } from 'lucide-react';

interface DocumentationHubSectionProps {
  onOpenBooking: () => void;
}

export const DocumentationHubSection: React.FC<DocumentationHubSectionProps> = ({
  onOpenBooking,
}) => {
  const [selectedDocCategory, setSelectedDocCategory] = useState<string>('contracts');

  const docCategories = [
    {
      id: 'contracts',
      name: 'Commercial Contracts & MSAs',
      description: 'Master Services Agreements (MSAs), Statements of Work (SOW), SaaS terms, partnership compacts, and mutual non-disclosure agreements.',
      turnaround: '3 – 5 days',
      format: 'Clean Word .docx with tracked changes & signed PDF execution versions',
      items: [
        'Master Services Agreement (MSA) with balanced liability caps',
        'Software-as-a-Service (SaaS) Terms of Service & SLA',
        'Vendor Procurement & Independent Contractor Agreement',
        'Mutual Non-Disclosure Agreement (NDA) with trade secret protections',
      ],
    },
    {
      id: 'corporate',
      name: 'Corporate Charters & Shareholder Pacts',
      description: 'Formation documentation, customized corporate bylaws, founder restricted stock purchase agreements, and shareholder voting compacts.',
      turnaround: '5 – 7 days',
      format: 'Corporate Governance Folio & Board Resolution Minutes',
      items: [
        'Articles of Incorporation & Corporate Bylaws',
        'Shareholder Agreement with Drag-Along & Tag-Along covenants',
        'Founder Vesting Agreement with Section 83(b) instructions',
        'Board of Directors Written Consent & Capitalization Ledger',
      ],
    },
    {
      id: 'workplace',
      name: 'Executive Employment & Policies',
      description: 'Protecting company proprietary code, confidential client rosters, and structuring statutory multi-state workplace conduct manuals.',
      turnaround: '4 – 6 days',
      format: 'Executive Offer Instrument & Comprehensive Handbook',
      items: [
        'Executive Employment Agreement with severance triggers',
        'Proprietary Information & Inventions Agreement (PIIA)',
        'Statutory Multi-State Remote Workplace Conduct Handbook',
        'Mutual Separation and ADEA-Compliant Release Agreement',
      ],
    },
    {
      id: 'notices',
      name: 'Legal Notices & Statutory Demands',
      description: 'Formal pre-litigation notices, default declarations, breach cure warnings, and formal demand letters drafted with evidentiary precision.',
      turnaround: '2 – 3 days (Expedited available)',
      format: 'Statutory Notice Letter with formal reservation of rights',
      items: [
        'Formal Demand for Overdue Commercial Payment',
        'Notice of Material Contractual Breach & Right to Cure',
        'Cease-and-Desist Letter for Intellectual Property Infringement',
        'Pre-Action Dispute Mediation Notice',
      ],
    },
  ];

  const currentCategory = docCategories.find((d) => d.id === selectedDocCategory) || docCategories[0];

  return (
    <section className="py-20 lg:py-28 bg-[#17243A] text-white border-b border-[#202F46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#C3A36B] font-semibold">
            Drafting, Review & Execution Governance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
            Precision Legal Documentation & Drafting.
          </h2>
          <p className="text-sm sm:text-base text-[#E9E3D9] font-light leading-relaxed">
            Every instrument is drafted from first principles to reflect your exact operational requirements. We avoid generic boilerplate, engineering clauses that protect balance sheets and withstand adverse scrutiny.
          </p>
        </div>

        {/* Essential Legal Notice / Distinction Banner */}
        <div className="mb-12 p-5 bg-[#0F172A] border border-[#C3A36B]/40 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-[#E9E3D9]">
          <div className="p-2 rounded-lg bg-[#202F46] text-[#C3A36B] shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[#C3A36B] font-semibold uppercase tracking-wider block">
              Professional Distinction: Substantive Drafting vs Administrative Notarisation
            </span>
            <p className="text-slate-300 leading-relaxed">
              Our consultancy provides substantive legal drafting, risk analysis, clause negotiation, and execution protocols. Substantive drafting is distinct from public notarisation, statutory registry stamping, or court filing. Following draft completion, we supply explicit execution instructions for local notarisation or statutory filing where required.
            </p>
          </div>
        </div>

        {/* Interactive Category Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-2">
            {docCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedDocCategory(cat.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedDocCategory === cat.id
                    ? 'bg-[#202F46] border-[#C3A36B] text-white shadow-md'
                    : 'bg-[#1D2B42]/50 border-[#202F46] text-slate-300 hover:text-white hover:bg-[#202F46]/60'
                }`}
              >
                <div className="text-sm font-semibold">{cat.name}</div>
                <div className="text-xs text-[#C3A36B] mt-1 font-mono">Turnaround: {cat.turnaround}</div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 bg-[#202F46] p-6 sm:p-8 rounded-xl border border-[#202F46] space-y-6">
            <div>
              <div className="text-xs text-[#C3A36B] uppercase tracking-wider font-semibold">
                Drafting & Review Scope
              </div>
              <h3 className="text-2xl font-serif text-white mt-1">
                {currentCategory.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#E9E3D9] mt-2 leading-relaxed">
                {currentCategory.description}
              </p>
            </div>

            {/* Included Instruments */}
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                Instruments Prepared in this Category
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {currentCategory.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#17243A] rounded border border-[#202F46] flex items-start gap-2 text-slate-200"
                  >
                    <CheckCircle className="w-4 h-4 text-[#C3A36B] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Specifications */}
            <div className="p-4 bg-[#0F172A] rounded-lg border border-[#202F46] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-400">Deliverable Format: </span>
                <span className="text-white font-medium">{currentCategory.format}</span>
              </div>
              <div className="text-[#C3A36B] font-mono">
                {currentCategory.turnaround} Turnaround
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
              >
                Enquire About Documentation Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
