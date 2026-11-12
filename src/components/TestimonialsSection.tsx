import React from 'react';
import { Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/legalData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#17243A] text-white border-b border-[#202F46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#C3A36B] font-semibold">
            Client Relationships & Endorsements
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
            Trusted Guidance. Strong Professional Relationships.
          </h2>
          <p className="text-sm sm:text-base text-[#E9E3D9] font-light leading-relaxed">
            Our outside general counsel and specialized project advisory engagements are evaluated by executive leadership teams across technology, commercial property, and healthcare.
          </p>
        </div>

        {/* Testimonials 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#202F46]/80 p-8 rounded-xl border border-[#202F46] flex flex-col justify-between hover:border-[#C3A36B]/40 transition-colors shadow-sm"
            >
              <div>
                <Quote className="w-8 h-8 text-[#C3A36B]/60 mb-4" />
                <p className="text-sm sm:text-base text-[#E9E3D9] font-serif italic leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#17243A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-white text-sm">{testimonial.clientName}</div>
                  <div className="text-slate-300">
                    {testimonial.clientRole}, <span className="text-[#C3A36B]">{testimonial.companyName}</span>
                  </div>
                </div>

                <div className="text-right sm:text-right">
                  <div className="text-[11px] text-emerald-400 flex items-center sm:justify-end gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C3A36B]" />
                    <span>Verified Engagement</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{testimonial.serviceCategory}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
