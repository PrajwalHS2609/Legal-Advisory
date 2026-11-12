import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { FeeEstimatorModal } from './components/FeeEstimatorModal';
import { ConsultantsSection } from './components/ConsultantsSection';
import { IndustriesSection } from './components/IndustriesSection';
import { ConsultationProcessSection } from './components/ConsultationProcessSection';
import { DocumentationHubSection } from './components/DocumentationHubSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InsightsSection } from './components/InsightsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { ConsultationBookingModal } from './components/ConsultationBookingModal';
import { SearchModal } from './components/SearchModal';
import { LegalNoticeModal, LegalNoticeType } from './components/LegalNoticeModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ConsultantDetailModal } from './components/ConsultantDetailModal';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { Footer } from './components/Footer';
import { LEGAL_SERVICES, CONSULTANTS, ARTICLES, FAQS } from './data/legalData';
import { LegalService, LegalConsultant, Article } from './types';
import { Calendar, Phone } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [bookingConsultantId, setBookingConsultantId] = useState<string | undefined>(undefined);
  const [bookingScopeDetails, setBookingScopeDetails] = useState<{
    serviceName: string;
    estimatedCost: string;
    turnaround: string;
    clientType: string;
  } | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isFeeEstimatorOpen, setIsFeeEstimatorOpen] = useState<boolean>(false);

  const [legalNotice, setLegalNotice] = useState<{
    isOpen: boolean;
    type: LegalNoticeType;
  }>({ isOpen: false, type: 'disclaimer' });

  // Standalone detail modals triggered from search or direct clicks
  const [detailService, setDetailService] = useState<LegalService | null>(null);
  const [detailConsultant, setDetailConsultant] = useState<LegalConsultant | null>(null);
  const [detailArticle, setDetailArticle] = useState<Article | null>(null);

  // Navigation handler
  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Open booking modal with pre-fills
  const handleOpenBooking = (serviceId?: string, consultantId?: string) => {
    setBookingServiceId(serviceId);
    setBookingConsultantId(consultantId);
    setBookingScopeDetails(null);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithScope = (scopeDetails: {
    serviceName: string;
    estimatedCost: string;
    turnaround: string;
    clientType: string;
  }) => {
    setBookingScopeDetails(scopeDetails);
    setIsBookingOpen(true);
  };

  // Search handlers
  const handleSelectServiceFromSearch = (id: string) => {
    const s = LEGAL_SERVICES.find((item) => item.id === id);
    if (s) setDetailService(s);
  };

  const handleSelectConsultantFromSearch = (id: string) => {
    const c = CONSULTANTS.find((item) => item.id === id);
    if (c) setDetailConsultant(c);
  };

  const handleSelectArticleFromSearch = (id: string) => {
    const a = ARTICLES.find((item) => item.id === id);
    if (a) setDetailArticle(a);
  };

  const handleSelectFaqFromSearch = () => {
    handleNavigate('faqs');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#17243A]">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={() => handleNavigate('services')}
          onOpenFeeEstimator={() => setIsFeeEstimatorOpen(true)}
        />

        {/* 2. About Our Legal Consultancy */}
        <AboutSection
          onOpenBooking={() => handleOpenBooking()}
          onNavigateToTeam={() => handleNavigate('consultants')}
        />

        {/* 3. Comprehensive Legal Services */}
        <ServicesSection
          onOpenBookingForService={(srvId) => handleOpenBooking(srvId)}
          onOpenFeeEstimator={() => setIsFeeEstimatorOpen(true)}
        />

        {/* 4. Industries We Serve */}
        <IndustriesSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 5. Our Legal Consultants & Professional Team */}
        <ConsultantsSection
          onOpenBookingForConsultant={(cId) => handleOpenBooking(undefined, cId)}
        />

        {/* 6. Legal Documentation & Drafting Hub */}
        <DocumentationHubSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 7. Consultation Process */}
        <ConsultationProcessSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 8. Illustrative Case Studies */}
        <CaseStudiesSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 9. Verified Client Testimonials */}
        <TestimonialsSection />

        {/* 10. Legal Insights & Knowledge Hub */}
        <InsightsSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 11. Frequently Asked Questions */}
        <FaqSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 12. Office Locations & Contact Inquiries */}
        <ContactSection />
      </main>

      {/* Structured Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenLegalNotice={(type) => setLegalNotice({ isOpen: true, type })}
      />

      {/* Sticky Quick-Action Bar for Mobile & Compact Screens */}
      <div className="fixed bottom-4 right-4 z-30 sm:hidden">
        <button
          onClick={() => handleOpenBooking()}
          className="flex items-center gap-2 px-4 py-3 bg-[#C3A36B] text-[#17243A] font-semibold text-xs rounded-full shadow-2xl border border-white/20 active:scale-95 transition-transform"
          aria-label="Book consultation"
        >
          <Calendar className="w-4 h-4" />
          <span>Consult</span>
        </button>
      </div>

      {/* Modals & Dialogs */}
      {/* 1. Consultation Booking Modal */}
      <ConsultationBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedServiceId={bookingServiceId}
        preSelectedConsultantId={bookingConsultantId}
        initialScopeDetails={bookingScopeDetails}
      />

      {/* 2. Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectService={handleSelectServiceFromSearch}
        onSelectConsultant={handleSelectConsultantFromSearch}
        onSelectArticle={handleSelectArticleFromSearch}
        onSelectFaq={handleSelectFaqFromSearch}
      />

      {/* 3. Transparent Fee & Scope Estimator */}
      <FeeEstimatorModal
        isOpen={isFeeEstimatorOpen}
        onClose={() => setIsFeeEstimatorOpen(false)}
        onProceedToBooking={handleOpenBookingWithScope}
      />

      {/* 4. Professional Legal Notice & Terms Modal */}
      <LegalNoticeModal
        isOpen={legalNotice.isOpen}
        type={legalNotice.type}
        onClose={() => setLegalNotice({ ...legalNotice, isOpen: false })}
      />

      {/* 5. Standalone Service Detail Modal */}
      <ServiceDetailModal
        service={detailService}
        onClose={() => setDetailService(null)}
        onBookService={(srvId) => {
          setDetailService(null);
          handleOpenBooking(srvId);
        }}
      />

      {/* 6. Standalone Consultant Detail Modal */}
      <ConsultantDetailModal
        consultant={detailConsultant}
        onClose={() => setDetailConsultant(null)}
        onBookWithConsultant={(cId) => {
          setDetailConsultant(null);
          handleOpenBooking(undefined, cId);
        }}
      />

      {/* 7. Standalone Article Reader Modal */}
      <ArticleReaderModal
        article={detailArticle}
        onClose={() => setDetailArticle(null)}
        onOpenBooking={() => {
          setDetailArticle(null);
          handleOpenBooking();
        }}
      />
    </div>
  );
}
