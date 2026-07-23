import React, { useState } from 'react';
import { TitleRecommendation } from '../types';
import { Language, translations } from '../data/translations';
import { Sparkles, Copy, Check, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface TitleRecommendationsProps {
  recommendations: TitleRecommendation[];
  businessName: string;
  industryName: string;
  lang: Language;
}

export const TitleRecommendations: React.FC<TitleRecommendationsProps> = ({
  recommendations,
  businessName,
  industryName,
  lang,
}) => {
  const t = translations[lang];
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden transition-colors">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{t.recommendationsBadge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.recommendationsHeading}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
            {t.engineeredFor} <strong className="text-slate-800 dark:text-slate-200">{businessName}</strong> ({industryName}).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{t.oneClickCopyNote}</span>
        </div>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const isCopied = copiedId === rec.id;
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-5 rounded-2xl border transition-all ${
                index === 0
                  ? 'bg-gradient-to-r from-emerald-50/80 via-slate-50 to-white dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border-emerald-300 dark:border-emerald-500/40 shadow-md'
                  : 'bg-slate-50/80 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Formula Name & Title Text */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-500/30 px-2.5 py-0.5 rounded-md">
                      {rec.formulaName}
                    </span>
                    {index === 0 && (
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-950 bg-amber-400 px-2 py-0.5 rounded-md shadow-sm">
                        {t.topRecommendedBadge}
                      </span>
                    )}
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono" dir="ltr">
                      {rec.characterCount} {t.charsCount} (~{rec.estimatedPixels}px)
                    </span>
                  </div>

                  {/* Title Box */}
                  <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 rounded-xl p-3.5 text-slate-900 dark:text-slate-100 font-medium text-sm sm:text-base flex items-center justify-between gap-3 group select-all shadow-inner">
                    <span className="text-emerald-700 dark:text-emerald-300 font-bold tracking-wide">
                      {rec.title}
                    </span>
                  </div>

                  {/* Explanation */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong className="text-slate-800 dark:text-slate-300 font-semibold">{t.whyThisRanks}</strong> {rec.explanation}
                  </p>
                </div>

                {/* Copy Button */}
                <div className="shrink-0 flex items-center">
                  <button
                    onClick={() => handleCopy(rec.title, rec.id)}
                    className={`w-full lg:w-auto px-5 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      isCopied
                        ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                        : 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-800 dark:border-slate-700 hover:border-slate-700'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                        <span>{t.copiedBtn}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-emerald-400" />
                        <span>{t.copyTitleBtn}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
