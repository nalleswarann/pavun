import React, { useState, useEffect, useRef } from 'react';
import { WhatsAppIcon, SparkleIcon, CheckIcon, ArrowRightIcon } from './Icons';
import craftZardozi from '../assets/new_images/edit_3_burgundy_velvet.jpg';
import craftWeaving from '../assets/new_images/banner_banarasi_court.jpg';
import craftCorset from '../assets/new_images/edit_5_crimson_veil.jpg';
import './AtelierCraftSection.css';

interface AtelierCraftSectionProps {
  onOpenCustomerCare?: () => void;
  onExploreLookbook?: () => void;
}

interface CraftPillar {
  id: string;
  step: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  desc: string;
  badges: string[];
  image: string;
  artisanQuote: string;
  artisanName: string;
  progressPercent: number;
}

const CRAFT_PILLARS: CraftPillar[] = [
  {
    id: 'zardozi',
    step: 'TECHNIQUE 01',
    stepNumber: '01',
    title: 'GENERATIONAL ZARDOZI & BLOUSE ARTISTRY',
    subtitle: 'Hand-Gilded Bullion Wire & Needlework',
    desc: 'Each bespoke bridal saree blouse and embroidered pallu border requires over 250 to 400 hours of continuous needle craftsmanship by third-generation master karigars. Real metallic wires, cutdana, dabka, and micro-pearls are anchored stitch-by-stitch upon rich micro-velvet and pure silk organza.',
    badges: ['300+ Hours Handcrafted', 'Pure Bullion Wire', 'Agra & Lucknow Lineages'],
    image: craftZardozi,
    artisanQuote: '"A single motif holds thirty-two distinct needle motions. When you drape Pavun, you wear centuries of quiet devotion."',
    artisanName: 'Ustad Farooq Ahmed • Master Karigar (38 Years of Heritage)',
    progressPercent: 33,
  },
  {
    id: 'pitloom',
    step: 'TECHNIQUE 02',
    stepNumber: '02',
    title: 'SACRED PIT-LOOM WEAVING',
    subtitle: 'Varanasi Kadwa Weaves & Real Silver Zari',
    desc: 'Woven on subterranean pit looms in Varanasi, where humidity and temperature remain naturally calibrated. Master weavers pass the shuttle by hand to execute the revered Kadwa technique, ensuring no loose floats appear on the reverse of the drape.',
    badges: ['100% Pure Katan Silk', 'Real Tested Silver Zari', 'Authentic GI Tag Certified'],
    image: craftWeaving,
    artisanQuote: '"We weave not just silk, but light itself. The gold thread breathes with every fold of the fabric."',
    artisanName: 'Pt. Radhe Shyam • Master Weaver, Varanasi Atelier',
    progressPercent: 66,
  },
  {
    id: 'corsetry',
    step: 'TECHNIQUE 03',
    stepNumber: '03',
    title: 'BESPOKE ROYAL DRAPING & PRE-PLEATING',
    subtitle: 'Architectural Framing & Pre-Pleated Poise',
    desc: 'Our proprietary ready-to-wear pre-pleating balances the weight of heavy heirloom zari sarees flawlessly on the waist, allowing effortless royal poise for the bride throughout day-long rituals and nocturnal celebrations.',
    badges: ['Effortless 60-Sec Drape', 'Internal Micro-Framing', 'Bespoke Custom Fitting'],
    image: craftCorset,
    artisanQuote: '"Haute couture is nothing without comfort. A Pavun bride glides as if she is crowned, never weighed down."',
    artisanName: 'Gayatri Deshmukh • Head Couturier & Master Draper',
    progressPercent: 100,
  },
];

