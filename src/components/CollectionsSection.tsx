import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface CollectionsSectionProps {
  onSelectCollection: (category: ProductCategory) => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({ onSelectCollection }) => {
  const collections = [
    {
      title: 'Luxury Collection',
      tagline: 'Elegant artwork for sophisticated interiors.',
      category: 'Abstract Art' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      badge: 'Featured Decor',
      span: 'col-span-1 lg:col-span-8',
    },
    {
      title: 'Islamic Collection',
      tagline: 'Beautiful contemporary Islamic wall art.',
      category: 'Islamic Art' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      badge: 'Spiritual Grace',
      span: 'col-span-1 lg:col-span-4',
    },
    {
      title: 'Automotive Collection',
      tagline: 'Powerful artwork for car enthusiasts.',
      category: 'Cars & Automotive' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1000&q=80',
      badge: 'Adrenaline',
      span: 'col-span-1 lg:col-span-4',
    },
    {
      title: 'Minimal Collection',
      tagline: 'Clean artwork for modern spaces.',
      category: 'Abstract Art' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
      badge: 'Japandi & Zen',
      span: 'col-span-1 lg:col-span-4',
    },
    {
      title: 'Couple Collection',
      tagline: 'Elegant artwork for meaningful spaces.',
      category: 'Couple Frames' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
      badge: 'Intimate Nuance',
      span: 'col-span-1 lg:col-span-4',
    },
  ];

  return (
    <section id="collections" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#B08D57] uppercase block mb-2">
            Editorial Suites
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-heading mb-3">
            Signature Collections
          </h2>
          <div className="w-16 h-0.5 bg-[#D4B77A] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-[#666666] font-light">
            Designed to bring cohesive design languages, visual depth, and prestige to your residential or corporate environments.
          </p>
        </div>

        {/* Editorial Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {collections.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelectCollection(item.category)}
              className={`group relative h-[360px] sm:h-[420px] rounded-xs overflow-hidden cursor-pointer shadow-md ${item.span}`}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 group-hover:via-black/55 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white z-10">
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-medium tracking-widest uppercase text-[#D4B77A] border border-white/20">
                    <Sparkles className="w-3 h-3" />
                    {item.badge}
                  </span>
                </div>

                {/* Bottom Title & CTA */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight mb-2 text-white group-hover:text-[#D4B77A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-md mb-4">
                    {item.tagline}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white group-hover:text-[#D4B77A] transition-colors">
                    <span>EXPLORE COLLECTION</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
