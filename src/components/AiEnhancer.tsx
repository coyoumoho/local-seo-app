import React, { useState } from 'react';
import { AuditInputs } from '../types';
import { Language, translations } from '../data/translations';
import { Sparkles, Bot, Code, FileText, Key, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiEnhancerProps {
  inputs: AuditInputs;
  aiData?: any;
  onAiDataUpdate: (data: any) => void;
  lang: Language;
}

export const AiEnhancer: React.FC<AiEnhancerProps> = ({ inputs, aiData, onAiDataUpdate, lang }) => {
  const t = translations[lang];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchAiAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/seo/ai-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...inputs, lang }),
      });

      if (!res.ok) {
        throw new Error('Server returned an error.');
      }

      const json = await res.json();
      if (json.data) {
        onAiDataUpdate(json.data);
        setIsOpen(true);
      } else {
        setError(json.message || 'AI service unavailable.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Could not reach AI optimization server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20 border border-cyan-500/30 dark:border-cyan-500/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{t.aiHeaderTitle}</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t.aiHeaderDesc} ({inputs.businessName}).
            </p>
          </div>
        </div>

        <button
          onClick={aiData ? () => setIsOpen(!isOpen) : fetchAiAnalysis}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer border border-cyan-300/30 shrink-0 disabled:opacity-50 shadow-sm"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{t.generatingAiText}</span>
            </>
          ) : aiData ? (
            <>
              <span>{isOpen ? t.hideAiDetails : t.viewAiAssets}</span>
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{t.generateAiBtn}</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="text-xs text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 p-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Expanded AI Results */}
      <AnimatePresence>
        {isOpen && aiData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pt-3 border-t border-slate-200 dark:border-slate-800"
          >
            {/* AI Executive Summary */}
            {aiData.aiSummary && (
              <div className="bg-cyan-50 dark:bg-slate-950/80 border border-cyan-200 dark:border-cyan-500/30 p-4 rounded-xl text-xs text-cyan-900 dark:text-cyan-200 leading-relaxed">
                <strong className="text-slate-900 dark:text-white font-bold block mb-1">{t.aiDiagnosisTitle}</strong>
                {aiData.aiSummary}
              </div>
            )}

            {/* Generated Meta Description */}
            {aiData.metaDescription && (
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                    <FileText className="w-3.5 h-3.5 shrink-0" /> {t.metaDescTitle} ({aiData.metaDescription.length} {t.charsCount})
                  </span>
                </div>
                <p className="text-xs text-slate-900 dark:text-slate-200 font-mono bg-white dark:bg-slate-900/80 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  {aiData.metaDescription}
                </p>
              </div>
            )}

            {/* Target Keywords */}
            {aiData.keywords && Array.isArray(aiData.keywords) && (
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <Key className="w-3.5 h-3.5 shrink-0" /> {t.buyerKeywordsTitle}
                </div>
                <div className="flex flex-wrap gap-2">
                  {aiData.keywords.map((kw: string, i: number) => (
                    <span key={i} className="text-xs text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-full font-medium shadow-sm">
                      🎯 {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Schema.org JSON-LD Snippet */}
            {aiData.localSchemaSnippet && (
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                  <Code className="w-3.5 h-3.5 shrink-0" /> {t.schemaSnippetTitle}
                </div>
                <pre className="text-[11px] text-emerald-800 dark:text-emerald-300 font-mono bg-white dark:bg-slate-900/90 p-3 rounded-lg border border-slate-200 dark:border-slate-800 overflow-x-auto" dir="ltr">
                  {JSON.stringify(aiData.localSchemaSnippet, null, 2)}
                </pre>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
