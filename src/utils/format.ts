import { FrameSize, FrameColor } from '../types';

export const WHATSAPP_NUMBER = '923132017397';
export const WHATSAPP_DISPLAY = '0313-2017397';
export const WHATSAPP_PHONE_INTL = '+92 313 2017397';

export function formatPKR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

export function getSizePriceModifier(size: FrameSize): number {
  switch (size) {
    case '8 × 10':
      return -500;
    case '12 × 16':
      return 0;
    case '16 × 20':
      return 600;
    case '18 × 24':
      return 1200;
    case '24 × 36':
      return 2200;
    default:
      return 0;
  }
}

export function getCustomFrameBasePrice(size: FrameSize, style: string): number {
  let base = 2799;
  switch (size) {
    case '8 × 10':
      base = 2299;
      break;
    case '12 × 16':
      base = 2899;
      break;
    case '16 × 20':
      base = 3599;
      break;
    case '18 × 24':
      base = 4499;
      break;
    case '24 × 36':
      base = 5999;
      break;
  }

  if (style === 'Luxury') base += 800;
  if (style === 'Classic') base += 300;
  return base;
}

export function generateWhatsAppOrderUrl(params: {
  productName: string;
  size: FrameSize;
  color: FrameColor;
  quantity: number;
  totalPrice: number;
}): string {
  const text = `Salam DESIGN FRAME!\n\nI want to place an order for:\n• *Product:* ${params.productName}\n• *Frame Size:* ${params.size}\n• *Frame Color:* ${params.color}\n• *Quantity:* ${params.quantity}\n• *Total Price:* ${formatPKR(params.totalPrice)}\n\nPlease let me know the delivery timeframe and confirm my Cash on Delivery details. Thank you!`;
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function generateGeneralWhatsAppUrl(): string {
  const text = `Salam DESIGN FRAME! I have an inquiry about your custom wall frames and collections. Can you assist me?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
