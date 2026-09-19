import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Eye, X } from 'lucide-react';
import { TranslationSchema } from '../data/translations';
import { getAssetUrl } from '../utils/assets';

interface GalleryItem {
  id: number;
  title: string;
  desc: string;
  imgUrl: string;
  tag: string;
}

interface GalleryProps {
  t: TranslationSchema;
}

export const Gallery: React.FC<GalleryProps> = ({ t }) => {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: t.gallery.item1Title,
      desc: t.gallery.item1Desc,
      imgUrl: getAssetUrl('images/gallery-plantation.jpg'),
      tag: 'Ceylon Highlands Plantation',
    },
    {
      id: 2,
      title: t.gallery.item2Title,
      desc: t.gallery.item2Desc,
      imgUrl: getAssetUrl('images/gallery-peeling.jpg'),
      tag: 'Artisan Peeling & Layering',
    },
    {
      id: 3,
      title: t.gallery.item3Title,
      desc: t.gallery.item3Desc,
      imgUrl: getAssetUrl('images/gallery-drying.jpg'),
      tag: 'Controlled Solar Drying',
    },
    {
      id: 4,
      title: t.gallery.item4Title,
      desc: t.gallery.item4Desc,
      imgUrl: getAssetUrl('images/gallery-grading.jpg'),
      tag: 'Export Grade Calibration',
    },
    {
      id: 5,
      title: t.gallery.item5Title,
      desc: t.gallery.item5Desc,
      imgUrl: getAssetUrl('images/gallery-distillation.jpg'),
      tag: 'Steam Distillation Facility',
    },
    {
      id: 6,
      title: t.gallery.item6Title,
      desc: t.gallery.item6Desc,
      imgUrl: getAssetUrl('images/gallery-shipping.jpg'),
      tag: 'Container Freight Loading',
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
      id="gallery"
      className="py-24 sm:py-32 relative bg-[#FBF8F2] dark:bg-[#062319] overflow-hidden border-t border-[#E5D8C5] dark:border-ceylon-500/20 scroll-mt-20 transition-colors duration-300"
    >
      {/* Clean Parallax Atmosphere Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-110 opacity-25 dark:opacity-40 gpu-layer"
        style={{
          backgroundImage: `url('${getAssetUrl('images/bg-about-plantation.jpg')}')`,
          y: bgY,
        }}
      />

      {/* Vignette Overlay */}
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
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 gpu-accelerate"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-[#E5D8C5] dark:border-ceylon-500/40 text-[#B86B1E] dark:text-ceylon-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-md">
            <Sparkles className="w-3 h-3 text-[#B86B1E] dark:text-ceylon-400" />
            <span>{t.gallery.badge}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#11281E] dark:text-white mb-4 tracking-tight drop-shadow-sm">
            {t.gallery.title}
          </h2>
          <p className="text-[#536B5C] dark:text-gray-200 text-sm sm:text-base leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </motion.div>

        {/* 6 Images Grid with Staggered Viewport Reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.15 }}
              onClick={() => setActiveImage(item)}
              className="glass-card rounded-2xl overflow-hidden border border-[#E5D8C5] dark:border-ceylon-500/30 hover:border-[#C87A28]/70 dark:hover:border-ceylon-400/70 shadow-md dark:shadow-2xl group cursor-pointer relative bg-white/95 dark:bg-[#0A2F22]/85 backdrop-blur-md gpu-accelerate"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50">
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#062319] via-transparent to-black/30 opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Floating Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md text-amber-200 dark:text-ceylon-300 border border-ceylon-500/40 text-[10px] font-bold uppercase tracking-wider shadow-md">
                    {item.tag}
                  </span>
                </div>

                {/* Zoom Icon on Hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-2 rounded-full bg-[#C87A28] text-white shadow-lg flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>

                {/* Card Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-lg font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-200 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
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
              className="relative max-w-4xl w-full bg-white dark:bg-[#0A2F22] rounded-2xl border border-[#E5D8C5] dark:border-ceylon-500/40 overflow-hidden shadow-2xl z-10 gpu-accelerate"
            >
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-black">
                <img
                  src={activeImage.imgUrl}
                  alt={activeImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 bg-[#FBF8F2] dark:bg-jade-950/95 border-t border-[#E5D8C5] dark:border-white/10">
                <span className="text-xs font-bold text-[#B86B1E] dark:text-ceylon-400 uppercase tracking-wider mb-1 block">
                  {activeImage.tag}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#11281E] dark:text-white mb-2">
                  {activeImage.title}
                </h3>
                <p className="text-sm text-[#536B5C] dark:text-gray-200 leading-relaxed">
                  {activeImage.desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
