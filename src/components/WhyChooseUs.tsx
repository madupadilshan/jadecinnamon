import React from 'react';
import { LanguageCode, TranslationSchema } from '../data/translations';
import { LogisticsWhyChooseUs } from './Logistics';

export { LogisticsWhyChooseUs };

export interface WhyChooseUsProps {
  t: TranslationSchema;
  currentLang?: LanguageCode;
  isRtl?: boolean;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ currentLang = 'en', isRtl = false, t }) => {
  return (
    <section
      id="why-choose-us"
      className="py-20 sm:py-28 relative overflow-hidden bg-[#FBF8F2] dark:bg-[#062319] border-t border-[#C87A28]/20 dark:border-[#C87A28]/30 scroll-mt-20 transition-colors duration-300"
    >
      {/* Ambient Focal Lighting Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[450px] bg-[#C87A28]/10 dark:bg-ceylon-600/10 rounded-full blur-[140px] mix-blend-screen gpu-layer" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-emerald-600/5 dark:bg-jade-600/10 rounded-full blur-[130px] mix-blend-screen gpu-layer" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <LogisticsWhyChooseUs currentLang={currentLang} isRtl={isRtl} t={t} />
      </div>
    </section>
  );
};

export default WhyChooseUs;
