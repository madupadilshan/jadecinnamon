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
      {/* Centered Pagination Menu Container */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#062319] border border-[#C87A28]/30 shadow-md dark:shadow-xl dark:shadow-black/80">
        {/* Previous Button */}
        <button
          type="button"
          onClick={isRtl ? onNext : onPrev}
          disabled={isRtl ? !canNext : !canPrev}
          className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-all cursor-pointer ${
            (isRtl ? canNext : canPrev)
              ? 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-[#11281E] dark:text-[#F9F6F0] hover:text-[#9E5714] dark:hover:text-amber-200 border border-[#E2D8C8] dark:border-white/10 active:scale-95'
              : 'opacity-30 cursor-not-allowed text-gray-400 dark:text-gray-500 border border-transparent'
          }`}
          aria-label="Previous page"
        >
          {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Dynamic Numbered Buttons [1] [2] ... [N] */}
        <div className="flex items-center gap-2 px-1">
          {pages.map((pageIndex) => {
            const isActive = pageIndex === currentPage;

            return (
              <div
                key={pageIndex}
                className="flex items-center justify-center min-w-[44px] min-h-[44px]"
              >
                <button
                  type="button"
                  onClick={() => onPageChange(pageIndex)}
                  className={`relative cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'w-9 h-9 flex items-center justify-center rounded-lg bg-[#C87A28] text-white font-bold shadow-md shadow-[#C87A28]/25 scale-105 z-10'
                      : 'w-9 h-9 flex items-center justify-center rounded-lg border border-[#C87A28]/30 text-sm font-semibold text-[#11281E] dark:text-[#F9F6F0] hover:border-[#C87A28] bg-transparent hover:bg-[#C87A28]/10'
                  }`}
                  aria-label={`Go to page ${pageIndex + 1}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePageIndicator"
                      className="absolute inset-0 rounded-lg bg-[#C87A28] -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span>{pageIndex + 1}</span>
                </button>
              </div>
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
              ? 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-[#11281E] dark:text-[#F9F6F0] hover:text-[#9E5714] dark:hover:text-amber-200 border border-[#E2D8C8] dark:border-white/10 active:scale-95'
              : 'opacity-30 cursor-not-allowed text-gray-400 dark:text-gray-500 border border-transparent'
          }`}
          aria-label="Next page"
        >
          {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Page count indicator text */}
      <div className="text-[11px] font-mono text-[#5A6D62] dark:text-[#A3B899]">
        Page <span className="text-[#9E5714] dark:text-[#E5A855] font-bold">{currentPage + 1}</span> of{' '}
        <span className="text-[#11281E] dark:text-[#F9F6F0] font-semibold">{totalPages}</span>
      </div>
    </div>
  );
};

export default ProductListNavigator;
