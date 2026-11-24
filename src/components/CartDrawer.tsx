import React, { useState, useEffect, useCallback } from 'react';
import type { CartItem } from '../types/ecommerce';
import { CloseIcon, BagIcon, CheckIcon, WhatsAppIcon } from './Icons';
import './CartDrawer.css';

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart?: () => void;
  onExploreProducts?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreProducts,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Checkout modal simulation state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [checkoutOrderCode, setCheckoutOrderCode] = useState('');
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    country: 'India',
  });

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

  const handleClose = useCallback(() => {
    setIsCheckingOut(false);
    setCheckoutComplete(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const finalTotal = Math.max(0, subtotal - promoDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const code = promoCode.trim().toUpperCase();

    if (code === 'PAVUN10') {
      const discount = Math.round(subtotal * 0.1);
      setPromoDiscount(discount);
      setAppliedPromo('PAVUN10 (10% Off)');
      setPromoCode('');
    } else if (code === 'ROYALTY') {
      const discount = Math.min(15000, subtotal);
      setPromoDiscount(discount);
      setAppliedPromo('ROYALTY (₹15,000 Off)');
      setPromoCode('');
    } else {
      setPromoError('Invalid promotion code. Try "PAVUN10" or "ROYALTY".');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoDiscount(0);
  };

  const handleStartCheckout = () => {
    setIsCheckingOut(true);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone) return;
    const orderId = 'PVN-ORD-' + Math.floor(100000 + Math.random() * 900000);
    setCheckoutOrderCode(orderId);
    setCheckoutComplete(true);
    if (onClearCart) onClearCart();
  };

  if (!isOpen) return null;

  return (
    <div className="pavun-cart-overlay">
      <div className="pavun-cart-backdrop" onClick={handleClose} />
      <aside className="pavun-cart-drawer" aria-label="Shopping Bag">
        
        {/* Drawer Header */}
        <div className="pavun-cart-header">
          <div className="pavun-cart-header__title">
            <BagIcon size={19} />
            <span>SHOPPING BAG ({totalItemsCount})</span>
          </div>
          <button
            type="button"
            className="pavun-cart-close-btn"
            onClick={handleClose}
            aria-label="Close Bag"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Free Shipping Reassurance Bar */}
        <div className="pavun-cart-perks-bar">
          <CheckIcon size={14} />
          <span>Complimentary White-Glove Shipping &amp; Archival Packaging</span>
        </div>

        {/* Drawer Content */}
        <div className="pavun-cart-body">
          {checkoutComplete ? (
            /* Order Success State */
            <div className="pavun-cart-order-success">
              <div className="pavun-cart-success-icon">
                <CheckIcon size={36} />
              </div>
              <h3>ORDER PLACED SUCCESSFULLY</h3>
              <p>
                Thank you, <strong>{checkoutForm.name}</strong>. Your royal couture order has been registered with the PAVUN Atelier.
              </p>
              <div className="pavun-cart-order-code">
                <span>ORDER REFERENCE</span>
                <strong>{checkoutOrderCode}</strong>
              </div>
              <p className="pavun-cart-order-note">
                Our Senior Master Draper will reach out to you via WhatsApp (+{checkoutForm.phone}) within 2 hours to confirm your sizing measurements.
              </p>
              <button
                type="button"
                className="pavun-cart-empty__btn"
                onClick={onClose}
              >
                CONTINUE BROWSING
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Address Form */
            <div className="pavun-cart-checkout-screen">
              <div className="pavun-cart-checkout-heading">
                <h4>DELIVERY &amp; FITTING DETAILS</h4>
                <button
                  type="button"
                  className="pavun-cart-back-to-bag"
                  onClick={() => setIsCheckingOut(false)}
                >
                  ← Back to Bag
                </button>
              </div>

              <form className="pavun-cart-checkout-form" onSubmit={handleConfirmOrder}>
                <div className="pavun-form-field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    value={checkoutForm.name}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                  />
                </div>

                <div className="pavun-form-field">
                  <label>Mobile Number / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                  />
                </div>

                <div className="pavun-form-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. radhika@example.com"
                    value={checkoutForm.email}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                  />
                </div>

                <div className="pavun-form-field">
                  <label>Delivery Address *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Apartment, Street, Landmark"
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  />
                </div>

                <div className="pavun-cart-checkout-row">
                  <div className="pavun-form-field">
                    <label>City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai"
                      value={checkoutForm.city}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                    />
                  </div>

                  <div className="pavun-form-field">
                    <label>Country *</label>
                    <select
                      value={checkoutForm.country}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, country: e.target.value })}
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Singapore">Singapore</option>
                    </select>
                  </div>
                </div>

                <div className="pavun-cart-payment-methods">
                  <label>PAYMENT METHOD</label>
                  <div className="pavun-cart-payment-options">
                    <label className="pavun-payment-option">
                      <input type="radio" name="payment" defaultChecked />
                      <span>Net Banking / UPI / International Card</span>
                    </label>
                    <label className="pavun-payment-option">
                      <input type="radio" name="payment" />
                      <span>Atelier Wire Transfer / Concierge Invoice</span>
                    </label>
                  </div>
                </div>

                <div className="pavun-cart-checkout-summary-bar">
                  <span>Grand Total:</span>
                  <strong>{formatPrice(finalTotal)}</strong>
                </div>

                <button type="submit" className="pavun-cart-confirm-btn">
                  COMPLETE COUTURE ORDER ({formatPrice(finalTotal)})
                </button>
              </form>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="pavun-cart-empty">
              <div className="pavun-cart-empty__icon">
                <BagIcon size={44} />
              </div>
              <h3 className="pavun-cart-empty__heading">YOUR BAG IS EMPTY</h3>
              <p className="pavun-cart-empty__text">
                Explore our Royal Heritage Banarasi silk sarees, sacred Kanjivaram weaves, and liquid gold tissue drapes.
              </p>
              <button
                type="button"
                className="pavun-cart-empty__btn"
                onClick={() => {
                  onClose();
                  if (onExploreProducts) onExploreProducts();
                }}
              >
                DISCOVER HEIRLOOM SAREES
              </button>
            </div>
          ) : (
            /* Populated Cart View */
            <div className="pavun-cart-items">
              {cartItems.map((item, index) => (
                <div key={`${item.product.id}-${item.selectedSize}-${index}`} className="pavun-cart-item">
                  <div className="pavun-cart-item__media">
                    <img src={item.product.image} alt={item.product.title} />
                  </div>

                  <div className="pavun-cart-item__info">
                    <div className="pavun-cart-item__top">
                      <h4 className="pavun-cart-item__title">{item.product.title}</h4>
                      <button
                        type="button"
                        className="pavun-cart-item__remove"
                        onClick={() => onRemoveItem(index)}
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="pavun-cart-item__meta">
                      <span className="pavun-cart-item__size">Size: <strong>{item.selectedSize}</strong></span>
                      <span className="pavun-cart-item__sku">SKU: {item.product.sku}</span>
                    </div>

                    <div className="pavun-cart-item__price-row">
                      <span className="pavun-cart-item__price">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      {/* Quantity Controller */}
                      <div className="pavun-cart-item__qty">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer (Only when cart has items and not in completed order state) */}
        {!checkoutComplete && cartItems.length > 0 && !isCheckingOut && (
          <div className="pavun-cart-footer">
            {/* Promo Code Input */}
            <div className="pavun-cart-promo-sec">
              {appliedPromo ? (
                <div className="pavun-cart-promo-applied">
                  <span>Code Applied: <strong>{appliedPromo}</strong></span>
                  <button type="button" onClick={handleRemovePromo}>Remove</button>
                </div>
              ) : (
                <form className="pavun-cart-promo-form" onSubmit={handleApplyPromo}>
                  <input
                    type="text"
                    placeholder="Promo Code (e.g. PAVUN10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button type="submit">APPLY</button>
                </form>
              )}
              {promoError && <p className="pavun-cart-promo-error">{promoError}</p>}
            </div>

            {/* Price Calculations */}
            <div className="pavun-cart-breakdown">
              <div className="pavun-cart-breakdown-row">
                <span>Subtotal ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="pavun-cart-breakdown-row pavun-cart-discount-row">
                  <span>Promotional Privilege</span>
                  <span>- {formatPrice(promoDiscount)}</span>
                </div>
              )}

              <div className="pavun-cart-breakdown-row">
                <span>Insured Worldwide Delivery</span>
                <span className="pavun-cart-free-tag">COMPLIMENTARY</span>
              </div>

              <div className="pavun-cart-breakdown-row">
                <span>Made-to-Measure Alterations</span>
                <span className="pavun-cart-free-tag">INCLUDED</span>
              </div>

              <div className="pavun-cart-breakdown-row pavun-cart-total-row">
                <span>Estimated Total</span>
                <span className="pavun-cart-grand-total">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              type="button"
              className="pavun-cart-checkout-btn"
              onClick={handleStartCheckout}
            >
              PROCEED TO SECURE CHECKOUT
            </button>

            <a
              href="https://wa.me/919876543210?text=Hi%20PAVUN%20Team%2C%20I%20have%20items%20in%20my%20bag%20and%20would%20like%20stylist%20assistance."
              target="_blank"
              rel="noopener noreferrer"
              className="pavun-cart-wa-checkout"
            >
              <WhatsAppIcon size={16} />
              <span>ORDER VIA WHATSAPP STYLIST</span>
            </a>
          </div>
        )}

      </aside>
    </div>
  );
};

export default CartDrawer;
