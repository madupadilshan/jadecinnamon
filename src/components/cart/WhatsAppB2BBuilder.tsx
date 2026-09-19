import { CartItem } from '../../context/CartContext';

export const TRADE_PHONE = '94785218364';

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
 * Builds an official multi-item B2B RFQ message structured for WhatsApp Trade Desk.
 */
export function buildMultiItemWhatsAppMessage({
  items,
  ordererName = '',
  ordererAddress = '',
  ordererPhone = '',
  destinationPort = 'Port of Hamburg, Germany',
  incoterm = 'FOB Colombo & CIF Destination',
  notes = 'Require 25kg vacuum packs, private labeling, specific moisture level < 12%',
}: B2BQuotationParams): string {
  const timestamp = new Date().toISOString().split('T')[0];

  const itemList = items
    .map((item, index) => {
      const unitDisplay = item.unit || 'Kg';
      const gradeStr = item.gradeCode ? ` [Grade: ${item.gradeCode}]` : '';
      return `  ${index + 1}. *${item.name}* (${item.quantity.toLocaleString()} ${unitDisplay})${gradeStr}`;
    })
    .join('\n');

  // Compute Total volume summary
  let totalKg = 0;
  let totalLiters = 0;
  items.forEach((item) => {
    if (item.unit === 'MT') {
      totalKg += item.quantity * 1000;
    } else if (item.unit === 'L') {
      totalLiters += item.quantity;
    } else {
      totalKg += item.quantity;
    }
  });

  const volParts: string[] = [];
  if (totalKg >= 1000) {
    volParts.push(`${(totalKg / 1000).toFixed(2)} MT (~${totalKg.toLocaleString()} Kg)`);
  } else if (totalKg > 0) {
    volParts.push(`${totalKg.toLocaleString()} Kg`);
  }
  if (totalLiters > 0) {
    volParts.push(`${totalLiters.toLocaleString()} Liters`);
  }
  const totalVolumeStr = volParts.join(' + ') || '500 Kg';

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

${clientInfoBlock}*Requested Products (${items.length} ${items.length === 1 ? 'Item' : 'Items'}):*
${itemList || '  1. *Ceylon Cinnamon Alba* (500 Kg) [Grade: ALBA]'}

*Commercial & Shipping Parameters:*
- *Estimated Total Volume:* ${totalVolumeStr}
- *Preferred Incoterm:* ${incoterm || 'FOB Colombo & CIF Destination'}
- *Destination Port:* ${destinationPort || 'Port of Hamburg, Germany'}
- *Packaging / Lab Specifications:* ${notes || 'Standard Export Vacuum Bales with COA'}

----------------------------------------
*Origin Guarantee:* 100% Pure Ceylon Origin • SLS 81:2000 / ISO 6539 Certified
Please quote official FOB/CIF spot rates and dispatch container scheduling.`;
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
