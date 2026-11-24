import React from 'react';
import type { Product } from '../types/ecommerce';
import { PRODUCTS } from '../data/products';
import { EyeIcon } from './Icons';
import brideBanarasi from '../assets/products/saree_crimson_bridal.jpg';
import brideSisterhood from '../assets/new_images/edit_2_ivory_brides.jpg';
import brideTissue from '../assets/products/saree_tissue_gold.jpg';
import brideKanjivaram from '../assets/products/saree_kanjivaram_temple.jpg';
import './RealBridesSection.css';

interface RealBridesSectionProps {
  onQuickView: (product: Product) => void;
}

interface BrideStory {
  id: string;
  couple: string;
  venue: string;
  lookTitle: string;
  productId: string;
  image: string;
}

const BRIDE_STORIES: BrideStory[] = [
  {
    id: 'bride-jodhpur',
    couple: 'AANYA & KABIR',
    venue: 'Umaid Bhawan Palace, Jodhpur',
    lookTitle: 'Shahi Lal Banarasi Bridal Trousseau Saree',
    productId: 'sar-02',
    image: brideBanarasi,
  },
  {
    id: 'bride-udaipur',
    couple: 'MEERA & DEV',
    venue: 'The Oberoi Udaivilas, Udaipur',
    lookTitle: 'Sisterhood of Pure Banarasi Handloom Silk',
    productId: 'sar-01',
    image: brideSisterhood,
  },
  {
    id: 'bride-como',
    couple: 'SUHANI & ROHAN',
    venue: 'Villa Balbiano, Lake Como',
    lookTitle: 'Imperial Gold Tissue Zari Saree',
    productId: 'sar-06',
    image: brideTissue,
  },
  {
    id: 'bride-mehrauli',
    couple: 'TARA & VIKRAM',
    venue: 'Heritage Haveli, Mehrauli',
    lookTitle: 'Kanjivaram Korvai Temple Border Silk Saree',
    productId: 'sar-04',
    image: brideKanjivaram,
  },
];

export const RealBridesSection: React.FC<RealBridesSectionProps> = ({
  onQuickView,
}) => {
  const handleCardClick = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
    onQuickView(product);
  };

  return (
    <section className="pavun-real-brides" id="real-brides" aria-label="Celebrated Real Brides in Pavun Sarees">
      <div className="pavun-real-brides__container">
        
        {/* Header */}
        <header className="pavun-real-brides__header">
          <span className="pavun-real-brides__eyebrow pavun-reveal-eyebrow">
            #PAVUNBRIDE • EDITORIAL JOURNAL
          </span>
          <h2 className="pavun-real-brides__title pavun-reveal-title">
            CELEBRATED HEIRLOOMS &amp; REAL BRIDES
          </h2>
          <div className="pavun-real-brides__divider pavun-reveal-divider" />
          <p className="pavun-real-brides__subtitle pavun-reveal-text">
            A celebration of enduring romance. Moments of royal grandeur from unforgettable palatial weddings across the world, draped in Pavun heirloom sarees.
          </p>
        </header>

        {/* 4 Story Cards Grid */}
        <div className="pavun-real-brides__grid pavun-reveal-stagger">
          {BRIDE_STORIES.map((story) => (
            <article
              key={story.id}
              className="pavun-real-brides__card pavun-reveal-card"
              onClick={() => handleCardClick(story.productId)}
            >
              {/* Image Media Frame */}
              <div className="pavun-real-brides__media">
                <img
                  src={story.image}
                  alt={`${story.couple} in ${story.lookTitle}`}
                  className="pavun-real-brides__img"
                  loading="lazy"
                />
                <div className="pavun-real-brides__overlay" />

                {/* View Outfit Quick Pill */}
                <div className="pavun-real-brides__quick-pill">
                  <EyeIcon size={14} />
                  <span>VIEW HEIRLOOM SAREE</span>
                </div>
              </div>

              {/* Story Details */}
              <div className="pavun-real-brides__content">
                <span className="pavun-real-brides__venue">{story.venue}</span>
                <h3 className="pavun-real-brides__couple">{story.couple}</h3>
                <h4 className="pavun-real-brides__look">{story.lookTitle}</h4>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RealBridesSection;
