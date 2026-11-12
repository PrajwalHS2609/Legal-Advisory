import React, { useState } from 'react';
import { Shield, Phone, Mail, MapPin, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { FIRM_DETAILS, LEGAL_SERVICES } from '../data/legalData';
import { LegalNoticeType } from './LegalNoticeModal';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenLegalNotice: (type: LegalNoticeType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenLegalNotice,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !/\S+@\S+\.\S+/.test(newsletterEmail)) return;
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="bg-[#0F172A] text-white border-t border-[#202F46]">
      {/* Newsletter Subscription Strip (Section 15 of homepage prompt) */}
      <div className="border-b border-[#202F46] bg-[#17243A]/70 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="text-xs uppercase tracking-widest text-[#C3A36B] font-semibold">
                Quarterly Legal & Governance Intelligence
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white">
                Stay Informed. Make Better Legal Decisions.
              </h3>
              <p className="text-xs sm:text-sm text-[#E9E3D9] max-w-xl font-light">
                Receive practical legal insights, regulatory compliance updates, and executive briefings directly to your inbox. No spam. Unsubscribe anytime.
              </p>
            </div>

            <div className="lg:col-span-5">
              {newsletterSubscribed ? (
                <div className="p-4 rounded-lg bg-[#202F46] border border-[#C3A36B]/40 flex items-center gap-3 text-xs text-white">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Thank you. You have been enrolled in our executive legal updates.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your corporate email"
                      className="w-full bg-[#0F172A] border border-[#202F46] focus:border-[#C3A36B] rounded px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] text-xs font-semibold uppercase tracking-wider rounded transition-colors shrink-0 shadow-sm"
                    >
                      Subscribe
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Lock className="w-3 h-3 text-[#C3A36B]" />
                    <span>Strict confidentiality. Your data is never shared.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#202F46] border border-[#C3A36B]/40 flex items-center justify-center text-[#C3A36B]">
                <Shield className="w-5 h-5 text-[#C3A36B]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif text-white tracking-tight">AEGIS & VANCE</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#C3A36B]">Legal Advisory</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Authoritative, modern legal consultancy providing sophisticated corporate advisory, commercial agreement drafting, property due diligence, and regulatory risk mitigation for enterprises and discerning individuals.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C3A36B] shrink-0" />
                <span>{FIRM_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C3A36B] shrink-0" />
                <a href={`tel:${FIRM_DETAILS.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white">
                  {FIRM_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C3A36B] shrink-0" />
                <a href={`mailto:${FIRM_DETAILS.email}`} className="hover:text-white">
                  {FIRM_DETAILS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Legal Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold">
              Practice Areas
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {LEGAL_SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold">
              Advisory Firm
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('consultants')} className="hover:text-white transition-colors">
                  Our Consultants
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-white transition-colors">
                  Industries We Serve
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('insights')} className="hover:text-white transition-colors">
                  Legal Insights & Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faqs')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Office Locations
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Support & Compliance (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold">
              Client Support & Compliance
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <button
                onClick={onOpenBooking}
                className="w-full text-left p-3 rounded bg-[#202F46] hover:bg-[#C3A36B] hover:text-[#17243A] text-white font-medium transition-colors flex items-center justify-between"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-[#202F46]">
              <div>
                <button
                  onClick={() => onOpenLegalNotice('disclaimer')}
                  className="hover:text-white transition-colors"
                >
                  Legal Disclaimer & Regulatory Notice
                </button>
              </div>
              <div>
                <button
                  onClick={() => onOpenLegalNotice('privacy')}
                  className="hover:text-white transition-colors"
                >
                  Client Privacy & Confidentiality
                </button>
              </div>
              <div>
                <button
                  onClick={() => onOpenLegalNotice('terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms of Website Engagement
                </button>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-1">
              <strong>Advisory Desks:</strong> New York, London, Singapore
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-[#202F46] text-[11px] text-slate-500 space-y-3 leading-relaxed">
          <p>
            <strong>Regulatory Disclaimer:</strong> Aegis & Vance Legal Advisory is an independent professional legal consultancy. Information presented on this website is for educational and strategic commercial guidance and does not constitute formal legal advice. Submitting an inquiry does not establish an attorney-client relationship. Services are rendered strictly pursuant to verified professional qualifications, admissions, and mutually executed Scope of Engagement letters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 pt-2">
            <div>
              &copy; {new Date().getFullYear()} Aegis & Vance Legal Advisory LLC. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <span>Verified Bar Admissions: NY, US Fed, E&W, BCI</span>
              <span aria-hidden="true">·</span>
              <span>Lexington Ave Advisory Chambers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
