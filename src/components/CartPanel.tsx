import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Copy,
  Check,
  Package,
  Globe,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useCart } from '../context/CartContext';
import {
  buildMultiItemWhatsAppMessage,
  openWhatsAppQuotation,
} from './cart/WhatsAppB2BBuilder';

interface CartPanelProps {
  isRtl?: boolean;
}

export const CartPanel: React.FC<CartPanelProps> = ({ isRtl = false }) => {
  const {
    items,
    isCartOpen,
    closeCart,
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

  const [copied, setCopied] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleCopyMessage = () => {
    const text = buildMultiItemWhatsAppMessage({
      items,
      ordererName,
      ordererAddress,
      ordererPhone,
      destinationPort,
      incoterm,
      notes: orderNotes,
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRequestQuotation = () => {
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
            className={`relative z-20 w-full sm:max-w-md md:max-w-lg h-full bg-[#FBF8F2] dark:bg-[#062319] border-l border-[#E5D8C5] dark:border-[#C87A28]/40 shadow-2xl shadow-black/30 dark:shadow-black/95 flex flex-col justify-between text-[#11281E] dark:text-white transition-colors duration-300 gpu-accelerate ${
              isRtl ? 'border-r border-l-0' : 'border-l'
            }`}
          >
            {/* Top Header Bar */}
            <div className="p-4 sm:p-5 border-b border-[#E5D8C5] dark:border-[#C87A28]/25 bg-white dark:bg-[#041912] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f6ecd6] dark:bg-[#C87A28]/20 border border-[#C87A28]/30 dark:border-[#C87A28]/40 flex items-center justify-center text-[#B86B1E] dark:text-amber-300">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-base sm:text-lg font-bold text-[#11281E] dark:text-white tracking-wide">
                      B2B Export Inquiry Cart
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-[#C87A28] text-white text-[10px] sm:text-[11px] font-bold">
                      {totalUniqueItems} {totalUniqueItems === 1 ? 'Item' : 'Items'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#536B5C] dark:text-gray-300">
                    Direct Ceylon Port Quotation Desk
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="min-h-[36px] text-[11px] text-red-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-300 px-2 py-1 rounded bg-red-50 dark:bg-white/5 hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeCart}
                  className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#11281E] dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Close cart panel"
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
              {items.length === 0 ? (
                <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white dark:bg-black/30 border border-[#E5D8C5] dark:border-white/10">
                  <div className="w-16 h-16 rounded-full bg-[#f6ecd6] dark:bg-white/5 flex items-center justify-center text-[#B86B1E] dark:text-gray-400 mb-3">
                    <Package className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#11281E] dark:text-white mb-1">
                    Your Export Cart is Empty
                  </h3>
                  <p className="text-xs text-[#536B5C] dark:text-gray-300 max-w-xs mb-4">
                    Browse our Pure Ceylon Cinnamon export catalog and add your target quills, cut, powder, or spice grades.
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#C87A28] hover:bg-[#b0671c] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Browse Product Grades
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart Items List */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-[#B86B1E] dark:text-amber-200/90 uppercase tracking-wider flex items-center justify-between">
                      <span>Configured Line Items ({items.length})</span>
                      <span className="text-[10px] text-[#536B5C] dark:text-gray-400">Adjust Qty / Units</span>
                    </div>

                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-white dark:bg-[#082b20] border border-[#E5D8C5] dark:border-ceylon-500/25 shadow-md flex flex-col gap-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-14 h-14 rounded-xl object-cover border border-[#E5D8C5] dark:border-white/10 shrink-0"
                            />
                            <div>
                              <span className="px-1.5 py-0.5 rounded bg-ceylon-600/90 text-white font-mono text-[9px] font-bold">
                                {item.gradeCode}
                              </span>
                              <h4 className="font-serif text-sm font-bold text-[#11281E] dark:text-white line-clamp-1 mt-0.5">
                                {item.name}
                              </h4>
                              <p className="text-[10px] text-[#536B5C] dark:text-gray-300">
                                {item.categoryLabel}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-red-50 dark:bg-white/5 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity & Unit Controller */}
                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E5D8C5] dark:border-white/10">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(
                                    10,
                                    item.quantity - (item.unit === 'MT' ? 1 : item.unit === 'L' ? 10 : 50)
                                  )
                                )
                              }
                              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-black/40 border border-[#E5D8C5] dark:border-white/10 text-[#11281E] dark:text-gray-200 hover:bg-[#ebd7ad] dark:hover:bg-white/10"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>

                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(item.id, Number(e.target.value) || 1)
                              }
                              className="w-16 sm:w-20 text-center py-1.5 min-h-[36px] rounded-lg bg-[#F4EFE6] dark:bg-black/60 border border-[#E5D8C5] dark:border-white/15 text-xs font-bold text-[#B86B1E] dark:text-amber-300 font-mono focus:outline-none"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + (item.unit === 'MT' ? 1 : item.unit === 'L' ? 10 : 50)
                                )
                              }
                              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-[#F4EFE6] dark:bg-black/40 border border-[#E5D8C5] dark:border-white/10 text-[#11281E] dark:text-gray-200 hover:bg-[#ebd7ad] dark:hover:bg-white/10"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Unit Selector */}
                          <div className="flex items-center gap-1">
                            {(['Kg', 'MT', 'L', 'Bales'] as const).map((unitOption) => (
                              <button
                                key={unitOption}
                                type="button"
                                onClick={() => updateUnit(item.id, unitOption)}
                                className={`px-2 py-1 min-h-[36px] rounded-md text-[10px] font-bold uppercase transition-all ${
                                  item.unit === unitOption
                                    ? 'bg-[#C87A28] text-white shadow-sm'
                                    : 'bg-[#F4EFE6] dark:bg-black/40 text-[#536B5C] dark:text-gray-400 hover:text-black dark:hover:text-white'
                                }`}
                              >
                                {unitOption}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer Information & Shipping Settings */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#082b20] border border-[#E5D8C5] dark:border-ceylon-500/25 space-y-3 shadow-md">
                    <div className="text-xs font-bold text-[#B86B1E] dark:text-amber-200/90 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#B86B1E] dark:text-amber-300" />
                      <span>Export Destination & Contact</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-semibold text-[#536B5C] dark:text-gray-400 mb-1">
                          Incoterm Trade Basis
                        </label>
                        <select
                          value={incoterm}
                          onChange={(e) => setIncoterm(e.target.value as any)}
                          className="w-full min-h-[44px] px-2.5 py-2 rounded-xl bg-[#F4EFE6] dark:bg-black/60 border border-[#E5D8C5] dark:border-white/15 text-xs text-[#11281E] dark:text-white focus:outline-none focus:border-[#C87A28]"
                        >
                          <option value="FOB Colombo">FOB Port of Colombo</option>
                          <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                          <option value="CFR">CFR (Cost & Freight)</option>
                          <option value="EXW">EXW (Ex-Works Plantation)</option>
                          <option value="DDP">DDP (Delivered Duty Paid)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-[#536B5C] dark:text-gray-400 mb-1">
                          Destination Port / City
                        </label>
                        <input
                          type="text"
                          value={destinationPort}
                          onChange={(e) => setDestinationPort(e.target.value)}
                          placeholder="e.g. Rotterdam, Hamburg, Jebel Ali"
                          className="w-full min-h-[44px] px-2.5 py-2 rounded-xl bg-[#F4EFE6] dark:bg-black/60 border border-[#E5D8C5] dark:border-white/15 text-xs text-[#11281E] dark:text-white focus:outline-none focus:border-[#C87A28]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-semibold text-[#536B5C] dark:text-gray-400 mb-1">
                          Full Name / Company
                        </label>
                        <input
                          type="text"
                          value={ordererName}
                          onChange={(e) => setOrdererName(e.target.value)}
                          placeholder="e.g. Hans Mueller / Spice Trade AG"
                          className="w-full min-h-[44px] px-2.5 py-2 rounded-xl bg-[#F4EFE6] dark:bg-black/60 border border-[#E5D8C5] dark:border-white/15 text-xs text-[#11281E] dark:text-white focus:outline-none focus:border-[#C87A28]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-[#536B5C] dark:text-gray-400 mb-1">
                          WhatsApp / Phone
                        </label>
                        <input
                          type="text"
                          value={ordererPhone}
                          onChange={(e) => setOrdererPhone(e.target.value)}
                          placeholder="e.g. +49 170 1234567"
                          className="w-full min-h-[44px] px-2.5 py-2 rounded-xl bg-[#F4EFE6] dark:bg-black/60 border border-[#E5D8C5] dark:border-white/15 text-xs text-[#11281E] dark:text-white focus:outline-none focus:border-[#C87A28]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-[#536B5C] dark:text-gray-400 mb-1">
                        Business Address & Country
                      </label>
                      <input
                        type="text"
                        value={ordererAddress}
                        onChange={(e) => setOrdererAddress(e.target.value)}
                        placeholder="e.g. Speicherstadt 4, 20457 Hamburg, Germany"
                        className="w-full min-h-[44px] px-2.5 py-2 rounded-xl bg-[#F4EFE6] dark:bg-black/60 border border-[#E5D8C5] dark:border-white/15 text-xs text-[#11281E] dark:text-white focus:outline-none focus:border-[#C87A28]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-[#536B5C] dark:text-gray-400 mb-1">
                        Packaging / Special Notes
                      </label>
                      <input
                        type="text"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="e.g. 25kg vacuum bags in master cartons, COA required"
                        className="w-full min-h-[44px] px-2.5 py-2 rounded-xl bg-[#F4EFE6] dark:bg-black/60 border border-[#E5D8C5] dark:border-white/15 text-xs text-[#11281E] dark:text-white focus:outline-none focus:border-[#C87A28]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Sticky Action Footer with Safe-Area Inset */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-[#E5D8C5] dark:border-[#C87A28]/30 bg-white dark:bg-[#041912] shrink-0 space-y-3 pb-safe">
                {/* Total Summary Row */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#536B5C] dark:text-gray-400">Total B2B Volume:</span>
                    <div className="text-sm font-bold text-[#B86B1E] dark:text-amber-300 font-mono">
                      {totalEstimatedWeightDisplay}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[#536B5C] dark:text-gray-400">Items:</span>
                    <div className="text-sm font-bold text-[#11281E] dark:text-white">
                      {totalUniqueItems} Line {totalUniqueItems === 1 ? 'Item' : 'Items'}
                    </div>
                  </div>
                </div>

                {/* Primary Action Button: Request WhatsApp Quotation */}
                <button
                  type="button"
                  onClick={handleRequestQuotation}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-xl shadow-[#25D366]/35 active:scale-[0.99] transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                  <span>Request WhatsApp B2B Quotation</span>
                </button>

                {/* Secondary Actions */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="flex-1 min-h-[40px] inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#F4EFE6] dark:bg-white/5 hover:bg-[#ebd7ad] dark:hover:bg-white/10 border border-[#E5D8C5] dark:border-white/10 text-xs font-semibold text-[#11281E] dark:text-gray-300 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-700 dark:text-emerald-400">Quotation Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#B86B1E] dark:text-ceylon-400" />
                        <span>Copy Inquiry Text</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPreviewModal(!showPreviewModal)}
                    className="min-h-[40px] px-3 py-2 rounded-lg bg-[#F4EFE6] dark:bg-white/5 hover:bg-[#ebd7ad] dark:hover:bg-white/10 border border-[#E5D8C5] dark:border-white/10 text-xs font-semibold text-[#11281E] dark:text-gray-300 transition-colors cursor-pointer"
                  >
                    {showPreviewModal ? 'Hide Preview' : 'View RFQ Text'}
                  </button>
                </div>

                {/* Expandable Preview */}
                {showPreviewModal && (
                  <motion.div
                    data-lenis-prevent
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 rounded-xl bg-[#062319] border border-ceylon-500/35 text-[11px] font-mono text-gray-200 whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed shadow-inner"
                  >
                    {buildMultiItemWhatsAppMessage({
                      items,
                      destinationPort,
                      incoterm,
                      notes: orderNotes,
                    })}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartPanel;
