import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Building2,
  Trash2,
  Plus,
  Minus,
  PackagePlus,
  User,
  MapPin,
  Phone,
  AlertCircle,
  Package,
  ShieldCheck,
  Clock,
  FileCheck2,
  Anchor,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Product, PRODUCTS } from '../data/products';
import { TranslationSchema } from '../data/translations';
import { useCart } from '../context/CartContext';
import { openWhatsAppQuotation } from './cart/WhatsAppB2BBuilder';
import { getAssetUrl } from '../utils/assets';

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

  const [quickAddProductId, setQuickAddProductId] = useState<string>(PRODUCTS[0].id);
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    phone?: string;
    address?: string;
    destination?: string;
    items?: string;
    zeroQuantity?: string;
    zeroItemIds?: string[];
  }>({});

  const sectionRef = useRef<HTMLElement>(null);

  // Scrollytelling 2.0 Parallax & Focal Glide
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const cardGlideY = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [60, 0, 0, -20]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.4, 1, 1, 0.8]);

  // Handle quantity changes and clear errors dynamically
  const handleQuantityChange = (itemId: string, newQty: number) => {
    updateQuantity(itemId, newQty);
    if (newQty > 0 && validationErrors.zeroItemIds?.includes(itemId)) {
      setValidationErrors((prev) => {
        const remainingZeroIds = (prev.zeroItemIds || []).filter((id) => id !== itemId);
        return {
          ...prev,
          zeroItemIds: remainingZeroIds,
          zeroQuantity: remainingZeroIds.length === 0 ? undefined : prev.zeroQuantity,
          items: undefined,
        };
      });
    }
  };

  // Validate form fields & line items before WhatsApp generation
  const validateForm = () => {
    const errors: {
      name?: string;
      phone?: string;
      address?: string;
      destination?: string;
      items?: string;
      zeroQuantity?: string;
      zeroItemIds?: string[];
    } = {};

    if (items.length === 0) {
      errors.items = 'Please add at least one product item to your quotation.';
    } else {
      const zeroItems = items.filter((item) => item.quantity <= 0);
      const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);

      if (zeroItems.length > 0 || totalQty <= 0) {
        errors.zeroQuantity =
          'Please specify a valid quantity greater than 0 (Kg / L) for your selected items before requesting a quotation.';
        errors.zeroItemIds = zeroItems.map((i) => i.id);
      }
    }

    if (!ordererName.trim()) {
      errors.name = 'Please enter your full name or company representative name.';
    }
    if (!ordererPhone.trim()) {
      errors.phone = 'Please enter your contact phone/WhatsApp number.';
    }
    if (!ordererAddress.trim()) {
      errors.address = 'Please enter your business or delivery address.';
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

  const handleQuickAdd = () => {
    const productToAdd = PRODUCTS.find((p) => p.id === quickAddProductId);
    if (!productToAdd) return;
    // Default quantity must be 0 per specifications
    addToCart(productToAdd, 0);
    setValidationErrors((prev) => ({ ...prev, items: undefined }));
  };

  return (
    <section
      ref={sectionRef}
      id="rfq"
      className="py-20 sm:py-28 relative overflow-hidden border-t border-[#C87A28]/20 dark:border-[#C87A28]/30 bg-[#FBF8F2] dark:bg-[#062319] scroll-mt-20 transition-colors duration-300"
    >
      {/* Parallax Background Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-110 opacity-30 dark:opacity-40 gpu-layer"
        style={{
          backgroundImage: `url('${getAssetUrl('images/gallery-plantation.webp')}')`,
          y: bgY,
        }}
      />

      {/* Balanced Luxury Vignette & Deep Dark / Parchment Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBF8F2]/95 via-[#FBF8F2]/75 to-[#FBF8F2]/95 dark:from-[#062319]/95 dark:via-black/80 dark:to-[#020b08]/98 pointer-events-none" />

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
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 gpu-accelerate"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#11281E] dark:text-[#F9F6F0] mb-3 sm:mb-4 tracking-tight drop-shadow-sm">
            {t.rfq.title}
          </h2>
          <p className="text-[#3B4D43] dark:text-[#D1DDD5] text-sm sm:text-base leading-relaxed">
            {t.rfq.subtitle}
          </p>
        </motion.div>

        {/* Phase 2: Unified B2B Cart & WhatsApp Quotation Hub */}
        <motion.div
          style={{ y: cardGlideY, opacity: cardOpacity }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start gpu-accelerate"
        >
          {/* Left Column: Synchronized Cart Review & Orderer Parameters Form */}
          <div className="lg:col-span-7 glass-card p-5 sm:p-8 rounded-3xl border border-[#C87A28]/20 dark:border-[#C87A28]/30 bg-white/95 dark:bg-[#0A2F22]/95 backdrop-blur-xl shadow-xl dark:shadow-2xl dark:shadow-black/90 gpu-accelerate space-y-6 sm:space-y-7">
            {/* Header with Live Item Count */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#C87A28]/20 dark:border-[#C87A28]/30">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-[#9E5714] dark:text-[#E59A4D]" />
                <span className="text-sm font-bold text-[#11281E] dark:text-[#F9F6F0] uppercase tracking-wider">
                  B2B Cart & Export Parameters
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#9E5714] dark:text-[#E59A4D] font-mono bg-[#f6ecd6] dark:bg-black/50 px-3 py-1 rounded-full border border-[#C87A28]/20 dark:border-[#C87A28]/30 font-semibold">
                  Total Volume: {totalEstimatedWeightDisplay}
                </span>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="min-h-[36px] text-[11px] text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 hover:bg-red-100 transition-colors cursor-pointer font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Validation Error Banner (Empty Cart or Zero Quantity) */}
            {(validationErrors.items || validationErrors.zeroQuantity) && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-300 dark:border-red-500/50 text-red-700 dark:text-red-200 text-xs flex items-center gap-2.5 shadow-sm"
              >
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span className="font-medium">{validationErrors.items || validationErrors.zeroQuantity}</span>
              </motion.div>
            )}

            {/* 1. Synchronized Cart Line Items Review */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#11281E] dark:text-[#F9F6F0] uppercase tracking-wider">
                  1. Quotation Line Items ({totalUniqueItems} {totalUniqueItems === 1 ? 'Item' : 'Items'})
                </label>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                  Directly synced with your B2B Cart
                </span>
              </div>

              {items.length === 0 ? (
                <div className="p-6 rounded-2xl bg-[#F4EFE6] dark:bg-black/40 border border-dashed border-[#C87A28]/20 dark:border-[#C87A28]/30 text-center space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 mx-auto flex items-center justify-center text-[#9E5714] dark:text-[#E59A4D]">
                    <Package className="w-5 h-5 text-[#9E5714] dark:text-[#E59A4D]" />
                  </div>
                  <p className="text-xs text-[#5A6D62] dark:text-[#A3B899] max-w-sm mx-auto">
                    Your quotation list is currently empty. Select products below or browse the catalog above to build your order.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => {
                      const isZeroError =
                        Boolean(validationErrors.zeroItemIds?.includes(item.id)) ||
                        (Boolean(validationErrors.zeroQuantity) && item.quantity <= 0);

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.22 }}
                          className={`p-3.5 rounded-2xl bg-[#F4EFE6] dark:bg-[#041912] border shadow-md flex flex-col gap-2.5 transition-colors ${
                            isZeroError
                              ? 'border-red-400 dark:border-red-500/80 shadow-red-500/10'
                              : 'border-[#C87A28]/20 dark:border-[#C87A28]/30'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-[#C87A28]/20 dark:border-white/10 shrink-0 bg-black">
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
                                <div className="text-[10px] uppercase font-bold text-[#9E5714] dark:text-[#E59A4D] tracking-wider">
                                  {item.categoryLabel || item.category}
                                </div>
                                <h4 className="font-serif text-sm font-bold text-[#11281E] dark:text-[#F9F6F0] truncate">
                                  {item.name}
                                </h4>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                              title="Remove item"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Quantity controls & Unit toggle with 40px+ Touch Targets */}
                          <div className="pt-2.5 border-t border-[#C87A28]/20 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                            {/* Inline Dynamic Quantity Controller: [-] [Input] [+] */}
                            <div className="flex items-center gap-1.5 bg-white/80 dark:bg-black/40 p-1 rounded-2xl border border-[#C87A28]/20 dark:border-white/10 shadow-sm">
                              <button
                                type="button"
                                onClick={() => {
                                  const step = item.unit === 'L' ? (item.quantity <= 10 ? 1 : 5) : (item.quantity <= 50 ? 5 : 50);
                                  const nextQty = Math.max(0, Math.round((item.quantity - step) * 100) / 100);
                                  handleQuantityChange(item.id, nextQty);
                                }}
                                className="min-w-[40px] min-h-[40px] px-3 py-1 bg-[#C87A28]/20 hover:bg-[#C87A28] text-[#9E5714] dark:text-[#E59A4D] hover:text-white rounded-xl transition-colors flex items-center justify-center cursor-pointer active:scale-95"
                                title="Decrease quantity"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4 font-bold" />
                              </button>

                              <input
                                type="number"
                                min="0"
                                step={item.unit === 'L' ? '1' : '1'}
                                value={item.quantity === 0 ? '0' : item.quantity}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (val === '') {
                                    handleQuantityChange(item.id, 0);
                                  } else {
                                    const parsed = parseFloat(val);
                                    if (!isNaN(parsed)) {
                                      handleQuantityChange(item.id, Math.max(0, parsed));
                                    }
                                  }
                                }}
                                className={`min-h-[40px] w-20 px-2 py-1.5 text-center bg-white dark:bg-[#062319] text-[#11281E] dark:text-[#F9F6F0] rounded-xl text-sm font-bold font-mono focus:outline-none transition-all ${
                                  isZeroError
                                    ? 'ring-2 ring-red-500 border-red-500 bg-red-50/50 dark:bg-red-950/30'
                                    : 'border border-[#C87A28]/30 focus:ring-2 focus:ring-[#C87A28]'
                                }`}
                                aria-label={`Quantity for ${item.name}`}
                              />

                              <button
                                type="button"
                                onClick={() => {
                                  const step = item.unit === 'L' ? (item.quantity < 10 ? 1 : 5) : (item.quantity < 50 ? 5 : 50);
                                  const nextQty = Math.round((item.quantity + step) * 100) / 100;
                                  handleQuantityChange(item.id, nextQty);
                                }}
                                className="min-w-[40px] min-h-[40px] px-3 py-1 bg-[#C87A28]/20 hover:bg-[#C87A28] text-[#9E5714] dark:text-[#E59A4D] hover:text-white rounded-xl transition-colors flex items-center justify-center cursor-pointer active:scale-95"
                                title="Increase quantity"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4 font-bold" />
                              </button>
                            </div>

                            {/* Unit Selector / Badge strictly restricted to Kg and L */}
                            <div className="flex items-center gap-1.5">
                              {(['Kg', 'L'] as const).map((u) => {
                                const isSelected = item.unit === u;
                                return (
                                  <button
                                    key={u}
                                    type="button"
                                    onClick={() => updateUnit(item.id, u)}
                                    className={`px-3.5 py-1.5 min-h-[40px] rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#C87A28] text-white shadow-md shadow-[#C87A28]/30'
                                        : 'bg-white dark:bg-[#062319] text-[#5A6D62] dark:text-[#A3B899] hover:text-[#11281E] dark:hover:text-white border border-[#C87A28]/20 dark:border-white/10 hover:border-[#C87A28]/50'
                                    }`}
                                  >
                                    {u}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}

              {/* Quick Add Product Dropdown Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                <select
                  value={quickAddProductId}
                  onChange={(e) => setQuickAddProductId(e.target.value)}
                  className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-[#F4EFE6] dark:bg-[#03140e] border border-[#C87A28]/25 dark:border-[#C87A28]/35 text-[#11281E] dark:text-[#F9F6F0] text-xs focus:outline-none focus:border-[#C87A28] cursor-pointer"
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
            <div className="space-y-4 pt-3 border-t border-[#C87A28]/20 dark:border-[#C87A28]/30">
              <label className="text-xs font-bold text-[#11281E] dark:text-[#F9F6F0] uppercase tracking-wider block">
                2. Shipping & Trade Parameters
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* Incoterm Select */}
                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-semibold text-[#5A6D62] dark:text-[#A3B899] mb-1">
                    Preferred Incoterm *
                  </label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value)}
                    className="w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-[#03140e] border border-[#C87A28]/25 dark:border-[#C87A28]/35 text-[#11281E] dark:text-[#F9F6F0] text-xs font-medium focus:outline-none focus:border-[#C87A28] cursor-pointer"
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
                  <label className="block text-[11px] font-semibold text-[#5A6D62] dark:text-[#A3B899] mb-1">
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
                    className={`w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-[#03140e] border text-[#11281E] placeholder:text-[#829288] dark:text-[#F9F6F0] dark:placeholder:text-[#64796E] text-xs font-medium focus:outline-none ${
                      validationErrors.destination
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-[#C87A28]/25 dark:border-[#C87A28]/35 focus:border-[#C87A28]'
                    }`}
                  />
                  {validationErrors.destination && (
                    <span className="text-[10px] text-red-500 dark:text-red-400 mt-0.5 block font-medium">
                      {validationErrors.destination}
                    </span>
                  )}
                </div>
              </div>

              {/* Custom Packaging or Lab Requirements */}
              <div>
                <label className="block text-[11px] font-semibold text-[#5A6D62] dark:text-[#A3B899] mb-1">
                  Custom Packaging or Lab Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g., 25kg vacuum packs, private labeling, specific moisture level < 12%"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-[#03140e] border border-[#C87A28]/25 dark:border-[#C87A28]/35 text-[#11281E] placeholder:text-[#829288] dark:text-[#F9F6F0] dark:placeholder:text-[#64796E] text-xs font-medium focus:outline-none focus:border-[#C87A28] resize-none"
                />
              </div>
            </div>

            {/* 3. Orderer Contact Information */}
            <div className="space-y-4 pt-3 border-t border-[#C87A28]/20 dark:border-[#C87A28]/30">
              <label className="text-xs font-bold text-[#11281E] dark:text-[#F9F6F0] uppercase tracking-wider block">
                3. Orderer Contact Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A6D62] dark:text-[#A3B899] mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#9E5714] dark:text-[#E59A4D]" />
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
                    className={`w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-[#03140e] border text-[#11281E] placeholder:text-[#829288] dark:text-[#F9F6F0] dark:placeholder:text-[#64796E] text-xs font-medium focus:outline-none ${
                      validationErrors.name
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-[#C87A28]/25 dark:border-[#C87A28]/35 focus:border-[#C87A28]'
                    }`}
                  />
                  {validationErrors.name && (
                    <span className="text-[10px] text-red-500 dark:text-red-400 mt-0.5 block font-medium">
                      {validationErrors.name}
                    </span>
                  )}
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A6D62] dark:text-[#A3B899] mb-1 flex items-center gap-1">
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
                    className={`w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-[#03140e] border text-[#11281E] placeholder:text-[#829288] dark:text-[#F9F6F0] dark:placeholder:text-[#64796E] text-xs font-medium focus:outline-none ${
                      validationErrors.phone
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-[#C87A28]/25 dark:border-[#C87A28]/35 focus:border-[#C87A28]'
                    }`}
                  />
                  {validationErrors.phone && (
                    <span className="text-[10px] text-red-500 dark:text-red-400 mt-0.5 block font-medium">
                      {validationErrors.phone}
                    </span>
                  )}
                </div>

                {/* Address (Mandatory *) */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-[#5A6D62] dark:text-[#A3B899] mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#9E5714] dark:text-[#E59A4D]" />
                    <span>ADDRESS (Business / Country) *</span>
                  </label>
                  <input
                    type="text"
                    value={ordererAddress}
                    onChange={(e) => {
                      setOrdererAddress(e.target.value);
                      if (validationErrors.address) {
                        setValidationErrors((prev) => ({ ...prev, address: undefined }));
                      }
                    }}
                    placeholder="Company address, City, Postal Code, Country"
                    className={`w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F4EFE6] dark:bg-[#03140e] border text-[#11281E] placeholder:text-[#829288] dark:text-[#F9F6F0] dark:placeholder:text-[#64796E] text-xs font-medium focus:outline-none ${
                      validationErrors.address
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-[#C87A28]/25 dark:border-[#C87A28]/35 focus:border-[#C87A28]'
                    }`}
                  />
                  {validationErrors.address && (
                    <span className="text-[10px] text-red-500 dark:text-red-400 mt-0.5 block font-medium">
                      {validationErrors.address}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Commercial Summary & Direct WhatsApp Submission */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#C87A28]/20 dark:border-[#C87A28]/30 bg-white/95 dark:bg-[#0A2F22]/95 backdrop-blur-xl shadow-xl dark:shadow-2xl dark:shadow-black/90 flex flex-col justify-between gpu-accelerate space-y-6">
              {/* Header */}
              <div className="pb-4 border-b border-[#C87A28]/20 dark:border-[#C87A28]/30">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-[#25D366]/15 flex items-center justify-center border border-[#25D366]/30">
                    <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#11281E] dark:text-[#F9F6F0] leading-tight">
                      Trade Desk Quotation
                    </h3>
                    <p className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">
                      Direct Colombo Export Processing Desk
                    </p>
                  </div>
                </div>
              </div>

              {/* Commercial Summary Cards */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#F4EFE6] dark:bg-[#041912] border border-[#C87A28]/20 dark:border-[#C87A28]/30 space-y-2.5">
                  <div className="text-xs font-bold text-[#11281E] dark:text-[#F9F6F0] uppercase tracking-wider flex items-center justify-between">
                    <span>Order Specification</span>
                    <span className="text-[#9E5714] dark:text-[#E59A4D] font-mono text-[11px]">
                      {totalUniqueItems} {totalUniqueItems === 1 ? 'Grade' : 'Grades'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs divide-y divide-[#C87A28]/10 dark:divide-white/5 pt-1">
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[#5A6D62] dark:text-[#A3B899]">Estimated Volume:</span>
                      <span className="font-bold font-mono text-[#11281E] dark:text-[#F9F6F0]">
                        {totalEstimatedWeightDisplay}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[#5A6D62] dark:text-[#A3B899]">Incoterm:</span>
                      <span className="font-semibold text-[#11281E] dark:text-[#F9F6F0] truncate max-w-[180px] text-right">
                        {incoterm.split(' ')[0]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[#5A6D62] dark:text-[#A3B899]">Destination:</span>
                      <span className="font-semibold text-[#11281E] dark:text-[#F9F6F0] truncate max-w-[180px] text-right">
                        {destinationPort || 'Hamburg / CIF Specified'}
                      </span>
                    </div>

                    {ordererName && (
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[#5A6D62] dark:text-[#A3B899]">Representative:</span>
                        <span className="font-semibold text-[#11281E] dark:text-[#F9F6F0] truncate max-w-[180px] text-right">
                          {ordererName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Key Guarantees & Verification Badges */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#062319] border border-[#C87A28]/20 dark:border-[#C87A28]/30 space-y-2">
                  <div className="flex items-start gap-2.5 text-xs text-[#3B4D43] dark:text-[#D1DDD5]">
                    <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>15-Minute Guaranteed Commercial Response Time</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#3B4D43] dark:text-[#D1DDD5]">
                    <ShieldCheck className="w-4 h-4 text-[#9E5714] dark:text-[#E59A4D] shrink-0 mt-0.5" />
                    <span>100% Pure Ceylon Origin • SLS 81:2000 & ISO 6539:2014</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#3B4D43] dark:text-[#D1DDD5]">
                    <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>Official Proforma Invoice, COA & Phytosanitary Certificates</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#3B4D43] dark:text-[#D1DDD5]">
                    <Anchor className="w-4 h-4 text-[#9E5714] dark:text-[#E59A4D] shrink-0 mt-0.5" />
                    <span>FCL / LCL Container Loading at Port of Colombo</span>
                  </div>
                </div>
              </div>

              {/* Primary CTA Button & Pre-Submission Warning Banner */}
              <div className="space-y-3 pt-2">
                {validationErrors.zeroQuantity && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-red-50 dark:bg-red-950/90 border border-red-300 dark:border-red-500/60 text-red-700 dark:text-red-200 text-xs flex items-center gap-2 shadow-sm"
                  >
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="font-medium leading-snug">{validationErrors.zeroQuantity}</span>
                  </motion.div>
                )}

                <button
                  type="button"
                  onClick={handleSend}
                  className="w-full min-h-[52px] inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-base shadow-xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>{t?.rfq?.btnSendWhatsApp || 'Send Quotation via WhatsApp'}</span>
                </button>

                <p className="text-[11px] text-[#5A6D62] dark:text-[#A3B899] text-center leading-relaxed">
                  Direct connection to Jade Cinnamon Lanka Trade Desk (+94 76 533 5308). Instant formal reply with FOB/CIF proforma rates.
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
