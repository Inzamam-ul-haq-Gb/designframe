import React, { useState } from 'react';
import { Product, FrameSize, FrameColor, CartItem } from '../types';
import { formatPKR, getSizePriceModifier, generateWhatsAppOrderUrl } from '../utils/format';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Ruler, 
  Check,
  Share2
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onBuyNow: (item: CartItem) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  relatedProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  relatedProducts,
  onSelectProduct,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<FrameSize>(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<FrameColor>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'reviews'>('desc');
  const [copiedLink, setCopiedLink] = useState(false);

  const priceModifier = getSizePriceModifier(selectedSize);
  const currentSalePrice = Math.max(1500, product.salePrice + priceModifier);
  const currentOriginalPrice = Math.max(2000, product.price + priceModifier);

  const galleryImages = [
    product.image,
    product.roomImage,
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  ];

  const handleAddToCart = () => {
    const item: CartItem = {
      id: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      price: currentSalePrice,
      quantity,
    };
    onAddToCart(item);
  };

  const handleBuyNow = () => {
    const item: CartItem = {
      id: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      price: currentSalePrice,
      quantity,
    };
    onBuyNow(item);
  };

  const handleWhatsApp = () => {
    const url = generateWhatsAppOrderUrl({
      productName: product.name,
      size: selectedSize,
      color: selectedColor,
      quantity,
      totalPrice: currentSalePrice * quantity,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fade-in">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white rounded-xs shadow-2xl overflow-hidden my-auto border border-[#E5E5E5]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-[#111111] text-neutral-800 hover:text-white flex items-center justify-center shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="max-h-[90vh] overflow-y-auto">
          
          {/* Main 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
            
            {/* Left: Gallery (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image */}
              <div className="relative aspect-4/5 bg-[#F7F5F1] overflow-hidden rounded-xs border border-[#E5E5E5] group">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Discount Tag */}
                {product.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-[#111111] text-[#D4B77A] text-xs font-bold px-2.5 py-1 tracking-wider uppercase">
                    {product.discount}% OFF
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product)}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isWishlisted ? 'bg-[#111111] text-[#D4B77A]' : 'bg-white text-neutral-600 hover:text-red-500 shadow-md'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-4/3 rounded-xs overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-[#B08D57] ring-1 ring-[#B08D57]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-2 grid grid-cols-3 gap-2 text-center text-[11px] text-neutral-600">
                <div className="p-2 bg-[#F7F5F1] rounded-xs">
                  <span className="block font-bold text-neutral-900">COD Available</span>
                  <span>Pay on arrival</span>
                </div>
                <div className="p-2 bg-[#F7F5F1] rounded-xs">
                  <span className="block font-bold text-neutral-900">Zero Damage</span>
                  <span>Safe transit packing</span>
                </div>
                <div className="p-2 bg-[#F7F5F1] rounded-xs">
                  <span className="block font-bold text-neutral-900">Easy Returns</span>
                  <span>7-day exchange</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Controls (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-[#D4B77A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-neutral-900">{product.rating}</span>
                    <span className="text-xs text-neutral-400">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-heading tracking-tight mb-3">
                  {product.name}
                </h1>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                    {formatPKR(currentSalePrice)}
                  </span>
                  <span className="text-base text-neutral-400 line-through">
                    {formatPKR(currentOriginalPrice)}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs">
                    Save {product.discount}%
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-sm text-[#666666] leading-relaxed mb-6 font-light">
                  {product.description}
                </p>

                {/* Frame Size Selector */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider text-neutral-900">
                      Frame Size (Inches)
                    </span>
                    <span className="text-neutral-500 text-[11px]">Dimensions in standard wall ratio</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-semibold rounded-xs border text-center transition-all ${
                          selectedSize === size
                            ? 'bg-[#111111] text-[#D4B77A] border-[#111111] shadow-xs'
                            : 'bg-white text-neutral-700 border-[#E5E5E5] hover:border-[#B08D57]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frame Color Selector */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider text-neutral-900">
                      Frame Moulding Color: <span className="text-[#B08D57]">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`py-2 px-2 flex items-center justify-center gap-2 text-xs rounded-xs border transition-all ${
                          selectedColor === color
                            ? 'border-[#B08D57] bg-white ring-1 ring-[#B08D57] font-bold'
                            : 'border-[#E5E5E5] hover:border-neutral-400'
                        }`}
                      >
                        <span
                          className={`w-3 h-3 rounded-full border border-black/20 ${
                            color === 'Black' ? 'bg-black' :
                            color === 'White' ? 'bg-white' :
                            color === 'Gold' ? 'bg-[#D4B77A]' :
                            'bg-[#5C3D2E]'
                          }`}
                        />
                        <span>{color}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-[#E5E5E5] rounded-xs">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 text-neutral-600 hover:text-black font-semibold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 text-xs font-bold">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1.5 text-neutral-600 hover:text-black font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Buttons Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="bg-[#111111] hover:bg-[#B08D57] text-white py-3.5 px-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#D4B77A]" />
                      <span>ADD TO CART</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleBuyNow}
                      className="bg-[#B08D57] hover:bg-[#997845] text-white py-3.5 px-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                    >
                      <Zap className="w-4 h-4" />
                      <span>BUY NOW</span>
                    </button>
                  </div>

                  {/* WhatsApp Order Button */}
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#1eb857] text-white py-3 px-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>ORDER ON WHATSAPP</span>
                  </button>
                </div>
              </div>

              {/* Share link & Assurance */}
              <div className="pt-4 border-t border-[#F7F5F1] flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  100% Genuine Handcrafted Product
                </span>
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1 hover:text-[#B08D57] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Lower Tabs: Description, Specifications, Reviews */}
          <div className="border-t border-[#E5E5E5] bg-[#F7F5F1]/50 p-6 sm:p-10">
            {/* Tabs Navigation */}
            <div className="flex border-b border-[#E5E5E5] gap-6 text-xs uppercase tracking-wider font-semibold mb-6 overflow-x-auto pb-1">
              {[
                { id: 'desc', label: 'Product Description' },
                { id: 'specs', label: 'Specifications' },
                { id: 'shipping', label: 'Delivery & Returns' },
                { id: 'reviews', label: `Customer Reviews (${product.reviewsCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 relative transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#111111] border-b-2 border-[#B08D57]'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="text-sm text-neutral-700 leading-relaxed max-w-3xl">
              {activeTab === 'desc' && (
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <p>
                    Every DESIGN FRAME artwork is produced using twelve-color pigment giclée technology on archival-grade 300GSM cotton art canvas. Our frames are assembled by skilled artisans in Pakistan, inspected under 5000K daylight simulation lamps to guarantee flawless geometry, seamless corner miter joints, and crystal transparency.
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-white rounded-xs border border-[#E5E5E5]">
                    <span className="text-neutral-400 uppercase font-semibold block mb-0.5">Moulding Material</span>
                    <span className="font-bold text-neutral-900">{product.specifications.material}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xs border border-[#E5E5E5]">
                    <span className="text-neutral-400 uppercase font-semibold block mb-0.5">Glass / Glazing</span>
                    <span className="font-bold text-neutral-900">{product.specifications.glass}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xs border border-[#E5E5E5]">
                    <span className="text-neutral-400 uppercase font-semibold block mb-0.5">Print Surface</span>
                    <span className="font-bold text-neutral-900">{product.specifications.finish}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xs border border-[#E5E5E5]">
                    <span className="text-neutral-400 uppercase font-semibold block mb-0.5">Hanging Hardware</span>
                    <span className="font-bold text-neutral-900">{product.specifications.hardware}</span>
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-3 text-xs">
                  <p className="font-bold text-neutral-900">Nationwide Shipping Across Pakistan:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
                    <li>Major Cities (Karachi, Lahore, Islamabad/Rawalpindi): Delivered within 3-4 working days.</li>
                    <li>Other Cities & Towns: Delivered within 4-6 working days.</li>
                    <li>Free shipping on all cart totals above Rs. 3,500. Flat rate Rs. 250 for orders below Rs. 3,500.</li>
                    <li>Cash on Delivery (COD) available with open-delivery security seal.</li>
                    <li>7-Day Replacement Guarantee if damaged during transit — simply send us an unboxing photo on WhatsApp.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white p-4 rounded-xs border border-[#E5E5E5]">
                    <div className="text-center pr-4 border-r border-neutral-200">
                      <span className="text-3xl font-extrabold text-[#111111]">{product.rating}</span>
                      <div className="flex text-[#D4B77A] text-xs justify-center mt-0.5">
                        {'★'.repeat(5)}
                      </div>
                      <span className="text-[10px] text-neutral-500">Based on {product.reviewsCount} verified reviews</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-800">99.4% Customer Recommendation Rate</p>
                      <p className="text-[11px] text-neutral-500">Customers praise frame sturdiness, glare-free acrylic, and prompt WhatsApp response.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* "You May Also Like" Strip */}
            {relatedProducts.length > 0 && (
              <div className="mt-10 pt-8 border-t border-[#E5E5E5]">
                <h3 className="text-sm font-bold uppercase tracking-wider font-heading mb-4 text-[#111111]">
                  You May Also Like
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {relatedProducts.slice(0, 4).map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectProduct(rel)}
                      className="group cursor-pointer bg-white p-2 rounded-xs border border-[#E5E5E5] hover:border-[#B08D57] transition-all"
                    >
                      <div className="aspect-4/5 overflow-hidden bg-neutral-100 mb-2">
                        <img
                          src={rel.image}
                          alt={rel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-neutral-900 truncate group-hover:text-[#B08D57]">
                        {rel.name}
                      </h4>
                      <span className="text-xs font-semibold text-[#111111]">
                        {formatPKR(rel.salePrice)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
