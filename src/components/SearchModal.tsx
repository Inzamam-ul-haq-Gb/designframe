import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { formatPKR } from '../utils/format';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: ProductCategory) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query, products]);

  if (!isOpen) return null;

  const popularTags: ProductCategory[] = [
    'Islamic Art',
    'Abstract Art',
    'Customized Print at Demand',
    'Cars & Automotive',
    'Motivational',
    'Custom Frames',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-xs shadow-2xl overflow-hidden border border-[#E5E5E5]">
        
        {/* Search Header Input */}
        <div className="flex items-center p-4 border-b border-[#E5E5E5] bg-[#F7F5F1]">
          <Search className="w-5 h-5 text-[#B08D57] ml-2 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search frames by name, category, or style (e.g. Islamic, Golden, 911)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent px-4 py-2 text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-neutral-700 px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Popular Category Suggestions */}
        <div className="p-4 bg-white border-b border-[#F7F5F1] text-xs">
          <span className="text-neutral-500 font-medium mr-2">Popular:</span>
          <div className="inline-flex flex-wrap gap-1.5 mt-1 sm:mt-0">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  onSelectCategory(tag);
                  onClose();
                }}
                className="px-2.5 py-1 bg-[#F7F5F1] hover:bg-[#EDE7DE] text-neutral-700 hover:text-[#111111] rounded-xs transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-xs text-neutral-400">
              <Sparkles className="w-6 h-6 text-[#D4B77A] mx-auto mb-2" />
              <span>Type a keyword above to search 20+ luxury wall art designs.</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-bold text-neutral-800">No frames found matching &quot;{query}&quot;</p>
              <p className="text-xs text-neutral-500">Try searching for &quot;Abstract&quot;, &quot;Cars&quot;, &quot;Gold&quot;, or &quot;Modern&quot;</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] text-neutral-500 px-2 font-medium">
                Found {filtered.length} matching artwork{filtered.length > 1 ? 's' : ''}:
              </div>
              {filtered.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-2 hover:bg-[#F7F5F1] rounded-xs cursor-pointer transition-colors border border-transparent hover:border-[#E5E5E5] group"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-12 h-14 object-cover rounded-xs border border-neutral-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#111111] group-hover:text-[#B08D57] transition-colors truncate">
                        {prod.name}
                      </h4>
                      <span className="text-xs font-bold text-[#111111]">
                        {formatPKR(prod.salePrice)}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500">{prod.category} • {prod.sizes.length} sizes available</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 group-hover:text-[#B08D57] transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
