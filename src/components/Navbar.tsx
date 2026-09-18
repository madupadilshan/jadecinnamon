import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { LanguageCode, LANGUAGES, TranslationSchema } from '../data/translations';

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

  // 1. Scroll styling detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Dynamic Active Section Highlight on Scroll via Intersection Observer
  useEffect(() => {
    const sectionIds = ['home', 'about', 'products', 'quality', 'logistics', 'gallery', 'rfq'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the visible section with the highest intersection ratio
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by how much of the section is visible
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveSection(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0.1, 0.25, 0.5, 0.75],
    });

    sectionElements.forEach((el) => observer.observe(el));

    // Fallback scroll listener for top/bottom boundaries
    const handleScrollBoundary = () => {
      if (window.scrollY < 120) {
        setActiveSection('home');
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
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
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });

      setActiveSection(targetId);
      if (history.pushState) {
        history.pushState(null, '', href);
      }
    }
    setMobileMenuOpen(false);
  };

  // The link currently highlighted is the hovered one (if any) or the active one
  const highlightedId = hoveredSection || activeSection;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#020d09]/95 backdrop-blur-2xl border-b border-ceylon-500/35 shadow-2xl shadow-black/90'
          : 'bg-[#03140e]/90 backdrop-blur-xl border-b border-white/15 shadow-xl shadow-black/50'
      }`}
    >
      {/* Top subtle amber hairline accent */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-ceylon-400/80 to-transparent" />

      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Official Generated Badge */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3.5 group focus:outline-none shrink-0"
          aria-label="Jade Cinnamon Lanka Home"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-ceylon-400/70 shadow-lg shadow-black/80 group-hover:border-amber-300 group-hover:scale-105 transition-all duration-300 bg-black/80 shrink-0">
            <img
              src="/images/logo.jpg"
              alt="Jade Cinnamon Lanka Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-200 transition-colors whitespace-nowrap">
                JADE CINNAMON
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-ceylon-500/30 text-amber-200 border border-ceylon-400/40 uppercase tracking-widest hidden sm:inline-block">
                Lanka
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-jade-300/90 font-semibold uppercase hidden md:inline whitespace-nowrap">
              Direct Ceylon Origin • ISO 6539
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with Animated Sliding Pill / Underline */}
        <nav
          className="hidden xl:flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md relative"
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
                className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 whitespace-nowrap focus:outline-none z-10 select-none ${
                  isHighlighted
                    ? 'text-amber-100 drop-shadow-sm'
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                {/* Text Label */}
                <span className="relative z-20 flex items-center gap-1.5">
                  {link.label}
                  {isActive && !hoveredSection && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </span>

                {/* Animated Gliding Pill Background */}
                {isHighlighted && (
                  <motion.div
                    layoutId="navSlidingPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-ceylon-600/35 via-ceylon-500/25 to-amber-500/30 border border-ceylon-400/60 shadow-lg shadow-ceylon-500/25 backdrop-blur-md z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 35,
                    }}
                  >
                    {/* Glowing bottom underline inside pill */}
                    <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent rounded-full" />
                  </motion.div>
                )}
              </a>
            );
          })}
        </nav>

        {/* Medium Screens (lg: but not xl) Compact Nav with Sliding Pill */}
        <nav
          className="hidden lg:flex xl:hidden items-center gap-1 p-1 rounded-2xl bg-black/40 border border-white/10 relative"
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
                className={`relative px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-200 whitespace-nowrap focus:outline-none z-10 ${
                  isHighlighted ? 'text-amber-100' : 'text-gray-200 hover:text-white'
                }`}
              >
                <span className="relative z-20">{link.label}</span>
                {isHighlighted && (
                  <motion.div
                    layoutId="navSlidingPillCompact"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-ceylon-600/35 to-amber-500/30 border border-ceylon-400/60 shadow-md shadow-ceylon-500/20 z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 35,
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Cluster: Language Switcher & WhatsApp CTA Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="h-10 flex items-center gap-2 px-3 rounded-xl bg-black/60 hover:bg-black/80 border border-ceylon-400/40 text-xs sm:text-sm font-semibold text-gray-100 hover:text-white transition-all focus:outline-none shadow-md cursor-pointer whitespace-nowrap"
              aria-expanded={langDropdownOpen}
              aria-label="Change language"
            >
              <span className="text-base">{activeLangMeta.flag}</span>
              <span className="hidden sm:inline font-sans">{activeLangMeta.nativeLabel}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-ceylon-400 transition-transform duration-200 ${
                  langDropdownOpen ? 'rotate-180' : ''
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
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute ${
                      isRtl ? 'left-0' : 'right-0'
                    } mt-2 w-52 rounded-2xl bg-[#03140e]/98 backdrop-blur-2xl border border-ceylon-500/40 shadow-2xl shadow-black/95 py-2 z-50`}
                  >
                    <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-white/10">
                      Select Language
                    </div>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-left transition-colors cursor-pointer ${
                          currentLang === lang.code
                            ? 'bg-ceylon-500/25 text-amber-200 font-bold'
                            : 'text-gray-200 hover:bg-white/10 hover:text-white font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.nativeLabel}</span>
                        </div>
                        <span className="text-xs text-gray-400 font-normal">{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop WhatsApp CTA Button */}
          <a
            href="#rfq"
            onClick={(e) => handleNavClick(e, '#rfq')}
            className="h-10 hidden sm:inline-flex items-center gap-2 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>{t.nav.quickRfq}</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-black/60 border border-white/20 text-gray-200 hover:text-white hover:bg-black/80 focus:outline-none cursor-pointer"
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
            transition={{ duration: 0.25 }}
            className="lg:hidden absolute top-20 left-0 right-0 bg-[#020d09]/98 border-b border-ceylon-500/35 px-4 pt-3 pb-6 space-y-2 shadow-2xl backdrop-blur-2xl"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-ceylon-500/25 text-amber-200 border border-ceylon-400/40 shadow-md'
                      : 'text-gray-200 hover:text-white hover:bg-jade-900/80'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                </a>
              );
            })}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="#rfq"
                onClick={(e) => handleNavClick(e, '#rfq')}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-lg shadow-[#25D366]/30"
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

