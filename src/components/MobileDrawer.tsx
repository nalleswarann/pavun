import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { WhatsAppIcon, CloseIcon, SearchIcon, ChevronDownIcon, ChevronRightIcon, StorePinIcon, PhoneIcon } from './Icons';
import { NAV_ITEMS, type NavItem } from '../data/navigation';
import './MobileDrawer.css';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeNav?: string;
  onSelectNav?: (navId: string) => void;
  onOpenSearch?: () => void;
  onOpenCustomerCare?: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeNav = 'home',
  onSelectNav,
  onOpenSearch,
  onOpenCustomerCare,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'AED'>('INR');

  // Prevent background scrolling when drawer is open
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

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleSection = (id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  const handleNavClick = (item: NavItem) => {
    if (item.subcategories && item.subcategories.length > 0) {
      toggleSection(item.id);
    } else {
      if (onSelectNav) onSelectNav(item.id);
      onClose();
    }
  };

  const handleSubItemClick = (href: string) => {
    const pageId = href.replace('#', '');
    if (onSelectNav) {
      onSelectNav(pageId);
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`pavun-drawer-backdrop ${isOpen ? 'pavun-drawer-backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <aside
        className={`pavun-drawer ${isOpen ? 'pavun-drawer--open' : ''}`}
        aria-label="Mobile Navigation Menu"
        aria-hidden={!isOpen}
      >
        {/* Drawer Header */}
        <div className="pavun-drawer__header">
          <Logo variant="drawer" onClick={onClose} />
          <button
            type="button"
            className="pavun-drawer__close-btn"
            onClick={onClose}
            aria-label="Close Navigation Menu"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Quick Search trigger inside drawer */}
        <div className="pavun-drawer__search-box">
          <button
            type="button"
            className="pavun-drawer__search-trigger"
            onClick={() => {
              onClose();
              if (onOpenSearch) onOpenSearch();
            }}
          >
            <SearchIcon size={16} className="pavun-drawer__search-icon" />
            <span>Search Banarasi, Kanjivaram, tissue sarees...</span>
          </button>
        </div>

        {/* Navigation Accordion List */}
        <div className="pavun-drawer__body">
          <ul className="pavun-drawer__nav-list">
            {NAV_ITEMS.map((item) => {
              const hasSub = Boolean(item.subcategories && item.subcategories.length > 0);
              const isExpanded = expandedSection === item.id;
              const isActive = activeNav === item.id;

              return (
                <li key={item.id} className="pavun-drawer__nav-item">
                  <div
                    className={`pavun-drawer__nav-row ${isActive ? 'pavun-drawer__nav-row--active' : ''}`}
                    onClick={() => handleNavClick(item)}
                  >
                    <span className="pavun-drawer__nav-label">{item.label}</span>
                    {hasSub && (
                      <span className="pavun-drawer__chevron">
                        <ChevronDownIcon
                          size={15}
                          className={`pavun-drawer__chevron-icon ${isExpanded ? 'pavun-drawer__chevron-icon--rotated' : ''}`}
                        />
                      </span>
                    )}
                  </div>

                  {/* Subcategories Accordion */}
                  {hasSub && isExpanded && (
                    <div className="pavun-drawer__sub-panel">
                      <button
                        type="button"
                        className="pavun-drawer__view-all-btn"
                        onClick={() => {
                          if (onSelectNav) onSelectNav(item.id);
                          onClose();
                        }}
                      >
                        VIEW ALL {item.label} →
                      </button>
                      {item.subcategories?.map((group, gIdx) => (
                        <div key={gIdx} className="pavun-drawer__sub-group">
                          <div className="pavun-drawer__sub-title">{group.title}</div>
                          <ul className="pavun-drawer__sub-links">
                            {group.items.map((subItem, sIdx) => (
                              <li key={sIdx}>
                                <a
                                  href={subItem.href}
                                  className="pavun-drawer__sub-link"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleSubItemClick(subItem.href);
                                  }}
                                >
                                  <span>{subItem.label}</span>
                                  {subItem.badge && (
                                    <span className="pavun-drawer__sub-badge">{subItem.badge}</span>
                                  )}
                                  <ChevronRightIcon size={13} className="pavun-drawer__sub-arrow" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Luxury WhatsApp Concierge Card */}
          <div className="pavun-drawer__whatsapp-card">
            <div className="pavun-drawer__whatsapp-header">
              <div className="pavun-drawer__whatsapp-icon-wrap">
                <WhatsAppIcon size={20} />
              </div>
              <div>
                <h4 className="pavun-drawer__whatsapp-title">PAVUN Concierge Stylist</h4>
                <p className="pavun-drawer__whatsapp-status">
                  <span className="pavun-drawer__status-dot" /> Online • 10:00 AM – 8:00 PM IST
                </p>
              </div>
            </div>
            <p className="pavun-drawer__whatsapp-desc">
              Have questions about bridal sizing, custom palettes, or international shipping?
            </p>
            <button
              type="button"
              className="pavun-drawer__whatsapp-btn"
              onClick={() => {
                onClose();
                if (onOpenCustomerCare) {
                  onOpenCustomerCare();
                } else {
                  window.open('https://wa.me/919876543210?text=Hi%20PAVUN%20Team%2C%20I%20would%20like%20assistance.', '_blank');
                }
              }}
            >
              <WhatsAppIcon size={16} />
              <span>CHAT ON WHATSAPP</span>
            </button>
          </div>

          {/* Quick Links & Stores */}
          <div className="pavun-drawer__quick-actions">
            <a
              href="#book-appointment"
              className="pavun-drawer__action-pill"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                const target = document.querySelector('#book-appointment');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <StorePinIcon size={15} />
              <span>Book In-Store Bridal Suite</span>
            </a>
            <a
              href="tel:+919876543210"
              className="pavun-drawer__action-pill"
            >
              <PhoneIcon size={15} />
              <span>+91 98765 43210</span>
            </a>
          </div>

          {/* Currency Switcher */}
          <div className="pavun-drawer__currency">
            <span className="pavun-drawer__currency-label">CURRENCY:</span>
            <div className="pavun-drawer__currency-btns">
              {(['INR', 'USD', 'EUR', 'GBP', 'AED'] as const).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  className={`pavun-drawer__curr-btn ${currency === curr ? 'pavun-drawer__curr-btn--active' : ''}`}
                  onClick={() => setCurrency(curr)}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="pavun-drawer__footer">
          <p>© 2026 PAVUN HAUTE COUTURE. ALL RIGHTS RESERVED.</p>
        </div>
      </aside>
    </>
  );
};

export default MobileDrawer;
