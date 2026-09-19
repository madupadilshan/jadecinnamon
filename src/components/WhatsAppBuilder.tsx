import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Copy,
  Check,
  Sparkles,
  Building2,
  Trash2,
  Plus,
  Minus,
  PackagePlus,
  Scroll,
  User,
  MapPin,
  Phone,
  AlertCircle,
  Package,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Product, PRODUCTS } from '../data/products';
import { TranslationSchema } from '../data/translations';
import { useCart } from '../context/CartContext';
import {
  buildMultiItemWhatsAppMessage,
  openWhatsAppQuotation,
} from './cart/WhatsAppB2BBuilder';

interface WhatsAppBuilderProps {
  t: TranslationSchema;
  selectedProduct: Product | null;
  onSelectProduct: (product: Product) => void;
}

export const WhatsAppBuilder: React.FC<WhatsAppBuilderProps> = ({
  t,
  onSelectProduct: _onSelectProduct,
}) => {
  const {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateUnit,
    clearCart,
    totalUniqueItems,
    totalEstimatedWeightDisplay,
    ordererName,
    setOrdererName,
    ordererAddress,
    setOrdererAddress,
    ordererPhone,
    setOrdererPhone,
    destinationPort,
    setDestinationPort,
    incoterm,
    setIncoterm,
    orderNotes,
    setOrderNotes,
  } = useCart();

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [quickAddProductId, setQuickAddProductId] = useState<string>(PRODUCTS[0].id);
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    phone?: string;
    destination?: string;
    items?: string;
  }>({});

  const sectionRef = useRef<HTMLElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);

  // Scrollytelling 2.0 Parallax & Focal Glide
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const cardGlideY = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [60, 0, 0, -20]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.4, 1, 1, 0.8]);

  // Validate form fields
  const validateForm = () => {
    const errors: { name?: string; phone?: string; destination?: string; items?: string } = {};

    if (items.length === 0) {
      errors.items = 'Please add at least one product item to your quotation.';
    }
    if (!ordererName.trim()) {
      errors.name = 'Please enter your full name or company representative name.';
    }
    if (!ordererPhone.trim()) {
      errors.phone = 'Please enter your contact phone/WhatsApp number.';
    }
    if (!destinationPort.trim()) {
      errors.destination = 'Please specify the destination port or country.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSend = () => {
    if (!validateForm()) {
      return;
    }

    openWhatsAppQuotation({
      items,
      ordererName,
      ordererAddress,
      ordererPhone,
      destinationPort,
      incoterm,
      notes: orderNotes,
    });
  };

  const handleCopy = () => {
    const message = buildMultiItemWhatsAppMessage({
      items,
      ordererName,
      ordererAddress,
      ordererPhone,
      destinationPort,
      incoterm,
      notes: orderNotes,
    });
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleQuickAdd = () => {
    const productToAdd = PRODUCTS.find((p) => p.id === quickAddProductId);
    if (!productToAdd) return;
    const defaultQty = productToAdd.category === 'oils' ? 50 : 500;
    addToCart(productToAdd, defaultQty);
    setValidationErrors((prev) => ({ ...prev, items: undefined }));
  };

  return (
    <section
      ref={sectionRef}
      id="rfq"
      className="py-24 sm:py-32 relative overflow-hidden border-t border-[#E5D8C5] dark:border-ceylon-500/20 bg-[#FBF8F2] dark:bg-[#062319] scroll-mt-20 transition-colors duration-300"
    >
      {/* Parallax Background Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-110 opacity-30 dark:opacity-40 gpu-layer"
        style={{
          backgroundImage: "url('/images/bg-about-plantation.jpg')",
          y: bgY,
        }}
      />

      {/* Balanced Luxury Vignette & Deep Dark / Parchment Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBF8F2]/95 via-[#FBF8F2]/70 to-[#FBF8F2]/95 dark:from-[#062319]/95 dark:via-black/80 dark:to-[#020b08]/98 pointer-events-none" />

      {/* Ambient Focal Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] bg-[#C87A28]/10 dark:bg-ceylon-600/15 rounded-full blur-[160px] mix-blend-screen gpu-layer" />
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-emerald-600/5 dark:bg-jade-600/10 rounded-full blur-[140px] mix-blend-screen gpu-layer" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 gpu-accelerate"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md border border-[#E5D8C5] dark:border-ceylon-500/40 text-[#B86B1E] dark:text-ceylon-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-md">
            <Sparkles className="w-3 h-3 text-[#B86B1E] dark:text-ceylon-400" />
            <span>{t.rfq.badge}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#11281E] dark:text-white mb-4 tracking-tight drop-shadow-sm">
            {t.rfq.title}
          </h2>
          <p className="text-[#536B5C] dark:text-gray-200 text-sm sm:text-base leading-relaxed">
            {t.rfq.subtitle}
          </p>
        </motion.div>

        {/* Phase 2: Unified B2B Cart & Dynamic WhatsApp Quotation Hub */}
        <motion.div
          style={{ y: cardGlideY, opacity: cardOpacity }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start gpu-accelerate"
        >
          {/* Left Column: Synchronized Cart Review & Orderer Parameters Form */}
          <div className="lg:col-span-7 glass-card p-5 sm:p-8 rounded-3xl border border-[#E5D8C5] dark:border-ceylon-500/40 bg-white/95 dark:bg-[#0A2F22]/95 backdrop-blur-xl shadow-xl dark:shadow-2xl dark:shadow-black/90 gpu-accelerate space-y-6 sm:space-y-7">
            {/* Header with Live Item Count */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5D8C5] dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-[#B86B1E] dark:text-ceylon-400" />
                <span className="text-sm font-bold text-[#11281E] dark:text-white uppercase tracking-wider">
                  B2B Cart & Export Parameters
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#783C1D] dark:text-amber-300 font-mono bg-[#f6ecd6] dark:bg-black/50 px-3 py-1 rounded-full border border-[#E5D8C5] dark:border-white/10">
                  Total: {totalEstimatedWeightDisplay}
                </span>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="min-h-[36px] text-[11px] text-red-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-300 px-2 py-1 rounded bg-red-50 dark:bg-white/5 hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Validation Error Banner */}
            {validationErrors.items && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-300 dark:border-red-500/50 text-red-700 dark:text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{validationErrors.items}</span>
              </div>
            )}

            {/* 1. Synchronized Cart Line Items Review */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#11281E] dark:text-gray-200 uppercase tracking-wider">
                  1. Quotation Line Items ({totalUniqueItems} {totalUniqueItems === 1 ? 'Item' : 'Items'})
                </label>
                <span className="text-[11px] text-emerald-700 dark:text-jade-300 font-medium">
                  Directly synced with your Cart
                </span>
              </div>

              {items.length === 0 ? (
                <div className="p-6 rounded-2xl bg-[#F4EFE6] dark:bg-black/40 border border-dashed border-[#E5D8C5] dark:border-white/15 text-center space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 mx-auto flex items-center justify-center text-[#B86B1E] dark:text-gray-400">
                    <Package className="w-5 h-5 text-[#B86B1E] dark:text-ceylon-400" />
                  </div>
                  <p className="text-xs text-[#536B5C] dark:text-gray-300 max-w-sm mx-auto">
                    Your cart is currently empty. Add products below or browse the catalog above to build your official quotation.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.22 }}
                        className="p-3.5 rounded-2xl bg-[#F4EFE6] dark:bg-[#041912] border border-[#E5D8C5] dark:border-ceylon-500/30 shadow-md flex flex-col gap-2.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-[#E5D8C5] dark:border-white/10 shrink-0 bg-black">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-mono text-center text-amber-300 font-bold">
                                #{index + 1}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <div className="text-[10px] uppercase font-bold text-[#B86B1E] dark:text-ceylon-400 tracking-wider">
                                {item.categoryLabel || item.category}
                              </div>
                              <h4 className="font-serif text-sm font-bold text-[#11281E] dark:text-white truncate">
                                {item.name}
                              </h4>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-red-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity controls & Unit toggle */}
                        <div className="pt-2 border-t border-[#E5D8C5] dark:border-white/5 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 bg-white dark:bg-black/60 p-1 rounded-xl border border-[#E5D8C5] dark:border-white/10">
                            <button
                              type="button"
                              onClick={() => {
                                const step = item.unit === 'MT' ? 0.5 : 50;
                                updateQuantity(item.id, Math.max(1, item.quantity - step));
                              }}
                              className="w-7 h-7 rounded-md bg-[#F4EFE6] dark:bg-white/5 hover:bg-[#ebd7ad] dark:hover:bg-white/15 flex items-center justify-center text-[#11281E] dark:text-gray-200 transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>

                            <input
                              type="number"
                              min="1"
                              step={item.unit === 'MT' ? '0.1' : '10'}
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(item.id, parseFloat(e.target.value) || 0)
                              }
                              className="w-14 sm:w-16 text-center bg-transparent text-xs font-bold text-[#11281E] dark:text-white font-mono focus:outline-none"
                            />

                            <button
                              type="button"
                              onClick={() => {
                                const step = item.unit === 'MT' ? 0.5 : 50;
                                updateQuantity(item.id, item.quantity + step);
                              }}
                              className="w-7 h-7 rounded-md bg-[#F4EFE6] dark:bg-white/5 hover:bg-[#ebd7ad] dark:hover:bg-white/15 flex items-center justify-center text-[#11281E] dark:text-gray-200 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Unit Selector */}
                          <div className="flex items-center gap-1">
                            {(['Kg', 'MT', 'L', 'Bales'] as const).map((u) => {
                              const isSelected = item.unit === u;
                              return (
                                <button
                                  key={u}
                                  type="button"
                                  onClick={() => updateUnit(item.id, u)}
                                  className={`px-2 py-1 min-h-[32px] rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#C87A28] text-white shadow-sm'
                                      : 'bg-white dark:bg-black/40 text-[#536B5C] dark:text-gray-400 hover:text-black dark:hover:text-white border border-[#E5D8C5] dark:border-white/5'
                                  }`}
                                >
                                  {u}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Quick Add Product Dropdown Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                <select
                  value={quickAddProductId}
                  onChange={(e) => setQuickAddProductId(e.target.value)}
                  className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-[#F4EFE6] dark:bg-black/70 border border-[#E5D8C5] dark:border-ceylon-500/35 text-[#11281E] dark:text-white text-xs focus:outline-none focus:border-[#B86B1E] dark:focus:border-ceylon-400 cursor-pointer"
                >
                  <optgroup label="Cinnamon Quills (SLS 81)">
                    {PRODUCTS.filter((p) => p.category === 'quills').map((p) => (
                      <option key={p.id} value={p.id} className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">
                        {p.name} ({p.gradeCode})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Cuts & Powders">
                    {PRODUCTS.filter((p) => p.category === 'powders').map((p) => (
                      <option key={p.id} value={p.id} className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">
                        {p.name} ({p.gradeCode})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Essential Oils">
                    {PRODUCTS.filter((p) => p.category === 'oils').map((p) => (
                      <option key={p.id} value={p.id} className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">
                        {p.name} ({p.gradeCode})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Allied Ceylon Spices">
                    {PRODUCTS.filter((p) => p.category === 'spices').map((p) => (
                      <option key={p.id} value={p.id} className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">
                        {p.name} ({p.gradeCode})
                      </option>
                    ))}
                  </optgroup>
                </select>

                <button
                  type="button"
                  onClick={handleQuickAdd}
                  className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C87A28] hover:bg-[#b0671c] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <PackagePlus className="w-4 h-4" />
                  <span>(+) Add Product</span>
                </button>
              </div>
            </div>

            {/* 2. Structured Shipping Parameters Form */}
            <div className="space-y-4 pt-3 border-t border-[#E5D8C5] dark:border-white/10">
              <label className="text-xs font-bold text-[#11281E] dark:text-gray-200 uppercase tracking-wider block">
                2. Shipping & Trade Parameters
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* Incoterm Select */}
                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-semibold text-[#536B5C] dark:text-gray-300 mb-1">
                    Preferred Incoterm *
                  </label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value)}
                    className="w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-black/70 border border-[#E5D8C5] dark:border-ceylon-500/40 text-[#11281E] dark:text-white text-xs font-medium focus:outline-none focus:border-[#B86B1E] dark:focus:border-ceylon-400 cursor-pointer"
                  >
                    <option value="FOB Colombo & CIF Destination" className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">
                      FOB Colombo & CIF Destination (Default)
                    </option>
                    <option value="FOB Port of Colombo" className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">
                      FOB Port of Colombo
                    </option>
                    <option value="CIF (Cost, Insurance & Freight)" className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">
                      CIF (Cost, Insurance & Freight)
                    </option>
                    <option value="CFR (Cost and Freight)" className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">
                      CFR (Cost and Freight)
                    </option>
                    <option value="EXW (Ex Works Factory)" className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">
                      EXW (Ex Works Factory)
                    </option>
                    <option value="Air Cargo Courier (DDU)" className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">
                      Air Cargo Courier (DDU)
                    </option>
                  </select>
                </div>

                {/* Destination Port / Country */}
                <div className="sm:col-span-7">
                  <label className="block text-[11px] font-semibold text-[#536B5C] dark:text-gray-300 mb-1">
                    Destination Port / Country *
                  </label>
                  <input
                    type="text"
                    value={destinationPort}
                    onChange={(e) => {
                      setDestinationPort(e.target.value);
                      if (validationErrors.destination) {
                        setValidationErrors((prev) => ({ ...prev, destination: undefined }));
                      }
                    }}
                    placeholder="e.g., Port of Hamburg, Germany"
                    className={`w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-black/70 border text-[#11281E] dark:text-white text-xs font-medium focus:outline-none ${
                      validationErrors.destination
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-[#E5D8C5] dark:border-ceylon-500/40 focus:border-[#B86B1E] dark:focus:border-ceylon-400'
                    }`}
                  />
                  {validationErrors.destination && (
                    <span className="text-[10px] text-red-500 dark:text-red-400 mt-0.5 block">
                      {validationErrors.destination}
                    </span>
                  )}
                </div>
              </div>

              {/* Custom Packaging or Lab Requirements */}
              <div>
                <label className="block text-[11px] font-semibold text-[#536B5C] dark:text-gray-300 mb-1">
                  Custom Packaging or Lab Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g., 25kg vacuum packs, private labeling, specific moisture level < 12%"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-black/70 border border-[#E5D8C5] dark:border-ceylon-500/40 text-[#11281E] dark:text-white text-xs font-medium focus:outline-none focus:border-[#B86B1E] dark:focus:border-ceylon-400 resize-none"
                />
              </div>
            </div>

            {/* 3. Orderer Contact Information */}
            <div className="space-y-4 pt-3 border-t border-[#E5D8C5] dark:border-white/10">
              <label className="text-xs font-bold text-[#11281E] dark:text-gray-200 uppercase tracking-wider block">
                3. Orderer Contact Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#536B5C] dark:text-gray-300 mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#B86B1E] dark:text-ceylon-400" />
                    <span>NAME (Representative) *</span>
                  </label>
                  <input
                    type="text"
                    value={ordererName}
                    onChange={(e) => {
                      setOrdererName(e.target.value);
                      if (validationErrors.name) {
                        setValidationErrors((prev) => ({ ...prev, name: undefined }));
                      }
                    }}
                    placeholder="Full name / Trade representative"
                    className={`w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-black/70 border text-[#11281E] dark:text-white text-xs font-medium focus:outline-none ${
                      validationErrors.name
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-[#E5D8C5] dark:border-ceylon-500/40 focus:border-[#B86B1E] dark:focus:border-ceylon-400'
                    }`}
                  />
                  {validationErrors.name && (
                    <span className="text-[10px] text-red-500 dark:text-red-400 mt-0.5 block">
                      {validationErrors.name}
                    </span>
                  )}
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#536B5C] dark:text-gray-300 mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#25D366]" />
                    <span>PHONE NO (WhatsApp / Tel) *</span>
                  </label>
                  <input
                    type="tel"
                    value={ordererPhone}
                    onChange={(e) => {
                      setOrdererPhone(e.target.value);
                      if (validationErrors.phone) {
                        setValidationErrors((prev) => ({ ...prev, phone: undefined }));
                      }
                    }}
                    placeholder="+49 40 12345678"
                    className={`w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-black/70 border text-[#11281E] dark:text-white text-xs font-medium focus:outline-none ${
                      validationErrors.phone
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-[#E5D8C5] dark:border-ceylon-500/40 focus:border-[#B86B1E] dark:focus:border-ceylon-400'
                    }`}
                  />
                  {validationErrors.phone && (
                    <span className="text-[10px] text-red-500 dark:text-red-400 mt-0.5 block">
                      {validationErrors.phone}
                    </span>
                  )}
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-[#536B5C] dark:text-gray-300 mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#B86B1E] dark:text-amber-300" />
                    <span>ADDRESS (Business / Country)</span>
                  </label>
                  <input
                    type="text"
                    value={ordererAddress}
                    onChange={(e) => setOrdererAddress(e.target.value)}
                    placeholder="Company address, City, Postal Code, Country"
                    className="w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-black/70 border border-[#E5D8C5] dark:border-ceylon-500/40 text-[#11281E] dark:text-white text-xs font-medium focus:outline-none focus:border-[#B86B1E] dark:focus:border-ceylon-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Monospace Message Preview & Direct Submission */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="glass-card p-5 sm:p-7 rounded-3xl border border-[#E5D8C5] dark:border-ceylon-500/40 bg-white/95 dark:bg-[#0A2F22]/95 backdrop-blur-xl shadow-xl dark:shadow-2xl dark:shadow-black/90 flex flex-col justify-between gpu-accelerate">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5D8C5] dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <WhatsAppIcon className="w-4.5 h-4.5 text-[#25D366]" />
                    <span className="text-xs font-bold text-[#11281E] dark:text-white uppercase tracking-wider">
                      {t.rfq.previewTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#783C1D] dark:text-amber-200/90 font-mono bg-[#f6ecd6] dark:bg-black/60 px-2.5 py-0.5 rounded-full border border-[#E5D8C5] dark:border-white/10">
                      <Scroll className="w-3 h-3 text-[#B86B1E] dark:text-amber-300" />
                      <span>Scrollable</span>
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" />
                  </div>
                </div>

                <p className="text-xs text-[#536B5C] dark:text-gray-200 mb-3 leading-relaxed">
                  Real-time generated export inquiry string. Use touch or mouse wheel inside the box below to inspect all compiled line items:
                </p>

                {/* Monospace Message Preview Box with Smooth Mouse Wheel Scroll enabled */}
                <div
                  ref={previewScrollRef}
                  data-lenis-prevent="true"
                  style={{
                    overscrollBehavior: 'contain',
                  }}
                  className="relative p-4 rounded-2xl bg-[#062319] border border-ceylon-500/35 font-mono text-xs text-gray-200 whitespace-pre-wrap leading-relaxed select-all max-h-[340px] sm:max-h-[430px] overflow-y-auto custom-scrollbar shadow-inner"
                >
                  {buildMultiItemWhatsAppMessage({
                    items,
                    ordererName,
                    ordererAddress,
                    ordererPhone,
                    destinationPort,
                    incoterm,
                    notes: orderNotes,
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleSend}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>Request WhatsApp B2B Quotation</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#F4EFE6] dark:bg-white/5 hover:bg-[#ebd7ad] dark:hover:bg-white/10 border border-[#E5D8C5] dark:border-white/15 text-xs sm:text-sm font-semibold text-[#11281E] dark:text-gray-200 transition-colors cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">Inquiry String Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#B86B1E] dark:text-ceylon-400" />
                      <span>{t.rfq.btnCopyMessage}</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#536B5C] dark:text-gray-300 text-center leading-normal pt-1">
                  Official Trade Desk (+94 78 521 8364). Instant formal reply with CIF/FOB proforma rate sheet.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsAppBuilder;
