import type { Product, StoreLocation } from '../types/ecommerce';

// Import woman-in-saree high-resolution product photos
import mrunalNavyFront from '../assets/products/mrunal/mrunal_navy_full_front.jpg';
import mrunalNavyBack from '../assets/products/mrunal/mrunal_navy_back_cutout.jpg';
import mrunalNavyMid from '../assets/products/mrunal/mrunal_navy_mid_shot.jpg';
import mrunalNavyPortrait from '../assets/products/mrunal/mrunal_navy_portrait_jewelry.jpg';

import aariyanaGoldFront from '../assets/products/aariyana/aariyana_gold_front_full.jpg';
import aariyanaCorsetDetail from '../assets/products/aariyana/aariyana_corset_handwork_detail.jpg';
import aariyanaPalluDrape from '../assets/products/aariyana/aariyana_gold_pallu_drape.jpg';
import aariyanaEmbroidery from '../assets/products/aariyana/aariyana_embroidery_macro.jpg';
import aariyanaMotion from '../assets/products/aariyana/aariyana_model_motion.jpg';

import sareeBanarasiKatan from '../assets/products/saree_banarasi_katan.jpg';
import sareeKanjivaramTemple from '../assets/products/saree_kanjivaram_temple.jpg';
import sareeTissueGold from '../assets/products/saree_tissue_gold.jpg';
import sareeOrganzaPastel from '../assets/products/saree_organza_pastel.jpg';
import sareeChanderiHeritage from '../assets/products/saree_chanderi_heritage.jpg';
import sareePreDrapedConcept from '../assets/products/saree_pre_draped_concept.jpg';
import sareeRoyalEmerald from '../assets/products/saree_royal_emerald.jpg';
import sareeCrimsonBridal from '../assets/products/saree_crimson_bridal.jpg';
import sareeChampagneTissue from '../assets/products/saree_champagne_tissue.jpg';
import sareeFloralOrganza from '../assets/products/saree_floral_organza.jpg';
import sareeHeritagePatan from '../assets/products/saree_heritage_patan.jpg';
import sareeTurquoiseDrape from '../assets/new_images/edit_4_turquoise_drape.jpg';

import storeMumbai from '../assets/products/store_mumbai.jpg';
import storeDelhi from '../assets/products/store_delhi.jpg';
import storeHyderabad from '../assets/products/store_hyderabad.jpg';

