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
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        // On mobile, show 4 items per page with swipeable horizontal snap carousel
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 250ms Debounce on Search Term
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
    if (canPrev) {
      setCurrentPage((p) => p - 1);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  };

  const handleNext = () => {
    if (canNext) {
      setCurrentPage((p) => p + 1);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
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
        <div className="flex flex-wrap items-center justify-center gap-2 px-2">
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
                    : 'text-[#11281E] dark:text-[#F9F6F0] hover:text-[#9E5714] dark:hover:text-white bg-white dark:bg-black/50 hover:bg-[#F4EFE6] dark:hover:bg-black/75 border border-[#E2D8C8] dark:border-white/10 shadow-sm'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCatalogTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#9E5714] to-[#C87A28] dark:from-ceylon-600 dark:to-ceylon-500 rounded-xl shadow-lg shadow-[#C87A28]/30 dark:shadow-ceylon-950/60 gpu-accelerate"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{getCategoryLabel(cat.id)}</span>
              </button>
            );
          })}
        </div>

        {/* Real-Time Search Bar with Instant Clear Button (w-full px-4 mb-4) */}
        <div className="max-w-xl mx-auto w-full px-4 mb-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#9E5714] dark:text-[#E5A855] absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search grades (e.g. Alba, C5-SP, Leaf Oil, Black Pepper)..."
              className="w-full pl-11 pr-11 min-h-[48px] py-3 rounded-2xl bg-white dark:bg-[#062319] border border-[#E2D8C8] dark:border-ceylon-500/35 hover:border-[#C87A28] dark:hover:border-ceylon-400 focus:border-[#9E5714] dark:focus:border-amber-400 text-[#11281E] placeholder:text-[#829288] dark:text-[#F9F6F0] dark:placeholder:text-[#64796E] text-xs sm:text-sm font-medium focus:outline-none shadow-sm dark:shadow-xl dark:shadow-black/80 transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-[#5A6D62] dark:text-[#A3B899] hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {debouncedSearch && (
            <div className="flex items-center justify-end px-2 pt-2 text-[11px] text-[#9E5714] dark:text-[#E5A855]">
              <span>Filtered by &ldquo;{debouncedSearch}&rdquo;</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Single-Row List Container with Desktop Side Arrows + Mobile Top/Bottom Controls */}
      <div className="relative group/row my-2">
        {/* Desktop Side Arrow Left (<) */}
        <button
          type="button"
          onClick={isRtl ? handleNext : handlePrev}
          disabled={isRtl ? !canNext : !canPrev}
          className={`hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white dark:bg-[#062319] border-2 border-[#E2D8C8] dark:border-[#C87A28]/50 hover:border-[#C87A28] dark:hover:border-amber-300 text-[#9E5714] dark:text-[#E5A855] hover:text-[#783C1D] dark:hover:text-white items-center justify-center shadow-md dark:shadow-2xl dark:shadow-black/95 transition-all duration-200 cursor-pointer ${
            (isRtl ? canNext : canPrev)
              ? 'opacity-90 hover:opacity-100 hover:scale-110 active:scale-95'
              : 'opacity-25 cursor-not-allowed border-gray-300 dark:border-white/10 text-gray-400 dark:text-gray-600'
          }`}
          aria-label="Previous products page"
        >
          {isRtl ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </button>

        {/* Desktop Side Arrow Right (>) */}
        <button
          type="button"
          onClick={isRtl ? handlePrev : handleNext}
          disabled={isRtl ? !canPrev : !canNext}
          className={`hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white dark:bg-[#062319] border-2 border-[#E2D8C8] dark:border-[#C87A28]/50 hover:border-[#C87A28] dark:hover:border-amber-300 text-[#9E5714] dark:text-[#E5A855] hover:text-[#783C1D] dark:hover:text-white items-center justify-center shadow-md dark:shadow-2xl dark:shadow-black/95 transition-all duration-200 cursor-pointer ${
            (isRtl ? canPrev : canNext)
              ? 'opacity-90 hover:opacity-100 hover:scale-110 active:scale-95'
              : 'opacity-25 cursor-not-allowed border-gray-300 dark:border-white/10 text-gray-400 dark:text-gray-600'
          }`}
          aria-label="Next products page"
        >
          {isRtl ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </button>

        {/* Mobile-Friendly Viewport:
            - Mobile (<768px): Swipeable momentum slider with snap-x snap-mandatory, w-[85vw] max-w-[320px] cards, scrollbar-none, px-4 flex gap-4
            - Tablet/Desktop (>=768px): Fluid responsive grid
        */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 md:px-0 py-3"
        >
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full min-h-[320px] flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#062319]/80 border border-[#E2D8C8] dark:border-ceylon-500/30 shadow-lg dark:shadow-xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#f6ecd6] dark:bg-black/60 border border-[#E2D8C8] dark:border-white/10 flex items-center justify-center mb-4">
                  <PackageSearch className="w-8 h-8 text-[#9E5714] dark:text-[#E5A855]" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-2">
                  No products found for &ldquo;{searchTerm}&rdquo;
                </h4>
                <p className="text-xs text-[#5A6D62] dark:text-[#A3B899] max-w-sm leading-relaxed mb-4">
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
                initial={{ opacity: 0, x: isRtl ? -20 : 20, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20, y: -8 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 items-stretch"
              >
                {currentSlice.map((product) => (
                  <div
                    key={product.id}
                    className="w-[85vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink h-full"
                  >
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

        {/* Mobile-Only Touch-Friendly Arrow Controls (< 768px) */}
        {totalPages > 1 && (
          <div className="flex md:hidden items-center justify-between px-4 pt-2">
            <button
              type="button"
              onClick={isRtl ? handleNext : handlePrev}
              disabled={isRtl ? !canNext : !canPrev}
              className={`min-h-[40px] px-3.5 rounded-xl bg-white dark:bg-[#062319] border border-[#E2D8C8] dark:border-[#C87A28]/35 text-xs font-bold text-[#9E5714] dark:text-[#E5A855] flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer ${
                (isRtl ? canNext : canPrev)
                  ? 'opacity-100'
                  : 'opacity-30 cursor-not-allowed'
              }`}
            >
              {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              <span>Prev</span>
            </button>

            <span className="text-xs font-mono text-[#5A6D62] dark:text-[#A3B899]">
              Page {currentPage + 1} / {totalPages}
            </span>

            <button
              type="button"
              onClick={isRtl ? handlePrev : handleNext}
              disabled={isRtl ? !canPrev : !canNext}
              className={`min-h-[40px] px-3.5 rounded-xl bg-white dark:bg-[#062319] border border-[#E2D8C8] dark:border-[#C87A28]/35 text-xs font-bold text-[#9E5714] dark:text-[#E5A855] flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer ${
                (isRtl ? canPrev : canNext)
                  ? 'opacity-100'
                  : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <span>Next</span>
              {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Pagination Controls Sub-Component */}
      <ProductListNavigator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          }
        }}
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
