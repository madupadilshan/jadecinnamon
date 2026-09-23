import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { TranslationSchema } from '../../data/translations';

export interface HeroMetricsProps {
  t: TranslationSchema;
}

export const HeroMetrics: React.FC<HeroMetricsProps> = ({ t }) => {
  const statItems = [
    { value: t.hero.statCoumarin, label: t.hero.statCoumarinLabel, highlight: t.hero.statCoumarinHighlight || 'Antioxidant Active' },
    { value: t.hero.statMoisture, label: t.hero.statMoistureLabel, highlight: t.hero.statMoistureHighlight || '0% Preservatives' },
    { value: t.hero.statOrigin, label: t.hero.statOriginLabel, highlight: t.hero.statOriginHighlight || 'SLS 187 / ISO 3524' },
    { value: t.hero.statFob, label: t.hero.statFobLabel, highlight: t.hero.statFobHighlight || 'Port of Colombo' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
      {statItems.map((stat, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.15 }}
          className="p-4 sm:p-5 rounded-2xl text-center flex flex-col justify-center items-center relative group bg-white dark:bg-[#0A2F22] border border-[#E2D8C8] dark:border-[#C87A28]/25 shadow-md dark:shadow-xl backdrop-blur-md gpu-accelerate"
        >
          {/* Metric Titles (e.g. "< 0.004%", "FOB / CIF") */}
          <div className="text-2xl sm:text-3xl font-bold font-serif text-[#9E5714] dark:text-[#E5A855] mb-1">
            {stat.value}
          </div>

          {/* Card Body Text & Subtitles (High Contrast on Light & Dark Cards) */}
          <div className="text-[#2D3E33] dark:text-[#E2EBE5] font-medium text-xs sm:text-sm mb-1.5 leading-snug">
            {stat.label}
          </div>

          {/* Micro-Badges & Bullet Checkmarks */}
          <div className="text-[#1E4D32] dark:text-[#A7D8BA] font-semibold text-[11px] sm:text-xs flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#156B3A] dark:text-[#38D377] shrink-0" />
            <span>{stat.highlight}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroMetrics;
