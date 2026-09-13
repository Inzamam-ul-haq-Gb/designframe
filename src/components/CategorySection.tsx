import React from 'react';
import { CATEGORIES } from '../data/products';
import { ProductCategory } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (cat: ProductCategory) => void;
  selectedCategory?: string;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <section id="categories" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#B08D57] uppercase block mb-2">
            Curated Expressions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-heading mb-4">
            Shop By Category
          </h2>
          <div className="w-16 h-0.5 bg-[#D4B77A] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-[#666666]">
            Explore tailored wall art collections crafted to complement modern interiors, executive suites, and personal sanctums.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <div
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`group relative h-48 sm:h-64 rounded-sm overflow-hidden cursor-pointer shadow-xs transition-all duration-300 ${
                  isSelected ? 'ring-2 ring-[#B08D57] shadow-lg' : 'hover:shadow-md'
                }`}
              >
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Overlay with smooth transition */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/55 transition-colors duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end text-white z-10">
                  <span className="text-[10px] tracking-wider text-[#D4B77A] uppercase font-medium">
                    {category.itemCount} Designs
                  </span>
                  <h3 className="text-sm sm:text-base font-bold tracking-wider uppercase font-heading text-white group-hover:text-[#D4B77A] transition-colors mt-0.5 mb-1">
                    {category.name}
                  </h3>
                  <div className="flex items-center text-[11px] text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span>Explore Frames</span>
                    <ArrowRight className="w-3 h-3 ml-1 text-[#D4B77A]" />
                  </div>
                </div>

                {/* Custom badge for custom frames / customized prints */}
                {category.id === 'Custom Frames' && (
                  <div className="absolute top-3 right-3 bg-[#B08D57] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-xs shadow-sm">
                    Studio
                  </div>
                )}
                {category.id === 'Customized Print at Demand' && (
                  <div className="absolute top-3 right-3 bg-[#B08D57] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-xs shadow-sm">
                    On Demand
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
