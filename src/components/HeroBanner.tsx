import React, { useState, useEffect, useRef, useCallback } from 'react';
import sareeCrimsonDesktop from '../assets/new_banner_sarees/saree_crimson_banarasi_desktop.jpg';
import sareeCrimsonMobile from '../assets/new_banner_sarees/saree_crimson_banarasi_mobile.jpg';
import sareeKanjivaramDesktop from '../assets/new_banner_sarees/saree_kanjivaram_gold_desktop.jpg';
import sareeKanjivaramMobile from '../assets/new_banner_sarees/saree_kanjivaram_gold_mobile.jpg';
import sareeTempleDesktop from '../assets/new_banner_sarees/saree_temple_tissue_desktop.jpg';
import sareeTempleMobile from '../assets/new_banner_sarees/saree_temple_tissue_mobile.jpg';
import sareeBridalDesktop from '../assets/new_banner_sarees/saree_bridal_ornate_desktop.jpg';
import sareeBridalMobile from '../assets/new_banner_sarees/saree_bridal_ornate_mobile.jpg';

import sareeCrimsonBridal from '../assets/products/saree_crimson_bridal.jpg';
import edit2IvoryBrides from '../assets/new_images/edit_2_ivory_brides.jpg';
import edit4TurquoiseDrape from '../assets/new_images/edit_4_turquoise_drape.jpg';
import edit5CrimsonVeil from '../assets/new_images/edit_5_crimson_veil.jpg';

import { WhatsAppIcon, CloseIcon } from './Icons';
import './HeroBanner.css';

interface HeroBannerProps {
  onOpenCustomerCare?: () => void;
  onExploreCategory?: (category: string) => void;
}

interface SlideData {
  id: string;
  chapter: string;
  badge: string;
  title: string;
  subtitle: string;
  imageDesktop: string;
  imageMobile: string;
  ctaText: string;
  ctaLink: string;
  accentColor: string;
}

