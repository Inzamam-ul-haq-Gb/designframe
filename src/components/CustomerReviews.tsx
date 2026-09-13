import React from 'react';
import { REVIEWS } from '../data/products';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F7F5F1] border-t border-[#EDE7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#B08D57] uppercase block mb-2">
            Verified Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight uppercase font-heading">
            Loved By Our Customers
          </h2>
          <div className="w-16 h-0.5 bg-[#D4B77A] mx-auto my-3" />
          <p className="text-sm text-[#666666] font-light">
            Read authentic reviews from homeowners, interior designers, and offices across Pakistan.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-xs border border-[#E5E5E5] hover:border-[#D4B77A] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars & Quote */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#D4B77A]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#EDE7DE]" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic mb-4">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Purchased product note */}
                <div className="text-[11px] text-[#B08D57] font-medium mb-4">
                  Purchased: {rev.productName}
                </div>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#F7F5F1]">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#111111] flex items-center gap-1">
                    {rev.name}
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    )}
                  </h4>
                  <span className="text-[11px] text-neutral-500">{rev.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
