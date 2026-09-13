import React from 'react';
import { 
  Instagram, 
  Facebook, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onNavigate: (section: string, category?: ProductCategory) => void;
  onOpenAccount: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAccount }) => {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Promise */}
        <div className="pb-12 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#D4B77A] uppercase block mb-1">
              Join the Art Club
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading">
              Receive 10% off your first frame order
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Exclusive decor releases, gallery wall inspirations, and limited bundle offers.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to DESIGN FRAME!'); }} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-neutral-400 px-4 py-3 text-xs focus:outline-none focus:border-[#D4B77A] rounded-xs"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#B08D57] hover:bg-[#D4B77A] text-white hover:text-[#111111] text-xs font-bold uppercase tracking-widest transition-colors shrink-0 flex items-center gap-1.5 rounded-xs cursor-pointer"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12">
          
          {/* Col 1: Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 border border-[#D4B77A] flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#B08D57] flex items-center justify-center">
                  <span className="text-[9px] font-bold text-white">DF</span>
                </div>
              </div>
              <span className="text-xl font-bold tracking-[0.2em] uppercase text-white font-heading">
                DESIGN<span className="font-light text-[#D4B77A] ml-1">FRAME</span>
              </span>
            </div>

            <p className="text-xs text-[#D4B77A] tracking-wider uppercase font-medium">
              Frame Your Style. Define Your Space.
            </p>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Pakistan&apos;s premier online bespoke framing atelier and contemporary wall art gallery. Transforming living spaces with museum-quality materials, optical acrylic, and nationwide delivery.
            </p>

            <div className="space-y-2 pt-2 text-xs text-neutral-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4B77A] shrink-0" />
                <span>Gulberg III, Lahore / Clifton, Karachi, Pakistan</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#D4B77A] shrink-0" />
                <span>+92 313 2017397 (Mon - Sat 10am - 9pm)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4B77A] shrink-0" />
                <span>support@designframe.pk</span>
              </p>
            </div>
          </div>

          {/* Col 2: Shop (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white font-heading mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D4B77A] transition-colors">
                  All Frames
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bestsellers')} className="hover:text-[#D4B77A] transition-colors">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-[#D4B77A] transition-colors">
                  Categories Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('custom-builder')} className="hover:text-[#D4B77A] transition-colors">
                  Custom Frames Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'Customized Print at Demand')} className="hover:text-[#D4B77A] transition-colors text-left">
                  Customized Print at Demand
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bundles')} className="hover:text-[#D4B77A] transition-colors">
                  Bundle Deals (Save 35%)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collections')} className="hover:text-[#D4B77A] transition-colors">
                  Signature Collections
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white font-heading mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#D4B77A] transition-colors">
                  Contact Us & WhatsApp
                </button>
              </li>
              <li>
                <button onClick={onOpenAccount} className="hover:text-[#D4B77A] transition-colors">
                  Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#D4B77A] transition-colors">
                  Shipping Across Pakistan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#D4B77A] transition-colors">
                  7-Day Replacement Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#D4B77A] transition-colors">
                  Frequently Asked Questions (FAQs)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('custom-builder')} className="hover:text-[#D4B77A] transition-colors">
                  Custom Framing Sizing Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Information & Socials (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white font-heading mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#D4B77A] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#D4B77A] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#D4B77A] transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#D4B77A] transition-colors">
                  Corporate Inquiries
                </button>
              </li>
            </ul>

            <div className="pt-4">
              <span className="text-[11px] font-semibold text-neutral-300 block mb-2">Connect With Us</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#B08D57] flex items-center justify-center text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#B08D57] flex items-center justify-center text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/923132017397"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 DESIGN FRAME. All Rights Reserved. Handcrafted in Pakistan.</p>

          {/* Pakistan payment method representations */}
          <div className="flex items-center gap-2 text-[11px] text-neutral-300">
            <span className="px-2 py-1 bg-white/10 rounded-xs">Cash on Delivery</span>
            <span className="px-2 py-1 bg-white/10 rounded-xs">Bank Transfer</span>
            <span className="px-2 py-1 bg-white/10 rounded-xs">JazzCash / EasyPaisa</span>
            <span className="px-2 py-1 bg-white/10 rounded-xs">Visa / Mastercard</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
