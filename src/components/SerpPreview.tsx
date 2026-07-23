import React, { useState } from 'react';
import { TitleRecommendation } from '../types';
import { Language, translations } from '../data/translations';
import { Monitor, Smartphone, Globe, Star, ShieldCheck } from 'lucide-react';

interface SerpPreviewProps {
  currentTitle: string;
  recommendedTitle: TitleRecommendation;
  businessName: string;
  city: string;
  lang: Language;
}

export const SerpPreview: React.FC<SerpPreviewProps> = ({ currentTitle, recommendedTitle, businessName, city, lang }) => {
  const t = translations[lang];
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  const domain = businessName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') + '.com';

  return (
    <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl transition-colors">
      {/* Header & Device Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>{t.serpHeading}</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {t.serpSubheading}
          </p>
        </div>

        {/* Device Mode Selector */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              device === 'desktop'
                ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-slate-700 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>{t.desktopSerp}</span>
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              device === 'mobile'
                ? 'bg-white dark:bg-slate-800 text-cyan-700 dark:text-cyan-400 border border-slate-200 dark:border-slate-700 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t.mobileLocalPack}</span>
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Title Snippet */}
        <div className="bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 relative shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2.5">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              {t.currentSnippetHeader}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">{t.currentStatus}</span>
          </div>

          <div className="font-sans text-left space-y-1" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className={`flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 ${lang === 'ar' ? 'justify-end' : 'justify-start'}`} dir="ltr">
              <Globe className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">https://www.{domain}</span>
            </div>
            {/* Title Result */}
            <h4 className="text-lg text-blue-700 dark:text-[#8ab4f8] hover:underline font-normal cursor-pointer leading-tight">
              {currentTitle.length > 60 ? currentTitle.substring(0, 58) + '...' : currentTitle}
            </h4>
            <p className="text-xs text-slate-600 dark:text-[#bdc1c6] leading-normal pt-1">
              {t.welcomeSnippetPrefix} {businessName}. {city}.
            </p>
          </div>
        </div>

        {/* Optimized Title Snippet */}
        <div className="bg-slate-50 dark:bg-slate-950/90 border border-emerald-300 dark:border-emerald-500/40 rounded-2xl p-5 space-y-3 relative shadow-md dark:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2.5">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {t.optimizedSnippetHeader}
            </span>
            <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/20">
              {t.optimizedBadge}
            </span>
          </div>

          <div className="font-sans text-left space-y-1" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className={`flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 ${lang === 'ar' ? 'justify-end' : 'justify-start'}`} dir="ltr">
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">https://www.{domain}</span>
            </div>
            {/* Title Result */}
            <h4 className="text-lg text-blue-700 dark:text-[#8ab4f8] hover:underline font-medium cursor-pointer leading-tight">
              {recommendedTitle.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-[#bdc1c6] leading-normal pt-1">
              {t.optimizedSnippetPrefix} {city}.
            </p>

            {/* Local Map Pack Rating Badge */}
            <div className="flex items-center gap-2 pt-2 text-xs text-amber-600 dark:text-amber-300">
              <div className="flex text-amber-500 dark:text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-slate-900 dark:text-white" dir="ltr">4.9</span>
              <span className="text-slate-500 dark:text-slate-400">(128+ {t.googleReviewsIn} {city})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
