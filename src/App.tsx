import { useState, useEffect } from 'react';
import { LanguageCode, LANGUAGES, TRANSLATIONS } from './data/translations';
import { Product, PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { ProductCatalog } from './components/ProductCatalog';
import { QualitySpecs } from './components/QualitySpecs';
import { Logistics } from './components/Logistics';
import { Gallery } from './components/Gallery';
import { WhatsAppBuilder } from './components/WhatsAppBuilder';
import { Footer } from './components/Footer';
import { WhatsAppIcon } from './components/WhatsAppIcon';

export function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);

  const activeLangMeta = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  const isRtl = Boolean(activeLangMeta.isRtl);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Update HTML document direction and lang attribute for accessibility & SEO
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [currentLang, isRtl]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#03140e] text-[#F9F9F6] font-sans antialiased selection:bg-ceylon-500 selection:text-white"
    >
      {/* Sticky Header / Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        t={t}
        isRtl={isRtl}
      />

      {/* Main Content Sections: Home -> About Us -> Products -> Quality -> Logistics -> Gallery -> WhatsApp RFQ */}
      <main>
        <Hero t={t} />
        <AboutUs t={t} />
        <ProductCatalog
          t={t}
          onSelectProductForRfq={handleProductSelect}
        />
        <QualitySpecs t={t} />
        <Logistics t={t} />
        <Gallery t={t} />
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
        className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'
          } z-40 flex items-center group`}
      >
        <a
          href="https://wa.me/94771234567?text=Hello%20Jade%20Cinnamon%20Lanka,%20I%20would%20like%20to%20inquire%20about%20Pure%20Ceylon%20Cinnamon%20export%20grades."
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl shadow-[#25D366]/50 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/40"
          aria-label="Direct WhatsApp Trade Desk"
        >
          {/* Radar Ping Animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
          <WhatsAppIcon className="w-7 h-7 text-white relative z-10 drop-shadow-md" />

          {/* Tooltip on hover */}
          <span
            className={`absolute ${isRtl ? 'left-full ml-3' : 'right-full mr-3'
              } px-3 py-1.5 rounded-xl bg-black/90 backdrop-blur-md border border-white/10 text-xs font-semibold text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl`}
          >
            Direct WhatsApp Trade Desk (+94 77 123 4567)
          </span>
        </a>
      </aside>
    </div>
  );
}

export default App;
