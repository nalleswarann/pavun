import React from 'react';
import { ArrowRightIcon } from './Icons';
import sareeBanarasi from '../assets/products/saree_banarasi_katan.jpg';
import sareeKanjivaram from '../assets/products/saree_kanjivaram_temple.jpg';
import sareeTissue from '../assets/products/saree_tissue_gold.jpg';
import sareeOrganza from '../assets/products/saree_organza_pastel.jpg';
import './ShopBySilhouetteSection.css';

interface ShopBySilhouetteSectionProps {
  onExploreCategory: (category: string) => void;
}

interface SilhouetteCard {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  countTag: string;
  image: string;
}

const SILHOUETTES: SilhouetteCard[] = [
  {
    id: 'sil-banarasi',
    category: 'banarasi',
    title: 'IMPERIAL BANARASI KATAN',
    subtitle: 'Sacred Pit-Loom Real Gold Zari & Kadwa Motifs',
    countTag: '3 HEIRLOOM WEAVES',
    image: sareeBanarasi,
  },
  {
    id: 'sil-kanjivaram',
    category: 'kanjivaram',
    title: 'KANJIVARAM TEMPLE SILKS',
    subtitle: 'Pure 3-Ply Mulberry Silk & Korvai Borders',
    countTag: '2 SACRED WEAVES',
    image: sareeKanjivaram,
  },
  {
    id: 'sil-tissue',
    category: 'tissue',
    title: 'PURE GOLD TISSUE & ZARI',
    subtitle: 'Fluid Liquid-Gold Red Carpet Drapes',
    countTag: '4 METALLIC DRAPES',
    image: sareeTissue,
  },
  {
    id: 'sil-organza',
    category: 'organza',
    title: 'GOSSAMER ORGANZA & CHANDERI',
    subtitle: 'Hand-Painted Florals & Scalloped Zardozi',
    countTag: '3 WHISPER WEAVES',
    image: sareeOrganza,
  },
];

export const ShopBySilhouetteSection: React.FC<ShopBySilhouetteSectionProps> = ({
  onExploreCategory,
}) => {
  return (
    <section className="pavun-silhouettes" id="silhouettes" aria-label="Shop by Saree Silhouette">
      <div className="pavun-silhouettes__container">
        
        {/* Header */}
        <header className="pavun-silhouettes__header">
          <span className="pavun-silhouettes__eyebrow pavun-reveal-eyebrow">
            SACRED DRAPES &amp; WEAVING TRADITIONS
          </span>
          <h2 className="pavun-silhouettes__title pavun-reveal-title">
            SHOP BY SAREE SILHOUETTE
          </h2>
          <div className="pavun-silhouettes__divider pavun-reveal-divider" />
          <p className="pavun-silhouettes__subtitle pavun-reveal-text">
            From imperial Varanasi pit-loom katan silks to gossamer metallic gold tissue, explore Pavun's distinctive saree drapes woven for generational grace.
          </p>
        </header>

        {/* 4 Architectural Arched Cards Grid */}
        <div className="pavun-silhouettes__grid pavun-reveal-stagger">
          {SILHOUETTES.map((item, idx) => (
            <div
              key={item.id}
              className="pavun-silhouettes__card pavun-reveal-card"
              onClick={() => onExploreCategory(item.category)}
            >
              {/* Arched Photo Frame */}
              <div className="pavun-silhouettes__frame">
                <img
                  src={item.image}
                  alt={item.title}
                  className="pavun-silhouettes__img"
                  loading="lazy"
                />
                <div className="pavun-silhouettes__overlay" />
                
                <span className="pavun-silhouettes__number">
                  0{idx + 1}
                </span>

                <div className="pavun-silhouettes__hover-cta">
                  <span>DISCOVER WEAVE</span>
                  <ArrowRightIcon size={14} />
                </div>
              </div>

              {/* Text Meta */}
              <div className="pavun-silhouettes__info">
                <span className="pavun-silhouettes__tag">{item.countTag}</span>
                <h3 className="pavun-silhouettes__item-title">{item.title}</h3>
                <p className="pavun-silhouettes__item-subtitle">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShopBySilhouetteSection;
