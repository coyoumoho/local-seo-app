import React, { useState, useEffect } from 'react';
import { INDUSTRIES } from '../data/industries';
import { AuditInputs } from '../types';
import { Language, translations } from '../data/translations';
import { Search, Building, Type, MapPin, Sparkles, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface InputSectionProps {
  onAnalyze: (inputs: AuditInputs) => void;
  isAnalyzing: boolean;
  initialInputs?: AuditInputs;
  lang: Language;
}

export const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isAnalyzing, initialInputs, lang }) => {
  const t = translations[lang];

  const [businessName, setBusinessName] = useState(initialInputs?.businessName || '');
  const [websiteTitle, setWebsiteTitle] = useState(initialInputs?.websiteTitle || '');
  const [industryId, setIndustryId] = useState(initialInputs?.industryId || 'roofing');
  const [city, setCity] = useState(initialInputs?.city || '');

  const selectedIndustry = INDUSTRIES.find((i) => i.id === industryId) || INDUSTRIES[0];

  useEffect(() => {
    if (initialInputs) {
      setBusinessName(initialInputs.businessName);
      setWebsiteTitle(initialInputs.websiteTitle);
      setIndustryId(initialInputs.industryId);
      setCity(initialInputs.city);
    }
  }, [initialInputs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !websiteTitle.trim()) return;

    const defaultCity = lang === 'ar' && selectedIndustry.defaultCityAr ? selectedIndustry.defaultCityAr : selectedIndustry.defaultCity;

    onAnalyze({
      businessName: businessName.trim(),
      websiteTitle: websiteTitle.trim(),
      industryId,
      city: city.trim() || defaultCity,
      lang,
    });
  };

  const handleAutofillSample = () => {
    if (lang === 'ar') {
      setBusinessName(selectedIndustry.sampleBusinessAr || selectedIndustry.sampleBusiness);
      setWebsiteTitle(selectedIndustry.sampleTitleAr || selectedIndustry.sampleTitle);
      setCity(selectedIndustry.defaultCityAr || selectedIndustry.defaultCity);
    } else {
      setBusinessName(selectedIndustry.sampleBusiness);
      setWebsiteTitle(selectedIndustry.sampleTitle);
      setCity(selectedIndustry.defaultCity);
    }
  };

  const titleLength = websiteTitle.length;
  const isOptimalTitleLen = titleLength >= 40 && titleLength <= 60;
  const isTruncated = titleLength > 60;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl p-6 sm:p-8 md:p-10 transition-colors">
      {/* Background Glows */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header Badge & Title */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse shrink-0" />
            <span>{t.instantAuditBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {t.heroHeading} <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
              {t.heroHeadingHighlight}
            </span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.heroSubheading}
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Input 1: Business Name */}
            <div>
              <label htmlFor="business-name-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                {t.businessNameLabel} <span className="text-emerald-600 dark:text-emerald-400">*</span>
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${lang === 'ar' ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400 dark:text-slate-500`}>
                  <Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400/80" />
                </div>
                <input
                  id="business-name-input"
                  type="text"
                  required
                  placeholder={lang === 'ar' ? (selectedIndustry.sampleBusinessAr || 'شركة القمة لمقاولات الأسقف') : t.businessNamePlaceholder}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className={`w-full ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm`}
                />
              </div>
            </div>

            {/* Input 2: Industry / Niche Dropdown */}
            <div>
              <label htmlFor="industry-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                {t.industryLabel} <span className="text-emerald-600 dark:text-emerald-400">*</span>
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${lang === 'ar' ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400 dark:text-slate-500`}>
                  <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400/80" />
                </div>
                <select
                  id="industry-select"
                  value={industryId}
                  onChange={(e) => setIndustryId(e.target.value)}
                  className={`w-full ${lang === 'ar' ? 'pr-10 pl-10' : 'pl-10 pr-10'} py-3 bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all cursor-pointer shadow-sm appearance-none`}
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind.id} value={ind.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      {lang === 'ar' && ind.nameAr ? ind.nameAr : ind.name}
                    </option>
                  ))}
                </select>
                <div className={`absolute inset-y-0 ${lang === 'ar' ? 'left-0 pl-3.5' : 'right-0 pr-3.5'} flex items-center pointer-events-none text-slate-400 dark:text-slate-500`}>
                  <svg className="w-4 h-4 fill-current text-slate-500 dark:text-slate-400" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Input 3: Website Title or Main Keyword */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="website-title-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {t.websiteTitleLabel} <span className="text-emerald-600 dark:text-emerald-400">*</span>
                </label>
                <span className={`text-xs font-semibold ${
                  isTruncated ? 'text-rose-600 dark:text-rose-400' : isOptimalTitleLen ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {titleLength} {t.charsCount} {isTruncated && t.tooLongMsg} {isOptimalTitleLen && t.optimalRangeMsg}
                </span>
              </div>
              <div className="relative">
                <div className={`absolute inset-y-0 ${lang === 'ar' ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400 dark:text-slate-500`}>
                  <Type className="w-4 h-4 text-emerald-600 dark:text-emerald-400/80" />
                </div>
                <input
                  id="website-title-input"
                  type="text"
                  required
                  placeholder={lang === 'ar' ? (selectedIndustry.sampleTitleAr || 'شركة القمة لمقاولات الأسقف بالرياض') : t.websiteTitlePlaceholder}
                  value={websiteTitle}
                  onChange={(e) => setWebsiteTitle(e.target.value)}
                  className={`w-full ${lang === 'ar' ? 'pr-10 pl-28' : 'pl-10 pr-28'} py-3 bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm`}
                />
                <button
                  type="button"
                  onClick={handleAutofillSample}
                  className={`absolute ${lang === 'ar' ? 'left-2' : 'right-2'} top-2 bottom-2 px-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer`}
                >
                  <RefreshCw className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  {t.fillSampleBtn}
                </button>
              </div>
            </div>

            {/* Optional City Input */}
            <div className="md:col-span-2">
              <label htmlFor="city-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                {t.cityLabel} <span className="text-slate-400 dark:text-slate-500 font-normal">{t.cityOptionalNote}</span>
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${lang === 'ar' ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400 dark:text-slate-500`}>
                  <MapPin className="w-4 h-4 text-amber-500 dark:text-amber-400/80" />
                </div>
                <input
                  id="city-input"
                  type="text"
                  placeholder={lang === 'ar' ? (selectedIndustry.defaultCityAr || 'الرياض، السعودية') : `e.g. ${selectedIndustry.defaultCity}`}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`w-full ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-sm`}
                />
              </div>
            </div>
          </div>

          {/* Glowing Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t.auditIncludesNote}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isAnalyzing}
              id="analyze-seo-score-btn"
              className="w-full sm:w-auto min-w-[260px] px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-base rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-3 cursor-pointer border border-emerald-300/30 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                  <span>{t.analyzingBtnText}</span>
                </>
              ) : (
                <>
                  <span>{t.analyzeBtnText}</span>
                  <ArrowRight className={`w-5 h-5 text-slate-950 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
};
