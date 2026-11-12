import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Copy,
  Check,
} from 'lucide-react';
import { FIRM_DETAILS, OFFICE_LOCATIONS } from '../data/legalData';

export const ContactSection: React.FC = () => {
  const [activeOfficeIndex, setActiveOfficeIndex] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Corporate & Business Law',
    message: '',
  });

  const activeOffice = OFFICE_LOCATIONS[activeOfficeIndex];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${activeOffice.address}, ${activeOffice.suite}, ${activeOffice.postalCode}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F8F6F1] text-[#17243A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#C3A36B] font-semibold">
            Confidential Inquiries & Office Locations
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#17243A]">
            Direct Access to Experienced Legal Advisors.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
            We maintain principal advisory headquarters in Manhattan with international desk affiliations in London and Singapore. Reach out directly for preliminary case routing.
          </p>
        </div>

        {/* Global Desks Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 no-scrollbar text-xs">
          {OFFICE_LOCATIONS.map((loc, idx) => (
            <button
              key={loc.city}
              onClick={() => setActiveOfficeIndex(idx)}
              className={`px-4 py-2 rounded-lg border font-medium transition-colors whitespace-nowrap ${
                activeOfficeIndex === idx
                  ? 'bg-[#17243A] text-white border-[#17243A]'
                  : 'bg-white text-slate-600 border-[#E9E3D9] hover:border-slate-400'
              }`}
            >
              {loc.city.split('(')[0].trim()}
            </button>
          ))}
        </div>

        {/* 2-Column Split: Office Information & Interactive Direct Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Office Logistics & Interactive Map Simulation */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-[#E9E3D9] shadow-sm space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold">
                {activeOffice.type}
              </div>
              <h3 className="text-2xl font-serif text-[#17243A] mt-1">
                {activeOffice.city}
              </h3>
            </div>

            {/* Interactive Map Visual Simulator */}
            <div className="relative rounded-lg overflow-hidden border border-[#E9E3D9] bg-[#17243A] h-48 flex items-center justify-center p-4 text-center">
              <div className="space-y-2 relative z-10 text-white">
                <div className="w-10 h-10 rounded-full bg-[#C3A36B] text-[#17243A] flex items-center justify-center mx-auto shadow-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="font-serif font-semibold text-sm">{activeOffice.address}</div>
                <div className="text-xs text-slate-300">{activeOffice.suite} · {activeOffice.postalCode}</div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${activeOffice.address}, ${activeOffice.postalCode}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#C3A36B] hover:text-[#D8B980] underline pt-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              {/* Subtle background grid pattern */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C3A36B_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>

            {/* Address & Copy Action */}
            <div className="p-3 bg-[#F8F6F1] rounded-lg border border-[#E9E3D9] flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-500 block">Office Address</span>
                <span className="text-[#17243A] font-medium block">
                  {activeOffice.address}, {activeOffice.suite}
                </span>
              </div>
              <button
                onClick={handleCopyAddress}
                className="p-2 hover:bg-[#E9E3D9] rounded text-slate-600 hover:text-[#17243A] transition-colors"
                title="Copy Address"
              >
                {copiedAddress ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Logistics Details */}
            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C3A36B] shrink-0" />
                <span>
                  Telephone:{' '}
                  <a
                    href={`tel:${activeOffice.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-medium text-[#17243A] hover:underline"
                  >
                    {activeOffice.phone}
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C3A36B] shrink-0" />
                <span>
                  Direct Inquiries:{' '}
                  <a
                    href={`mailto:${activeOffice.email}`}
                    className="font-medium text-[#17243A] hover:underline"
                  >
                    {activeOffice.email}
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C3A36B] shrink-0" />
                <span>Hours: {activeOffice.hours}</span>
              </div>
            </div>

            {/* Transit note */}
            <div className="pt-3 border-t border-[#E9E3D9] text-[11px] text-slate-500">
              <strong>Transit & Access:</strong> {activeOffice.transitInfo}
            </div>
          </div>

          {/* Right Column: Direct Advisory Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-xl border border-[#E9E3D9] shadow-sm">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif text-[#17243A]">
                  Enquiry Dispatched Confidentially
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for contacting Aegis & Vance. Your enquiry has been routed to our practice coordinator. We will reply to <strong className="text-[#17243A]">{contactData.email}</strong> within four business hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setContactData({
                      name: '',
                      email: '',
                      phone: '',
                      category: 'Corporate & Business Law',
                      message: '',
                    });
                  }}
                  className="px-5 py-2 text-xs font-semibold text-[#17243A] hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <h3 className="text-2xl font-serif text-[#17243A]">
                    Send a Direct Confidential Enquiry
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Describe your legal question. Our intake team performs immediate conflict screening.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      placeholder="e.g. Katherine Vance"
                      className="w-full bg-[#F8F6F1] border border-[#E9E3D9] focus:border-[#C3A36B] rounded px-3 py-2 text-xs text-[#17243A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      placeholder="name@organization.com"
                      className="w-full bg-[#F8F6F1] border border-[#E9E3D9] focus:border-[#C3A36B] rounded px-3 py-2 text-xs text-[#17243A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      placeholder="+1 (212) 000-0000"
                      className="w-full bg-[#F8F6F1] border border-[#E9E3D9] focus:border-[#C3A36B] rounded px-3 py-2 text-xs text-[#17243A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Service Category
                    </label>
                    <select
                      value={contactData.category}
                      onChange={(e) => setContactData({ ...contactData, category: e.target.value })}
                      className="w-full bg-[#F8F6F1] border border-[#E9E3D9] focus:border-[#C3A36B] rounded px-3 py-2 text-xs text-[#17243A] focus:outline-none"
                    >
                      <option>Corporate & Business Law</option>
                      <option>Commercial Contracts & NDAs</option>
                      <option>Real Estate & Commercial Leases</option>
                      <option>Regulatory Compliance & Privacy</option>
                      <option>Dispute Assessment & Demand Notices</option>
                      <option>Private Wealth & Trust Advisory</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Matter Outline / Key Question *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="Provide a general summary of your matter and desired timeline."
                    className="w-full bg-[#F8F6F1] border border-[#E9E3D9] focus:border-[#C3A36B] rounded p-3 text-xs text-[#17243A] focus:outline-none"
                  />
                </div>

                {/* Confidentiality Notice */}
                <div className="p-3 bg-[#F8F6F1] rounded border border-[#E9E3D9] flex items-start gap-2.5 text-[11px] text-slate-600">
                  <ShieldAlert className="w-4 h-4 text-[#C3A36B] shrink-0 mt-0.5" />
                  <p>
                    Communication through this form is held in strict professional confidence. However, sending an email or submitting an online enquiry does not create a formal attorney-client relationship until an engagement agreement is mutually countersigned.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <a
                    href={`https://wa.me/${FIRM_DETAILS.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Advisory Coordinator</span>
                  </a>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#17243A] hover:bg-[#202F46] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
                  >
                    Submit Enquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
