import React from 'react';
import { X, CheckCircle2, FileText, Clock, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import { LegalService } from '../types';

interface ServiceDetailModalProps {
  service: LegalService | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#17243A] text-white w-full max-w-3xl rounded-xl shadow-2xl border border-[#202F46] overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-6 bg-[#0F172A] border-b border-[#202F46] flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#C3A36B] font-semibold">
              {service.categoryLabel}
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">
              {service.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#E9E3D9] mt-1 max-w-xl">
              {service.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-[#202F46] transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Engagement Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-[#202F46]/60 border border-[#202F46] text-xs">
            <div>
              <div className="text-slate-400 flex items-center gap-1.5 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-[#C3A36B]" />
                <span>Starting Investment</span>
              </div>
              <div className="text-base font-serif text-[#C3A36B] font-semibold">
                {service.startingFee}
              </div>
              <div className="text-[10px] text-slate-400">{service.feeModel}</div>
            </div>

            <div>
              <div className="text-slate-400 flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#C3A36B]" />
                <span>Standard Turnaround</span>
              </div>
              <div className="text-sm font-medium text-white">
                {service.turnaroundTime}
              </div>
              <div className="text-[10px] text-slate-400">Expedited available</div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="text-slate-400 flex items-center gap-1.5 mb-1">
                <FileText className="w-3.5 h-3.5 text-[#C3A36B]" />
                <span>Primary Deliverable</span>
              </div>
              <div className="text-sm font-medium text-white truncate">
                {service.keyDeliverables[0]}
              </div>
              <div className="text-[10px] text-slate-400">Custom executable draft</div>
            </div>
          </div>

          {/* Core Client Problem Solved */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2">
              The Strategic Challenge We Address
            </h3>
            <p className="text-sm text-[#E9E3D9] bg-[#0F172A] p-4 rounded border border-[#202F46] leading-relaxed">
              {service.clientProblem}
            </p>
          </div>

          {/* Scope of Assistance */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-3">
              Full Scope of Legal Assistance
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {service.scopeOfAssistance.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C3A36B] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Deliverables */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-3">
              Tangible Client Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {service.keyDeliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#202F46]/40 rounded border border-[#202F46] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C3A36B] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended Documentation to Prepare</span>
            </h3>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-1">
              {service.requiredDocuments.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </div>

          {/* Service Specific FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="pt-2 border-t border-[#202F46]">
              <h3 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-3">
                Service-Specific Queries
              </h3>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="p-3 bg-[#0F172A] rounded border border-[#202F46]">
                    <div className="text-xs font-semibold text-white mb-1">{faq.question}</div>
                    <div className="text-xs text-slate-300 leading-relaxed">{faq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 bg-[#0F172A] border-t border-[#202F46] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Transparent quotes issued in formal Scope of Engagement letter.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookService(service.id);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation for this Service</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
