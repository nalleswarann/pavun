import React, { useState } from 'react';
import { WhatsAppIcon, PhoneIcon, ChevronDownIcon, CheckIcon } from '../components/Icons';
import './ContactPage.css';

interface ContactPageProps {
  onNavigateHome: () => void;
  onOpenCustomerCare: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How does bespoke made-to-measure sizing work for international brides?',
    answer:
      'We specialize in dressing NRI and international brides across the USA, UK, Canada, UAE, and Singapore. Once your order is placed, our senior master draper conducts a 1-on-1 WhatsApp video consultation to guide you or your local tailor through our 28-point precision measurement chart. We also offer muslin fitting trials for heavy bridal lehengas before final hand-embroidery.',
  },
  {
    question: 'What is the production lead time for a handcrafted bridal lehenga?',
    answer:
      'Our bridal lehengas require 180 to 450 hours of hand embroidery by generational artisans. Standard production time is 6 to 8 weeks. For urgent wedding dates, we offer an expedited Bridal Priority Rush service (14 to 21 business days) upon concierge approval.',
  },
  {
    question: 'Do you ship internationally and are customs duties included?',
    answer:
      'Yes, we provide fully insured white-glove international air shipping to over 60 countries via DHL Express. All international shipments are securely packed in moisture-resistant archival muslin bags. Standard shipping is complimentary on all luxury orders.',
  },
  {
    question: 'Can I customize blouse necklines, sleeve lengths, or lehenga border embroideries?',
    answer:
      'Absolutely. Every PAVUN couture piece can be personalized. You can specify neckline cuts (sweetheart, jewel, plunge, or modest square), sleeve lengths, back ties, dupatta borders, and add embroidered couple monograms or wedding dates into the lehenga waistband.',
  },
  {
    question: 'What is the private atelier fitting process in Mumbai, Delhi, or Hyderabad?',
    answer:
      'Our flagship salons operate on private reservation to ensure complete exclusivity. During your 90-minute private suite appointment, you will have exclusive access to our current couture collections, a dedicated master draper, and champagne refreshments.',
  },
  {
    question: 'What payment methods and currencies are supported?',
    answer:
      'We accept all major international Credit/Debit cards (Visa, MasterCard, American Express), Net Banking, UPI, and Bank Wire Transfers. Orders can be processed in INR (₹), USD ($), GBP (£), EUR (€), and AED (د.إ).',
  },
];

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onOpenCustomerCare,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Bespoke Bridal Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="pavun-contact-page">
      {/* Hero Header */}
      <section className="pavun-contact-hero">
        <div className="pavun-contact-hero__container">
          <nav className="pavun-contact-breadcrumb">
            <button type="button" onClick={onNavigateHome}>
              HOME
            </button>
            <span className="pavun-co-sep">/</span>
            <span className="pavun-co-current">CLIENT CONCIERGE</span>
          </nav>

          <span className="pavun-contact-hero__eyebrow pavun-reveal-eyebrow">DEDICATED STYLIST DESK</span>
          <h1 className="pavun-contact-hero__title pavun-reveal-title">CLIENT SERVICES &amp; INQUIRIES</h1>
          <div className="pavun-contact-hero__divider pavun-reveal-divider" />
          <p className="pavun-contact-hero__desc pavun-reveal-text">
            Whether inquiring about custom bridal embroidery, made-to-measure sizing, or scheduling an atelier fitting, our senior couture team is at your service.
          </p>
        </div>
      </section>

      {/* Direct Contact Cards */}
      <section className="pavun-contact-cards-sec">
        <div className="pavun-contact-container">
          <div className="pavun-contact-cards-grid pavun-reveal-stagger">
            {/* Card 1: WhatsApp */}
            <div className="pavun-contact-card pavun-contact-card--featured pavun-reveal-card">
              <div className="pavun-contact-card__icon pavun-contact-card__icon--wa">
                <WhatsAppIcon size={26} />
              </div>
              <span className="pavun-contact-card__label">INSTANT CONCIERGE</span>
              <h3>WhatsApp Client Care</h3>
              <p>Direct live chat with our senior bridal stylists. Send images, ask sizing questions, or request video drapes.</p>
              <a
                href="https://wa.me/919876543210?text=Hello%20PAVUN%20Concierge%2C%20I%20would%20like%20assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="pavun-contact-card__link"
              >
                CHAT ON WHATSAPP (+91 98765 43210) →
              </a>
            </div>

            {/* Card 2: Phone */}
            <div className="pavun-contact-card pavun-reveal-card">
              <div className="pavun-contact-card__icon">
                <PhoneIcon size={24} />
              </div>
              <span className="pavun-contact-card__label">VOICE CONSULTATION</span>
              <h3>Atelier Phone Line</h3>
              <p>Speak directly with our concierge desk for order updates, appointment confirmations, and inquiries.</p>
              <a href="tel:+912222884500" className="pavun-contact-card__link">
                CALL: +91 (022) 2288 4500 →
              </a>
            </div>

            {/* Card 3: Email */}
            <div className="pavun-contact-card pavun-reveal-card">
              <div className="pavun-contact-card__icon">
                <span className="pavun-contact-card__email-icon">✉</span>
              </div>
              <span className="pavun-contact-card__label">VIP WRITTEN DESK</span>
              <h3>Couture Email</h3>
              <p>For custom bridal design briefs, NRI inquiries, lookbook requests, and press/media communications.</p>
              <a href="mailto:concierge@pavun.com" className="pavun-contact-card__link">
                concierge@pavun.com →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form & Operating Hours */}
      <section className="pavun-contact-form-sec">
        <div className="pavun-contact-container">
          <div className="pavun-contact-form-layout">
            
            {/* Left: Interactive Form */}
            <div className="pavun-contact-form-box">
              <span className="pavun-contact-form-tag">SEND A BESPOKE INQUIRY</span>
              <h2 className="pavun-contact-form-title">How May We Assist You?</h2>
              
              {isSubmitted ? (
                <div className="pavun-contact-success">
                  <div className="pavun-contact-success__icon">
                    <CheckIcon size={32} />
                  </div>
                  <h3>INQUIRY RECEIVED</h3>
                  <p>
                    Thank you, <strong>{formData.name}</strong>. Your message has been routed to our senior bridal stylist. We will respond via email or WhatsApp within 4 business hours.
                  </p>
                  <button
                    type="button"
                    className="pavun-contact-new-btn"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', subject: 'Bespoke Bridal Inquiry', message: '' });
                    }}
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form className="pavun-contact-form" onSubmit={handleSubmit}>
                  <div className="pavun-contact-form-row">
                    <div className="pavun-contact-input-wrap">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radhika Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="pavun-contact-input-wrap">
                      <label>Mobile Number / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="pavun-contact-input-wrap">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. radhika@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="pavun-contact-input-wrap">
                    <label>Subject of Inquiry</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="Bespoke Bridal Inquiry">Bespoke Bridal Lehenga Commission</option>
                      <option value="Custom Sizing & Measurements">Custom Sizing &amp; Measurement Guide</option>
                      <option value="International Shipping Inquiry">International Shipping &amp; Timeline</option>
                      <option value="Atelier Fitting Appointment">Private Atelier Fitting Appointment</option>
                      <option value="Press / Media Collaboration">Press / Media Collaboration</option>
                    </select>
                  </div>

                  <div className="pavun-contact-input-wrap">
                    <label>Your Message *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your wedding date, garment preferences, customizations, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="pavun-contact-submit-btn">
                    SEND INQUIRY TO CONCIERGE
                  </button>
                </form>
              )}
            </div>

            {/* Right: Atelier Hours & Reassurance */}
            <div className="pavun-contact-info-box">
              <div className="pavun-contact-info-card">
                <h3>ATELIER HOURS</h3>
                <div className="pavun-contact-hours-list">
                  <div>
                    <strong>Monday – Saturday:</strong>
                    <span>10:30 AM – 8:00 PM IST</span>
                  </div>
                  <div>
                    <strong>Sunday:</strong>
                    <span>11:00 AM – 7:00 PM IST</span>
                  </div>
                  <div>
                    <strong>Virtual Consultations:</strong>
                    <span>Available across all timezones by reservation</span>
                  </div>
                </div>
              </div>

              <div className="pavun-contact-info-card pavun-contact-info-card--green">
                <h3>THE PAVUN PROMISE</h3>
                <ul>
                  <li>✦ 100% Genuine Handloom &amp; Pure Zari Assurance</li>
                  <li>✦ Complimentary Archival Muslin Storage Bag</li>
                  <li>✦ Insured Worldwide Air Delivery with DHL</li>
                  <li>✦ Dedicated Master Draper for Every Bride</li>
                </ul>
                <button
                  type="button"
                  className="pavun-contact-info-btn"
                  onClick={onOpenCustomerCare}
                >
                  <WhatsAppIcon size={16} />
                  <span>START LIVE WHATSAPP CHAT</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Haute Couture FAQ Accordion */}
      <section className="pavun-faq-section">
        <div className="pavun-faq-container">
          <div className="pavun-faq-header">
            <span className="pavun-faq-tag">HELPFUL ANSWERS</span>
            <h2 className="pavun-faq-title">Frequently Asked Questions</h2>
            <div className="pavun-faq-divider" />
            <p className="pavun-faq-desc">
              Everything you need to know about our custom bridal creations, measurements, and worldwide delivery.
            </p>
          </div>

          <div className="pavun-faq-list">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`pavun-faq-item ${isOpen ? 'pavun-faq-item--open' : ''}`}
                >
                  <button
                    type="button"
                    className="pavun-faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className="pavun-faq-icon">
                      <ChevronDownIcon size={16} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pavun-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
