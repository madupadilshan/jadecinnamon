import { getAssetUrl } from '../utils/assets';

export type BuyingModel =
  | 'flexible_bulk'        // 1. Flexible Bulk by Kg (Quills, Quill Cuts) - custom weight input (no fixed package sizes)
  | 'multi_variant_volume' // 2. Multi-variant bottle volumes (Leaf Oil) - independent quantities for 15ml, 30ml, 50ml, 100ml
  | 'fixed_pack'           // 3. Fixed Pack Units (Luxury Gift Set - 4 bottles per pack)
  | 'fixed_unit_pack'      // 4. Fixed 1 Kg Unit Packs (Powder, Cut Pieces - strictly 1 Kg sealed pouches)
  | 'bulk_weight'          // Compatibility alias for flexible_bulk
  | 'volume_variants'      // Compatibility alias for multi_variant_volume
  | 'gift_pack'            // Compatibility alias for fixed_pack
  | 'fixed_1kg_pack'       // Compatibility alias for fixed_unit_pack
  | 'multi_volume';        // Compatibility alias for multi_variant_volume

export interface ProductSpec {
  eugenol: string;
  cinnamaldehyde: string;
  botanicalName?: string;
  plantPart?: string;
  extractionMethod?: string;
  origin?: string;
  specificGravity?: string;
  refractiveIndex?: string;
  opticalRotation?: string;
  solubility?: string;
  appearance?: string;
  aroma?: string;
  gradeStandard?: string;
  moisture?: string;
  coumarin?: string;
  density?: string;
  volatileOil?: string;
  diameter?: string;
  meshSize?: string;
}

export interface ProductVariant {
  id: string;
  volume: string;
  gradeCode: string;
  label: string;
  packaging?: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'retail' | 'powders' | 'gift-sets';
  categoryLabel: string;
  buyingModel: BuyingModel;
  baseUnit: 'Kg' | 'L' | 'Packs' | 'Bottles';
  gradeCode: string;
  volume: string;
  badge: string;
  coumarinBadge: string;
  description: string;
  longDescription: string;
  specs: ProductSpec;
  imageUrl: string;
  packaging: string;
  keyBenefits?: string[];
  featured?: boolean;
  variants?: ProductVariant[];
}

