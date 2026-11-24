import React, { useState, useRef } from 'react';
import type { Product, SareeCategory } from '../types/ecommerce';
import { PRODUCTS } from '../data/products';
import { HeartIcon, BagIcon, EyeIcon, ArrowRightIcon, SparkleIcon, CheckIcon } from './Icons';
import './NewArrivalsSection.css';

interface NewArrivalsSectionProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (product: Product) => void;
  onExploreCategory?: (category: string) => void;
}

type FilterCategory = 'all' | SareeCategory;

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  onQuickView,
  onAddToCart,
  wishlistIds = [],
  onToggleWishlist,
  onExploreCategory,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Filter products tagged or suitable for New Arrivals
  const filteredProducts = PRODUCTS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  }).slice(0, 8); // Top curated creations

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'Standard 5.5m + 1m Blouse Piece';
    onAddToCart(product, defaultSize);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1800);
  };

  return (
    <section className="pavun-new-arrivals" id="new-arrivals" aria-label="New Arrivals">
      <div className="pavun-new-arrivals__container">
        
        {/* Section Header */}
        <header className="pavun-new-arrivals__header">
          <div className="pavun-new-arrivals__eyebrow pavun-reveal-eyebrow">
            <SparkleIcon size={14} className="pavun-new-arrivals__sparkle" />
            <span>AUTUMN • WINTER 2026 COUTURE</span>
            <SparkleIcon size={14} className="pavun-new-arrivals__sparkle" />
          </div>

          <h2 className="pavun-new-arrivals__title pavun-reveal-title">NEW ARRIVALS</h2>
          
          <div className="pavun-new-arrivals__divider pavun-reveal-divider" />

          <p className="pavun-new-arrivals__subtitle pavun-reveal-text">
            A symphony of pure gold zari, generational pit-loom weaves, and ethereal gossamer drapes.
            Handcrafted by master artisans for the modern discerning royalty.
          </p>

          {/* Interactive Saree Category Filter Tabs */}
          <nav className="pavun-new-arrivals__filters pavun-reveal-text" aria-label="New arrivals filter">
            <button
              type="button"
              className={`pavun-new-arrivals__tab ${activeFilter === 'all' ? 'pavun-new-arrivals__tab--active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              ALL SAREES
            </button>
            <button
              type="button"
              className={`pavun-new-arrivals__tab ${activeFilter === 'banarasi' ? 'pavun-new-arrivals__tab--active' : ''}`}
              onClick={() => setActiveFilter('banarasi')}
            >
              BANARASI SILK
            </button>
            <button
              type="button"
              className={`pavun-new-arrivals__tab ${activeFilter === 'kanjivaram' ? 'pavun-new-arrivals__tab--active' : ''}`}
              onClick={() => setActiveFilter('kanjivaram')}
            >
              KANJIVARAM SILK
            </button>
            <button
              type="button"
              className={`pavun-new-arrivals__tab ${activeFilter === 'tissue' ? 'pavun-new-arrivals__tab--active' : ''}`}
              onClick={() => setActiveFilter('tissue')}
            >
              TISSUE &amp; ZARI
            </button>
            <button
              type="button"
              className={`pavun-new-arrivals__tab ${activeFilter === 'organza' ? 'pavun-new-arrivals__tab--active' : ''}`}
              onClick={() => setActiveFilter('organza')}
            >
              ORGANZA &amp; CHANDERI
            </button>
          </nav>
        </header>

        {/* Carousel Controls (Desktop) */}
        <div className="pavun-new-arrivals__controls-bar">
          <span className="pavun-new-arrivals__count">
            SHOWING {filteredProducts.length} ATELIER HEIRLOOMS
          </span>
          <div className="pavun-new-arrivals__arrows">
            <button
              type="button"
              className="pavun-new-arrivals__arrow"
              onClick={() => handleScroll('left')}
              aria-label="Previous Products"
            >
              ‹
            </button>
            <button
              type="button"
              className="pavun-new-arrivals__arrow"
              onClick={() => handleScroll('right')}
              aria-label="Next Products"
            >
              ›
            </button>
          </div>
        </div>

        {/* Products Scroll Track */}
        <div className="pavun-new-arrivals__track pavun-reveal-stagger" ref={trackRef}>
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isJustAdded = addedProductId === product.id;

            return (
              <article
                key={product.id}
                className="pavun-new-arrivals__card pavun-reveal-card"
                onClick={() => onQuickView(product)}
              >
                {/* Image Media Container */}
                <div className="pavun-new-arrivals__media">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="pavun-new-arrivals__img"
                    loading="lazy"
                  />

                  {/* Luxury Tag Badge */}
                  {product.tag && (
                    <span className="pavun-new-arrivals__badge">
                      {product.tag}
                    </span>
                  )}

                  {/* Wishlist Heart Button */}
                  <button
                    type="button"
                    className={`pavun-new-arrivals__wishlist-btn ${isWishlisted ? 'pavun-new-arrivals__wishlist-btn--active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onToggleWishlist) onToggleWishlist(product);
                    }}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <HeartIcon size={16} filled={isWishlisted} />
                  </button>

                  {/* Card Hover Action Bar */}
                  <div className="pavun-new-arrivals__actions">
                    <button
                      type="button"
                      className="pavun-new-arrivals__action-btn pavun-new-arrivals__action-btn--quick"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                    >
                      <EyeIcon size={15} />
                      <span>VIEW PIECE</span>
                    </button>

                    <button
                      type="button"
                      className={`pavun-new-arrivals__action-btn pavun-new-arrivals__action-btn--add ${isJustAdded ? 'pavun-new-arrivals__action-btn--added' : ''}`}
                      onClick={(e) => handleQuickAdd(e, product)}
                    >
                      {isJustAdded ? (
                        <>
                          <CheckIcon size={15} />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <BagIcon size={15} />
                          <span>ADD TO BAG</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Product Meta */}
                <div className="pavun-new-arrivals__info">
                  <div className="pavun-new-arrivals__meta-top">
                    <span className="pavun-new-arrivals__category">{product.subcategory}</span>
                    <span className="pavun-new-arrivals__color-dot" title={product.color} />
                  </div>

                  <h3 className="pavun-new-arrivals__item-title">
                    {product.title}
                  </h3>

                  <p className="pavun-new-arrivals__fabric">
                    {product.fabric}
                  </p>

                  <div className="pavun-new-arrivals__price-row">
                    <span className="pavun-new-arrivals__price">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="pavun-new-arrivals__original-price">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA to View All */}
        <div className="pavun-new-arrivals__footer-cta pavun-reveal-text">
          <button
            type="button"
            className="pavun-new-arrivals__all-btn"
            onClick={() => {
              const targetCategory = activeFilter === 'all' ? 'sarees' : activeFilter;
              if (onExploreCategory) onExploreCategory(targetCategory);
            }}
          >
            <span>EXPLORE FULL {activeFilter === 'all' ? 'SAREE' : activeFilter.toUpperCase()} COLLECTION</span>
            <ArrowRightIcon size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default NewArrivalsSection;
