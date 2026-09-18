import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ShieldCheck, FileCheck, Package } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Product, PRODUCTS, CATEGORIES } from '../data/products';
import { TranslationSchema } from '../data/translations';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  t: TranslationSchema;
  onSelectProductForRfq: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  t,
  onSelectProductForRfq,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const getCategoryLabel = (catId: string) => {
    switch (catId) {
      case 'quills':
        return t.catalog.catQuills;
      case 'powders':
        return t.catalog.catPowders;
      case 'oils':
        return t.catalog.catOils;
      case 'spices':
        return t.catalog.catSpices;
      default:
        return t.catalog.catAll;
    }
  };

  return (
    <section
      id="products"
      className="py-28 relative bg-cover bg-center bg-no-repeat overflow-hidden border-t border-ceylon-500/20"
      style={{ backgroundImage: "url('/images/bg-products.jpg')" }}
    >
      {/* Increased Background Visibility with Balanced Clear Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#03140e]/88 via-black/60 to-[#03140e]/90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-ceylon-500/40 text-ceylon-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-lg">
            <Sparkles className="w-3 h-3 text-ceylon-400" />
            <span>{t.catalog.badge}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            {t.catalog.title}
          </h2>
          <p className="text-gray-100 text-sm sm:text-base leading-relaxed drop-shadow-sm">
            {t.catalog.subtitle}
          </p>
        </div>

        {/* Filter Tabs with Framer Motion layoutId */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-200 hover:text-white bg-black/55 hover:bg-black/75 border border-white/10 backdrop-blur-md'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCatalogTab"
                    className="absolute inset-0 bg-gradient-to-r from-ceylon-600 to-ceylon-500 rounded-xl shadow-lg shadow-ceylon-950/60"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{getCategoryLabel(cat.id)}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                t={t}
                onOpenSpecs={(p) => setActiveModalProduct(p)}
                onQuickOrder={(p) => {
                  onSelectProductForRfq(p);
                  const rfqSection = document.getElementById('rfq');
                  if (rfqSection) {
                    rfqSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
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
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#062319] border border-ceylon-500/40 rounded-2xl shadow-2xl shadow-black/95 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between bg-jade-950/80">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-ceylon-500/20 border border-ceylon-500/30 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-ceylon-400" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-ceylon-300 font-bold uppercase tracking-wider">
                      {activeModalProduct.gradeCode} • {activeModalProduct.categoryLabel}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {activeModalProduct.name}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalProduct(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content Scrollable Area */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Official Product Overview
                  </h4>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {activeModalProduct.longDescription}
                  </p>
                </div>

                {/* Technical Parameters Table */}
                <div>
                  <h4 className="text-xs font-bold text-ceylon-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-ceylon-400" />
                    <span>{t.catalog.specsTitle}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-black/40 p-4 rounded-xl border border-white/5">
                    {activeModalProduct.specs.diameter && (
                      <div className="p-2 rounded-lg bg-white/5">
                        <div className="text-[11px] text-gray-400">{t.catalog.diameter}</div>
                        <div className="text-sm font-semibold text-white">
                          {activeModalProduct.specs.diameter}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.moisture && (
                      <div className="p-2 rounded-lg bg-white/5">
                        <div className="text-[11px] text-gray-400">{t.catalog.moisture}</div>
                        <div className="text-sm font-semibold text-jade-300">
                          {activeModalProduct.specs.moisture}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.coumarin && (
                      <div className="p-2 rounded-lg bg-white/5">
                        <div className="text-[11px] text-gray-400">{t.catalog.coumarin}</div>
                        <div className="text-sm font-semibold text-ceylon-300">
                          {activeModalProduct.specs.coumarin}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.volatileOil && (
                      <div className="p-2 rounded-lg bg-white/5">
                        <div className="text-[11px] text-gray-400">{t.catalog.volatileOil}</div>
                        <div className="text-sm font-semibold text-amber-200">
                          {activeModalProduct.specs.volatileOil}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.cinnamaldehyde && (
                      <div className="p-2 rounded-lg bg-white/5">
                        <div className="text-[11px] text-gray-400">{t.catalog.cinnamaldehyde}</div>
                        <div className="text-sm font-semibold text-amber-300">
                          {activeModalProduct.specs.cinnamaldehyde}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.eugenol && (
                      <div className="p-2 rounded-lg bg-white/5">
                        <div className="text-[11px] text-gray-400">{t.catalog.eugenol}</div>
                        <div className="text-sm font-semibold text-amber-300">
                          {activeModalProduct.specs.eugenol}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.meshSize && (
                      <div className="p-2 rounded-lg bg-white/5">
                        <div className="text-[11px] text-gray-400">Mesh Fineness</div>
                        <div className="text-sm font-semibold text-white">
                          {activeModalProduct.specs.meshSize}
                        </div>
                      </div>
                    )}
                    {activeModalProduct.specs.gradeStandard && (
                      <div className="p-2 rounded-lg bg-white/5 col-span-1 sm:col-span-2">
                        <div className="text-[11px] text-gray-400">{t.catalog.standard}</div>
                        <div className="text-sm font-semibold text-white">
                          {activeModalProduct.specs.gradeStandard}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Packaging & Logistics Details */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-ceylon-400" />
                    <span>{t.catalog.packaging}</span>
                  </h4>
                  <div className="text-xs sm:text-sm text-gray-300 bg-jade-950/60 p-3 rounded-xl border border-white/5">
                    {activeModalProduct.packaging}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:p-6 border-t border-white/10 bg-jade-950/90 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalProduct(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  {t.catalog.close}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const prod = activeModalProduct;
                    setActiveModalProduct(null);
                    onSelectProductForRfq(prod);
                    const rfqSection = document.getElementById('rfq');
                    if (rfqSection) {
                      rfqSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#25D366]/40 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Configure WhatsApp RFQ for {activeModalProduct.name}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
