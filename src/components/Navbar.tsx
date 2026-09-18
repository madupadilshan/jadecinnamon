import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sparkles, ShieldCheck, Flame, Layers } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { LanguageCode, LANGUAGES, TranslationSchema } from '../data/translations';

interface NavbarProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  t: TranslationSchema;
  isRtl: boolean;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  t,
  isRtl,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Scroll detection for navbar background density
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Observer to automatically synchronize active link with page scroll
  useEffect(() => {
    const sectionIds = ['home', 'about', 'products', 'quality', 'logistics', 'gallery', 'rfq'];
    const handleScrollActive = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollActive, { passive: true });
    handleScrollActive();
    return () => window.removeEventListener('scroll', handleScrollActive);
  }, []);

  const activeLangMeta = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const navLinks: NavItem[] = [
    { id: 'home', label: t.nav.home, href: '#home' },
    { id: 'about', label: t.nav.about, href: '#about' },
    { id: 'products', label: t.nav.products, href: '#products', hasDropdown: true },
    { id: 'quality', label: t.nav.quality, href: '#quality' },
    { id: 'logistics', label: t.nav.logistics, href: '#logistics' },
    { id: 'gallery', label: t.nav.gallery, href: '#gallery' },
  ];

  const productSubmenu = [
    { name: 'Alba & C5 Special Quills', code: 'ALBA / C5-SP', href: '#products', icon: Sparkles },
    { name: 'Continental & Hamburg (C4, M5, H1)', code: 'SLS 81 Grade', href: '#products', icon: Layers },
    { name: 'Cinnamon Cuts & 80-Mesh Powder', code: 'Certified Safe', href: '#products', icon: ShieldCheck },
    { name: 'Steam Distilled Bark & Leaf Oils', code: '>65% Cinnamaldehyde', href: '#products', icon: Flame },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-xl bg-slate-950/85 border-b border-amber-500/20 shadow-2xl shadow-black/90'
          : 'backdrop-blur-md bg-slate-950/60 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Official Generated Badge with Luxury Gold Rim */}
        <a
          href="#home"
          onClick={() => setActiveSection('home')}
          className="flex items-center gap-3.5 group focus:outline-none shrink-0"
          aria-label="Jade Cinnamon Lanka Home"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-ceylon-400/70 shadow-lg shadow-black/80 group-hover:border-amber-300 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 bg-black/60 shrink-0">
            <img
              src="/images/logo.jpg"
              alt="Jade Cinnamon Lanka Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
                JADE CINNAMON
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-widest hidden sm:inline-block">
                Lanka
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-jade-300/90 font-medium uppercase hidden md:inline whitespace-nowrap">
              Direct Ceylon Origin • ISO 6539
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with Shared Layout Active Pill Animation */}
        <nav
          onMouseLeave={() => {
            setHoveredNav(null);
            setProductsDropdownOpen(false);
          }}
          className="hidden lg:flex items-center p-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md relative"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const isHovered = hoveredNav === link.id;
            const isPillTarget = isHovered || (!hoveredNav && isActive);

            return (
              <div
                key={link.id}
                className="relative"
                onMouseEnter={() => {
                  setHoveredNav(link.id);
                  if (link.hasDropdown) {
                    setProductsDropdownOpen(true);
                  } else {
                    setProductsDropdownOpen(false);
                  }
                }}
              >
                <a
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.id);
                    setProductsDropdownOpen(false);
                  }}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 z-10 flex items-center gap-1.5 rounded-full focus:outline-none ${
                    isActive
                      ? 'text-amber-300 font-semibold'
                      : isHovered
                      ? 'text-amber-400'
                      : 'text-slate-300 hover:text-amber-300'
                  }`}
                >
                  <motion.span
                    whileHover={{ y: -1, scale: 1.02 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1"
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          productsDropdownOpen ? 'rotate-180 text-amber-300' : 'text-slate-400'
                        }`}
                      />
                    )}
                  </motion.span>
                </a>

                {/* Shared Layout Active & Hover Pill */}
                {isPillTarget && (
                  <motion.div
                    layoutId="navActivePill"
                    className="absolute inset-0 bg-amber-950/70 border border-amber-600/35 rounded-full shadow-lg shadow-amber-950/50 backdrop-blur-md pointer-events-none"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                {/* Products Submenu Mega-Preview Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {productsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl bg-[#03140e]/95 backdrop-blur-2xl border border-amber-500/30 p-2 shadow-2xl shadow-black/95 z-50 overflow-hidden"
                      >
                        <div className="px-3 py-2 text-[11px] font-bold text-amber-400/80 uppercase tracking-widest border-b border-white/10 flex items-center justify-between">
                          <span>Export Categories</span>
                          <span className="text-[10px] text-jade-300">100% Pure Origin</span>
                        </div>
                        <div className="pt-1.5 space-y-1">
                          {productSubmenu.map((sub, idx) => {
                            const SubIcon = sub.icon;
                            return (
                              <a
                                key={idx}
                                href={sub.href}
                                onClick={() => {
                                  setActiveSection('products');
                                  setProductsDropdownOpen(false);
                                }}
                                className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-500/10 transition-colors"
                              >
                                <div className="p-2 rounded-lg bg-black/60 border border-amber-500/30 group-hover:border-amber-400 group-hover:scale-105 transition-all text-amber-300">
                                  <SubIcon className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs font-semibold text-gray-100 group-hover:text-amber-300 transition-colors">
                                    {sub.name}
                                  </span>
                                  <span className="text-[10px] text-gray-400 font-mono">
                                    {sub.code}
                                  </span>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Action Cluster: Language Switcher & "Get Quotation" WhatsApp CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* 7-Language Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="h-10 flex items-center gap-2 px-3 rounded-full bg-black/50 hover:bg-black/70 border border-amber-500/30 text-xs sm:text-sm font-medium text-gray-100 hover:text-amber-300 transition-all focus:outline-none shadow-sm cursor-pointer whitespace-nowrap"
              aria-expanded={langDropdownOpen}
              aria-label="Change language"
            >
              <span className="text-base">{activeLangMeta.flag}</span>
              <span className="hidden sm:inline font-sans">{activeLangMeta.nativeLabel}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-amber-400 transition-transform duration-200 ${
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
                    } mt-2 w-56 rounded-2xl bg-[#062319]/95 backdrop-blur-2xl border border-amber-500/35 shadow-2xl shadow-black/90 py-2 z-50 overflow-hidden`}
                  >
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-white/10 flex justify-between items-center">
                      <span>Select Language</span>
                      <span className="text-[10px] text-amber-400">7 Locales</span>
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
                            ? 'bg-amber-500/20 text-amber-300 font-semibold'
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

          {/* High-Converting "Get Quotation" WhatsApp CTA Button */}
          <a
            href="#rfq"
            onClick={() => setActiveSection('rfq')}
            className="relative group h-10 hidden sm:inline-flex items-center gap-2 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap overflow-hidden"
          >
            <WhatsAppIcon className="w-4 h-4 text-white relative z-10" />
            <span className="relative z-10">{t.nav.quickRfq}</span>
            {/* Shimmer Light Reflection Effect */}
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full bg-black/50 border border-white/15 text-gray-200 hover:text-amber-300 hover:bg-black/70 focus:outline-none cursor-pointer transition-colors"
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
            className="lg:hidden absolute top-20 left-0 right-0 bg-[#03140e]/98 border-b border-amber-500/25 px-4 pt-3 pb-6 space-y-2 shadow-2xl backdrop-blur-2xl"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-amber-950/70 border border-amber-600/40 text-amber-300 font-semibold'
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
                onClick={() => {
                  setActiveSection('rfq');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-lg shadow-[#25D366]/40"
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
