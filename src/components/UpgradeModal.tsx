import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { motion, AnimatePresence } from 'motion/react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  industryName: string;
  lang: Language;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, businessName, industryName, lang }) => {
  const t = translations[lang];
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.open('https://manalnassyouss.gumroad.com/l/AutomatedMonthlyLocalSEO', '_blank', 'noopener,noreferrer');
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-900 dark:text-white transition-colors"
        >
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-5 ${lang === 'ar' ? 'left-5' : 'right-5'} w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer`}
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div className="space-y-6">
              {/* Modal Header */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.rankDefenseBadge}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {t.modalTitle}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
                  {t.modalSubtext} ({businessName || 'Your Business'}).
                </p>
              </div>

              {/* Price Tag Box */}
              <div className="bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">{t.modalTitle}</div>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">$49</span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">{t.pricingMonthly}</span>
                  </div>
                </div>
                <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
                  {t.pricingTag}
                </span>
              </div>

              {/* What's Included */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t.whatsIncludedTitle}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t.feature1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t.feature2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t.feature3}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t.feature4}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t.feature5}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t.feature6}</span>
                  </div>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSubscribe} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    {t.ownerEmailLabel} <span className="text-emerald-600 dark:text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="owner@yourbusiness.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    {t.ownerPhoneLabel}
                  </label>
                  <input
                    type="tel"
                    placeholder="+966 50 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-base rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>{t.startingAutoBtn}</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-slate-950 shrink-0" />
                      <span>{t.startMonthlyAutoBtn}</span>
                    </>
                  )}
                </button>
              </form>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t.cancelAnytimeGuarantee}</span>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{t.successModalTitle}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-md mx-auto">
                  {t.successModalSubtext} (<strong className="text-emerald-600 dark:text-emerald-400">{email}</strong>).
                </p>
              </div>

              <div className={`bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-xs text-slate-600 dark:text-slate-400 text-left space-y-1.5 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="font-bold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider">{t.nextStepsTitle}</div>
                <div>{t.nextStep1}</div>
                <div>{t.nextStep2}</div>
                <div>{t.nextStep3}</div>
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-3 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all border border-slate-800 dark:border-slate-700 cursor-pointer shadow-sm"
              >
                {t.backToScorecardBtn}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
