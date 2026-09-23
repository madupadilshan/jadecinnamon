import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, X, Sparkles, PackageCheck } from 'lucide-react';
import { TranslationSchema } from '../../data/translations';
import { getAssetUrl } from '../../utils/assets';

export interface GalleryItem {
  id: number;
  title: string;
  desc: string;
  imgUrl: string;
  tag: string;
  category?: string;
}

export interface GalleryProps {
  t: TranslationSchema;
  isRtl?: boolean;
}

const ITEMS_PER_PAGE = 8; // 2 rows x 4 items per page on desktop

export const Gallery: React.FC<GalleryProps> = ({ t, isRtl = false }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Parallax scrollytelling background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  // Complete curated gallery items list (All WebP)
  const allGalleryItems: GalleryItem[] = useMemo(
    () => [
      // Page 1: Items 1 to 8 (Harvest Bales, Sealed Packs, and Export Products)
      {
        id: 1,
        title: 'Master Cinnamon Quill Export Bales',
        desc: 'High-density export bales of cured Ceylon cinnamon quills secured with natural coir rope at our Galle facility.',
        imgUrl: getAssetUrl('images/gallery-quill-stacks.webp'),
        tag: 'Export Bales • Galle Facility',
      },
      {
        id: 2,
        title: 'Artisanal Estate Quill Cylinders',
        desc: 'Single-estate whole Ceylon cinnamon quills prepared for grading and international warehouse dispatch.',
        imgUrl: getAssetUrl('images/gallery-quill-bales.webp'),
        tag: 'Harvest Bales • Southern Province',
      },
      {
        id: 3,
        title: 'Export-Grade Sealed Cut Quills Packet',
        desc: 'Vacuum-sealed 1kg presentation pack of precision-cut Ceylon cinnamon quills for premium retail distribution.',
        imgUrl: getAssetUrl('images/gallery-cinnamon-packet.webp'),
        tag: 'Retail Export • 1Kg Sealed Pack',
      },
      {
        id: 4,
        title: 'Hand-Rolled Alba & C5 Quills',
        desc: '100% authentic multi-layered concentric golden bark with delicate sweet fragrance and smooth quill texture.',
        imgUrl: getAssetUrl('images/product-cinnamon-quills.webp'),
        tag: 'Pure Quills • Cinnamomum Verum',
      },
      {
        id: 5,
        title: 'Precision Cinnamon Quill Cuts',
        desc: 'Precision-sliced export cuts prepared for culinary extraction, tea blending, and commercial spice packaging.',
        imgUrl: getAssetUrl('images/product-cinnamon-quill-cuts.webp'),
        tag: 'Quill Cuts • Bulk Weight in Kg',
      },
      {
        id: 6,
        title: 'Pure Ceylon Cinnamon Leaf Oil',
        desc: 'Hydro-distilled pure leaf essential oil containing 75%–85% natural eugenol in UV amber dropper bottles (15ml–100ml).',
        imgUrl: getAssetUrl('images/product-leaf-oil.webp'),
        tag: 'Leaf Oil • 15ml–100ml Droppers',
      },
      {
        id: 7,
        title: 'Pure Ceylon Cinnamon Ground Powder',
        desc: 'Ultra-fine 100% pure Ceylon cinnamon ground powder with zero additives and ultra-low coumarin (<0.005%).',
        imgUrl: getAssetUrl('images/product-cinnamon-powder.webp'),
        tag: '1Kg Pouch • Ultra-Low Coumarin',
      },
      {
        id: 8,
        title: 'Ceylon Cinnamon Cut Pieces',
        desc: 'Sealed export-grade cut pieces ideal for pharmaceutical, culinary, tea blending, and spice extraction applications.',
        imgUrl: getAssetUrl('images/product-cinnamon-cut-pieces.webp'),
        tag: '1Kg Sealed Pack • Commercial Cut',
      },

      // Page 2: Items 9 to 16 (Estate Heritage, Distillation Lab & Global Shipping)
      {
        id: 9,
        title: t.gallery?.item1Title || 'Harvesting Galle Estates',
        desc: t.gallery?.item1Desc || 'Sustainably farmed Ceylon Cinnamon estates nestled in the fertile valleys of Southern Sri Lanka.',
        imgUrl: getAssetUrl('images/gallery-plantation.webp'),
        tag: 'Estate Origin • Galle & Matara',
      },
      {
        id: 10,
        title: t.gallery?.item2Title || 'Artisanal Bark Peeling Tradition',
        desc: t.gallery?.item2Desc || 'Generations of master peelers handcrafting delicate multi-layered concentric quills with traditional brass tools.',
        imgUrl: getAssetUrl('images/gallery-peeling.webp'),
        tag: 'Hand Craftsmanship • Master Peelers',
      },
      {
        id: 11,
        title: t.gallery?.item3Title || 'Hygienic Curing & Drying',
        desc: t.gallery?.item3Desc || 'Controlled shade curing and gentle drying maintaining natural volatile oils and golden hues.',
        imgUrl: getAssetUrl('images/gallery-drying.webp'),
        tag: 'Hygienic Curing • Climate Controlled',
      },
      {
        id: 12,
        title: t.gallery?.item4Title || 'Precision Diameter & Quality Grading',
        desc: t.gallery?.item4Desc || 'Rigorous ISO classification into Alba, C5 Special, and commercial export grade lots.',
        imgUrl: getAssetUrl('images/gallery-grading.webp'),
        tag: 'Quality Grading • SLS 81 & ISO',
      },
      {
        id: 13,
        title: t.gallery?.item5Title || 'Steam Distillation Lab',
        desc: t.gallery?.item5Desc || 'Slow hydro-distillation of fresh leaves yielding therapeutic-grade eugenol-rich leaf oil.',
        imgUrl: getAssetUrl('images/gallery-distillation.webp'),
        tag: 'Distillation Lab • 75%–85% Eugenol',
      },
      {
        id: 14,
        title: t.gallery?.item6Title || 'Colombo Port Freight Dispatch',
        desc: t.gallery?.item6Desc || 'Containerized sea freight (FCL/LCL) and rapid express air cargo dispatch to worldwide destinations.',
        imgUrl: getAssetUrl('images/gallery-shipping.webp'),
        tag: 'Export Logistics • Port of Colombo',
      },
      {
        id: 15,
        title: 'Amber Dropper Bottle Formats',
        desc: 'Certified amber glass bottles preserving aromatic bioactives for global cosmetic, aromatherapeutic, and wellness formulations.',
        imgUrl: getAssetUrl('images/cinnamon-leaf-oil-collection.webp'),
        tag: 'Presentation • Amber UV Glass',
      },
      {
        id: 16,
        title: 'Commercial C5 & Alba Export Lots',
        desc: 'Official certified export shipments tested for moisture, eugenol content, and international purity compliance.',
        imgUrl: getAssetUrl('images/product-c5.webp'),
        tag: 'Certified Export • SLS & EDB',
      },
    ],
    [t]
  );

  const totalPages = Math.ceil(allGalleryItems.length / ITEMS_PER_PAGE) || 1;

  const canPrev = currentPage > 0;
  const canNext = currentPage < totalPages - 1;

  const handlePrev = () => {
    if (canPrev) {
      setCurrentPage((p) => p - 1);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  };

  const handleNext = () => {
    if (canNext) {
      setCurrentPage((p) => p + 1);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  };

  // 8 items for the current page
  const currentItems = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    return allGalleryItems.slice(start, start + ITEMS_PER_PAGE);
  }, [allGalleryItems, currentPage]);

  // Ensure current page remains valid
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentPage]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-20 sm:py-28 relative bg-[#FBF8F2] dark:bg-[#062319] overflow-hidden border-t border-[#C87A28]/20 dark:border-[#C87A28]/30 scroll-mt-20 transition-colors duration-300"
    >
      {/* Clean Parallax Background Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-110 opacity-25 dark:opacity-40 gpu-layer"
        style={{
          backgroundImage: `url('${getAssetUrl('images/gallery-plantation.webp')}')`,
          y: bgY,
        }}
      />

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBF8F2] via-[#FBF8F2]/85 to-[#FBF8F2] dark:from-[#062319] dark:via-[#062319]/90 dark:to-[#062319] pointer-events-none" />

      {/* Luxury ambient radial glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/5 dark:bg-jade-700/15 rounded-full blur-[150px] gpu-layer" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#C87A28]/5 dark:bg-ceylon-600/10 rounded-full blur-[140px] gpu-layer" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 gpu-accelerate"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C87A28]/15 dark:bg-ceylon-500/20 border border-[#C87A28]/30 dark:border-ceylon-400/30 text-[#9E5714] dark:text-[#E5A855] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.gallery?.badge || 'Estate, Products & Heritage Gallery'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-3 sm:mb-4 tracking-tight drop-shadow-sm">
            {t.gallery?.title || 'From Sri Lankan Estates to Global Export Hubs'}
          </h2>
          <p className="text-[#3B4D43] dark:text-[#D1DDD5] text-sm sm:text-base leading-relaxed">
            {t.gallery?.subtitle ||
              'Explore authentic Ceylon Cinnamon quill bales, retail packages, pure leaf oil distillation, and global export handling.'}
          </p>
        </motion.div>

        {/* ============================================================ */}
        {/* MAIN GALLERY CONTAINER (8 Items: 2 Rows x 4 Items per View) */}
        {/* ============================================================ */}
        <div className="relative group/gallery my-2 [transform:translateZ(0)]">
          {/* Desktop Left Side Navigation Button (< / ChevronLeft) */}
          <button
            type="button"
            onClick={isRtl ? handleNext : handlePrev}
            disabled={isRtl ? !canNext : !canPrev}
            className={`hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white dark:bg-[#062319] border-2 border-[#E2D8C8] dark:border-[#C87A28]/50 hover:border-[#C87A28] dark:hover:border-amber-300 text-[#9E5714] dark:text-[#E5A855] hover:text-[#783C1D] dark:hover:text-white items-center justify-center shadow-md dark:shadow-2xl dark:shadow-black/95 transition-all duration-200 cursor-pointer ${
              (isRtl ? canNext : canPrev)
                ? 'opacity-90 hover:opacity-100 hover:scale-110 active:scale-95'
                : 'opacity-30 cursor-not-allowed border-gray-300 dark:border-white/10 text-gray-400 dark:text-gray-600 pointer-events-none'
            }`}
            aria-label="Previous gallery page"
          >
            {isRtl ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
          </button>

          {/* Desktop Right Side Navigation Button (> / ChevronRight) */}
          <button
            type="button"
            onClick={isRtl ? handlePrev : handleNext}
            disabled={isRtl ? !canPrev : !canNext}
            className={`hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white dark:bg-[#062319] border-2 border-[#E2D8C8] dark:border-[#C87A28]/50 hover:border-[#C87A28] dark:hover:border-amber-300 text-[#9E5714] dark:text-[#E5A855] hover:text-[#783C1D] dark:hover:text-white items-center justify-center shadow-md dark:shadow-2xl dark:shadow-black/95 transition-all duration-200 cursor-pointer ${
              (isRtl ? canPrev : canNext)
                ? 'opacity-90 hover:opacity-100 hover:scale-110 active:scale-95'
                : 'opacity-30 cursor-not-allowed border-gray-300 dark:border-white/10 text-gray-400 dark:text-gray-600 pointer-events-none'
            }`}
            aria-label="Next gallery page"
          >
            {isRtl ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
          </button>

          {/* Viewport:
              - Mobile (<768px): 2-Row Horizontal Swipe Carousel (grid-rows-2 grid-flow-col auto-cols-[75vw] sm:auto-cols-[280px] snap-x snap-mandatory)
              - Desktop (>=1024px): 8 Items arranged in 2 Rows x 4 Items (grid-cols-4 grid-rows-2 gap-4)
          */}
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 md:px-0 py-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`gallery-page-${currentPage}`}
                initial={{ opacity: 0, x: isRtl ? -24 : 24, y: 6 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: isRtl ? 24 : -24, y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-rows-2 grid-flow-col auto-cols-[75vw] sm:auto-cols-[280px] md:grid-flow-row md:auto-cols-auto md:grid-rows-2 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 items-stretch [transform:translateZ(0)]"
              >
                {currentItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.18 }}
                    onClick={() => setActiveImage(item)}
                    className="w-full snap-center glass-card rounded-2xl overflow-hidden border border-[#C87A28]/25 dark:border-[#C87A28]/40 hover:border-[#C87A28] dark:hover:border-amber-300 shadow-md dark:shadow-xl dark:shadow-black/80 group cursor-pointer relative bg-white dark:bg-[#0A2F22] backdrop-blur-md flex flex-col justify-between [transform:translateZ(0)]"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                      <picture className="w-full h-full block">
                        <source srcSet={item.imgUrl} type="image/webp" />
                        <img
                          src={item.imgUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300 ease-out"
                          loading="lazy"
                          decoding="async"
                          width={400}
                          height={300}
                        />
                      </picture>

                      {/* Dark gradient for strong contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                      {/* Location / Batch Badge */}
                      <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%]">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[#E5A855] border border-[#C87A28]/40 text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider truncate shadow-md">
                          {item.tag}
                        </span>
                      </div>

                      {/* Hover Zoom Indicator Eye Icon */}
                      <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="p-1.5 rounded-full bg-[#C87A28] text-white shadow-lg flex items-center justify-center">
                          <Eye className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      {/* Title & Short Description on Image Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-3.5 z-10">
                        <h3 className="font-serif text-sm sm:text-base font-bold text-white mb-0.5 group-hover:text-amber-200 transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-gray-200 line-clamp-2 leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PAGINATION CONTROLS & MOBILE NAVIGATION                     */}
        {/* ============================================================ */}
        <div className="flex flex-col items-center justify-center gap-3 mt-8 select-none">
          {/* Centered Pagination Menu with 44px Touch Targets */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#062319] border border-[#C87A28]/30 shadow-md dark:shadow-xl dark:shadow-black/80">
            {/* Prev Button */}
            <button
              type="button"
              onClick={isRtl ? handleNext : handlePrev}
              disabled={isRtl ? !canNext : !canPrev}
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-all cursor-pointer ${
                (isRtl ? canNext : canPrev)
                  ? 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-[#11281E] dark:text-[#F9F6F0] hover:text-[#9E5714] dark:hover:text-amber-200 border border-[#E2D8C8] dark:border-white/10 active:scale-95'
                  : 'opacity-30 cursor-not-allowed text-gray-400 dark:text-gray-500 border border-transparent'
              }`}
              aria-label="Previous gallery page"
            >
              {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Dynamic Numbered Buttons [1] [2] ... [N] */}
            <div className="flex items-center gap-2 px-1">
              {Array.from({ length: totalPages }, (_, i) => i).map((pageIndex) => {
                const isActive = pageIndex === currentPage;

                return (
                  <div
                    key={pageIndex}
                    className="flex items-center justify-center min-w-[44px] min-h-[44px]"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPage(pageIndex);
                        if (scrollContainerRef.current) {
                          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`relative cursor-pointer transition-all duration-200 font-mono ${
                        isActive
                          ? 'w-9 h-9 flex items-center justify-center rounded-lg bg-[#C87A28] text-white font-bold shadow-md shadow-[#C87A28]/25 scale-105 z-10'
                          : 'w-9 h-9 flex items-center justify-center rounded-lg border border-[#C87A28]/30 text-sm font-semibold text-[#11281E] dark:text-[#F9F6F0] hover:border-[#C87A28] bg-transparent hover:bg-[#C87A28]/10'
                      }`}
                      aria-label={`Go to gallery page ${pageIndex + 1}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeGalleryPageIndicator"
                          className="absolute inset-0 rounded-lg bg-[#C87A28] -z-10"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      <span>{pageIndex + 1}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={isRtl ? handlePrev : handleNext}
              disabled={isRtl ? !canPrev : !canNext}
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-all cursor-pointer ${
                (isRtl ? canPrev : canNext)
                  ? 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-[#11281E] dark:text-[#F9F6F0] hover:text-[#9E5714] dark:hover:text-amber-200 border border-[#E2D8C8] dark:border-white/10 active:scale-95'
                  : 'opacity-30 cursor-not-allowed text-gray-400 dark:text-gray-500 border border-transparent'
              }`}
              aria-label="Next gallery page"
            >
              {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Page Info */}
          <div className="text-[11px] font-mono text-[#5A6D62] dark:text-[#A3B899]">
            Showing <span className="text-[#9E5714] dark:text-[#E5A855] font-bold">8</span> of{' '}
            <span className="text-[#11281E] dark:text-[#F9F6F0] font-semibold">{allGalleryItems.length}</span> images (Page {currentPage + 1} of {totalPages})
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* LIGHTBOX PREVIEW MODAL                                       */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full bg-white dark:bg-[#0A2F22] rounded-2xl border border-[#C87A28]/25 dark:border-ceylon-500/40 overflow-hidden shadow-2xl z-10 [transform:translateZ(0)]"
            >
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-black max-h-[60vh] overflow-hidden">
                <picture className="w-full h-full block">
                  <source srcSet={activeImage.imgUrl} type="image/webp" />
                  <img
                    src={activeImage.imgUrl}
                    alt={activeImage.title}
                    className="w-full h-full object-contain sm:object-cover"
                    decoding="async"
                  />
                </picture>
              </div>

              <div className="p-5 sm:p-6 bg-[#FBF8F2] dark:bg-jade-950/95 border-t border-[#C87A28]/20 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#9E5714] dark:text-[#E59A4D] uppercase tracking-wider mb-1 block">
                    {activeImage.tag}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-1.5">
                    {activeImage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3B4D43] dark:text-[#D1DDD5] leading-relaxed max-w-xl">
                    {activeImage.desc}
                  </p>
                </div>

                <div className="shrink-0">
                  <a
                    href="#rfq"
                    onClick={() => {
                      setActiveImage(null);
                      const rfq = document.getElementById('rfq');
                      if (rfq) {
                        if ((window as any).lenis) {
                          (window as any).lenis.scrollTo(rfq, { offset: -80 });
                        } else {
                          rfq.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C87A28] hover:bg-[#b0671c] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    <PackageCheck className="w-4 h-4" />
                    <span>Request Quotation</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
