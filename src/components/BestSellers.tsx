import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

interface BestSellersProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onSelectProduct: (product: Product) => void;
  onViewAllShop: () => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onSelectProduct,
  onViewAllShop,
}) => {
  // Filter best sellers or first 8 products
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 8);

  return (
    <section id="bestsellers" className="py-16 sm:py-24 bg-[#F7F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="text-center sm:text-left">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#B08D57] uppercase block mb-1">
              Top Rated Artworks
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-heading">
              Best Sellers
            </h2>
            <p className="text-sm text-[#666666] mt-1 font-light">
              Discover the artwork everyone is loving across Pakistan.
            </p>
          </div>

          <button
            onClick={onViewAllShop}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#111111] hover:text-[#B08D57] border-b border-[#111111] hover:border-[#B08D57] pb-1 transition-colors group cursor-pointer"
          >
            <span>VIEW ALL FRAMES</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 products desktop, 3 tablet, 2 mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
