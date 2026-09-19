import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, History, Microscope, Globe2 } from 'lucide-react';
import { TranslationSchema } from '../data/translations';
import { getAssetUrl } from '../utils/assets';

interface AboutUsProps {
  t: TranslationSchema;
}

export const AboutUs: React.FC<AboutUsProps> = ({ t }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  const pillars = [
    {
      title: t.about.heritageTitle,
      desc: t.about.heritageDesc,
      icon: History,
    },
    {
      title: t.about.craftTitle,
      desc: t.about.craftDesc,
      icon: Microscope,
    },
    {
      title: t.about.globalTitle,
      desc: t.about.globalDesc,
      icon: Globe2,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
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
      id="about"
      className="py-24 sm:py-32 relative overflow-hidden border-t border-[#E5D8C5] dark:border-ceylon-500/20 bg-[#FBF8F2] dark:bg-[#062319] scroll-mt-20 transition-colors duration-300"
    >
      {/* Parallax Background Plantation Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-110 opacity-30 dark:opacity-40 gpu-layer"
        style={{
          backgroundImage: `url('${getAssetUrl('images/bg-about-plantation.jpg')}')`,
          y: bgY,
        }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBF8F2]/90 via-[#FBF8F2]/60 to-[#FBF8F2]/95 dark:from-[#062319]/90 dark:via-black/65 dark:to-[#062319]/95 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 gpu-accelerate"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-[#E5D8C5] dark:border-ceylon-500/40 text-[#B86B1E] dark:text-ceylon-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-md">
            <Sparkles className="w-3 h-3 text-[#B86B1E] dark:text-ceylon-400" />
            <span>{t.about.badge}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#11281E] dark:text-white mb-6 tracking-tight drop-shadow-sm">
            {t.about.title}
          </h2>
          <div className="space-y-4 text-[#536B5C] dark:text-gray-200 text-sm sm:text-base leading-relaxed">
            <p>{t.about.desc1}</p>
            <p>{t.about.desc2}</p>
          </div>
        </motion.div>

        {/* 3 Pillars Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.15 }}
                className="glass-card p-6 sm:p-8 rounded-3xl border border-[rgba(200,122,40,0.35)] dark:border-ceylon-500/35 bg-white/95 dark:bg-[#0A2F22]/85 backdrop-blur-md shadow-lg dark:shadow-2xl flex flex-col justify-between group hover:border-[#C87A28]/60 dark:hover:border-amber-400/50 gpu-accelerate"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f6ecd6] to-[#ebd7ad] dark:from-ceylon-600/50 dark:to-jade-900 border border-[#C87A28]/30 dark:border-ceylon-500/50 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-7 h-7 text-[#B86B1E] dark:text-ceylon-300" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#11281E] dark:text-white mb-3 group-hover:text-[#B86B1E] dark:group-hover:text-amber-200 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#536B5C] dark:text-gray-200 leading-relaxed">
                    {pillar.desc}
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

export default AboutUs;
