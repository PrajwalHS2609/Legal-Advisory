import React, { useState } from 'react';
import { Search, Menu, X, Phone, Calendar, ArrowRight, Shield } from 'lucide-react';
import { FIRM_DETAILS } from '../data/legalData';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenBooking,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Legal Services' },
    { id: 'consultants', label: 'Our Consultants' },
    { id: 'industries', label: 'Industries' },
    { id: 'insights', label: 'Legal Insights' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#17243A] text-white shadow-md border-b border-[#202F46]">
      {/* Discreet Announcement Bar */}
      {!announcementDismissed && (
        <div className="bg-[#0F172A] border-b border-[#202F46]/60 text-xs text-[#E9E3D9] py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="text-[#C3A36B] font-medium tracking-wide">ADVISORY ADMISSION:</span>
              <span className="truncate">Active consultation desks in New York, London & Singapore · Schedule your confidential strategic review</span>
            </div>
            <div className="flex items-center gap-3 shrink-0 text-xs">
              <a
                href={`tel:${FIRM_DETAILS.phone.replace(/[^0-9+]/g, '')}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-[#C3A36B] hover:text-[#D8B980] transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>{FIRM_DETAILS.phone}</span>
              </a>
              <button
                onClick={() => setAnnouncementDismissed(true)}
                className="text-slate-400 hover:text-white p-0.5"
                aria-label="Dismiss announcement"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Single Brand Wordmark in Serif Face */}
          <div className="shrink-0 flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none group flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded bg-[#202F46] border border-[#C3A36B]/40 flex items-center justify-center text-[#C3A36B] shadow-inner">
                <Shield className="w-5 h-5 text-[#C3A36B]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif tracking-tight text-white group-hover:text-[#C3A36B] transition-colors">
                  AEGIS & VANCE
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C3A36B] font-sans font-medium -mt-1">
                  Legal Advisory
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (single line, subtle hover underline) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-1 whitespace-nowrap transition-colors hover:text-white ${
                  currentTab === link.id
                    ? 'text-[#C3A36B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C3A36B]'
                    : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions - Search + Primary CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-300 hover:text-white hover:bg-[#202F46] rounded-md transition-colors"
              title="Search services, consultants, insights (Cmd+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wide uppercase bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] rounded transition-all duration-150 shadow-sm whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Consultation</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-md hover:bg-[#202F46] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#17243A] border-b border-[#202F46] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  currentTab === link.id
                    ? 'bg-[#202F46] text-[#C3A36B]'
                    : 'text-slate-200 hover:bg-[#202F46]/60 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#202F46] space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] rounded shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 px-2 pt-2">
              <span className="flex items-center gap-1.5 text-[#C3A36B]">
                <Phone className="w-3.5 h-3.5" />
                {FIRM_DETAILS.phone}
              </span>
              <span>Lexington Ave, NYC</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
