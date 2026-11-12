import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, ArrowRight, BookOpen, User, Scale, HelpCircle } from 'lucide-react';
import { LEGAL_SERVICES, CONSULTANTS, ARTICLES, FAQS } from '../data/legalData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceId: string) => void;
  onSelectConsultant: (consultantId: string) => void;
  onSelectArticle: (articleId: string) => void;
  onSelectFaq: (faqId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
  onSelectConsultant,
  onSelectArticle,
  onSelectFaq,
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'services' | 'consultants' | 'articles' | 'faqs'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { services: [], consultants: [], articles: [], faqs: [] };

    const services = LEGAL_SERVICES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.categoryLabel.toLowerCase().includes(q) ||
        s.scopeOfAssistance.some((item) => item.toLowerCase().includes(q))
    );

    const consultants = CONSULTANTS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.roleTitle.toLowerCase().includes(q) ||
        c.practiceAreas.some((p) => p.toLowerCase().includes(q)) ||
        c.qualifications.some((qual) => qual.toLowerCase().includes(q))
    );

    const articles = ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.sections.some((sec) => sec.paragraphs.some((p) => p.toLowerCase().includes(q)))
    );

    const faqs = FAQS.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );

    return { services, consultants, articles, faqs };
  }, [query]);

  if (!isOpen) return null;

  const totalResults =
    searchResults.services.length +
    searchResults.consultants.length +
    searchResults.articles.length +
    searchResults.faqs.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div className="bg-[#17243A] text-white w-full max-w-2xl rounded-xl shadow-2xl border border-[#202F46] overflow-hidden">
        {/* Search Input Bar */}
        <div className="relative border-b border-[#202F46] p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C3A36B] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, consultants, contracts, legal guides, FAQs..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 bg-[#202F46] text-slate-300 rounded hover:text-white transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-2 p-3 bg-[#0F172A] border-b border-[#202F46] overflow-x-auto text-xs">
          <span className="text-slate-400 text-[11px] uppercase tracking-wider pl-1">Filter:</span>
          {(['all', 'services', 'consultants', 'articles', 'faqs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1 rounded transition-colors capitalize whitespace-nowrap ${
                activeFilter === tab
                  ? 'bg-[#C3A36B] text-[#17243A] font-semibold'
                  : 'text-slate-300 hover:bg-[#202F46]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!query ? (
            <div className="py-8 text-center text-slate-400 text-sm space-y-3">
              <p>Type to search across corporate services, consultants, legal guides, and answers.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Shareholder Agreements', 'Commercial Lease', 'GDPR Compliance', 'Arthur Vance', 'Consultation Fees'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-2.5 py-1 bg-[#202F46] hover:bg-[#C3A36B] hover:text-[#17243A] text-slate-300 rounded transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              <p>No results found for &ldquo;{query}&rdquo;.</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for terms like &ldquo;Corporate&rdquo;, &ldquo;Contract&rdquo;, &ldquo;Lease&rdquo;, or &ldquo;Privacy&rdquo;.</p>
            </div>
          ) : (
            <>
              {/* Services Results */}
              {(activeFilter === 'all' || activeFilter === 'services') && searchResults.services.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Legal Services ({searchResults.services.length})</span>
                  </div>
                  <div className="space-y-2">
                    {searchResults.services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => {
                          onSelectService(service.id);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-lg bg-[#202F46]/50 hover:bg-[#202F46] transition-colors group flex items-start justify-between gap-3 border border-transparent hover:border-[#C3A36B]/30"
                      >
                        <div>
                          <div className="text-xs text-[#C3A36B]">{service.categoryLabel}</div>
                          <div className="text-sm font-medium text-white group-hover:text-[#D8B980] transition-colors">
                            {service.title}
                          </div>
                          <div className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                            {service.shortDescription}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C3A36B] shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Consultants Results */}
              {(activeFilter === 'all' || activeFilter === 'consultants') && searchResults.consultants.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>Advisory Partners & Consultants ({searchResults.consultants.length})</span>
                  </div>
                  <div className="space-y-2">
                    {searchResults.consultants.map((consultant) => (
                      <button
                        key={consultant.id}
                        onClick={() => {
                          onSelectConsultant(consultant.id);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-lg bg-[#202F46]/50 hover:bg-[#202F46] transition-colors group flex items-center justify-between gap-3 border border-transparent hover:border-[#C3A36B]/30"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={consultant.portraitUrl}
                            alt={consultant.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border border-[#C3A36B]/40 shrink-0"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (!target.src.includes('1794339703301')) {
                                target.src = '/src/assets/images/legal_consultant_portrait_1794339703301.jpg';
                              }
                            }}
                          />
                          <div>
                            <div className="text-sm font-medium text-white group-hover:text-[#D8B980]">
                              {consultant.name}
                            </div>
                            <div className="text-xs text-slate-300">{consultant.roleTitle}</div>
                            <div className="text-[11px] text-[#C3A36B] mt-0.5">{consultant.almaMater} · {consultant.experienceYears} Years Exp.</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C3A36B] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Results */}
              {(activeFilter === 'all' || activeFilter === 'articles') && searchResults.articles.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Legal Insights & Briefs ({searchResults.articles.length})</span>
                  </div>
                  <div className="space-y-2">
                    {searchResults.articles.map((article) => (
                      <button
                        key={article.id}
                        onClick={() => {
                          onSelectArticle(article.id);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-lg bg-[#202F46]/50 hover:bg-[#202F46] transition-colors group flex items-start justify-between gap-3 border border-transparent hover:border-[#C3A36B]/30"
                      >
                        <div>
                          <div className="text-xs text-[#C3A36B]">{article.category}</div>
                          <div className="text-sm font-medium text-white group-hover:text-[#D8B980]">
                            {article.title}
                          </div>
                          <div className="text-xs text-slate-300 line-clamp-1 mt-0.5">{article.excerpt}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C3A36B] shrink-0 mt-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs Results */}
              {(activeFilter === 'all' || activeFilter === 'faqs') && searchResults.faqs.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Frequently Asked Questions ({searchResults.faqs.length})</span>
                  </div>
                  <div className="space-y-2">
                    {searchResults.faqs.map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() => {
                          onSelectFaq(faq.id);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-lg bg-[#202F46]/50 hover:bg-[#202F46] transition-colors group border border-transparent hover:border-[#C3A36B]/30"
                      >
                        <div className="text-xs text-[#C3A36B]">{faq.category}</div>
                        <div className="text-sm font-medium text-white group-hover:text-[#D8B980]">{faq.question}</div>
                        <div className="text-xs text-slate-300 line-clamp-2 mt-1">{faq.answer}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
