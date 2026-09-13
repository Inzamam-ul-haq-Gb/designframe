import React, { useState } from 'react';
import { Product } from '../types';
import { formatPKR, generateWhatsAppOrderUrl } from '../utils/format';
import { Heart, Eye, ShoppingBag, Star, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateWhatsAppOrderUrl({
      productName: product.name,
      size: product.sizes[1] || product.sizes[0],
      color: product.colors[0],
      quantity: 1,
      totalPrice: product.salePrice,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="group relative bg-white flex flex-col justify-between transition-all duration-300 border border-[#E5E5E5] hover:border-[#D4B77A] hover:shadow-lg rounded-xs"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <div 
        className="relative w-full aspect-4/5 overflow-hidden bg-[#F7F5F1] cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-[#111111] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 tracking-wider uppercase">
            {product.discount}% OFF
          </div>
        )}

        {/* Best Seller or New Tag */}
        {product.isBestSeller && (
          <div className="absolute top-2.5 right-2.5 z-10 bg-[#B08D57] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase">
            Best Seller
          </div>
        )}

        {/* Wishlist Heart Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-10 sm:top-11 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isWishlisted 
              ? 'bg-[#111111] text-[#D4B77A] opacity-100 shadow-md' 
              : 'bg-white/90 text-neutral-600 hover:text-red-500 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-sm hover:scale-110'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Main vs Room Image Switch on Hover */}
        <img
          src={isHovered && product.roomImage ? product.roomImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Floating Quick View overlay button */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-[#111111] hover:text-[#B08D57] py-2 text-xs font-semibold tracking-wider uppercase shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content & Pricing */}
      <div className="p-3 sm:p-4 flex flex-col grow justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-[11px] text-[#666666] mb-1">
            <span className="uppercase tracking-wider truncate text-[10px] text-[#B08D57] font-medium">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-neutral-800 shrink-0">
              <Star className="w-3 h-3 fill-[#D4B77A] text-[#D4B77A]" />
              <span className="font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-neutral-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-xs sm:text-sm font-bold text-[#111111] tracking-wide uppercase font-heading hover:text-[#B08D57] transition-colors cursor-pointer line-clamp-1 mb-1.5"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Size & Frame Color indicators */}
          <div className="flex items-center gap-1 text-[10px] text-neutral-500 mb-2.5">
            <span>Sizes: {product.sizes.length} Options</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              {product.colors.map((c) => (
                <span 
                  key={c}
                  className={`inline-block w-2 h-2 rounded-full border border-neutral-300 ${
                    c === 'Black' ? 'bg-black' :
                    c === 'White' ? 'bg-white' :
                    c === 'Gold' ? 'bg-[#D4B77A]' :
                    'bg-[#795548]'
                  }`}
                  title={c}
                />
              ))}
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-[#F7F5F1]">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-sm sm:text-base font-bold text-[#111111]">
              {formatPKR(product.salePrice)}
            </span>
            {product.price > product.salePrice && (
              <span className="text-xs text-neutral-400 line-through">
                {formatPKR(product.price)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-5 gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="col-span-4 bg-[#111111] hover:bg-[#B08D57] text-white py-2 px-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="col-span-1 bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/30 flex items-center justify-center transition-colors"
              title="Order on WhatsApp"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
