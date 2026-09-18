export interface ProductSpec {
  diameter?: string;
  moisture: string;
  coumarin: string;
  volatileOil?: string;
  meshSize?: string;
  cinnamaldehyde?: string;
  eugenol?: string;
  density?: string;
  gradeStandard?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'quills' | 'powders' | 'oils' | 'spices';
  categoryLabel: string;
  gradeCode: string;
  badge: string;
  coumarinBadge: string;
  description: string;
  longDescription: string;
  specs: ProductSpec;
  imageUrl: string;
  packaging: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  // CATEGORY 1: PURE CEYLON CINNAMON QUILLS (SLS CERTIFIED)
  {
    id: 'alba',
    name: 'Ceylon Cinnamon Alba',
    category: 'quills',
    categoryLabel: 'Pure Ceylon Cinnamon Quills',
    gradeCode: 'ALBA',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'Low Coumarin (<0.004%)',
    description: 'The thinnest, most expensive grade (pencil-thin). Diameter < 6mm. Pure smooth texture, sweet aroma. Zero foxing.',
    longDescription: 'Alba is the crown jewel of Ceylon cinnamon. Hand-peeled and rolled by generational master craftsmen, these pencil-thin quills exhibit a velvety golden hue, layered tight rings, and an exquisitely delicate sweetness with zero bitterness.',
    specs: {
      diameter: '< 6 mm (Pencil Thin)',
      moisture: '< 12% max',
      coumarin: '< 0.002% (Non-detectable trace)',
      volatileOil: '> 1.8% v/w',
      gradeStandard: 'SLS 81:2000 Grade Alba / ISO 6539'
    },
    imageUrl: '/images/product-alba.jpg',
    packaging: '25kg / 50kg export bales, vacuum-sealed bags in master cartons, or custom cut lengths (10cm - 20cm)',
    featured: true
  },
  {
    id: 'c5-special',
    name: 'Ceylon Cinnamon C5 Special',
    category: 'quills',
    categoryLabel: 'Pure Ceylon Cinnamon Quills',
    gradeCode: 'C5-SP',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'Low Coumarin (<0.004%)',
    description: 'Top commercial grade. Very slender, smooth golden quills. Excellent sweet taste.',
    longDescription: 'C5 Special represents supreme commercial perfection. Exceptionally slender with minimal rough patches, these quills deliver a rich, authentic aroma preferred by luxury tea blending houses and gourmet culinary brands.',
    specs: {
      diameter: '7 - 9 mm',
      moisture: '< 12% max',
      coumarin: '< 0.003%',
      volatileOil: '> 1.5% v/w',
      gradeStandard: 'SLS 81:2000 Continental C5-SP'
    },
    imageUrl: '/images/product-c5.jpg',
    packaging: '25kg / 50kg export bales, 10kg master cartons with inner food-grade poly lining',
    featured: true
  },
  {
    id: 'c5',
    name: 'Ceylon Cinnamon C5',
    category: 'quills',
    categoryLabel: 'Pure Ceylon Cinnamon Quills',
    gradeCode: 'C5',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'Low Coumarin (<0.004%)',
    description: 'Classic \'C\' grade. Slender, golden brown quills. Uniform appearance.',
    longDescription: 'C5 is the gold standard for global spice importers and retail packaging. Beautifully uniform, slender cylinders packed with true cinnamaldehyde flavor and negligible coumarin content.',
    specs: {
      diameter: '9 - 12 mm',
      moisture: '< 12% max',
      coumarin: '< 0.0035%',
      volatileOil: '> 1.4% v/w',
      gradeStandard: 'SLS 81:2000 Continental C5'
    },
    imageUrl: '/images/product-c5.jpg',
    packaging: '25kg / 50kg bales or retail cut quills in custom branded packaging'
  },
  {
    id: 'c4',
    name: 'Ceylon Cinnamon C4',
    category: 'quills',
    categoryLabel: 'Pure Ceylon Cinnamon Quills',
    gradeCode: 'C4',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'Low Coumarin (<0.004%)',
    description: 'Good quality intermediate grade. Moderate diameter. Full of flavor.',
    longDescription: 'C4 is a widely traded continental grade offering an outstanding balance between visual aesthetics, essential oil content, and competitive export pricing.',
    specs: {
      diameter: '13 - 16 mm',
      moisture: '< 12% max',
      coumarin: '< 0.004%',
      volatileOil: '> 1.2% v/w',
      gradeStandard: 'SLS 81:2000 Continental C4'
    },
    imageUrl: '/images/product-commercial-quills.jpg',
    packaging: '25kg / 50kg jute or polypropylene bags, palletized for container loading'
  },
  {
    id: 'm5',
    name: 'Ceylon Cinnamon M5',
    category: 'quills',
    categoryLabel: 'Pure Ceylon Cinnamon Quills',
    gradeCode: 'M5',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'Low Coumarin (<0.004%)',
    description: 'A good standard \'M\' grade. Rougher appearance but strong flavor profile. Economy B2B choice.',
    longDescription: 'Mexican grade M5 features slightly thicker bark layers with high natural aroma. The go-to choice for Latin American and European food processors seeking authentic Ceylon aroma at bulk volume rates.',
    specs: {
      diameter: '16 - 19 mm',
      moisture: '< 12% max',
      coumarin: '< 0.004%',
      volatileOil: '> 1.1% v/w',
      gradeStandard: 'SLS 81:2000 Mexican M5'
    },
    imageUrl: '/images/product-commercial-quills.jpg',
    packaging: '50kg pressed bales with secure strapped wrapping'
  },
  {
    id: 'm4',
    name: 'Ceylon Cinnamon M4',
    category: 'quills',
    categoryLabel: 'Pure Ceylon Cinnamon Quills',
    gradeCode: 'M4',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'Low Coumarin (<0.004%)',
    description: 'Economical M grade. Slightly rough texture, strong odor.',
    longDescription: 'M4 offers a rugged, thick-quill profile with intense warm aroma. Highly sought after for industrial seasoning mixes, bakery pre-mixes, and bulk spice grinding mills.',
    specs: {
      diameter: '19 - 22 mm',
      moisture: '< 12.5% max',
      coumarin: '< 0.004%',
      volatileOil: '> 1.0% v/w',
      gradeStandard: 'SLS 81:2000 Mexican M4'
    },
    imageUrl: '/images/product-commercial-quills.jpg',
    packaging: '50kg export standard bales'
  },
  {
    id: 'h1',
    name: 'Ceylon Cinnamon H1',
    category: 'quills',
    categoryLabel: 'Pure Ceylon Cinnamon Quills',
    gradeCode: 'H1',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'Low Coumarin (<0.004%)',
    description: 'High-quality Hard Grade. Robust, darker quills. Good for wholesale blending.',
    longDescription: 'Hamburg grade H1 consists of sturdy, robust outer bark quills selected for heavy culinary seasoning and commercial bulk distribution across Europe and North America.',
    specs: {
      diameter: '23 - 26 mm',
      moisture: '< 13% max',
      coumarin: '< 0.004%',
      volatileOil: '> 0.9% v/w',
      gradeStandard: 'SLS 81:2000 Hamburg H1'
    },
    imageUrl: '/images/cinnamon-quills.jpg',
    packaging: '50kg export bales'
  },
  {
    id: 'h2',
    name: 'Ceylon Cinnamon H2',
    category: 'quills',
    categoryLabel: 'Pure Ceylon Cinnamon Quills',
    gradeCode: 'H2',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'Low Coumarin (<0.004%)',
    description: 'Standard Hard Grade. Strongest aroma, economy wholesale.',
    longDescription: 'H2 represents the most economical solid quill grade. Excellent value for high-volume distillers, curry powder manufacturers, and spice extractors.',
    specs: {
      diameter: '> 26 mm',
      moisture: '< 13% max',
      coumarin: '< 0.004%',
      volatileOil: '> 0.8% v/w',
      gradeStandard: 'SLS 81:2000 Hamburg H2'
    },
    imageUrl: '/images/cinnamon-quills.jpg',
    packaging: '50kg compressed bales'
  },

  // CATEGORY 2: CINNAMON CUTS & POWDERS
  {
    id: 'quillings-no1',
    name: 'Cinnamon Quillings (No. 1)',
    category: 'powders',
    categoryLabel: 'Cuts & Powders',
    gradeCode: 'QUILL-01',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'Low Coumarin (<0.004%)',
    description: 'Broken cinnamon quills, sorted. High volatile oil content. Perfect for extraction or grinding.',
    longDescription: 'Quillings No. 1 are clean, pure broken quill pieces generated during the master trimming of Alba and C-grades. They preserve supreme volatile essential oils and are ideal for crushing or supercritical CO2 extraction.',
    specs: {
      moisture: '< 12% max',
      coumarin: '< 0.0035%',
      volatileOil: '> 1.4% v/w',
      gradeStandard: 'SLS 81:2000 Quillings Grade 1'
    },
    imageUrl: '/images/product-quillings-chips.jpg',
    packaging: '25kg woven PP bags with inner polyethylene barrier',
    featured: true
  },
  {
    id: 'cinnamon-chips',
    name: 'Cinnamon Chips (Offcuts)',
    category: 'powders',
    categoryLabel: 'Cuts & Powders',
    gradeCode: 'CHIPS-OFF',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'Low Coumarin (<0.004%)',
    description: 'Smaller offcuts of quills. Rough and flavorful. Used in tea blends and spice mixes.',
    longDescription: 'Coarse dried offcuts and bark pieces with intense aromatic character. Extensively sourced by premium herbal infusion companies, chai tea formulators, and craft beverage distillers.',
    specs: {
      moisture: '< 12.5% max',
      coumarin: '< 0.004%',
      volatileOil: '> 1.2% v/w',
      gradeStandard: 'SLS 81:2000 Clean Chips'
    },
    imageUrl: '/images/product-quillings-chips.jpg',
    packaging: '25kg / 50kg export bags'
  },
  {
    id: 'cinnamon-powder',
    name: '100% Pure Ceylon Cinnamon Powder',
    category: 'powders',
    categoryLabel: 'Cuts & Powders',
    gradeCode: 'POWDER-80M',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'Low Coumarin (<0.004%)',
    description: 'Ultra-fine grind (80 mesh). No additives. Deep, complex aroma. Certified Coumarin-Safe.',
    longDescription: 'Micro-pulverized strictly from genuine Ceylon Cinnamon quills with zero fillers, cassia adulteration, or anti-caking agents. Complies fully with EU EFSA and US FDA daily consumption limits.',
    specs: {
      meshSize: '60 - 80 Mesh (Ultra-Fine)',
      moisture: '< 10% max',
      coumarin: '< 0.003% (Certified Safe)',
      volatileOil: '> 1.2% v/w',
      gradeStandard: 'ISO 6539 / SLS 81 Fine Ground'
    },
    imageUrl: '/images/product-cinnamon-powder.jpg',
    packaging: '10kg / 20kg nitrogen-flushed multi-wall kraft bags or custom private-label pouches',
    featured: true
  },

  // CATEGORY 3: ESSENTIAL OILS (STEAM DISTILLED)
  {
    id: 'bark-oil',
    name: 'Pure Cinnamon Bark Oil',
    category: 'oils',
    categoryLabel: 'Essential Oils (Steam Distilled)',
    gradeCode: 'BARK-OIL-65',
    badge: 'Steam Distilled Pure',
    coumarinBadge: '100% Pure & Natural',
    description: 'Premium extraction (SLS I). Volatile oil > 65% Cinnamaldehyde. Sweet, warm aroma. Used in pharma/food.',
    longDescription: 'Hydro-distilled directly on our estate from select cinnamon inner bark. Characterized by high natural cinnamaldehyde content (>65%), making it the premier choice for pharmaceutical formulations, fine fragrances, and luxury flavorings.',
    specs: {
      cinnamaldehyde: '65.0% - 78.0% (GC-MS Verified)',
      eugenol: '4.0% - 10.0%',
      moisture: 'Anhydrous',
      coumarin: 'Trace < 0.001%',
      gradeStandard: 'SLS 187 / ISO 3524 Grade 1'
    },
    imageUrl: '/images/product-cinnamon-oil.jpg',
    packaging: '1kg, 5kg, 25kg aluminium bottles, 200kg epoxy-lined steel drums with UN certification',
    featured: true
  },
  {
    id: 'leaf-oil',
    name: 'Pure Cinnamon Leaf Oil',
    category: 'oils',
    categoryLabel: 'Essential Oils (Steam Distilled)',
    gradeCode: 'LEAF-OIL-75',
    badge: 'Steam Distilled Pure',
    coumarinBadge: '100% Pure & Natural',
    description: 'Industrial extraction (SLS II). Volatile oil > 75% Eugenol. Clove-like aroma. Used in flavors/fragrances.',
    longDescription: 'Steam distilled from fresh Ceylon cinnamon foliage. Boasting over 75% natural eugenol, this golden oil offers potent antimicrobial, dental, cosmetic, and aromatherapy properties.',
    specs: {
      eugenol: '75.0% - 85.0% (GC-MS Verified)',
      cinnamaldehyde: '< 5.0%',
      moisture: 'Anhydrous',
      coumarin: 'Not Detected',
      gradeStandard: 'SLS 187 / ISO 3524 Industrial Leaf'
    },
    imageUrl: '/images/product-leaf-oil.jpg',
    packaging: '25kg HDPE carboys, 200kg UN-certified steel export drums'
  },

  // CATEGORY 4: OTHER PREMIUM CEYLON SPICES (DIRECT EXPORT)
  {
    id: 'black-pepper',
    name: 'Pure Ceylon Black Pepper (550G/L+)',
    category: 'spices',
    categoryLabel: 'Other Premium Ceylon Spices',
    gradeCode: 'PEPPER-550G',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'High Piperine Content',
    description: 'High-density peppercorns. Strong heat and pungency. Sorted and steam washed.',
    longDescription: 'Ceylon Black Pepper is celebrated globally for containing the highest piperine percentage (up to 7-15%) compared to other origins. Hand-harvested from central highlands estates, machine-cleaned, and dried to perfection.',
    specs: {
      density: '550 g/l to 580 g/l (FAQ / Machine Cleaned)',
      moisture: '< 11.5% max',
      coumarin: 'N/A',
      volatileOil: '> 2.5% v/w',
      gradeStandard: 'ASTA / ISO 959-1 Export Grade'
    },
    imageUrl: '/images/product-black-pepper.jpg',
    packaging: '25kg / 50kg multi-layer kraft paper bags or PP bags',
    featured: true
  },
  {
    id: 'cloves',
    name: 'Premium Ceylon Cloves (Hand Picked)',
    category: 'spices',
    categoryLabel: 'Other Premium Ceylon Spices',
    gradeCode: 'CLOVE-HP',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'Intact Head Guarantee',
    description: 'Fully mature, reddish-brown. Head intact. Strong warm aroma. Moisture < 12%.',
    longDescription: 'Hand-picked Ceylon cloves selected for plump flower buds, intact heads, and reddish-brown coloration. High essential oil concentration makes it superior for extraction and fine culinary use.',
    specs: {
      gradeStandard: 'Hand Picked Selected (HPS) / FAQ',
      moisture: '< 11.0% max',
      coumarin: 'N/A',
      volatileOil: '> 17.0% v/w (Extreme Potency)'
    },
    imageUrl: '/images/product-ceylon-cloves.jpg',
    packaging: '25kg / 50kg vacuum cartons or jute bags'
  },
  {
    id: 'cardamom',
    name: 'Green Cardamom (8mm+ Jumbo)',
    category: 'spices',
    categoryLabel: 'Other Premium Ceylon Spices',
    gradeCode: 'CARDAMOM-8MM',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'High Cineole Fragrance',
    description: 'Premium Ceylon Cardamom. Bold pods, deep green. Aromatic and fresh.',
    longDescription: 'Rare Ceylon green cardamom pods sized 8mm and above. Deep natural green color preserved via controlled kiln-drying, delivering an exhilarating camphoraceous and sweet citrus aroma.',
    specs: {
      diameter: '8 mm+ Extra Bold',
      moisture: '< 10.0% max',
      coumarin: 'N/A',
      volatileOil: '> 6.0% v/w',
      gradeStandard: 'Green Extra Bold Jumbo'
    },
    imageUrl: '/images/product-cardamom.jpg',
    packaging: '5kg airtight foil pouches in 20kg master export cartons'
  },
  {
    id: 'nutmeg',
    name: 'Ceylon Nutmeg (with/without mace)',
    category: 'spices',
    categoryLabel: 'Other Premium Ceylon Spices',
    gradeCode: 'NUTMEG-ABCD',
    badge: 'Premium Ceylon Origin',
    coumarinBadge: 'Whole Sound Kernels',
    description: 'Whole kernels, dried. Sweet and pungent. Available in ABCD grades.',
    longDescription: 'High quality Ceylon nutmeg kernels dried naturally in shell before husking. Available with or without whole vibrant orange mace arils. Rich in myristicin and warm culinary oils.',
    specs: {
      gradeStandard: 'ABCD Grade Sound Whole Kernels',
      moisture: '< 10.0% max',
      coumarin: 'N/A',
      volatileOil: '> 6.5% v/w'
    },
    imageUrl: '/images/product-nutmeg.jpg',
    packaging: '25kg / 50kg poly-lined jute bags'
  }
];

export const CATEGORIES = [
  { id: 'all', labelKey: 'catAll' },
  { id: 'quills', labelKey: 'catQuills' },
  { id: 'powders', labelKey: 'catPowders' },
  { id: 'oils', labelKey: 'catOils' },
  { id: 'spices', labelKey: 'catSpices' },
] as const;
