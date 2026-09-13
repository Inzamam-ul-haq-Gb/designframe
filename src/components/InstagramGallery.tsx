import React from 'react';
import { INSTAGRAM_POSTS } from '../data/products';
import { Instagram, Heart } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#B08D57] mb-2">
            <Instagram className="w-4 h-4" />
            <span>Community Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight uppercase font-heading">
            Follow DESIGN FRAME
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#B08D57] hover:underline block mt-1"
          >
            @designframe
          </a>
          <p className="text-xs text-[#666666] mt-2">
            Tag us in your styled wall frames to be featured on our official Pakistan decor feed.
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square overflow-hidden bg-neutral-100 rounded-xs cursor-pointer shadow-xs"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover overlay with Instagram icon & likes */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-3 text-center">
                <Instagram className="w-6 h-6 text-[#D4B77A] mb-2" />
                <div className="flex items-center gap-1 text-xs font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>{post.likes}</span>
                </div>
                <p className="text-[10px] text-neutral-300 line-clamp-2 mt-2 font-light">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
