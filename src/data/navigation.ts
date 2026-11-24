export interface NavSubItem {
  label: string;
  href: string;
  badge?: string;
}

export interface NavCategoryGroup {
  title: string;
  items: NavSubItem[];
}

export interface NavFeaturedBanner {
  title: string;
  subtitle: string;
  imageSrc?: string;
  cta: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  subcategories?: NavCategoryGroup[];
  featuredBanner?: NavFeaturedBanner;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'HOME',
    href: '#home',
  },
  {
    id: 'banarasi',
    label: 'BANARASI SAREES',
    href: '#banarasi',
    subcategories: [
      {
        title: 'WEAVES & MOTIFS',
        items: [
          { label: 'Pure Banarasi Katan Silk', href: '#banarasi', badge: 'Artisanal' },
          { label: 'Shikargah Royal Hunt Jaal', href: '#banarasi' },
          { label: 'Kadwa Meenakari Boota', href: '#banarasi' },
          { label: 'Mughal Jangla All-Over', href: '#banarasi', badge: 'Bestseller' },
          { label: 'Tanchoi Fine Silk Weaves', href: '#banarasi' },
        ],
      },
      {
        title: 'OCCASIONS & PALETTES',
        items: [
          { label: 'Bridal Sindoori Crimson', href: '#banarasi' },
          { label: 'Imperial Emerald Royale', href: '#banarasi' },
          { label: 'Royal Aubergine & Gold', href: '#banarasi' },
          { label: 'Sunset Haldi & Marigold', href: '#banarasi' },
        ],
      },
    ],
    featuredBanner: {
      title: 'SACRED PIT-LOOM WEAVES',
      subtitle: 'Woven with tested gold zari on centuries-old Varanasi pit looms by generational master weavers.',
      cta: 'EXPLORE BANARASI SAREES',
    },
  },
  {
    id: 'kanjivaram',
    label: 'KANJIVARAM SAREES',
    href: '#kanjivaram',
    subcategories: [
      {
        title: 'HERITAGE EDITS',
        items: [
          { label: 'Korvai Temple Borders', href: '#kanjivaram', badge: 'Authentic' },
          { label: 'Pure 3-Ply Mulberry Silk', href: '#kanjivaram' },
          { label: 'Contrast Zari Pallu Drapes', href: '#kanjivaram' },
          { label: 'Patan Patola Double Ikat', href: '#kanjivaram', badge: 'Collector' },
        ],
      },
      {
        title: 'WEDDING TRADITIONS',
        items: [
          { label: 'Muhurtham Sacred Silks', href: '#kanjivaram' },
          { label: 'Reception Contrast Borders', href: '#kanjivaram' },
          { label: 'Temple Gopuram Motifs', href: '#kanjivaram' },
        ],
      },
    ],
    featuredBanner: {
      title: 'TEMPLE GOPURAM SILKS',
      subtitle: 'Heavy interlocking Korvai border drapes woven with 24-karat gold dipped zari.',
      cta: 'DISCOVER KANJIVARAM',
    },
  },
  {
    id: 'tissue',
    label: 'TISSUE & ZARI',
    href: '#tissue',
    subcategories: [
      {
        title: 'METALLIC DRAPES',
        items: [
          { label: 'Aariyana Couture Pre-Draped Corset', href: '#product', badge: 'Celebrity' },
          { label: 'Imperial Gold Tissue Zari', href: '#tissue', badge: 'Trending' },
          { label: 'Liquid Starlight Champagne', href: '#tissue' },
          { label: 'Turquoise & Gold Concept Saree', href: '#tissue' },
          { label: 'Pre-Draped Pleated Silk', href: '#tissue', badge: 'Runway' },
        ],
      },
    ],
    featuredBanner: {
      title: 'LIQUID GOLD DRAPES',
      subtitle: 'Ethereal metallic weaves offering a fluid red-carpet drape that catches every ray of starlight.',
      cta: 'VIEW TISSUE WEAVES',
    },
  },
  {
    id: 'product',
    label: 'PRE-DRAPED CORSET SAREE',
    href: '#product',
  },
  {
    id: 'organza',
    label: 'ORGANZA & CHANDERI',
    href: '#organza',
    subcategories: [
      {
        title: 'GOSSAMER WEAVES',
        items: [
          { label: 'Powder Blush Hand-Painted', href: '#organza' },
          { label: 'Gulmohar Flora Silk Organza', href: '#organza', badge: 'Artisanal' },
          { label: 'Chanderi Gold Bootee Heritage', href: '#organza' },
          { label: 'Scalloped Zardozi Borders', href: '#organza' },
        ],
      },
    ],
    featuredBanner: {
      title: 'TRANSLUCENT SILK FLORALS',
      subtitle: 'Featherlight sheer silks hand-painted with pastel botanical blooms and scalloped edges.',
      cta: 'EXPLORE ORGANZA',
    },
  },
  {
    id: 'collections',
    label: 'COLLECTIONS',
    href: '#collections',
  },
  {
    id: 'stores',
    label: 'STORES',
    href: '#stores',
  },
  {
    id: 'contact',
    label: 'CONTACT',
    href: '#contact',
  },
];
