import React, { useState } from 'react';
import { X, Calculator, Check, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface FeeEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToBooking: (scopeDetails: {
    serviceName: string;
    estimatedCost: string;
    turnaround: string;
    clientType: string;
  }) => void;
}

interface ServiceOption {
  id: string;
  name: string;
  baseFee: number;
  standardDays: string;
  description: string;
  includedItems: string[];
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'contract-review',
    name: 'Commercial Contract Redline & Negotiation Playbook',
    baseFee: 950,
    standardDays: '3–5 business days',
    description: 'Clause-by-clause markup of vendor, SaaS, or procurement agreement with liability limits and indemnities.',
    includedItems: ['Full redline in MS Word tracked changes', 'Written risk matrix highlighting top liabilities', 'Negotiation strategy call with lead partner'],
  },
  {
    id: 'corporate-structuring',
    name: 'Corporate Incorporation & Shareholder Governance Suite',
    baseFee: 1850,
    standardDays: '5–7 business days',
    description: 'Bespoke corporate charter, founder restriction and vesting agreements, and protective deadlock shareholder covenants.',
    includedItems: ['Custom Delaware/State bylaws and resolutions', 'Founder vesting contracts with Section 83(b) instructions', 'Shareholder voting and drag-along agreement'],
  },
  {
    id: 'lease-review',
    name: 'Commercial Real Estate Lease Audit & Guarantee Ring-Fencing',
    baseFee: 1650,
    standardDays: '5–8 business days',
    description: 'Thorough review of triple-net leases, CAM pass-through caps, and Good-Guy guarantee mitigation.',
    includedItems: ['Comprehensive lease audit memorandum', 'Tenant protection redline amendment', 'Landlord negotiation conference'],
  },
  {
    id: 'employment-suite',
    name: 'Executive Employment Package & Workplace Policy Suite',
    baseFee: 1200,
    standardDays: '4–6 business days',
    description: 'Multi-state executive employment contracts, PIIA trade secret covenants, and statutory employee handbook.',
    includedItems: ['Executive employment agreement', 'Proprietary Information & Inventions Agreement', 'Remote employee policy guidelines'],
  },
  {
    id: 'regulatory-audit',
    name: 'Regulatory Privacy & Compliance Risk Matrix (GDPR / CCPA)',
    baseFee: 2200,
    standardDays: '7–10 business days',
    description: 'Data mapping review, consumer privacy policy architecture, and cloud vendor data protection agreements.',
    includedItems: ['Statutory privacy audit matrix', 'Custom customer terms of service & privacy policy', 'Vendor Data Processing Agreement template'],
  },
  {
    id: 'dispute-notice',
    name: 'Commercial Dispute Legal Notice & Strategic Assessment',
    baseFee: 1500,
    standardDays: '2–4 business days',
    description: 'Pre-litigation case merit analysis, formal evidentiary demand notice, and pre-action settlement negotiation strategy.',
    includedItems: ['Case exposure and probability matrix', 'Formal statutory demand / notice letter', 'Counterparty pre-action response strategy'],
  },
];

