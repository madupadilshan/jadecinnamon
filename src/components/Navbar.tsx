import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Check, ShoppingCart } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { LanguageCode, LANGUAGES, TranslationSchema } from '../data/translations';
import { useCart } from '../context/CartContext';
import { ThemeToggle } from './layout/ThemeToggle';

interface NavbarProps {
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
  const activeLangMeta = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

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
      threshold: [0.1, 0.5],
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
          ? 'bg-[#FBF8F2]/95 dark:bg-[#020d09]/95 backdrop-blur-2xl border-b border-[#E5D8C5] dark:border-ceylon-500/35 shadow-md dark:shadow-2xl dark:shadow-black/90'
          : 'bg-[#FBF8F2]/90 dark:bg-[#03140e]/90 backdrop-blur-xl border-b border-[#E5D8C5] dark:border-white/15 shadow-sm dark:shadow-xl dark:shadow-black/50'
      }`}
    >
      {/* Top subtle amber hairline accent */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-ceylon-400/80 to-transparent" />

      <div className="w-full h-full px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Top-Left Branding & Certifications: Flush at the left corner, fixed & un-animated */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0 select-none cursor-pointer text-left [transform:translateZ(0)]"
          aria-label="Jade Cinnamon Lanka Home"
        >
          {/* Official Generated Badge - Fixed & Crisp */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-ceylon-400/70 shadow-md dark:shadow-black/80 group-hover:border-amber-400 transition-colors duration-200 bg-white dark:bg-black/80 shrink-0">
            <img
              src="/images/logo.jpg"
              alt="Jade Cinnamon Lanka Logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Multi-Line Exact Branding Block - Fixed & Stable */}
          <div className="flex flex-col text-left justify-center">
            {/* Line 1: JADE CINNAMON */}
            <span className="font-serif font-bold text-base sm:text-xl tracking-tight text-[#11281E] dark:text-white group-hover:text-[#B86B1E] dark:group-hover:text-amber-200 transition-colors duration-200 leading-none">
              JADE CINNAMON
            </span>

            {/* Line 2: Lanka */}
            <span className="font-serif font-semibold text-[11px] sm:text-sm tracking-wide text-[#B86B1E] dark:text-amber-200/90 mt-0.5 leading-tight">
              Lanka
            </span>

            {/* Line 3: Direct Ceylon Origin • ISO 6539 */}
            <span className="font-sans font-medium text-[9px] sm:text-[11px] uppercase tracking-wider text-[#169a61] dark:text-jade-300/90 whitespace-nowrap leading-tight mt-0.5">
              Direct Ceylon Origin • ISO 6539
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with Fixed Widths for Absolute Layout Stability */}
        <nav
          className="hidden xl:flex items-center gap-1 p-1 rounded-2xl bg-white/80 dark:bg-black/40 border border-[#E5D8C5] dark:border-white/10 backdrop-blur-md relative shrink-0"
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
                className={`relative w-[110px] h-9 flex items-center justify-center px-2 rounded-xl text-xs font-semibold transition-colors duration-150 focus:outline-none z-10 select-none shrink-0 ${
                  isHighlighted
                    ? 'text-[#783C1D] dark:text-amber-100 drop-shadow-sm'
                    : 'text-[#536B5C] dark:text-gray-200 hover:text-[#11281E] dark:hover:text-white'
                }`}
              >
                {/* Fixed container with ellipsis for complete language stability */}
                <span className="relative z-20 flex items-center justify-center gap-1.5 w-full truncate text-center">
                  <span className="truncate">{link.label}</span>
                  {isActive && !hoveredSection && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B86B1E] dark:bg-amber-400 animate-pulse shrink-0" />
                  )}
                </span>

                {/* Animated Gliding Pill Background */}
                {isHighlighted && (
                  <motion.div
                    layoutId="navSlidingPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f6ecd6] via-[#ebd7ad]/80 to-[#debd7c]/60 dark:from-ceylon-600/35 dark:via-ceylon-500/25 dark:to-amber-500/30 border border-[#C87A28]/50 dark:border-ceylon-400/60 shadow-md dark:shadow-ceylon-500/25 z-10 gpu-accelerate"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 35,
                    }}
                  >
                    <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-[#B86B1E] dark:via-amber-300 to-transparent rounded-full" />
                  </motion.div>
                )}
              </a>
            );
          })}
        </nav>

        {/* Medium Screens (lg: but not xl) Compact Nav with Fixed Widths */}
        <nav
          className="hidden lg:flex xl:hidden items-center gap-1 p-1 rounded-2xl bg-white/80 dark:bg-black/40 border border-[#E5D8C5] dark:border-white/10 relative shrink-0"
          onMouseLeave={() => setHoveredSection(null)}
          aria-label="Compact Navigation"
        >
          {navLinks.slice(0, 5).map((link) => {
            const isHighlighted = highlightedId === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => setHoveredSection(link.id)}
                title={link.label}
                className={`relative w-[95px] h-8 flex items-center justify-center px-2 rounded-xl text-xs font-semibold transition-colors duration-150 focus:outline-none z-10 shrink-0 ${
                  isHighlighted
                    ? 'text-[#783C1D] dark:text-amber-100'
                    : 'text-[#536B5C] dark:text-gray-200 hover:text-[#11281E] dark:hover:text-white'
                }`}
              >
                <span className="relative z-20 w-full truncate text-center">{link.label}</span>
                {isHighlighted && (
                  <motion.div
                    layoutId="navSlidingPillCompact"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f6ecd6] to-[#ebd7ad] dark:from-ceylon-600/35 dark:to-amber-500/30 border border-[#C87A28]/50 dark:border-ceylon-400/60 shadow-sm dark:shadow-ceylon-500/20 z-10 gpu-accelerate"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Cluster: Theme Toggle, Language Switcher, Cart Icon & WhatsApp CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Theme Toggle Button (Light/Dark Engine) */}
          <ThemeToggle />

          {/* Solid, Modern Language Switcher Dropdown with Fixed Width */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="h-10 w-[110px] sm:w-[130px] flex items-center justify-between px-2 sm:px-3 rounded-xl bg-white dark:bg-[#062319] hover:bg-[#F4EFE6] dark:hover:bg-[#093527] border border-[#E5D8C5] dark:border-[#C87A28]/30 hover:border-[#C87A28]/60 text-xs sm:text-sm font-semibold text-[#11281E] dark:text-white transition-all focus:outline-none shadow-sm dark:shadow-lg dark:shadow-black/80 cursor-pointer whitespace-nowrap shrink-0"
              aria-expanded={langDropdownOpen}
              aria-label="Change language"
            >
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-sm sm:text-base leading-none shrink-0">{activeLangMeta.flag}</span>
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
                  {/* Backdrop for click outside */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangDropdownOpen(false)}
                  />

                  {/* Solid Dropdown Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute ${
                      isRtl ? 'left-0' : 'right-0'
                    } mt-2 w-56 rounded-2xl bg-white dark:bg-[#062319] border border-[#E5D8C5] dark:border-[#C87A28]/30 shadow-2xl dark:shadow-black/95 p-2 z-50 gpu-accelerate`}
                  >
                    {/* Header Pill */}
                    <div className="px-3 py-1.5 text-[11px] font-bold text-[#B86B1E] dark:text-amber-200/90 uppercase tracking-wider border-b border-[#C87A28]/20 flex items-center justify-between mb-1">
                      <span>Select Language</span>
                      <span className="text-[10px] text-ceylon-600 dark:text-ceylon-400 font-mono">i18n</span>
                    </div>

                    {/* Language Options List */}
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
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-all duration-150 cursor-pointer ${
                              isSelected
                                ? 'bg-[#f6ecd6] dark:bg-[#C87A28]/15 text-[#783C1D] dark:text-amber-200 font-bold border border-[#C87A28]/30 shadow-sm'
                                : 'text-[#11281E] dark:text-gray-100 hover:bg-[#F4EFE6] dark:hover:bg-[#C87A28]/10 border border-transparent font-medium'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {/* Leading Checkmark for Active State */}
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
                                isSelected ? 'text-[#B86B1E] dark:text-amber-300 font-semibold' : 'text-gray-400 font-normal'
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

          {/* Floating Shopping Cart Icon Button with Gold Notification Badge */}
          <motion.button
            ref={cartIconRef}
            type="button"
            onClick={openCart}
            animate={{ y: [0, -2.5, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#062319] hover:bg-[#F4EFE6] dark:hover:bg-[#093527] border border-[#E5D8C5] dark:border-[#C87A28]/35 hover:border-[#C87A28]/70 text-[#B86B1E] dark:text-amber-200 hover:text-[#783C1D] dark:hover:text-white shadow-sm dark:shadow-lg dark:shadow-black/80 transition-all focus:outline-none cursor-pointer shrink-0 gpu-accelerate"
            aria-label={`Open export cart with ${totalUniqueItems} items`}
          >
            <ShoppingCart className="w-4.5 h-4.5 text-[#B86B1E] dark:text-amber-300" />

            {/* Pulsing Gold / Ceylon Notification Badge with Item Count */}
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

          {/* Desktop WhatsApp CTA Button */}
          <a
            href="#rfq"
            onClick={(e) => handleNavClick(e, '#rfq')}
            className="h-10 hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>{t.nav.quickRfq}</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#062319] border border-[#E5D8C5] dark:border-[#C87A28]/30 text-[#11281E] dark:text-gray-200 hover:text-[#783C1D] dark:hover:text-white hover:bg-[#F4EFE6] dark:hover:bg-[#093527] focus:outline-none cursor-pointer shadow-sm dark:shadow-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden absolute top-20 left-0 right-0 bg-[#FBF8F2] dark:bg-[#062319] border-b border-[#E5D8C5] dark:border-[#C87A28]/35 px-4 pt-4 pb-6 space-y-3 shadow-2xl z-50 gpu-accelerate"
          >
            {/* Mobile Quick Cart & Theme Row */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="flex-1 flex items-center justify-between px-4 py-3 rounded-xl bg-white dark:bg-[#041912] border border-[#E5D8C5] dark:border-[#C87A28]/35 text-[#783C1D] dark:text-amber-200 font-bold text-sm cursor-pointer shadow-sm dark:shadow-md"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingCart className="w-4.5 h-4.5 text-[#B86B1E] dark:text-amber-300" />
                  <span>View B2B Cart</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#C87A28] text-white text-xs font-extrabold">
                  {totalUniqueItems} {totalUniqueItems === 1 ? 'item' : 'items'}
                </span>
              </button>

              <div className="shrink-0">
                <ThemeToggle />
              </div>
            </div>

            {/* Navigation links */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-[#f6ecd6] dark:bg-[#C87A28]/20 text-[#783C1D] dark:text-amber-200 border border-[#C87A28]/40 shadow-sm'
                        : 'text-[#11281E] dark:text-gray-200 hover:text-[#783C1D] dark:hover:text-white hover:bg-black/5 dark:hover:bg-jade-900/80'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#B86B1E] dark:bg-amber-400 animate-pulse" />}
                  </a>
                );
              })}
            </div>

            {/* Mobile Language Selector Grid */}
            <div className="pt-3 border-t border-[#E5D8C5] dark:border-[#C87A28]/20">
              <div className="text-xs font-bold text-[#B86B1E] dark:text-amber-200/90 uppercase tracking-wider mb-2 px-1">
                Choose Language
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {LANGUAGES.map((lang) => {
                  const isSelected = currentLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#f6ecd6] dark:bg-[#C87A28]/25 text-[#783C1D] dark:text-amber-200 font-bold border border-[#C87A28]/40'
                          : 'bg-white dark:bg-black/40 text-[#11281E] dark:text-gray-200 hover:bg-[#F4EFE6] dark:hover:bg-black/60 border border-[#E5D8C5] dark:border-white/5'
                      }`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.nativeLabel}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#C87A28] ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5D8C5] dark:border-[#C87A28]/20 flex flex-col gap-2">
              <a
                href="#rfq"
                onClick={(e) => handleNavClick(e, '#rfq')}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-lg shadow-[#25D366]/30 active:scale-98 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>{t.nav.quickRfq}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
