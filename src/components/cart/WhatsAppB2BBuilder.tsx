import { CartItem } from '../../context/CartContext';
import { formatWhatsAppItemLine, getOilTotalMl } from '../../utils/cartFormatting';

export const TRADE_PHONE = '94765335308';

export interface B2BQuotationParams {
  items: CartItem[];
  ordererName?: string;
  ordererAddress?: string;
  ordererPhone?: string;
  destinationPort?: string;
  incoterm?: string;
  notes?: string;
}

/**
 * Builds an official multi-item B2B RFQ message structured for WhatsApp Trade Desk (+94 76 533 5308).
 * Only items with quantity > 0 are included.
 */
export function buildMultiItemWhatsAppMessage({
  items,
  ordererName = '',
  ordererAddress = '',
  ordererPhone = '',
  destinationPort = '',
  incoterm = '',
  notes = '',
}: B2BQuotationParams): string {
  const timestamp = new Date().toISOString().split('T')[0];

  // Only include items with valid quantity > 0
  const validItems = (items || []).filter((item) => item.quantity > 0);

  // Build structured Selected Products list using exact classifications
  const formattedProductLines: string[] = validItems.map((item, idx) =>
    formatWhatsAppItemLine(item, idx + 1)
  );

  // Compute Total volume summary
  let totalKg = 0;
  let totalBottles = 0;
  let totalOilMl = 0;
  let totalPacks = 0;
  let totalLiters = 0;

  validItems.forEach((item) => {
    if (item.unit === 'Kg') {
      totalKg += item.quantity;
    } else if (item.unit === 'Bottles') {
      totalBottles += item.quantity;
      totalOilMl += getOilTotalMl(item);
    } else if (item.unit === 'Packs') {
      if (item.productId === 'cinnamon-powder-1kg' || item.productId === 'cinnamon-cut-pieces-1kg') {
        totalKg += item.quantity;
        totalPacks += item.quantity;
      } else {
        totalPacks += item.quantity;
      }
    } else if (item.unit === 'L') {
      totalLiters += item.quantity;
    }
  });

  const volParts: string[] = [];
  if (totalKg > 0) {
    volParts.push(`${totalKg.toLocaleString()} Kg`);
  }
  if (totalBottles > 0) {
    const mlStr =
      totalOilMl >= 1000
        ? `${(totalOilMl / 1000).toFixed(2).replace(/\.00$/, '')} L`
        : `${totalOilMl.toLocaleString()} ml`;
    volParts.push(`${totalBottles.toLocaleString()} Bottles (${mlStr})`);
  }
  if (totalPacks > 0 && totalKg === 0) {
    volParts.push(`${totalPacks.toLocaleString()} Packs`);
  } else if (totalPacks > 0 && totalKg > 0) {
    const giftPacks = validItems
      .filter((i) => i.unit === 'Packs' && i.productId !== 'cinnamon-powder-1kg' && i.productId !== 'cinnamon-cut-pieces-1kg')
      .reduce((a, b) => a + b.quantity, 0);
    if (giftPacks > 0) {
      volParts.push(`${giftPacks.toLocaleString()} Gift Packs`);
    }
  }
  if (totalLiters > 0) {
    volParts.push(`${totalLiters.toLocaleString()} L`);
  }
  const totalSummaryStr = volParts.join(' + ') || '0 Items';

  let clientInfoBlock = '';
  if (ordererName || ordererAddress || ordererPhone) {
    clientInfoBlock = `*Client / Representative Information:*
${ordererName ? `- *Name:* ${ordererName}\n` : ''}${
      ordererAddress ? `- *Company / Address:* ${ordererAddress}\n` : ''
    }${ordererPhone ? `- *Contact Phone:* ${ordererPhone}\n` : ''}\n`;
  }

  return `*B2B EXPORT QUOTATION REQUEST*
----------------------------------------
*Company Target:* Jade Cinnamon Lanka Export Desk
*Date:* ${timestamp}

${clientInfoBlock}*Selected Products:*
${formattedProductLines.length > 0 ? formattedProductLines.join('\n') : '• None specified'}

*Commercial & Shipping Parameters:*
- *Total Volume / Quantity Summary:* ${totalSummaryStr}
- *Preferred Incoterm:* ${incoterm || 'FOB Colombo & CIF Destination'}
- *Destination Port / Country:* ${destinationPort || 'Port of Hamburg, Germany'}
- *Packaging & Lab Requirements:* ${notes || 'Standard export packaging with Batch GC-MS / COA'}

----------------------------------------
*Origin Guarantee:* 100% Pure Ceylon Cinnamon (Cinnamomum verum) • SLS 81 / SLS 187 / ISO Certified • Single-Estate Sri Lanka Provenance
Please quote official FOB/CIF spot rates and container scheduling.`;
}

/**
 * Generates the encoded WhatsApp direct URL.
 */
export function generateWhatsAppUrl(params: B2BQuotationParams): string {
  const message = buildMultiItemWhatsAppMessage(params);
  return `https://wa.me/${TRADE_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp Trade Desk in a new tab.
 */
export function openWhatsAppQuotation(params: B2BQuotationParams): void {
  const url = generateWhatsAppUrl(params);
  window.open(url, '_blank', 'noopener,noreferrer');
}