export const FeeEstimatorModal: React.FC<FeeEstimatorModalProps> = ({
  isOpen,
  onClose,
  onProceedToBooking,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('contract-review');
  const [clientType, setClientType] = useState<'individual' | 'startup' | 'sme' | 'enterprise'>('sme');
  const [turnaroundTier, setTurnaroundTier] = useState<'standard' | 'expedited'>('standard');
  const [addons, setAddons] = useState<{
    counterpartyCall: boolean;
    multiJurisdiction: boolean;
    revisionSupport: boolean;
  }>({
    counterpartyCall: false,
    multiJurisdiction: false,
    revisionSupport: true,
  });

  if (!isOpen) return null;

  const currentService = SERVICE_OPTIONS.find((s) => s.id === selectedServiceId) || SERVICE_OPTIONS[0];

  // Calculation
  let total = currentService.baseFee;
  if (clientType === 'startup') total *= 0.95; // 5% startup discount
  if (clientType === 'enterprise') total *= 1.25; // enterprise complexity tier
  if (turnaroundTier === 'expedited') total += 450; // rush priority
  if (addons.counterpartyCall) total += 350;
  if (addons.multiJurisdiction) total += 450;
  if (addons.revisionSupport) total += 250;

  const formattedTotal = `$${Math.round(total).toLocaleString()}`;
  const turnaroundDisplay = turnaroundTier === 'expedited' ? '48 – 72 Hours (Expedited)' : currentService.standardDays;

  const handleProceed = () => {
    onProceedToBooking({
      serviceName: currentService.name,
      estimatedCost: formattedTotal,
      turnaround: turnaroundDisplay,
      clientType: clientType.toUpperCase(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#17243A] text-white w-full max-w-4xl rounded-xl shadow-2xl border border-[#202F46] overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-[#0F172A] border-b border-[#202F46] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#202F46] flex items-center justify-center text-[#C3A36B]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-white">
                Legal Scope & Transparent Fee Estimator
              </h2>
              <p className="text-xs text-[#E9E3D9]">
                Configure your matter requirements for an itemized advisory estimate.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-[#202F46] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[75vh] overflow-y-auto">
          {/* Left Column: Configuration Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Client Profile */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2">
                1. Client Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'individual', label: 'Private Individual' },
                  { id: 'startup', label: 'Startup / Founder' },
                  { id: 'sme', label: 'SME / Growing Co.' },
                  { id: 'enterprise', label: 'Corporate Org' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setClientType(tier.id as any)}
                    className={`p-2.5 rounded border text-left transition-colors ${
                      clientType === tier.id
                        ? 'border-[#C3A36B] bg-[#202F46] text-white font-medium'
                        : 'border-[#202F46] bg-[#0F172A] text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Service Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2">
                2. Legal Matter & Practice Area
              </label>
              <div className="space-y-2">
                {SERVICE_OPTIONS.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-colors flex items-start justify-between gap-3 ${
                      selectedServiceId === srv.id
                        ? 'border-[#C3A36B] bg-[#202F46] text-white shadow-xs'
                        : 'border-[#202F46] bg-[#0F172A] text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-white">{srv.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{srv.description}</div>
                    </div>
                    <span className="text-xs font-serif text-[#C3A36B] font-semibold whitespace-nowrap mt-0.5">
                      from ${srv.baseFee}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Turnaround Tier */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2">
                3. Delivery Timeline
              </label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  onClick={() => setTurnaroundTier('standard')}
                  className={`p-3 rounded border text-left ${
                    turnaroundTier === 'standard'
                      ? 'border-[#C3A36B] bg-[#202F46] text-white font-medium'
                      : 'border-[#202F46] bg-[#0F172A] text-slate-300'
                  }`}
                >
                  <div className="font-semibold text-white">Standard Advisory</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{currentService.standardDays}</div>
                  <div className="text-[10px] text-[#C3A36B] mt-1">Included in base fee</div>
                </button>

                <button
                  onClick={() => setTurnaroundTier('expedited')}
                  className={`p-3 rounded border text-left ${
                    turnaroundTier === 'expedited'
                      ? 'border-[#C3A36B] bg-[#202F46] text-white font-medium'
                      : 'border-[#202F46] bg-[#0F172A] text-slate-300'
                  }`}
                >
                  <div className="font-semibold text-white">Expedited 48h Desk</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Direct Partner Rush Processing</div>
                  <div className="text-[10px] text-[#C3A36B] mt-1">+ $450 flat fee</div>
                </button>
              </div>
            </div>

            {/* 4. Strategic Add-ons */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2">
                4. Optional Strategic Add-ons
              </label>
              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-2.5 rounded bg-[#0F172A] border border-[#202F46] cursor-pointer hover:border-slate-500">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={addons.counterpartyCall}
                      onChange={(e) => setAddons({ ...addons, counterpartyCall: e.target.checked })}
                      className="accent-[#C3A36B] rounded"
                    />
                    <span>Live negotiation attendance alongside your team (60 min)</span>
                  </div>
                  <span className="text-[#C3A36B] font-medium">+$350</span>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded bg-[#0F172A] border border-[#202F46] cursor-pointer hover:border-slate-500">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={addons.multiJurisdiction}
                      onChange={(e) => setAddons({ ...addons, multiJurisdiction: e.target.checked })}
                      className="accent-[#C3A36B] rounded"
                    />
                    <span>Multi-jurisdiction cross-border harmonization rider</span>
                  </div>
                  <span className="text-[#C3A36B] font-medium">+$450</span>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded bg-[#0F172A] border border-[#202F46] cursor-pointer hover:border-slate-500">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={addons.revisionSupport}
                      onChange={(e) => setAddons({ ...addons, revisionSupport: e.target.checked })}
                      className="accent-[#C3A36B] rounded"
                    />
                    <span>30-Day post-drafting counterparty redline round</span>
                  </div>
                  <span className="text-[#C3A36B] font-medium">+$250</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Estimate Summary */}
          <div className="lg:col-span-5 bg-[#0F172A] p-6 rounded-xl border border-[#C3A36B]/30 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold border-b border-[#202F46] pb-2">
                Scope & Investment Summary
              </div>

              <div>
                <div className="text-xs text-slate-400">Selected Scope</div>
                <div className="text-base font-serif text-white font-medium mt-0.5">
                  {currentService.name}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-slate-400">Turnaround</div>
                  <div className="text-white font-medium flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#C3A36B]" />
                    <span>{turnaroundDisplay}</span>
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Client Profile</div>
                  <div className="text-white font-medium capitalize mt-0.5">{clientType} Tier</div>
                </div>
              </div>

              {/* Deliverables Included */}
              <div className="pt-2">
                <div className="text-xs text-slate-400 mb-2">Core Deliverables Included:</div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {currentService.includedItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C3A36B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="pt-4 border-t border-[#202F46]">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">Estimated Total Investment:</span>
                  <span className="text-3xl font-serif text-[#C3A36B] font-semibold">
                    {formattedTotal}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Fixed transparent fee. Written Scope of Engagement issued prior to commencement.
                </p>
              </div>
            </div>

            <div className="pt-6 space-y-2">
              <button
                onClick={handleProceed}
                className="w-full py-3 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Book Consultation with this Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[10px] text-center text-slate-500">
                Submitting creates an advisory reservation. No charges until engagement letter signed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
