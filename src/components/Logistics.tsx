import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Ship,
  Plane,
  Box,
  FileCheck2,
  Anchor,
  Clock,
  Award,
  ShieldCheck,
  TreePine,
  Activity,
  CheckCircle2,
  Globe2,
} from 'lucide-react';
import { LanguageCode, TranslationSchema } from '../data/translations';
import { getAssetUrl } from '../utils/assets';

// 7-Language Multilingual Dictionary with Safe Fallbacks
export const whyChooseUsText = {
  en: {
    badge: 'Export & Logistics Authority',
    title: 'Why Choose Jade Cinnamon Lanka',
    originTitle: '100% Pure Ceylon Origin',
    originDesc: 'Authentic Cinnamomum verum sourced exclusively from southern Sri Lankan estates.',
    certTitle: 'Certified Quality (ISO 6539 & SLS)',
    certDesc: 'Rigorous laboratory testing ensuring international export compliance and purity.',
    sourcingTitle: 'Direct Plantation Sourcing',
    sourcingDesc: 'Traceable single-origin supply chain guaranteeing batch consistency and freshness.',
    coumarinTitle: 'Coumarin-Safe (<0.004%)',
    coumarinDesc: 'Naturally non-toxic, safe for daily consumer and pharmaceutical applications.',
  },
  si: {
    badge: 'අපනයන සහ සැපයුම් ප්‍රමිතිය',
    title: 'අප තෝරාගත යුත්තේ ඇයි?',
    originTitle: '100% සැබෑ ලංකා කුරුඳු',
    originDesc: 'ශ්‍රී ලංකාවේ දකුණු පළාතෙන් සෘජුවම ලබාගන්නා උසස්ම කුරුඳු.',
    certTitle: 'ජාත්‍යන්තර ප්‍රමිති සහතික (ISO 6539)',
    certDesc: 'ජාත්‍යන්තර අපනයන තත්ත්ව පරීක්ෂාවන්ගෙන් සමත් පිරිසිදු නිෂ්පාදන.',
    sourcingTitle: 'වතුයායෙන් සෘජුවම',
    sourcingDesc: 'මැදිහත්කරුවන්ගෙන් තොරව, ගුණාත්මකභාවය සුරකිමින් ලබාදීම.',
    coumarinTitle: 'ආරක්ෂිත කුමරින් ප්‍රතිශතය (<0.004%)',
    coumarinDesc: 'දෛනික භාවිතයට වඩාත් සුදුසු සෞඛ්‍යාරක්ෂිත සැබෑ කුරුඳු.',
  },
  ta: {
    badge: 'ஏற்றுமதி மற்றும் தளவாடங்கள்',
    title: 'ஏன் எங்களை தேர்வு செய்ய வேண்டும்?',
    originTitle: '100% தூய சிலோன் இலவங்கப்பட்டை',
    originDesc: 'தென் மாகாணத்திலிருந்து நேரடியாக பெறப்பட்ட தூய தரம்.',
    certTitle: 'சான்றளிக்கப்பட்ட தரம் (ISO 6539)',
    certDesc: 'சர்வதேச தர பரிசோதனைகளுக்கு உட்பட்ட ஏற்றுமதி தரம்.',
    sourcingTitle: 'நேரடி பண்ணை விநியோகம்',
    sourcingDesc: 'நிலையான விநியோகம் மற்றும் தூய்மை உத்தரவாதம்.',
    coumarinTitle: 'கூமரின்-பாதுகாப்பானது (<0.004%)',
    coumarinDesc: 'பாதுகாப்பான மற்றும் ஆரோக்கியமான பயன்பாடு.',
  },
  ar: {
    badge: 'سلطة التصدير والخدمات اللوجستية',
    title: 'لماذا تختار جيد سينامون لانكا؟',
    originTitle: 'أصل سيلاني نقي 100٪',
    originDesc: 'قرفة سيلانية حقيقية يتم الحصول عليها مباشرة من مزارع سريلانكا الجنوبية.',
    certTitle: 'جودة معتمدة (ISO 6539 & SLS)',
    certDesc: 'فحوصات مخبرية صارمة لضمان الامتثال لمعايير التصدير الدولية.',
    sourcingTitle: 'توريد مباشر من المزارع',
    sourcingDesc: 'سلسلة توريد موثوقة تضمن ثبات الدفعات ونقاء التوابل.',
    coumarinTitle: 'آمن وخالٍ من الكومارين (<0.004%)',
    coumarinDesc: 'قرفة طبيعية نقية آمنة للاستهلاك اليومي والأدوية.',
  },
  de: {
    badge: 'Export & Logistik',
    title: 'Warum Jade Cinnamon Lanka wählen?',
    originTitle: '100% Reiner Ceylon-Zimt',
    originDesc: 'Authentischer Cinnamomum verum aus den südlichen Plantagen Sri Lankas.',
    certTitle: 'Zertifizierte Qualität (ISO 6539)',
    certDesc: 'Laborgeprüfte Reinheit gemäß internationalen Exportstandards.',
    sourcingTitle: 'Direktbeschaffung von Plantagen',
    sourcingDesc: 'Rückverfolgbare Lieferkette für gleichbleibende Frische und Qualität.',
    coumarinTitle: 'Cumarin-Sicher (<0.004%)',
    coumarinDesc: 'Natürlich unbedenklich für den täglichen Verzehr und Pharmaanwendungen.',
  },
  fr: {
    badge: 'Exportation et Logistique',
    title: 'Pourquoi Choisir Jade Cinnamon Lanka',
    originTitle: '100% Véritable Cannelle de Ceylan',
    originDesc: 'Authentique Cinnamomum verum récolté dans le sud du Sri Lanka.',
    certTitle: 'Qualité Certifiée (ISO 6539 & SLS)',
    certDesc: 'Tests en laboratoire conformes aux normes internationales d’exportation.',
    sourcingTitle: 'Approvisionnement Direct des Plantations',
    sourcingDesc: 'Traçabilité complète garantissant fraîcheur et uniformité.',
    coumarinTitle: 'Sans Danger en Coumarine (<0.004%)',
    coumarinDesc: 'Parfaitement sûr pour la consommation quotidienne et l’agroalimentaire.',
  },
  es: {
    badge: 'Autoridad de Exportación y Logística',
    title: '¿Por Qué Elegir Jade Cinnamon Lanka?',
    originTitle: '100% Origen Puro de Ceilán',
    originDesc: 'Cinnamomum verum auténtico de las plantaciones del sur de Sri Lanka.',
    certTitle: 'Calidad Certificada (ISO 6539)',
    certDesc: 'Rigurosas pruebas de laboratorio para exportación mundial.',
    sourcingTitle: 'Suministro Directo de Plantación',
    sourcingDesc: 'Cadena de suministro trazable que garantiza máxima frescura.',
    coumarinTitle: 'Seguro en Cumarina (<0.004%)',
    coumarinDesc: 'Seguro y saludable para consumo diario e industrial.',
  },
};

