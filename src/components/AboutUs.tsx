import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, History, Microscope, Globe2 } from 'lucide-react';
import { TranslationSchema } from '../data/translations';

interface AboutUsProps {
  t: TranslationSchema;
}

export const AboutUs: React.FC<AboutUsProps> = ({ t }) => {
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

  return (
    <section
      id="about"
      className="py-28 relative bg-cover bg-center bg-no-repeat overflow-hidden border-t border-ceylon-500/20"
      style={{ backgroundImage: "url('/images/bg-about-plantation.jpg')" }}
    >
      {/* Increased Background Visibility with Balanced Clear Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#03140e]/85 via-black/60 to-[#03140e]/90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-ceylon-500/40 text-ceylon-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-lg">
            <Sparkles className="w-3 h-3 text-ceylon-400" />
            <span>{t.about.badge}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            {t.about.title}
          </h2>
          <div className="space-y-4 text-gray-100 text-sm sm:text-base leading-relaxed drop-shadow-sm">
            <p>{t.about.desc1}</p>
            <p className="text-gray-200">{t.about.desc2}</p>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="glass-card p-6 sm:p-8 rounded-3xl border border-ceylon-500/35 bg-[#062319]/85 backdrop-blur-md shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ceylon-600/50 to-jade-900 border border-ceylon-500/50 flex items-center justify-center mb-6 shadow-md">
                    <Icon className="w-7 h-7 text-ceylon-300" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {pillar.desc}
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
