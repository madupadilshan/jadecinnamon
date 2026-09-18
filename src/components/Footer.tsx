import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { TranslationSchema } from '../data/translations';

interface FooterProps {
  t: TranslationSchema;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020b08] text-gray-300 border-t border-ceylon-500/20 relative overflow-hidden">
      {/* Subtle top amber line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-ceylon-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-ceylon-400/60 shadow-md shadow-black/60 bg-black/60 shrink-0">
                <img
                  src="/images/logo.jpg"
                  alt="Jade Cinnamon Lanka Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-tight">
                {t.brandTitle}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md">
              {t.footer.desc}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-jade-950/80 border border-jade-500/30 text-jade-300 text-[11px] font-semibold">
                <ShieldCheck className="w-3 h-3 text-jade-400" />
                <span>SLS 81 Certified</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-jade-950/80 border border-jade-500/30 text-jade-300 text-[11px] font-semibold">
                <ShieldCheck className="w-3 h-3 text-jade-400" />
                <span>ISO 6539:2014</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-ceylon-950/80 border border-ceylon-500/30 text-ceylon-300 text-[11px] font-semibold">
                <ShieldCheck className="w-3 h-3 text-ceylon-400" />
                <span>Sri Lanka EDB Registered</span>
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-ceylon-300 transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-ceylon-300 transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-ceylon-300 transition-colors">
                  {t.nav.products}
                </a>
              </li>
              <li>
                <a href="#quality" className="hover:text-ceylon-300 transition-colors">
                  {t.nav.quality}
                </a>
              </li>
              <li>
                <a href="#logistics" className="hover:text-ceylon-300 transition-colors">
                  {t.nav.logistics}
                </a>
              </li>
              <li>
                <a href="#rfq" className="hover:text-ceylon-300 transition-colors">
                  {t.nav.quoteBuilder}
                </a>
              </li>
            </ul>
          </div>

          {/* International Trade Desk Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.contactDesk}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-ceylon-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-gray-400">{t.footer.directLine}</div>
                  <a
                    href="https://wa.me/94771234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-ceylon-300 font-semibold"
                  >
                    +94 77 123 4567 (WhatsApp / Voice)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-ceylon-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-gray-400">{t.footer.email}</div>
                  <a
                    href="mailto:export@jadecinnamon.com"
                    className="text-white hover:text-ceylon-300 font-medium"
                  >
                    export@jadecinnamon.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-ceylon-400 shrink-0 mt-0.5" />
                <div className="text-xs text-gray-400">
                  {t.footer.colomboPort}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-jade-400/90 font-medium hidden md:inline">
              {t.footer.legalNote}
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-ceylon-400" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
