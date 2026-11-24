import React, { useEffect } from 'react';
import { WhatsAppIcon, CloseIcon, PhoneIcon } from './Icons';
import './CustomerCareModal.css';

interface CustomerCareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerCareModal: React.FC<CustomerCareModalProps> = ({
  isOpen,
  onClose,
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="pavun-care-modal">
      <div className="pavun-care-modal__backdrop" onClick={onClose} />
      <div className="pavun-care-modal__dialog">
        <div className="pavun-care-modal__header">
          <div className="pavun-care-modal__title-group">
            <WhatsAppIcon size={24} />
            <div>
              <h3 className="pavun-care-modal__heading">PAVUN CUSTOMER CARE</h3>
              <p className="pavun-care-modal__sub">Dedicated Haute Couture Concierge</p>
            </div>
          </div>
          <button
            type="button"
            className="pavun-care-modal__close-btn"
            onClick={onClose}
            aria-label="Close customer care"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="pavun-care-modal__body">
          <p className="pavun-care-modal__intro">
            Connect directly with a dedicated bridal stylist and client advisor for bespoke orders, sizing guidance, and international inquiries.
          </p>

          <div className="pavun-care-modal__card">
            <span className="pavun-care-modal__status-badge">
              <span className="pavun-care-modal__pulse" /> ONLINE NOW
            </span>
            <div className="pavun-care-modal__hours">
              Monday – Saturday | 10:00 AM – 8:00 PM IST
            </div>
            
            <a
              href="https://wa.me/919876543210?text=Hi%20PAVUN%20Team%2C%20I%20would%20like%20assistance%20with%20your%20luxury%20couture%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="pavun-care-modal__whatsapp-btn"
            >
              <WhatsAppIcon size={20} />
              <span>CHAT ON WHATSAPP (+91 98765 43210)</span>
            </a>
          </div>

          <div className="pavun-care-modal__channels">
            <div className="pavun-care-modal__channel-item">
              <PhoneIcon size={16} />
              <div>
                <strong>Direct Atelier Line:</strong>
                <a href="tel:+919876543210">+91 (0) 98765 43210</a>
              </div>
            </div>
            <div className="pavun-care-modal__channel-item">
              <span>✉</span>
              <div>
                <strong>Concierge Email:</strong>
                <a href="mailto:concierge@pavun.com">concierge@pavun.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCareModal;
