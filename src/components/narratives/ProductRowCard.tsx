import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, FileText, Plus, Minus, Check, Package, Scale } from 'lucide-react';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { Product, ProductVariant } from '../../data/products';
import { TranslationSchema } from '../../data/translations';
import { useCart, QuotationUnit } from '../../context/CartContext';

interface ProductRowCardProps {
  product: Product;
  t: TranslationSchema;
  onOpenSpecs: (product: Product) => void;
  onQuickOrder: (product: Product, variant?: ProductVariant, quantity?: number, unit?: QuotationUnit) => void;
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

  // 1. Bulk Weight Model State (Kg)
  const [bulkWeight, setBulkWeight] = useState<number>(0);

  // 2. Fixed Pack Model State (Packs)
  const [packQty, setPackQty] = useState<number>(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    setImageScale(1.08);
    setTimeout(() => setImageScale(1), 350);

    if ((product.buyingModel === 'multi_variant_volume' || product.buyingModel === 'volume_variants' || product.buyingModel === 'multi_volume') && product.variants) {
      addToCart(product, 0, 'Bottles', e, product.variants[0]);
    } else if (product.buyingModel === 'flexible_bulk' || product.buyingModel === 'bulk_weight') {
      addToCart(product, bulkWeight, 'Kg', e);
    } else if ((product.buyingModel === 'fixed_pack' && product.id === 'leaf-oil-box-set') || product.buyingModel === 'gift_pack') {
      addToCart(product, packQty, 'Packs', e);
    } else if (product.buyingModel === 'fixed_unit_pack' || product.buyingModel === 'fixed_pack' || product.buyingModel === 'fixed_1kg_pack') {
      addToCart(product, packQty, 'Packs', e);
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleOrderNow = () => {
    if ((product.buyingModel === 'multi_variant_volume' || product.buyingModel === 'volume_variants' || product.buyingModel === 'multi_volume') && product.variants) {
      onQuickOrder(product, product.variants[0], 0, 'Bottles');
    } else if (product.buyingModel === 'flexible_bulk' || product.buyingModel === 'bulk_weight') {
      onQuickOrder(product, undefined, bulkWeight, 'Kg');
    } else if ((product.buyingModel === 'fixed_pack' && product.id === 'leaf-oil-box-set') || product.buyingModel === 'gift_pack') {
      onQuickOrder(product, undefined, packQty, 'Packs');
    } else {
      onQuickOrder(product, undefined, packQty, 'Packs');
    }
  };

  const isBulkModel = product.buyingModel === 'flexible_bulk' || product.buyingModel === 'bulk_weight';
  const isFixedUnitPackModel = (product.buyingModel === 'fixed_unit_pack' || product.buyingModel === 'fixed_pack' || product.buyingModel === 'fixed_1kg_pack') && product.id !== 'leaf-oil-box-set';
  const isGiftPackModel = (product.buyingModel === 'fixed_pack' && product.id === 'leaf-oil-box-set') || product.buyingModel === 'gift_pack';

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

        {/* Grade Code & Net Volume Badge */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded bg-ceylon-600 text-white font-mono font-bold text-[11px] shadow-md tracking-wider border border-white/20">
            {product.gradeCode}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-amber-300 font-bold text-[9px] tracking-wide border border-amber-400/30">
            {product.volume}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#9E5714] dark:text-[#E59A4D] mb-0.5">
            {product.categoryLabel}
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#11281E] dark:text-[#F9F6F0] mb-1 group-hover:text-[#9E5714] dark:group-hover:text-[#E59A4D] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-[#2D3E33] dark:text-[#E2EBE5] leading-relaxed mb-3">
            {product.description}
          </p>

          {/* 1. Flexible Bulk Weight Controller (Quills, Quill Cuts - custom continuous weight in Kg) */}
          {isBulkModel && (
            <div className="py-2 border-t border-[#E2D8C8] dark:border-white/10 mb-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D62] dark:text-[#A3B899] flex items-center gap-1">
                  <Scale className="w-3 h-3 text-[#9E5714] dark:text-[#E5A855]" />
                  <span>{t.catalog.customWeightOrder || 'Custom Weight Order (Kg):'}</span>
                </span>
                <span className="text-[9px] text-[#9E5714] dark:text-[#E5A855] font-semibold">
                  {t.catalog.flexibleBulk || 'Flexible Bulk'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 w-full">
                <button
                  type="button"
                  onClick={() => setBulkWeight((prev) => Math.max(0, parseFloat((prev - (prev > 25 ? 5 : 1)).toFixed(2))))}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-[#0A2F22] hover:bg-[#C87A28] hover:text-white border border-[#C87A28]/30 text-[#11281E] dark:text-white font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Decrease weight"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <div className="flex-1 relative flex items-center min-w-0">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={bulkWeight === 0 ? '0' : bulkWeight}
                    onChange={(e) => setBulkWeight(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full h-9 sm:h-10 px-2 text-center text-xs sm:text-sm font-bold font-mono bg-white dark:bg-[#062319] border border-[#C87A28]/30 rounded-lg text-[#11281E] dark:text-[#F9F6F0] focus:outline-none focus:border-[#C87A28]"
                    placeholder="0"
                  />
                  <span className="absolute right-2.5 text-xs font-bold text-[#9E5714] dark:text-[#E59A4D] pointer-events-none">
                    {t.catalog.bulkUnitKg || 'Kg'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setBulkWeight((prev) => parseFloat((prev + (prev >= 25 ? 5 : 1)).toFixed(2)))}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-[#0A2F22] hover:bg-[#C87A28] hover:text-white border border-[#C87A28]/30 text-[#11281E] dark:text-white font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Increase weight"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* 3. Fixed 1 Kg Unit Pack Controller (Powder, Cut Pieces - strictly 1 Kg sealed pouches) */}
          {isFixedUnitPackModel && (
            <div className="py-2 border-t border-[#E2D8C8] dark:border-white/10 mb-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D62] dark:text-[#A3B899] flex items-center gap-1">
                  <Package className="w-3 h-3 text-[#9E5714] dark:text-[#E5A855]" />
                  <span>{t.catalog.exportPacks1kg || '1 Kg Export Packs:'}</span>
                </span>
                <span className="text-[9px] text-[#9E5714] dark:text-[#E5A855] font-semibold">
                  {t.catalog.pack1kgDesc || '1 Pack = 1 Kg'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 w-full">
                <button
                  type="button"
                  onClick={() => setPackQty((prev) => Math.max(0, prev - 1))}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-[#0A2F22] hover:bg-[#C87A28] hover:text-white border border-[#C87A28]/30 text-[#11281E] dark:text-white font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Decrease packs"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <div className="flex-1 relative flex items-center min-w-0">
                  <input
                    type="number"
                    min="0"
                    value={packQty === 0 ? '0' : packQty}
                    onChange={(e) => setPackQty(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full h-9 sm:h-10 px-2 text-center text-xs sm:text-sm font-bold font-mono bg-white dark:bg-[#062319] border border-[#C87A28]/30 rounded-lg text-[#11281E] dark:text-[#F9F6F0] focus:outline-none focus:border-[#C87A28]"
                  />
                  <span className="absolute right-2.5 text-xs font-bold text-[#9E5714] dark:text-[#E59A4D] pointer-events-none">
                    {t.catalog.packsUnit || 'Packs'} ({packQty} Kg)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPackQty((prev) => prev + 1)}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-[#0A2F22] hover:bg-[#C87A28] hover:text-white border border-[#C87A28]/30 text-[#11281E] dark:text-white font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Increase packs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* 4. Fixed Pack Units (Jade Cinnamon Luxury Leaf Oil Gift Set - 4 bottles per pack) */}
          {isGiftPackModel && (
            <div className="py-2 border-t border-[#E2D8C8] dark:border-white/10 mb-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D62] dark:text-[#A3B899] flex items-center gap-1">
                  <Package className="w-3 h-3 text-[#9E5714] dark:text-[#E5A855]" />
                  <span>{t.catalog.masterGiftSets || 'Master Gift Sets:'}</span>
                </span>
                <span className="text-[9px] text-[#9E5714] dark:text-[#E5A855] font-semibold">
                  {t.catalog.giftSetDesc || '4 Bottles / Pack'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 w-full">
                <button
                  type="button"
                  onClick={() => setPackQty((prev) => Math.max(0, prev - 1))}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-[#0A2F22] hover:bg-[#C87A28] hover:text-white border border-[#C87A28]/30 text-[#11281E] dark:text-white font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Decrease packs"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <div className="flex-1 relative flex items-center min-w-0">
                  <input
                    type="number"
                    min="0"
                    value={packQty === 0 ? '0' : packQty}
                    onChange={(e) => setPackQty(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full h-9 sm:h-10 px-2 text-center text-xs sm:text-sm font-bold font-mono bg-white dark:bg-[#062319] border border-[#C87A28]/30 rounded-lg text-[#11281E] dark:text-[#F9F6F0] focus:outline-none focus:border-[#C87A28]"
                  />
                  <span className="absolute right-2.5 text-xs font-bold text-[#9E5714] dark:text-[#E59A4D] pointer-events-none">
                    {t.catalog.packsUnit || 'Packs'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPackQty((prev) => prev + 1)}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-[#0A2F22] hover:bg-[#C87A28] hover:text-white border border-[#C87A28]/30 text-[#11281E] dark:text-white font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Increase packs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons with 44px min tap targets */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onOpenSpecs(product)}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-jade-900/80 hover:bg-[#ebd7ad] dark:hover:bg-jade-800 border border-[#E2D8C8] dark:border-white/10 text-xs sm:text-sm font-medium text-[#11281E] dark:text-[#F9F6F0] transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-[#9E5714] dark:text-[#E5A855] shrink-0" />
              <span className="whitespace-nowrap">{t.catalog.viewSpecs || 'Details'}</span>
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap ${
                isAdded
                  ? 'bg-amber-500 text-black shadow-amber-400/40 border border-amber-300'
                  : 'bg-[#f6ecd6] dark:bg-[#093527] hover:bg-[#ebd7ad] dark:hover:bg-[#0d4734] text-[#9E5714] dark:text-amber-200 border border-[#C87A28]/40 hover:border-[#C87A28]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 text-black shrink-0" />
                  <span className="whitespace-nowrap">{t.catalog.added || 'Added!'}</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-[#9E5714] dark:text-amber-300 shrink-0" />
                  <span className="whitespace-nowrap">{t.catalog.addToCart || 'Add to Cart'}</span>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={handleOrderNow}
            className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#25D366]/30 transition-all cursor-pointer whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
            <span className="whitespace-nowrap">{t.catalog.orderNow || 'Direct WhatsApp RFQ'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