const RAW_PRODUCTS: Product[] = [
  // 1. Ceylon Cinnamon Quill Cuts (Type: flexible_bulk, Unit: Kg, Custom continuous weight)
  {
    id: 'cinnamon-quill-cuts',
    name: 'Ceylon Cinnamon Quill Cuts',
    category: 'powders',
    categoryLabel: 'Pure Ceylon Spices & Cuts',
    buyingModel: 'flexible_bulk',
    baseUnit: 'Kg',
    gradeCode: 'CQC-BULK',
    volume: 'Bulk Weight (Kg)',
    badge: '100% Natural • SLS 81',
    coumarinBadge: 'Ultra-Low Coumarin (< 0.004%)',
    description: '100% authentic precision-cut Ceylon Cinnamon Quill Sticks. Ordered purely by custom export weight in Kilograms (Kg) for bulk trade, beverage formulators, and spice brands.',
    longDescription: 'Jade Cinnamon Lanka Pure Ceylon Cinnamon Quill Cuts are uniformly cut from premium Southern Sri Lanka organic Ceylon Cinnamon (Cinnamomum verum) quills. Each quill cut showcases fragile, paper-thin golden-tan concentric layers with exquisite aroma, natural sweetness, and superior infusion properties. Sold purely by weight in Kilograms (Kg) in export master cartons.',
    specs: {
      botanicalName: 'Cinnamomum verum J.Presl (syn. Cinnamomum zeylanicum)',
      plantPart: '100% Hand-Peeled Multi-Layered Inner Bark Quills',
      origin: 'Southern Province, Sri Lanka (Heritage Estate Origin)',
      diameter: '8mm - 14mm (Uniform Cylinder Diameter)',
      moisture: 'Max 10.0% - 12.0%',
      coumarin: 'Ultra-Low Non-detectable (< 0.004% / 40 ppm)',
      volatileOil: 'Min 1.5% - 3.2% (v/w)',
      gradeStandard: 'SLS 81:2010 / ISO 6539 / EU & US FDA Compliant',
      appearance: 'Uniform cylindrical cut sticks with multi-layered concentric golden-brown bark rolls',
      aroma: 'Delicate, warm, sweet, woody, and refined Ceylon aroma',
      eugenol: 'Trace Natural Phenolics (< 0.5%)',
      cinnamaldehyde: '65% - 75% (in volatile oil fraction)',
    },
    imageUrl: '/images/product-cinnamon-quill-cuts.webp',
    packaging: 'Export master cartons with inner food-grade poly liner (Ordered by custom weight in Kg)',
    keyBenefits: [
      '100% Authentic Ceylon Cinnamon (Cinnamomum verum) — zero cassia substitution',
      'Uniform quill sticks ideal for beverage infusion, spirits, cocktails, and culinary packaging',
      'Continuous weight ordering in Kilograms (e.g. 3.5 Kg, 12 Kg, 50 Kg)',
      'Rich in natural volatile oils with sweet, smooth taste (no harsh pungent burning)',
      'Direct single-estate provenance from Southern Sri Lanka heritage plantations',
    ],
    featured: true,
  },

  // 2. Pure Ceylon Cinnamon Leaf Oil (Type: multi_variant_volume, Unit: Bottles, Variants: 15ml, 30ml, 50ml, 100ml)
  {
    id: 'leaf-oil-bottle',
    name: 'Pure Ceylon Cinnamon Leaf Oil',
    category: 'retail',
    categoryLabel: 'Amber Dropper Bottles',
    buyingModel: 'multi_variant_volume',
    baseUnit: 'Bottles',
    gradeCode: 'CLO-MULTI',
    volume: '15ml, 30ml, 50ml, 100ml',
    badge: '100% Natural • SLS 187',
    coumarinBadge: 'High Eugenol (75%–85%)',
    description: '100% pure steam hydro-distilled Ceylon Cinnamon Leaf Oil from Southern Sri Lanka estates. Rich in natural active Eugenol and antioxidants. Select bottle size (15ml, 30ml, 50ml, 100ml) and specify order count.',
    longDescription: 'Jade Cinnamon Lanka Pure Ceylon Cinnamon Leaf Oil is steam-distilled directly from freshly harvested green foliage of organic Ceylon Cinnamon (Cinnamomum verum) grown in our Southern Sri Lanka heritage estates. Certified 100% pure with over 75-85% natural eugenol, this high-potency oil delivers powerful antimicrobial, therapeutic, and soothing aromatherapeutic benefits with zero preservatives and zero mineral additives. Available in 100ml standard, 50ml dropper, 30ml travel, and 15ml pocket UV-protective amber glass formats.',
    specs: {
      botanicalName: 'Cinnamomum verum J.Presl (syn. Cinnamomum zeylanicum)',
      plantPart: 'Fresh Ceylon Cinnamon Green Leaves & Foliage',
      extractionMethod: '100% Pure Steam Hydro-Distillation',
      eugenol: '75.0% - 85.0% (GC-MS Verified High Purity)',
      cinnamaldehyde: '1.0% - 4.5% (Safe Topical Profile)',
      origin: 'Southern Province, Sri Lanka (Pure Ceylon)',
      specificGravity: '1.030 - 1.055 at 20°C',
      refractiveIndex: '1.529 - 1.540 at 20°C',
      opticalRotation: '-2.0° to +1.0°',
      appearance: 'Clear, golden-yellow to rich amber transparent liquid',
      aroma: 'Warm, spicy, clove-like, woody with sweet balsamic undertones',
      gradeStandard: 'SLS 187 / ISO 3524:2003 / EU EFSA & US FDA Compliant',
      coumarin: 'Non-detectable trace (< 0.001%)',
      moisture: 'Anhydrous / 100% Pure Undiluted',
    },
    imageUrl: '/images/product-leaf-oil.webp',
    packaging: 'UV-protective dark amber glass dropper bottles with tamper-evident seal cap & precision glass pipette',
    keyBenefits: [
      '100% Pure & Natural steam-distilled essential oil',
      'Naturally rich in antioxidant Eugenol (75-85%)',
      'Potent antimicrobial & purifying air diffuser active',
      'Soothes muscle stiffness and joint aches when diluted in carrier oil',
      'Zero synthetic preservatives, zero parabens, zero fillers',
    ],
    variants: [
      {
        id: '15ml',
        volume: '15ml',
        gradeCode: 'CLO-15ML',
        label: '15ml Bottle',
        packaging: '15ml Pocket amber glass dropper bottle with precision applicator',
        description: 'Compact pocket & travel size for targeted personal wellness',
      },
      {
        id: '30ml',
        volume: '30ml',
        gradeCode: 'CLO-30ML',
        label: '30ml Bottle',
        packaging: '30ml Amber glass bottle with calibrated glass dropper pipette',
        description: 'Balanced portability and daily holistic care',
      },
      {
        id: '50ml',
        volume: '50ml',
        gradeCode: 'CLO-50ML',
        label: '50ml Bottle',
        packaging: '50ml Amber glass bottle with precision glass pipette dropper',
        description: 'Ideal for diffusers, aromatherapy blends & massage oils',
      },
      {
        id: '100ml',
        volume: '100ml',
        gradeCode: 'CLO-100ML',
        label: '100ml Bottle',
        packaging: '100ml UV-protective amber glass bottle with tamper-evident seal & inner dropper',
        description: 'Standard family & practitioner luxury amber bottle',
      },
    ],
    featured: true,
  },

  // 3. Jade Cinnamon Luxury Leaf Oil Gift Set (Type: fixed_pack, Unit: Packs, 4 bottles per pack)
  {
    id: 'leaf-oil-box-set',
    name: 'Jade Cinnamon Luxury Leaf Oil Gift Set',
    category: 'gift-sets',
    categoryLabel: 'Luxury Presentation Sets',
    buyingModel: 'fixed_pack',
    baseUnit: 'Packs',
    gradeCode: 'CLO-GIFT-SET',
    volume: '4 Bottles / Pack',
    badge: '4 Bottles / Pack',
    coumarinBadge: 'Luxury Gold-Embossed Box',
    description: 'Complete estate master gift set. Includes 100ml, 50ml, 30ml, and 15ml amber dropper bottles in our bespoke emerald green & gold foil-embossed presentation box. Ordered by number of packs (e.g., 2 packs, 10 packs).',
    longDescription: 'The pinnacle of Ceylon cinnamon gifting and luxury retail merchandising. Housed in a bespoke emerald-green and gold foil-embossed master presentation box, this collection features all four bottle formats (15ml, 30ml, 50ml, and 100ml) of 100% Natural Pure Ceylon Cinnamon Leaf Oil, accompanied by an estate certification scroll. Ordered per fixed pack box.',
    specs: {
      botanicalName: 'Cinnamomum verum J.Presl',
      plantPart: 'Pure Ceylon Leaf Extract',
      extractionMethod: 'Artisanal Steam Distillation',
      eugenol: '75.0% - 85.0% across all bottles',
      cinnamaldehyde: '1.0% - 4.5%',
      origin: '100% Pure Sri Lanka Origin',
      gradeStandard: 'SLS 187 / ISO 3524 / Export Grade A',
      coumarin: 'Non-detectable (< 0.001%)',
      moisture: 'Anhydrous / 100% Pure Essential Oil',
    },
    imageUrl: '/images/cinnamon-leaf-oil-collection.webp',
    packaging: 'Luxury Emerald Green & Gold Embossed Master Box with custom die-cut foam velvet inserts protecting 4 amber glass bottles',
    keyBenefits: [
      'Contains all 4 sizes: 15ml, 30ml, 50ml, and 100ml in each gift pack',
      'Exquisite gold-embossed gift box ready for luxury retail or VIP gifting',
      'Full suite of Ceylon origin verification badges',
      'Guaranteed 100% natural and preservative-free',
    ],
    featured: true,
  },

  // 4. Ceylon Cinnamon Quills (Alba / C5 Grade Quills) (Type: flexible_bulk, Unit: Kg, Custom continuous weight)
  {
    id: 'cinnamon-quills',
    name: 'Ceylon Cinnamon Quills',
    category: 'powders',
    categoryLabel: 'Pure Ceylon Spices & Quills',
    buyingModel: 'flexible_bulk',
    baseUnit: 'Kg',
    gradeCode: 'CCQ-ALBA-C5',
    volume: 'Bulk Weight (Kg)',
    badge: 'Alba / C5 Grade • SLS 81',
    coumarinBadge: 'Ultra-Low Coumarin (< 0.004%)',
    description: '100% authentic artisanal hand-rolled multi-layered Ceylon Cinnamon Quills (Alba / C5 prime grades) from Southern Sri Lanka heritage estates. Custom quantity selection in Kilograms (Kg) (e.g., 3 Kg, 10 Kg, 25 Kg, 100 Kg).',
    longDescription: 'Jade Cinnamon Lanka Pure Ceylon Cinnamon Quills (Cinnamomum verum) are masterfully hand-peeled and rolled in traditional multi-layered cylindrical quills (cigar-like layers) by skilled estate artisans in Southern Sri Lanka. Characterized by fragile paper-thin inner bark layers, a delicate golden-tan hue, high volatile oil concentration, and natural sweet warmth. Certified SLS 81:2010 & ISO 6539 export grade. Sold by continuous weight in Kilograms (Kg) for containerized cargo and bulk air/ocean freight.',
    specs: {
      botanicalName: 'Cinnamomum verum J.Presl (syn. Cinnamomum zeylanicum)',
      plantPart: '100% Hand-Peeled Multi-Layered Inner Bark',
      origin: 'Southern Province, Sri Lanka (Heritage Estate Origin)',
      diameter: '6mm - 16mm (Export Grade Alba / C5)',
      moisture: 'Max 10.0% - 12.0%',
      coumarin: 'Ultra-Low Non-detectable (< 0.004% / 40 ppm)',
      volatileOil: 'Min 1.5% - 3.5% (v/w)',
      gradeStandard: 'SLS 81:2010 / ISO 6539 / Export Grade A',
      appearance: 'Slender, multi-layered rolled golden-brown cylindrical quills',
      aroma: 'Highly aromatic, sweet, warm, woody, and fragrant floral notes',
      eugenol: 'Trace Natural Phenolics (< 0.5%)',
      cinnamaldehyde: '65% - 75% (in volatile oil fraction)',
    },
    imageUrl: '/images/product-cinnamon-quills.webp',
    packaging: 'Traditional tied export bundles, 25kg/50kg master bales wrapped in food-grade jute / poly lining with moisture-barrier protection',
    keyBenefits: [
      '100% Authentic Ceylon Cinnamon (Cinnamomum verum) — never cassia',
      'Master artisanal hand-rolled multi-layer structure with paper-thin inner bark',
      'Custom bulk weight input in Kilograms (e.g. 3 Kg, 10 Kg, 25 Kg, 100 Kg)',
      'High natural volatile oil concentration delivering maximum aroma and therapeutic benefits',
      'Direct single-estate provenance from Southern Sri Lanka heritage plantations',
    ],
    featured: true,
  },

  // 5. Ceylon Cinnamon Powder (Type: fixed_unit_pack, Unit: Packs (1 Kg each), 1 Kg packs ONLY)
  {
    id: 'cinnamon-powder-1kg',
    name: 'Ceylon Cinnamon Powder',
    category: 'powders',
    categoryLabel: 'Pure Ceylon Spices & Powders',
    buyingModel: 'fixed_unit_pack',
    baseUnit: 'Packs',
    gradeCode: 'CCP-1KG',
    volume: '1 Kg Pack',
    badge: '1 Kg Pack • SLS 81',
    coumarinBadge: 'Ultra-Low Coumarin (< 0.004%)',
    description: '100% pure organic Ceylon Cinnamon Powder micro-milled from prime inner bark quills. Strictly packaged in sealed 1 Kg standard export vacuum pouches. Order by number of 1 Kg packs (e.g., 5 packs = 5 Kg).',
    longDescription: 'Jade Cinnamon Lanka 100% Natural Ceylon Cinnamon Powder is crafted from pure organic Ceylon Cinnamon (Cinnamomum verum) inner bark quills harvested directly from our Southern Sri Lanka heritage plantations. Finely micro-milled (60-80 mesh) under controlled low-temperature grinding to preserve essential volatile oils, natural sweetness, and vibrant golden-tan aroma. Certified ultra-low coumarin (<0.004%), 100% free of synthetic additives, fillers, and preservatives. Strictly supplied in sealed 1kg vacuum barrier pouches.',
    specs: {
      botanicalName: 'Cinnamomum verum J.Presl (syn. Cinnamomum zeylanicum)',
      plantPart: '100% Pure Inner Bark (Peeled Quills)',
      origin: 'Southern Province, Sri Lanka (Pure Ceylon)',
      meshSize: '60 - 80 Mesh (Ultra-Fine Micro-Milled)',
      moisture: 'Max 10.0% - 12.0%',
      coumarin: 'Ultra-Low Non-detectable (< 0.004% / 40 ppm)',
      volatileOil: 'Min 1.0% - 2.5% (v/w)',
      gradeStandard: 'SLS 81:2010 / ISO 6539 / EU & US FDA Compliant',
      appearance: 'Uniform, fine golden-tan to light brown aromatic powder',
      aroma: 'Delicate, sweet, warm, woody, and refined fragrance',
      eugenol: 'Trace Natural Phenolics (< 0.5%)',
      cinnamaldehyde: '65% - 75% (in volatile oil fraction)',
    },
    imageUrl: '/images/product-cinnamon-powder.webp',
    packaging: '1kg Heavy-duty hermetically heat-sealed multi-layer barrier vacuum pouch (Strictly 1 Kg pack format)',
    keyBenefits: [
      '100% Pure & Natural Ceylon Cinnamon (Cinnamomum verum) — zero cassia',
      'Ultra-low natural coumarin level (< 0.004%) — safe for daily consumption',
      'Zero additives, zero preservatives, zero fillers or anti-caking chemicals',
      'Micro-milled (60–80 mesh) for smooth culinary, baking, and beverage solubility',
      'Standard 1 Kg sealed export pouches (e.g., 5 packs = 5 Kg, 10 packs = 10 Kg)',
    ],
    featured: true,
  },

  // 6. Ceylon Cinnamon Cut Pieces (Type: fixed_unit_pack, Unit: Packs (1 Kg each), 1 Kg packs ONLY)
  {
    id: 'cinnamon-cut-pieces-1kg',
    name: 'Ceylon Cinnamon Cut Pieces',
    category: 'powders',
    categoryLabel: 'Pure Ceylon Spices & Cuts',
    buyingModel: 'fixed_unit_pack',
    baseUnit: 'Packs',
    gradeCode: 'CCC-1KG',
    volume: '1 Kg Pack',
    badge: '1 Kg Pack • SLS 81',
    coumarinBadge: 'Ultra-Low Coumarin (< 0.004%)',
    description: '100% pure premium Ceylon Cinnamon Cut Pieces (Cinnamomum verum) sized from multi-layered inner bark quills. Strictly packaged in sealed 1 Kg standard export pouches. Order by number of 1 Kg packs (e.g., 8 packs = 8 Kg).',
    longDescription: 'Jade Cinnamon Lanka 100% Natural Ceylon Cinnamon Cut Pieces are precision-cut from authentic Southern Sri Lanka organic Ceylon Cinnamon (Cinnamomum verum) quills. Featuring multi-layered golden-tan rolls with high natural volatile oil content, these uniform cut pieces deliver delicate sweet aroma, exceptional culinary infusion, and therapeutic antioxidant goodness with zero preservatives and zero additives. Strictly packaged in sealed 1kg heavy-duty export pouches.',
    specs: {
      botanicalName: 'Cinnamomum verum J.Presl (syn. Cinnamomum zeylanicum)',
      plantPart: '100% Pure Inner Bark (Precision Cut Quills)',
      origin: 'Southern Province, Sri Lanka (Pure Ceylon)',
      diameter: '6mm - 15mm (Uniform Quill Diameter)',
      moisture: 'Max 10.0% - 12.0%',
      coumarin: 'Ultra-Low Non-detectable (< 0.004% / 40 ppm)',
      volatileOil: 'Min 1.5% - 3.0% (v/w)',
      gradeStandard: 'SLS 81:2010 / ISO 6539 / EU & US FDA Compliant',
      appearance: 'Multi-layered rolled golden-brown cylindrical cut pieces',
      aroma: 'Sweet, delicate, warm, fragrant, and woody Ceylon aroma',
      eugenol: 'Trace Natural Phenolics (< 0.5%)',
      cinnamaldehyde: '65% - 75% (in volatile oil fraction)',
    },
    imageUrl: '/images/product-cinnamon-cut-pieces.webp',
    packaging: '1kg Heavy-duty hermetically heat-sealed multi-layer barrier vacuum pouch (Strictly 1 Kg pack format)',
    keyBenefits: [
      '100% Pure & Natural Ceylon Cinnamon (Cinnamomum verum) — zero cassia substitution',
      'Precision-cut uniform quill lengths ideal for brewing, mulled beverages, and infusions',
      'Ultra-low natural coumarin level (< 0.004%) — safe for daily consumption',
      'Zero additives, zero preservatives, zero artificial flavoring or sulfur treatment',
      'Standard 1 Kg sealed export pouches (e.g., 8 packs = 8 Kg)',
    ],
    featured: true,
  },
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((product) => ({
  ...product,
  imageUrl: getAssetUrl(product.imageUrl),
}));

export const CATEGORIES = [
  { id: 'all', labelKey: 'catAll' },
  { id: 'retail', labelKey: 'catRetail' },
  { id: 'powders', labelKey: 'catPowders' },
  { id: 'gift-sets', labelKey: 'catGiftSets' },
] as const;
