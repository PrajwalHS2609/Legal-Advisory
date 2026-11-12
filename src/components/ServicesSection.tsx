import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, FileText, Clock, Sparkles } from 'lucide-react';
import { LEGAL_SERVICES } from '../data/legalData';
import { LegalService } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesSectionProps {
  onOpenBookingForService: (serviceId: string) => void;
  onOpenFeeEstimator: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenBookingForService,
  onOpenFeeEstimator,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<LegalService | null>(null);

  const categories = [
    { id: 'all', label: 'All Practice Areas' },
    { id: 'corporate', label: 'Corporate Law' },
    { id: 'contracts', label: 'Commercial Contracts' },
    { id: 'property', label: 'Real Estate & Leases' },
    { id: 'compliance', label: 'Compliance & Risk' },
    { id: 'employment', label: 'Executive Employment' },
    { id: 'dispute', label: 'Dispute Resolution' },
    { id: 'family', label: 'Private Wealth' },
  ];

  const filteredServices = activeCategory === 'all'
    ? LEGAL_SERVICES
    : LEGAL_SERVICES.filter((s) => s.category === activeCategory);

  const featuredService = LEGAL_SERVICES.find((s) => s.id === 'corporate-business-law') || LEGAL_SERVICES[0];

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#17243A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#202F46]">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C3A36B] font-semibold">
              Comprehensive Practice Areas
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
              Authoritative Legal Services Engineered for Certainty.
            </h2>
            <p className="text-sm sm:text-base text-[#E9E3D9] font-light leading-relaxed">
              We provide strategic advisory, documentation, compliance, and negotiation support tailored specifically to the operational realities of businesses and private individuals.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={onOpenFeeEstimator}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase border border-[#C3A36B] text-[#C3A36B] hover:bg-[#C3A36B] hover:text-[#17243A] rounded transition-all duration-150"
            >
              <span>Scope & Fee Estimator</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Control - Allowed by §1.A) */}
        <div className="pt-8 pb-10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#C3A36B] text-[#17243A] font-semibold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-[#202F46]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Spotlight: Asymmetric Marquee Card (when viewing all) */}
        {activeCategory === 'all' && (
          <div className="mb-12 bg-linear-to-r from-[#202F46] to-[#17243A] rounded-xl border border-[#C3A36B]/40 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#C3A36B] font-medium tracking-wide">
                  <Sparkles className="w-4 h-4 text-[#C3A36B]" />
                  <span>MARQUEE PRACTICE · CORPORATE GOVERNANCE & FORMATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white">
                  {featuredService.title}
                </h3>
                <p className="text-sm text-[#E9E3D9] max-w-2xl leading-relaxed">
                  {featuredService.shortDescription}
                </p>

                {/* Scope items preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {featuredService.scopeOfAssistance.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C3A36B] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#0F172A]/80 p-6 rounded-lg border border-[#202F46] space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">Starting Advisory</span>
                  <span className="text-2xl font-serif text-[#C3A36B] font-semibold">
                    {featuredService.startingFee}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between pb-2 border-b border-[#202F46]">
                  <span>Timeline</span>
                  <span className="text-white font-medium">{featuredService.turnaroundTime}</span>
                </div>
                <button
                  onClick={() => setSelectedService(featuredService)}
                  className="w-full py-2.5 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] text-xs font-semibold uppercase tracking-wider rounded transition-colors text-center"
                >
                  View Full Scope & Deliverables
                </button>
                <button
                  onClick={() => onOpenBookingForService(featuredService.id)}
                  className="w-full text-center text-xs text-[#E9E3D9] hover:text-[#C3A36B] transition-colors"
                >
                  Schedule Corporate Advisory Call &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Varied Editorial Layout for Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            const isAlternate = index % 3 === 1;

            return (
              <div
                key={service.id}
                className={`rounded-lg p-6 flex flex-col justify-between transition-all duration-200 border ${
                  isAlternate
                    ? 'bg-[#202F46]/80 border-[#C3A36B]/30 hover:border-[#C3A36B]'
                    : 'bg-[#1D2B42]/60 border-[#202F46] hover:border-slate-500'
                }`}
              >
                <div>
                  {/* Category unboxed text metadata */}
                  <div className="flex items-center justify-between text-xs text-[#C3A36B] mb-2 font-medium">
                    <span>{service.categoryLabel}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{service.turnaroundTime}</span>
                  </div>

                  <h3 className="text-xl font-serif text-white mb-2 leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>

                  {/* Client Problem Callout */}
                  <div className="p-3 bg-[#0F172A]/70 rounded border border-[#202F46] text-xs text-[#E9E3D9] mb-4 space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-[#C3A36B] font-semibold">
                      Client Challenge Addressed
                    </div>
                    <p className="line-clamp-2 text-slate-300">
                      {service.clientProblem}
                    </p>
                  </div>

                  {/* Scope bullets */}
                  <div className="space-y-1.5 text-xs text-slate-300 mb-6">
                    {service.scopeOfAssistance.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C3A36B] shrink-0 mt-1.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-[#202F46] flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] text-slate-400">Starting from</div>
                    <div className="text-base font-serif text-[#C3A36B] font-semibold">
                      {service.startingFee}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="px-3 py-1.5 text-xs text-slate-200 hover:text-white border border-[#202F46] hover:border-slate-400 rounded transition-colors"
                    >
                      Scope
                    </button>
                    <button
                      onClick={() => onOpenBookingForService(service.id)}
                      className="px-3 py-1.5 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] text-xs font-semibold rounded transition-colors"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={(id) => {
          setSelectedService(null);
          onOpenBookingForService(id);
        }}
      />
    </section>
  );
};
