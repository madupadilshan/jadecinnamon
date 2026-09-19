import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { TranslationSchema } from '../data/translations';

interface HeroProps {
  t: TranslationSchema;
}

// 4 Curated Traditional Ceylon Cinnamon & Spice Marketing Visuals
const HERO_SLIDES = [
  {
    url: '/images/hero-bg-1.jpg',
    label: 'Traditional Harvest & Quills',
    desc: 'Pure Ceylon Cinnamon Quills from Southern Sri Lanka Heritage Estates',
  },
  {
    url: '/images/hero-bg-2.jpg',
    label: 'Artisanal Hand Peeling',
    desc: 'Centuries-Old Traditional Sri Lankan Craftsmanship & Curing',
  },
  {
    url: '/images/hero-bg-3.jpg',
    label: 'Sun-Drying & Golden Quills',
    desc: 'Premium Alba, C5-SP & Traditional Natural Sun-Drying Process',
  },
  {
    url: '/images/hero-bg-4.jpg',
    label: 'Global Export Packing',
    desc: 'SLS 81 & ISO 6539 Certified Ceylon Bales for Worldwide Shipment',
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

  // Auto-transition background every 3 seconds (3000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

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

  const statItems = [
    { value: t.hero.statCoumarin, label: t.hero.statCoumarinLabel, highlight: 'Safe Daily Intake' },
    { value: t.hero.statMoisture, label: t.hero.statMoistureLabel, highlight: 'Dry Stable Quality' },
    { value: t.hero.statOrigin, label: t.hero.statOriginLabel, highlight: 'No Cassia Blends' },
    { value: t.hero.statFob, label: t.hero.statFobLabel, highlight: 'Port of Colombo' },
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[100vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-black"
    >
      {/* 3-Second Cross-Fade Rotating Background Slide with Parallax Y Shift & GPU Acceleration */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 overflow-hidden pointer-events-none gpu-layer"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat gpu-accelerate"
            style={{ backgroundImage: `url('${HERO_SLIDES[currentSlide].url}')` }}
          />
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
          {/* Top Eyebrow Tag */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-ceylon-400/50 text-ceylon-300 text-xs sm:text-sm font-bold tracking-widest uppercase shadow-xl shadow-black/80">
              <Sparkles className="w-3.5 h-3.5 text-ceylon-400" />
              <span>THE BEST QUALITY • {t.hero.badge}</span>
            </span>
          </motion.div>

          {/* Prominent Kinetic Headline (matching reference aesthetic) */}
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

          {/* Bento Trust Chips / Stat Matrix */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full"
          >
            {statItems.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.15 }}
                className="glass-card p-4 sm:p-5 rounded-2xl text-center flex flex-col justify-center items-center relative group border border-ceylon-500/40 bg-black/60 backdrop-blur-md shadow-xl gpu-accelerate"
              >
                <div className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-ceylon-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-[10px] text-jade-300 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-jade-400" />
                  <span>{stat.highlight}</span>
                </div>
              </motion.div>
            ))}
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
