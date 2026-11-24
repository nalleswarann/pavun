import React, { useState, useEffect } from 'react';
import type { Product } from '../types/ecommerce';
import { CloseIcon, HeartIcon, BagIcon, WhatsAppIcon, CheckIcon } from './Icons';
import './ProductDetailModal.css';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  onOpenCustomerCare?: () => void;
  onViewFullPage?: (product: Product) => void;
}

interface ProductDetailContentProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  onOpenCustomerCare?: () => void;
  onViewFullPage?: (product: Product) => void;
}

const ProductDetailContent: React.FC<ProductDetailContentProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
  onOpenCustomerCare,
  onViewFullPage,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard 5.5m + 1m Blouse Piece');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'craft' | 'shipping'>('details');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello PAVUN Couture Concierge, I am interested in inquiring about the "${product.title}" (SKU: ${product.sku}, Price: ${formatPrice(product.price)}). Could you please guide me with customization and lead time?`
  );

  return (
    <div className="pavun-pdm-overlay" onClick={onClose}>
      <div className="pavun-pdm-backdrop" />
      <div
        className="pavun-pdm-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={product.title}
      >
        {/* Close Button */}
        <button
          type="button"
          className="pavun-pdm-close-btn"
          onClick={onClose}
          aria-label="Close Product View"
        >
          <CloseIcon size={22} />
        </button>

        <div className="pavun-pdm-layout">
          {/* Left Column: Visual Gallery */}
          <div className="pavun-pdm-gallery">
            <div className="pavun-pdm-gallery__main">
              <img
                src={product.image}
                alt={product.title}
                className="pavun-pdm-gallery__img"
              />
              {product.tag && (
                <span className="pavun-pdm-gallery__tag">{product.tag}</span>
              )}
            </div>
            <div className="pavun-pdm-gallery__reassurance">
              <span>✦ Master Handcrafted In India</span>
              <span>✦ Certified Pure Weaves</span>
            </div>
          </div>

          {/* Right Column: Product Details & Order Actions */}
          <div className="pavun-pdm-content">
            <div className="pavun-pdm-meta">
              <span className="pavun-pdm-category">{product.subcategory || product.category}</span>
              <span className="pavun-pdm-sku">SKU: {product.sku}</span>
            </div>

            <h1 className="pavun-pdm-title">{product.title}</h1>
            <p className="pavun-pdm-subtitle">{product.subtitle}</p>

            {/* Pricing */}
            <div className="pavun-pdm-pricing">
              <span className="pavun-pdm-price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="pavun-pdm-original-price">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="pavun-pdm-tax-note">Inclusive of all luxury taxes & duties</span>
            </div>

            {/* Color & Fabric summary */}
            <div className="pavun-pdm-attributes">
              <div className="pavun-pdm-attr-item">
                <span className="pavun-pdm-attr-label">Color:</span>
                <span className="pavun-pdm-attr-val">{product.color}</span>
              </div>
              <div className="pavun-pdm-attr-item">
                <span className="pavun-pdm-attr-label">Fabric:</span>
                <span className="pavun-pdm-attr-val">{product.fabric}</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="pavun-pdm-size-section">
              <div className="pavun-pdm-size-header">
                <span className="pavun-pdm-size-label">SELECT COUTURE SIZE</span>
                <button
                  type="button"
                  className="pavun-pdm-guide-btn"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                >
                  {showSizeGuide ? 'Hide Measurements' : 'Size Guide'}
                </button>
              </div>

              {/* Size guide popup drawer */}
              {showSizeGuide && (
                <div className="pavun-pdm-size-guide-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Bust (in)</th>
                        <th>Waist (in)</th>
                        <th>Hip (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>XS</td><td>32 - 34</td><td>24 - 26</td><td>35 - 37</td></tr>
                      <tr><td>S</td><td>34 - 36</td><td>26 - 28</td><td>37 - 39</td></tr>
                      <tr><td>M</td><td>36 - 38</td><td>28 - 30</td><td>39 - 41</td></tr>
                      <tr><td>L</td><td>38 - 40</td><td>30 - 32</td><td>41 - 43</td></tr>
                      <tr><td>XL</td><td>40 - 42</td><td>32 - 34</td><td>43 - 45</td></tr>
                      <tr><td>Custom</td><td colSpan={3}>Bespoke measurements taken via video call</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div className="pavun-pdm-sizes-list">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`pavun-pdm-size-pill ${selectedSize === size ? 'pavun-pdm-size-pill--active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="pavun-pdm-actions">
              <div className="pavun-pdm-qty-picker">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className={`pavun-pdm-add-btn ${isAdded ? 'pavun-pdm-add-btn--success' : ''}`}
                onClick={handleAdd}
              >
                <BagIcon size={18} />
                <span>{isAdded ? 'ADDED TO BAG ✓' : 'ADD TO SHOPPING BAG'}</span>
              </button>

              <button
                type="button"
                className={`pavun-pdm-wishlist-btn ${isWishlisted ? 'pavun-pdm-wishlist-btn--active' : ''}`}
                onClick={() => onToggleWishlist && onToggleWishlist(product)}
                aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <HeartIcon size={20} filled={isWishlisted} />
              </button>
            </div>

            {/* WhatsApp Atelier Consultation */}
            <a
              href={`https://wa.me/919876543210?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pavun-pdm-whatsapp-btn"
              onClick={(e) => {
                if (onOpenCustomerCare) {
                  e.preventDefault();
                  onOpenCustomerCare();
                }
              }}
            >
              <WhatsAppIcon size={18} />
              <span>CONSULT ATELIER STYLIST ON WHATSAPP</span>
            </a>

            {/* View Full Product Page Link */}
            {onViewFullPage && (
              <button
                type="button"
                className="pavun-pdm-fullpage-link"
                onClick={() => {
                  onClose();
                  onViewFullPage(product);
                }}
              >
                <span>VIEW FULL AZA-STYLE DESIGNER PRODUCT PAGE</span>
                <span>→</span>
              </button>
            )}

            {/* Reassurance bullet points */}
            <div className="pavun-pdm-reassurances">
              <div className="pavun-pdm-reassurance-item">
                <CheckIcon size={15} />
                <span>Complimentary White-Glove Insured Delivery to 60+ Countries</span>
              </div>
              <div className="pavun-pdm-reassurance-item">
                <CheckIcon size={15} />
                <span>Custom Made-to-Measure & Fitting Adjustments Included</span>
              </div>
              <div className="pavun-pdm-reassurance-item">
                <CheckIcon size={15} />
                <span>Certified Pure Handloom & Genuine Zardozi Craftsmanship</span>
              </div>
            </div>

            {/* Detail Tabs */}
            <div className="pavun-pdm-tabs">
              <div className="pavun-pdm-tab-headers">
                <button
                  type="button"
                  className={`pavun-pdm-tab-title ${activeTab === 'details' ? 'pavun-pdm-tab-title--active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  DESCRIPTION
                </button>
                <button
                  type="button"
                  className={`pavun-pdm-tab-title ${activeTab === 'craft' ? 'pavun-pdm-tab-title--active' : ''}`}
                  onClick={() => setActiveTab('craft')}
                >
                  CRAFTSMANSHIP
                </button>
                <button
                  type="button"
                  className={`pavun-pdm-tab-title ${activeTab === 'shipping' ? 'pavun-pdm-tab-title--active' : ''}`}
                  onClick={() => setActiveTab('shipping')}
                >
                  DELIVERY &amp; CARE
                </button>
              </div>

              <div className="pavun-pdm-tab-body">
                {activeTab === 'details' && (
                  <div className="pavun-pdm-tab-pane">
                    <p>{product.description}</p>
                    <ul className="pavun-pdm-detail-list">
                      {product.details.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'craft' && (
                  <div className="pavun-pdm-tab-pane">
                    <p>
                      Every PAVUN piece is crafted over 180 to 450 hours by master heritage kaarigars using time-honored Indian traditions:
                    </p>
                    <ul className="pavun-pdm-detail-list">
                      <li><strong>Fabric:</strong> Hand-sourced {product.fabric}</li>
                      <li><strong>Embroidery:</strong> Hand zardozi, dabka, marodi wirework, and French knot floral clusters</li>
                      <li><strong>Lining:</strong> 100% breathable pure mulmul silk with structured internal framing</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="pavun-pdm-tab-pane">
                    <ul className="pavun-pdm-detail-list">
                      <li><strong>Standard Dispatch:</strong> 4 - 6 weeks for hand-tailored pieces</li>
                      <li><strong>Express Bridal Rush:</strong> 14 business days upon concierge request</li>
                      <li><strong>Shipping:</strong> Free worldwide air shipping with door-to-door insurance</li>
                      <li><strong>Care:</strong> Professional dry clean only. Preserve in custom muslin bag provided.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
  onOpenCustomerCare,
  onViewFullPage,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <ProductDetailContent
      key={product.id}
      product={product}
      onClose={onClose}
      onAddToCart={onAddToCart}
      isWishlisted={isWishlisted}
      onToggleWishlist={onToggleWishlist}
      onOpenCustomerCare={onOpenCustomerCare}
      onViewFullPage={onViewFullPage}
    />
  );
};

export default ProductDetailModal;
