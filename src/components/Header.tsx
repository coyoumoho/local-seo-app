import React from 'react';
import { SearchCheck, BookmarkCheck, Zap, ShieldCheck } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle, Theme } from './ThemeToggle';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  onQuickPreset: (preset: { businessName: string; websiteTitle: string; industryId: string; city: string }) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenSaved,
  onQuickPreset,
  lang,
  onLanguageChange,
  theme,
  onThemeChange,
}) => {
  const t = translations[lang];

  const PRESETS = [
    {
      label: t.presetRoofer,
      businessName: lang === 'ar' ? 'شركة القمة لمقاولات الأسقف' : 'Apex Roofing & Restoration',
      websiteTitle: lang === 'ar' ? 'شركة القمة لمقاولات الأسقف - الرئيسية' : 'Apex Roofing - Home Page',
      industryId: 'roofing',
      city: lang === 'ar' ? 'الرياض، السعودية' : 'Dallas, TX',
    },
    {
      label: t.presetDentist,
      businessName: lang === 'ar' ? 'مجمع الابتسامة المشرقة لطب الأسنان' : 'Bright Smile Family Dentistry',
      websiteTitle: lang === 'ar' ? 'مركز الابتسامة المشرقة للعناية بالأسنان' : 'Bright Smile Dental Care Center',
      industryId: 'dentist',
      city: lang === 'ar' ? 'جدة، السعودية' : 'Austin, TX',
    },
    {
      label: t.presetPlumber,
      businessName: lang === 'ar' ? 'مؤسسة التدفق الاحترافي للسباكة' : 'ProFlow Plumbing Services',
      websiteTitle: lang === 'ar' ? 'شركة التدفق الاحترافي لخدمات السباكة' : 'ProFlow Plumbers',
      industryId: 'plumbing',
      city: lang === 'ar' ? 'الدمام، السعودية' : 'Chicago, IL',
    },
    {
      label: t.presetRealty,
      businessName: lang === 'ar' ? 'مجموعة المرفأ العقارية' : 'Harbor Coast Realty Group',
      websiteTitle: lang === 'ar' ? 'مجموعة المرفأ العقارية - التسويق العقاري' : 'Harbor Coast Realty - Real Estate Services',
      industryId: 'real-estate',
      city: lang === 'ar' ? 'دبي، الإمارات' : 'Miami, FL',
    },
  ];

  return (
    <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 dark:from-emerald-500/20 dark:to-cyan-500/20 border border-emerald-500/30 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] dark:shadow-[0_0_15px_rgba(16,185,129,0.25)] shrink-0">
            <SearchCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {t.headerTitle} <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">{t.headerSubtitle}</span>
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" /> {t.inspectorVersion}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              {t.footerRights}
            </p>
          </div>
        </div>

        {/* Quick Presets, History Button, Theme Toggle & Language Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg">
            <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">{t.quickTest}</span>
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => onQuickPreset(p)}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors px-1.5 py-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenSaved}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer shadow-sm"
          >
            <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">{t.savedAudits}</span>
            <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-full text-[11px] border border-emerald-300 dark:border-emerald-500/30">
              {savedCount}
            </span>
          </button>

          {/* Theme Switcher and Language Toggle right next to each other */}
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onThemeChange={onThemeChange} lang={lang} />
            <LanguageToggle currentLang={lang} onLanguageChange={onLanguageChange} />
          </div>
        </div>
      </div>
    </header>
  );
};
