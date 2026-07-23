import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ShieldCheck, TrendingUp } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface ScoreGaugeProps {
  score: number; // 0 to 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  color: string;
  businessName: string;
  websiteTitle: string;
  lang: Language;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, grade, color, businessName, websiteTitle, lang }) => {
  const t = translations[lang];
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const increment = Math.max(1, Math.floor(score / 40));
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(start);
      }
    }, duration / (score / increment));

    return () => clearInterval(timer);
  }, [score]);

  // SVG Gauge calculations
  const radius = 80;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getScoreStatusText = (s: number) => {
    if (s >= 80) return { title: t.scoreExcellentTitle, desc: t.scoreExcellentDesc, color: 'text-emerald-600 dark:text-emerald-400' };
    if (s >= 65) return { title: t.scoreModerateTitle, desc: t.scoreModerateDesc, color: 'text-cyan-600 dark:text-cyan-400' };
    if (s >= 50) return { title: t.scoreBelowAvgTitle, desc: t.scoreBelowAvgDesc, color: 'text-amber-600 dark:text-amber-400' };
    return { title: t.scoreCriticalTitle, desc: t.scoreCriticalDesc, color: 'text-rose-600 dark:text-rose-400' };
  };

  const status = getScoreStatusText(score);

  return (
    <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl transition-colors">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Column: Animated Circular Gauge */}
      <div className="flex flex-col items-center justify-center shrink-0">
        <div className="relative w-52 h-52 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background Circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              className="stroke-slate-200 dark:stroke-slate-800"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress Circle with Glow */}
            <motion.circle
              cx="100"
              cy="100"
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              style={{
                filter: `drop-shadow(0 0 8px ${color})`,
              }}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </svg>

          {/* Inner Content */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">{t.overallScoreLabel}</span>
            <div className="flex items-baseline gap-1 my-0.5">
              <span className="text-5xl font-black tracking-tight" style={{ color }}>
                {animatedScore}
              </span>
              <span className="text-slate-400 font-bold text-lg">/100</span>
            </div>
            <span
              className="text-xs font-bold px-2.5 py-0.5 rounded-full uppercase border shadow-sm"
              style={{
                borderColor: `${color}40`,
                backgroundColor: `${color}15`,
                color: color,
              }}
            >
              {t.gradeLabel} {grade}
            </span>
          </div>
        </div>
      </div>

      {/* Column: Score Breakdown Context & Summary */}
      <div className={`flex-1 space-y-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{t.auditTargetLabel} <strong className="text-slate-900 dark:text-white">{businessName}</strong></span>
        </div>

        <div>
          <h3 className={`text-xl sm:text-2xl font-bold ${status.color}`}>
            {status.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 leading-relaxed">
            {status.desc}
          </p>
        </div>

        {/* Current Title Preview Display */}
        <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-left font-mono text-xs text-slate-800 dark:text-slate-300 overflow-x-auto" dir="ltr">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-sans font-semibold mb-1">
            {t.currentTitleEvaluated}
          </div>
          <span className="text-emerald-700 dark:text-emerald-300 font-bold">{websiteTitle}</span>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 p-2.5 rounded-xl">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">{t.searchRankRisk}</div>
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 mt-0.5">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> {t.highRisk}
            </div>
          </div>
          <div className="bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 p-2.5 rounded-xl">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">{t.mapPackRank}</div>
            <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3.5 h-3.5 shrink-0" /> {t.mapPackPositions}
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 p-2.5 rounded-xl">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">{t.estCtrLoss}</div>
            <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-0.5">
              {t.clickPenalty}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
