import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Award } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onCustomFrameClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onCustomFrameClick }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#111111] text-white">
      {/* Background Image Container with Editorial Dark Gradient Overlay */}
      <div className="relative min-h-[600px] lg:min-h-[720px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center sm:bg-right-top transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />

        {/* Multi-layered luxury overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 lg:via-black/50" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60" />

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-2xl">
            {/* Subtle Brand Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#D4B77A] text-xs font-medium tracking-widest uppercase mb-6 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Frame Your Style. Define Your Space.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 font-heading">
              Transform Your <br />
              <span className="font-editorial italic font-normal text-[#D4B77A] mr-2">Walls</span>
              Into Art
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-8 max-w-xl">
              Premium frames and wall art designed to give your space a personality of its own. Handcrafted with optical clarity acrylic, archival prints, and museum-grade finishes.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <button
                id="hero-shop-collection-btn"
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FFFFFF] text-[#111111] font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase hover:bg-[#B08D57] hover:text-white transition-all duration-300 shadow-xl group cursor-pointer"
              >
                <span>SHOP COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-create-frame-btn"
                onClick={onCustomFrameClick}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-[#D4B77A] text-[#D4B77A] font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase hover:bg-[#D4B77A] hover:text-[#111111] transition-all duration-300 backdrop-blur-xs cursor-pointer"
              >
                <span>CREATE YOUR FRAME</span>
              </button>
            </div>

            {/* Micro Credibility Badges */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D4B77A] shrink-0" />
                <span className="leading-tight">All-Pakistan COD Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4B77A] shrink-0" />
                <span className="leading-tight">Safe Transit Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4B77A] shrink-0" />
                <span className="leading-tight">15,000+ Walls Styled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
