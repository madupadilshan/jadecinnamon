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

  const navLinks = [
    { id: 'home', label: t.nav.home, href: '#home' },
    { id: 'about', label: t.nav.about, href: '#about' },
    { id: 'products', label: t.nav.products, href: '#products' },
    { id: 'quality', label: t.nav.quality, href: '#quality' },
    { id: 'logistics', label: t.nav.logistics, href: '#logistics' },
    { id: 'gallery', label: t.nav.gallery, href: '#gallery' },
    { id: 'rfq', label: t.nav.quoteBuilder, href: '#rfq' },
  ];

  // Scroll detection for backdrop blur and dynamic Active Section Scroll-Spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      const sectionIds = ['rfq', 'gallery', 'logistics', 'quality', 'products', 'about', 'home'];
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeLangMeta = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const handleNavClick = (id: string, href: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#03140e]/95 backdrop-blur-xl border-b border-ceylon-500/25 shadow-2xl shadow-black/80'
          : 'bg-[#03140e]/80 backdrop-blur-md border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Authority Emblem */}
        <a
          href="#home"
          onClick={() => handleNavClick('home', '#home')}
          className="flex items-center gap-3.5 group focus:outline-none shrink-0 cursor-pointer"
          aria-label="Jade Cinnamon Lanka Home"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-ceylon-400/60 shadow-lg shadow-black/70 group-hover:border-ceylon-300 group-hover:scale-105 transition-all duration-300 bg-black/60 shrink-0">
            <img
              src="/images/logo.jpg"
              alt="Jade Cinnamon Lanka Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-ceylon-300 transition-colors whitespace-nowrap">
                JADE CINNAMON
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-ceylon-500/20 text-ceylon-300 border border-ceylon-500/30 uppercase tracking-widest hidden sm:inline-block">
                Lanka
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-jade-300/80 font-medium uppercase hidden md:inline whitespace-nowrap">
              Direct Ceylon Origin • ISO 6539
            </span>
          </div>
        </a>

        {/* Fully Justified Desktop Navigation with Floating Active Highlight */}
        <nav
          className="hidden lg:flex items-center justify-between flex-1 max-w-2xl mx-4 xl:mx-8 relative"
          aria-label="Primary Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id, link.href);
                }}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`relative px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors duration-200 whitespace-nowrap focus:outline-none cursor-pointer ${
                  isActive
                    ? 'text-[#D48B38] font-bold'
                    : 'text-gray-300 hover:text-[#D48B38]'
                }`}
              >
                {/* Active Soft Glow Floating Pill */}
                {isActive && (
                  <motion.div
                    layoutId="navbarActivePill"
                    className="absolute inset-0 bg-ceylon-500/15 border-b-2 border-ceylon-400 rounded-lg shadow-[0_0_12px_rgba(212,139,56,0.35)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.a>
            );
          })}
        </nav>

        {/* Right Action Cluster: Language Switcher & Pulsating WhatsApp CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="h-10 flex items-center gap-2 px-3 rounded-xl bg-black/50 hover:bg-black/70 border border-ceylon-500/30 text-xs sm:text-sm font-medium text-gray-100 hover:text-white transition-all focus:outline-none shadow-sm cursor-pointer whitespace-nowrap"
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
                    } mt-2 w-52 rounded-xl bg-[#062319]/95 backdrop-blur-xl border border-ceylon-500/35 shadow-2xl shadow-black/90 py-1.5 z-50`}
                  >
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-white/10">
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
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors cursor-pointer ${
                          currentLang === lang.code
                            ? 'bg-ceylon-500/20 text-ceylon-300 font-semibold'
                            : 'text-gray-200 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.nativeLabel}</span>
                        </div>
                        <span className="text-xs text-gray-400 font-light">{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop WhatsApp CTA Button with Micro-Pulse Animation */}
          <motion.a
            href="#rfq"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('rfq', '#rfq');
            }}
            animate={{ scale: [1, 1.025, 1] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="h-10 hidden sm:inline-flex items-center gap-2 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/60 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>{t.nav.quickRfq}</span>
          </motion.a>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-black/50 border border-white/15 text-gray-200 hover:text-white hover:bg-black/70 focus:outline-none cursor-pointer"
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
            className="lg:hidden absolute top-20 left-0 right-0 bg-[#03140e]/98 border-b border-ceylon-500/25 px-4 pt-3 pb-6 space-y-2 shadow-2xl backdrop-blur-2xl"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id, link.href);
                  }}
                  className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-ceylon-500/20 text-[#D48B38] font-bold border-l-4 border-ceylon-400'
                      : 'text-gray-200 hover:text-white hover:bg-jade-900/80'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="#rfq"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('rfq', '#rfq');
                }}
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
