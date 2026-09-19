import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Check, ShoppingCart, Sun, Moon } from 'lucide-react';
import { LanguageCode, LANGUAGES, TranslationSchema } from '../../data/translations';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { getAssetUrl } from '../../utils/assets';

export interface NavbarProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  t: TranslationSchema;
  isRtl: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  t,
  isRtl,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const { openCart, totalUniqueItems, cartIconRef } = useCart();
  const { theme, toggleTheme } = useTheme();
  const activeLangMeta = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  // Strict single-page navigation sequence (1 -> 7)
  const navLinks = [
    { id: 'home', label: t.nav.home, href: '#home' },
    { id: 'about', label: t.nav.about, href: '#about' },
    { id: 'products', label: t.nav.products, href: '#products' },
    { id: 'quality', label: t.nav.quality, href: '#quality' },
    { id: 'logistics', label: t.nav.logistics, href: '#logistics' },
    { id: 'gallery', label: t.nav.gallery, href: '#gallery' },
    { id: 'rfq', label: t.nav.quoteBuilder, href: '#rfq' },
  ];

  // 1. Passive scroll styling detection
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. High-performance Active Section Highlight on Scroll via Intersection Observer
  useEffect(() => {
    const sectionIds = ['home', 'about', 'products', 'quality', 'logistics', 'gallery', 'rfq'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveSection(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-15% 0px -35% 0px',
      threshold: [0.1, 0.4, 0.7],
    });

    sectionElements.forEach((el) => observer.observe(el));

    const handleScrollBoundary = () => {
      if (window.scrollY < 100) {
        setActiveSection('home');
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        setActiveSection('rfq');
      }
    };

    window.addEventListener('scroll', handleScrollBoundary, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollBoundary);
    };
  }, []);

  // 3. Smooth Click-to-Navigate Handler with Navbar Height Offset (80px)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -80 });
      } else {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }

      setActiveSection(targetId);
      if (history.pushState) {
        history.pushState(null, '', href);
      }
    }
    setMobileMenuOpen(false);
  };

  const highlightedId = hoveredSection || activeSection;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBF8F2]/95 dark:bg-[#020d09]/95 backdrop-blur-2xl border-b border-[#C87A28]/20 dark:border-[#C87A28]/35 shadow-md dark:shadow-2xl dark:shadow-black/90'
          : 'bg-[#FBF8F2]/90 dark:bg-[#03140e]/90 backdrop-blur-xl border-b border-[#C87A28]/20 dark:border-white/15 shadow-sm dark:shadow-xl dark:shadow-black/50'
      }`}
    >
      {/* Top subtle amber hairline accent */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C87A28]/80 to-transparent" />

      <div className="w-full h-full px-3 sm:px-5 lg:px-7 flex items-center justify-between gap-3">
        {/* 1. Left Branding: Logo + 3-Line Corporate Hierarchy */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0 select-none cursor-pointer text-left [transform:translateZ(0)]"
          aria-label="Jade Cinnamon Lanka Home"
        >
          {/* Circular Badge */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#C87A28]/70 shadow-md dark:shadow-black/80 group-hover:border-amber-400 transition-colors duration-200 bg-white dark:bg-black/80 shrink-0">
            <img
              src={getAssetUrl('images/logo.jpg')}
              alt="Jade Cinnamon Lanka Logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 3-Line Brand Typography */}
          <div className="flex flex-col text-left justify-center">
            <span className="font-serif font-bold text-base sm:text-xl tracking-tight text-[#11281E] dark:text-[#F9F6F0] group-hover:text-[#9E5714] dark:group-hover:text-[#E59A4D] transition-colors duration-200 leading-none">
              JADE CINNAMON
            </span>
            <span className="font-serif font-semibold text-[11px] sm:text-sm tracking-wide text-[#9E5714] dark:text-[#E59A4D] mt-0.5 leading-tight">
              Lanka
            </span>
            <span className="font-sans font-medium text-[9px] sm:text-[11px] uppercase tracking-wider text-[#169a61] dark:text-emerald-400 whitespace-nowrap leading-tight mt-0.5">
              Direct Ceylon Origin • ISO 6539
            </span>
          </div>
        </a>

        {/* 2. Desktop Navigation: All 7 Links in Exact Order (lg: and up ONLY) */}
        <nav
          className="hidden lg:flex items-center gap-0.5 xl:gap-1 p-1 rounded-2xl bg-white/80 dark:bg-black/40 border border-[#C87A28]/20 dark:border-white/10 backdrop-blur-md relative shrink-0"
          onMouseLeave={() => setHoveredSection(null)}
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isHighlighted = highlightedId === link.id;
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => setHoveredSection(link.id)}
                title={link.label}
                className={`relative w-[86px] xl:w-[104px] 2xl:w-[114px] h-9 flex items-center justify-center px-1.5 rounded-xl text-xs font-semibold transition-colors duration-150 focus:outline-none z-10 select-none shrink-0 ${
                  isHighlighted
                    ? 'text-[#9E5714] dark:text-[#E59A4D] drop-shadow-sm font-bold'
                    : 'text-[#5A6D62] dark:text-[#A3B899] hover:text-[#11281E] dark:hover:text-[#F9F6F0]'
                }`}
              >
                <span className="relative z-20 flex items-center justify-center gap-1 w-full truncate text-center">
                  <span className="truncate">{link.label}</span>
                  {isActive && !hoveredSection && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9E5714] dark:bg-amber-400 animate-pulse shrink-0" />
                  )}
                </span>

                {isHighlighted && (
                  <motion.div
                    layoutId="desktopNavGlidingPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f6ecd6] via-[#ebd7ad]/80 to-[#debd7c]/60 dark:from-ceylon-600/35 dark:via-ceylon-500/25 dark:to-amber-500/30 border border-[#C87A28]/50 dark:border-ceylon-400/60 shadow-md dark:shadow-ceylon-500/25 z-10 gpu-accelerate"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 35,
                    }}
                  >
                    <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-[#9E5714] dark:via-amber-300 to-transparent rounded-full" />
                  </motion.div>
                )}
              </a>
            );
          })}
        </nav>

        {/* 3. Right Action Cluster: Desktop Controls (lg:flex) & Mobile Hamburger (lg:hidden) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Desktop Only: Shopping Cart Icon Button */}
          <motion.button
            ref={cartIconRef}
            type="button"
            onClick={openCart}
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative hidden lg:flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-[#062319] hover:bg-[#F4EFE6] dark:hover:bg-[#093527] border border-[#C87A28]/20 dark:border-[#C87A28]/35 hover:border-[#C87A28]/70 text-[#9E5714] dark:text-amber-200 hover:text-[#783C1D] dark:hover:text-white shadow-sm dark:shadow-lg dark:shadow-black/80 transition-all focus:outline-none cursor-pointer shrink-0 gpu-accelerate"
            aria-label={`Open export cart with ${totalUniqueItems} items`}
            title={`Open export cart with ${totalUniqueItems} items`}
          >
            <ShoppingCart className="w-4.5 h-4.5 text-[#9E5714] dark:text-amber-300" />

            {totalUniqueItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 min-w-[19px] h-[19px] px-1 rounded-full bg-[#C87A28] text-white text-[10px] font-extrabold flex items-center justify-center shadow-lg shadow-[#C87A28]/60 border border-white dark:border-[#062319]"
              >
                <span className="absolute inset-0 rounded-full bg-[#C87A28] animate-ping opacity-60" />
                <span className="relative z-10">{totalUniqueItems}</span>
              </motion.span>
            )}
          </motion.button>

          {/* Desktop Only: Solid Language Switcher Dropdown */}
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="h-10 w-[112px] xl:w-[128px] flex items-center justify-between px-2.5 rounded-xl bg-white dark:bg-[#062319] hover:bg-[#F4EFE6] dark:hover:bg-[#093527] border border-[#C87A28]/20 dark:border-[#C87A28]/35 hover:border-[#C87A28]/70 text-xs font-semibold text-[#11281E] dark:text-[#F9F6F0] transition-all focus:outline-none shadow-sm dark:shadow-lg dark:shadow-black/80 cursor-pointer whitespace-nowrap shrink-0"
              aria-expanded={langDropdownOpen}
              aria-label="Change language"
            >
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-sm leading-none shrink-0">{activeLangMeta.flag}</span>
                <span className="font-sans font-medium truncate">
                  {activeLangMeta.nativeLabel}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#C87A28] transition-transform duration-200 shrink-0 ${
                  langDropdownOpen ? 'rotate-180 text-amber-500 dark:text-amber-300' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangDropdownOpen(false)}
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute ${
                      isRtl ? 'left-0' : 'right-0'
                    } mt-2 w-56 rounded-2xl bg-white dark:bg-[#062319] border border-[#C87A28]/20 dark:border-[#C87A28]/35 shadow-2xl dark:shadow-black/95 p-2 z-50 gpu-accelerate`}
                  >
                    <div className="px-3 py-1.5 text-[11px] font-bold text-[#9E5714] dark:text-[#E59A4D] uppercase tracking-wider border-b border-[#C87A28]/20 flex items-center justify-between mb-1">
                      <span>Select Language</span>
                      <span className="text-[10px] text-ceylon-600 dark:text-ceylon-400 font-mono">i18n</span>
                    </div>

                    <div className="space-y-1">
                      {LANGUAGES.map((lang) => {
                        const isSelected = currentLang === lang.code;

                        return (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => {
                              onLanguageChange(lang.code);
                              setLangDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all duration-150 cursor-pointer ${
                              isSelected
                                ? 'bg-[#f6ecd6] dark:bg-[#C87A28]/20 text-[#9E5714] dark:text-[#E59A4D] font-bold border border-[#C87A28]/35 shadow-sm'
                                : 'text-[#11281E] dark:text-[#F9F6F0] hover:bg-[#F4EFE6] dark:hover:bg-[#C87A28]/10 border border-transparent font-medium'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                                {isSelected ? (
                                  <Check className="w-4 h-4 text-[#C87A28]" />
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
                                )}
                              </div>
                              <span className="text-base leading-none">{lang.flag}</span>
                              <span className="font-medium">{lang.nativeLabel}</span>
                            </div>
                            <span
                              className={`text-[11px] ${
                                isSelected ? 'text-[#9E5714] dark:text-[#E59A4D] font-semibold' : 'text-[#5A6D62] dark:text-[#A3B899] font-normal'
                              }`}
                            >
                              {lang.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Only: Theme Toggle Button */}
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>

          {/* Mobile Only: Single Clean Hamburger Button (< 1024px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-11 w-11 flex items-center justify-center rounded-xl bg-white dark:bg-[#062319] border border-[#C87A28]/20 dark:border-[#C87A28]/35 text-[#11281E] dark:text-[#F9F6F0] hover:text-[#9E5714] dark:hover:text-white hover:bg-[#F4EFE6] dark:hover:bg-[#093527] focus:outline-none cursor-pointer shadow-sm dark:shadow-md transition-colors shrink-0"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  <X className="w-6 h-6 text-[#9E5714] dark:text-amber-300" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu-icon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  <Menu className="w-6 h-6 text-[#11281E] dark:text-[#F9F6F0]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* 4. Expanded Mobile Menu Drawer & Backdrop Overlay (< 1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-20 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Solid Drawer Content (100% Non-Transparent) */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              data-lenis-prevent
              className="lg:hidden absolute top-20 left-0 right-0 max-h-[calc(100vh-5rem)] overflow-y-auto bg-[#FBF8F2] dark:bg-[#062319] border-b border-[#C87A28]/20 dark:border-[#C87A28]/35 px-4 pt-3.5 pb-6 space-y-4 shadow-2xl z-50 gpu-accelerate"
            >
              {/* 1. Quick Utilities (Side-by-Side Cart & Theme Switcher - Single Close Button at Top Navbar) */}
              <div className="grid grid-cols-2 gap-2">
                {/* Shopping Cart Button */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCart();
                  }}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-white dark:bg-[#041912] border border-[#C87A28]/20 dark:border-[#C87A28]/35 hover:border-[#C87A28]/60 flex items-center justify-between shadow-sm active:scale-[0.98] transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <ShoppingCart className="w-4.5 h-4.5 text-[#9E5714] dark:text-amber-300 shrink-0" />
                    <span className="text-xs font-bold text-[#11281E] dark:text-[#F9F6F0] truncate">
                      Cart
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#C87A28] text-white text-[10px] font-extrabold shrink-0 shadow-sm">
                    {totalUniqueItems}
                  </span>
                </button>

                {/* Light/Dark Mode Switcher */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-white dark:bg-[#041912] border border-[#C87A28]/20 dark:border-[#C87A28]/35 hover:border-[#C87A28]/60 flex items-center justify-between shadow-sm active:scale-[0.98] transition-all cursor-pointer text-left"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {theme === 'dark' ? (
                      <Sun className="w-4.5 h-4.5 text-amber-300 shrink-0" />
                    ) : (
                      <Moon className="w-4.5 h-4.5 text-[#9E5714] shrink-0" />
                    )}
                    <span className="text-xs font-bold text-[#11281E] dark:text-[#F9F6F0] truncate">
                      {theme === 'dark' ? 'Light' : 'Dark'}
                    </span>
                  </div>
                  <span className="text-xs text-[#5A6D62] dark:text-[#A3B899] shrink-0">
                    ⇄
                  </span>
                </button>
              </div>

              {/* 2. Compact Horizontal Language Chip Rail */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between px-0.5">
                  <span className="text-[11px] font-bold text-[#9E5714] dark:text-[#E59A4D] uppercase tracking-wider">
                    SELECT LANGUAGE
                  </span>
                  <span className="text-[10px] text-ceylon-600 dark:text-ceylon-400 font-mono font-semibold">
                    {activeLangMeta.nativeLabel} ({activeLangMeta.code.toUpperCase()})
                  </span>
                </div>

                {/* Horizontal Scrolling Chip Rail */}
                <div className="overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex gap-2 pb-1 px-0.5">
                  {LANGUAGES.map((lang) => {
                    const isSelected = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => onLanguageChange(lang.code)}
                        className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none shrink-0 ${
                          isSelected
                            ? 'font-bold border border-[#C87A28] bg-[#C87A28] text-white shadow-md shadow-[#C87A28]/20'
                            : 'font-medium border border-[#C87A28]/20 bg-[#F4EFE6] dark:bg-[#0A2F22] text-[#5A6D62] dark:text-[#A3B899] hover:border-[#C87A28]/40'
                        }`}
                        aria-pressed={isSelected}
                        title={lang.label}
                      >
                        <span className="mr-1.5">{lang.flag}</span>
                        <span>{lang.nativeLabel}</span>
                        <span className="ml-1 opacity-75 font-mono text-[10px] uppercase">
                          ({lang.code})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Site Navigation Links (Exact 1-to-7 Page Order) */}
              <div className="space-y-1.5 pt-1 border-t border-[#C87A28]/20 dark:border-[#C87A28]/20">
                <div className="px-0.5 text-[11px] font-bold text-[#9E5714] dark:text-[#E59A4D] uppercase tracking-wider">
                  Site Navigation
                </div>
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.id;

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between min-h-[44px] px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-[#f6ecd6] dark:bg-[#C87A28]/25 text-[#9E5714] dark:text-[#E59A4D] border border-[#C87A28]/45 shadow-sm font-bold'
                          : 'bg-white/70 dark:bg-[#041912]/70 text-[#11281E] dark:text-[#F9F6F0] hover:text-[#9E5714] dark:hover:text-white hover:bg-white dark:hover:bg-[#041912] border border-[#C87A28]/20 dark:border-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[#9E5714]/70 dark:text-amber-400/60 w-5">
                          0{index + 1}
                        </span>
                        <span>{link.label}</span>
                      </div>
                      {isActive ? (
                        <span className="w-2 h-2 rounded-full bg-[#9E5714] dark:bg-amber-400 animate-pulse" />
                      ) : (
                        <span className="text-xs text-[#5A6D62] dark:text-[#A3B899]">→</span>
                      )}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
