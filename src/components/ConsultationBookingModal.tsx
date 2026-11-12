import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Video,
  Phone,
  Building,
  User,
  CheckCircle2,
  AlertTriangle,
  Download,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { LEGAL_SERVICES, CONSULTANTS, FIRM_DETAILS } from '../data/legalData';
import { ConsultationMethod, ClientCategory, ConsultationBookingRequest } from '../types';

interface ConsultationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  preSelectedConsultantId?: string;
  initialScopeDetails?: {
    serviceName: string;
    estimatedCost: string;
    turnaround: string;
    clientType: string;
  } | null;
}

export const ConsultationBookingModal: React.FC<ConsultationBookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  preSelectedConsultantId,
  initialScopeDetails,
}) => {
  // Form State
  const [formData, setFormData] = useState<ConsultationBookingRequest>({
    fullName: '',
    email: '',
    phone: '',
    clientCategory: 'business',
    serviceId: preSelectedServiceId || LEGAL_SERVICES[0].id,
    consultantId: preSelectedConsultantId || '',
    preferredMethod: 'video',
    preferredDate: '',
    preferredTimeSlot: '10:00 AM - 11:00 AM EST',
    urgentMatter: false,
    briefDescription: '',
    jurisdiction: 'New York / US Commercial',
    agreeToPrivacy: true,
    acknowledgedDisclaimer: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [confirmedReference, setConfirmedReference] = useState<string>('');

  // Sync props when opening
  useEffect(() => {
    if (preSelectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preSelectedServiceId }));
    }
    if (preSelectedConsultantId) {
      setFormData((prev) => ({ ...prev, consultantId: preSelectedConsultantId }));
    }
    if (initialScopeDetails) {
      setFormData((prev) => ({
        ...prev,
        briefDescription: `Scope estimate: ${initialScopeDetails.serviceName} (${initialScopeDetails.estimatedCost}, ${initialScopeDetails.turnaround}).`,
      }));
    }
  }, [preSelectedServiceId, preSelectedConsultantId, initialScopeDetails, isOpen]);

  // Set default date to tomorrow if empty
  useEffect(() => {
    if (!formData.preferredDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      // Format as YYYY-MM-DD
      const dateStr = tomorrow.toISOString().split('T')[0];
      setFormData((prev) => ({ ...prev, preferredDate: dateStr }));
    }
  }, []);

  if (!isOpen) return null;

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full legal name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Valid corporate or personal email is required.';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errors.phone = 'Valid phone number with country code is required.';
    }
    if (!formData.preferredDate) errors.preferredDate = 'Please select a preferred date.';
    if (!formData.briefDescription.trim()) {
      errors.briefDescription = 'Please provide a brief, high-level summary of your legal matter.';
    }
    if (!formData.acknowledgedDisclaimer) {
      errors.acknowledgedDisclaimer = 'You must acknowledge the legal consultation terms.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate reference code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refCode = `AV-${new Date().getFullYear()}-${randomSuffix}`;
    setConfirmedReference(refCode);
    setIsSubmitted(true);
  };

  const handleDownloadIcs = () => {
    const serviceObj = LEGAL_SERVICES.find((s) => s.id === formData.serviceId);
    const consultantObj = CONSULTANTS.find((c) => c.id === formData.consultantId);

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aegis and Vance Legal Advisory//Consultation Booking//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Legal Consultation - Aegis & Vance (${confirmedReference})`,
      `DESCRIPTION:Confidential preliminary legal consultation with ${consultantObj ? consultantObj.name : 'Senior Partner'} regarding ${serviceObj ? serviceObj.title : 'Legal Matter'}.`,
      `LOCATION:${formData.preferredMethod === 'in-person' ? FIRM_DETAILS.address : 'Secure Video Conference Link (provided via email)'}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${confirmedReference}-legal-consultation.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const timeSlots = [
    '09:00 AM - 10:00 AM EST',
    '10:30 AM - 11:30 AM EST',
    '01:00 PM - 02:00 PM EST',
    '03:00 PM - 04:00 PM EST',
    '04:30 PM - 05:30 PM EST',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#17243A] text-white w-full max-w-3xl rounded-xl shadow-2xl border border-[#202F46] overflow-hidden my-8">
        {/* Modal Top Bar */}
        <div className="p-6 bg-[#0F172A] border-b border-[#202F46] flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#C3A36B] font-semibold">
              Client Advisory Intake
            </div>
            <h2 className="text-2xl font-serif text-white">
              {isSubmitted ? 'Consultation Confirmed' : 'Book a Confidential Consultation'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-[#202F46] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isSubmitted ? (
          /* Confirmation View */
          <div className="p-6 sm:p-10 space-y-6">
            <div className="p-6 bg-[#202F46]/60 rounded-xl border border-[#C3A36B]/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#C3A36B] text-[#17243A] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif text-white">
                Advisory Session Reserved
              </h3>
              <div className="inline-block px-3 py-1 bg-[#0F172A] rounded border border-[#202F46] font-mono text-sm text-[#C3A36B]">
                Reference ID: {confirmedReference}
              </div>
              <p className="text-xs sm:text-sm text-[#E9E3D9] max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. A confidential confirmation has been dispatched to <strong className="text-[#C3A36B]">{formData.email}</strong> along with meeting credentials.
              </p>
            </div>

            {/* Session Logistics Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-[#0F172A] p-4 rounded-lg border border-[#202F46]">
              <div>
                <span className="text-slate-400 block mb-0.5">Preferred Date & Window</span>
                <span className="text-white font-medium block">{formData.preferredDate}</span>
                <span className="text-[#C3A36B]">{formData.preferredTimeSlot}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Consultation Format</span>
                <span className="text-white font-medium capitalize block">{formData.preferredMethod}</span>
                <span className="text-slate-400">
                  {formData.preferredMethod === 'in-person' ? '450 Lexington Ave, Suite 2800' : 'Encrypted Video Link'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Assigned Practice Area</span>
                <span className="text-white font-medium truncate block">
                  {LEGAL_SERVICES.find((s) => s.id === formData.serviceId)?.title || 'Corporate Advisory'}
                </span>
                <span className="text-[#C3A36B]">Senior Advisory Desk</span>
              </div>
            </div>

            {/* Consultation Preparation Guide */}
            <div className="p-4 bg-[#202F46]/40 rounded-lg border border-[#202F46] text-xs space-y-2">
              <div className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C3A36B]" />
                <span>Consultation Preparation Guidelines</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                <li>Prepare clean Word or PDF drafts of any agreements or notices requiring review.</li>
                <li>Write a brief bulleted timeline of events to maximize our 45-minute discussion.</li>
                <li>Do not transmit trade secrets over unencrypted email before formal engagement.</li>
              </ul>
            </div>

            {/* Confirmation Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#202F46]">
              <button
                onClick={handleDownloadIcs}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#202F46] hover:bg-slate-700 text-white rounded text-xs font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#C3A36B]" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Intake Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Step 1: Client Category */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2">
                1. Client Representation
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {(['individual', 'startup', 'business', 'enterprise'] as ClientCategory[]).map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setFormData({ ...formData, clientCategory: cat })}
                    className={`p-2.5 rounded border text-center capitalize transition-colors ${
                      formData.clientCategory === cat
                        ? 'border-[#C3A36B] bg-[#202F46] text-white font-medium'
                        : 'border-[#202F46] bg-[#0F172A] text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  Full Name / Legal Entity Representative *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Robert H. Sterling"
                  className="w-full bg-[#0F172A] border border-[#202F46] focus:border-[#C3A36B] rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                {formErrors.fullName && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.fullName}</span>
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  Corporate / Official Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-[#0F172A] border border-[#202F46] focus:border-[#C3A36B] rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                {formErrors.email && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.email}</span>
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  Telephone Contact *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (212) 555-0199"
                  className="w-full bg-[#0F172A] border border-[#202F46] focus:border-[#C3A36B] rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                {formErrors.phone && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.phone}</span>
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  Applicable Jurisdiction
                </label>
                <input
                  type="text"
                  value={formData.jurisdiction}
                  onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                  placeholder="e.g. New York, Delaware, UK, California"
                  className="w-full bg-[#0F172A] border border-[#202F46] focus:border-[#C3A36B] rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Step 3: Service & Consultant */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  Legal Practice Area Required *
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full bg-[#0F172A] border border-[#202F46] focus:border-[#C3A36B] rounded px-3 py-2 text-xs text-white focus:outline-none"
                >
                  {LEGAL_SERVICES.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.title} ({srv.categoryLabel})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  Preferred Advisory Consultant (Optional)
                </label>
                <select
                  value={formData.consultantId}
                  onChange={(e) => setFormData({ ...formData, consultantId: e.target.value })}
                  className="w-full bg-[#0F172A] border border-[#202F46] focus:border-[#C3A36B] rounded px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="">Next Available Practice Lead</option>
                  {CONSULTANTS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.roleTitle}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 4: Consultation Method & Date Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2">
                2. Preferred Consultation Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'video', label: 'Encrypted Video', icon: Video },
                  { id: 'in-person', label: 'In-Person (Lexington Ave)', icon: Building },
                  { id: 'telephone', label: 'Telephone Briefing', icon: Phone },
                  { id: 'written', label: 'Written Legal Assessment', icon: Clock },
                ].map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setFormData({ ...formData, preferredMethod: method.id as any })}
                      className={`p-3 rounded border text-left transition-colors ${
                        formData.preferredMethod === method.id
                          ? 'border-[#C3A36B] bg-[#202F46] text-white font-medium'
                          : 'border-[#202F46] bg-[#0F172A] text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#C3A36B] mb-1" />
                      <div className="text-[11px]">{method.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date and Time Slot Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  Preferred Consultation Date *
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-[#0F172A] border border-[#202F46] focus:border-[#C3A36B] rounded px-3 py-2 text-xs text-white focus:outline-none"
                />
                {formErrors.preferredDate && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.preferredDate}</span>
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  Preferred Window (EST)
                </label>
                <select
                  value={formData.preferredTimeSlot}
                  onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                  className="w-full bg-[#0F172A] border border-[#202F46] focus:border-[#C3A36B] rounded px-3 py-2 text-xs text-white focus:outline-none"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">
                Brief Description of Legal Matter *
              </label>
              <textarea
                rows={3}
                value={formData.briefDescription}
                onChange={(e) => setFormData({ ...formData, briefDescription: e.target.value })}
                placeholder="Briefly state your core objective or contractual situation (e.g., 'Reviewing 45-page enterprise SaaS agreement before signing next Tuesday')."
                className="w-full bg-[#0F172A] border border-[#202F46] focus:border-[#C3A36B] rounded p-3 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              {formErrors.briefDescription && (
                <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.briefDescription}</span>
              )}
              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  Please do not transmit sensitive trade secrets or confidential litigation evidence in this preliminary form.
                </span>
              </div>
            </div>

            {/* Urgent Matter Toggle */}
            <div className="p-3 bg-[#0F172A] rounded border border-[#202F46] flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-white">Expedited 48-Hour Review Desk Required?</div>
                <div className="text-[11px] text-slate-400">For urgent closing deadlines or imminent notice periods</div>
              </div>
              <input
                type="checkbox"
                checked={formData.urgentMatter}
                onChange={(e) => setFormData({ ...formData, urgentMatter: e.target.checked })}
                className="accent-[#C3A36B] w-4 h-4 rounded cursor-pointer"
              />
            </div>

            {/* Legal Disclaimers & Consents */}
            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-[#202F46]">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acknowledgedDisclaimer}
                  onChange={(e) => setFormData({ ...formData, acknowledgedDisclaimer: e.target.checked })}
                  className="accent-[#C3A36B] mt-0.5 rounded"
                />
                <span className="text-[11px] text-slate-400 leading-normal">
                  I understand that submitting this enquiry does not create an attorney-client relationship until a formal Scope of Engagement letter is mutually executed. All communications remain confidential.
                </span>
              </label>
              {formErrors.acknowledgedDisclaimer && (
                <span className="text-[11px] text-rose-400 block">{formErrors.acknowledgedDisclaimer}</span>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-[#202F46] flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Submit Consultation Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
