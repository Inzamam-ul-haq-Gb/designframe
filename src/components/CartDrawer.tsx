import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatPKR } from '../utils/format';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shipping = subtotal >= 3500 || items.length === 0 ? 0 : 250;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const clean = promoCode.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Welcome Discount Applied!');
    } else if (clean === 'ART30') {
      setDiscountPercent(30);
      setPromoSuccess('30% Special Promotion Applied!');
    } else if (clean === 'FRAME5') {
      setDiscountPercent(5);
      setPromoSuccess('5% Discount Applied!');
    } else {
      setPromoError('Invalid coupon code. Try WELCOME10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col justify-between z-10">
        
        {/* Cart Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5E5E5] bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B08D57]" />
            <h2 className="text-base font-bold uppercase tracking-widest text-[#111111] font-heading">
              Shopping Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-[#F7F5F1] p-3 px-5 border-b border-[#EDE7DE] text-xs">
          {subtotal >= 3500 ? (
            <p className="text-emerald-700 font-semibold flex items-center gap-1.5">
              <span>🎉</span> You qualify for Free Shipping anywhere in Pakistan!
            </p>
          ) : (
            <div>
              <p className="text-neutral-700 mb-1">
                Add <span className="font-bold text-[#111111]">{formatPKR(3500 - subtotal)}</span> more to unlock <span className="font-semibold text-[#B08D57]">FREE Delivery</span>
              </p>
              <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#B08D57] h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / 3500) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-[#F7F5F1] rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <ShoppingBag className="w-8 h-8 stroke-1" />
              </div>
              <h3 className="text-base font-bold text-[#111111] uppercase font-heading">Your Cart is Empty</h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Looks like you haven&apos;t added any bespoke frames to your cart yet.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-[#D4B77A] text-xs font-bold uppercase tracking-wider hover:bg-[#B08D57] hover:text-white transition-colors cursor-pointer"
              >
                <span>EXPLORE ARTWORK</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-3 pb-4 border-b border-[#F7F5F1] group"
              >
                {/* Image */}
                <div className="w-20 h-24 bg-[#F7F5F1] rounded-xs overflow-hidden shrink-0 border border-[#E5E5E5] relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.isCustom && (
                    <span className="absolute bottom-0 inset-x-0 bg-[#B08D57] text-white text-[8px] font-bold text-center uppercase tracking-tighter">
                      Custom
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-[#111111] font-heading line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-400 hover:text-red-500 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-neutral-500 space-y-0.5 mt-1">
                      <p>Size: <span className="font-medium text-neutral-800">{item.size}</span></p>
                      <p>Color: <span className="font-medium text-neutral-800">{item.color}</span></p>
                      {item.style && <p>Style: <span className="font-medium text-neutral-800">{item.style}</span></p>}
                    </div>
                  </div>

                  {/* Price & Quantity Adjust */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#E5E5E5] rounded-xs text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-neutral-600 hover:text-black font-semibold"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-neutral-600 hover:text-black font-semibold"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[#111111]">
                      {formatPKR(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer / Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E5E5E5] bg-[#F7F5F1] space-y-4">
            
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Discount code (e.g. WELCOME10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-white border border-[#E5E5E5] rounded-xs pl-8 pr-2 py-1.5 text-xs uppercase text-neutral-800 placeholder:normal-case placeholder:text-neutral-400 focus:outline-none focus:border-[#B08D57]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
              >
                Apply
              </button>
            </form>

            {promoSuccess && (
              <p className="text-[11px] text-emerald-700 font-medium">{promoSuccess}</p>
            )}
            {promoError && (
              <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
            )}

            {/* Financial Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600 border-t border-[#EDE7DE] pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">{formatPKR(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount ({discountPercent}%)</span>
                  <span>- {formatPKR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="font-semibold text-neutral-900">
                  {shipping === 0 ? 'FREE' : formatPKR(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-[#EDE7DE]">
                <span>Total (PKR)</span>
                <span className="text-base text-[#111111]">{formatPKR(total)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                id="cart-checkout-btn"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-[#111111] hover:bg-[#B08D57] text-white py-3.5 px-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4 text-[#D4B77A]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="w-full bg-white hover:bg-neutral-100 text-neutral-800 border border-[#E5E5E5] py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                CONTINUE SHOPPING
              </button>
            </div>

            <p className="text-[10px] text-center text-neutral-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Cash on Delivery & Secure packaging guaranteed
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
