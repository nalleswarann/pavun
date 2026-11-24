import React, { useState, useMemo } from 'react';
import type { Product, SareeCategory } from '../types/ecommerce';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { WhatsAppIcon } from '../components/Icons';
import './CollectionPage.css';

interface CollectionPageProps {
  pageId: SareeCategory;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onNavigateHome: () => void;
  onOpenCustomerCare: () => void;
}

interface PageMeta {
  title: string;
  tagline: string;
  subcategories: string[];
  bannerDesc: string;
}

const META_MAP: Record<SareeCategory, PageMeta> = {
  sarees: {
    title: 'HERITAGE HANDLOOM SAREES',
    tagline: 'Varanasi Pit-Looms, Kanjivaram & Metallic Tissue Drapes',
    subcategories: ['All', 'Banarasi Katan Silk', 'Kanjivaram Temple Silk', 'Tissue & Gold Weaves', 'Organza & Chanderi', 'Concept Drapes'],
    bannerDesc:
      'Centuries of Indian weaving heritage captured in pure katan silk, intricate silver zari jaal, and featherlight gold tissue drapes created by generational weavers.',
  },
  banarasi: {
    title: 'IMPERIAL BANARASI KATAN SILK',
    tagline: 'Sacred Pit-Looms of Varanasi',
    subcategories: ['All', 'Banarasi Katan Silk'],
    bannerDesc:
      'Woven with real tested gold and silver zari on centuries-old Varanasi pit looms by master artisans.',
  },
  kanjivaram: {
    title: 'SACRED KANJIVARAM TEMPLE SILKS',
    tagline: 'Korvai Weaves & Heavy Mulberry Silk',
    subcategories: ['All', 'Kanjivaram Temple Silk', 'Heritage Handloom'],
    bannerDesc:
      'Interlocking Korvai borders and rich contrast zari pallus woven with 3-ply pure mulberry silk.',
  },
  tissue: {
    title: 'PURE GOLD TISSUE & ZARI DRAPES',
    tagline: 'Liquid-Gold Red Carpet Silhouettes',
    subcategories: ['All', 'Tissue & Gold Weaves', 'Concept Drapes'],
    bannerDesc:
      'Ethereal metallic weaves offering a fluid liquid-gold drape that glimmers under evening chandeliers.',
  },
  organza: {
    title: 'GOSSAMER ORGANZA & CHANDERI',
    tagline: 'Hand-Painted Florals & Scalloped Zardozi',
    subcategories: ['All', 'Organza & Chanderi'],
    bannerDesc:
      'Airy, featherlight sheer silks hand-painted with botanical blooms and framed by exquisite pearl and zardozi borders.',
  },
};

export const CollectionPage: React.FC<CollectionPageProps> = ({
  pageId,
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onNavigateHome,
  onOpenCustomerCare,
}) => {
  const meta = META_MAP[pageId] || META_MAP.sarees;
  const [selectedSubcat, setSelectedSubcat] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Filter products by saree category
  const baseProducts = useMemo(() => {
    if (pageId === 'sarees') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === pageId);
  }, [pageId]);

  // Unique colors available in this category
  const availableColors = useMemo(() => {
    const set = new Set<string>();
    baseProducts.forEach((p) => set.add(p.color));
    return ['All', ...Array.from(set)];
  }, [baseProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...baseProducts];

    if (selectedSubcat !== 'All') {
      result = result.filter(
        (p) => p.subcategory.toLowerCase().includes(selectedSubcat.toLowerCase())
      );
    }

    if (selectedColor !== 'All') {
      result = result.filter((p) => p.color === selectedColor);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [baseProducts, selectedSubcat, selectedColor, sortBy]);

  return (
    <div className="pavun-collection-page">
      {/* Category Hero Banner */}
      <section className="pavun-collection-hero">
        <div className="pavun-collection-hero__container">
          {/* Breadcrumb Navigation */}
          <nav className="pavun-collection-breadcrumb" aria-label="Breadcrumb">
            <button
              type="button"
              className="pavun-collection-breadcrumb__link"
              onClick={onNavigateHome}
            >
              HOME
            </button>
            <span className="pavun-collection-breadcrumb__sep">/</span>
            <span className="pavun-collection-breadcrumb__current">
              {meta.title}
            </span>
          </nav>

          <span className="pavun-collection-hero__eyebrow pavun-reveal-eyebrow">
            {meta.tagline}
          </span>
          <h1 className="pavun-collection-hero__title pavun-reveal-title">
            {meta.title}
          </h1>
          <div className="pavun-collection-hero__divider pavun-reveal-divider" />
          <p className="pavun-collection-hero__desc pavun-reveal-text">
            {meta.bannerDesc}
          </p>
        </div>
      </section>

      {/* Main Listing Section */}
      <section className="pavun-collection-body">
        <div className="pavun-collection-container">
          
          {/* Filters & Sorting Toolbar */}
          <div className="pavun-collection-toolbar">
            
            {/* Subcategory Pills */}
            <div className="pavun-collection-subcats">
              {meta.subcategories.map((subcat) => (
                <button
                  key={subcat}
                  type="button"
                  className={`pavun-subcat-pill ${selectedSubcat === subcat ? 'pavun-subcat-pill--active' : ''}`}
                  onClick={() => setSelectedSubcat(subcat)}
                >
                  {subcat.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Right Side: Color Filter & Sort */}
            <div className="pavun-collection-actions">
              
              {/* Color Filter Dropdown */}
              {availableColors.length > 2 && (
                <div className="pavun-filter-select-wrap">
                  <label htmlFor="color-filter" className="pavun-filter-label">COLOR:</label>
                  <select
                    id="color-filter"
                    className="pavun-filter-select"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    {availableColors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Sort By Dropdown */}
              <div className="pavun-filter-select-wrap">
                <label htmlFor="sort-filter" className="pavun-filter-label">SORT:</label>
                <select
                  id="sort-filter"
                  className="pavun-filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

            </div>

          </div>

          {/* Product Count Indicator */}
          <div className="pavun-collection-count-bar">
            <span>SHOWING {filteredProducts.length} ATELIER SAREE HEIRLOOMS</span>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="pavun-collection-grid pavun-reveal-stagger">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                  onAddToCart={(p, size) => onAddToCart(p, size)}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="pavun-collection-empty">
              <p>No heirloom sarees found matching your current filter criteria.</p>
              <button
                type="button"
                className="pavun-collection-reset-btn"
                onClick={() => {
                  setSelectedSubcat('All');
                  setSelectedColor('All');
                }}
              >
                RESET FILTERS
              </button>
            </div>
          )}

          {/* Concierge Custom Order Help */}
          <div className="pavun-collection-concierge-card pavun-reveal-card">
            <div className="pavun-concierge-info">
              <h3>SEEKING A BESPOKE SAREE WEAVE?</h3>
              <p>
                Our master weavers in Varanasi and Kanchipuram create custom zari monograms, personalized wedding date weaves, and private trousseau color palettes.
              </p>
            </div>
            <button
              type="button"
              className="pavun-concierge-btn"
              onClick={onOpenCustomerCare}
            >
              <WhatsAppIcon size={18} />
              <span>CONSULT SAREE CONCIERGE</span>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CollectionPage;
