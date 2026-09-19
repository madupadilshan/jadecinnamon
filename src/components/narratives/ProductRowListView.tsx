import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  PackageSearch,
} from 'lucide-react';
import { Product, PRODUCTS, CATEGORIES } from '../../data/products';
import { TranslationSchema } from '../../data/translations';
import { ProductRowCard } from './ProductRowCard';
import { ProductListNavigator } from './ProductListNavigator';

interface ProductRowListViewProps {
  t: TranslationSchema;
  onOpenSpecs: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
  isRtl?: boolean;
}

export const ProductRowListView: React.FC<ProductRowListViewProps> = ({
  t,
  onOpenSpecs,
  onQuickOrder,
  isRtl = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Responsive items-per-page calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerPage(4);
      } else if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 300ms Debounce on Search Term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim().toLowerCase());
      setCurrentPage(0); // reset to first page on search
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when category changes
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(0);
  };

  // Performant client-side filtering across name, grade, category, description
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      if (!matchCategory) return false;
      if (!debouncedSearch) return true;

      const q = debouncedSearch;
      return (
        product.name.toLowerCase().includes(q) ||
        product.gradeCode.toLowerCase().includes(q) ||
        product.categoryLabel.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        (product.specs.gradeStandard &&
          product.specs.gradeStandard.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, debouncedSearch]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  // Ensure current page is valid when filtered results change
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentPage]);

  const canPrev = currentPage > 0;
  const canNext = currentPage < totalPages - 1;

  const handlePrev = () => {
    if (canPrev) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (canNext) setCurrentPage((p) => p + 1);
  };

  const currentSlice = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

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
    <div className="w-full space-y-6">
      {/* Category Tabs & Search Bar Container */}
      <div className="flex flex-col gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 focus:outline-none cursor-pointer select-none flex items-center justify-center ${
                  isActive
                    ? 'text-white'
                    : 'text-[#11281E] dark:text-gray-200 hover:text-[#B86B1E] dark:hover:text-white bg-white dark:bg-black/50 hover:bg-[#F4EFE6] dark:hover:bg-black/75 border border-[#E5D8C5] dark:border-white/10 shadow-sm'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCatalogTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#B86B1E] to-[#C87A28] dark:from-ceylon-600 dark:to-ceylon-500 rounded-xl shadow-lg shadow-[#C87A28]/30 dark:shadow-ceylon-950/60 gpu-accelerate"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{getCategoryLabel(cat.id)}</span>
              </button>
            );
          })}
        </div>

        {/* Real-Time Search Input Bar */}
        <div className="max-w-xl mx-auto w-full px-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#B86B1E] dark:text-amber-300 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search grades (e.g. Alba, C5-SP, Leaf Oil, Black Pepper)..."
              className="w-full pl-11 pr-10 min-h-[48px] py-3 rounded-2xl bg-white dark:bg-[#062319] border border-[#E5D8C5] dark:border-ceylon-500/35 hover:border-[#C87A28] dark:hover:border-ceylon-400 focus:border-[#B86B1E] dark:focus:border-amber-400 text-[#11281E] dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-xs sm:text-sm font-medium focus:outline-none shadow-sm dark:shadow-xl dark:shadow-black/80 transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {debouncedSearch && (
            <div className="flex items-center justify-end px-2 pt-2 text-[11px] text-[#B86B1E] dark:text-ceylon-300">
              <span>Filtered by &ldquo;{debouncedSearch}&rdquo;</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Single-Row List Container with Absolute Directional Buttons */}
      <div className="relative group/row my-4">
        {/* Absolute Left Directional Button (<) */}
        <button
          type="button"
          onClick={isRtl ? handleNext : handlePrev}
          disabled={isRtl ? !canNext : !canPrev}
          className={`hidden sm:flex absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-[#062319] border-2 border-[#E5D8C5] dark:border-[#C87A28]/50 hover:border-[#C87A28] dark:hover:border-amber-300 text-[#B86B1E] dark:text-amber-200 hover:text-[#783C1D] dark:hover:text-white items-center justify-center shadow-md dark:shadow-2xl dark:shadow-black/95 transition-all duration-200 cursor-pointer ${
            (isRtl ? canNext : canPrev)
              ? 'opacity-90 hover:opacity-100 hover:scale-110 active:scale-95'
              : 'opacity-25 cursor-not-allowed border-gray-300 dark:border-white/10 text-gray-400 dark:text-gray-600'
          }`}
          aria-label="Previous products page"
        >
          {isRtl ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </button>

        {/* Absolute Right Directional Button (>) */}
        <button
          type="button"
          onClick={isRtl ? handlePrev : handleNext}
          disabled={isRtl ? !canPrev : !canNext}
          className={`hidden sm:flex absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-[#062319] border-2 border-[#E5D8C5] dark:border-[#C87A28]/50 hover:border-[#C87A28] dark:hover:border-amber-300 text-[#B86B1E] dark:text-amber-200 hover:text-[#783C1D] dark:hover:text-white items-center justify-center shadow-md dark:shadow-2xl dark:shadow-black/95 transition-all duration-200 cursor-pointer ${
            (isRtl ? canPrev : canNext)
              ? 'opacity-90 hover:opacity-100 hover:scale-110 active:scale-95'
              : 'opacity-25 cursor-not-allowed border-gray-300 dark:border-white/10 text-gray-400 dark:text-gray-600'
          }`}
          aria-label="Next products page"
        >
          {isRtl ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </button>

        {/* Row Viewport */}
        <div ref={scrollContainerRef} className="w-full overflow-x-hidden px-1 py-3">
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full min-h-[340px] flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-white/95 dark:bg-[#062319]/80 border border-[#E5D8C5] dark:border-ceylon-500/30 shadow-lg dark:shadow-xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#f6ecd6] dark:bg-black/60 border border-[#E5D8C5] dark:border-white/10 flex items-center justify-center mb-4">
                  <PackageSearch className="w-8 h-8 text-[#B86B1E] dark:text-ceylon-400" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#11281E] dark:text-white mb-2">
                  No products found for &ldquo;{searchTerm}&rdquo;
                </h4>
                <p className="text-xs text-[#536B5C] dark:text-gray-300 max-w-sm leading-relaxed mb-4">
                  Try searching with different keywords like &ldquo;Alba&rdquo;, &ldquo;Powder&rdquo;, &ldquo;Oil&rdquo;, or reset your filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2.5 min-h-[44px] rounded-xl bg-[#C87A28] hover:bg-[#b0671c] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Reset All Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`page-${currentPage}-${selectedCategory}-${debouncedSearch}`}
                initial={{ opacity: 0, x: isRtl ? -30 : 30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: isRtl ? 30 : -30, y: -10 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch`}
              >
                {currentSlice.map((product) => (
                  <div key={product.id} className="h-full">
                    <ProductRowCard
                      product={product}
                      t={t}
                      onOpenSpecs={onOpenSpecs}
                      onQuickOrder={onQuickOrder}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination Controls Sub-Component */}
      <ProductListNavigator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onPrev={handlePrev}
        onNext={handleNext}
        canPrev={canPrev}
        canNext={canNext}
        isRtl={isRtl}
      />
    </div>
  );
};

export default ProductRowListView;
