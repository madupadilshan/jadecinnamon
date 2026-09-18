import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, XCircle, Award, Beaker, FileCheck, Sparkles, AlertTriangle } from 'lucide-react';
import { TranslationSchema } from '../data/translations';

interface QualitySpecsProps {
  t: TranslationSchema;
}

export const QualitySpecs: React.FC<QualitySpecsProps> = ({ t }) => {
  const certifications = [
    { title: t.quality.cert1, desc: t.quality.cert1Desc, icon: Award },
    { title: t.quality.cert2, desc: t.quality.cert2Desc, icon: FileCheck },
    { title: t.quality.cert3, desc: t.quality.cert3Desc, icon: Beaker },
    { title: t.quality.cert4, desc: t.quality.cert4Desc, icon: ShieldCheck },
  ];

  return (
    <section
      id="quality"
      className="py-28 relative bg-cover bg-center bg-no-repeat overflow-hidden border-t border-ceylon-500/20"
      style={{ backgroundImage: "url('/images/bg-quality-lab.jpg')" }}
    >
      {/* Increased Background Visibility with Balanced Clear Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#03140e]/85 via-black/55 to-[#03140e]/90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-ceylon-500/40 text-ceylon-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-lg">
            <Sparkles className="w-3 h-3 text-ceylon-400" />
            <span>{t.quality.badge}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            {t.quality.title}
          </h2>
          <p className="text-gray-100 text-sm sm:text-base leading-relaxed drop-shadow-sm">
            {t.quality.subtitle}
          </p>
        </div>

        {/* Ceylon vs Cassia Scientific Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* True Ceylon Card */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 sm:p-8 rounded-3xl border border-jade-500/50 bg-[#062319]/90 backdrop-blur-md relative overflow-hidden shadow-2xl shadow-black/80"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-jade-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-jade-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-jade-600/40 border border-jade-500/50 flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-6 h-6 text-jade-300" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {t.quality.trueCeylonTitle}
                  </h3>
                  <span className="text-xs text-jade-300 font-semibold tracking-wider uppercase">
                    SLS 81 Certified • Zero Toxicity Risk
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-jade-500/25 text-jade-300 border border-jade-500/50 text-xs font-bold shadow-sm">
                100% Safe
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-jade-500/25">
                <div className="text-xs text-gray-300 font-semibold uppercase mb-1">
                  {t.quality.coumarinMetric}
                </div>
                <div className="text-sm sm:text-base font-bold text-jade-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-jade-400 shrink-0" />
                  <span>{t.quality.coumarinCeylon}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-jade-500/25">
                <div className="text-xs text-gray-300 font-semibold uppercase mb-1">
                  {t.quality.textureMetric}
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-jade-400 shrink-0" />
                  <span>{t.quality.textureCeylon}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-jade-500/25">
                <div className="text-xs text-gray-300 font-semibold uppercase mb-1">
                  {t.quality.healthMetric}
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-jade-400 shrink-0" />
                  <span>{t.quality.healthCeylon}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cassia Adulteration Warning Card */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 sm:p-8 rounded-3xl border border-red-500/40 bg-[#062319]/90 backdrop-blur-md relative overflow-hidden shadow-2xl shadow-black/80"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/30 border border-red-500/50 flex items-center justify-center shadow-md">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {t.quality.cassiaTitle}
                  </h3>
                  <span className="text-xs text-red-300 font-semibold tracking-wider uppercase">
                    Commercial Substitute • High Coumarin
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-red-500/25 text-red-300 border border-red-500/50 text-xs font-bold shadow-sm">
                Health Risk
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-red-500/25">
                <div className="text-xs text-gray-300 font-semibold uppercase mb-1">
                  {t.quality.coumarinMetric}
                </div>
                <div className="text-sm sm:text-base font-bold text-red-300 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{t.quality.coumarinCassia}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-red-500/25">
                <div className="text-xs text-gray-300 font-semibold uppercase mb-1">
                  {t.quality.textureMetric}
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-200 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{t.quality.textureCassia}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-red-500/25">
                <div className="text-xs text-gray-300 font-semibold uppercase mb-1">
                  {t.quality.healthMetric}
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-200 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{t.quality.healthCassia}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4 Bento Certification Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="glass-card p-6 rounded-2xl border border-ceylon-500/30 bg-[#062319]/85 backdrop-blur-md shadow-xl flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-ceylon-500/25 border border-ceylon-500/40 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-ceylon-300" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-white mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
