import React, { useState } from 'react';
import { 
  Product, 
  ProductCategory, 
  CartItem, 
  OrderDetails, 
  BundleDeal 
} from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBenefits } from './components/TrustBenefits';
import { CategorySection } from './components/CategorySection';
import { BestSellers } from './components/BestSellers';
import { CustomFrameBuilder } from './components/CustomFrameBuilder';
import { PromotionalBanner } from './components/PromotionalBanner';
import { CollectionsSection } from './components/CollectionsSection';
import { BundleDeals } from './components/BundleDeals';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramGallery } from './components/InstagramGallery';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { AccountOrderModal } from './components/AccountOrderModal';
import { ShopCatalogView } from './components/ShopCatalogView';
import { AboutContactView } from './components/AboutContactView';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'about' | 'contact'>('home');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<ProductCategory | 'all'>('all');

  // E-commerce Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-1',
      productId: 'df-1',
      name: 'Surah Al-Ikhlas Kufic Inscription',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1000&q=80',
      size: '16 × 20',
      color: 'Gold',
      price: 3699,
      quantity: 1,
    }
  ]);

  const [wishlistIds, setWishlistIds] = useState<string[]>(['df-3', 'df-5']);
  
  // Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [selectedProductForQuickView, setSelectedProductForQuickView] = useState<Product | null>(null);

  // Notifications
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({
      id: String(Date.now()),
      type,
      message,
    });
  };

  // Cart Handlers
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
    showToast(`Added "${item.name}" to cart!`);
    setIsCartOpen(true);
  };

  const handleAddProductDirectlyToCart = (product: Product) => {
    const item: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      size: product.sizes[1] || product.sizes[0],
      color: product.colors[0],
      price: product.salePrice,
      quantity: 1,
    };
    handleAddToCart(item);
  };

  const handleAddBundleToCart = (bundle: BundleDeal) => {
    const item: CartItem = {
      id: `bundle-${bundle.id}-${Date.now()}`,
      productId: bundle.id,
      name: `${bundle.title} (${bundle.subtitle})`,
      image: bundle.image,
      size: '16 × 20',
      color: 'Black',
      style: bundle.items.join(' + '),
      price: bundle.salePrice,
      quantity: 1,
    };
    handleAddToCart(item);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    showToast('Item removed from cart', 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist!`);
        return [...prev, product.id];
      }
    });
  };

  // Navigation router
  const handleNavigate = (section: string, category?: ProductCategory) => {
    if (section === 'shop') {
      setCurrentView('shop');
      setActiveCategoryFilter(category || 'all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (section === 'about') {
      setCurrentView('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (section === 'contact') {
      setCurrentView('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (section === 'custom-builder') {
      if (currentView !== 'home') setCurrentView('home');
      setTimeout(() => {
        document.getElementById('custom-builder')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (section === 'bundles') {
      if (currentView !== 'home') setCurrentView('home');
      setTimeout(() => {
        document.getElementById('bundles')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (section === 'bestsellers') {
      if (currentView !== 'home') setCurrentView('home');
      setTimeout(() => {
        document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (section === 'categories') {
      if (currentView !== 'home') setCurrentView('home');
      setTimeout(() => {
        document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (section === 'collections') {
      if (currentView !== 'home') setCurrentView('home');
      setTimeout(() => {
        document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    // Default to home
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F7F5F1] text-neutral-900 font-sans selection:bg-[#B08D57] selection:text-white flex flex-col justify-between">
      
      {/* Sticky Top Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsOrderTrackingOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'shop' ? (
          /* Dedicated Shop Catalog View */
          <ShopCatalogView
            products={PRODUCTS}
            initialCategory={activeCategoryFilter}
            onQuickView={(p) => setSelectedProductForQuickView(p)}
            onAddToCart={handleAddProductDirectlyToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onSelectProduct={(p) => setSelectedProductForDetail(p)}
          />
        ) : currentView === 'about' || currentView === 'contact' ? (
          /* About & Contact View */
          <AboutContactView initialTab={currentView} />
        ) : (
          /* Editorial Homepage Layout */
          <div>
            {/* 1. Hero Section */}
            <Hero
              onShopClick={() => handleNavigate('shop')}
              onCustomFrameClick={() => handleNavigate('custom-builder')}
            />

            {/* 2. Trust Benefits */}
            <TrustBenefits />

            {/* 3. Category Showcase Grid */}
            <CategorySection
              onSelectCategory={(cat) => handleNavigate('shop', cat)}
            />

            {/* 4. Best Sellers (Tabs & Products) */}
            <BestSellers
              products={PRODUCTS}
              onQuickView={(p) => setSelectedProductForQuickView(p)}
              onAddToCart={handleAddProductDirectlyToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onSelectProduct={(p) => setSelectedProductForDetail(p)}
              onViewAllShop={() => handleNavigate('shop')}
            />

            {/* 5. Custom Frame Builder Studio */}
            <CustomFrameBuilder
              onAddToCart={handleAddToCart}
            />

            {/* 6. Promotional High-Contrast Banner */}
            <PromotionalBanner
              onCustomFrameClick={() => handleNavigate('custom-builder')}
            />

            {/* 7. Signature Collections (Bento Grid) */}
            <CollectionsSection
              onSelectCollection={(cat) => handleNavigate('shop', cat)}
            />

            {/* 8. Gallery Wall Bundle Deals */}
            <BundleDeals
              onAddBundleToCart={handleAddBundleToCart}
              onBrowseBundles={() => handleNavigate('shop')}
            />

            {/* 9. Verified Customer Reviews */}
            <CustomerReviews />

            {/* 10. Community Instagram Gallery */}
            <InstagramGallery />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAccount={() => setIsOrderTrackingOpen(true)}
      />

      {/* Floating WhatsApp Button */}
      <WhatsAppFloatingButton />

      {/* Modals & Slide-out Drawers */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={(item) => {
          handleAddToCart(item);
          setSelectedProductForDetail(null);
        }}
        onBuyNow={(item) => {
          handleAddToCart(item);
          setSelectedProductForDetail(null);
          setIsCheckoutOpen(true);
        }}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProductForDetail ? wishlistIds.includes(selectedProductForDetail.id) : false}
        relatedProducts={
          selectedProductForDetail
            ? PRODUCTS.filter((p) => p.id !== selectedProductForDetail.id && p.category === selectedProductForDetail.category)
            : []
        }
        onSelectProduct={(p) => setSelectedProductForDetail(p)}
      />

      <QuickViewModal
        product={selectedProductForQuickView}
        onClose={() => setSelectedProductForQuickView(null)}
        onAddToCart={(item) => {
          handleAddToCart(item);
          setSelectedProductForQuickView(null);
        }}
        onViewFullDetails={(p) => {
          setSelectedProductForQuickView(null);
          setSelectedProductForDetail(p);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onContinueShopping={() => setIsCartOpen(false)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={(id) => {
          setWishlistIds((prev) => prev.filter((pid) => pid !== id));
        }}
        onAddToCart={(prod) => {
          handleAddProductDirectlyToCart(prod);
        }}
        onSelectProduct={(prod) => {
          setSelectedProductForDetail(prod);
        }}
        onBrowseShop={() => {
          handleNavigate('shop');
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderPlaced={(order) => {
          showToast(`Order #${order.orderId} placed successfully!`);
        }}
        onClearCart={handleClearCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProductForDetail(p)}
        onSelectCategory={(cat) => handleNavigate('shop', cat)}
      />

      <AccountOrderModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
      />

      {/* Feedback Toast Notification */}
      <Toast
        toast={toast}
        onDismiss={() => setToast(null)}
      />

    </div>
  );
}
