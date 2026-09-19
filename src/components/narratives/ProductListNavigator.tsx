import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductListNavigatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  isRtl?: boolean;
}

export const ProductListNavigator: React.FC<ProductListNavigatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrev,
  onNext,
  canPrev,
  canNext,
  isRtl = false,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="flex flex-col items-center justify-center gap-3 mt-8 select-none">
      {/* Pagination Number Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#062319] border border-[#E5D8C5] dark:border-[#C87A28]/30 shadow-md dark:shadow-xl dark:shadow-black/80">
        {/* Previous Button */}
        <button
          type="button"
          onClick={isRtl ? onNext : onPrev}
          disabled={isRtl ? !canNext : !canPrev}
          className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-all cursor-pointer ${
            (isRtl ? canNext : canPrev)
              ? 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-[#11281E] dark:text-white hover:text-[#B86B1E] dark:hover:text-amber-200 border border-[#E5D8C5] dark:border-white/10 active:scale-95'
              : 'opacity-30 cursor-not-allowed text-gray-400 dark:text-gray-500 border border-transparent'
          }`}
          aria-label="Previous page"
        >
          {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Dynamic Numbered Buttons [1], [2], ... [N] */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-1">
          {pages.map((pageIndex) => {
            const isActive = pageIndex === currentPage;

            return (
              <button
                key={pageIndex}
                type="button"
                onClick={() => onPageChange(pageIndex)}
                className={`relative min-w-[44px] min-h-[44px] px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'bg-[#C87A28] text-white border border-white/40 shadow-lg shadow-[#C87A28]/40 scale-105 z-10 font-mono'
                    : 'bg-[#F4EFE6] dark:bg-black/50 text-[#536B5C] dark:text-gray-300 hover:text-[#11281E] dark:hover:text-white hover:bg-[#ebd7ad] dark:hover:bg-white/10 border border-[#E5D8C5] dark:border-white/5 font-mono'
                }`}
                aria-label={`Go to page ${pageIndex + 1}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePageIndicator"
                    className="absolute inset-0 rounded-xl bg-[#C87A28] -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span>{pageIndex + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={isRtl ? onPrev : onNext}
          disabled={isRtl ? !canPrev : !canNext}
          className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-all cursor-pointer ${
            (isRtl ? canPrev : canNext)
              ? 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-[#11281E] dark:text-white hover:text-[#B86B1E] dark:hover:text-amber-200 border border-[#E5D8C5] dark:border-white/10 active:scale-95'
              : 'opacity-30 cursor-not-allowed text-gray-400 dark:text-gray-500 border border-transparent'
          }`}
          aria-label="Next page"
        >
          {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Page count indicator text */}
      <div className="text-[11px] font-mono text-[#536B5C] dark:text-gray-400">
        Page <span className="text-[#B86B1E] dark:text-amber-300 font-bold">{currentPage + 1}</span> of{' '}
        <span className="text-[#11281E] dark:text-gray-200 font-semibold">{totalPages}</span>
      </div>
    </div>
  );
};

export default ProductListNavigator;
