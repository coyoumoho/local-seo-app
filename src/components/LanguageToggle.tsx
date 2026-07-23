import React from 'react';
import { Language } from '../data/translations';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onLanguageChange }) => {
  const toggleLanguage = () => {
    onLanguageChange(currentLang === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      id="language-toggle-btn"
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer shadow-sm group"
      title={currentLang === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
    >
      <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:rotate-45 transition-transform" />
      <span className="font-sans">
        {currentLang === 'en' ? 'العربية' : 'English'}
      </span>
      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
        {currentLang === 'en' ? 'AR' : 'EN'}
      </span>
    </button>
  );
};
