import React, { useState, useEffect } from 'react';
import type { Product } from '../types/ecommerce';
import { PRODUCTS } from '../data/products';
import {
  HeartIcon,
  BagIcon,
  CloseIcon,
  StorePinIcon,
  SparkleIcon,
  ShareIcon,
  RulerIcon,
  StylistIcon,
  InfoCircleIcon,
  CopyIcon,
  ViewSimilarIcon,
} from '../components/Icons';
import aariyanaCorsetDetail from '../assets/products/aariyana/aariyana_corset_handwork_detail.jpg';
import sareeTissueGold from '../assets/products/saree_tissue_gold.jpg';
import sareeChampagneTissue from '../assets/products/saree_champagne_tissue.jpg';
import './ProductPage.css';

interface ProductPageProps {
  product?: Product | null;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateCategory?: (category: string) => void;
  onSelectProduct?: (product: Product) => void;
  onOpenCustomerCare?: () => void;
  onOpenCart?: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  product: initialProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onNavigateHome,
  onNavigateCategory,
  onSelectProduct,
  onOpenCustomerCare,
  onOpenCart,
}) => {
  // Default to Mrunal Khimji flagship product (reference), then Aariyana, then first
  const activeProduct =
    initialProduct ||
    PRODUCTS.find((p) => p.id === 'sar-mrunal-navy') ||
    PRODUCTS.find((p) => p.id === 'sar-aariyana-724969') ||
    PRODUCTS[0];

  const fallbackGallery = [
    activeProduct.image,
    activeProduct.secondaryImage || activeProduct.image,
    activeProduct.image,
  ];
  const rawGallery =
    activeProduct.gallery && activeProduct.gallery.length > 0
      ? activeProduct.gallery
      : fallbackGallery;
  const galleryImages = rawGallery.filter(Boolean);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    activeProduct.sizes.includes('M') ? 'M' : activeProduct.sizes[0] || 'M'
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [sizeUnit, setSizeUnit] = useState<'in' | 'cm'>('in');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');
  const [pincode, setPincode] = useState('600001');
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [activeLightbox, setActiveLightbox] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const [prevProductId, setPrevProductId] = useState(activeProduct.id);
  if (prevProductId !== activeProduct.id) {
    setPrevProductId(activeProduct.id);
    setActiveImageIndex(0);
    setSelectedSize(
      activeProduct.sizes.includes('M') ? 'M' : activeProduct.sizes[0] || 'M'
    );
  }

  // Scroll to top on mount or product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeProduct.id]);

  const isWishlisted = wishlistIds.includes(activeProduct.id);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAdd = () => {
    onAddToCart(activeProduct, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
    if (onOpenCart) {
      setTimeout(() => onOpenCart(), 500);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: activeProduct.title,
        text: `Check out ${activeProduct.title} by ${activeProduct.designer || 'Pavun'} on Pavun Couture`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2200);
    }
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  // Recommended similar sarees
  const similarProducts = PRODUCTS.filter((p) => p.id !== activeProduct.id).slice(0, 4);

  return (
    <div className="az-pdp">
      {/* Toast Notification for Share */}
      {copiedShare && (
        <div className="az-pdp__toast">
          <span>Product link copied to clipboard! ✓</span>
        </div>
      )}

      {/* ---------------------------------------------------------------------
         1. BREADCRUMBS
         --------------------------------------------------------------------- */}
      <nav className="az-pdp__breadcrumb-bar" aria-label="Breadcrumb">
        <div className="az-pdp__container">
          <ol className="az-pdp__breadcrumb-list">
            <li>
              <button type="button" onClick={onNavigateHome} className="az-pdp__breadcrumb-link">
                Home
              </button>
            </li>
            <li className="az-pdp__breadcrumb-sep">/</li>
            <li>
              <button
                type="button"
                onClick={() => onNavigateCategory && onNavigateCategory('sarees')}
                className="az-pdp__breadcrumb-link"
              >
                Designers
              </button>
            </li>
            <li className="az-pdp__breadcrumb-sep">/</li>
            <li>
              <span className="az-pdp__breadcrumb-link az-pdp__breadcrumb-link--designer">
                {activeProduct.designer || 'Mrunal Khimji'}
              </span>
            </li>
            <li className="az-pdp__breadcrumb-sep">/</li>
            <li>
              <button
                type="button"
                onClick={() => onNavigateCategory && onNavigateCategory(activeProduct.category)}
                className="az-pdp__breadcrumb-link"
              >
                {activeProduct.subcategory || 'Sarees'}
              </button>
            </li>
            <li className="az-pdp__breadcrumb-sep">/</li>
            <li className="az-pdp__breadcrumb-current" aria-current="page">
              {activeProduct.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* ---------------------------------------------------------------------
         2. MAIN PRODUCT HERO SHOWCASE (2 Columns: 2-Col Gallery Grid + Sticky Buy Box)
         --------------------------------------------------------------------- */}
      <div className="az-pdp__container az-pdp__main-grid">
        {/* ===================================================================
           LEFT COLUMN: 2-Column Staggered Photography Grid (Matching Reference)
           =================================================================== */}
        <section className="az-pdp__gallery-col" aria-label="Product Media Gallery">
          <div className="az-pdp__2col-grid">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="az-pdp__photo-card"
                onClick={() => {
                  setActiveImageIndex(idx);
                  setActiveLightbox(true);
                }}
                title="Click to view full-resolution image"
              >
                <img
                  src={img}
                  alt={`${activeProduct.title} - View ${idx + 1}`}
                  className="az-pdp__photo-img"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = activeProduct.image;
                  }}
                />

                {/* Badge on Photo 1 (bottom right): Contains: Saree,Blouse */}
                {idx === 0 && (
                  <div className="az-pdp__contains-badge">
                    <span>{activeProduct.containsBadge || 'Contains: Saree,Blouse'}</span>
                    <InfoCircleIcon size={13} className="az-pdp__contains-icon" />
                  </div>
                )}

                {/* Badge on Photo 2 (top right): View Similar Floating Pill */}
                {idx === 1 && (
                  <button
                    type="button"
                    className="az-pdp__view-similar-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      const sim = document.getElementById('az-similar-section');
                      if (sim) sim.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <ViewSimilarIcon size={14} />
                    <span>View Similar</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
           RIGHT COLUMN: Sticky Designer Identity & Buying Engine
           =================================================================== */}
        <section className="az-pdp__info-col" aria-label="Product Details and Purchase">
          <div className="az-pdp__sticky-box">
            
            {/* Badges Bar (New Arrivals + Wishlisted by 50+) */}
            <div className="az-pdp__badges-bar">
              <span className="az-pdp__badge-pill az-pdp__badge-pill--arrival">
                <SparkleIcon size={13} className="az-pdp__badge-icon" />
                <span>{activeProduct.tag || 'New Arrivals'}</span>
              </span>
              <span className="az-pdp__badge-pill az-pdp__badge-pill--wishlist">
                <HeartIcon size={12} filled={false} className="az-pdp__badge-icon az-pdp__badge-icon--heart" />
                <span>{activeProduct.wishlistCountBadge || 'Wishlisted by 50+'}</span>
              </span>
            </div>

            {/* Designer Title with Chevron + Header Actions (Share & Wishlist) */}
            <div className="az-pdp__header-row">
              <button
                type="button"
                className="az-pdp__designer-link"
                onClick={() => onNavigateCategory && onNavigateCategory(activeProduct.category)}
              >
                <span>{activeProduct.designer || 'Mrunal Khimji'}</span>
                <span className="az-pdp__designer-chevron">›</span>
              </button>

              <div className="az-pdp__header-actions">
                <button
                  type="button"
                  className="az-pdp__header-btn"
                  onClick={handleShare}
                  aria-label="Share this saree"
                  title="Share this saree"
                >
                  <ShareIcon size={19} />
                </button>
                <button
                  type="button"
                  className={`az-pdp__header-btn ${isWishlisted ? 'az-pdp__header-btn--active' : ''}`}
                  onClick={() => onToggleWishlist(activeProduct)}
                  aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  title={isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                >
                  <HeartIcon size={20} filled={isWishlisted} />
                </button>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="az-pdp__title">{activeProduct.title}</h1>

            {/* Price Row */}
            <div className="az-pdp__price-block">
              <div className="az-pdp__price-row">
                <span className="az-pdp__price-val">{formatPrice(activeProduct.price)}</span>
                <InfoCircleIcon size={15} className="az-pdp__price-info" />
              </div>
              <span className="az-pdp__tax-note">(inclusive of all taxes)</span>
            </div>

            {/* Size Selector with Ruler Link */}
            <div className="az-pdp__size-wrap">
              <div className="az-pdp__size-header">
                <span className="az-pdp__size-title">Select size</span>
                <button
                  type="button"
                  className="az-pdp__size-guide-link"
                  onClick={() => setShowSizeModal(true)}
                >
                  <RulerIcon size={14} />
                  <span>Size guide</span>
                </button>
              </div>

              {/* Exact Size Chips Grid */}
              <div className="az-pdp__size-chips-grid">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`az-pdp__size-chip ${selectedSize === size ? 'az-pdp__size-chip--active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty & Primary Action CTAs */}
            <div className="az-pdp__cta-row">
              <div className="az-pdp__qty-wrap">
                <label htmlFor="az-qty-select" className="az-pdp__qty-label">Qty:</label>
                <select
                  id="az-qty-select"
                  className="az-pdp__qty-select"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>

              {/* Add to Cart (Terracotta Rust Color Matching Reference) */}
              <button
                type="button"
                className={`az-pdp__btn-add-cart ${isAdded ? 'az-pdp__btn-add-cart--added' : ''}`}
                onClick={handleAdd}
              >
                <BagIcon size={18} />
                <span>{isAdded ? 'Added To Cart ✓' : 'Add To Cart'}</span>
              </button>

              {/* Speak To Stylist (Clean Outline) */}
              <button
                type="button"
                className="az-pdp__btn-speak-stylist"
                onClick={() => onOpenCustomerCare && onOpenCustomerCare()}
              >
                <StylistIcon size={18} />
                <span>Speak To Stylist</span>
              </button>
            </div>

            {/* Pincode & Delivery Options Card */}
            <div className="az-pdp__delivery-card">
              <div className="az-pdp__location-row">
                <div className="az-pdp__location-left">
                  <StorePinIcon size={16} className="az-pdp__pin-icon" />
                  <span className="az-pdp__pincode-val">{pincode}</span>
                </div>
                <button
                  type="button"
                  className="az-pdp__change-pin-btn"
                  onClick={() => {
                    const next = prompt('Enter your 6-digit delivery pincode:', pincode);
                    if (next && next.trim().length === 6) setPincode(next.trim());
                  }}
                >
                  Change
                </button>
              </div>

              {/* Radio Delivery Options */}
              <div className="az-pdp__delivery-options">
                <label
                  className={`az-pdp__delivery-radio ${deliveryOption === 'standard' ? 'az-pdp__delivery-radio--selected' : ''}`}
                  onClick={() => setDeliveryOption('standard')}
                >
                  <input
                    type="radio"
                    name="delivery-speed"
                    checked={deliveryOption === 'standard'}
                    onChange={() => setDeliveryOption('standard')}
                  />
                  <div className="az-pdp__radio-body">
                    <span className="az-pdp__radio-text">
                      Standard Delivery by <strong className="az-pdp__highlight-date">16th January</strong>
                    </span>
                  </div>
                </label>

                <label
                  className={`az-pdp__delivery-radio ${deliveryOption === 'express' ? 'az-pdp__delivery-radio--selected' : ''}`}
                  onClick={() => setDeliveryOption('express')}
                >
                  <input
                    type="radio"
                    name="delivery-speed"
                    checked={deliveryOption === 'express'}
                    onChange={() => setDeliveryOption('express')}
                  />
                  <div className="az-pdp__radio-body">
                    <span className="az-pdp__radio-text">
                      Express Delivery by <strong className="az-pdp__highlight-date">13th January</strong> +₹399
                    </span>
                    <span className="az-pdp__fast-tag">Fast Shipping</span>
                  </div>
                </label>
              </div>

              <div className="az-pdp__delivery-footer">
                <span>Need it by a specific date? </span>
                <button
                  type="button"
                  className="az-pdp__chat-link"
                  onClick={() => onOpenCustomerCare && onOpenCustomerCare()}
                >
                  Chat with us
                </button>
              </div>
            </div>

            {/* Shop with Confidence (2-Column Trust Matrix) */}
            <div className="az-pdp__confidence-section">
              <h3 className="az-pdp__section-heading">Shop with Confidence</h3>
              <div className="az-pdp__confidence-grid">
                <div className="az-pdp__confidence-item">
                  <span className="az-pdp__check-mark">✓</span>
                  <span>Loved by 2 Million+ Customers</span>
                </div>
                <div className="az-pdp__confidence-item">
                  <span className="az-pdp__check-mark">✓</span>
                  <span>75+ Countries Served</span>
                </div>
                <div className="az-pdp__confidence-item">
                  <span className="az-pdp__check-mark">✓</span>
                  <span>Trusted in Fashion for 20 Years</span>
                </div>
                <div className="az-pdp__confidence-item">
                  <span className="az-pdp__check-mark">✓</span>
                  <span>Personalized Styling Assistance</span>
                </div>
                <div className="az-pdp__confidence-item">
                  <span className="az-pdp__check-mark">✓</span>
                  <span>Authentic Designer Labels</span>
                </div>
                <div className="az-pdp__confidence-item">
                  <span className="az-pdp__check-mark">✓</span>
                  <span>Exclusive Member Benefits</span>
                </div>
              </div>
            </div>

            {/* Offers & EMI Section */}
            <div className="az-pdp__offers-section">
              <h3 className="az-pdp__section-heading">Offers &amp; EMI</h3>

              {/* Best Coupon Card */}
              <div className="az-pdp__coupon-card">
                <div className="az-pdp__coupon-row">
                  <span className="az-pdp__coupon-title">
                    Best Coupon: <strong>APP15</strong>
                    <button
                      type="button"
                      className="az-pdp__copy-btn"
                      onClick={() => {
                        navigator.clipboard?.writeText('APP15');
                        setCopiedCoupon(true);
                        setTimeout(() => setCopiedCoupon(false), 2200);
                      }}
                      title="Copy Coupon"
                    >
                      <CopyIcon size={14} />
                    </button>
                  </span>
                  <button type="button" className="az-pdp__coupon-more">
                    + 2 More ›
                  </button>
                </div>
                <span className="az-pdp__coupon-desc">
                  {copiedCoupon ? 'Coupon APP15 Copied! Save Extra ₹7,500' : 'Save extra upto ₹7,500'}
                </span>
              </div>

              {/* Aza Cash Card */}
              <div className="az-pdp__aza-cash-card">
                <span>Earn 1835 Aza Cash</span>
                <InfoCircleIcon size={14} />
              </div>

              {/* EMI Card */}
              <div className="az-pdp__emi-card">
                <span>EMI starts at ₹15,291/month for 6 months.</span>
                <span className="az-pdp__emi-link">All EMI Plans ›</span>
              </div>
            </div>

            {/* -----------------------------------------------------------------
               3. ACCORDION SPECIFICATIONS & DETAILS TABS
               ----------------------------------------------------------------- */}
            <div className="az-pdp__accordion-group">
              {/* Accordion 1: Product Description */}
              <div className="az-pdp__accordion-item">
                <button
                  type="button"
                  className="az-pdp__accordion-head"
                  onClick={() => toggleAccordion('details')}
                  aria-expanded={activeAccordion === 'details'}
                >
                  <span>PRODUCT DETAILS &amp; SILHOUETTE</span>
                  <span className="az-pdp__accordion-icon">{activeAccordion === 'details' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'details' && (
                  <div className="az-pdp__accordion-body">
                    <p className="az-pdp__desc-text">{activeProduct.description}</p>
                    <ul className="az-pdp__specs-list">
                      {activeProduct.details.map((detail, idx) => (
                        <li key={idx}>
                          <span className="az-pdp__spec-bullet">✦</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Specifications Table */}
              <div className="az-pdp__accordion-item">
                <button
                  type="button"
                  className="az-pdp__accordion-head"
                  onClick={() => toggleAccordion('specs')}
                  aria-expanded={activeAccordion === 'specs'}
                >
                  <span>GARMENT SPECIFICATIONS</span>
                  <span className="az-pdp__accordion-icon">{activeAccordion === 'specs' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'specs' && (
                  <div className="az-pdp__accordion-body">
                    <table className="az-pdp__specs-table">
                      <tbody>
                        <tr>
                          <th>Components:</th>
                          <td>2 Pc ({activeProduct.containsBadge || 'Saree + Hand Embroidered Blouse'})</td>
                        </tr>
                        <tr>
                          <th>Color:</th>
                          <td>{activeProduct.color}</td>
                        </tr>
                        <tr>
                          <th>Neckline:</th>
                          <td>V-Neck with Handwork Cutdana Detailing</td>
                        </tr>
                        <tr>
                          <th>Sleeve Type:</th>
                          <td>Fitted Elbow Sleeves with Deep Back Cutout</td>
                        </tr>
                        <tr>
                          <th>Fabric:</th>
                          <td>{activeProduct.fabric}</td>
                        </tr>
                        <tr>
                          <th>Embroidery / Work:</th>
                          <td>Artisanal Cutdana, Bullion Zari &amp; Sequins Border</td>
                        </tr>
                        <tr>
                          <th>Care:</th>
                          <td>Dry clean only; store folded in the provided muslin archival case</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div className="az-pdp__accordion-item">
                <button
                  type="button"
                  className="az-pdp__accordion-head"
                  onClick={() => toggleAccordion('shipping')}
                  aria-expanded={activeAccordion === 'shipping'}
                >
                  <span>SHIPPING, CUSTOMIZATION &amp; RETURNS</span>
                  <span className="az-pdp__accordion-icon">{activeAccordion === 'shipping' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="az-pdp__accordion-body">
                    <div className="az-pdp__shipping-rules">
                      <p>
                        <strong>Dispatch Timeline:</strong> This couture piece is hand-tailored upon order confirmation and dispatches within 10–12 business days. Express shipping available.
                      </p>
                      <p>
                        <strong>Custom Made to Measure:</strong> Complimentary made-to-measure tailoring is included with every order.
                      </p>
                      <p>
                        <strong>Easy Returns:</strong> Eligible for free bespoke alterations or exchange within 7 days of delivery.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 4: About the Designer */}
              <div className="az-pdp__accordion-item">
                <button
                  type="button"
                  className="az-pdp__accordion-head"
                  onClick={() => toggleAccordion('designer')}
                  aria-expanded={activeAccordion === 'designer'}
                >
                  <span>ABOUT {activeProduct.designer || 'MRUNAL KHIMJI'}</span>
                  <span className="az-pdp__accordion-icon">{activeAccordion === 'designer' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'designer' && (
                  <div className="az-pdp__accordion-body">
                    <p className="az-pdp__desc-text">
                      {activeProduct.designer || 'Mrunal Khimji'} represents the pinnacle of modern Indian couture, celebrated for clean sensual cuts, architectural blouses, and fluid hand-embellished sarees worn by discerning women worldwide.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* ---------------------------------------------------------------------
         4. COMPLETE THE LOOK CROSS-SELL SECTION
         --------------------------------------------------------------------- */}
      <section className="az-pdp__complete-look" aria-label="Complete the Look">
        <div className="az-pdp__container">
          <header className="az-pdp__section-header">
            <span className="az-pdp__eyebrow">CURATED PAIRINGS</span>
            <h2 className="az-pdp__heading">COMPLETE THE LOOK</h2>
            <div className="az-pdp__gold-divider" />
            <p className="az-pdp__subheading">
              Elevate your saree silhouette with these handpicked heirloom pieces and bespoke accessories.
            </p>
          </header>

          <div className="az-pdp__pairing-grid">
            {[
              {
                id: 'pair-01',
                title: 'Hand-Embroidered Boned Corset Blouse in Antique Gold',
                category: 'Couture Corsetry',
                price: 36000,
                image: aariyanaCorsetDetail,
              },
              {
                id: 'pair-02',
                title: 'Metallic Champagne Liquid Gold Zari Dupatta Veil',
                category: 'Heirloom Tissue Weaves',
                price: 42000,
                image: sareeTissueGold,
              },
              {
                id: 'pair-03',
                title: 'Pre-Pleated Companion Tissue Saree Drape',
                category: 'Concept Drapes',
                price: 78000,
                image: sareeChampagneTissue,
              },
            ].map((acc) => (
              <div key={acc.id} className="az-pdp__pairing-card">
                <div className="az-pdp__pairing-img-wrap">
                  <img src={acc.image} alt={acc.title} className="az-pdp__pairing-img" loading="lazy" />
                </div>
                <div className="az-pdp__pairing-meta">
                  <span className="az-pdp__pairing-cat">{acc.category}</span>
                  <h4 className="az-pdp__pairing-title">{acc.title}</h4>
                  <span className="az-pdp__pairing-price">{formatPrice(acc.price)}</span>
                  <button
                    type="button"
                    className="az-pdp__pairing-btn"
                    onClick={() => {
                      onAddToCart(
                        {
                          id: acc.id,
                          title: acc.title,
                          subtitle: acc.category,
                          category: 'tissue',
                          subcategory: acc.category,
                          price: acc.price,
                          image: acc.image,
                          color: 'Gold',
                          fabric: 'Handcrafted',
                          sizes: ['Custom Sizing', 'Standard S (34")', 'Standard M (36")'],
                          sku: `PVN-PAIR-${acc.id}`,
                          description: acc.title,
                          details: ['Handcrafted luxury ensemble pairing'],
                        },
                        'Standard M (36")',
                        1
                      );
                      if (onOpenCart) onOpenCart();
                    }}
                  >
                    ADD TO CART +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------
         5. SIMILAR DESIGNER SAREES CAROUSEL
         --------------------------------------------------------------------- */}
      <section className="az-pdp__similar-section" id="az-similar-section" aria-label="Similar Products">
        <div className="az-pdp__container">
          <header className="az-pdp__section-header">
            <span className="az-pdp__eyebrow">HEIRLOOM CURATIONS</span>
            <h2 className="az-pdp__heading">YOU MAY ALSO ADORE</h2>
            <div className="az-pdp__gold-divider" />
          </header>

          <div className="az-pdp__similar-grid">
            {similarProducts.map((p) => (
              <div
                key={p.id}
                className="az-pdp__similar-card"
                onClick={() => {
                  if (onSelectProduct) {
                    onSelectProduct(p);
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="az-pdp__similar-img-wrap">
                  <img src={p.image} alt={p.title} className="az-pdp__similar-img" loading="lazy" />
                  {p.tag && <span className="az-pdp__similar-tag">{p.tag}</span>}
                  <button
                    type="button"
                    className="az-pdp__similar-quickview"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectProduct) onSelectProduct(p);
                    }}
                  >
                    VIEW PIECE
                  </button>
                </div>
                <div className="az-pdp__similar-info">
                  <span className="az-pdp__similar-designer">{p.designer || 'PAVUN HAUTE COUTURE'}</span>
                  <h4 className="az-pdp__similar-title">{p.title}</h4>
                  <div className="az-pdp__similar-price-row">
                    <span className="az-pdp__similar-price">{formatPrice(p.price)}</span>
                    {p.originalPrice && (
                      <span className="az-pdp__similar-mrp">{formatPrice(p.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------
         6. MOBILE STICKY BOTTOM PURCHASE BAR
         --------------------------------------------------------------------- */}
      <div className="az-pdp__mobile-sticky-bar">
        <div className="az-pdp__mobile-price-group">
          <span className="az-pdp__mobile-price">{formatPrice(activeProduct.price)}</span>
          <span className="az-pdp__mobile-tax">Taxes incl.</span>
        </div>
        <div className="az-pdp__mobile-btn-group">
          <button
            type="button"
            className="az-pdp__mobile-btn az-pdp__mobile-btn--stylist"
            onClick={() => onOpenCustomerCare && onOpenCustomerCare()}
          >
            <StylistIcon size={14} />
            <span>Stylist</span>
          </button>
          <button
            type="button"
            className="az-pdp__mobile-btn az-pdp__mobile-btn--cart"
            onClick={handleAdd}
          >
            {isAdded ? 'Added ✓' : 'Add To Cart'}
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
         7. SIZE GUIDE MODAL (Inches vs Centimeters)
         --------------------------------------------------------------------- */}
      {showSizeModal && (
        <div className="az-pdp__modal-backdrop" onClick={() => setShowSizeModal(false)}>
          <div
            className="az-pdp__size-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Size Guide"
          >
            <div className="az-pdp__size-modal-header">
              <div>
                <h3 className="az-pdp__size-modal-title">SIZE &amp; MEASUREMENT GUIDE</h3>
                <p className="az-pdp__size-modal-sub">
                  Aza Fashions Standard Designer Fit Chart for Pre-Draped Sarees &amp; Blouses
                </p>
              </div>
              <button
                type="button"
                className="az-pdp__size-modal-close"
                onClick={() => setShowSizeModal(false)}
                aria-label="Close size guide"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            {/* Inches / CM Toggle */}
            <div className="az-pdp__unit-toggle">
              <button
                type="button"
                className={`az-pdp__unit-btn ${sizeUnit === 'in' ? 'az-pdp__unit-btn--active' : ''}`}
                onClick={() => setSizeUnit('in')}
              >
                INCHES (IN)
              </button>
              <button
                type="button"
                className={`az-pdp__unit-btn ${sizeUnit === 'cm' ? 'az-pdp__unit-btn--active' : ''}`}
                onClick={() => setSizeUnit('cm')}
              >
                CENTIMETERS (CM)
              </button>
            </div>

            {/* Standard Measurement Matrix Table */}
            <div className="az-pdp__size-table-wrap">
              <table className="az-pdp__size-table">
                <thead>
                  <tr>
                    <th>SIZE</th>
                    <th>BUST ({sizeUnit.toUpperCase()})</th>
                    <th>WAIST ({sizeUnit.toUpperCase()})</th>
                    <th>HIP ({sizeUnit.toUpperCase()})</th>
                    <th>BLOUSE LENGTH</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: 'XS', bustIn: '32"', bustCm: '81 cm', waistIn: '26"', waistCm: '66 cm', hipIn: '35"', hipCm: '89 cm', len: '13.5"' },
                    { size: 'S', bustIn: '34"', bustCm: '86 cm', waistIn: '28"', waistCm: '71 cm', hipIn: '37"', hipCm: '94 cm', len: '14"' },
                    { size: 'M', bustIn: '36"', bustCm: '91 cm', waistIn: '30"', waistCm: '76 cm', hipIn: '39"', hipCm: '99 cm', len: '14.5"' },
                    { size: 'L', bustIn: '38"', bustCm: '97 cm', waistIn: '32"', waistCm: '81 cm', hipIn: '41"', hipCm: '104 cm', len: '15"' },
                    { size: 'XL', bustIn: '40"', bustCm: '102 cm', waistIn: '34"', waistCm: '86 cm', hipIn: '43"', hipCm: '109 cm', len: '15.5"' },
                    { size: 'XXL', bustIn: '42"', bustCm: '107 cm', waistIn: '36"', waistCm: '91 cm', hipIn: '45"', hipCm: '114 cm', len: '16"' },
                    { size: '3XL', bustIn: '44"', bustCm: '112 cm', waistIn: '38"', waistCm: '96 cm', hipIn: '47"', hipCm: '119 cm', len: '16.5"' },
                    { size: '4XL', bustIn: '46"', bustCm: '117 cm', waistIn: '40"', waistCm: '101 cm', hipIn: '49"', hipCm: '124 cm', len: '17"' },
                    { size: '5XL', bustIn: '48"', bustCm: '122 cm', waistIn: '42"', waistCm: '106 cm', hipIn: '51"', hipCm: '129 cm', len: '17.5"' },
                    { size: '6XL', bustIn: '50"', bustCm: '127 cm', waistIn: '44"', waistCm: '111 cm', hipIn: '53"', hipCm: '134 cm', len: '18"' },
                  ].map((row) => (
                    <tr key={row.size}>
                      <td><strong>{row.size}</strong></td>
                      <td>{sizeUnit === 'in' ? row.bustIn : row.bustCm}</td>
                      <td>{sizeUnit === 'in' ? row.waistIn : row.waistCm}</td>
                      <td>{sizeUnit === 'in' ? row.hipIn : row.hipCm}</td>
                      <td>{row.len}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="az-pdp__size-footer">
              <p>
                ✦ <strong>Complimentary Made-to-Measure:</strong> Need custom sleeve length, neckline depth, or personal waist-to-floor measurements? Choose your closest standard size and select &ldquo;Made-to-Measure&rdquo; during checkout, or chat with our stylist.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
         8. FULLSCREEN HIGH-RESOLUTION LIGHTBOX
         --------------------------------------------------------------------- */}
      {activeLightbox && (
        <div className="az-pdp__lightbox-backdrop" onClick={() => setActiveLightbox(false)}>
          <button
            type="button"
            className="az-pdp__lightbox-close"
            onClick={() => setActiveLightbox(false)}
            aria-label="Close Lightbox"
          >
            <CloseIcon size={28} />
          </button>
          <img
            src={galleryImages[activeImageIndex] || activeProduct.image}
            alt={activeProduct.title}
            className="az-pdp__lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
