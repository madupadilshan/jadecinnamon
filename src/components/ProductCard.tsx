import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, FileText, Plus, Check } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Product } from '../data/products';
import { TranslationSchema } from '../data/translations';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  t: TranslationSchema;
  onOpenSpecs: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  t,
  onOpenSpecs,
  onQuickOrder,
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
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="rounded-2xl overflow-hidden flex flex-col justify-between bg-white dark:bg-[#0A2F22] border border-[#E2D8C8] dark:border-[#C87A28]/25 hover:border-[#C87A28]/60 dark:hover:border-ceylon-400/50 shadow-md dark:shadow-xl transition-colors duration-200 group gpu-accelerate"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-jade-950">
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
            height={300}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-[#062319] via-transparent to-black/30 pointer-events-none" />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-white/95 dark:bg-jade-950/85 backdrop-blur-md border border-emerald-600/30 dark:border-jade-400/40 text-[#1E4D32] dark:text-[#A7D8BA] text-[10px] font-semibold tracking-wider uppercase shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#156B3A] dark:text-[#38D377]" />
            <span>{product.badge}</span>
          </span>

          <span className="px-2.5 py-1 rounded-full bg-white/95 dark:bg-ceylon-950/85 backdrop-blur-md border border-[#C87A28]/40 dark:border-ceylon-400/40 text-[#9E5714] dark:text-[#E5A855] text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#9E5714] dark:text-[#E5A855]" />
            <span>{product.coumarinBadge}</span>
          </span>
        </div>

        {/* Grade Code Chip */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-0.5 rounded-md bg-ceylon-600 text-white font-mono font-bold text-xs shadow-lg tracking-wider border border-white/20">
            {product.gradeCode}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#9E5714] dark:text-[#E5A855] mb-1">
            {product.categoryLabel}
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-2 group-hover:text-[#9E5714] dark:group-hover:text-[#E5A855] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#2D3E33] dark:text-[#E2EBE5] line-clamp-3 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Key Specification Snippets */}
        <div className="pt-3 border-t border-[#E2D8C8] dark:border-white/10 mb-5 space-y-1.5 text-xs text-[#5A6D62] dark:text-[#A3B899]">
          {product.specs.diameter && (
            <div className="flex justify-between items-center">
              <span className="text-[#5A6D62] dark:text-[#A3B899]">{t.catalog.diameter}:</span>
              <span className="font-semibold text-[#11281E] dark:text-[#F9F6F0]">{product.specs.diameter}</span>
            </div>
          )}
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
          {product.specs.cinnamaldehyde && (
            <div className="flex justify-between items-center">
              <span className="text-[#5A6D62] dark:text-[#A3B899]">{t.catalog.cinnamaldehyde}:</span>
              <span className="font-semibold text-[#9E5714] dark:text-[#E5A855]">{product.specs.cinnamaldehyde}</span>
            </div>
          )}
          {product.specs.density && (
            <div className="flex justify-between items-center">
              <span className="text-[#5A6D62] dark:text-[#A3B899]">{t.catalog.density}:</span>
              <span className="font-semibold text-[#11281E] dark:text-[#F9F6F0]">{product.specs.density}</span>
            </div>
          )}
        </div>

        {/* Action Buttons: View Specs, (+) Add to Cart, Order on WhatsApp */}
        <div className="space-y-2 pt-2">
          <div className="grid grid-cols-2 gap-2">
            {/* View Specs Button */}
            <button
              type="button"
              onClick={() => onOpenSpecs(product)}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-jade-900/80 hover:bg-[#ebd7ad] dark:hover:bg-jade-800 border border-[#E2D8C8] dark:border-white/10 text-xs font-semibold text-[#11281E] dark:text-[#F9F6F0] transition-all shadow-sm cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#9E5714] dark:text-[#E5A855] shrink-0" />
              <span className="truncate">{t.catalog.viewSpecs}</span>
            </button>

            {/* (+) Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
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

          {/* Direct WhatsApp Order CTA Button */}
          <button
            type="button"
            onClick={() => onQuickOrder(product)}
            className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-xs font-bold text-white shadow-md shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all transform active:scale-98 cursor-pointer"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-white shrink-0" />
            <span>{t.catalog.orderNow}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
