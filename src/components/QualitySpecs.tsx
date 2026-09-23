import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, CheckCircle2, XCircle, Award, Beaker, FileCheck, AlertTriangle } from 'lucide-react';
import { TranslationSchema } from '../data/translations';
import { getAssetUrl } from '../utils/assets';

interface QualitySpecsProps {
  t: TranslationSchema;
}

export const QualitySpecs: React.FC<QualitySpecsProps> = ({ t }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  const certifications = [
    { title: t.quality.cert1, desc: t.quality.cert1Desc, icon: Award },
    { title: t.quality.cert2, desc: t.quality.cert2Desc, icon: FileCheck },
    { title: t.quality.cert3, desc: t.quality.cert3Desc, icon: Beaker },
    { title: t.quality.cert4, desc: t.quality.cert4Desc, icon: ShieldCheck },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="quality"
      className="py-20 sm:py-28 relative overflow-hidden border-t border-[#C87A28]/20 dark:border-[#C87A28]/30 bg-[#FBF8F2] dark:bg-[#062319] scroll-mt-20 transition-colors duration-300"
    >
      {/* Parallax Background Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-110 opacity-30 dark:opacity-40 gpu-layer"
        style={{
          backgroundImage: `url('${getAssetUrl('images/gallery-distillation.webp')}')`,
          y: bgY,
        }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBF8F2]/90 via-[#FBF8F2]/65 to-[#FBF8F2]/95 dark:from-[#062319]/90 dark:via-black/60 dark:to-[#062319]/95 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 gpu-accelerate"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-4 tracking-tight drop-shadow-sm">
            {t.quality.title}
          </h2>
          <p className="text-[#3B4D43] dark:text-[#D1DDD5] text-sm sm:text-base leading-relaxed">
            {t.quality.subtitle}
          </p>
        </motion.div>

        {/* Ceylon vs Cassia Scientific Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-14 sm:mb-16">
          {/* True Ceylon Card */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.15 }}
            className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-600/30 dark:border-jade-500/50 bg-white/95 dark:bg-[#0A2F22]/90 backdrop-blur-md relative overflow-hidden shadow-lg dark:shadow-2xl dark:shadow-black/80 gpu-accelerate"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 dark:bg-jade-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#C87A28]/20 dark:border-jade-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-jade-600/40 border border-emerald-600/30 dark:border-jade-500/50 flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-6 h-6 text-emerald-700 dark:text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#11281E] dark:text-[#F9F6F0]">
                    {t.quality.trueCeylonTitle}
                  </h3>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider uppercase">
                    SLS 187 & ISO 3524 Certified • 75%–85% Eugenol
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-jade-500/25 text-emerald-800 dark:text-emerald-300 border border-emerald-600/30 dark:border-jade-500/50 text-xs font-bold shadow-sm">
                100% Pure
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F4EFE6] dark:bg-black/40 border border-[#C87A28]/20 dark:border-jade-500/25">
                <div className="text-xs text-[#5A6D62] dark:text-[#A3B899] font-semibold uppercase mb-1">
                  {t.quality.coumarinMetric}
                </div>
                <div className="text-sm sm:text-base font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span>{t.quality.coumarinCeylon}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F4EFE6] dark:bg-black/40 border border-[#C87A28]/20 dark:border-jade-500/25">
                <div className="text-xs text-[#5A6D62] dark:text-[#A3B899] font-semibold uppercase mb-1">
                  {t.quality.textureMetric}
                </div>
                <div className="text-sm sm:text-base font-bold text-[#11281E] dark:text-[#F9F6F0] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span>{t.quality.textureCeylon}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F4EFE6] dark:bg-black/40 border border-[#C87A28]/20 dark:border-jade-500/25">
                <div className="text-xs text-[#5A6D62] dark:text-[#A3B899] font-semibold uppercase mb-1">
                  {t.quality.healthMetric}
                </div>
                <div className="text-sm sm:text-base font-bold text-[#11281E] dark:text-[#F9F6F0] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span>{t.quality.healthCeylon}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cassia Adulteration Warning Card */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.15 }}
            className="glass-card p-6 sm:p-8 rounded-3xl border border-red-300 dark:border-red-500/40 bg-white/95 dark:bg-[#0A2F22]/90 backdrop-blur-md relative overflow-hidden shadow-lg dark:shadow-2xl dark:shadow-black/80 gpu-accelerate"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 dark:bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#C87A28]/20 dark:border-red-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/30 border border-red-300 dark:border-red-500/50 flex items-center justify-center shadow-md">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#11281E] dark:text-[#F9F6F0]">
                    {t.quality.cassiaTitle}
                  </h3>
                  <span className="text-xs text-red-700 dark:text-red-300 font-semibold tracking-wider uppercase">
                    Synthetic Blend • High Chemical Solvents
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-red-50 dark:bg-red-500/25 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500/50 text-xs font-bold shadow-sm">
                Adulterated
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F4EFE6] dark:bg-black/40 border border-[#C87A28]/20 dark:border-red-500/25">
                <div className="text-xs text-[#5A6D62] dark:text-[#A3B899] font-semibold uppercase mb-1">
                  {t.quality.coumarinMetric}
                </div>
                <div className="text-sm sm:text-base font-bold text-red-700 dark:text-red-300 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                  <span>{t.quality.coumarinCassia}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F4EFE6] dark:bg-black/40 border border-[#C87A28]/20 dark:border-red-500/25">
                <div className="text-xs text-[#5A6D62] dark:text-[#A3B899] font-semibold uppercase mb-1">
                  {t.quality.textureMetric}
                </div>
                <div className="text-sm sm:text-base font-bold text-[#11281E] dark:text-[#F9F6F0] flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                  <span>{t.quality.textureCassia}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F4EFE6] dark:bg-black/40 border border-[#C87A28]/20 dark:border-red-500/25">
                <div className="text-xs text-[#5A6D62] dark:text-[#A3B899] font-semibold uppercase mb-1">
                  {t.quality.healthMetric}
                </div>
                <div className="text-sm sm:text-base font-bold text-[#11281E] dark:text-[#F9F6F0] flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                  <span>{t.quality.healthCassia}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4 Bento Certification Matrix with Viewport Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.15 }}
                className="glass-card p-6 rounded-2xl border border-[#C87A28]/20 dark:border-[#C87A28]/30 bg-white/95 dark:bg-[#0A2F22]/85 backdrop-blur-md shadow-lg dark:shadow-xl flex flex-col justify-between group hover:border-[#C87A28]/60 dark:hover:border-amber-400/50 gpu-accelerate"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f6ecd6] dark:bg-ceylon-500/25 border border-[#C87A28]/30 dark:border-ceylon-500/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-6 h-6 text-[#9E5714] dark:text-[#E59A4D]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#11281E] dark:text-[#F9F6F0] mb-2 group-hover:text-[#9E5714] dark:group-hover:text-[#E59A4D] transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#3B4D43] dark:text-[#D1DDD5] leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default QualitySpecs;