export const PRODUCTS: Product[] = [
  // --------------------------------------------------------------------------
  // MRUNAL KHIMJI FLAGSHIP SAREE (Navy Crepe V-neck Hand Embroidered Set)
  // Reference: https://www.azafashions.com
  // --------------------------------------------------------------------------
  {
    id: 'sar-mrunal-navy',
    itemCode: 'MK-729482',
    designer: 'Mrunal Khimji',
    title: 'Navy Crepe V-neck Hand Embroidered Saree And Blouse Set',
    subtitle: 'Solid Navy Blue Pure Crepe Silk with Intricate Hand Embroidered Cutdana Border & V-neck Blouse',
    category: 'tissue',
    subcategory: 'Crepe & Handloom Sarees',
    price: 91751,
    originalPrice: 108000,
    tag: 'New Arrivals',
    wishlistCountBadge: 'Wishlisted by 50+',
    containsBadge: 'Contains: Saree,Blouse',
    image: mrunalNavyFront,
    secondaryImage: mrunalNavyBack,
    gallery: [
      mrunalNavyFront,
      mrunalNavyBack,
      mrunalNavyMid,
      mrunalNavyPortrait,
    ],
    color: 'Midnight Navy Blue',
    fabric: 'Pure Silk Crepe & Satin with Hand Embroidered Cutdana Work',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL', 'Custom Made-to-Measure'],
    sku: 'PVN-MK-91751',
    description: 'Exemplifying timeless modern glamour, this Mrunal Khimji saree is rendered in a deep midnight navy pure crepe silk. Accented with an artisanal tonal cutdana hand-embroidered border, the ensemble is paired with an architectural deep back-cutout V-neck blouse adorned with intricate bullion needlework.',
    details: [
      '2-Piece Set: Fluid crepe saree and hand-embroidered blouse',
      'Blouse features V-neckline with fitted sleeves and deep cutout back',
      'Artisanal cutdana, bugle beads, and tonal metallic thread embroidery',
      'Dry clean only in cold solvent; store in provided muslin archival case',
    ],
  },

  // --------------------------------------------------------------------------
  // AARIYANA COUTURE FLAGSHIP PRODUCT (Item 724969)
  // --------------------------------------------------------------------------
  {
    id: 'sar-aariyana-724969',
    itemCode: '724969',
    designer: 'Aariyana Couture',
    title: 'Gold Silk & Net Hand-Embroidered Pre-Draped Saree with Handwork Corset',
    subtitle: 'Metallic Gold Tissue & Fine Illusion Net with Cutdana Stones & Structured Boned Corset',
    category: 'tissue',
    subcategory: 'Pre-Draped Fusion Sarees',
    price: 145000,
    originalPrice: 175000,
    tag: 'Celebrity Favourite',
    image: aariyanaGoldFront,
    secondaryImage: aariyanaCorsetDetail,
    gallery: [
      aariyanaGoldFront,
      aariyanaCorsetDetail,
      aariyanaPalluDrape,
      aariyanaEmbroidery,
      aariyanaMotion,
    ],
    color: 'Antique Imperial Gold',
    fabric: 'Pure Silk Tissue Blend & Illusion Micro-Net with Satin Lycra Underskirt',
    sizes: ['XS (32")', 'S (34")', 'M (36")', 'L (38")', 'XL (40")', 'XXL (42")', 'Custom Made-to-Measure'],
    sku: 'PVN-AC-724969',
    description: 'Exemplifying modern Indian couture, this Aariyana Couture pre-draped silhouette merges the fluid grace of traditional saree draping with an architectural handwork corset blouse. Sculpted in metallic gold silk tissue and sheer illusion net, the ensemble sparkles with hand-set cutdana stones, crystals, and delicate metallic bullion embroidery.',
    details: [
      '2-Piece Set: Pre-draped pleated saree with flowing pallu, and structured corset blouse',
      'Corset features internal boning, padded cups, sweetheart neckline, and lace-up back tie',
      'Pre-stitched pleating with concealed side zipper and hook-and-eye closure for effortless 60-second wear',
      'Inbuilt satin-lycra underskirt ensuring comfort and sleek contouring',
      'Dry clean only in specialized solvent; store in archival muslin bag provided',
    ],
  },

  // --------------------------------------------------------------------------
  // BANARASI SAREES
  // --------------------------------------------------------------------------
  {
    id: 'sar-01',
    itemCode: 'PVN-BNR-01',
    designer: 'PAVUN Atelier Heritage',
    title: 'Pure Banarasi Katan Silk Shikargah Saree',
    subtitle: 'Woven on Pit Looms with Real Gold Zari',
    category: 'banarasi',
    subcategory: 'Banarasi Katan Silk',
    price: 85000,
    originalPrice: 98000,
    tag: 'Heritage Masterpiece',
    image: sareeBanarasiKatan,
    secondaryImage: sareeCrimsonBridal,
    gallery: [
      sareeBanarasiKatan,
      sareeCrimsonBridal,
      sareeRoyalEmerald,
      aariyanaPalluDrape,
    ],
    color: 'Deep Crimson & Gold',
    fabric: '100% Pure Katan Silk',
    sizes: ['Standard 5.5m + 1m Blouse Piece', 'Ready-to-Wear Pre-Pleated', 'Custom Made-to-Measure'],
    sku: 'PVN-SAR-2026-01',
    description: 'An authentic Banarasi Katan silk saree from Varanasi pit looms, featuring the prestigious Shikargah hunt motifs in tested gold zari.',
    details: [
      'Certified Handloom Mark & Silk Mark India verified',
      'Intricate pallu weaving taking over 45 days per saree',
      'Unstitched matching silk blouse piece included',
      'Includes handcrafted muslin preservation bag',
    ],
  },
  {
    id: 'sar-02',
    itemCode: 'PVN-BNR-02',
    designer: 'PAVUN Royal Bridal',
    title: 'Shahi Lal Banarasi Bridal Trousseau Saree',
    subtitle: 'Intricate Kadwa Meenakari with Floral Jaal',
    category: 'banarasi',
    subcategory: 'Banarasi Katan Silk',
    price: 115000,
    originalPrice: 130000,
    tag: 'Bestseller',
    image: sareeCrimsonBridal,
    secondaryImage: sareeBanarasiKatan,
    gallery: [
      sareeCrimsonBridal,
      sareeBanarasiKatan,
      sareeRoyalEmerald,
      aariyanaGoldFront,
    ],
    color: 'Vermillion Red & Antique Zari',
    fabric: 'Hand-loomed Pure Mulberry Katan Silk',
    sizes: ['Standard 5.5m + 1m Blouse Piece', 'Ready-to-Wear Pre-Pleated', 'Custom Made-to-Measure'],
    sku: 'PVN-SAR-2026-02',
    description: 'A royal bridal heirloom woven with pure silver and gold zari threads in the traditional Kadwa technique, creating raised floral motifs that gleam in candlelight.',
    details: [
      'Heavy 850g pure silk drape suitable for sacred wedding rituals',
      'Elaborate peacock and lotus medallion pallu',
      'Complimentary unstitched heavy brocade blouse fabric',
      'Includes certificate of artisanal provenance from Varanasi guild',
    ],
  },
  {
    id: 'sar-03',
    itemCode: 'PVN-BNR-03',
    designer: 'PAVUN Heritage Weaves',
    title: 'Royal Emerald Katan Silk Jangla Saree',
    subtitle: 'All-over Mughal Vine Pattern in Antique Gold',
    category: 'banarasi',
    subcategory: 'Banarasi Katan Silk',
    price: 95000,
    tag: 'New Season',
    image: sareeRoyalEmerald,
    secondaryImage: sareeBanarasiKatan,
    gallery: [
      sareeRoyalEmerald,
      sareeBanarasiKatan,
      sareeCrimsonBridal,
      aariyanaPalluDrape,
    ],
    color: 'Emerald Green & Gold',
    fabric: 'Pure Mulberry Katan Silk',
    sizes: ['Standard 5.5m + 1m Blouse Piece', 'Ready-to-Wear Pre-Pleated', 'Custom Made-to-Measure'],
    sku: 'PVN-SAR-2026-03',
    description: 'Deep jewel-tone emerald green pure silk canvas woven with an intricate all-over Jangla jaal, echoing the imperial gardens of the Mughal emperors.',
    details: [
      'Hand-woven over 60 days on traditional Varanasi pit-looms',
      'Resham meenakari detailing in subtle ruby and sapphire threads',
      'Includes tailored fall and edge-pico finishing',
    ],
  },

  // --------------------------------------------------------------------------
  // KANJIVARAM SAREES
  // --------------------------------------------------------------------------
  {
    id: 'sar-04',
    itemCode: 'PVN-KNJ-04',
    designer: 'PAVUN Kanchipuram Guild',
    title: 'Kanjivaram Korvai Temple Border Silk Saree',
    subtitle: 'Pure Mulberry Silk with Contrast Zari Pallu',
    category: 'kanjivaram',
    subcategory: 'Kanjivaram Temple Silk',
    price: 92000,
    originalPrice: 105000,
    tag: 'Artisanal',
    image: sareeKanjivaramTemple,
    secondaryImage: sareeHeritagePatan,
    gallery: [
      sareeKanjivaramTemple,
      sareeHeritagePatan,
      sareeRoyalEmerald,
      aariyanaPalluDrape,
    ],
    color: 'Emerald & Royal Purple',
    fabric: 'Pure Mulberry Silk (3-ply)',
    sizes: ['Standard 5.5m + 1m Blouse Piece', 'Ready-to-Wear Pre-Pleated', 'Custom Made-to-Measure'],
    sku: 'PVN-SAR-2026-04',
    description: 'Woven using the traditional interlocking Korvai technique, this Kanjivaram saree displays peacock and temple gopuram motifs in heavy gold zari.',
    details: [
      'Heavy 3-ply silk weight for effortless regal drape',
      'Contrasting purple zari pallu with rich meenakari accents',
      'Comes with authentic Silk Mark India certificate of provenance',
    ],
  },
  {
    id: 'sar-05',
    itemCode: 'PVN-PTN-05',
    designer: 'PAVUN Master Artisan',
    title: 'Patan Patola Double Ikat Heritage Saree',
    subtitle: 'Geometrical Pan-Bhat Motifs Woven with Natural Dyes',
    category: 'kanjivaram',
    subcategory: 'Heritage Handloom',
    price: 145000,
    tag: 'Limited Edition',
    image: sareeHeritagePatan,
    secondaryImage: sareeKanjivaramTemple,
    gallery: [
      sareeHeritagePatan,
      sareeKanjivaramTemple,
      sareeBanarasiKatan,
      aariyanaMotion,
    ],
    color: 'Crimson, Mustard & Indigo',
    fabric: 'Pure Hand-spun Silk Ikat',
    sizes: ['Standard 5.5m + 1m Blouse Piece', 'Ready-to-Wear Pre-Pleated', 'Custom Made-to-Measure'],
    sku: 'PVN-SAR-2026-05',
    description: 'A collector’s treasure crafted using the legendary double ikat technique where warp and weft are individually tie-dyed before weaving. Identical vibrancy on both sides.',
    details: [
      'Master artisan signature piece requiring 5 months of weaving',
      'Colored exclusively with plant-based and mineral natural dyes',
      'Includes museum-grade acid-free archival storage box',
    ],
  },

  // --------------------------------------------------------------------------
  // TISSUE & ZARI SAREES
  // --------------------------------------------------------------------------
  {
    id: 'sar-06',
    itemCode: 'PVN-TIS-06',
    designer: 'PAVUN Gold Couture',
    title: 'Imperial Gold Tissue Zari Saree',
    subtitle: 'Fluid Metallic Weave for Modern Soirees',
    category: 'tissue',
    subcategory: 'Tissue & Gold Weaves',
    price: 78000,
    originalPrice: 89000,
    tag: 'Trending',
    image: sareeTissueGold,
    secondaryImage: sareeChampagneTissue,
    gallery: [
      sareeTissueGold,
      sareeChampagneTissue,
      aariyanaGoldFront,
      aariyanaPalluDrape,
      sareePreDrapedConcept,
    ],
    color: 'Antique Champagne Gold',
    fabric: 'Metallic Tissue & Mulberry Silk',
    sizes: ['Standard 5.5m + 1m Blouse Piece', 'Ready-to-Wear Pre-Pleated', 'Custom Made-to-Measure'],
    sku: 'PVN-SAR-2026-06',
    description: 'The viral red-carpet tissue saree crafted with fine metallic yarn, offering an ethereal liquid-gold drape that glimmers under evening chandeliers.',
    details: [
      'Lightweight and fluid, stays in place all evening',
      'Matching gold brocade unstitched blouse fabric',
      'Pre-stitched falling drape option available',
    ],
  },
  {
    id: 'sar-07',
    itemCode: 'PVN-TIS-07',
    designer: 'PAVUN Haute Tissue',
    title: 'Liquid Starlight Champagne Tissue Saree',
    subtitle: 'Subtle Dual-Tone Metallic Sheen with Fine Zari Border',
    category: 'tissue',
    subcategory: 'Tissue & Gold Weaves',
    price: 84000,
    tag: 'Couture Exclusive',
    image: sareeChampagneTissue,
    secondaryImage: sareeTissueGold,
    gallery: [
      sareeChampagneTissue,
      sareeTissueGold,
      aariyanaGoldFront,
      aariyanaCorsetDetail,
      sareePreDrapedConcept,
    ],
    color: 'Luminous Champagne & Rose Gold',
    fabric: 'Fine Metallic Tissue & Silk Georgette',
    sizes: ['Standard 5.5m + 1m Blouse Piece', 'Ready-to-Wear Pre-Pleated', 'Custom Made-to-Measure'],
    sku: 'PVN-SAR-2026-07',
    description: 'Sculpted for cocktail receptions and nocturnal galas, this fluid tissue saree cascades like liquid metal, framed by a delicate hand-embroidered cutwork border.',
    details: [
      'Featherweight 420g metallic construction with zero scratchiness',
      'Micro-sequin and pearl hand-finished border detailing',
      'Includes matching sleeveless bustier fabric in metallic brocade',
    ],
  },
  {
    id: 'sar-08',
    itemCode: 'PVN-TRQ-08',
    designer: 'PAVUN Concept Drape',
    title: 'Turquoise Blue Drape & Jadau Saree',
    subtitle: 'Feroza Blue Silk with Antique Gold Border',
    category: 'tissue',
    subcategory: 'Concept Drapes',
    price: 89000,
    tag: 'Runway Look',
    image: sareeTurquoiseDrape,
    secondaryImage: sareePreDrapedConcept,
    gallery: [
      sareeTurquoiseDrape,
      sareePreDrapedConcept,
      sareeChampagneTissue,
      aariyanaMotion,
    ],
    color: 'Turquoise Blue & Gold',
    fabric: 'Pure Silk Tissue & Satin',
    sizes: ['Standard 5.5m + 1m Blouse Piece', 'Ready-to-Wear Pre-Pleated', 'Custom Made-to-Measure'],
    sku: 'PVN-SAR-2026-08',
    description: 'A striking royal turquoise silk drape paired with ornate antique borders, celebrated in the Pavun Autumn/Winter runway showcase.',
    details: [
      'Fluid handfeel with rich drape dynamics',
      'Hand-knotted bullion fringe pallu detailing',
      'Comes with ready-to-wear pre-pleating option',
    ],
  },

  // --------------------------------------------------------------------------
  // ORGANZA & CHANDERI SAREES
  // --------------------------------------------------------------------------
  {
    id: 'sar-09',
    itemCode: 'PVN-ORG-09',
    designer: 'PAVUN Sheer Botanical',
    title: 'Powder Blush Organza Hand-Painted Saree',
    subtitle: 'Botanical Flora with Hand-Embroidered Scallops',
    category: 'organza',
    subcategory: 'Organza & Chanderi',
    price: 68000,
    image: sareeOrganzaPastel,
    secondaryImage: sareeFloralOrganza,
    gallery: [
      sareeOrganzaPastel,
      sareeFloralOrganza,
      sareeChanderiHeritage,
      aariyanaMotion,
    ],
    color: 'Powder Blush Pink',
    fabric: 'Pure Sheer Silk Organza',
    sizes: ['Standard 5.5m + 1m Blouse Piece', 'Ready-to-Wear Pre-Pleated', 'Custom Made-to-Measure'],
    sku: 'PVN-SAR-2026-09',
    description: 'Airy, delicate sheer organza hand-painted with pastel botanical blooms and finished with fine pearl and silver zardozi scalloped edges.',
    details: [
      'Featherlight weight: only 380 grams',
      'Semi-sheer luxury texture with soft crisp drape',
      'Dry clean only in cold solvent',
    ],
  },
  {
    id: 'sar-10',
    itemCode: 'PVN-ORG-10',
    designer: 'PAVUN Floral Organza',
    title: 'Gulmohar Flora Hand-Spun Organza Saree',
    subtitle: 'Delicate Petal Motifs with Pearl Tassels',
    category: 'organza',
    subcategory: 'Organza & Chanderi',
    price: 72000,
    tag: 'Artisanal',
    image: sareeFloralOrganza,
    secondaryImage: sareeOrganzaPastel,
    gallery: [
      sareeFloralOrganza,
      sareeOrganzaPastel,
      sareeChanderiHeritage,
      aariyanaEmbroidery,
    ],
    color: 'Spring Rose & Pale Gold',
    fabric: '100% Sheer Silk Organza',
    sizes: ['Standard 5.5m + 1m Blouse Piece', 'Ready-to-Wear Pre-Pleated', 'Custom Made-to-Measure'],
    sku: 'PVN-SAR-2026-10',
    description: 'Ethereal sheer drape hand-adorned with delicate floral motifs and fine gota patti sprigs, ideal for sunlit destination mehendi and garden weddings.',
    details: [
      'Translucent whisper-light silk with luminous reflection',
      'Finished with hand-rolled silk hem and pearl tassel pallu',
      'Includes custom satin underskirt pairing suggestion',
    ],
  },
  {
    id: 'sar-11',
    itemCode: 'PVN-CHN-11',
    designer: 'PAVUN Chanderi Guild',
    title: 'Chanderi Gold Bootee Heritage Saree',
    subtitle: 'Hand-Spun Cotton Silk with Ashrafi Butas',
    category: 'organza',
    subcategory: 'Organza & Chanderi',
    price: 52000,
    image: sareeChanderiHeritage,
    secondaryImage: sareeFloralOrganza,
    gallery: [
      sareeChanderiHeritage,
      sareeFloralOrganza,
      sareeOrganzaPastel,
      aariyanaPalluDrape,
    ],
    color: 'Ivory & Warm Gold',
    fabric: 'Chanderi Cotton-Silk Weave',
    sizes: ['Standard 5.5m + 1m Blouse Piece', 'Ready-to-Wear Pre-Pleated', 'Custom Made-to-Measure'],
    sku: 'PVN-SAR-2026-11',
    description: 'Lightweight gossamer Chanderi combining fine munga silk warp with delicate cotton weft, scattered with royal gold coin ashrafi bootees.',
    details: [
      'Breathable all-weather luxury fabric',
      'Geometrical meenakari borders on both sides',
      'Traditional handloom product of Madhya Pradesh',
    ],
  },
  {
    id: 'sar-12',
    itemCode: 'PVN-DRP-12',
    designer: 'PAVUN Fusion Couture',
    title: 'Pre-Draped Modern Pleated Concept Saree',
    subtitle: 'Sculpted Waistband with Pre-Stitched Cowl Pallu',
    category: 'tissue',
    subcategory: 'Concept Drapes',
    price: 88000,
    tag: 'Modern Couture',
    image: sareePreDrapedConcept,
    secondaryImage: aariyanaGoldFront,
    gallery: [
      sareePreDrapedConcept,
      aariyanaGoldFront,
      aariyanaPalluDrape,
      sareeChampagneTissue,
      aariyanaCorsetDetail,
    ],
    color: 'Burnished Copper & Bronze',
    fabric: 'Micro-Pleated Silk Georgette & Lurex',
    sizes: ['Custom Made-to-Measure', 'Standard S (28")', 'Standard M (30")', 'Standard L (32")'],
    sku: 'PVN-SAR-2026-12',
    description: 'The ultimate contemporary silhouette combining traditional Indian saree grace with modern red-carpet ease. Slip it on in under 60 seconds with pre-structured pleats.',
    details: [
      'Concealed side-zip closure with elasticized inner waistband',
      'Sculpted cascade pallu designed to fall flawlessly over the shoulder',
      'Includes embroidered bustier blouse with boning structure',
    ],
  },
];

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'store-mumbai',
    city: 'Mumbai',
    name: 'PAVUN Flagship Atelier Kala Ghoda',
    address: 'Kala Ghoda Art District, Fort, Mumbai, Maharashtra 400001',
    neighborhood: 'South Mumbai Heritage Precinct',
    timings: 'Monday – Sunday: 11:00 AM – 8:00 PM',
    phone: '+91 (022) 6982 4400',
    email: 'mumbai@pavun.com',
    image: storeMumbai,
    services: [
      'Private Saree Styling Suite',
      'Master Weaver Provenance Consultations',
      'Bespoke Blouse Tailoring & Fitting',
      'Heirloom Preservation Consultation',
    ],
  },
  {
    id: 'store-delhi',
    city: 'New Delhi',
    name: 'PAVUN Couture Mansion Mehrauli',
    address: 'Kalka Das Marg, Near Qutub Minar, Mehrauli, New Delhi 110030',
    neighborhood: 'Mehrauli Heritage Corridor',
    timings: 'Monday – Sunday: 11:00 AM – 8:30 PM',
    phone: '+91 (011) 4120 7700',
    email: 'delhi@pavun.com',
    image: storeDelhi,
    services: [
      'Bridal Trousseau Curation Suites',
      'Handloom Master Weaver Demonstrations',
      'VIP Saree Draping Services',
      'Champagne Tasting Lounge',
    ],
  },
  {
    id: 'store-hyderabad',
    city: 'Hyderabad',
    name: 'PAVUN Royal Residence Banjara Hills',
    address: 'Road No. 10, Banjara Hills, Hyderabad, Telangana 500034',
    neighborhood: 'Banjara Hills Royal Enclave',
    timings: 'Monday – Sunday: 11:00 AM – 8:00 PM',
    phone: '+91 (040) 6745 2200',
    email: 'hyderabad@pavun.com',
    image: storeHyderabad,
    services: [
      'Kanjivaram & Paithani Heirloom Archive',
      'Made-to-Order Custom Zari Monogramming',
      'Private VIP Styling Salon',
      'Bridal Party Group Appointments',
    ],
  },
];
