import React, { useState } from 'react';
import { Product, FrameSize, FrameColor, CartItem } from '../types';
import { formatPKR, getSizePriceModifier, generateWhatsAppOrderUrl } from '../utils/format';
import { X, Star, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onViewFullDetails: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onViewFullDetails,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<FrameSize>(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<FrameColor>(product.colors[0]);

  const priceModifier = getSizePriceModifier(selectedSize);
  const currentSalePrice = Math.max(1500, product.salePrice + priceModifier);

  const handleAdd = () => {
    const item: CartItem = {
      id: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      price: currentSalePrice,
      quantity: 1,
    };
    onAddToCart(item);
    onClose();
  };

  const handleWhatsApp = () => {
    const url = generateWhatsAppOrderUrl({
      productName: product.name,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      totalPrice: currentSalePrice,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-xs shadow-2xl overflow-hidden border border-[#E5E5E5] my-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-[#111111] text-neutral-800 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-4/5 bg-[#F7F5F1] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2.5 left-2.5 bg-[#111111] text-[#D4B77A] text-[10px] font-bold px-2 py-0.5 uppercase">
              {product.discount}% OFF
            </span>
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] text-[#B08D57] font-semibold uppercase tracking-widest block mb-1">
                {product.category}
              </span>
              <h3 className="text-lg font-bold text-[#111111] font-heading mb-1">
                {product.name}
              </h3>

              <div className="flex items-center gap-1 text-xs mb-3">
                <Star className="w-3.5 h-3.5 fill-[#D4B77A] text-[#D4B77A]" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-neutral-400">({product.reviewsCount} reviews)</span>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xl font-extrabold text-[#111111]">
                  {formatPKR(currentSalePrice)}
                </span>
                <span className="text-xs text-neutral-400 line-through">
                  {formatPKR(product.price + priceModifier)}
                </span>
              </div>

              {/* Sizes */}
              <div className="mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block mb-1.5">
                  Size: {selectedSize}
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {product.sizes.slice(0, 3).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-1.5 text-xs rounded-xs border transition-all ${
                        selectedSize === s
                          ? 'bg-[#111111] text-[#D4B77A] border-[#111111] font-bold'
                          : 'border-[#E5E5E5] text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block mb-1.5">
                  Moulding: {selectedColor}
                </span>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-2 py-1 text-xs rounded-xs border transition-all ${
                        selectedColor === c
                          ? 'border-[#B08D57] font-bold'
                          : 'border-[#E5E5E5] text-neutral-600'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-[#F7F5F1]">
              <div className="grid grid-cols-5 gap-2">
                <button
                  onClick={handleAdd}
                  className="col-span-4 bg-[#111111] hover:bg-[#B08D57] text-white py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4B77A]" />
                  <span>ADD TO CART</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="col-span-1 bg-[#25D366] text-white flex items-center justify-center hover:bg-[#1eb857] transition-colors"
                  title="WhatsApp Order"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onViewFullDetails(product);
                }}
                className="w-full text-center text-xs text-neutral-600 hover:text-[#B08D57] py-1 font-medium flex items-center justify-center gap-1"
              >
                <span>View Full Specifications & Room Photos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