export const AtelierCraftSection: React.FC<AtelierCraftSectionProps> = ({
  onOpenCustomerCare,
  onExploreLookbook,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const currentCraft = CRAFT_PILLARS[activeTab];
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // High-performance IntersectionObserver for tracking craft steps without forced reflows or scroll lag
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setActiveTab(index);
            }
          }
        });
      },
      {
        rootMargin: '-25% 0px -25% 0px',
        threshold: 0.3,
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToStep = (index: number) => {
    setActiveTab(index);
    const targetEl = cardRefs.current[index];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="pavun-craft" id="atelier-craft" ref={sectionRef} aria-label="Pavun Savoir-Faire">
      <div className="pavun-craft__container">
        
        {/* Section Header */}
        <header className="pavun-craft__header">
          <div className="pavun-craft__eyebrow pavun-reveal-eyebrow">
            <SparkleIcon size={14} className="pavun-craft__sparkle" />
            <span>HERITAGE SAVOIR-FAIRE</span>
            <SparkleIcon size={14} className="pavun-craft__sparkle" />
          </div>
          <h2 className="pavun-craft__title pavun-reveal-title">THE ATELIER CRAFTSMANSHIP</h2>
          <div className="pavun-craft__divider pavun-reveal-divider" />
          <p className="pavun-craft__subtitle pavun-reveal-text">
            Behind every heirloom saree lies an uncompromised commitment to generational Indian craft.
            Scroll through our three sacred techniques to explore how master artisans weave liquid gold and silk into history.
          </p>
        </header>

        {/* Pinned Scrollytelling Stage Layout */}
        <div className="pavun-craft__showcase pavun-craft__showcase--pinned">
          
          {/* Left Column: Scrolling Story Cards */}
          <div className="pavun-craft__story-col">
            
            {/* Sticky Navigation Pills (Sticks at top of scrolling column) */}
            <div className="pavun-craft__tabs-sticky" role="tablist">
              {CRAFT_PILLARS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeTab}
                  className={`pavun-craft__tab-btn ${idx === activeTab ? 'pavun-craft__tab-btn--active' : ''}`}
                  onClick={() => scrollToStep(idx)}
                >
                  <span className="pavun-craft__tab-step">{item.stepNumber}</span>
                  <span className="pavun-craft__tab-name">{item.step}</span>
                  {idx === activeTab && <span className="pavun-craft__tab-indicator" />}
                </button>
              ))}
            </div>

            {/* 3 Sequential Technique Cards */}
            <div className="pavun-craft__cards-sequence">
              {CRAFT_PILLARS.map((pillar, idx) => {
                const isActive = idx === activeTab;

                return (
                  <div
                    key={pillar.id}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className={`pavun-craft__stage-card ${isActive ? 'pavun-craft__stage-card--active' : ''}`}
                    onClick={() => setActiveTab(idx)}
                  >
                    <div className="pavun-craft__stage-header">
                      <span className="pavun-craft__stage-badge">{pillar.step}</span>
                      <span className="pavun-craft__stage-num">0{idx + 1} / 03</span>
                    </div>

                    <span className="pavun-craft__tagline">{pillar.subtitle}</span>
                    <h3 className="pavun-craft__item-title">{pillar.title}</h3>
                    <p className="pavun-craft__item-desc">{pillar.desc}</p>

                    {/* Technique Badges */}
                    <div className="pavun-craft__badges">
                      {pillar.badges.map((b, bIdx) => (
                        <div key={bIdx} className="pavun-craft__badge">
                          <CheckIcon size={13} className="pavun-craft__check" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    {/* Master Artisan Quote */}
                    <blockquote className="pavun-craft__quote-card">
                      <p className="pavun-craft__quote-text">{pillar.artisanQuote}</p>
                      <cite className="pavun-craft__quote-author">— {pillar.artisanName}</cite>
                    </blockquote>

                    {/* Actions */}
                    <div className="pavun-craft__actions">
                      <button
                        type="button"
                        className="pavun-craft__action-btn pavun-craft__action-btn--primary"
                        onClick={onOpenCustomerCare}
                      >
                        <WhatsAppIcon size={16} />
                        <span>DISCUSS BESPOKE CREATION</span>
                      </button>
                      <button
                        type="button"
                        className="pavun-craft__action-btn pavun-craft__action-btn--secondary"
                        onClick={onExploreLookbook}
                      >
                        <span>EXPLORE LOOKBOOK</span>
                        <ArrowRightIcon size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Sticky / Pinned Visual Frame */}
          <div className="pavun-craft__visual-col pavun-craft__visual-col--pinned">
            <div className="pavun-craft__sticky-frame-wrapper">
              
              {/* Pinned Stage Status Header */}
              <div className="pavun-craft__pinned-status-bar">
                <div className="pavun-craft__status-indicator">
                  <span className="pavun-craft__status-dot" />
                  <span className="pavun-craft__status-text">
                    PINNED SAVOIR-FAIRE ARCHIVE • STEP {currentCraft.stepNumber} / 03
                  </span>
                </div>
                {/* Micro Progress Bar */}
                <div className="pavun-craft__status-progress-track">
                  <div
                    className="pavun-craft__status-progress-fill"
                    style={{ width: `${currentCraft.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Pinned Visual Frame with Cross-Dissolve */}
              <div className="pavun-craft__visual-frame">
                {CRAFT_PILLARS.map((pillar, idx) => {
                  const isVisible = idx === activeTab;

                  return (
                    <img
                      key={pillar.id}
                      src={pillar.image}
                      alt={pillar.title}
                      className={`pavun-craft__visual-img pavun-craft__visual-img--stacked ${isVisible ? 'pavun-craft__visual-img--active' : ''}`}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  );
                })}

                <div className="pavun-craft__visual-vignette" />
                
                {/* Floating Bottom Card Over Image */}
                <div className="pavun-craft__visual-overlay-info">
                  <span className="pavun-craft__visual-pill">PAVUN SAVOIR-FAIRE 2026</span>
                  <span className="pavun-craft__visual-step">{currentCraft.step}</span>
                  <h4 className="pavun-craft__visual-heading">{currentCraft.subtitle}</h4>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AtelierCraftSection;
