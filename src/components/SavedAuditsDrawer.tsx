import React from 'react';
import { SavedAudit } from '../types';
import { Language, translations } from '../data/translations';
import { X, Trash2, ArrowUpRight, SearchCheck, BookmarkCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SavedAuditsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedAudits: SavedAudit[];
  onSelectAudit: (audit: SavedAudit) => void;
  onClearAll: () => void;
  onDeleteAudit: (id: string) => void;
  lang: Language;
}

export const SavedAuditsDrawer: React.FC<SavedAuditsDrawerProps> = ({
  isOpen,
  onClose,
  savedAudits,
  onSelectAudit,
  onClearAll,
  onDeleteAudit,
  lang,
}) => {
  const t = translations[lang];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={`fixed inset-0 z-50 flex ${lang === 'ar' ? 'justify-start' : 'justify-end'} bg-slate-950/80 backdrop-blur-sm`}>
        <motion.div
          initial={{ x: lang === 'ar' ? '-100%' : '100%' }}
          animate={{ x: 0 }}
          exit={{ x: lang === 'ar' ? '-100%' : '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`w-full max-w-md bg-white dark:bg-slate-900 ${lang === 'ar' ? 'border-r' : 'border-l'} border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between p-6 shadow-2xl text-slate-900 dark:text-white overflow-hidden transition-colors`}
        >
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{t.drawerTitle}</h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t.drawerSubtitle}
            </p>
          </div>

          {/* Audit List */}
          <div className="flex-1 my-4 overflow-y-auto space-y-3 pr-1">
            {savedAudits.length === 0 ? (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <SearchCheck className="w-10 h-10 mx-auto text-slate-400 dark:text-slate-700" />
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">{t.noAuditsYet}</p>
                <p className="text-[11px] text-slate-500">{t.runAuditNote}</p>
              </div>
            ) : (
              savedAudits.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl p-4 transition-all group relative space-y-2 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.businessName}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate max-w-[200px]" dir="ltr">
                        {item.websiteTitle}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-base font-black text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-300 dark:border-emerald-500/20">
                        {item.overallScore}/100
                      </span>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{item.dateStr}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                      {item.industryName}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onDeleteAudit(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                        title="Delete Audit"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onSelectAudit(item);
                          onClose();
                        }}
                        className="flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                      >
                        <span>{t.loadScorecardBtn}</span>
                        <ArrowUpRight className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {savedAudits.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">{savedAudits.length} {t.auditsSaved}</span>
              <button
                onClick={onClearAll}
                className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> {t.clearAllHistory}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
