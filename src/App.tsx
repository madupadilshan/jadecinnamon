import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'framer-motion';
import { LanguageCode, LANGUAGES, TRANSLATIONS } from './data/translations';
import { Product, PRODUCTS } from './data/products';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { ProductCatalog } from './components/ProductCatalog';
import { WhyChooseUs } from './components/WhyChooseUs';
import { WhatsAppBuilder } from './components/WhatsAppBuilder';
import { QualitySpecs } from './components/QualitySpecs';
import { Logistics } from './components/Logistics';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { CartPanel } from './components/CartPanel';
import { FlyingParticlesOverlay } from './components/FlyingParticlesOverlay';

export function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);

  const activeLangMeta = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  const isRtl = Boolean(activeLangMeta.isRtl);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Global Scrollytelling 2.0 Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 30,
    restDelta: 0.001,
  });

  // 1. Initialize High-Performance Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      anchors: {
        offset: -80,
      },
    });

    (window as any).lenis = lenis;

    return () => {
      (window as any).lenis = null;
      lenis.destroy();
    };
  }, []);

  // 2. Update HTML document direction and lang attribute for accessibility & SEO
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [currentLang, isRtl]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className="min-h-screen bg-[#FBF8F2] dark:bg-[#062319] text-[#11281E] dark:text-[#F9F6F0] font-sans antialiased selection:bg-ceylon-500 selection:text-white relative transition-colors duration-300 ease-in-out"
        >
          {/* Anti-Gravity Floating Cart Clones Layer */}
          <FlyingParticlesOverlay />

          {/* Sliding Solid Cart Panel Drawer */}
          <CartPanel isRtl={isRtl} />

          {/* Top Scrollytelling 2.0 Reading Progress Indicator */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 via-ceylon-400 to-emerald-400 origin-left z-[60] shadow-lg shadow-amber-400/50"
            style={{ scaleX }}
          />

          {/* Sticky Header / Navigation with Floating Cart Icon & Theme Switcher */}
          <Navbar
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
            t={t}
            isRtl={isRtl}
          />

          {/* Main Content Sections:
              1. Hero (#home) -> 2. About Us (#about) -> 3. Products (#products) -> 4. Quality & Lab (#quality) -> 5. Export & Logistics (#logistics / Why Choose Us) -> 6. Gallery (#gallery) -> 7. RFQ & Cart (#rfq)
          */}
          <main className="relative w-full">
            <Hero t={t} />
            <AboutUs t={t} />
            <ProductCatalog
              t={t}
              onSelectProductForRfq={handleProductSelect}
              isRtl={isRtl}
            />
            <QualitySpecs t={t} />
            <WhyChooseUs t={t} currentLang={currentLang} isRtl={isRtl} />
            <Logistics t={t} currentLang={currentLang} isRtl={isRtl} />
            <Gallery t={t} isRtl={isRtl} />
            <WhatsAppBuilder
              t={t}
              selectedProduct={selectedProduct}
              onSelectProduct={handleProductSelect}
            />
          </main>

          {/* Corporate Footer */}
          <Footer t={t} />

          {/* Floating WhatsApp Quick Action Button with radar pulse */}
          <aside
            aria-label="WhatsApp Trade Desk Contact"
            className={`fixed bottom-6 ${
              isRtl ? 'left-6' : 'right-6'
            } z-40 flex items-center group`}
          >
            <a
              href="https://wa.me/94765335308?text=Hello%20Jade%20Cinnamon%20Lanka,%20I%20would%20like%20to%20inquire%20about%20100%25%20Pure%20Ceylon%20Cinnamon%20Leaf%20Oil%20export%20grades."
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl shadow-[#25D366]/50 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/40 cursor-pointer"
              aria-label="Direct WhatsApp Trade Desk"
            >
              {/* Radar Ping Animation */}
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
              <WhatsAppIcon className="w-7 h-7 text-white relative z-10 drop-shadow-md" />

              {/* Tooltip on hover */}
              <span
                className={`absolute ${
                  isRtl ? 'left-full ml-3' : 'right-full mr-3'
                } px-3 py-1.5 rounded-xl bg-black/90 backdrop-blur-md border border-white/10 text-xs font-semibold text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl`}
              >
                Direct WhatsApp Trade Desk (+94 76 533 5308)
              </span>
            </a>
          </aside>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
