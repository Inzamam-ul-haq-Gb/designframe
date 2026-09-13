import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Palette, Ruler } from 'lucide-react';

interface PromotionalBannerProps {
  onCustomFrameClick: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ onCustomFrameClick }) => {
  return (
    <section className="relative w-full bg-[#111111] text-white overflow-hidden py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B08D57]/20 border border-[#B08D57]/40 text-[#D4B77A] text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Framing Studio</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase font-heading leading-tight">
              YOUR WALL. <br />
              <span className="font-editorial italic font-normal text-[#D4B77A]">YOUR STORY.</span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl">
              Turn your cherished memories, wedding portraits, digital art, or family moments into gallery-worthy framed statements. Upload any picture, choose bespoke moulding & passe-partout styles, and preview it in real-time.
            </p>

            {/* Micro Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5">
                <Palette className="w-4 h-4 text-[#D4B77A]" />
                <span>4 Premium Moulding Colors</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Ruler className="w-4 h-4 text-[#D4B77A]" />
                <span>Custom Gallery Dimensions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D4B77A]" />
                <span>Shatterproof Acrylic Shield</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="banner-design-frame-btn"
                onClick={onCustomFrameClick}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#B08D57] hover:bg-[#D4B77A] text-white hover:text-[#111111] font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 shadow-xl group cursor-pointer"
              >
                <span>DESIGN YOUR FRAME</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Editorial Interior Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gold border accent */}
              <div className="absolute -inset-3 border border-[#D4B77A]/30 rounded-xs -z-10 translate-x-3 translate-y-3 hidden sm:block" />
              
              <div className="relative overflow-hidden shadow-2xl rounded-xs aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
                  alt="Custom framed wall art in elegant interior"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating overlay tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="block text-white font-medium">Bespoke Custom Size</span>
                    <span className="text-[11px] text-[#D4B77A]">Hand-joined in Pakistan</span>
                  </div>
                  <span className="px-2.5 py-1 bg-[#B08D57] text-white text-[10px] uppercase font-bold tracking-wider">
                    From Rs. 2,299
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