export interface LogisticsWhyChooseUsProps {
  currentLang?: LanguageCode | string;
  isRtl?: boolean;
  t?: TranslationSchema;
}

// Named export for Why Choose Us Sub-Component
export const LogisticsWhyChooseUs: React.FC<LogisticsWhyChooseUsProps> = ({
  currentLang = 'en',
}) => {
  const langKey = (currentLang || 'en') as keyof typeof whyChooseUsText;
  const content = whyChooseUsText[langKey] || whyChooseUsText.en;

  return (
    <div className="relative w-full mb-14 sm:mb-18">
      {/* Sub-Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 gpu-accelerate"
      >
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-4 tracking-tight drop-shadow-sm">
          {content.title}
        </h2>
      </motion.div>

      {/* 4 Core Export Value Pillars Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Pillar 1: 100% Pure Ceylon Origin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-7 rounded-3xl p-5 sm:p-8 md:p-9 bg-white/95 dark:bg-[#0A2F22]/90 border border-[#C87A28]/20 dark:border-[#C87A28]/30 hover:border-[#C87A28]/60 dark:hover:border-ceylon-400/60 shadow-lg dark:shadow-2xl dark:shadow-black/80 flex flex-col justify-between overflow-hidden group gpu-accelerate backdrop-blur-md"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
            <Award className="w-48 h-48 text-[#C87A28] dark:text-amber-200" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f6ecd6] dark:bg-[#C87A28]/20 border border-[#C87A28]/30 dark:border-[#C87A28]/40 flex items-center justify-center text-[#9E5714] dark:text-[#E59A4D] shadow-md">
                <Award className="w-6 h-6 sm:w-7 sm:h-7 text-[#9E5714] dark:text-[#E59A4D]" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-jade-950/90 border border-emerald-600/30 dark:border-jade-400/40 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                Cinnamomum Verum
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-3 group-hover:text-[#9E5714] dark:group-hover:text-[#E59A4D] transition-colors">
              {content.originTitle}
            </h3>
            <p className="text-[#3B4D43] dark:text-[#D1DDD5] text-xs sm:text-sm md:text-base leading-relaxed mb-6">
              {content.originDesc} Sourced exclusively from private estates across Galle, Matara, and Ratnapura in Sri Lanka.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-4 border-t border-[#C87A28]/20 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs text-[#11281E] dark:text-[#F9F6F0]">
                <CheckCircle2 className="w-4 h-4 text-[#9E5714] dark:text-[#E59A4D] shrink-0" />
                <span>Soft, layered pencil-thin quills</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#11281E] dark:text-[#F9F6F0]">
                <CheckCircle2 className="w-4 h-4 text-[#9E5714] dark:text-[#E59A4D] shrink-0" />
                <span>Sweet, delicate aromatic profile</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#11281E] dark:text-[#F9F6F0]">
                <CheckCircle2 className="w-4 h-4 text-[#9E5714] dark:text-[#E59A4D] shrink-0" />
                <span>Zero Cassia adulteration guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#11281E] dark:text-[#F9F6F0]">
                <CheckCircle2 className="w-4 h-4 text-[#9E5714] dark:text-[#E59A4D] shrink-0" />
                <span>Southern coastal terroir harvest</span>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 pt-4 border-t border-[#C87A28]/20 dark:border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#9E5714] dark:text-[#E59A4D]">
            <span>Sri Lanka EDB Verified Origin</span>
            <span className="text-[#5A6D62] dark:text-[#A3B899]">Direct Port of Colombo Export</span>
          </div>
        </motion.div>

        {/* Pillar 2: Certified Export Quality */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="relative lg:col-span-5 rounded-3xl p-5 sm:p-8 md:p-9 bg-white/95 dark:bg-[#0A2F22]/90 border border-[#C87A28]/20 dark:border-[#C87A28]/30 hover:border-[#C87A28]/60 dark:hover:border-ceylon-400/60 shadow-lg dark:shadow-2xl dark:shadow-black/80 flex flex-col justify-between overflow-hidden group gpu-accelerate backdrop-blur-md"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-50 dark:bg-jade-900/60 border border-emerald-600/30 dark:border-jade-400/40 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shadow-md">
                <FileCheck2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-700 dark:text-emerald-400" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#f6ecd6] dark:bg-black/60 border border-[#C87A28]/20 dark:border-white/10 text-[#9E5714] dark:text-[#E59A4D] text-xs font-mono font-bold">
                ISO & SLS Accredited
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-3 group-hover:text-[#9E5714] dark:group-hover:text-[#E59A4D] transition-colors">
              {content.certTitle}
            </h3>
            <p className="text-[#3B4D43] dark:text-[#D1DDD5] text-xs sm:text-sm leading-relaxed mb-6">
              {content.certDesc}
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-[#F4EFE6] dark:bg-black/50 border border-[#C87A28]/20 dark:border-white/10">
                <div className="text-xs font-bold text-[#11281E] dark:text-[#F9F6F0]">ISO 6539:2014</div>
                <div className="text-[10px] text-[#5A6D62] dark:text-[#A3B899]">Global Spice Standard</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F4EFE6] dark:bg-black/50 border border-[#C87A28]/20 dark:border-white/10">
                <div className="text-xs font-bold text-[#11281E] dark:text-[#F9F6F0]">SLS 81:2000</div>
                <div className="text-[10px] text-[#5A6D62] dark:text-[#A3B899]">National Standard</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F4EFE6] dark:bg-black/50 border border-[#C87A28]/20 dark:border-white/10">
                <div className="text-xs font-bold text-[#11281E] dark:text-[#F9F6F0]">USDA Organic</div>
                <div className="text-[10px] text-[#5A6D62] dark:text-[#A3B899]">Bio-Certified Batches</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F4EFE6] dark:bg-black/50 border border-[#C87A28]/20 dark:border-white/10">
                <div className="text-xs font-bold text-[#11281E] dark:text-[#F9F6F0]">GMP & HACCP</div>
                <div className="text-[10px] text-[#5A6D62] dark:text-[#A3B899]">Food Safety Compliant</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#C87A28]/20 dark:border-white/5 text-[11px] text-[#5A6D62] dark:text-[#A3B899] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span>Full Certificate of Analysis (COA) per batch</span>
          </div>
        </motion.div>

        {/* Pillar 3: Direct Plantation Sourcing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
          className="relative lg:col-span-5 rounded-3xl p-5 sm:p-8 md:p-9 bg-white/95 dark:bg-[#0A2F22]/90 border border-[#C87A28]/20 dark:border-[#C87A28]/30 hover:border-[#C87A28]/60 dark:hover:border-ceylon-400/60 shadow-lg dark:shadow-2xl dark:shadow-black/80 flex flex-col justify-between overflow-hidden group gpu-accelerate backdrop-blur-md"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f6ecd6] dark:bg-[#C87A28]/20 border border-[#C87A28]/30 dark:border-[#C87A28]/40 flex items-center justify-center text-[#9E5714] dark:text-[#E59A4D] shadow-md">
                <TreePine className="w-6 h-6 sm:w-7 sm:h-7 text-[#9E5714] dark:text-[#E59A4D]" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-black/60 border border-emerald-600/30 dark:border-white/10 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold">
                Single Estate Chain
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-3 group-hover:text-[#9E5714] dark:group-hover:text-[#E59A4D] transition-colors">
              {content.sourcingTitle}
            </h3>
            <p className="text-[#3B4D43] dark:text-[#D1DDD5] text-xs sm:text-sm leading-relaxed mb-6">
              {content.sourcingDesc} Direct fair-trade partnerships with master cinnamon-peeling artisans.
            </p>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F4EFE6] dark:bg-black/40 border border-[#C87A28]/20 dark:border-white/5 text-xs text-[#11281E] dark:text-[#F9F6F0]">
                <span className="text-[#5A6D62] dark:text-[#A3B899]">Annual Harvest Capacity:</span>
                <span className="font-bold text-[#9E5714] dark:text-[#E59A4D] font-mono">1,200+ Metric Tons</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F4EFE6] dark:bg-black/40 border border-[#C87A28]/20 dark:border-white/5 text-xs text-[#11281E] dark:text-[#F9F6F0]">
                <span className="text-[#5A6D62] dark:text-[#A3B899]">Handcrafted Layering:</span>
                <span className="font-bold text-[#11281E] dark:text-[#F9F6F0]">Generational Peelers</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#C87A28]/20 dark:border-white/5 text-[11px] text-[#5A6D62] dark:text-[#A3B899] flex items-center gap-1.5">
            <Globe2 className="w-4 h-4 text-[#9E5714] dark:text-[#E59A4D] shrink-0" />
            <span>Direct estate-to-port export supply line</span>
          </div>
        </motion.div>

        {/* Pillar 4: Ultra-Low Coumarin (<0.004%) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative lg:col-span-7 rounded-3xl p-5 sm:p-8 md:p-9 bg-white/95 dark:bg-[#0A2F22]/90 border border-[#C87A28]/20 dark:border-[#C87A28]/30 hover:border-[#C87A28]/60 dark:hover:border-ceylon-400/60 shadow-lg dark:shadow-2xl dark:shadow-black/80 flex flex-col justify-between overflow-hidden group gpu-accelerate backdrop-blur-md"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-50 dark:bg-jade-900/60 border border-emerald-600/30 dark:border-jade-400/40 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shadow-md">
                <Activity className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-700 dark:text-emerald-400" />
              </div>
              <div className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-600/40 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span>Health & Safety Verified</span>
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-3 group-hover:text-[#9E5714] dark:group-hover:text-[#E59A4D] transition-colors">
              {content.coumarinTitle}
            </h3>

            <p className="text-[#3B4D43] dark:text-[#D1DDD5] text-xs sm:text-sm md:text-base leading-relaxed mb-6">
              {content.coumarinDesc} Unlike cheap Cassia cinnamon which contains up to 1.0% toxic coumarin causing hepatic strain, Ceylon Cinnamon is non-toxic and medically safe.
            </p>

            <div className="p-4 rounded-2xl bg-[#F4EFE6] dark:bg-black/60 border border-[#C87A28]/20 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Jade Pure Ceylon Cinnamon:</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">&lt; 0.004% Coumarin (Safe)</span>
              </div>
              <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="w-[1%] h-full bg-emerald-500 dark:bg-emerald-400 rounded-full" />
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-black/5 dark:border-white/5">
                <span className="text-[#5A6D62] dark:text-[#A3B899]">Cassia Cinnamon (Adulterant):</span>
                <span className="font-mono text-red-600 dark:text-red-400">Up to 1.000% Coumarin (Toxic)</span>
              </div>
              <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="w-[100%] h-full bg-red-500/80 rounded-full" />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#C87A28]/20 dark:border-white/5 text-[11px] text-[#5A6D62] dark:text-[#A3B899] flex flex-wrap items-center justify-between gap-2">
            <span>EU & US FDA Dietary Compliance Approved</span>
            <span className="text-[#9E5714] dark:text-[#E59A4D] font-mono">1,250x Safer Than Cassia</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export interface LogisticsProps {
  t: TranslationSchema;
  currentLang?: LanguageCode;
  isRtl?: boolean;
}

export const Logistics: React.FC<LogisticsProps> = ({ t, currentLang = 'en', isRtl = false }) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Framer Motion Scroll Progress for Parallax Background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

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
      id="logistics"
      className="relative w-full py-20 sm:py-28 overflow-hidden border-t border-[#C87A28]/20 dark:border-[#C87A28]/30 bg-[#FBF8F2] dark:bg-[#062319] scroll-mt-20 transition-colors duration-300"
    >
      {/* Parallax Background Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-110 opacity-30 dark:opacity-40 gpu-layer"
        style={{
          backgroundImage: `url('${getAssetUrl('images/gallery-shipping.webp')}')`,
          y: bgY,
        }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBF8F2]/95 via-[#FBF8F2]/70 to-[#FBF8F2]/95 dark:from-[#062319]/95 dark:via-black/70 dark:to-[#062319]/95 pointer-events-none" />

      {/* Ambient Focal Lighting Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[450px] bg-[#C87A28]/10 dark:bg-ceylon-600/10 rounded-full blur-[140px] mix-blend-screen gpu-layer" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-emerald-600/5 dark:bg-jade-600/10 rounded-full blur-[130px] mix-blend-screen gpu-layer" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section 1: Multilingual 4-Card Export Authority Bento Grid */}
        <LogisticsWhyChooseUs currentLang={currentLang} isRtl={isRtl} t={t} />

        {/* Section 2: Freight & Global Logistics Capabilities Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 pt-8 sm:pt-10 border-t border-[#C87A28]/20 dark:border-white/10 gpu-accelerate"
        >
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-4 tracking-tight drop-shadow-sm">
            {t.logistics.title}
          </h3>
          <p className="text-[#3B4D43] dark:text-[#D1DDD5] text-sm sm:text-base leading-relaxed">
            {t.logistics.subtitle}
          </p>
        </motion.div>

        {/* 4 Cards Grid with Staggered Viewport Reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12"
        >
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.15 }}
                className="relative glass-card p-5 sm:p-6 rounded-2xl border border-[#C87A28]/20 dark:border-[#C87A28]/30 bg-white/95 dark:bg-[#0A2F22]/85 backdrop-blur-md shadow-lg dark:shadow-2xl flex flex-col justify-between group hover:border-[#C87A28]/60 dark:hover:border-amber-400/50 gpu-accelerate"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f6ecd6] to-[#ebd7ad] dark:from-ceylon-600/50 dark:to-jade-900 border border-[#C87A28]/30 dark:border-ceylon-500/40 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-6 h-6 text-[#9E5714] dark:text-[#E59A4D]" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider bg-emerald-50 dark:bg-jade-950/90 px-2 py-1 rounded border border-emerald-600/30 dark:border-jade-500/40">
                      {card.tag}
                    </span>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-2 group-hover:text-[#9E5714] dark:group-hover:text-[#E59A4D] transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#3B4D43] dark:text-[#D1DDD5] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Port of Colombo Dispatch Highlight Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative glass-card p-5 sm:p-8 rounded-3xl border border-[#C87A28]/20 dark:border-[#C87A28]/30 bg-gradient-to-r from-white/95 via-[#FBF8F2]/95 to-white/95 dark:from-jade-950/95 dark:via-[#062319]/90 dark:to-jade-950/95 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl dark:shadow-2xl gpu-accelerate"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f6ecd6] dark:bg-ceylon-500/25 border border-[#C87A28]/30 dark:border-ceylon-500/50 flex items-center justify-center shrink-0 shadow-md">
              <Anchor className="w-6 h-6 sm:w-7 sm:h-7 text-[#9E5714] dark:text-[#E59A4D]" />
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-1">
                Port of Colombo Direct Maritime Dispatch
              </h4>
              <p className="text-xs sm:text-sm text-[#3B4D43] dark:text-[#D1DDD5]">
                Primary transshipment hub for South Asia. Fast connections to Rotterdam, Hamburg, Singapore, New York & Jebel Ali.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#F4EFE6] dark:bg-black/60 border border-[#C87A28]/20 dark:border-ceylon-500/40 text-xs font-semibold text-[#9E5714] dark:text-[#E59A4D]">
              <Clock className="w-4 h-4 text-[#9E5714] dark:text-[#E59A4D]" />
              <span>Transit Time: 14 - 28 Days Global</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Logistics;
