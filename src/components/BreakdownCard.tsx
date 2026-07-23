import React from 'react';
import { BreakdownItem } from '../types';
import { Language, translations } from '../data/translations';
import { CheckCircle2, XCircle, AlertTriangle, Info, ShieldAlert, Target, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface BreakdownCardProps {
  breakdown: {
    lengthQuality: BreakdownItem;
    keywordIntent: BreakdownItem;
    competitorVisibility: BreakdownItem;
  };
  lang: Language;
}

export const BreakdownCard: React.FC<BreakdownCardProps> = ({ breakdown, lang }) => {
  const t = translations[lang];

  const items = [
    { ...breakdown.lengthQuality, icon: Target },
    { ...breakdown.keywordIntent, icon: Award },
    { ...breakdown.competitorVisibility, icon: ShieldAlert },
  ];

  const getStatusBadge = (status: 'pass' | 'fail' | 'warning', label: string) => {
    switch (status) {
      case 'pass':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 font-bold text-xs shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            {label}
          </span>
        );
      case 'fail':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-400 font-bold text-xs shadow-sm">
            <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
            {label}
          </span>
        );
      case 'warning':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-400 font-bold text-xs shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            {label}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <span>{t.breakdownSectionTitle}</span>
        </h3>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.breakdownSectionSubtitle}</span>
      </div>

      {/* 3 Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-slate-300 dark:hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group shadow-md dark:shadow-xl"
            >
              {/* Card Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/70 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  {getStatusBadge(item.status, item.badgeLabel)}
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Suggestions / Checklist */}
              <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl p-3 space-y-2 text-xs">
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1">
                  <Info className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" /> {t.keyActionItems}
                </div>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  {item.suggestions.map((sug, i) => (
                    <li key={i} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">•</span>
                      <span>{sug}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
