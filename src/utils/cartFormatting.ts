import { CartItem } from '../context/CartContext';

/**
 * Extracts normalized bottle size string (e.g. "15ml", "30ml", "50ml", "100ml")
 */
export function getOilSize(item: CartItem): string {
  if (item.variantId) {
    return item.variantId.endsWith('ml') ? item.variantId : `${item.variantId}ml`;
  }
  if (item.variantLabel) {
    const match = item.variantLabel.match(/\d+ml/i);
    if (match) return match[0];
  }
  return '15ml';
}

/**
 * Calculates total volume in ml for a leaf oil bottle item.
 */
export function getOilTotalMl(item: CartItem): number {
  const size = getOilSize(item);
  const sizeNum = parseInt(size.replace('ml', ''), 10) || 15;
  return sizeNum * (item.quantity || 0);
}

/**
 * Returns formatted total volume string for oil (e.g. "500 ml" or "2.5 L (2,500 ml)").
 */
export function getOilTotalMlDisplay(item: CartItem): string {
  const totalMl = getOilTotalMl(item);
  if (totalMl >= 1000) {
    const liters = (totalMl / 1000).toFixed(2).replace(/\.00$/, '');
    return `${liters} L (${totalMl.toLocaleString()} ml)`;
  }
  return `${totalMl.toLocaleString()} ml`;
}

/**
 * Returns the exact line item display title as specified:
 * 1. Ceylon Cinnamon Quill Cuts — [Qty] Kg
 * 2. Pure Ceylon Cinnamon Leaf Oil ([Size]ml) — [Qty] Bottles ([Total] ml)
 * 3. Jade Cinnamon Luxury Leaf Oil Gift Set — [Qty] Packs (4 bottles/pack)
 * 4. Ceylon Cinnamon Quills — [Qty] Kg
 * 5. Ceylon Cinnamon Powder — [Qty] × 1Kg Packs
 * 6. Ceylon Cinnamon Cut Pieces — [Qty] × 1Kg Packs
 */
export function formatCartItemTitle(item: CartItem): string {
  const qtyStr = item.quantity.toLocaleString();

  if (item.productId === 'cinnamon-quill-cuts') {
    return `Ceylon Cinnamon Quill Cuts — ${qtyStr} Kg`;
  }

  if (item.productId === 'leaf-oil-bottle') {
    const size = getOilSize(item);
    const totalMl = getOilTotalMl(item);
    return `Pure Ceylon Cinnamon Leaf Oil (${size}) — ${qtyStr} Bottles (${totalMl.toLocaleString()} ml)`;
  }

  if (item.productId === 'leaf-oil-box-set') {
    return `Jade Cinnamon Luxury Leaf Oil Gift Set — ${qtyStr} Packs (4 bottles/pack)`;
  }

  if (item.productId === 'cinnamon-quills') {
    return `Ceylon Cinnamon Quills — ${qtyStr} Kg`;
  }

  if (item.productId === 'cinnamon-powder-1kg') {
    return `Ceylon Cinnamon Powder — ${qtyStr} × 1Kg Packs`;
  }

  if (item.productId === 'cinnamon-cut-pieces-1kg') {
    return `Ceylon Cinnamon Cut Pieces — ${qtyStr} × 1Kg Packs`;
  }

  return `${item.name} — ${qtyStr} ${item.unit}`;
}

/**
 * Returns clean base name for card header/item title
 */
export function getCartItemBaseName(item: CartItem): string {
  if (item.productId === 'cinnamon-quill-cuts') {
    return 'Ceylon Cinnamon Quill Cuts';
  }
  if (item.productId === 'leaf-oil-bottle') {
    const size = getOilSize(item);
    return `Pure Ceylon Cinnamon Leaf Oil (${size})`;
  }
  if (item.productId === 'leaf-oil-box-set') {
    return 'Jade Cinnamon Luxury Leaf Oil Gift Set';
  }
  if (item.productId === 'cinnamon-quills') {
    return 'Ceylon Cinnamon Quills';
  }
  if (item.productId === 'cinnamon-powder-1kg') {
    return 'Ceylon Cinnamon Powder';
  }
  if (item.productId === 'cinnamon-cut-pieces-1kg') {
    return 'Ceylon Cinnamon Cut Pieces';
  }
  return item.name;
}

/**
 * Returns unit badge label for the quantity controls row
 */
export function getCartItemUnitBadge(item: CartItem): string {
  if (item.productId === 'cinnamon-quill-cuts' || item.productId === 'cinnamon-quills') {
    return 'Kg';
  }
  if (item.productId === 'leaf-oil-bottle') {
    const size = getOilSize(item);
    return `${size} Bottles`;
  }
  if (item.productId === 'cinnamon-powder-1kg' || item.productId === 'cinnamon-cut-pieces-1kg') {
    return '1Kg Packs';
  }
  if (item.productId === 'leaf-oil-box-set') {
    return 'Packs';
  }
  return item.unit;
}

/**
 * Returns dynamic subtext calculation for inline items
 */
export function getCartItemSubtext(item: CartItem): string {
  if (item.productId === 'cinnamon-quill-cuts' || item.productId === 'cinnamon-quills') {
    return `Bulk Weight: ${item.quantity.toLocaleString()} Kg`;
  }
  if (item.productId === 'leaf-oil-bottle') {
    const size = getOilSize(item);
    const totalMl = getOilTotalMl(item);
    return `${size} × ${item.quantity.toLocaleString()} bottles = ${totalMl.toLocaleString()} ml`;
  }
  if (item.productId === 'cinnamon-powder-1kg' || item.productId === 'cinnamon-cut-pieces-1kg') {
    return `${item.quantity.toLocaleString()} × 1Kg Packs = ${item.quantity.toLocaleString()} Kg`;
  }
  if (item.productId === 'leaf-oil-box-set') {
    return `${item.quantity.toLocaleString()} Packs (4 bottles/pack)`;
  }
  return `${item.quantity.toLocaleString()} ${item.unit}`;
}

/**
 * Formats a single item for compiled WhatsApp message
 */
export function formatWhatsAppItemLine(item: CartItem, index: number): string {
  const qtyStr = item.quantity.toLocaleString();

  if (item.productId === 'cinnamon-quill-cuts') {
    return `${index}. Ceylon Cinnamon Quill Cuts: ${qtyStr} Kg`;
  }
  if (item.productId === 'leaf-oil-bottle') {
    const size = getOilSize(item);
    const totalMl = getOilTotalMl(item);
    return `${index}. Pure Ceylon Cinnamon Leaf Oil (${size}): ${qtyStr} Bottles (${totalMl.toLocaleString()} ml)`;
  }
  if (item.productId === 'leaf-oil-box-set') {
    return `${index}. Jade Cinnamon Luxury Leaf Oil Gift Set: ${qtyStr} Packs (4 bottles/pack)`;
  }
  if (item.productId === 'cinnamon-quills') {
    return `${index}. Ceylon Cinnamon Quills: ${qtyStr} Kg`;
  }
  if (item.productId === 'cinnamon-powder-1kg') {
    return `${index}. Ceylon Cinnamon Powder: ${qtyStr} × 1Kg Packs`;
  }
  if (item.productId === 'cinnamon-cut-pieces-1kg') {
    return `${index}. Ceylon Cinnamon Cut Pieces: ${qtyStr} × 1Kg Packs`;
  }
  return `${index}. ${item.name}: ${qtyStr} ${item.unit}`;
}
