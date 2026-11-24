import React, { useState } from 'react';
import type { Product } from '../types/ecommerce';
import { HeartIcon, BagIcon } from './Icons';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [isAdded, setIsAdded] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  return (
    <article className="pavun-product-card" onClick={() => onQuickView(product)}>
      {/* Product Image Frame */}
      <div className="pavun-product-card__media">
        <img
          src={product.image}
          alt={product.title}
          className="pavun-product-card__img"
          loading="lazy"
        />

        {/* Exclusive Tag / Badge */}
        {product.tag && (
          <span className="pavun-product-card__badge">{product.tag}</span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          className={`pavun-product-card__wishlist-btn ${isWishlisted ? 'pavun-product-card__wishlist-btn--active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <HeartIcon size={17} filled={isWishlisted} />
        </button>

        {/* Hover Quick Actions Overlay */}
        <div className="pavun-product-card__overlay">
          <button
            type="button"
            className="pavun-product-card__quick-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
          >
            VIEW PIECE
          </button>
        </div>
      </div>

      {/* Product Details Block */}
      <div className="pavun-product-card__details">
        <div className="pavun-product-card__category">{product.subcategory || product.category}</div>
        <h3 className="pavun-product-card__title">{product.title}</h3>
        <p className="pavun-product-card__fabric">{product.fabric}</p>

        {/* Pricing */}
        <div className="pavun-product-card__pricing">
          <span className="pavun-product-card__price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="pavun-product-card__orig-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Quick Sizes & Add to Bag Trigger */}
        <div className="pavun-product-card__sizes-bar" onClick={(e) => e.stopPropagation()}>
          <div className="pavun-product-card__size-pills">
            {product.sizes.slice(0, 4).map((size) => (
              <button
                key={size}
                type="button"
                className={`pavun-product-card__size-btn ${selectedSize === size ? 'pavun-product-card__size-btn--active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size === 'Custom Made-to-Measure' ? 'Custom' : size}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`pavun-product-card__add-btn ${isAdded ? 'pavun-product-card__add-btn--added' : ''}`}
            onClick={handleQuickAdd}
            aria-label="Add to Shopping Bag"
          >
            <BagIcon size={14} />
            <span>{isAdded ? 'ADDED' : 'ADD'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
