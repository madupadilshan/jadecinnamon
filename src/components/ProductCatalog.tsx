import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ShieldCheck, FileCheck, Package } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Product, ProductVariant } from '../data/products';
import { TranslationSchema } from '../data/translations';
import { ProductRowListView } from './narratives/ProductRowListView';
import { getAssetUrl } from '../utils/assets';

interface ProductCatalogProps {
  t: TranslationSchema;
  onSelectProductForRfq: (product: Product) => void;
  isRtl?: boolean;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  t,
  onSelectProductForRfq,
  isRtl = false,
}) => {
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [modalSelectedVariant, setModalSelectedVariant] = useState<ProductVariant | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (activeModalProduct?.variants && activeModalProduct.variants.length > 0) {
      setModalSelectedVariant(activeModalProduct.variants[0]);
    } else {
      setModalSelectedVariant(null);
    }
  }, [activeModalProduct]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  const handleQuickOrder = (product: Product, variant?: ProductVariant | null) => {
    const targetProduct = variant
      ? {
          ...product,
          gradeCode: variant.gradeCode,
          volume: variant.volume,
          name: `${product.name} (${variant.volume})`,
        }
      : product;

    onSelectProductForRfq(targetProduct);
    const rfqSection = document.getElementById('rfq');
    if (rfqSection) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(rfqSection, { offset: -80 });
      } else {
        rfqSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      className="py-20 sm:py-28 relative overflow-hidden border-t border-[#C87A28]/20 dark:border-[#C87A28]/30 bg-[#FBF8F2] dark:bg-[#062319] scroll-mt-20 transition-colors duration-300"
    >
      {/* Parallax Background Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-110 opacity-30 dark:opacity-40 gpu-layer"
        style={{
          backgroundImage: `url('${getAssetUrl('images/gallery-drying.webp')}')`,
          y: bgY,
        }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBF8F2]/90 via-[#FBF8F2]/60 to-[#FBF8F2]/95 dark:from-[#062319]/92 dark:via-black/65 dark:to-[#062319]/95 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 gpu-accelerate"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-3 sm:mb-4 tracking-tight drop-shadow-sm">
            {t.catalog.title}
          </h2>
          <p className="text-[#3B4D43] dark:text-[#D1DDD5] text-sm sm:text-base leading-relaxed">
            {t.catalog.subtitle}
          </p>
        </motion.div>

        {/* Single-Row List View with Advanced Navigation & Real-Time Search */}
        <ProductRowListView
          t={t}
          onOpenSpecs={(p) => setActiveModalProduct(p)}
          onQuickOrder={handleQuickOrder}
          isRtl={isRtl}
        />
      </div>

      {/* Product Lab Specs & Certificate Modal */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProduct(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0A2F22] border border-[#C87A28]/20 dark:border-[#C87A28]/30 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col gpu-accelerate"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-[#C87A28]/20 dark:border-white/10 flex items-start justify-between bg-[#FBF8F2] dark:bg-jade-950/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f6ecd6] dark:bg-ceylon-500/20 border border-[#C87A28]/30 dark:border-ceylon-500/30 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#9E5714] dark:text-[#E59A4D]" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#9E5714] dark:text-[#E59A4D] font-bold uppercase tracking-wider">
                      {modalSelectedVariant?.gradeCode || activeModalProduct.gradeCode} • {activeModalProduct.categoryLabel}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#11281E] dark:text-[#F9F6F0]">
                      {activeModalProduct.name}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalProduct(null)}
                  className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#11281E] dark:text-[#F9F6F0] hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content Scrollable Area */}
              <div
                data-lenis-prevent
                className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6"
              >
                {/* Interactive Variant Selector in Modal */}
                {activeModalProduct.variants && activeModalProduct.variants.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-[#F4EFE6] dark:bg-black/40 border border-[#C87A28]/20 dark:border-white/10">
                    <div className="text-xs font-bold text-[#9E5714] dark:text-[#E59A4D] uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Select Bottle Size / Volume Format:</span>
                      {modalSelectedVariant && (
                        <span className="font-mono text-[11px] text-[#11281E] dark:text-[#F9F6F0]">
                          {modalSelectedVariant.gradeCode}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeModalProduct.variants.map((v) => {
                        const isSelected = modalSelectedVariant?.id === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setModalSelectedVariant(v)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#C87A28] text-white shadow-md shadow-[#C87A28]/40 ring-1 ring-[#C87A28]'
                                : 'bg-white dark:bg-white/5 hover:bg-[#ebd7ad] dark:hover:bg-white/10 text-[#11281E] dark:text-[#F9F6F0] border border-[#E2D8C8] dark:border-white/10'
                            }`}
                          >
                            {v.label || v.volume}
                          </button>
                        );
                      })}
                    </div>
                    {modalSelectedVariant?.description && (
                      <p className="text-[11px] text-[#5A6D62] dark:text-[#A3B899] mt-2 italic">
                        {modalSelectedVariant.description}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold text-[#5A6D62] dark:text-[#A3B899] uppercase tracking-wider mb-2">
                    Official Product Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-[#3B4D43] dark:text-[#D1DDD5] leading-relaxed">
                    {activeModalProduct.longDescription}
                  </p>
                </div>

                {/* Technical Parameters Table */}
                <div>
                  <h4 className="text-xs font-bold text-[#9E5714] dark:text-[#E59A4D] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-[#9E5714] dark:text-[#E59A4D]" />
                    <span>{t.catalog.specsTitle}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 bg-[#F4EFE6] dark:bg-black/40 p-4 rounded-xl border border-[#C87A28]/20 dark:border-white/5">
                    {activeModalProduct.specs.botanicalName && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 sm:col-span-2">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Botanical Name</div>
                        <div className="text-sm font-semibold italic text-[#11281E] dark:text-[#F9F6F0]">
                          {activeModalProduct.specs.botanicalName}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.eugenol && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 border border-emerald-500/30">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Eugenol Active (GC-MS)</div>
                        <div className="text-sm font-bold text-emerald-800 dark:text-emerald-400">
                          {activeModalProduct.specs.eugenol}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.cinnamaldehyde && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Cinnamaldehyde Content</div>
                        <div className="text-sm font-semibold text-[#9E5714] dark:text-[#E59A4D]">
                          {activeModalProduct.specs.cinnamaldehyde}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.plantPart && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Plant Part Used</div>
                        <div className="text-sm font-semibold text-[#11281E] dark:text-[#F9F6F0]">
                          {activeModalProduct.specs.plantPart}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.extractionMethod && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Extraction Method</div>
                        <div className="text-sm font-semibold text-[#11281E] dark:text-[#F9F6F0]">
                          {activeModalProduct.specs.extractionMethod}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.specificGravity && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Specific Gravity (20°C)</div>
                        <div className="text-sm font-semibold text-[#11281E] dark:text-[#F9F6F0]">
                          {activeModalProduct.specs.specificGravity}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.refractiveIndex && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Refractive Index (20°C)</div>
                        <div className="text-sm font-semibold text-[#11281E] dark:text-[#F9F6F0]">
                          {activeModalProduct.specs.refractiveIndex}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.diameter && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 border border-amber-500/30">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Quill Diameter / Cut Size</div>
                        <div className="text-sm font-bold text-[#9E5714] dark:text-[#E59A4D]">
                          {activeModalProduct.specs.diameter}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.meshSize && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 border border-amber-500/30">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Granulometry / Mesh Size</div>
                        <div className="text-sm font-bold text-[#9E5714] dark:text-[#E59A4D]">
                          {activeModalProduct.specs.meshSize}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.coumarin && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 border border-emerald-500/30">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Coumarin Level</div>
                        <div className="text-sm font-bold text-emerald-800 dark:text-emerald-400">
                          {activeModalProduct.specs.coumarin}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.moisture && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Moisture Content</div>
                        <div className="text-sm font-semibold text-[#11281E] dark:text-[#F9F6F0]">
                          {activeModalProduct.specs.moisture}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.volatileOil && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Volatile Essential Oil</div>
                        <div className="text-sm font-semibold text-[#11281E] dark:text-[#F9F6F0]">
                          {activeModalProduct.specs.volatileOil}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.appearance && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 sm:col-span-2">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Visual Appearance & Texture</div>
                        <div className="text-sm font-semibold text-[#11281E] dark:text-[#F9F6F0]">
                          {activeModalProduct.specs.appearance}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.aroma && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 sm:col-span-2">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Aroma & Sensory Profile</div>
                        <div className="text-sm font-semibold text-[#11281E] dark:text-[#F9F6F0]">
                          {activeModalProduct.specs.aroma}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.origin && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Country of Origin</div>
                        <div className="text-sm font-semibold text-[#11281E] dark:text-[#F9F6F0]">
                          {activeModalProduct.specs.origin}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.gradeStandard && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 sm:col-span-2">
                        <div className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">Compliance & Standard</div>
                        <div className="text-sm font-semibold text-[#11281E] dark:text-[#F9F6F0]">
                          {activeModalProduct.specs.gradeStandard}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Key Benefits */}
                {activeModalProduct.keyBenefits && activeModalProduct.keyBenefits.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-[#5A6D62] dark:text-[#A3B899] uppercase tracking-wider mb-2.5">
                      Verified Bioactive Highlights
                    </h4>
                    <ul className="space-y-1.5 bg-[#F4EFE6] dark:bg-jade-950/60 p-3.5 rounded-xl border border-[#C87A28]/20 dark:border-white/5 text-xs text-[#3B4D43] dark:text-[#D1DDD5]">
                      {activeModalProduct.keyBenefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Packaging & Logistics Details */}
                <div>
                  <h4 className="text-xs font-bold text-[#5A6D62] dark:text-[#A3B899] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-[#9E5714] dark:text-[#E59A4D]" />
                    <span>{t.catalog.packaging}</span>
                  </h4>
                  <div className="text-xs sm:text-sm text-[#3B4D43] dark:text-[#D1DDD5] bg-[#F4EFE6] dark:bg-jade-950/60 p-3 rounded-xl border border-[#C87A28]/20 dark:border-white/5">
                    {modalSelectedVariant?.packaging || activeModalProduct.packaging}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:p-6 border-t border-[#C87A28]/20 dark:border-white/10 bg-[#FBF8F2] dark:bg-jade-950/90 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalProduct(null)}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-semibold text-[#11281E] dark:text-[#F9F6F0] transition-colors cursor-pointer"
                >
                  {t.catalog.close}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const prod = activeModalProduct;
                    const variant = modalSelectedVariant;
                    setActiveModalProduct(null);
                    handleQuickOrder(prod, variant);
                  }}
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#25D366]/40 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>
                    Configure WhatsApp RFQ for {activeModalProduct.name}
                    {modalSelectedVariant ? ` (${modalSelectedVariant.volume})` : ''}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductCatalog;
