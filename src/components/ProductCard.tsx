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
    // 1. Subtle product image scale micro-interaction
    setImageScale(1.1);
    setTimeout(() => setImageScale(1), 350);

    // 2. Anti-Gravity floating clone & state manager addition
    const defaultQty = product.category === 'oils' ? 50 : 500;
    addToCart(product, defaultQty, undefined, e);

    // 3. Button state feedback
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
      className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-ceylon-500/20 hover:border-ceylon-400/50 shadow-xl shadow-black/40 transition-colors duration-200 group gpu-accelerate"
    >
      {/* Top Image Container with Anti-Gravity Image Scale Micro-Interaction */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-jade-950">
        <motion.img
          src={product.imageUrl}
          alt={product.name}
          animate={{ scale: imageScale }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#062319] via-transparent to-black/30 pointer-events-none" />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-jade-950/85 backdrop-blur-md border border-jade-400/40 text-jade-300 text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-jade-400" />
            <span>{product.badge}</span>
          </span>

          <span className="px-2.5 py-1 rounded-full bg-ceylon-950/85 backdrop-blur-md border border-ceylon-400/40 text-ceylon-300 text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-ceylon-400" />
            <span>{product.coumarinBadge}</span>
          </span>
        </div>

        {/* Grade Code Chip */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-0.5 rounded-md bg-ceylon-600/90 text-white font-mono font-bold text-xs shadow-lg tracking-wider border border-white/20">
            {product.gradeCode}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-ceylon-400/90 mb-1">
            {product.categoryLabel}
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-ceylon-300 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Key Specification Snippets */}
        <div className="pt-3 border-t border-white/10 mb-5 space-y-1.5 text-xs text-gray-300">
          {product.specs.diameter && (
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t.catalog.diameter}:</span>
              <span className="font-semibold text-gray-200">{product.specs.diameter}</span>
            </div>
          )}
          {product.specs.moisture && (
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t.catalog.moisture}:</span>
              <span className="font-semibold text-jade-300">{product.specs.moisture}</span>
            </div>
          )}
          {product.specs.coumarin && (
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t.catalog.coumarin}:</span>
              <span className="font-semibold text-ceylon-300">{product.specs.coumarin}</span>
            </div>
          )}
          {product.specs.cinnamaldehyde && (
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t.catalog.cinnamaldehyde}:</span>
              <span className="font-semibold text-amber-300">{product.specs.cinnamaldehyde}</span>
            </div>
          )}
          {product.specs.density && (
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t.catalog.density}:</span>
              <span className="font-semibold text-gray-200">{product.specs.density}</span>
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
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-jade-900/80 hover:bg-jade-800 border border-white/10 text-xs font-semibold text-gray-200 hover:text-white transition-all shadow-sm cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-ceylon-400 shrink-0" />
              <span className="truncate">{t.catalog.viewSpecs}</span>
            </button>

            {/* (+) Add to Cart Button with Anti-Gravity micro-interaction */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
                isAdded
                  ? 'bg-amber-500 text-black shadow-amber-400/40 border border-amber-300'
                  : 'bg-[#093527] hover:bg-[#0d4734] text-amber-200 hover:text-white border border-[#C87A28]/40 hover:border-[#C87A28]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black shrink-0" />
                  <span className="truncate">Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span className="truncate">(+) Add to Cart</span>
                </>
              )}
            </button>
          </div>

          {/* Direct WhatsApp Order CTA Button */}
          <button
            type="button"
            onClick={() => onQuickOrder(product)}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-xs font-bold text-white shadow-md shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all transform active:scale-98 cursor-pointer"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-white shrink-0" />
            <span>{t.catalog.orderNow}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
