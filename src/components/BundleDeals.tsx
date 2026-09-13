import React from 'react';
import { BUNDLE_DEALS } from '../data/products';
import { formatPKR } from '../utils/format';
import { BundleDeal, CartItem } from '../types';
import { ShoppingBag, Check, Layers } from 'lucide-react';

interface BundleDealsProps {
  onAddBundleToCart: (bundle: BundleDeal) => void;
  onBrowseBundles: () => void;
}

export const BundleDeals: React.FC<BundleDealsProps> = ({ onAddBundleToCart, onBrowseBundles }) => {
  return (
    <section id="bundles" className="py-16 sm:py-24 bg-[#F7F5F1] border-y border-[#EDE7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="text-center sm:text-left">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#B08D57] uppercase block mb-1">
              Curated Gallery Walls
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight uppercase font-heading">
              Complete Your Wall
            </h2>
            <p className="text-sm text-[#666666] mt-1 font-light">
              Save up to 35% with matched wall art sets tailored for balanced symmetry.
            </p>
          </div>

          <button
            onClick={onBrowseBundles}
            className="px-6 py-2.5 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold tracking-[0.16em] uppercase transition-colors"
          >
            SHOP BUNDLES
          </button>
        </div>

        {/* Bundle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUNDLE_DEALS.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-white border border-[#E5E5E5] hover:border-[#D4B77A] rounded-xs overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Area */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#EDE7DE]">
                <img
                  src={bundle.image}
                  alt={bundle.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Discount Badge */}
                <div className="absolute top-2.5 left-2.5 bg-[#111111] text-[#D4B77A] text-[10px] font-bold px-2 py-0.5 tracking-widest uppercase">
                  SAVE {bundle.discount}%
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-xs flex items-center gap-1">
                  <Layers className="w-3 h-3 text-[#D4B77A]" />
                  <span>Gallery Set</span>
                </div>
              </div>

              {/* Bundle Content */}
              <div className="p-5 flex flex-col grow justify-between">
                <div>
                  <span className="text-[10px] text-[#B08D57] uppercase font-bold tracking-widest block mb-1">
                    {bundle.subtitle}
                  </span>
                  
                  <h3 className="text-base font-bold text-[#111111] font-heading tracking-wide mb-2 group-hover:text-[#B08D57] transition-colors">
                    {bundle.title}
                  </h3>

                  <p className="text-xs text-[#666666] mb-3">
                    {bundle.recommendedRoom}
                  </p>

                  {/* Included Items */}
                  <div className="space-y-1 mb-4 pt-2 border-t border-[#F7F5F1]">
                    {bundle.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-neutral-700">
                        <Check className="w-3 h-3 text-[#B08D57] shrink-0" />
                        <span className="truncate">{it}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="pt-3 border-t border-[#E5E5E5]">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-[#111111]">
                        {formatPKR(bundle.salePrice)}
                      </span>
                      <span className="ml-2 text-xs text-neutral-400 line-through">
                        {formatPKR(bundle.originalPrice)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddBundleToCart(bundle)}
                    className="w-full bg-[#111111] hover:bg-[#B08D57] text-white py-2.5 px-3 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#D4B77A]" />
                    <span>Add Set to Cart</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
