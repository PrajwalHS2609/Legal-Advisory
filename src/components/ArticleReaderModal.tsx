import React from 'react';
import { X, Calendar, Clock, User, CheckSquare, AlertCircle, Share2, BookOpen } from 'lucide-react';
import { Article } from '../types';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  onOpenBooking,
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#17243A] text-white w-full max-w-4xl rounded-xl shadow-2xl border border-[#202F46] overflow-hidden my-8">
        {/* Article Reader Header */}
        <div className="p-6 sm:p-8 bg-[#0F172A] border-b border-[#202F46] relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-[#202F46] transition-colors"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-2xl space-y-2">
            <div className="text-xs uppercase tracking-widest text-[#C3A36B] font-semibold">
              {article.category}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white leading-tight">
              {article.title}
            </h1>
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#C3A36B]" />
                <span>{article.authorName} ({article.authorRole})</span>
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C3A36B]" />
                <span>{article.date}</span>
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C3A36B]" />
                <span>{article.readTime}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Reader Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-8 text-slate-200">
          {/* Jurisdiction Note */}
          <div className="p-4 bg-[#202F46]/70 rounded-lg border border-[#202F46] flex items-start gap-3 text-xs">
            <AlertCircle className="w-4 h-4 text-[#C3A36B] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#C3A36B] font-semibold uppercase tracking-wider block">
                Jurisdiction & Advisory Notice
              </span>
              <span className="text-slate-300 leading-relaxed">
                {article.jurisdictionNote} This briefing is provided for educational and strategic information purposes and does not constitute formal legal counsel for your specific matter.
              </span>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="p-5 bg-[#0F172A] rounded-xl border border-[#C3A36B]/30 space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold">
              Key Strategic Takeaways
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C3A36B] shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Editorial Sections */}
          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[#E9E3D9] font-light">
            {article.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-serif text-white font-normal pt-2">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-slate-300 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Practical Checklist (if available) */}
          {article.checklist && article.checklist.length > 0 && (
            <div className="p-6 bg-[#0F172A] rounded-xl border border-[#202F46] space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-[#C3A36B] font-semibold flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#C3A36B]" />
                <span>Practical Action Checklist</span>
              </h3>
              <div className="space-y-2 text-xs text-slate-300">
                {article.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-[#17243A] rounded border border-[#202F46]">
                    <span className="w-2 h-2 rounded-xs bg-[#C3A36B] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Author Attribution Card */}
          <div className="p-4 bg-[#202F46]/50 rounded-lg border border-[#202F46] flex items-center justify-between gap-4 text-xs">
            <div>
              <div className="text-[10px] uppercase text-slate-400">Written & Reviewed By</div>
              <div className="text-sm font-serif font-semibold text-white mt-0.5">{article.authorName}</div>
              <div className="text-slate-400">{article.authorRole} · Aegis & Vance Legal Advisory</div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-4 py-2 bg-[#C3A36B] hover:bg-[#B08F56] text-[#17243A] font-semibold rounded text-xs transition-colors shrink-0"
            >
              Consult Author
            </button>
          </div>
        </div>

        {/* Reader Footer */}
        <div className="p-5 bg-[#0F172A] border-t border-[#202F46] flex items-center justify-between text-xs text-slate-400">
          <div>Published under Aegis & Vance Legal Insights Series.</div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#202F46] hover:bg-slate-700 text-white rounded transition-colors"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};
