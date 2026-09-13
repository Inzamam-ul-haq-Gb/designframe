import React from 'react';
import { Product } from '../types';
import { formatPKR } from '../utils/format';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onBrowseShop: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
  onBrowseShop,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col justify-between z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5E5E5] bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <h2 className="text-base font-bold uppercase tracking-widest text-[#111111] font-heading">
              My Wishlist ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-[#F7F5F1] rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <Heart className="w-8 h-8 stroke-1" />
              </div>
              <h3 className="text-base font-bold text-[#111111] uppercase font-heading">
                Your Wishlist is Empty
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Save pieces you love to compare finishes, measure wall dimensions, or order later.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBrowseShop();
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-[#D4B77A] text-xs font-bold uppercase tracking-wider hover:bg-[#B08D57] hover:text-white transition-colors cursor-pointer"
              >
                <span>EXPLORE BEST SELLERS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            wishlistProducts.map((prod) => (
              <div 
                key={prod.id} 
                className="flex gap-3 pb-4 border-b border-[#F7F5F1] group"
              >
                <div 
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="w-20 h-24 bg-[#F7F5F1] rounded-xs overflow-hidden shrink-0 border border-[#E5E5E5] cursor-pointer"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 
                        onClick={() => {
                          onSelectProduct(prod);
                          onClose();
                        }}
                        className="text-xs font-bold text-[#111111] font-heading hover:text-[#B08D57] cursor-pointer line-clamp-1"
                      >
                        {prod.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(prod.id)}
                        className="text-neutral-400 hover:text-red-500 p-1"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[11px] text-[#B08D57] block mt-0.5">{prod.category}</span>
                    <span className="text-xs font-bold text-[#111111] block mt-1">
                      {formatPKR(prod.salePrice)}
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        onAddToCart(prod);
                        onRemoveFromWishlist(prod.id);
                      }}
                      className="w-full py-1.5 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D4B77A]" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-5 border-t border-[#E5E5E5] bg-[#F7F5F1]">
            <button
              onClick={() => {
                onClose();
                onBrowseShop();
              }}
              className="w-full bg-white hover:bg-neutral-100 text-neutral-900 border border-[#E5E5E5] py-2.5 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
