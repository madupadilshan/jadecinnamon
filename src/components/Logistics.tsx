import React from 'react';
import { motion } from 'framer-motion';
import { Ship, Plane, Box, FileCheck2, Sparkles, Anchor, Clock } from 'lucide-react';
import { TranslationSchema } from '../data/translations';

interface LogisticsProps {
  t: TranslationSchema;
}

export const Logistics: React.FC<LogisticsProps> = ({ t }) => {
  const cards = [
    {
      title: t.logistics.card1Title,
      desc: t.logistics.card1Desc,
      icon: Ship,
      tag: 'Sea Freight FCL / LCL',
    },
    {
      title: t.logistics.card2Title,
      desc: t.logistics.card2Desc,
      icon: Plane,
      tag: 'Express Air Cargo',
    },
    {
      title: t.logistics.card3Title,
      desc: t.logistics.card3Desc,
      icon: Box,
      tag: 'Vacuum & Barrier Packing',
    },
    {
      title: t.logistics.card4Title,
      desc: t.logistics.card4Desc,
      icon: FileCheck2,
      tag: 'Export Documentation',
    },
  ];

  return (
    <section
      id="logistics"
      className="py-28 relative bg-cover bg-center bg-no-repeat overflow-hidden border-t border-ceylon-500/20"
      style={{ backgroundImage: "url('/images/bg-logistics-port.jpg')" }}
    >
      {/* Increased Background Visibility with Balanced Clear Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#03140e]/85 via-black/55 to-[#03140e]/90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-ceylon-500/40 text-ceylon-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-lg">
            <Sparkles className="w-3 h-3 text-ceylon-400" />
            <span>{t.logistics.badge}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            {t.logistics.title}
          </h2>
          <p className="text-gray-100 text-sm sm:text-base leading-relaxed drop-shadow-sm">
            {t.logistics.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="glass-card p-6 rounded-2xl border border-ceylon-500/30 bg-[#062319]/85 backdrop-blur-md shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ceylon-600/50 to-jade-900 border border-ceylon-500/40 flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6 text-ceylon-300" />
                    </div>
                    <span className="text-[10px] font-bold text-jade-300 uppercase tracking-wider bg-jade-950/90 px-2 py-1 rounded border border-jade-500/40">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-ceylon-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Port of Colombo Dispatch Highlight Bar */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-ceylon-500/40 bg-gradient-to-r from-jade-950/95 via-[#062319]/90 to-jade-950/95 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-ceylon-500/25 border border-ceylon-500/50 flex items-center justify-center shrink-0 shadow-md">
              <Anchor className="w-7 h-7 text-ceylon-300" />
            </div>
            <div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Port of Colombo Hub Advantage
              </h4>
              <p className="text-xs sm:text-sm text-gray-200">
                Direct main-line ocean feeder connections to Europe (16-22 days), USA (22-28 days), and Middle East (5-8 days).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs font-semibold text-gray-100">
              <Clock className="w-4 h-4 text-ceylon-400" />
              <span>3-7 Day Loading Turnaround</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
