import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Package,
  Globe,
  AlertCircle,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useCart } from '../context/CartContext';
import { openWhatsAppQuotation } from './cart/WhatsAppB2BBuilder';
import {
  formatCartItemTitle,
  getCartItemUnitBadge,
  getCartItemSubtext,
} from '../utils/cartFormatting';

import { TranslationSchema } from '../data/translations';

interface CartPanelProps {
  t: TranslationSchema;
  isRtl?: boolean;
}

export const CartPanel: React.FC<CartPanelProps> = ({ t, isRtl = false }) => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
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

  const [validationErrors, setValidationErrors] = useState<{
    items?: string;
    zeroQuantity?: string;
    name?: string;
    phone?: string;
    address?: string;
    zeroItemIds?: string[];
  }>({});

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

  const validateCartForm = () => {
    const errors: {
      items?: string;
      zeroQuantity?: string;
      name?: string;
      phone?: string;
      address?: string;
      zeroItemIds?: string[];
    } = {};

    if (items.length === 0) {
      errors.items = t.rfq?.errorAddProduct || 'Your export quotation cart is empty.';
    } else {
      const zeroItems = items.filter((item) => item.quantity <= 0);
      const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);

      if (zeroItems.length > 0 || totalQty <= 0) {
        errors.zeroQuantity =
          t.rfq?.errorZeroQty ||
          'Please specify a valid quantity greater than 0 for your selected items before requesting a quotation.';
        errors.zeroItemIds = zeroItems.map((i) => i.id);
      }
    }

    if (!ordererName.trim()) {
      errors.name = t.rfq?.errorName || 'Please enter your name or company representative name.';
    }
    if (!ordererPhone.trim()) {
      errors.phone = t.rfq?.errorPhone || 'Please enter your contact phone / WhatsApp.';
    }
    if (!ordererAddress.trim()) {
      errors.address = t.rfq?.errorAddress || 'Please enter your business delivery address.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRequestQuotation = () => {
    if (!validateCartForm()) {
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

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[70] flex justify-end">
          {/* Backdrop Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 z-10"
            aria-hidden="true"
          />

          {/* Sliding Solid Cart Panel */}
          <motion.div
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`relative z-20 w-full sm:max-w-md md:max-w-lg h-full bg-[#FBF8F2] dark:bg-[#062319] border-l border-[#C87A28]/20 dark:border-[#C87A28]/30 shadow-2xl shadow-black/30 dark:shadow-black/95 flex flex-col justify-between text-[#11281E] dark:text-[#F9F6F0] transition-colors duration-300 gpu-accelerate ${
              isRtl ? 'border-r border-l-0' : 'border-l'
            }`}
          >
            {/* Top Header Bar */}
            <div className="p-4 sm:p-5 border-b border-[#C87A28]/20 dark:border-[#C87A28]/30 bg-white dark:bg-[#041912] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f6ecd6] dark:bg-[#C87A28]/20 border border-[#C87A28]/30 dark:border-[#C87A28]/40 flex items-center justify-center text-[#9E5714] dark:text-[#E59A4D]">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-base sm:text-lg font-bold text-[#11281E] dark:text-[#F9F6F0] tracking-wide">
                      {t.cart?.cartHeading || 'B2B Export Inquiry Cart'}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-[#C87A28] text-white text-[10px] sm:text-[11px] font-bold">
                      {totalUniqueItems} {totalUniqueItems === 1 ? 'Item' : 'Items'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5A6D62] dark:text-[#A3B899]">
                    {t.cart?.cartSubtitle || 'Direct Ceylon Port Quotation Desk'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="min-h-[36px] text-[11px] text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 hover:bg-red-100 transition-colors cursor-pointer font-medium"
                  >
                    {t.rfq?.clearAll || 'Clear All'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeCart}
                  className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#11281E] dark:text-[#F9F6F0] hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  aria-label={t.cart?.closeCart || 'Close cart panel'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Items & Form Container */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4"
            >
              {/* Validation Warning Alert */}
              {(validationErrors.items || validationErrors.zeroQuantity) && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/90 border border-red-300 dark:border-red-500/60 text-red-700 dark:text-red-200 text-xs flex items-center gap-2.5 shadow-sm"
                >
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="font-medium">{validationErrors.items || validationErrors.zeroQuantity}</span>
                </motion.div>
              )}

              {items.length === 0 ? (
                <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white dark:bg-black/30 border border-[#C87A28]/20 dark:border-[#C87A28]/30">
                  <div className="w-16 h-16 rounded-full bg-[#f6ecd6] dark:bg-white/5 flex items-center justify-center text-[#9E5714] dark:text-[#E59A4D] mb-3">
                    <Package className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#11281E] dark:text-[#F9F6F0] mb-1">
                    {t.cart?.emptyCartHeading || 'Your Export Cart is Empty'}
                  </h3>
                  <p className="text-xs text-[#5A6D62] dark:text-[#A3B899] max-w-xs mb-4">
                    {t.cart?.emptyCartDesc || 'Browse our Pure Ceylon Cinnamon export catalog and add your target quills, cut, powder, or spice grades.'}
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#C87A28] hover:bg-[#b0671c] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    {t.cart?.browseCatalog || 'Browse Product Grades'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart Items List */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-[#9E5714] dark:text-[#E59A4D] uppercase tracking-wider flex items-center justify-between">
                      <span>{t.rfq?.lineItemsLabel || 'Configured Line Items'} ({items.length})</span>
                      <span className="text-[10px] text-[#5A6D62] dark:text-[#A3B899]">Adjust Qty / Units</span>
                    </div>

                    {items.map((item) => {
                      const isZeroError =
                        Boolean(validationErrors.zeroItemIds?.includes(item.id)) ||
                        (Boolean(validationErrors.zeroQuantity) && item.quantity <= 0);

                      const displayTitle = formatCartItemTitle(item);
                      const unitBadgeLabel = getCartItemUnitBadge(item);
                      const subtext = getCartItemSubtext(item);

                      return (
                        <div
                          key={item.id}
                          className={`p-3.5 rounded-2xl bg-white dark:bg-[#082b20] border shadow-md flex flex-col gap-3 transition-colors ${
                            isZeroError
                              ? 'border-red-400 dark:border-red-500/80 shadow-red-500/10'
                              : 'border-[#C87A28]/20 dark:border-[#C87A28]/30'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-14 h-14 rounded-xl object-cover border border-[#C87A28]/20 dark:border-white/10 shrink-0"
                              />
                              <div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="px-1.5 py-0.5 rounded bg-ceylon-600/90 text-white font-mono text-[9px] font-bold">
                                    {item.gradeCode}
                                  </span>
                                  {item.variantLabel && (
                                    <span className="px-1.5 py-0.5 rounded bg-[#f6ecd6] dark:bg-white/10 text-[#9E5714] dark:text-[#E5A855] font-semibold text-[9px]">
                                      {item.variantLabel}
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-serif text-sm font-bold text-[#11281E] dark:text-[#F9F6F0] mt-0.5">
                                  {displayTitle}
                                </h4>
                                <p className="text-[10px] text-[#5A6D62] dark:text-[#A3B899]">
                                  {subtext}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-100 transition-colors cursor-pointer"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Quantity & Unit Controller with 40px+ Touch Targets */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-[#C87A28]/20 dark:border-white/10">
                            {/* Inline Dynamic Quantity Controller: [-] [Input] [+] */}
                            <div className="flex items-center gap-1.5 bg-white/80 dark:bg-black/40 p-1 rounded-2xl border border-[#C87A28]/20 dark:border-white/10 shadow-sm">
                              <button
                                type="button"
                                onClick={() => {
                                  const step = item.unit === 'Kg' ? (item.quantity > 50 ? 25 : item.quantity > 20 ? 5 : 1) : 1;
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
                                step="1"
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
                                  const step = item.unit === 'Kg' ? (item.quantity >= 50 ? 25 : item.quantity >= 20 ? 5 : 1) : 1;
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

                            {/* Unit Badge */}
                            <div className="flex items-center gap-1.5">
                              <span className="px-3.5 py-1.5 min-h-[40px] rounded-xl text-xs font-bold bg-[#C87A28] text-white shadow-md shadow-[#C87A28]/30 flex items-center justify-center">
                                {unitBadgeLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Customer Information & Shipping Settings */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#082b20] border border-[#C87A28]/20 dark:border-[#C87A28]/30 space-y-3 shadow-md">
                    <div className="text-xs font-bold text-[#9E5714] dark:text-[#E59A4D] uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#9E5714] dark:text-[#E59A4D]" />
                      <span>{t.rfq?.shippingParameters || 'Export Destination & Contact'}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-semibold text-[#5A6D62] dark:text-[#A3B899] mb-1">
                          {t.rfq?.preferredIncoterm || 'Incoterm Trade Basis'}
                        </label>
                        <select
                          value={incoterm}
                          onChange={(e) => setIncoterm(e.target.value as any)}
                          className="w-full min-h-[44px] px-2.5 py-2 rounded-xl bg-[#F4EFE6] dark:bg-black/60 border border-[#C87A28]/20 dark:border-white/15 text-xs text-[#11281E] dark:text-[#F9F6F0] focus:outline-none focus:border-[#C87A28] cursor-pointer"
                        >
                          <option value="FOB Colombo & CIF Destination" className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">FOB Colombo & CIF Destination</option>
                          <option value="FOB Colombo" className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">FOB Port of Colombo</option>
                          <option value="CIF" className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">CIF (Cost, Insurance & Freight)</option>
                          <option value="CFR" className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">CFR (Cost & Freight)</option>
                          <option value="EXW" className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">EXW (Ex-Works Plantation)</option>
                          <option value="DDP" className="bg-white dark:bg-[#062319] text-[#11281E] dark:text-white">DDP (Delivered Duty Paid)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-[#5A6D62] dark:text-[#A3B899] mb-1">
                          {t.rfq?.destinationPortLabel || 'Destination Port / City'}
                        </label>
                        <input
                          type="text"
                          value={destinationPort}
                          onChange={(e) => setDestinationPort(e.target.value)}
                          placeholder={t.rfq?.destinationPlaceholder || 'e.g. Port of Hamburg'}
                          className="w-full min-h-[44px] px-2.5 py-2 rounded-xl bg-[#F4EFE6] dark:bg-black/60 border border-[#C87A28]/20 dark:border-white/15 text-xs text-[#11281E] placeholder:text-[#829288] dark:text-[#F9F6F0] dark:placeholder:text-[#64796E] focus:outline-none focus:border-[#C87A28]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-semibold text-[#5A6D62] dark:text-[#A3B899] mb-1">
                          {t.rfq?.nameLabel || 'Your Name / Company *'}
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
                          placeholder={t.rfq?.namePlaceholder || 'Trade Buyer / Company Name'}
                          className={`w-full min-h-[44px] px-2.5 py-2 rounded-xl bg-[#F4EFE6] dark:bg-black/60 border text-xs text-[#11281E] placeholder:text-[#829288] dark:text-[#F9F6F0] dark:placeholder:text-[#64796E] focus:outline-none ${
                            validationErrors.name
                              ? 'border-red-500 focus:border-red-400'
                              : 'border-[#C87A28]/20 dark:border-white/15 focus:border-[#C87A28]'
                          }`}
                        />
                        {validationErrors.name && (
                          <span className="text-[10px] text-red-500 dark:text-red-400 mt-0.5 block font-medium">
                            {validationErrors.name}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-[#5A6D62] dark:text-[#A3B899] mb-1">
                          {t.rfq?.phoneLabel || 'WhatsApp / Phone *'}
                        </label>
                        <input
                          type="text"
                          value={ordererPhone}
                          onChange={(e) => {
                            setOrdererPhone(e.target.value);
                            if (validationErrors.phone) {
                              setValidationErrors((prev) => ({ ...prev, phone: undefined }));
                            }
                          }}
                          placeholder={t.rfq?.phonePlaceholder || 'e.g. +49 170 1234567'}
                          className={`w-full min-h-[44px] px-2.5 py-2 rounded-xl bg-[#F4EFE6] dark:bg-black/60 border text-xs text-[#11281E] placeholder:text-[#829288] dark:text-[#F9F6F0] dark:placeholder:text-[#64796E] focus:outline-none ${
                            validationErrors.phone
                              ? 'border-red-500 focus:border-red-400'
                              : 'border-[#C87A28]/20 dark:border-white/15 focus:border-[#C87A28]'
                          }`}
                        />
                        {validationErrors.phone && (
                          <span className="text-[10px] text-red-500 dark:text-red-400 mt-0.5 block font-medium">
                            {validationErrors.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-[#5A6D62] dark:text-[#A3B899] mb-1">
                        {t.rfq?.addressLabel || 'Business Address & Country *'}
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
                        placeholder={t.rfq?.addressPlaceholder || 'e.g. Speicherstadt 4, 20457 Hamburg, Germany'}
                        className={`w-full min-h-[44px] px-2.5 py-2 rounded-xl bg-[#F4EFE6] dark:bg-black/60 border text-xs text-[#11281E] placeholder:text-[#829288] dark:text-[#F9F6F0] dark:placeholder:text-[#64796E] focus:outline-none ${
                          validationErrors.address
                            ? 'border-red-500 focus:border-red-400'
                            : 'border-[#C87A28]/20 dark:border-white/15 focus:border-[#C87A28]'
                        }`}
                      />
                      {validationErrors.address && (
                        <span className="text-[10px] text-red-500 dark:text-red-400 mt-0.5 block font-medium">
                          {validationErrors.address}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-[#5A6D62] dark:text-[#A3B899] mb-1">
                        {t.rfq?.customPackagingNotes || 'Packaging / Special Notes'}
                      </label>
                      <input
                        type="text"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder={t.rfq?.notesPlaceholder || 'e.g. 25kg vacuum bags in master cartons, COA required'}
                        className="w-full min-h-[44px] px-2.5 py-2 rounded-xl bg-[#F4EFE6] dark:bg-black/60 border border-[#C87A28]/20 dark:border-white/15 text-xs text-[#11281E] placeholder:text-[#829288] dark:text-[#F9F6F0] dark:placeholder:text-[#64796E] focus:outline-none focus:border-[#C87A28]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Sticky Action Footer with Safe-Area Inset */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-[#C87A28]/20 dark:border-[#C87A28]/30 bg-white dark:bg-[#041912] shrink-0 space-y-3 pb-safe">
                {/* Total Summary Row */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#5A6D62] dark:text-[#A3B899]">{t.rfq?.totalVolume || 'Total B2B Volume'}:</span>
                    <div className="text-sm font-bold text-[#9E5714] dark:text-[#E59A4D] font-mono">
                      {totalEstimatedWeightDisplay}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[#5A6D62] dark:text-[#A3B899]">{t.rfq?.lineItemsLabel || 'Items'}:</span>
                    <div className="text-sm font-bold text-[#11281E] dark:text-[#F9F6F0]">
                      {totalUniqueItems} Line {totalUniqueItems === 1 ? 'Item' : 'Items'}
                    </div>
                  </div>
                </div>

                {/* Primary Action Button: Send Quotation via WhatsApp */}
                <button
                  type="button"
                  onClick={handleRequestQuotation}
                  className="w-full min-h-[50px] inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-xl shadow-[#25D366]/35 active:scale-[0.99] transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                  <span>{t.cart?.requestWhatsApp || 'Send Quotation via WhatsApp'}</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartPanel;
