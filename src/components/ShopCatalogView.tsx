import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, FrameColor } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, RotateCcw, Search, ChevronDown, Check } from 'lucide-react';

interface ShopCatalogViewProps {
  products: Product[];
  initialCategory?: ProductCategory | 'all';
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onSelectProduct: (product: Product) => void;
}

export const ShopCatalogView: React.FC<ShopCatalogViewProps> = ({
  products,
  initialCategory = 'all',
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onSelectProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedOrientation, setSelectedOrientation] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [searchFilter, setSearchFilter] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync initialCategory if passed from parent
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Color
      if (selectedColor !== 'all' && !p.colors.includes(selectedColor as FrameColor)) {
        return false;
      }
      // Orientation
      if (selectedOrientation !== 'all' && p.orientation !== selectedOrientation) {
        return false;
      }
      // Price
      if (priceRange === 'under-3000' && p.salePrice >= 3000) return false;
      if (priceRange === '3000-4000' && (p.salePrice < 3000 || p.salePrice > 4000)) return false;
      if (priceRange === 'above-4000' && p.salePrice <= 4000) return false;
      // Search
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.salePrice - b.salePrice;
      if (sortBy === 'price-high') return b.salePrice - a.salePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default order
    });
  }, [products, selectedCategory, selectedColor, selectedOrientation, priceRange, sortBy, searchFilter]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedColor('all');
    setSelectedOrientation('all');
    setPriceRange('all');
    setSearchFilter('');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedColor !== 'all' || selectedOrientation !== 'all' || priceRange !== 'all' || searchFilter !== '';

  return (
    <section id="shop" className="py-12 sm:py-16 bg-[#F7F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-neutral-900 font-semibold">Art Gallery Catalog</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-[#B08D57] font-semibold">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-heading tracking-tight">
                {selectedCategory === 'all' ? 'All Wall Art & Frames' : selectedCategory}
              </h1>
              <p className="text-xs sm:text-sm text-[#666666] mt-1 font-light">
                Showing {filteredProducts.length} handcrafted pieces • Nationwide delivery in Pakistan
              </p>
            </div>

            {/* Quick Sort Bar */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border border-[#E5E5E5] text-xs font-semibold text-neutral-800 rounded-xs"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#B08D57]" />
                <span>Filters {hasActiveFilters && '(Active)'}</span>
              </button>

              <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] px-3 py-2 rounded-xs text-xs">
                <span className="text-neutral-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-semibold text-neutral-900 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Catalog Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Filter Sidebar (3 cols) */}
          <aside className={`lg:col-span-3 bg-white p-5 rounded-xs border border-[#E5E5E5] space-y-6 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#111111]">
                <SlidersHorizontal className="w-4 h-4 text-[#B08D57]" />
                <span>Filter Art</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#B08D57] hover:underline flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Keyword Search filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
                Keyword Filter
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. gold, calligraphy..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-[#F7F5F1] border border-[#E5E5E5] rounded-xs pl-8 pr-2 py-1.5 text-xs focus:outline-none focus:border-[#B08D57]"
                />
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-neutral-400" />
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2.5">
                Categories
              </label>
              <div className="space-y-1.5 text-xs max-h-56 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-xs text-left transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-[#111111] text-[#D4B77A] font-bold'
                      : 'text-neutral-700 hover:bg-[#F7F5F1]'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] opacity-70">({products.length})</span>
                </button>

                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-xs text-left transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-[#111111] text-[#D4B77A] font-bold'
                        : 'text-neutral-700 hover:bg-[#F7F5F1]'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] opacity-70 shrink-0">({cat.itemCount})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Moulding Color */}
            <div className="pt-4 border-t border-[#F7F5F1]">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2.5">
                Moulding Finish
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['all', 'Black', 'White', 'Walnut', 'Gold'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`py-1.5 px-2 rounded-xs border text-center transition-all ${
                      selectedColor === color
                        ? 'border-[#B08D57] bg-[#F7F5F1] font-bold text-neutral-900'
                        : 'border-[#E5E5E5] text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    {color === 'all' ? 'Any Color' : color}
                  </button>
                ))}
              </div>
            </div>

            {/* Orientation */}
            <div className="pt-4 border-t border-[#F7F5F1]">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2.5">
                Wall Orientation
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'portrait', label: 'Portrait' },
                  { id: 'landscape', label: 'Landscape' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedOrientation(item.id)}
                    className={`py-1.5 rounded-xs border text-center text-[11px] ${
                      selectedOrientation === item.id
                        ? 'border-[#111111] bg-[#111111] text-white font-bold'
                        : 'border-[#E5E5E5] text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="pt-4 border-t border-[#F7F5F1]">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2.5">
                Budget (PKR)
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-3000', label: 'Under Rs. 3,000' },
                  { id: '3000-4000', label: 'Rs. 3,000 – Rs. 4,000' },
                  { id: 'above-4000', label: 'Rs. 4,000 & Above' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPriceRange(p.id)}
                    className={`w-full text-left px-2 py-1.5 rounded-xs transition-colors flex items-center justify-between ${
                      priceRange === p.id
                        ? 'bg-[#F7F5F1] text-[#B08D57] font-bold'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{p.label}</span>
                    {priceRange === p.id && <Check className="w-3.5 h-3.5 text-[#B08D57]" />}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Product Grid Area (9 cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xs border border-[#E5E5E5] space-y-4">
                <SlidersHorizontal className="w-10 h-10 text-neutral-400 mx-auto" />
                <h3 className="text-base font-bold uppercase text-[#111111] font-heading">
                  No Frames Match Your Filters
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try adjusting your color, price range, or category filter to discover more artwork.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#111111] text-[#D4B77A] text-xs font-bold uppercase tracking-wider hover:bg-[#B08D57] hover:text-white transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
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
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
