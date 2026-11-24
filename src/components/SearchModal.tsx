import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { Product } from '../types/ecommerce';
import { PRODUCTS } from '../data/products';
import { SearchIcon, CloseIcon } from './Icons';
import './SearchModal.css';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
  onSelectCategory?: (category: string) => void;
}

const TRENDING_SEARCHES = [
  'Banarasi Katan Silk',
  'Kanjivaram Temple Silk',
  'Pure Gold Tissue',
  'Hand-Painted Organza',
  'Kadwa Meenakari',
  'Patan Patola Saree',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        setSearchTerm('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Live matching products
  const matchingProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const handleProductClick = (product: Product) => {
    handleClose();
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  const handleCategoryClick = (category: string) => {
    handleClose();
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="pavun-search-modal">
      <div className="pavun-search-modal__backdrop" onClick={handleClose} />
      <div className="pavun-search-modal__panel">
        <div className="pavun-search-modal__header">
          <div className="pavun-search-modal__input-wrapper">
            <SearchIcon size={22} className="pavun-search-modal__search-icon" />
            <input
              ref={inputRef}
              type="text"
              placeholder="SEARCH BANARASI, KANJIVARAM, TISSUE & ORGANZA SAREES..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pavun-search-modal__input"
            />
          </div>
          <button
            type="button"
            className="pavun-search-modal__close-btn"
            onClick={handleClose}
            aria-label="Close search"
          >
            <CloseIcon size={22} />
          </button>
        </div>

        <div className="pavun-search-modal__content">
          {searchTerm.trim() ? (
            /* Live Results List */
            <div className="pavun-search-results">
              <span className="pavun-search-modal__section-title">
                RESULTS FOR &ldquo;{searchTerm}&rdquo; ({matchingProducts.length})
              </span>
              {matchingProducts.length === 0 ? (
                <div className="pavun-search-no-results">
                  <p>No heirloom sarees found matching your search.</p>
                  <span>Try searching for &ldquo;Banarasi&rdquo;, &ldquo;Kanjivaram&rdquo;, &ldquo;Tissue&rdquo;, or &ldquo;Organza&rdquo;.</span>
                </div>
              ) : (
                <div className="pavun-search-results-grid">
                  {matchingProducts.map((product) => (
                    <div
                      key={product.id}
                      className="pavun-search-result-item"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="pavun-search-result-media">
                        <img src={product.image} alt={product.title} />
                      </div>
                      <div className="pavun-search-result-info">
                        <span className="pavun-search-result-cat">{product.subcategory || product.category}</span>
                        <h4 className="pavun-search-result-title">{product.title}</h4>
                        <span className="pavun-search-result-price">{formatPrice(product.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Default Trending & Categories */
            <>
              <div className="pavun-search-modal__trending">
                <span className="pavun-search-modal__section-title">TRENDING SEARCHES</span>
                <div className="pavun-search-modal__tags">
                  {TRENDING_SEARCHES.map((query, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="pavun-search-modal__tag"
                      onClick={() => setSearchTerm(query)}
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pavun-search-modal__quick-cats">
                <span className="pavun-search-modal__section-title">CURATED SAREE COLLECTIONS</span>
                <div className="pavun-search-modal__cats-grid">
                  <div className="pavun-search-modal__cat-item" onClick={() => handleCategoryClick('banarasi')}>
                    <span className="pavun-search-modal__cat-name">Banarasi Katan Silks</span>
                    <span className="pavun-search-modal__cat-count">Explore Weaves →</span>
                  </div>
                  <div className="pavun-search-modal__cat-item" onClick={() => handleCategoryClick('kanjivaram')}>
                    <span className="pavun-search-modal__cat-name">Kanjivaram Temple Silks</span>
                    <span className="pavun-search-modal__cat-count">Explore Weaves →</span>
                  </div>
                  <div className="pavun-search-modal__cat-item" onClick={() => handleCategoryClick('tissue')}>
                    <span className="pavun-search-modal__cat-name">Pure Gold Tissue &amp; Zari</span>
                    <span className="pavun-search-modal__cat-count">Explore Drapes →</span>
                  </div>
                  <div className="pavun-search-modal__cat-item" onClick={() => handleCategoryClick('organza')}>
                    <span className="pavun-search-modal__cat-name">Gossamer Organza &amp; Chanderi</span>
                    <span className="pavun-search-modal__cat-count">Explore Whispers →</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