const SLIDES: SlideData[] = [
  {
    id: 'wedding-chapter',
    chapter: '01 / CHAPTER I',
    badge: 'AUTUMN • WINTER COUTURE 2026',
    title: 'THE WEDDING CHAPTER',
    subtitle: 'Inspired by nature and handcrafted with intention, celebrating heirloom saree motifs, bespoke zardozi, and timeless Indian royalty.',
    imageDesktop: sareeCrimsonDesktop,
    imageMobile: sareeCrimsonMobile,
    ctaText: 'EXPLORE NOW',
    ctaLink: '#wedding-chapter-gallery',
    accentColor: '#D4AF7C',
  },
  {
    id: 'banarasi-heirlooms',
    chapter: '02 / CHAPTER II',
    badge: 'SACRED PIT-LOOM WEAVES',
    title: 'BANARASI SYMPHONY',
    subtitle: 'Woven with authentic gold and silver zari threads on centuries-old pit looms by master artisans of Varanasi.',
    imageDesktop: sareeKanjivaramDesktop,
    imageMobile: sareeKanjivaramMobile,
    ctaText: 'DISCOVER SAREES',
    ctaLink: '#sarees',
    accentColor: '#D4AF7C',
  },
  {
    id: 'kanjivaram-tissue',
    chapter: '03 / CHAPTER III',
    badge: 'SACRED TEMPLE SILKS',
    title: 'KANJIVARAM & TISSUE DRAPES',
    subtitle: 'Woven with 24-karat gold dipped zari and pure mulberry silk, honoring centuries of divine temple architecture and modern regal celebrations.',
    imageDesktop: sareeTempleDesktop,
    imageMobile: sareeTempleMobile,
    ctaText: 'DISCOVER HEIRLOOMS',
    ctaLink: '#sarees',
    accentColor: '#1A6A53',
  },
  {
    id: 'royal-heritage-archive',
    chapter: '04 / CHAPTER IV',
    badge: 'MUSEUM ARCHIVE PIECES',
    title: 'ROYAL HERITAGE SAREES',
    subtitle: 'Celebrating the timeless beauty of six yards of pure silk adorned with handcrafted dabka, moti, and zardozi borders.',
    imageDesktop: sareeBridalDesktop,
    imageMobile: sareeBridalMobile,
    ctaText: 'EXPLORE HEIRLOOMS',
    ctaLink: '#sarees',
    accentColor: '#D4AF7C',
  },
];

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  tag: string;
  alt: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'crimson-bridal-saree',
    image: sareeCrimsonBridal,
    title: 'Shahi Lal Bridal Banarasi Saree',
    tag: 'Pure Handloom Silk',
    alt: 'Royal bride wearing pure crimson Banarasi silk saree with antique gold zari',
  },
  {
    id: 'ivory-brides',
    image: edit2IvoryBrides,
    title: 'The Sisterhood of Banarasi Silk',
    tag: 'Hand-Woven Heirlooms',
    alt: 'Two royal women draped in ivory and gold handwoven silk sarees',
  },
  {
    id: 'burgundy-velvet',
    image: sareeBridalDesktop,
    title: 'Heritage Zardozi Bridal Saree',
    tag: 'Hand-Embroidered Zari',
    alt: 'Regal Indian bride in gold and crimson embroidered handloom saree with jewelry',
  },
  {
    id: 'turquoise-saree-drape',
    image: edit4TurquoiseDrape,
    title: 'Feroza Blue Silk Saree Drape',
    tag: 'Concept Saree Drape',
    alt: 'Woman wearing turquoise blue embroidered saree with polki bangles and ring',
  },
  {
    id: 'crimson-veil-pillars',
    image: edit5CrimsonVeil,
    title: 'The Mughal Pavilion Crimson Saree Veil',
    tag: 'Heirloom Saree Drape',
    alt: 'Royal woman wearing crimson silk saree with sheer pallu veil between stone pillars',
  },
];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenCustomerCare,
  onExploreCategory,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeLightboxImage, setActiveLightboxImage] = useState<GalleryItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const slideDuration = 5500; // ms per slide
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // House of Masaba style auto-advance with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, slideDuration);

    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Touch Swipe Handlers for Mobile & Tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
  };

  const handleCtaClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (onExploreCategory) {
      onExploreCategory(link.replace('#', ''));
    }
    const target = document.querySelector(link);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pavun-experience" id="home">
      
      {/* =========================================================================
          SECTION 1: House of Masaba-Style Haute Couture Banner Slider
          ========================================================================= */}
      <section
        className="pavun-hero-slider"
        aria-label="Haute Couture Saree Banner"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides Container */}
        <div className="pavun-hero-slider__slides">
          {SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;

            return (
              <div
                key={slide.id}
                className={`pavun-hero-slider__slide ${isActive ? 'pavun-hero-slider__slide--active' : ''}`}
                aria-hidden={!isActive}
                onClick={(e) => handleCtaClick(e, slide.ctaLink)}
              >
                {/* Responsive Picture: Desktop 16:9 vs Mobile 9:16 Portrait */}
                <div className="pavun-hero-slider__media-wrap">
                  <picture className="pavun-hero-slider__picture">
                    <source media="(max-width: 767px)" srcSet={slide.imageMobile} />
                    <img
                      src={slide.imageDesktop}
                      alt={slide.title}
                      className="pavun-hero-slider__img"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </picture>
                </div>

                {/* Ambient Cinematic Vignette Overlays */}
                <div className="pavun-hero-slider__overlay-vignette" />
                <div className="pavun-hero-slider__overlay-gradient" />

                {/* Animated Title ONLY */}
                <div className="pavun-hero-slider__content-wrap">
                  <div className="pavun-hero-slider__content">
                    <h1 className="pavun-hero-slider__title">
                      <span className="pavun-hero-slider__title-inner">
                        {slide.title}
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimalist Navigation Arrows (House of Masaba Style) */}
        <button
          type="button"
          className="pavun-hero-slider__arrow pavun-hero-slider__arrow--prev"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous Slide"
        >
          ‹
        </button>
        <button
          type="button"
          className="pavun-hero-slider__arrow pavun-hero-slider__arrow--next"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next Slide"
        >
          ›
        </button>
      </section>

      {/* =========================================================================
          SECTION 2: The Wedding Chapter Curated Editorial Grid (From Reference)
          ========================================================================= */}
      <section className="pavun-wedding-chapter" id="wedding-chapter-gallery">
        <div className="pavun-wedding-chapter__container">
          
          <div className="pavun-wedding-chapter__grid">
            
            {/* COLUMN 1: Story Text Block + Bottom Crimson Bridal Saree Image */}
            <div className="pavun-wedding-chapter__col pavun-wedding-chapter__col--1">
              
              {/* Top Editorial Story Block */}
              <div className="pavun-wedding-chapter__story-card">
                <span className="pavun-wedding-chapter__story-tag pavun-reveal-eyebrow">HAUTE COUTURE BRIDAL</span>
                <h2 className="pavun-wedding-chapter__story-title pavun-reveal-title">THE WEDDING CHAPTER</h2>
                <div className="pavun-wedding-chapter__story-divider pavun-reveal-divider" />
                <p className="pavun-wedding-chapter__story-desc pavun-reveal-text">
                  Inspired by nature and handcrafted with intention, The Wedding Chapter celebrates love through meaningful motifs, heirloom silk weaves and timeless saree draping artistry.
                </p>
                <p className="pavun-wedding-chapter__story-tagline pavun-reveal-text">
                  A bridal saree collection designed to be remembered.
                </p>
                <a
                  href="#sarees"
                  className="pavun-wedding-chapter__story-btn pavun-reveal-text"
                  onClick={(e) => handleCtaClick(e, '#sarees')}
                >
                  <span>EXPLORE SAREES</span>
                  <span className="pavun-wedding-chapter__btn-line" />
                </a>
              </div>

              {/* Bottom Image: Crimson Bridal Banarasi Saree */}
              <div
                className="pavun-wedding-chapter__photo-card pavun-reveal-img"
                onClick={() => setActiveLightboxImage(GALLERY_ITEMS[0])}
              >
                <div className="pavun-wedding-chapter__photo-wrap">
                  <img
                    src={GALLERY_ITEMS[0].image}
                    alt={GALLERY_ITEMS[0].alt}
                    className="pavun-wedding-chapter__img"
                    loading="lazy"
                  />
                  <div className="pavun-wedding-chapter__photo-overlay">
                    <span className="pavun-wedding-chapter__photo-tag">{GALLERY_ITEMS[0].tag}</span>
                    <h4 className="pavun-wedding-chapter__photo-title">{GALLERY_ITEMS[0].title}</h4>
                    <span className="pavun-wedding-chapter__photo-view">VIEW DETAILS +</span>
                  </div>
                </div>
              </div>

            </div>

            {/* COLUMN 2: Ivory Saree Brides Top + Burgundy Velvet Saree Blouse Bottom */}
            <div className="pavun-wedding-chapter__col pavun-wedding-chapter__col--2">
              
              {/* Top Image: Ivory Brides in Sarees */}
              <div
                className="pavun-wedding-chapter__photo-card pavun-wedding-chapter__photo-card--tall pavun-reveal-img"
                onClick={() => setActiveLightboxImage(GALLERY_ITEMS[1])}
              >
                <div className="pavun-wedding-chapter__photo-wrap">
                  <img
                    src={GALLERY_ITEMS[1].image}
                    alt={GALLERY_ITEMS[1].alt}
                    className="pavun-wedding-chapter__img"
                    loading="lazy"
                  />
                  <div className="pavun-wedding-chapter__photo-overlay">
                    <span className="pavun-wedding-chapter__photo-tag">{GALLERY_ITEMS[1].tag}</span>
                    <h4 className="pavun-wedding-chapter__photo-title">{GALLERY_ITEMS[1].title}</h4>
                    <span className="pavun-wedding-chapter__photo-view">VIEW DETAILS +</span>
                  </div>
                </div>
              </div>

              {/* Bottom Image: Velvet Blouse with Saree Drape */}
              <div
                className="pavun-wedding-chapter__photo-card pavun-reveal-img"
                onClick={() => setActiveLightboxImage(GALLERY_ITEMS[2])}
              >
                <div className="pavun-wedding-chapter__photo-wrap">
                  <img
                    src={GALLERY_ITEMS[2].image}
                    alt={GALLERY_ITEMS[2].alt}
                    className="pavun-wedding-chapter__img"
                    loading="lazy"
                  />
                  <div className="pavun-wedding-chapter__photo-overlay">
                    <span className="pavun-wedding-chapter__photo-tag">{GALLERY_ITEMS[2].tag}</span>
                    <h4 className="pavun-wedding-chapter__photo-title">{GALLERY_ITEMS[2].title}</h4>
                    <span className="pavun-wedding-chapter__photo-view">VIEW DETAILS +</span>
                  </div>
                </div>
              </div>

            </div>

            {/* COLUMN 3: Turquoise Saree Drape Top + Crimson Saree Veil Bottom */}
            <div className="pavun-wedding-chapter__col pavun-wedding-chapter__col--3">
              
              {/* Top Image: Turquoise Blue Saree Drape */}
              <div
                className="pavun-wedding-chapter__photo-card pavun-wedding-chapter__photo-card--tall pavun-reveal-img"
                onClick={() => setActiveLightboxImage(GALLERY_ITEMS[3])}
              >
                <div className="pavun-wedding-chapter__photo-wrap">
                  <img
                    src={GALLERY_ITEMS[3].image}
                    alt={GALLERY_ITEMS[3].alt}
                    className="pavun-wedding-chapter__img"
                    loading="lazy"
                  />
                  <div className="pavun-wedding-chapter__photo-overlay">
                    <span className="pavun-wedding-chapter__photo-tag">{GALLERY_ITEMS[3].tag}</span>
                    <h4 className="pavun-wedding-chapter__photo-title">{GALLERY_ITEMS[3].title}</h4>
                    <span className="pavun-wedding-chapter__photo-view">VIEW DETAILS +</span>
                  </div>
                </div>
              </div>

              {/* Bottom Image: Crimson Veil with Stone Pillars */}
              <div
                className="pavun-wedding-chapter__photo-card pavun-reveal-img"
                onClick={() => setActiveLightboxImage(GALLERY_ITEMS[4])}
              >
                <div className="pavun-wedding-chapter__photo-wrap">
                  <img
                    src={GALLERY_ITEMS[4].image}
                    alt={GALLERY_ITEMS[4].alt}
                    className="pavun-wedding-chapter__img"
                    loading="lazy"
                  />
                  <div className="pavun-wedding-chapter__photo-overlay">
                    <span className="pavun-wedding-chapter__photo-tag">{GALLERY_ITEMS[4].tag}</span>
                    <h4 className="pavun-wedding-chapter__photo-title">{GALLERY_ITEMS[4].title}</h4>
                    <span className="pavun-wedding-chapter__photo-view">VIEW DETAILS +</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Lightbox Modal for Full View */}
      {activeLightboxImage && (
        <div
          className="pavun-lightbox"
          onClick={() => setActiveLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="pavun-lightbox__content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="pavun-lightbox__close"
              onClick={() => setActiveLightboxImage(null)}
              aria-label="Close Preview"
            >
              <CloseIcon size={24} />
            </button>
            <img
              src={activeLightboxImage.image}
              alt={activeLightboxImage.alt}
              className="pavun-lightbox__img"
            />
            <div className="pavun-lightbox__caption">
              <span className="pavun-lightbox__tag">{activeLightboxImage.tag}</span>
              <h3 className="pavun-lightbox__title">{activeLightboxImage.title}</h3>
              <p className="pavun-lightbox__desc">{activeLightboxImage.alt}</p>
              <div className="pavun-lightbox__actions">
                <a
                  href="#customer-care"
                  className="pavun-lightbox__inquire-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveLightboxImage(null);
                    if (onOpenCustomerCare) onOpenCustomerCare();
                  }}
                >
                  <WhatsAppIcon size={16} />
                  <span>INQUIRE ABOUT THIS HEIRLOOM SAREE</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;
