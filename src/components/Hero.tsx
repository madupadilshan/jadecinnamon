import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { TranslationSchema } from '../data/translations';
import { HeroMetrics } from './sections/HeroMetrics';
import { getAssetUrl } from '../utils/assets';

interface HeroProps {
  t: TranslationSchema;
}

// 4 Curated 100% Pure Ceylon Cinnamon Leaf Oil Visuals (WebP Optimized)
const HERO_SLIDES = [
  {
    url: getAssetUrl('images/cinnamon-leaf-oil-collection.webp'),
    label: 'Pure Ceylon Leaf Oil Collection',
    desc: '100% Natural Steam-Distilled Cinnamon Leaf Oil in 15ml, 30ml, 50ml, 100ml Bottles & Luxury Box',
  },
  {
    url: getAssetUrl('images/product-leaf-oil.webp'),
    label: 'Precision Droppers & Amber Glass',
    desc: 'High Active Eugenol (75%–85%), SLS 187 & ISO 3524 Certified Pure Essential Oil',
  },
  {
    url: getAssetUrl('images/gallery-distillation.webp'),
    label: 'Steam Hydro-Distillation',
    desc: 'Pure Artisanal Extraction from Fresh Green Foliage with Batch GC-MS Testing',
  },
  {
    url: getAssetUrl('images/gallery-plantation.webp'),
    label: 'Southern Sri Lanka Estates',
    desc: 'Sustainably Harvested Foliage from Pure Cinnamomum Verum Heritage Plantations',
  },
];

export const Hero: React.FC<HeroProps> = ({ t }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const heroRef = useRef<HTMLElement>(null);

  // Scrollytelling Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);

  // Auto-transition background every 6.5 seconds (6500ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  // Intelligent Next-Slide Memory Preloader (Prevents network stutter / cancelled requests)
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % HERO_SLIDES.length;
    const preloadImg = new Image();
    preloadImg.src = HERO_SLIDES[nextIndex].url;
  }, [currentSlide]);

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
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[100vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-black"
    >
      {/* 6.5-Second Hardware-Accelerated Cross-Fade Rotating Background Slide */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 overflow-hidden pointer-events-none gpu-layer"
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full gpu-accelerate"
          >
            <picture className="w-full h-full block">
              <source srcSet={HERO_SLIDES[currentSlide].url} type="image/webp" />
              <img
                src={HERO_SLIDES[currentSlide].url}
                alt={HERO_SLIDES[currentSlide].label}
                loading={currentSlide === 0 ? 'eager' : 'lazy'}
                decoding={currentSlide === 0 ? 'sync' : 'async'}
                // @ts-ignore fetchPriority is supported in modern browsers
                fetchPriority={currentSlide === 0 ? 'high' : 'low'}
                className="w-full h-full object-cover object-center"
              />
            </picture>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Deep Vignette & Overlay for Maximum Typography Contrast & Visual Luxury */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#FBF8F2] dark:to-[#062319] pointer-events-none z-[1] transition-colors duration-300" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/75 pointer-events-none z-[1]" />

      {/* Subtle ambient accent glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-ceylon-500/15 rounded-full blur-[140px] mix-blend-screen gpu-layer" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-[130px] mix-blend-screen gpu-layer" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: heroOpacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full gpu-accelerate"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Prominent Kinetic Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] mb-6 drop-shadow-2xl"
          >
            {t.hero.titlePart1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-ceylon-400 to-ceylon-200">
              {t.hero.titleHighlight}
            </span>{' '}
            {t.hero.titlePart2}
          </motion.h1>

          {/* Subtext Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-100 max-w-3xl leading-relaxed mb-10 font-normal drop-shadow-md"
          >
            {t.hero.description}
          </motion.p>

          {/* Dual Action CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
          >
            <a
              href="#rfq"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-base shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>

            <a
              href="#products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-black/60 hover:bg-black/80 border border-ceylon-400/60 text-white font-semibold text-base backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-black/50 cursor-pointer"
            >
              <span>{t.hero.ctaSecondary}</span>
            </a>
          </motion.div>

          {/* Bento Trust Chips / Stat Matrix with Explicit High-Contrast Tokens */}
          <motion.div variants={itemVariants} className="w-full">
            <HeroMetrics t={t} />
          </motion.div>

          {/* 3s Auto-Carousel Controls & Heritage Scene Tag */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center gap-3 z-10"
          >
            {/* Clickable Progress Navigation Pills */}
            <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-ceylon-500/30 shadow-lg">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`relative h-2 rounded-full transition-all duration-500 cursor-pointer overflow-hidden ${
                    currentSlide === idx
                      ? 'w-10 bg-ceylon-400 shadow-md shadow-ceylon-400/50'
                      : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Switch to slide ${idx + 1}: ${slide.label}`}
                >
                  {currentSlide === idx && (
                    <motion.div
                      layoutId="heroSlideProgress"
                      className="w-full h-full bg-gradient-to-r from-amber-300 via-ceylon-300 to-amber-200"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Dynamic Active Heritage Caption Badge */}
            <div className="flex items-center gap-2 text-xs text-ceylon-200/90 font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
              <span>
                {HERO_SLIDES[currentSlide].label}:{' '}
                <span className="text-gray-300 font-light hidden sm:inline">
                  {HERO_SLIDES[currentSlide].desc}
                </span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
