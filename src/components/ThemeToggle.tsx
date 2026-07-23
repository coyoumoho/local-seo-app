import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Language } from '../data/translations';

export type Theme = 'dark' | 'light';

interface ThemeToggleProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  lang: Language;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onThemeChange, lang }) => {
  const toggleTheme = () => {
    onThemeChange(theme === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      id="theme-toggle-btn"
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-sm group ${
        isDark
          ? 'bg-slate-900 border-slate-700 hover:border-amber-500/50 text-slate-200 hover:bg-slate-800/80'
          : 'bg-white border-slate-200 hover:border-amber-500/50 text-slate-700 hover:bg-slate-50'
      }`}
      title={
        lang === 'ar'
          ? isDark
            ? 'التحويل إلى الوضع الفاتح'
            : 'التحويل إلى الوضع الداكن'
          : isDark
          ? 'Switch to Light Mode'
          : 'Switch to Dark Mode'
      }
    >
      {isDark ? (
        <Sun className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-90 transition-transform" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-indigo-600 group-hover:-rotate-12 transition-transform" />
      )}
      <span>{isDark ? (lang === 'ar' ? 'فاتح' : 'Light') : (lang === 'ar' ? 'داكن' : 'Dark')}</span>
    </button>
  );
};
