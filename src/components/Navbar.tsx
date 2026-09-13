import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  PhoneCall, 
  Truck, 
  Sparkles,
  User,
  ChevronRight
} from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  activeSection: string;
  onNavigate: (section: string, category?: ProductCategory) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: string, category?: ProductCategory) => {
    onNavigate(section, category);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', section: 'home' },
    { label: 'Shop', section: 'shop' },
    { label: 'Categories', section: 'categories' },
    { label: 'Best Sellers', section: 'bestsellers' },
    { label: 'Custom Frames', section: 'custom-builder' },
    { label: 'Collections', section: 'collections' },
    { label: 'Bundles', section: 'bundles' },
    { label: 'About Us', section: 'about' },
    { label: 'Contact', section: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#111111] text-white py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 tracking-wider font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4B77A] animate-pulse"></span>
            <span className="text-[#D4B77A] font-semibold">LIMITED TIME OFFER:</span>
            <span>UP TO 30% OFF ON SELECTED FRAMES</span>
            <span className="hidden md:inline text-neutral-400">|</span>
            <span className="hidden md:inline text-neutral-300">Free Nationwide Shipping on orders over Rs. 3,500</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-4 text-neutral-300 text-[11px]">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#D4B77A]" /> Cash On Delivery Across Pakistan
            </span>
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3 h-3 text-[#D4B77A]" /> 0313-2017397
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              id="btn-mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-neutral-800 hover:text-[#B08D57] transition-colors focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              id="btn-mobile-search"
              type="button"
              onClick={onOpenSearch}
              className="p-2 ml-1 text-neutral-800 hover:text-[#B08D57] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Logo & Tagline */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex flex-col items-center sm:items-start select-none group"
            id="brand-logo"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 border-2 border-[#111111] flex items-center justify-center p-1 group-hover:border-[#B08D57] transition-colors duration-300">
                <div className="w-full h-full bg-[#111111] group-hover:bg-[#B08D57] transition-colors duration-300 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white tracking-tighter">DF</span>
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-[#111111] font-heading group-hover:text-[#B08D57] transition-colors">
                DESIGN<span className="font-light text-[#B08D57] ml-1">FRAME</span>
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#666666] font-medium hidden sm:block mt-0.5">
              Frame Your Style. Define Your Space.
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <button
                key={item.section}
                id={`nav-${item.section}`}
                onClick={() => handleNavClick(item.section)}
                className={`text-[13px] uppercase tracking-[0.14em] font-medium transition-all duration-200 relative py-1 hover:text-[#B08D57] ${
                  activeSection === item.section 
                    ? 'text-[#111111] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#B08D57]' 
                    : 'text-[#2B2B2B]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Search */}
            <button
              id="btn-desktop-search"
              onClick={onOpenSearch}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F7F5F1] text-xs text-neutral-500 hover:text-neutral-900 border border-transparent hover:border-[#EDE7DE] transition-all"
            >
              <Search className="w-4 h-4 text-[#B08D57]" />
              <span className="pr-4">Search frames, art...</span>
            </button>

            {/* Account / Order tracking */}
            <button
              id="btn-account"
              onClick={onOpenAccount}
              className="p-2 text-neutral-800 hover:text-[#B08D57] transition-colors relative"
              title="Track Order / Account"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              id="btn-wishlist"
              onClick={onOpenWishlist}
              className="p-2 text-neutral-800 hover:text-[#B08D57] transition-colors relative"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B08D57] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Bag */}
            <button
              id="btn-cart"
              onClick={onOpenCart}
              className="p-2 text-neutral-800 hover:text-[#B08D57] transition-colors relative flex items-center gap-1.5 group"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-[#111111] text-[#D4B77A] text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline-block text-xs font-semibold uppercase tracking-wider text-neutral-800">
                Cart
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#111111] flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white">DF</span>
                  </div>
                  <span className="font-heading font-bold tracking-widest text-[#111111]">
                    DESIGN<span className="text-[#B08D57]">FRAME</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-500 hover:text-neutral-900"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search in Drawer */}
              <div className="p-4 border-b border-[#F7F5F1]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-[#F7F5F1] rounded-md text-sm text-neutral-500"
                >
                  <Search className="w-4 h-4 text-[#B08D57]" />
                  <span>Search artwork or frame styles...</span>
                </button>
              </div>

              {/* Nav Items */}
              <div className="py-2">
                {navItems.map((item) => (
                  <button
                    key={item.section}
                    onClick={() => handleNavClick(item.section)}
                    className="w-full flex items-center justify-between px-6 py-3.5 text-sm uppercase tracking-wider text-neutral-800 hover:bg-[#F7F5F1] hover:text-[#B08D57] transition-colors text-left"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </button>
                ))}
              </div>

              {/* Highlight Custom Studio */}
              <div className="px-5 py-4">
                <button
                  onClick={() => handleNavClick('custom-builder')}
                  className="w-full bg-[#111111] text-white py-3 px-4 text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#B08D57] transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#D4B77A]" />
                  <span>Launch Frame Studio</span>
                </button>
              </div>
            </div>

            {/* Bottom Support Info */}
            <div className="p-5 bg-[#F7F5F1] border-t border-[#E5E5E5] text-xs text-neutral-600 space-y-2">
              <p className="font-semibold text-neutral-900">Customer Support Pakistan</p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#B08D57]" /> +92 313 2017397
              </p>
              <p className="text-[11px] text-neutral-500">Mon - Sat: 10:00 AM - 9:00 PM PKT</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
