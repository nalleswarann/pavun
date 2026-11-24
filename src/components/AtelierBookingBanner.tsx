import React from 'react';
import { StorePinIcon } from './Icons';

interface AtelierBookingBannerProps {
  onOpenCustomerCare?: () => void;
}

export const AtelierBookingBanner: React.FC<AtelierBookingBannerProps> = ({
  onOpenCustomerCare,
}) => {
  return (
    <div className="pavun-atelier-group">
      {/* Reassurance Pillars & Concierge Callout */}
      <div className="pavun-pillars-bar pavun-reveal-banner">
        <div className="pavun-pillars-bar__container pavun-reveal-stagger">
          <div className="pavun-pillars-bar__item">
            <span className="pavun-pillars-bar__title">BESPOKE BRIDAL ATELIER</span>
            <span className="pavun-pillars-bar__sub">Custom Made-to-Measure Sizing</span>
          </div>
          <div className="pavun-pillars-bar__divider" />
          <div className="pavun-pillars-bar__item">
            <span className="pavun-pillars-bar__title">AUTHENTIC HANDLOOM WEAVES</span>
            <span className="pavun-pillars-bar__sub">100% Pure Katan &amp; Silver Zari</span>
          </div>
          <div className="pavun-pillars-bar__divider" />
          <div className="pavun-pillars-bar__item">
            <span className="pavun-pillars-bar__title">WHITE-GLOVE SHIPPING</span>
            <span className="pavun-pillars-bar__sub">Insured Worldwide Delivery to 60+ Countries</span>
          </div>
          <div className="pavun-pillars-bar__divider" />
          <div className="pavun-pillars-bar__item">
            <span className="pavun-pillars-bar__title">WHATSAPP STYLIST CONCIERGE</span>
            <span className="pavun-pillars-bar__sub">Live Video Draping &amp; Consultation</span>
          </div>
        </div>
      </div>

      {/* Private Atelier Booking Banner */}
      <section className="pavun-atelier-banner pavun-reveal-banner" id="atelier-booking">
        <div className="pavun-atelier-banner__content">
          <div className="pavun-atelier-banner__icon">
            <StorePinIcon size={26} />
          </div>
          <h3 className="pavun-atelier-banner__title pavun-reveal-title">
            EXPERIENCE PAVUN IN OUR PRIVATE ATELIERS
          </h3>
          <p className="pavun-atelier-banner__desc pavun-reveal-text">
            Visit our private bridal salons in Mumbai (Kala Ghoda), New Delhi (Mehrauli), and Hyderabad (Jubilee Hills) for personalized one-on-one couture fittings with master draper artisans.
          </p>
          <div className="pavun-atelier-banner__actions pavun-reveal-text">
            <button
              type="button"
              className="pavun-atelier-banner__btn pavun-atelier-banner__btn--primary"
              onClick={onOpenCustomerCare}
            >
              BOOK PRIVATE SUITE APPOINTMENT
            </button>
            <a
              href="tel:+919876543210"
              className="pavun-atelier-banner__btn pavun-atelier-banner__btn--outline"
            >
              CALL ATELIER: +91 98765 43210
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AtelierBookingBanner;
