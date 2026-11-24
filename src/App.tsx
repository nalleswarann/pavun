import { useState, useEffect } from 'react';
import type { PageId, Product, CartItem } from './types/ecommerce';
import { PRODUCTS } from './data/products';
import Header from './components/Header';
import MobileDrawer from './components/MobileDrawer';
import HeroBanner from './components/HeroBanner';
import NewArrivalsSection from './components/NewArrivalsSection';
import ShopBySilhouetteSection from './components/ShopBySilhouetteSection';
import SareeCinemaSection from './components/SareeCinemaSection';
import RealBridesSection from './components/RealBridesSection';
import AtelierBookingBanner from './components/AtelierBookingBanner';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import CartDrawer from './components/CartDrawer';
import CustomerCareModal from './components/CustomerCareModal';

// Pages
import CollectionPage from './pages/CollectionPage';
import LookbookPage from './pages/LookbookPage';
import StoresPage from './pages/StoresPage';
import ContactPage from './pages/ContactPage';
import ProductPage from './pages/ProductPage';
import ScrollytellingTracker from './components/ScrollytellingTracker';
import useScrollReveal from './hooks/useScrollReveal';
import useSmoothScroll from './hooks/useSmoothScroll';

import './App.css';

export function App() {
  const [activeNav, setActiveNav] = useState<PageId>(() => {
    const rawHash = window.location.hash.replace('#', '') as PageId;
    const validPages: PageId[] = [
      'home',
      'sarees',
      'banarasi',
      'kanjivaram',
      'tissue',
      'organza',
      'collections',
      'stores',
      'contact',
      'product',
    ];
    return validPages.includes(rawHash) ? rawHash : 'home';
  });

  // Keep state synced with browser URL hash navigation (back/forward & direct links)
  useEffect(() => {
    const onHashChange = () => {
      const rawHash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'sarees',
        'banarasi',
        'kanjivaram',
        'tissue',
        'organza',
        'collections',
        'stores',
        'contact',
        'product',
      ];
      if (rawHash && validPages.includes(rawHash)) {
        setActiveNav(rawHash);
      } else if (!rawHash) {
        setActiveNav('home');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Activate modern scroll animations on every route navigation & mount
  useScrollReveal(activeNav);

  // E-commerce state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Pure Banarasi Katan Silk Shikargah Saree
      quantity: 1,
      selectedSize: 'Standard 5.5m + 1m Blouse Piece',
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['sar-01', 'sar-02']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals & Drawers state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomerCareOpen, setIsCustomerCareOpen] = useState(false);

  // Total cart count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Preserves 100% native zero-lag 120Hz/144Hz compositor scrolling
  const isAnyModalOpen = isMobileMenuOpen || isSearchOpen || isCartOpen || isCustomerCareOpen;
  useSmoothScroll({ enabled: false, isModalOpen: isAnyModalOpen });

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeNav]);

  // Cart operations
  const handleAddToCart = (product: Product, size: string, quantity = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity: newQty };
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Navigation router
  const handleNavigate = (page: string) => {
    const validPages: PageId[] = [
      'home',
      'sarees',
      'banarasi',
      'kanjivaram',
      'tissue',
      'organza',
      'collections',
      'stores',
      'contact',
      'product',
    ];
    let target = page.replace('#', '') as PageId;
    if (target === ('lehengas' as PageId) || target === ('suits' as PageId)) {
      target = 'sarees';
    }
    if (validPages.includes(target)) {
      setActiveNav(target);
      window.location.hash = target === 'home' ? '' : target;
    } else {
      setActiveNav('home');
      window.location.hash = '';
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProduct = (product?: Product | null) => {
    if (product) {
      setSelectedProduct(product);
    }
    setActiveNav('product');
    window.location.hash = 'product';
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pavun-app-root">
      {/* Luxury Scrollytelling Floating Chapter Rail */}
      <ScrollytellingTracker currentPage={activeNav} />

      {/* Main Fluid Site Container */}
      <div className="pavun-main-wrapper">
        
        {/* Navigation & Header */}
        <Header
          cartCount={cartCount}
          wishlistCount={wishlistIds.length}
          activeNav={activeNav}
          onSelectNav={handleNavigate}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsCartOpen(true)}
          onOpenAccount={() => setIsCustomerCareOpen(true)}
          onOpenCustomerCare={() => setIsCustomerCareOpen(true)}
        />

        {/* Dynamic Route Render */}
        <main className="pavun-page-outlet">
          {activeNav === 'home' && (
            <>
              <HeroBanner
                onOpenCustomerCare={() => setIsCustomerCareOpen(true)}
                onExploreCategory={(cat) => handleNavigate(cat)}
              />
              <NewArrivalsSection
                onQuickView={(p) => handleOpenProduct(p)}
                onAddToCart={(p, size) => handleAddToCart(p, size, 1)}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onExploreCategory={(cat) => handleNavigate(cat)}
              />
              <ShopBySilhouetteSection
                onExploreCategory={(cat) => handleNavigate(cat)}
              />
              <SareeCinemaSection
                onOpenCustomerCare={() => setIsCustomerCareOpen(true)}
                onExploreCollection={() => handleNavigate('sarees')}
              />
              <RealBridesSection
                onQuickView={(p) => handleOpenProduct(p)}
              />
              <AtelierBookingBanner
                onOpenCustomerCare={() => setIsCustomerCareOpen(true)}
              />
            </>
          )}

          {(activeNav === 'sarees' ||
            activeNav === 'banarasi' ||
            activeNav === 'kanjivaram' ||
            activeNav === 'tissue' ||
            activeNav === 'organza') && (
            <CollectionPage
              key={activeNav}
              pageId={activeNav}
              onQuickView={(p) => handleOpenProduct(p)}
              onAddToCart={(p, size) => handleAddToCart(p, size, 1)}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onNavigateHome={() => handleNavigate('home')}
              onOpenCustomerCare={() => setIsCustomerCareOpen(true)}
            />
          )}

          {activeNav === 'collections' && (
            <LookbookPage
              onQuickView={(p) => handleOpenProduct(p)}
              onNavigateCategory={(cat) => handleNavigate(cat)}
              onNavigateHome={() => handleNavigate('home')}
            />
          )}

          {activeNav === 'product' && (
            <ProductPage
              product={selectedProduct}
              onAddToCart={(p, size, qty) => handleAddToCart(p, size, qty)}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onNavigateHome={() => handleNavigate('home')}
              onNavigateCategory={(cat) => handleNavigate(cat)}
              onSelectProduct={(p) => handleOpenProduct(p)}
              onOpenCustomerCare={() => setIsCustomerCareOpen(true)}
              onOpenCart={() => setIsCartOpen(true)}
            />
          )}

          {activeNav === 'stores' && (
            <StoresPage
              onNavigateHome={() => handleNavigate('home')}
              onOpenCustomerCare={() => setIsCustomerCareOpen(true)}
            />
          )}

          {activeNav === 'contact' && (
            <ContactPage
              onNavigateHome={() => handleNavigate('home')}
              onOpenCustomerCare={() => setIsCustomerCareOpen(true)}
            />
          )}
        </main>

        {/* Haute Couture Footer */}
        <Footer
          onOpenCustomerCare={() => setIsCustomerCareOpen(true)}
          onNavigatePage={handleNavigate}
        />
      </div>

      {/* Mobile Drawer (Slide-in Navigation) */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeNav={activeNav}
        onSelectNav={handleNavigate}
        onOpenSearch={() => {
          setIsMobileMenuOpen(false);
          setIsSearchOpen(true);
        }}
        onOpenCustomerCare={() => {
          setIsMobileMenuOpen(false);
          setIsCustomerCareOpen(true);
        }}
      />

      {/* Luxury Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => handleOpenProduct(p)}
        onSelectCategory={(cat) => handleNavigate(cat)}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onExploreProducts={() => handleNavigate('sarees')}
      />

      {/* WhatsApp Concierge Customer Care Modal */}
      <CustomerCareModal
        isOpen={isCustomerCareOpen}
        onClose={() => setIsCustomerCareOpen(false)}
      />
    </div>
  );
}

export default App;
