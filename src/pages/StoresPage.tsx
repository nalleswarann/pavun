import React, { useState } from 'react';
import { STORE_LOCATIONS } from '../data/products';
import { StorePinIcon, PhoneIcon, WhatsAppIcon, CheckIcon } from '../components/Icons';
import './StoresPage.css';

interface StoresPageProps {
  onNavigateHome: () => void;
  onOpenCustomerCare?: () => void;
}

export const StoresPage: React.FC<StoresPageProps> = ({
  onNavigateHome,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    store: 'store-mumbai',
    date: '',
    time: '12:00 PM',
    interest: 'Bridal Lehengas',
    notes: '',
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const filteredStores = selectedCity === 'all'
    ? STORE_LOCATIONS
    : STORE_LOCATIONS.filter((s) => s.city.toLowerCase() === selectedCity.toLowerCase());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    const code = 'PVN-SUITE-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(code);
    setBookingConfirmed(true);
  };

  return (
    <div className="pavun-stores-page">
      {/* Hero Header */}
      <section className="pavun-stores-hero">
        <div className="pavun-stores-hero__container">
          <nav className="pavun-stores-breadcrumb">
            <button type="button" onClick={onNavigateHome}>
              HOME
            </button>
            <span className="pavun-st-sep">/</span>
            <span className="pavun-st-current">FLAGSHIP ATELIERS</span>
          </nav>

          <span className="pavun-stores-hero__eyebrow pavun-reveal-eyebrow">BY PRIVATE APPOINTMENT ONLY</span>
          <h1 className="pavun-stores-hero__title pavun-reveal-title">OUR PRIVATE ATELIERS</h1>
          <div className="pavun-stores-hero__divider pavun-reveal-divider" />
          <p className="pavun-stores-hero__desc pavun-reveal-text">
            Step into the sanctuary of PAVUN. Experience one-on-one couture draping, bespoke embroidery consultations, and champagne fittings with our master artisans in Mumbai, New Delhi, and Hyderabad.
          </p>
        </div>
      </section>

      {/* Filter Cities Bar */}
      <div className="pavun-stores-filter-bar pavun-reveal-text">
        <div className="pavun-stores-filter-container">
          <span className="pavun-stores-filter-label">Locations:</span>
          <div className="pavun-stores-pills">
            <button
              type="button"
              className={`pavun-stores-pill ${selectedCity === 'all' ? 'pavun-stores-pill--active' : ''}`}
              onClick={() => setSelectedCity('all')}
            >
              All Ateliers
            </button>
            <button
              type="button"
              className={`pavun-stores-pill ${selectedCity === 'mumbai' ? 'pavun-stores-pill--active' : ''}`}
              onClick={() => setSelectedCity('mumbai')}
            >
              Mumbai (Kala Ghoda)
            </button>
            <button
              type="button"
              className={`pavun-stores-pill ${selectedCity === 'new delhi' ? 'pavun-stores-pill--active' : ''}`}
              onClick={() => setSelectedCity('new delhi')}
            >
              New Delhi (Mehrauli)
            </button>
            <button
              type="button"
              className={`pavun-stores-pill ${selectedCity === 'hyderabad' ? 'pavun-stores-pill--active' : ''}`}
              onClick={() => setSelectedCity('hyderabad')}
            >
              Hyderabad (Jubilee Hills)
            </button>
          </div>
        </div>
      </div>

      {/* Stores List */}
      <section className="pavun-stores-list-sec">
        <div className="pavun-stores-container">
          <div className="pavun-stores-grid pavun-reveal-stagger">
            {filteredStores.map((store) => (
              <div key={store.id} className="pavun-store-card pavun-reveal-card">
                <div className="pavun-store-card__media">
                  <img src={store.image} alt={store.name} />
                  <span className="pavun-store-card__city-badge">{store.city}</span>
                </div>

                <div className="pavun-store-card__body">
                  <span className="pavun-store-card__neighborhood">{store.neighborhood}</span>
                  <h3 className="pavun-store-card__title">{store.name}</h3>

                  <div className="pavun-store-card__row">
                    <StorePinIcon size={16} />
                    <span>{store.address}</span>
                  </div>

                  <div className="pavun-store-card__row">
                    <span className="pavun-store-card__time-icon">⏱</span>
                    <span>{store.timings}</span>
                  </div>

                  <div className="pavun-store-card__row">
                    <PhoneIcon size={15} />
                    <a href={`tel:${store.phone.replace(/[^0-9+]/g, '')}`}>{store.phone}</a>
                  </div>

                  {/* Services offered */}
                  <div className="pavun-store-card__services">
                    <h4>ATELIER SERVICES</h4>
                    <ul>
                      {store.services.map((srv, idx) => (
                        <li key={idx}>
                          <CheckIcon size={13} />
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pavun-store-card__actions">
                    <a
                      href="#booking-suite"
                      className="pavun-store-card__book-btn"
                      onClick={() => setFormData({ ...formData, store: store.id })}
                    >
                      BOOK PRIVATE SUITE
                    </a>
                    <a
                      href={`https://wa.me/919876543210?text=Hi%20PAVUN%20Team%2C%20I%20would%20like%20to%20visit%20your%20${store.city}%20atelier.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pavun-store-card__wa-btn"
                      aria-label="WhatsApp Store Concierge"
                    >
                      <WhatsAppIcon size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section className="pavun-booking-section" id="booking-suite">
        <div className="pavun-booking-container">
          <div className="pavun-booking-card pavun-reveal-banner">
            <div className="pavun-booking-header">
              <span className="pavun-booking-tag">HAUTE COUTURE APPOINTMENTS</span>
              <h2 className="pavun-booking-title">Book a Private Bridal Fitting</h2>
              <div className="pavun-booking-divider" />
              <p className="pavun-booking-desc">
                Reserve an exclusive 90-minute private suite for you and your family. Enjoy bespoke styling, custom measurements, and refreshment service.
              </p>
            </div>

            {bookingConfirmed ? (
              <div className="pavun-booking-success">
                <div className="pavun-booking-success__icon">
                  <CheckIcon size={36} />
                </div>
                <h3>APPOINTMENT RESERVED</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Your private bridal suite consultation has been confirmed.
                </p>
                <div className="pavun-booking-code-box">
                  <span>RESERVATION CODE</span>
                  <strong>{confirmationCode}</strong>
                </div>
                <p className="pavun-booking-note">
                  Our Senior Couture Concierge will contact you on WhatsApp (+{formData.phone}) within 2 hours to finalize your styling moodboard.
                </p>
                <button
                  type="button"
                  className="pavun-booking-new-btn"
                  onClick={() => setBookingConfirmed(false)}
                >
                  BOOK ANOTHER APPOINTMENT
                </button>
              </div>
            ) : (
              <form className="pavun-booking-form" onSubmit={handleSubmit}>
                <div className="pavun-booking-form-grid">
                  <div className="pavun-form-field">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="pavun-form-field">
                    <label>Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="pavun-form-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. radhika@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="pavun-form-field">
                    <label>Preferred Atelier *</label>
                    <select
                      value={formData.store}
                      onChange={(e) => setFormData({ ...formData, store: e.target.value })}
                    >
                      <option value="store-mumbai">Mumbai — Kala Ghoda Flagship</option>
                      <option value="store-delhi">New Delhi — The Haveli Atelier, Mehrauli</option>
                      <option value="store-hyderabad">Hyderabad — Jubilee Hills Boutique</option>
                      <option value="virtual">Virtual Live Video Consultation (NRI / Global)</option>
                    </select>
                  </div>

                  <div className="pavun-form-field">
                    <label>Preferred Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="pavun-form-field">
                    <label>Preferred Time Slot</label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    >
                      <option value="11:30 AM">11:30 AM – 01:00 PM</option>
                      <option value="02:00 PM">02:00 PM – 03:30 PM</option>
                      <option value="04:00 PM">04:00 PM – 05:30 PM</option>
                      <option value="06:00 PM">06:00 PM – 07:30 PM</option>
                    </select>
                  </div>

                  <div className="pavun-form-field pavun-form-field--full">
                    <label>Collection of Primary Interest</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    >
                      <option value="Bridal Lehengas">The Wedding Chapter — Bridal Lehengas</option>
                      <option value="Handloom Sarees">Banarasi &amp; Kanjivaram Heritage Sarees</option>
                      <option value="Sangeet & Cocktail">Sangeet, Cocktail &amp; Reception Outfits</option>
                      <option value="Full Trousseau">Complete Bridal Trousseau (5+ Ensembles)</option>
                    </select>
                  </div>

                  <div className="pavun-form-field pavun-form-field--full">
                    <label>Notes / Specific Silhouettes or Colors in Mind</label>
                    <textarea
                      rows={3}
                      placeholder="Let us know your wedding date, preferred colors (e.g. Crimson Red, Velvet, Gold), or any custom requests..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pavun-booking-submit-wrap">
                  <button type="submit" className="pavun-booking-submit-btn">
                    CONFIRM PRIVATE ATELIER APPOINTMENT
                  </button>
                  <span className="pavun-booking-guarantee">
                    ✦ Complimentary consultation. No cancellation fees.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoresPage;
