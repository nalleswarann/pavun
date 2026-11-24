import React from 'react';
import Logo from './Logo';
import { WhatsAppIcon, PhoneIcon, StorePinIcon } from './Icons';
import './Footer.css';

interface FooterProps {
  onOpenCustomerCare?: () => void;
  onNavigatePage?: (pageId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCustomerCare, onNavigatePage }) => {
  const handleLinkClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    if (onNavigatePage) {
      onNavigatePage(pageId);
    }
  };

  return (
    <footer className="pavun-footer" id="atelier-footer">
      <div className="pavun-footer__container">

        {/* Brand Masthead and Newsletter */}
        <div className="pavun-footer__masthead">
          <Logo variant="footer" onClick={() => onNavigatePage && onNavigatePage('home')} />
          <p className="pavun-footer__tagline">
            Preserving centuries of Indian regal heritage through master handloom weaving and bespoke bridal haute couture.
          </p>

          <div className="pavun-footer__newsletter">
            <span className="pavun-footer__newsletter-label">JOIN THE PAVUN COUTURE CIRCLE</span>
            <form
              className="pavun-footer__form"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to PAVUN private couture previews.');
              }}
            >
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL ADDRESS"
                required
                className="pavun-footer__input"
              />
              <button type="submit" className="pavun-footer__submit-btn">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Footer Nav Links */}
        <div className="pavun-footer__grid">
          <div className="pavun-footer__col">
            <h4 className="pavun-footer__col-title">SAREE COLLECTIONS</h4>
            <ul className="pavun-footer__list">
              <li><a href="#banarasi" onClick={(e) => handleLinkClick(e, 'banarasi')}>Banarasi Katan Sarees</a></li>
              <li><a href="#kanjivaram" onClick={(e) => handleLinkClick(e, 'kanjivaram')}>Kanjivaram Temple Silk</a></li>
              <li><a href="#tissue" onClick={(e) => handleLinkClick(e, 'tissue')}>Pure Gold Tissue Drapes</a></li>
              <li><a href="#organza" onClick={(e) => handleLinkClick(e, 'organza')}>Gossamer Organza &amp; Chanderi</a></li>
              <li><a href="#sarees" onClick={(e) => handleLinkClick(e, 'sarees')}>Bridal Trousseau Sarees</a></li>
              <li><a href="#collections" onClick={(e) => handleLinkClick(e, 'collections')}>Campaign Lookbook</a></li>
            </ul>
          </div>

          <div className="pavun-footer__col">
            <h4 className="pavun-footer__col-title">FLAGSHIP ATELIERS</h4>
            <ul className="pavun-footer__list">
              <li><a href="#stores" onClick={(e) => handleLinkClick(e, 'stores')}><StorePinIcon size={13} /> Mumbai - Kala Ghoda</a></li>
            </ul>
          </div>

          <div className="pavun-footer__col">
            <h4 className="pavun-footer__col-title">CLIENT SERVICES</h4>
            <ul className="pavun-footer__list">
              <li>
                <a
                  href="#whatsapp-care"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenCustomerCare) onOpenCustomerCare();
                  }}
                  className="pavun-footer__whatsapp-link"
                >
                  <WhatsAppIcon size={15} /> WhatsApp Stylist
                </a>
              </li>
              <li><a href="tel:+919876543210"><PhoneIcon size={13} /> +91 98765 43210</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Complimentary Global Delivery</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Custom Sizing &amp; Measurements</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Frequently Asked Questions</a></li>
            </ul>
          </div>

          <div className="pavun-footer__col">
            <h4 className="pavun-footer__col-title">ABOUT PAVUN</h4>
            <ul className="pavun-footer__list">
              <li><a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>The Atelier Heritage</a></li>
              <li><a href="#collections" onClick={(e) => handleLinkClick(e, 'collections')}>Artisan Weaving Communities</a></li>
              <li><a href="#collections" onClick={(e) => handleLinkClick(e, 'collections')}>Sustainable Handloom Ethics</a></li>
              <li><a href="#collections" onClick={(e) => handleLinkClick(e, 'collections')}>Editorial &amp; Press</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Contact Atelier</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pavun-footer__bottom">
          <p className="pavun-footer__copy">
            &copy; 2026 PAVUN HAUTE COUTURE. All Rights Reserved. &ldquo;Un Style'ku No Rules&rdquo;.
          </p>
          <div className="pavun-footer__legal">
            <a href="#terms">Terms of Service</a>
            <span>•</span>
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#shipping">Worldwide Shipping</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
