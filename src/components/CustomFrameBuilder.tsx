import React, { useState, useRef } from 'react';
import { FrameSize, FrameColor, FrameStyle, CartItem } from '../types';
import { formatPKR, getCustomFrameBasePrice, generateWhatsAppOrderUrl } from '../utils/format';
import { 
  Upload, 
  Sparkles, 
  ShoppingBag, 
  MessageCircle, 
  Check, 
  Maximize2, 
  RotateCcw,
  Image as ImageIcon,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface CustomFrameBuilderProps {
  onAddToCart: (item: CartItem) => void;
}

const PRESET_ARTWORKS = [
  {
    name: 'Serene Dawn (Landscape)',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Elegance Botanical',
    url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Modern Architecture',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Golden Fluid Abstract',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
  }
];

const WALL_COLORS = [
  { name: 'Warm Beige', hex: '#EDE7DE', textDark: true },
  { name: 'Pure White', hex: '#FAFAFA', textDark: true },
  { name: 'Charcoal Noir', hex: '#1E1E1E', textDark: false },
  { name: 'Sage Olive', hex: '#A3B19B', textDark: false },
  { name: 'Midnight Navy', hex: '#1A2530', textDark: false },
];

export const CustomFrameBuilder: React.FC<CustomFrameBuilderProps> = ({ onAddToCart }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [userImage, setUserImage] = useState<string>(PRESET_ARTWORKS[0].url);
  const [imageName, setImageName] = useState<string>('Serene Dawn');
  const [selectedSize, setSelectedSize] = useState<FrameSize>('16 × 20');
  const [selectedColor, setSelectedColor] = useState<FrameColor>('Black');
  const [selectedStyle, setSelectedStyle] = useState<FrameStyle>('Modern');
  const [hasMatboard, setHasMatboard] = useState<boolean>(true);
  const [selectedWallColor, setSelectedWallColor] = useState<string>('#EDE7DE');
  const [viewMode, setViewMode] = useState<'wall' | 'room'>('wall');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const price = getCustomFrameBasePrice(selectedSize, selectedStyle);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserImage(event.target.result as string);
          setImageName(file.name.slice(0, 20));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserImage(event.target.result as string);
          setImageName(file.name.slice(0, 20));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    const customItem: CartItem = {
      id: `custom-${Date.now()}`,
      productId: 'custom-frame',
      name: `Custom Frame (${imageName})`,
      image: userImage,
      size: selectedSize,
      color: selectedColor,
      style: selectedStyle,
      price: price,
      quantity: 1,
      isCustom: true,
      customImageUrl: userImage,
    };
    onAddToCart(customItem);
  };

  const handleWhatsAppOrder = () => {
    const url = generateWhatsAppOrderUrl({
      productName: `Custom Framing (${imageName} - ${selectedStyle} Style, ${hasMatboard ? 'With Matboard' : 'Frameless Edge'})`,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      totalPrice: price,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Helper for Frame Border Styling
  const getFrameStyleClass = () => {
    switch (selectedColor) {
      case 'Black':
        return 'border-[#111111] shadow-[0_20px_40px_rgba(0,0,0,0.35)]';
      case 'White':
        return 'border-[#FBFBFB] shadow-[0_20px_40px_rgba(0,0,0,0.18)]';
      case 'Walnut':
        return 'border-[#5C3D2E] shadow-[0_20px_40px_rgba(40,25,20,0.35)]';
      case 'Gold':
        return 'border-[#CBB279] shadow-[0_20px_40px_rgba(180,150,80,0.35)]';
    }
  };

  const getFrameThickness = () => {
    switch (selectedStyle) {
      case 'Minimal':
        return 'border-[12px] sm:border-[16px]';
      case 'Modern':
        return 'border-[18px] sm:border-[24px]';
      case 'Classic':
        return 'border-[24px] sm:border-[32px]';
      case 'Luxury':
        return 'border-[28px] sm:border-[38px] ring-2 ring-[#D4B77A]/50';
    }
  };

  return (
    <section id="custom-builder" className="py-16 sm:py-24 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE7DE] text-[#B08D57] text-xs font-semibold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Bespoke Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight uppercase font-heading">
            Custom Frame Studio
          </h2>
          <div className="w-20 h-0.5 bg-[#D4B77A] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#666666] font-light">
            Upload any photograph, wedding memory, or custom digital art. Tailor the size, frame moulding, and presentation style with real-time room preview.
          </p>
        </div>

        {/* Step Tabs */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 bg-[#F7F5F1] rounded-full border border-[#EDE7DE] gap-1">
            {[
              { num: 1, label: '1. Image' },
              { num: 2, label: '2. Size' },
              { num: 3, label: '3. Color' },
              { num: 4, label: '4. Style' },
              { num: 5, label: '5. Preview & Order' },
            ].map((step) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`px-3 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeStep === step.num
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        {/* Studio Workspace: Left Controls, Right Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#F7F5F1] p-6 sm:p-8 rounded-sm border border-[#EDE7DE] space-y-7">
            
            {/* Step 1: Image Upload */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#111111]">
                  Step 1: Upload Your Image
                </span>
                <span className="text-[11px] text-[#B08D57] font-medium">JPEG, PNG up to 25MB</span>
              </div>

              {/* Upload Box */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#D4B77A] hover:border-[#B08D57] bg-white p-5 rounded-xs text-center cursor-pointer transition-colors group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Upload className="w-8 h-8 text-[#B08D57] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs sm:text-sm font-semibold text-[#111111]">
                  Click to upload or drag & drop
                </p>
                <p className="text-[11px] text-[#666666] mt-0.5">
                  Archival 12-color giclée print will be produced
                </p>
              </div>

              {/* Or Choose Sample Art */}
              <div className="mt-3">
                <span className="text-[11px] text-neutral-500 block mb-2 font-medium">
                  Or select a sample art preset:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_ARTWORKS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setUserImage(preset.url);
                        setImageName(preset.name);
                      }}
                      className={`relative h-14 rounded-xs overflow-hidden border-2 transition-all ${
                        userImage === preset.url ? 'border-[#B08D57] ring-1 ring-[#B08D57]' : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                      title={preset.name}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Choose Frame Size */}
            <div className="pt-5 border-t border-[#E5E5E5]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#111111]">
                  Step 2: Choose Frame Size (Inches)
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {(['8 × 10', '12 × 16', '16 × 20', '18 × 24', '24 × 36'] as FrameSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 px-2 text-center text-xs font-semibold rounded-xs border transition-all ${
                      selectedSize === size
                        ? 'bg-[#111111] text-[#D4B77A] border-[#111111] shadow-xs'
                        : 'bg-white text-neutral-800 border-[#E5E5E5] hover:border-[#B08D57]'
                    }`}
                  >
                    <span className="block font-bold">{size}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Choose Frame Color */}
            <div className="pt-5 border-t border-[#E5E5E5]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#111111]">
                  Step 3: Choose Frame Color
                </span>
                <span className="text-xs font-medium text-neutral-700">{selectedColor}</span>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  { name: 'Black', hex: '#111111', ring: 'ring-black' },
                  { name: 'White', hex: '#FFFFFF', ring: 'ring-neutral-300' },
                  { name: 'Walnut', hex: '#5C3D2E', ring: 'ring-[#5C3D2E]' },
                  { name: 'Gold', hex: '#CBB279', ring: 'ring-[#CBB279]' },
                ].map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name as FrameColor)}
                    className={`flex items-center justify-center gap-2 py-2 px-2 bg-white rounded-xs border transition-all text-xs font-medium ${
                      selectedColor === color.name
                        ? 'border-[#B08D57] bg-white ring-1 ring-[#B08D57] font-bold'
                        : 'border-[#E5E5E5] hover:border-neutral-400'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Choose Frame Style & Matboard */}
            <div className="pt-5 border-t border-[#E5E5E5]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#111111]">
                  Step 4: Frame Style
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Minimal', 'Modern', 'Classic', 'Luxury'] as FrameStyle[]).map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`py-2 px-2 text-center text-xs rounded-xs border transition-all ${
                      selectedStyle === style
                        ? 'bg-[#111111] text-white border-[#111111] font-semibold'
                        : 'bg-white text-neutral-800 border-[#E5E5E5] hover:border-[#B08D57]'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>

              {/* Matboard Toggle */}
              <div className="mt-4 flex items-center justify-between bg-white p-3 rounded-xs border border-[#E5E5E5]">
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">
                    Museum Off-White Matboard (Passe-partout)
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Adds 1.5&quot; breathing border for gallery depth
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setHasMatboard(!hasMatboard)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    hasMatboard ? 'bg-[#B08D57]' : 'bg-neutral-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      hasMatboard ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="pt-6 border-t border-[#EDE7DE] space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-neutral-500 block">
                    Estimated Price
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                    {formatPKR(price)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-xs">
                    <ShieldCheck className="w-3.5 h-3.5" /> All Hardware Included
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="custom-frame-add-cart-btn"
                  onClick={handleAddToCart}
                  className="w-full bg-[#111111] hover:bg-[#B08D57] text-white py-3.5 px-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4B77A]" />
                  <span>ADD TO CART</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-[#25D366] hover:bg-[#1eb857] text-white py-3.5 px-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>ORDER ON WHATSAPP</span>
                </button>
              </div>
            </div>

          </div>

          {/* Real-time Interactive Preview Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Preview Toolbar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 bg-[#F7F5F1] p-3 rounded-xs border border-[#E5E5E5] text-xs">
              
              {/* Wall Color Selector */}
              <div className="flex items-center gap-2">
                <span className="text-neutral-600 font-medium">Wall Color:</span>
                <div className="flex items-center gap-1.5">
                  {WALL_COLORS.map((w) => (
                    <button
                      key={w.name}
                      onClick={() => setSelectedWallColor(w.hex)}
                      className={`w-5 h-5 rounded-full border border-black/20 transition-transform ${
                        selectedWallColor === w.hex ? 'scale-125 ring-2 ring-[#B08D57]' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: w.hex }}
                      title={w.name}
                    />
                  ))}
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('wall')}
                  className={`px-3 py-1 text-xs font-medium rounded-xs transition-colors ${
                    viewMode === 'wall' ? 'bg-[#111111] text-white' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Wall View
                </button>
                <button
                  onClick={() => setViewMode('room')}
                  className={`px-3 py-1 text-xs font-medium rounded-xs transition-colors ${
                    viewMode === 'room' ? 'bg-[#111111] text-white' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Living Room Scene
                </button>
              </div>

            </div>

            {/* Interactive Preview Canvas */}
            <div
              className="w-full min-h-[460px] sm:min-h-[540px] rounded-xs border border-[#E5E5E5] flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden transition-colors duration-500"
              style={{
                backgroundColor: viewMode === 'room' ? '#EFECE6' : selectedWallColor,
              }}
            >
              {/* Room Scene elements if viewMode === 'room' */}
              {viewMode === 'room' && (
                <>
                  {/* Subtle architectural wall moulding */}
                  <div className="absolute top-0 inset-x-0 h-8 bg-black/5 border-b border-black/10" />
                  
                  {/* Modern credenza table at bottom */}
                  <div className="absolute bottom-0 inset-x-8 h-20 bg-[#2B2018] rounded-t-sm shadow-xl flex items-center justify-between px-8 border-t border-[#423126]">
                    <div className="w-10 h-14 bg-[#B08D57]/30 rounded-t-full border border-amber-900/30" />
                    <div className="flex gap-3 items-end">
                      <div className="w-6 h-10 bg-amber-100/40 rounded-xs" />
                      <div className="w-8 h-12 bg-neutral-800/60 rounded-xs" />
                    </div>
                  </div>
                </>
              )}

              {/* Framed Artwork Container */}
              <div 
                className={`relative z-10 transition-all duration-500 max-w-[340px] sm:max-w-[420px] w-full ${getFrameStyleClass()} ${getFrameThickness()}`}
                style={{
                  aspectRatio: selectedSize === '24 × 36' || selectedSize === '12 × 16' || selectedSize === '16 × 20' || selectedSize === '18 × 24' || selectedSize === '8 × 10' ? '4/5' : '1/1',
                }}
              >
                {/* Optional Matboard (Passe-partout) */}
                <div className={`w-full h-full ${hasMatboard ? 'p-4 sm:p-7 bg-[#FBF9F5] shadow-inner' : 'p-0 bg-transparent'}`}>
                  {/* Artwork Image */}
                  <div className="w-full h-full overflow-hidden bg-black/5 relative shadow-xs">
                    <img
                      src={userImage}
                      alt={imageName}
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Glass Reflection Highlight */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Dimension label */}
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-xs tracking-wider">
                {selectedSize} • {selectedColor} • {selectedStyle}
              </div>
            </div>

            {/* Craft Specs Below Preview */}
            <div className="w-full mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs text-neutral-600 bg-[#F7F5F1] p-3 rounded-xs border border-[#E5E5E5]">
              <div>
                <span className="font-bold text-neutral-900 block">Solid Wood Profile</span>
                <span className="text-[10px] text-neutral-500">Zero warping</span>
              </div>
              <div>
                <span className="font-bold text-neutral-900 block">Optical Glass</span>
                <span className="text-[10px] text-neutral-500">2mm shatterproof</span>
              </div>
              <div>
                <span className="font-bold text-neutral-900 block">Archival Canvas</span>
                <span className="text-[10px] text-neutral-500">100+ year durability</span>
              </div>
              <div>
                <span className="font-bold text-neutral-900 block">Pakistan Delivery</span>
                <span className="text-[10px] text-neutral-500">Cash on Delivery</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
