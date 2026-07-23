import React from 'react';
import { ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { motion } from 'motion/react';

interface UpgradeCardProps {
  onOpenUpgradeModal?: () => void;
  businessName?: string;
  lang: Language;
}

export const UpgradeCard: React.FC<UpgradeCardProps> = ({ onOpenUpgradeModal, businessName, lang }) => {
  const t = translations[lang];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/10 via-white to-cyan-500/10 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 border-2 border-emerald-500/50 p-6 sm:p-10 shadow-xl dark:shadow-[0_0_40px_rgba(16,185,129,0.15)] space-y-6 transition-colors">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Side: Callout Text */}
        <div className={`space-y-3 max-w-2xl ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-xs font-bold shadow-sm">
            <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
            <span>{t.rankDefenseBadge}</span>
          </div>

          {/* Bold Call-out Box */}
          <h3 className="text-2xl sm:text-3xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {t.seoCalloutQuote}
          </h3>

          {/* Subheadline */}
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
            {t.seoSubheadline}
          </p>

          {/* Value Bullet Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t.feature1}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t.feature2}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t.feature3}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t.feature5}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Prominent Glowing Call-To-Action Button */}
        <div className="shrink-0 flex flex-col items-center justify-center space-y-3 w-full lg:w-auto">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="https://manalnassyouss.gumroad.com/l/AutomatedMonthlyLocalSEO"
            target="_blank"
            rel="noopener noreferrer"
            id="upgrade-monthly-seo-btn"
            className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-lg sm:text-xl shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-3 cursor-pointer border border-emerald-200"
          >
            <span>{t.upgradeBtnText}</span>
            <ArrowRight className={`w-6 h-6 text-slate-950 stroke-[3] ${lang === 'ar' ? 'rotate-180' : ''}`} />
          </motion.a>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{t.cancelAnytimeGuarantee}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
