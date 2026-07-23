import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ScoreGauge } from './components/ScoreGauge';
import { BreakdownCard } from './components/BreakdownCard';
import { TitleRecommendations } from './components/TitleRecommendations';
import { SerpPreview } from './components/SerpPreview';
import { AiEnhancer } from './components/AiEnhancer';
import { UpgradeCard } from './components/UpgradeCard';
import { UpgradeModal } from './components/UpgradeModal';
import { SavedAuditsDrawer } from './components/SavedAuditsDrawer';
import { analyzeSeoScore } from './utils/seoAnalyzer';
import { AuditInputs, AuditResult, SavedAudit } from './types';
import { INDUSTRIES } from './data/industries';
import { Language, translations } from './data/translations';
import { Theme } from './components/ThemeToggle';
import { motion, AnimatePresence } from 'motion/react';
import { SearchCheck } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');

  const [currentInputs, setCurrentInputs] = useState<AuditInputs>({
    businessName: 'Apex Roofing & Restoration',
    websiteTitle: 'Apex Roofing - Home Page',
    industryId: 'roofing',
    city: 'Dallas, TX',
    lang: 'en',
  });

  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [savedAudits, setSavedAudits] = useState<SavedAudit[]>([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Load theme, language and saved audits on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('local_seo_theme') as Theme;
      if (storedTheme === 'dark' || storedTheme === 'light') {
        setTheme(storedTheme);
        if (storedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        document.documentElement.classList.add('dark');
      }

      const storedLang = localStorage.getItem('local_seo_lang') as Language;
      if (storedLang === 'en' || storedLang === 'ar') {
        setLang(storedLang);
        document.documentElement.dir = storedLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = storedLang;
      }

      const stored = localStorage.getItem('local_seo_saved_audits');
      if (stored) {
        setSavedAudits(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse saved state', e);
    }

    const initialInputs: AuditInputs = {
      ...currentInputs,
      lang: lang,
    };
    const initial = analyzeSeoScore(initialInputs);
    setAuditResult(initial);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('local_seo_theme', newTheme);
    } catch (e) {
      console.error('Failed to save theme setting', e);
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    try {
      localStorage.setItem('local_seo_lang', newLang);
    } catch (e) {
      console.error('Failed to save language setting', e);
    }

    // Re-run current audit in new language
    const updatedInputs = { ...currentInputs, lang: newLang };
    setCurrentInputs(updatedInputs);
    const updatedResult = analyzeSeoScore(updatedInputs);
    setAuditResult(updatedResult);
  };

  const saveAuditToHistory = (result: AuditResult) => {
    const ind = INDUSTRIES.find((i) => i.id === result.inputs.industryId);
    const indName = lang === 'ar' && ind?.nameAr ? ind.nameAr : (ind?.name || 'Local Service');

    const newEntry: SavedAudit = {
      id: result.id,
      businessName: result.inputs.businessName,
      websiteTitle: result.inputs.websiteTitle,
      industryName: indName,
      overallScore: result.overallScore,
      dateStr: new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      result,
    };

    setSavedAudits((prev) => {
      const filtered = prev.filter((a) => a.websiteTitle !== result.inputs.websiteTitle);
      const updated = [newEntry, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('local_seo_saved_audits', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to persist to localStorage', e);
      }
      return updated;
    });
  };

  const handleAnalyze = (inputs: AuditInputs) => {
    setIsAnalyzing(true);
    const fullInputs = { ...inputs, lang };
    setCurrentInputs(fullInputs);

    setTimeout(() => {
      const result = analyzeSeoScore(fullInputs);
      setAuditResult(result);
      saveAuditToHistory(result);
      setIsAnalyzing(false);

      const resultsEl = document.getElementById('audit-results-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  };

  const handleQuickPreset = (preset: { businessName: string; websiteTitle: string; industryId: string; city: string }) => {
    const fullPreset = { ...preset, lang };
    setCurrentInputs(fullPreset);
    handleAnalyze(fullPreset);
  };

  const handleSelectAuditFromDrawer = (saved: SavedAudit) => {
    setCurrentInputs({ ...saved.result.inputs, lang });
    const updated = analyzeSeoScore({ ...saved.result.inputs, lang });
    setAuditResult(updated);
  };

  const handleClearSaved = () => {
    setSavedAudits([]);
    localStorage.removeItem('local_seo_saved_audits');
  };

  const handleDeleteAudit = (id: string) => {
    setSavedAudits((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem('local_seo_saved_audits', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAiDataUpdate = (aiData: any) => {
    if (auditResult) {
      setAuditResult({
        ...auditResult,
        aiData,
      });
    }
  };

  const t = translations[lang];
  const currentIndustry = INDUSTRIES.find((i) => i.id === currentInputs.industryId) || INDUSTRIES[0];
  const industryNameDisplay = lang === 'ar' && currentIndustry.nameAr ? currentIndustry.nameAr : currentIndustry.name;

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col justify-between transition-colors"
    >
      {/* Navigation Header */}
      <Header
        savedCount={savedAudits.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onQuickPreset={handleQuickPreset}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onThemeChange={handleThemeChange}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 w-full flex-1">
        {/* Input Section */}
        <InputSection
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          initialInputs={currentInputs}
          lang={lang}
        />

        {/* Dynamic Results & Analysis Section */}
        <AnimatePresence mode="wait">
          {auditResult && (
            <motion.div
              id="audit-results-section"
              key={auditResult.id + '-' + lang + '-' + theme}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Results Section Title */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {t.resultsTitle}
                  </h2>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:inline-block" dir="ltr">
                  Report ID: #{auditResult.id.substring(0, 12)}
                </span>
              </div>

              {/* 1. Visual Circular Gauge Overall Score */}
              <ScoreGauge
                score={auditResult.overallScore}
                grade={auditResult.scoreGrade}
                color={auditResult.scoreColor}
                businessName={auditResult.inputs.businessName}
                websiteTitle={auditResult.inputs.websiteTitle}
                lang={lang}
              />

              {/* 2. 3-Point Breakdown Card */}
              <BreakdownCard breakdown={auditResult.breakdown} lang={lang} />

              {/* 3. Rewritten, Highly Optimized Title Recommendations */}
              <TitleRecommendations
                recommendations={auditResult.recommendations}
                businessName={auditResult.inputs.businessName}
                industryName={industryNameDisplay}
                lang={lang}
              />

              {/* SERP Snippet Simulator Comparison */}
              <SerpPreview
                currentTitle={auditResult.inputs.websiteTitle}
                recommendedTitle={auditResult.recommendations[0]}
                businessName={auditResult.inputs.businessName}
                city={auditResult.inputs.city}
                lang={lang}
              />

              {/* Gemini AI Deep Optimization Generator */}
              <AiEnhancer
                inputs={auditResult.inputs}
                aiData={auditResult.aiData}
                onAiDataUpdate={handleAiDataUpdate}
                lang={lang}
              />

              {/* 4. Conversion & Action Section (Bottom Upgrade Card) */}
              <UpgradeCard
                onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
                businessName={auditResult.inputs.businessName}
                lang={lang}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 py-8 text-center text-xs text-slate-500 transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SearchCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-semibold text-slate-700 dark:text-slate-400">{t.footerAppTitle}</span>
            <span>• {t.footerTagline}</span>
          </div>
          <p>© {new Date().getFullYear()} {t.footerRights}</p>
        </div>
      </footer>

      {/* Upgrade Checkout Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        businessName={currentInputs.businessName}
        industryName={industryNameDisplay}
        lang={lang}
      />

      {/* Saved Audits History Drawer */}
      <SavedAuditsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedAudits={savedAudits}
        onSelectAudit={handleSelectAuditFromDrawer}
        onClearAll={handleClearSaved}
        onDeleteAudit={handleDeleteAudit}
        lang={lang}
      />
    </div>
  );
}
