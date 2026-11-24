import React from 'react';
import type { Product, SareeCategory } from '../types/ecommerce';
import { PRODUCTS } from '../data/products';
import bannerRoyalHeritage from '../assets/new_images/banner_royal_heritage.jpg';
import bannerBanarasiCourt from '../assets/new_images/banner_banarasi_court.jpg';
import bannerSareeSlide3Desktop from '../assets/new_images/banner_saree_slide3_desktop.jpg';
import sareeCrimsonBridal from '../assets/products/saree_crimson_bridal.jpg';
import edit2IvoryBrides from '../assets/new_images/edit_2_ivory_brides.jpg';
import edit3BurgundyVelvet from '../assets/new_images/edit_3_burgundy_velvet.jpg';
import edit4TurquoiseDrape from '../assets/new_images/edit_4_turquoise_drape.jpg';
import edit5CrimsonVeil from '../assets/new_images/edit_5_crimson_veil.jpg';
import './LookbookPage.css';

interface LookbookPageProps {
  onQuickView: (product: Product) => void;
  onNavigateCategory: (category: SareeCategory) => void;
  onNavigateHome: () => void;
}

export const LookbookPage: React.FC<LookbookPageProps> = ({
  onQuickView,
  onNavigateCategory,
  onNavigateHome,
}) => {
  // Sample products to link from lookbook
  const bridalSareeSample = PRODUCTS.find((p) => p.id === 'sar-02') || PRODUCTS[0];
  const banarasiSample = PRODUCTS.find((p) => p.id === 'sar-01') || PRODUCTS[0];
  const tissueSample = PRODUCTS.find((p) => p.id === 'sar-06') || PRODUCTS[5];

  return (
    <div className="pavun-lookbook-page">
      {/* Editorial Header */}
      <section className="pavun-lookbook-hero">
        <div className="pavun-lookbook-hero__container">
          <nav className="pavun-lookbook-breadcrumb">
            <button type="button" onClick={onNavigateHome}>
              HOME
            </button>
            <span className="pavun-lb-sep">/</span>
            <span className="pavun-lb-current">OUR COLLECTIONS</span>
          </nav>
          <span className="pavun-lookbook-hero__eyebrow pavun-reveal-eyebrow">HAUTE COUTURE 2026 ARCHIVE</span>
          <h1 className="pavun-lookbook-hero__title pavun-reveal-title">THE EDITORIAL CAMPAIGN</h1>
          <div className="pavun-lookbook-hero__divider pavun-reveal-divider" />
          <p className="pavun-lookbook-hero__desc pavun-reveal-text">
            A visual anthology capturing the majesty of Indian royal matrimony, centuries-old pit loom weaving traditions, and intricate saree draping artistry crafted without compromise.
          </p>
        </div>
      </section>

      {/* CHAPTER 1: THE WEDDING CHAPTER */}
      <section className="pavun-lookbook-chapter">
        <div className="pavun-lookbook-container">
          <div className="pavun-lookbook-spread">
            <div className="pavun-lookbook-spread__hero-img pavun-reveal-img">
              <img
                src={bannerRoyalHeritage}
                alt="The Wedding Chapter - Royal Brides in Crimson and Gold Sarees"
              />
              <div className="pavun-lookbook-spread__tag">CHAPTER I / BRIDAL SAREES</div>
            </div>

            <div className="pavun-lookbook-spread__content pavun-reveal-card">
              <span className="pavun-lb-num">01</span>
              <h2 className="pavun-lb-title">THE WEDDING CHAPTER</h2>
              <p className="pavun-lb-quote">
                &ldquo;A wedding saree should not simply be worn; it must carry the memory of an imperial heritage, handed down through generations like a sacred family blessing.&rdquo;
              </p>
              <p className="pavun-lb-body">
                Drawn from sacred temple carvings and royal Mughal frescoes, each bridal saree in this chapter features three-dimensional dabka wirework, pure katan silk, and ethereal gold pallus.
              </p>

              <div className="pavun-lb-actions">
                <button
                  type="button"
                  className="pavun-lb-btn pavun-lb-btn--primary"
                  onClick={() => onNavigateCategory('banarasi')}
                >
                  EXPLORE BRIDAL BANARASI
                </button>
                <button
                  type="button"
                  className="pavun-lb-btn pavun-lb-btn--secondary"
                  onClick={() => onQuickView(bridalSareeSample)}
                >
                  SHOP RUNWAY LOOK (PVN-SAR-02)
                </button>
              </div>
            </div>
          </div>

          {/* Editorial Double Photo Row */}
          <div className="pavun-lookbook-duo pavun-reveal-stagger">
            <div className="pavun-lookbook-duo__card pavun-reveal-card">
              <img src={sareeCrimsonBridal} alt="Shahi Lal Bridal Banarasi Saree" />
              <div className="pavun-lookbook-duo__caption">
                <h4>Shahi Lal Bridal Banarasi Saree</h4>
                <span>Pure Mulberry Silk in Tested Gold Zari</span>
              </div>
            </div>
            <div className="pavun-lookbook-duo__card pavun-reveal-card">
              <img src={edit2IvoryBrides} alt="The Sisterhood of Banarasi Silk" />
              <div className="pavun-lookbook-duo__caption">
                <h4>The Sisterhood of Banarasi Silk</h4>
                <span>Luminous Raw Silk &amp; Handloom Zari Drapes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 2: BANARASI SYMPHONY */}
      <section className="pavun-lookbook-chapter pavun-lookbook-chapter--alt">
        <div className="pavun-lookbook-container">
          <div className="pavun-lookbook-spread pavun-lookbook-spread--reversed">
            <div className="pavun-lookbook-spread__hero-img pavun-reveal-img">
              <img
                src={bannerBanarasiCourt}
                alt="Banarasi Symphony - Pit Loom Silk Saree Weaves"
              />
              <div className="pavun-lookbook-spread__tag">CHAPTER II / PIT-LOOM WEAVES</div>
            </div>

            <div className="pavun-lookbook-spread__content pavun-reveal-card">
              <span className="pavun-lb-num">02</span>
              <h2 className="pavun-lb-title">BANARASI SYMPHONY</h2>
              <p className="pavun-lb-quote">
                &ldquo;On centuries-old wooden pit looms along the sacred banks of Varanasi, pure silk threads and gold zari are woven into heirlooms that never fade.&rdquo;
              </p>
              <p className="pavun-lb-body">
                Featuring authentic Shikargah hunting motifs, floral kadwa jaal, and pure katan silk drapes woven over 45 days per saree by master national award-winning artisans.
              </p>

              <div className="pavun-lb-actions">
                <button
                  type="button"
                  className="pavun-lb-btn pavun-lb-btn--primary"
                  onClick={() => onNavigateCategory('banarasi')}
                >
                  DISCOVER PURE HANDLOOM SAREES
                </button>
                <button
                  type="button"
                  className="pavun-lb-btn pavun-lb-btn--secondary"
                  onClick={() => onQuickView(banarasiSample)}
                >
                  SHOP RUNWAY LOOK (PVN-SAR-01)
                </button>
              </div>
            </div>
          </div>

          {/* Editorial Double Photo Row */}
          <div className="pavun-lookbook-duo pavun-reveal-stagger">
            <div className="pavun-lookbook-duo__card pavun-reveal-card">
              <img src={edit4TurquoiseDrape} alt="Feroza Blue Drape & Jadau Bangles" />
              <div className="pavun-lookbook-duo__caption">
                <h4>Feroza Blue Drape &amp; Jadau Bangles</h4>
                <span>Concept Saree Drape with Polki Jewels</span>
              </div>
            </div>
            <div className="pavun-lookbook-duo__card pavun-reveal-card">
              <img src={edit3BurgundyVelvet} alt="Micro-Velvet Saree Blouse & Polki Choker" />
              <div className="pavun-lookbook-duo__caption">
                <h4>Micro-Velvet Blouse &amp; Pure Silk Drape</h4>
                <span>Hand-embroidered Dabka &amp; Marodi Work</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 3: KANJIVARAM & TISSUE DRAPES */}
      <section className="pavun-lookbook-chapter">
        <div className="pavun-lookbook-container">
          <div className="pavun-lookbook-spread">
            <div className="pavun-lookbook-spread__hero-img pavun-reveal-img">
              <img
                src={bannerSareeSlide3Desktop}
                alt="Imperial Gold Tissue & Kanjivaram Temple Silk Sarees"
              />
              <div className="pavun-lookbook-spread__tag">CHAPTER III / SACRED DRAPES</div>
            </div>

            <div className="pavun-lookbook-spread__content pavun-reveal-card">
              <span className="pavun-lb-num">03</span>
              <h2 className="pavun-lb-title">KANJIVARAM &amp; TISSUE SUITE</h2>
              <p className="pavun-lb-quote">
                &ldquo;Where pure metallic yarn meets liquid-gold luster, an aura of celestial grace crowns the modern Indian woman.&rdquo;
              </p>
              <p className="pavun-lb-body">
                From interlocking Korvai temple gopuram borders to liquid-gold tissue weaves that cascade like starlight, crafted for unforgettable evenings and wedding celebrations.
              </p>

              <div className="pavun-lb-actions">
                <button
                  type="button"
                  className="pavun-lb-btn pavun-lb-btn--primary"
                  onClick={() => onNavigateCategory('tissue')}
                >
                  EXPLORE TISSUE &amp; ZARI
                </button>
                <button
                  type="button"
                  className="pavun-lb-btn pavun-lb-btn--secondary"
                  onClick={() => onQuickView(tissueSample)}
                >
                  SHOP ATELIER CREATION (PVN-SAR-06)
                </button>
              </div>
            </div>
          </div>

          {/* Full-width editorial highlight */}
          <div className="pavun-lookbook-highlight pavun-reveal-banner">
            <div className="pavun-lookbook-highlight__img">
              <img src={edit5CrimsonVeil} alt="The Mughal Pavilion Crimson Saree Veil" />
            </div>
            <div className="pavun-lookbook-highlight__text">
              <h3>The Mughal Pavilion Saree Veil</h3>
              <p>
                Crafted in whisper-light tissue silk with scalloped French zardozi borders, designed to be worn over our handloom bridal sarees.
              </p>
              <button
                type="button"
                className="pavun-lb-btn pavun-lb-btn--primary"
                onClick={() => onNavigateCategory('banarasi')}
              >
                REQUEST CUSTOM BRIDAL SAREE
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LookbookPage;
