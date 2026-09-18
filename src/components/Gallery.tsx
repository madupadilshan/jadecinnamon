import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Eye } from 'lucide-react';
import { TranslationSchema } from '../data/translations';

interface GalleryProps {
  t: TranslationSchema;
}

interface GalleryItem {
  id: number;
  title: string;
  desc: string;
  imgUrl: string;
  tag: string;
}

export const Gallery: React.FC<GalleryProps> = ({ t }) => {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: t.gallery.item1Title,
      desc: t.gallery.item1Desc,
      imgUrl: '/images/gallery-plantation.jpg',
      tag: 'Ceylon Highlands Plantation',
    },
    {
      id: 2,
      title: t.gallery.item2Title,
      desc: t.gallery.item2Desc,
      imgUrl: '/images/gallery-peeling.jpg',
      tag: 'Artisan Peeling & Layering',
    },
    {
      id: 3,
      title: t.gallery.item3Title,
      desc: t.gallery.item3Desc,
      imgUrl: '/images/gallery-drying.jpg',
      tag: 'Controlled Solar Drying',
    },
    {
      id: 4,
      title: t.gallery.item4Title,
      desc: t.gallery.item4Desc,
      imgUrl: '/images/gallery-grading.jpg',
      tag: 'Micro-Grading & Caliper Check',
    },
    {
      id: 5,
      title: t.gallery.item5Title,
      desc: t.gallery.item5Desc,
      imgUrl: '/images/gallery-distillation.jpg',
      tag: 'Steam Distillation Facility',
    },
    {
      id: 6,
      title: t.gallery.item6Title,
      desc: t.gallery.item6Desc,
      imgUrl: '/images/gallery-shipping.jpg',
      tag: 'Container Freight Loading',
    },
  ];

  return (
    <section
      id="gallery"
      className="py-28 relative bg-gradient-to-b from-[#03140e] via-[#062319]/80 to-[#03140e] overflow-hidden border-t border-ceylon-500/20"
    >
      {/* Clean luxury ambient radial glows without busy background image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-jade-700/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-ceylon-600/10 rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(rgba(212, 139, 56, 0.4) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-jade-950/80 border border-ceylon-500/30 text-ceylon-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-md">
            <Camera className="w-3.5 h-3.5 text-ceylon-400" />
            <span>{t.gallery.badge}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {t.gallery.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* 6 Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActiveImage(item)}
              className="glass-card rounded-2xl overflow-hidden border border-ceylon-500/25 hover:border-ceylon-400/60 shadow-xl group cursor-pointer relative bg-[#062319]/80 backdrop-blur-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50">
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062319] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Floating Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-ceylon-300 border border-ceylon-500/40 text-[10px] font-bold uppercase tracking-wider shadow-md">
                    {item.tag}
                  </span>
                </div>

                {/* Zoom Icon on Hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-2 rounded-full bg-ceylon-500 text-white shadow-lg flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>

                {/* Card Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-lg font-bold text-white mb-1 group-hover:text-ceylon-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
              className="fixed inset-0 bg-black/90 backdrop-blur-lg"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full bg-[#062319] rounded-2xl border border-ceylon-500/40 overflow-hidden shadow-2xl z-10"
            >
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
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

              <div className="p-6 bg-jade-950/95 border-t border-white/10">
                <span className="text-xs font-bold text-ceylon-400 uppercase tracking-wider mb-1 block">
                  {activeImage.tag}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  {activeImage.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
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
