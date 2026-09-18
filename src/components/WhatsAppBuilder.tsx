import React, { useState, useEffect } from 'react';
import { Copy, Check, Sparkles, Building2 } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Product, PRODUCTS } from '../data/products';
import { TranslationSchema } from '../data/translations';

interface WhatsAppBuilderProps {
  t: TranslationSchema;
  selectedProduct: Product | null;
  onSelectProduct: (product: Product) => void;
}

const TRADE_PHONE = '94771234567';

export const WhatsAppBuilder: React.FC<WhatsAppBuilderProps> = ({
  t,
  selectedProduct,
  onSelectProduct,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    selectedProduct ? selectedProduct.id : PRODUCTS[0].id
  );
  const [quantity, setQuantity] = useState<string>('500');
  const [unit, setUnit] = useState<string>('Kg');
  const [incoterm, setIncoterm] = useState<string>('FOB Colombo');
  const [destination, setDestination] = useState<string>('Hamburg Port, Germany');
  const [notes, setNotes] = useState<string>('Require 25kg vacuum packaging and Certificate of Analysis (COA).');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Sync selectedProduct if changed externally from catalog modal
  useEffect(() => {
    if (selectedProduct) {
      setSelectedProductId(selectedProduct.id);
    }
  }, [selectedProduct]);

  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const generateWhatsAppMessage = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    return `*B2B PURCHASE INQUIRY / RFQ*
----------------------------------------
*Company Target:* Jade Cinnamon Lanka Trade Desk
*Date:* ${timestamp}

*Product Requested:* ${currentProduct.name}
*Grade Code:* ${currentProduct.gradeCode}
*Category:* ${currentProduct.categoryLabel}
*Standard:* ${currentProduct.specs.gradeStandard || 'SLS 81:2000 / ISO 6539'}

*Order Parameters:*
- *Quantity:* ${quantity} ${unit}
- *Incoterm:* ${incoterm}
- *Destination:* ${destination || 'Port of Colombo'}
- *Special Requirements:* ${notes || 'Standard Export Bales'}

*Origin Guarantee:* 100% Pure Ceylon Cinnamon (Cinnamomum Verum)
Please quote best spot rate & container availability.`;
  };

  const getWhatsAppUrl = () => {
    const message = generateWhatsAppMessage();
    return `https://wa.me/${TRADE_PHONE}?text=${encodeURIComponent(message)}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleSend = () => {
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="rfq"
      className="py-28 relative bg-gradient-to-b from-[#03140e] via-[#062319] to-[#020b08] overflow-hidden border-t border-ceylon-500/20"
    >
      {/* Clean luxury ambient radial glow spotlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-ceylon-600/15 rounded-full blur-[160px] mix-blend-screen" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-jade-600/10 rounded-full blur-[130px] mix-blend-screen" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(rgba(212, 139, 56, 0.4) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-jade-950/80 border border-ceylon-500/30 text-ceylon-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-md">
            <Sparkles className="w-3 h-3 text-ceylon-400" />
            <span>{t.rfq.badge}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {t.rfq.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {t.rfq.subtitle}
          </p>
        </div>

        {/* Two-Column Quotation Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Quotation Form */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-ceylon-500/35 bg-[#062319]/85 backdrop-blur-md shadow-2xl shadow-black/80">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-ceylon-400" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  Commercial Inquiry Parameters
                </span>
              </div>
              <span className="text-xs text-jade-300 bg-jade-950/90 px-3 py-1 rounded-full border border-jade-500/30">
                Direct FOB / CIF Spot Quotation
              </span>
            </div>

            <div className="space-y-5">
              {/* Product Selection Dropdown */}
              <div>
                <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                  {t.rfq.labelGrade}
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => {
                    const prod = PRODUCTS.find((p) => p.id === e.target.value);
                    if (prod) {
                      setSelectedProductId(prod.id);
                      onSelectProduct(prod);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-ceylon-500/40 text-white font-medium text-sm focus:outline-none focus:border-ceylon-400 transition-colors cursor-pointer"
                >
                  <optgroup label="Pure Ceylon Cinnamon Quills (SLS 81)">
                    {PRODUCTS.filter((p) => p.category === 'quills').map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#062319] text-white">
                        {p.name} ({p.gradeCode})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Cinnamon Cuts & Powders">
                    {PRODUCTS.filter((p) => p.category === 'powders').map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#062319] text-white">
                        {p.name} ({p.gradeCode})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Essential Oils (Steam Distilled)">
                    {PRODUCTS.filter((p) => p.category === 'oils').map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#062319] text-white">
                        {p.name} ({p.gradeCode})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Other Premium Ceylon Spices">
                    {PRODUCTS.filter((p) => p.category === 'spices').map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#062319] text-white">
                        {p.name} ({p.gradeCode})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Quantity and Measurement Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-7">
                  <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                    {t.rfq.labelQty}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-ceylon-500/40 text-white font-medium text-sm focus:outline-none focus:border-ceylon-400 transition-colors"
                    placeholder="500"
                  />
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                    {t.rfq.labelUnit}
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-ceylon-500/40 text-white font-medium text-sm focus:outline-none focus:border-ceylon-400 transition-colors cursor-pointer"
                  >
                    <option value="Kg" className="bg-[#062319]">Kilograms (Kg)</option>
                    <option value="Metric Tons (MT)" className="bg-[#062319]">Metric Tons (MT)</option>
                    <option value="20ft FCL Container" className="bg-[#062319]">20ft FCL Container (~8 MT)</option>
                    <option value="40ft FCL Container" className="bg-[#062319]">40ft FCL Container (~18 MT)</option>
                    <option value="Liters (L)" className="bg-[#062319]">Liters (L - Oils)</option>
                    <option value="Sample Pack (500g)" className="bg-[#062319]">Courier Sample Pack (500g)</option>
                  </select>
                </div>
              </div>

              {/* Incoterm and Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                    {t.rfq.labelIncoterm}
                  </label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-ceylon-500/40 text-white font-medium text-sm focus:outline-none focus:border-ceylon-400 transition-colors cursor-pointer"
                  >
                    <option value="FOB Colombo" className="bg-[#062319]">FOB Colombo (Port of Colombo)</option>
                    <option value="CIF Destination" className="bg-[#062319]">CIF (Cost, Insurance & Freight)</option>
                    <option value="CFR Port" className="bg-[#062319]">CFR (Cost and Freight)</option>
                    <option value="EXW Colombo" className="bg-[#062319]">EXW (Ex Works Factory)</option>
                    <option value="Air Cargo DDU" className="bg-[#062319]">Air Cargo Courier (DDU)</option>
                  </select>
                </div>

                <div className="sm:col-span-7">
                  <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                    {t.rfq.labelDestination}
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-ceylon-500/40 text-white font-medium text-sm focus:outline-none focus:border-ceylon-400 transition-colors"
                    placeholder={t.rfq.placeholderDestination}
                  />
                </div>
              </div>

              {/* Notes / Special Requirements */}
              <div>
                <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                  {t.rfq.labelNotes}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-ceylon-500/40 text-white font-medium text-sm focus:outline-none focus:border-ceylon-400 transition-colors resize-none"
                  placeholder={t.rfq.placeholderNotes}
                />
              </div>

              {/* Selected Grade Quick Verification Card */}
              <div className="p-3.5 rounded-xl bg-jade-950/85 border border-jade-500/35 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <img
                    src={currentProduct.imageUrl}
                    alt={currentProduct.name}
                    className="w-12 h-12 rounded-lg object-cover border border-ceylon-500/30"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{currentProduct.name}</div>
                    <div className="text-[11px] text-ceylon-300 font-medium">
                      {currentProduct.gradeCode} • {currentProduct.specs.moisture} • {currentProduct.specs.coumarin}
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-jade-300 font-bold px-2.5 py-1 rounded bg-jade-900/90 border border-jade-500/40 hidden sm:inline-block">
                  Verified True Ceylon
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Message Preview & Direct Submission */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="glass-card p-6 rounded-3xl border border-ceylon-500/35 bg-[#062319]/90 backdrop-blur-md shadow-2xl shadow-black/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {t.rfq.previewTitle}
                    </span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" />
                </div>

                <p className="text-xs text-gray-300 mb-4">
                  {t.rfq.previewDesc}
                </p>

                {/* Monospace Message Preview Box */}
                <div className="p-4 rounded-2xl bg-[#03140e]/95 border border-ceylon-500/30 font-mono text-xs text-gray-200 whitespace-pre-wrap leading-relaxed select-all max-h-[300px] overflow-y-auto shadow-inner">
                  {generateWhatsAppMessage()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleSend}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>{t.rfq.btnSendWhatsApp}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs sm:text-sm font-semibold text-gray-200 hover:text-white transition-colors cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">{t.rfq.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-ceylon-400" />
                      <span>{t.rfq.btnCopyMessage}</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-gray-300 text-center leading-normal pt-1">
                  {t.rfq.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
