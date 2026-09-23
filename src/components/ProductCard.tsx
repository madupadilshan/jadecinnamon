import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, FileText, Plus, Minus, Check, Package, Scale, Droplets } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Product, ProductVariant } from '../data/products';
import { TranslationSchema } from '../data/translations';
import { useCart, QuotationUnit } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  t: TranslationSchema;
  onOpenSpecs: (product: Product) => void;
  onQuickOrder: (product: Product, variant?: ProductVariant, quantity?: number, unit?: QuotationUnit) => void;
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

  // Selected variant for multi-variant volume products (Pure Ceylon Cinnamon Leaf Oil)
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants?.[0]?.id || '15ml'
  );

  // 1. Bulk Weight Model State (Kg)
  const [bulkWeight, setBulkWeight] = useState<number>(0);

  // 2. Bottle Order Model State (Bottles)
  const [bottleQty, setBottleQty] = useState<number>(0);

  // 3. Fixed Pack Model State (Packs)
  const [packQty, setPackQty] = useState<number>(0);

  const selectedVariant =
    product.variants?.find((v) => v.id === selectedVariantId) ||
    product.variants?.[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    setImageScale(1.08);
    setTimeout(() => setImageScale(1), 350);

    if (
      product.buyingModel === 'multi_variant_volume' ||
      product.buyingModel === 'volume_variants' ||
      product.buyingModel === 'multi_volume'
    ) {
      addToCart(product, bottleQty, 'Bottles', e, selectedVariant);
    } else if (
      product.buyingModel === 'flexible_bulk' ||
      product.buyingModel === 'bulk_weight'
    ) {
      addToCart(product, bulkWeight, 'Kg', e);
    } else if (
      (product.buyingModel === 'fixed_pack' && product.id === 'leaf-oil-box-set') ||
      product.buyingModel === 'gift_pack'
    ) {
      addToCart(product, packQty, 'Packs', e);
    } else if (
      product.buyingModel === 'fixed_unit_pack' ||
      product.buyingModel === 'fixed_pack' ||
      product.buyingModel === 'fixed_1kg_pack'
    ) {
      addToCart(product, packQty, 'Packs', e);
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleOrderNow = () => {
    if (
      product.buyingModel === 'multi_variant_volume' ||
      product.buyingModel === 'volume_variants' ||
      product.buyingModel === 'multi_volume'
    ) {
      onQuickOrder(product, selectedVariant, bottleQty, 'Bottles');
    } else if (
      product.buyingModel === 'flexible_bulk' ||
      product.buyingModel === 'bulk_weight'
    ) {
      onQuickOrder(product, undefined, bulkWeight, 'Kg');
    } else if (
      (product.buyingModel === 'fixed_pack' && product.id === 'leaf-oil-box-set') ||
      product.buyingModel === 'gift_pack'
    ) {
      onQuickOrder(product, undefined, packQty, 'Packs');
    } else {
      onQuickOrder(product, undefined, packQty, 'Packs');
    }
  };

  const isVolumeModel =
    product.buyingModel === 'multi_variant_volume' ||
    product.buyingModel === 'volume_variants' ||
    product.buyingModel === 'multi_volume';
  const isBulkModel =
    product.buyingModel === 'flexible_bulk' ||
    product.buyingModel === 'bulk_weight';
  const isFixedUnitPackModel =
    (product.buyingModel === 'fixed_unit_pack' ||
      product.buyingModel === 'fixed_pack' ||
      product.buyingModel === 'fixed_1kg_pack') &&
    product.id !== 'leaf-oil-box-set';
  const isGiftPackModel =
    (product.buyingModel === 'fixed_pack' && product.id === 'leaf-oil-box-set') ||
    product.buyingModel === 'gift_pack';

  // Real-time calculated volume in ml for oil bottles
  const oilSizeNum = parseInt(selectedVariant?.volume || selectedVariantId, 10) || 15;
  const totalOilMl = oilSizeNum * bottleQty;
  const totalOilMlDisplay =
    totalOilMl >= 1000
      ? `${(totalOilMl / 1000).toFixed(2).replace(/\.00$/, '')}L (${totalOilMl.toLocaleString()}ml)`
      : `${totalOilMl.toLocaleString()}ml`;

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

        {/* Grade Code & Buying Model Chip */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-ceylon-600 text-white font-mono font-bold text-xs shadow-lg tracking-wider border border-white/20">
            {product.gradeCode}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-amber-300 font-bold text-[10px] tracking-wide border border-amber-400/30">
            {product.volume}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#9E5714] dark:text-[#E59A4D] mb-1">
            {product.categoryLabel}
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-2 group-hover:text-[#9E5714] dark:group-hover:text-[#E59A4D] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#2D3E33] dark:text-[#E2EBE5] leading-relaxed mb-3">
            {product.description}
          </p>

          {/* 1. Amber Dropper Bottles Controller (15ml, 30ml, 50ml, 100ml) */}
          {isVolumeModel && (
            <div className="py-2.5 border-t border-[#E2D8C8] dark:border-white/10 mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A6D62] dark:text-[#A3B899] flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-[#9E5714] dark:text-[#E5A855] shrink-0" />
                  <span>{t.catalog.selectBottleSize || 'Select Bottle Size:'}</span>
                </span>
                <span className="text-[10px] text-[#9E5714] dark:text-[#E5A855] font-semibold">
                  {selectedVariant?.volume || '15ml'}
                </span>
              </div>

              {/* Segmented Pill Selector (15ml | 30ml | 50ml | 100ml) */}
              <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-[#F4EFE6] dark:bg-black/50 border border-[#C87A28]/25 dark:border-white/10">
                {(product.variants || [
                  { id: '15ml', volume: '15ml' },
                  { id: '30ml', volume: '30ml' },
                  { id: '50ml', volume: '50ml' },
                  { id: '100ml', volume: '100ml' },
                ]).map((v) => {
                  const isSelected = selectedVariantId === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'bg-[#9E5714] dark:bg-[#C87A28] text-white shadow-sm shadow-[#9E5714]/30'
                          : 'text-[#5A6D62] dark:text-[#A3B899] hover:text-[#11281E] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {v.volume || v.id}
                    </button>
                  );
                })}
              </div>

              {/* Bottle Quantity Row */}
              <div className="flex items-center gap-2 w-full">
                <button
                  type="button"
                  onClick={() => setBottleQty((prev) => Math.max(0, prev - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-[#0A2F22] hover:bg-[#C87A28] hover:text-white border border-[#C87A28]/30 text-[#11281E] dark:text-white font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Decrease bottles"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 relative flex items-center min-w-0">
                  <input
                    type="number"
                    min="0"
                    value={bottleQty === 0 ? '0' : bottleQty}
                    onChange={(e) => setBottleQty(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full h-10 px-3 text-center font-bold font-mono bg-white dark:bg-[#062319] border border-[#C87A28]/30 rounded-lg text-[#11281E] dark:text-[#F9F6F0] focus:outline-none focus:border-[#C87A28] text-sm"
                    placeholder="0"
                  />
                  <span className="absolute right-3 text-xs font-bold text-[#9E5714] dark:text-[#E59A4D] pointer-events-none">
                    {t.catalog.bottlePlural || 'Bottles'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setBottleQty((prev) => prev + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-[#0A2F22] hover:bg-[#C87A28] hover:text-white border border-[#C87A28]/30 text-[#11281E] dark:text-white font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Increase bottles"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic Subtotal Volume Display */}
              <div className="flex items-center justify-between text-xs font-semibold text-[#9E5714] dark:text-[#E59A4D] px-0.5 pt-0.5">
                <span>{selectedVariant?.volume || '15ml'} × {bottleQty} {bottleQty === 1 ? 'bottle' : 'bottles'}</span>
                <span>= {totalOilMlDisplay}</span>
              </div>
            </div>
          )}

          {/* 2. Flexible Bulk Weight Controller (Quills, Quill Cuts - custom continuous user weight in Kg) */}
          {isBulkModel && (
            <div className="py-2.5 border-t border-[#E2D8C8] dark:border-white/10 mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A6D62] dark:text-[#A3B899] flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#9E5714] dark:text-[#E5A855] shrink-0" />
                  <span>{t.catalog.customWeightOrder || 'Custom Weight Order (Kg):'}</span>
                </span>
                <span className="text-[10px] text-[#9E5714] dark:text-[#E5A855] font-semibold">
                  {t.catalog.flexibleBulk || 'Flexible Bulk'}
                </span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <button
                  type="button"
                  onClick={() => setBulkWeight((prev) => Math.max(0, parseFloat((prev - (prev > 25 ? 5 : 1)).toFixed(2))))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-[#0A2F22] hover:bg-[#C87A28] hover:text-white border border-[#C87A28]/30 text-[#11281E] dark:text-white font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Decrease weight"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 relative flex items-center min-w-0">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={bulkWeight === 0 ? '0' : bulkWeight}
                    onChange={(e) => setBulkWeight(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full h-10 px-3 text-center font-bold font-mono bg-white dark:bg-[#062319] border border-[#C87A28]/30 rounded-lg text-[#11281E] dark:text-[#F9F6F0] focus:outline-none focus:border-[#C87A28] text-sm"
                    placeholder="0"
                  />
                  <span className="absolute right-3 text-xs font-bold text-[#9E5714] dark:text-[#E59A4D] pointer-events-none">
                    {t.catalog.bulkUnitKg || 'Kg'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setBulkWeight((prev) => parseFloat((prev + (prev >= 25 ? 5 : 1)).toFixed(2)))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-[#0A2F22] hover:bg-[#C87A28] hover:text-white border border-[#C87A28]/30 text-[#11281E] dark:text-white font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Increase weight"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#9E5714] dark:text-[#E59A4D] px-0.5 pt-0.5">
                <span>Direct Bulk Weight</span>
                <span>= {bulkWeight} Kg</span>
              </div>
            </div>
          )}

          {/* 3. Fixed 1 Kg Pack Controller (Powder, Cut Pieces) */}
          {isFixedUnitPackModel && (
            <div className="py-2.5 border-t border-[#E2D8C8] dark:border-white/10 mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A6D62] dark:text-[#A3B899] flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-[#9E5714] dark:text-[#E5A855] shrink-0" />
                  <span>{t.catalog.exportPacks1kg || '1 Kg Export Packs:'}</span>
                </span>
                <span className="text-[10px] text-[#9E5714] dark:text-[#E5A855] font-semibold">
                  {t.catalog.pack1kgDesc || 'Pack of 1Kg'}
                </span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <button
                  type="button"
                  onClick={() => setPackQty((prev) => Math.max(0, prev - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-[#0A2F22] hover:bg-[#C87A28] hover:text-white border border-[#C87A28]/30 text-[#11281E] dark:text-white font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Decrease packs"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 relative flex items-center min-w-0">
                  <input
                    type="number"
                    min="0"
                    value={packQty === 0 ? '0' : packQty}
                    onChange={(e) => setPackQty(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full h-10 px-3 text-center font-bold font-mono bg-white dark:bg-[#062319] border border-[#C87A28]/30 rounded-lg text-[#11281E] dark:text-[#F9F6F0] focus:outline-none focus:border-[#C87A28] text-sm"
                  />
                  <span className="absolute right-3 text-xs font-bold text-[#9E5714] dark:text-[#E59A4D] pointer-events-none">
                    1Kg Packs
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPackQty((prev) => prev + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-[#0A2F22] hover:bg-[#C87A28] hover:text-white border border-[#C87A28]/30 text-[#11281E] dark:text-white font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Increase packs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#9E5714] dark:text-[#E59A4D] px-0.5 pt-0.5">
                <span>{packQty} × 1Kg {packQty === 1 ? 'Pack' : 'Packs'}</span>
                <span>= {packQty} Kg</span>
              </div>
            </div>
          )}

          {/* 4. Fixed Pack Units (Jade Cinnamon Luxury Leaf Oil Gift Set) */}
          {isGiftPackModel && (
            <div className="py-2.5 border-t border-[#E2D8C8] dark:border-white/10 mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A6D62] dark:text-[#A3B899] flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-[#9E5714] dark:text-[#E5A855] shrink-0" />
                  <span>{t.catalog.masterGiftSets || 'Master Gift Sets:'}</span>
                </span>
                <span className="text-[10px] text-[#9E5714] dark:text-[#E5A855] font-semibold">
                  Contains 4 bottles / pack
                </span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <button
                  type="button"
                  onClick={() => setPackQty((prev) => Math.max(0, prev - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-[#0A2F22] hover:bg-[#C87A28] hover:text-white border border-[#C87A28]/30 text-[#11281E] dark:text-white font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Decrease packs"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 relative flex items-center min-w-0">
                  <input
                    type="number"
                    min="0"
                    value={packQty === 0 ? '0' : packQty}
                    onChange={(e) => setPackQty(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full h-10 px-3 text-center font-bold font-mono bg-white dark:bg-[#062319] border border-[#C87A28]/30 rounded-lg text-[#11281E] dark:text-[#F9F6F0] focus:outline-none focus:border-[#C87A28] text-sm"
                  />
                  <span className="absolute right-3 text-xs font-bold text-[#9E5714] dark:text-[#E59A4D] pointer-events-none">
                    {t.catalog.packsUnit || 'Packs'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPackQty((prev) => prev + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-[#0A2F22] hover:bg-[#C87A28] hover:text-white border border-[#C87A28]/30 text-[#11281E] dark:text-white font-bold transition-colors cursor-pointer shrink-0"
                  aria-label="Increase packs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#9E5714] dark:text-[#E59A4D] px-0.5 pt-0.5">
                <span>Contains 4 bottles / pack</span>
                <span>{packQty > 0 ? `${packQty * 4} bottles total` : 'Fixed Box Set'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons: View Specs, (+) Add to Cart, Order on WhatsApp */}
        <div className="space-y-2 pt-2">
          <div className="grid grid-cols-2 gap-2">
            {/* Details Button */}
            <button
              type="button"
              onClick={() => onOpenSpecs(product)}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-jade-900/80 hover:bg-[#ebd7ad] dark:hover:bg-jade-800 border border-[#E2D8C8] dark:border-white/10 text-xs sm:text-sm font-medium text-[#11281E] dark:text-[#F9F6F0] transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-[#9E5714] dark:text-[#E5A855] shrink-0" />
              <span className="whitespace-nowrap">{t.catalog.viewSpecs || 'Details'}</span>
            </button>

            {/* (+) Add to Cart Button */}
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

          {/* Direct WhatsApp Action Button */}
          <button
            type="button"
            onClick={handleOrderNow}
            className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#25D366]/30 cursor-pointer whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
            <span className="whitespace-nowrap">{t.catalog.orderNow || 'Direct WhatsApp RFQ'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
