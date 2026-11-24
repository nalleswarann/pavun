import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { SearchIcon, BagIcon, MenuIcon, HeartIcon } from './Icons';
import { NAV_ITEMS, type NavItem } from '../data/navigation';
import './Header.css';

export interface HeaderProps {
  cartCount?: number;
  wishlistCount?: number;
  onOpenMobileMenu?: () => void;
  onOpenSearch?: () => void;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenAccount?: () => void;
  onOpenCustomerCare?: () => void;
  activeNav?: string;
  onSelectNav?: (navId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount = 0,
  wishlistCount = 0,
  onOpenMobileMenu,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenCustomerCare,
  activeNav = 'home',
  onSelectNav,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // Monitor scroll for subtle elevation and sticky state
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldBeScrolled = window.scrollY > 20;
          if (shouldBeScrolled !== isScrolledRef.current) {
            isScrolledRef.current = shouldBeScrolled;
            setIsScrolled(shouldBeScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, navItem: NavItem) => {
    e.preventDefault();
    if (onSelectNav) {
      onSelectNav(navItem.id);
    }
    setHoveredNav(null);
  };

  const handleAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenAccount) {
      onOpenAccount();
    } else if (onOpenCustomerCare) {
      onOpenCustomerCare();
    }
  };

  const activeMegaItem = NAV_ITEMS.find((item) => item.id === hoveredNav && item.subcategories);

  return (
    <header className={`pavun-header ${isScrolled ? 'pavun-header--scrolled' : ''}`}>
      {/* Main Single-Row Luxury Masthead */}
      <div className="pavun-header__main-row">
        <div className="pavun-header__container">
          
          {/* Left Side: Hamburger (Mobile/Tablet) + Search with Text */}
          <div className="pavun-header__left">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="pavun-header__menu-btn"
              onClick={onOpenMobileMenu}
              aria-label="Open Navigation Menu"
            >
              <MenuIcon size={20} />
            </button>

            {/* Minimalist Search Trigger ("🔍 Search") */}
            <button
              type="button"
              className="pavun-header__search-trigger"
              onClick={onOpenSearch}
              aria-label="Search Collection"
            >
              <SearchIcon size={18} className="pavun-header__search-icon" />
              <span className="pavun-header__search-text">Search</span>
            </button>
          </div>

          {/* Center: Horizontally Centered Brand Logo */}
          <div className="pavun-header__center">
            <Logo
              variant="header"
              onClick={() => {
                if (onSelectNav) onSelectNav('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Right Side: Wishlist Heart + Account + Cart with Bag Icon */}
          <div className="pavun-header__right">
            
            {/* Wishlist Heart Icon */}
            <button
              type="button"
              className="pavun-header__icon-btn pavun-header__wishlist-btn"
              onClick={onOpenWishlist || onOpenCart}
              aria-label={`Wishlist, ${wishlistCount} items`}
              title="Saved Heirloom Sarees"
            >
              <HeartIcon size={20} className="pavun-header__heart-icon" />
              {wishlistCount > 0 && (
                <span className="pavun-header__badge">{wishlistCount}</span>
              )}
            </button>

            {/* Account Link / Button */}
            <button
              type="button"
              className="pavun-header__text-btn pavun-header__account-btn"
              onClick={handleAccountClick}
              aria-label="Client Account Services"
            >
              <span>Account</span>
            </button>

            {/* Cart Button: "Cart [🛍 0]" */}
            <button
              type="button"
              className="pavun-header__cart-btn"
              onClick={onOpenCart}
              aria-label={`Shopping Cart, ${cartCount} items`}
              title="Shopping Cart"
            >
              <span className="pavun-header__cart-text">Cart</span>
              <span className="pavun-header__cart-icon-wrap">
                <BagIcon size={20} className="pavun-header__bag-icon" />
                {cartCount > 0 && (
                  <span className="pavun-header__badge pavun-header__badge--cart">
                    {cartCount}
                  </span>
                )}
              </span>
            </button>

          </div>

        </div>
      </div>

      {/* Second Row: Centered Haute Couture Saree Navigation */}
      <nav
        className="pavun-header__nav"
        aria-label="Main Navigation"
        onMouseLeave={() => setHoveredNav(null)}
      >
        <div className="pavun-header__container">
          <ul className="pavun-header__nav-list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.id;
              const hasSub = Boolean(item.subcategories && item.subcategories.length > 0);

              return (
                <li
                  key={item.id}
                  className={`pavun-header__nav-item ${isActive ? 'pavun-header__nav-item--active' : ''} ${hasSub ? 'pavun-header__nav-item--has-sub' : ''}`}
                  onMouseEnter={() => setHoveredNav(item.id)}
                >
                  <a
                    href={item.href}
                    className="pavun-header__nav-link"
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mega Menu Dropdown */}
        {activeMegaItem && (
          <div
            className="pavun-header__mega-dropdown"
            onMouseEnter={() => setHoveredNav(activeMegaItem.id)}
            onMouseLeave={() => setHoveredNav(null)}
          >
            <div className="pavun-header__container pavun-header__mega-container">
              <div className="pavun-header__mega-columns">
                {activeMegaItem.subcategories?.map((col, idx) => (
                  <div key={idx} className="pavun-header__mega-col">
                    <h4 className="pavun-header__mega-title">{col.title}</h4>
                    <ul className="pavun-header__mega-links">
                      {col.items.map((subItem, sIdx) => (
                        <li key={sIdx}>
                          <a
                            href={subItem.href}
                            className="pavun-header__mega-link"
                            onClick={(e) => {
                              e.preventDefault();
                              if (onSelectNav) {
                                const navTarget = subItem.href.replace('#', '');
                                onSelectNav(navTarget);
                              }
                              setHoveredNav(null);
                            }}
                          >
                            {subItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Featured Saree Highlight in Mega Menu */}
                {activeMegaItem.featuredBanner && (
                  <div
                    className="pavun-header__mega-featured"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (onSelectNav) onSelectNav(activeMegaItem.id);
                      setHoveredNav(null);
                    }}
                  >
                    {activeMegaItem.featuredBanner.imageSrc && (
                      <div className="pavun-header__featured-img-wrap">
                        <img
                          src={activeMegaItem.featuredBanner.imageSrc}
                          alt={activeMegaItem.featuredBanner.title}
                          className="pavun-header__featured-img"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <span className="pavun-header__featured-tag">HEIRLOOM CURATION</span>
                    <h5 className="pavun-header__featured-title">{activeMegaItem.featuredBanner.title}</h5>
                    <p className="pavun-header__featured-desc">{activeMegaItem.featuredBanner.subtitle}</p>
                    <span className="pavun-header__featured-cta">{activeMegaItem.featuredBanner.cta} →</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
