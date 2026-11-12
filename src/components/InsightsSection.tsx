import React, { useState } from 'react';
import { ArrowRight, Clock, User, Calendar, BookOpen } from 'lucide-react';
import { ARTICLES } from '../data/legalData';
import { Article } from '../types';
import { ArticleReaderModal } from './ArticleReaderModal';

interface InsightsSectionProps {
  onOpenBooking: () => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onOpenBooking }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Corporate & Business Law', label: 'Corporate & Founders' },
    { id: 'Contract & Agreement Services', label: 'Commercial Contracts' },
    { id: 'Property & Real Estate Law', label: 'Real Estate & Leases' },
    { id: 'Regulatory & Compliance Advisory', label: 'Compliance & Privacy' },
  ];

  const filteredArticles = filterCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === filterCategory);

  return (
    <section id="insights" className="py-20 lg:py-28 bg-[#F8F6F1] text-[#17243A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E9E3D9]">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C3A36B] font-semibold">
              Legal Insights & Knowledge Hub
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#17243A]">
              Authoritative Guidance for Better Business Decisions.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
              Clear, practical commentary on regulatory trends, contract negotiation risks, founder equity protections, and commercial property diligence.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-xs text-slate-500">
              {ARTICLES.length} Published Briefings
            </span>
          </div>
        </div>

        {/* Filter Segmented Control */}
        <div className="pt-8 pb-10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded transition-all whitespace-nowrap ${
                filterCategory === cat.id
                  ? 'bg-[#17243A] text-white font-semibold'
                  : 'text-slate-600 hover:text-[#17243A] hover:bg-[#E9E3D9]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl border border-[#E9E3D9] p-6 sm:p-8 flex flex-col justify-between hover:border-[#C3A36B] hover:shadow-md transition-all group"
            >
              <div>
                {/* Unboxed Metadata Line (No pills - Allowed §1.A) */}
                <div className="flex items-center gap-2 text-xs text-[#C3A36B] font-medium mb-3">
                  <span>{article.category}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-500 font-normal">{article.readTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif text-[#17243A] group-hover:text-[#C3A36B] transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-light">
                  {article.excerpt}
                </p>

                {/* Key Takeaway Teaser */}
                <div className="p-3 bg-[#F8F6F1] rounded border border-[#E9E3D9] text-xs text-slate-700 mb-6 space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-[#C3A36B] font-semibold">
                    Core Strategic Rule
                  </div>
                  <p className="line-clamp-2 italic">
                    &ldquo;{article.keyTakeaways[0]}&rdquo;
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-[#E9E3D9] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <User className="w-3.5 h-3.5 text-[#C3A36B]" />
                  <span>{article.authorName}</span>
                </div>

                <button
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#17243A] group-hover:text-[#C3A36B] transition-colors"
                >
                  <span>Read Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenBooking={onOpenBooking}
      />
    </section>
  );
};
