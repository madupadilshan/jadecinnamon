import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, FileText, Plus, Check } from 'lucide-react';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { Product } from '../../data/products';
import { TranslationSchema } from '../../data/translations';
import { useCart } from '../../context/CartContext';

interface ProductRowCardProps {
  product: Product;
  t: TranslationSchema;
  onOpenSpecs: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
  className?: string;
}

export const ProductRowCard: React.FC<ProductRowCardProps> = ({
  product,
  t,
  onOpenSpecs,
  onQuickOrder,
  className = '',
}) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imageScale, setImageScale] = useState(1);

  const handleAddToCart = (e: React.MouseEvent) => {
    setImageScale(1.1);
    setTimeout(() => setImageScale(1), 350);

    // Initial starting value must be 0 per specifications
    addToCart(product, 0, undefined, e);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full h-full rounded-2xl bg-white dark:bg-[#062319]/95 border border-[#E2D8C8] dark:border-[#C87A28]/30 hover:border-[#C87A28]/60 dark:hover:border-ceylon-400/60 shadow-md dark:shadow-xl dark:shadow-black/80 hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group gpu-accelerate ${className}`}
    >
      {/* Top Image Container with Badges */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#f6ecd6] dark:bg-jade-950 shrink-0">
        <picture className="w-full h-full block">
          <source
            srcSet={product.imageUrl.replace(/\.(jpg|jpeg)$/i, '.webp')}
            type="image/webp"
          />
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            animate={{ scale: imageScale }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            loading="lazy"
            decoding="async"
            width={400}
            height={250}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-[#062319] via-transparent to-black/35 pointer-events-none" />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex flex-wrap items-center justify-between gap-1 pointer-events-none">
          <span className="px-2 py-0.5 rounded-full bg-white/95 dark:bg-jade-950/90 backdrop-blur-md border border-emerald-600/30 dark:border-jade-400/40 text-[#1E4D32] dark:text-[#A7D8BA] text-[9px] font-semibold tracking-wider uppercase shadow-md flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#156B3A] dark:text-[#38D377]" />
            <span>{product.badge}</span>
          </span>

          <span className="px-2 py-0.5 rounded-full bg-white/95 dark:bg-ceylon-950/90 backdrop-blur-md border border-[#C87A28]/40 dark:border-ceylon-400/40 text-[#9E5714] dark:text-[#E5A855] text-[9px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5 text-[#9E5714] dark:text-[#E5A855]" />
            <span>{product.coumarinBadge}</span>
          </span>
        </div>

        {/* Grade Code Badge */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="px-2 py-0.5 rounded bg-ceylon-600 text-white font-mono font-bold text-[11px] shadow-md tracking-wider border border-white/20">
            {product.gradeCode}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#9E5714] dark:text-[#E5A855] mb-0.5">
            {product.categoryLabel}
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#11281E] dark:text-[#F9F6F0] mb-1.5 group-hover:text-[#9E5714] dark:group-hover:text-[#E5A855] transition-colors truncate">
            {product.name}
          </h3>
          <p className="text-xs text-[#2D3E33] dark:text-[#E2EBE5] line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>

          {/* Compact Technical Specs */}
          <div className="py-2 border-y border-[#E2D8C8] dark:border-white/10 space-y-1 text-xs text-[#5A6D62] dark:text-[#A3B899] mb-3">
            {product.specs.moisture && (
              <div className="flex justify-between items-center">
                <span className="text-[#5A6D62] dark:text-[#A3B899]">{t.catalog.moisture}:</span>
                <span className="font-semibold text-[#156B3A] dark:text-[#38D377]">{product.specs.moisture}</span>
              </div>
            )}
            {product.specs.coumarin && (
              <div className="flex justify-between items-center">
                <span className="text-[#5A6D62] dark:text-[#A3B899]">{t.catalog.coumarin}:</span>
                <span className="font-semibold text-[#9E5714] dark:text-[#E5A855]">{product.specs.coumarin}</span>
              </div>
            )}
            {product.specs.volatileOil && (
              <div className="flex justify-between items-center">
                <span className="text-[#5A6D62] dark:text-[#A3B899]">{t.catalog.volatileOil}:</span>
                <span className="font-semibold text-[#11281E] dark:text-[#F9F6F0]">{product.specs.volatileOil}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons with 44px min tap targets */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onOpenSpecs(product)}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-jade-900/80 hover:bg-[#ebd7ad] dark:hover:bg-jade-800 border border-[#E2D8C8] dark:border-white/10 text-xs font-semibold text-[#11281E] dark:text-[#F9F6F0] transition-all shadow-sm cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#9E5714] dark:text-[#E5A855] shrink-0" />
              <span className="truncate">{t.catalog.viewSpecs}</span>
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
                isAdded
                  ? 'bg-amber-500 text-black shadow-amber-400/40 border border-amber-300'
                  : 'bg-[#f6ecd6] dark:bg-[#093527] hover:bg-[#ebd7ad] dark:hover:bg-[#0d4734] text-[#9E5714] dark:text-amber-200 border border-[#C87A28]/40 hover:border-[#C87A28]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black shrink-0" />
                  <span className="truncate">Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 text-[#9E5714] dark:text-amber-300 shrink-0" />
                  <span className="truncate">Add to Cart</span>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() => onQuickOrder(product)}
            className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-xs font-bold text-white shadow-md shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all transform active:scale-98 cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
            <span>{t.catalog.orderNow}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductRowCard;
