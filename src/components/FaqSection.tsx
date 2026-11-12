import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Lightbulb, Phone, Calendar } from 'lucide-react';
import { FAQS } from '../data/legalData';

interface FaqSectionProps {
  onOpenBooking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
  const [openId, setOpenId] = useState<string>(FAQS[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Booking & Fees', 'Contracts & Corporate', 'Confidentiality', 'Jurisdiction'];

  const filteredFaqs = activeCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-[#17243A] text-white border-t border-[#202F46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#C3A36B] font-semibold">
            Clear Answers to Common Enquiries
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
            Frequently Asked Questions.
          </h2>
          <p className="text-sm sm:text-base text-[#E9E3D9] font-light leading-relaxed">
            Transparent explanations regarding our advisory authority, consultation fee schedules, remote conferencing capabilities, and professional confidentiality protocols.
          </p>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-8 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#C3A36B] text-[#17243A] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-[#202F46]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3 max-w-4xl">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-lg border border-[#202F46] bg-[#202F46]/50 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#202F46] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-serif font-medium text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C3A36B] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#E9E3D9] leading-relaxed border-t border-[#17243A] space-y-3">
                    <p className="text-slate-300 font-light">
                      {faq.answer}
                    </p>

                    {faq.practicalTip && (
                      <div className="p-3 bg-[#17243A] rounded border border-[#202F46] flex items-start gap-2 text-xs text-[#E9E3D9]">
                        <Lightbulb className="w-4 h-4 text-[#C3A36B] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[#C3A36B] font-semibold">Practical Recommendation: </span>
                          <span>{faq.practicalTip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Strip */}
        <div className="mt-12 p-6 rounded-xl bg-[#0F172A] border border-[#202F46] max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-0.5 text-center sm:text-left">
            <div className="text-white font-medium">Have a specific or unusual legal requirement?</div>
            <div className="text-slate-400">Our intake coordinator can verify practice area alignment before scheduling.</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] font-semibold rounded uppercase tracking-wider text-xs transition-colors"
            >
              Ask an Advisor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
