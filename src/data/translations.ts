export type LanguageCode = 'en' | 'si' | 'ta' | 'ar' | 'de' | 'fr' | 'es';

export interface LanguageMeta {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
  isRtl?: boolean;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'si', label: 'Sinhala', nativeLabel: 'සිංහල', flag: '🇱🇰' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', flag: '🇱🇰' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', flag: '🇦🇪', isRtl: true },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸' },
];

export interface TranslationSchema {
  brandTitle: string;
  brandTagline: string;
  nav: {
    home: string;
    about: string;
    products: string;
    quality: string;
    logistics: string;
    gallery: string;
    quoteBuilder: string;
    contact: string;
    quickRfq: string;
  };
  hero: {
    badge: string;
    titlePart1: string;
    titleHighlight: string;
    titlePart2: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statCoumarin: string;
    statCoumarinLabel: string;
    statMoisture: string;
    statMoistureLabel: string;
    statOrigin: string;
    statOriginLabel: string;
    statFob: string;
    statFobLabel: string;
  };
  about: {
    badge: string;
    title: string;
    desc1: string;
    desc2: string;
    heritageTitle: string;
    heritageDesc: string;
    craftTitle: string;
    craftDesc: string;
    globalTitle: string;
    globalDesc: string;
  };
  catalog: {
    badge: string;
    title: string;
    subtitle: string;
    catAll: string;
    catRetail: string;
    catGiftSets: string;
    catBulk: string;
    catQuills?: string;
    catPowders?: string;
    catOils?: string;
    catSpices?: string;
    originBadge: string;
    lowCoumarinBadge: string;
    viewSpecs: string;
    orderNow: string;
    specsTitle: string;
    diameter: string;
    moisture: string;
    coumarin: string;
    volatileOil: string;
    cinnamaldehyde: string;
    eugenol: string;
    density: string;
    standard: string;
    packaging: string;
    close: string;
  };
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
    item1Title: string;
    item1Desc: string;
    item2Title: string;
    item2Desc: string;
    item3Title: string;
    item3Desc: string;
    item4Title: string;
    item4Desc: string;
    item5Title: string;
    item5Desc: string;
    item6Title: string;
    item6Desc: string;
  };
  rfq: {
    badge: string;
    title: string;
    subtitle: string;
    labelGrade: string;
    labelQty: string;
    labelUnit: string;
    labelIncoterm: string;
    labelDestination: string;
    labelNotes: string;
    placeholderNotes: string;
    placeholderDestination: string;
    previewTitle: string;
    previewDesc: string;
    btnSendWhatsApp: string;
    btnCopyMessage: string;
    copied: string;
    disclaimer: string;
  };
  quality: {
    badge: string;
    title: string;
    subtitle: string;
    trueCeylonTitle: string;
    cassiaTitle: string;
    coumarinMetric: string;
    coumarinCeylon: string;
    coumarinCassia: string;
    textureMetric: string;
    textureCeylon: string;
    textureCassia: string;
    healthMetric: string;
    healthCeylon: string;
    healthCassia: string;
    cert1: string;
    cert1Desc: string;
    cert2: string;
    cert2Desc: string;
    cert3: string;
    cert3Desc: string;
    cert4: string;
    cert4Desc: string;
  };
  logistics: {
    badge: string;
    title: string;
    subtitle: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
    card4Title: string;
    card4Desc: string;
  };
  footer: {
    desc: string;
    quickLinks: string;
    contactDesk: string;
    directLine: string;
    email: string;
    colomboPort: string;
    legalNote: string;
    copyright: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationSchema> = {
  en: {
    brandTitle: 'Jade Cinnamon Lanka',
    brandTagline: '100% Pure Ceylon Cinnamon Leaf Oil Direct Producer & Exporter',
    nav: {
      home: 'Home',
      about: 'About Us',
      products: 'Products',
      quality: 'Quality & GC-MS',
      logistics: 'Export & Packaging',
      gallery: 'Gallery',
      quoteBuilder: 'WhatsApp RFQ',
      contact: 'Trade Desk',
      quickRfq: 'Request B2B Quote',
    },
    hero: {
      badge: '100% NATURAL • DIRECT ESTATE PROVENANCE • SRI LANKA ORIGIN',
      titlePart1: 'World-Class Exporter of',
      titleHighlight: '100% Pure Ceylon Cinnamon Leaf Oil',
      titlePart2: '(Cinnamomum verum)',
      description: 'Pure steam hydro-distilled essential oil from fresh Ceylon cinnamon foliage. High active natural Eugenol (75%–85%), rich in antioxidants, 0% preservatives. SLS 187 & ISO 3524 certified. Available in 15ml, 30ml, 50ml, and 100ml amber dropper bottles, as well as our luxury gold-embossed master gift set.',
      ctaPrimary: 'Send Quotation via WhatsApp',
      ctaSecondary: 'Explore Leaf Oil Lineup',
      statCoumarin: '75% - 85%',
      statCoumarinLabel: 'Active Eugenol (GC-MS)',
      statMoisture: '100% Pure',
      statMoistureLabel: 'Steam Hydro-Distilled',
      statOrigin: 'SLS 187',
      statOriginLabel: 'ISO 3524:2003 Certified',
      statFob: 'FOB / CIF',
      statFobLabel: 'Amber Bottles & Gift Sets',
    },
    about: {
      badge: 'ESTATE HERITAGE & DISTILLATION MASTERY',
      title: 'Centuries of Pure Ceylon Foliage Distillation',
      desc1: 'Jade Cinnamon Lanka is an international producer and B2B export house dedicated exclusively to 100% Natural Pure Ceylon Cinnamon Leaf Oil (Cinnamomum verum / Cinnamomum zeylanicum), steam-distilled directly from freshly pruned green foliage across our Southern Sri Lanka heritage plantations.',
      desc2: 'Unlike synthetic or adulterated leaf oils, our Ceylon Cinnamon Leaf Oil is rich in 75% to 85% natural eugenol with a safe topical profile (cinnamaldehyde 1.0%–4.5%), guaranteeing unparalleled antioxidant power, antimicrobial efficacy, and zero chemical preservatives.',
      heritageTitle: 'Sustainable Foliage Harvest',
      heritageDesc: 'Fresh green leaves are sustainably pruned from healthy Cinnamomum verum trees, preserving plantation biodiversity.',
      craftTitle: 'Artisanal Steam Hydro-Distillation',
      craftDesc: 'Slow low-temperature steam hydro-distillation capturing the complete volatile aromatic and therapeutic spectrum.',
      globalTitle: 'Batch-Tested Global Export',
      globalDesc: 'Every batch is verified via GC-MS gas chromatography and shipped in UV-protective amber glass packaging.',
    },
    catalog: {
      badge: 'CERTIFIED EXPORT DIRECTORY',
      title: 'Pure Ceylon Cinnamon Collection',
      subtitle: 'From 15ml–100ml amber dropper leaf oils to 100% natural pure Ceylon cinnamon powder and luxury gold-embossed master gift sets.',
      catAll: 'All Products',
      catRetail: 'Amber Dropper Bottles (15ml - 100ml)',
      catPowders: 'Pure Ceylon Spices & Powders',
      catGiftSets: 'Luxury Presentation Sets',
      catBulk: 'Commercial & Industrial Bulk Export',
      catQuills: 'Amber Dropper Bottles (4)',
      catOils: 'Pure Ceylon Leaf Oil',
      catSpices: 'Certified Ceylon Cinnamon',
      originBadge: '100% Pure Ceylon Leaf Oil',
      lowCoumarinBadge: 'High Eugenol (75%–85%)',
      viewSpecs: 'GC-MS Specs & Lab Data',
      orderNow: 'Direct WhatsApp RFQ',
      specsTitle: 'Official Scientific & Packaging Specifications',
      diameter: 'Net Volume / Bottle Size',
      moisture: 'Moisture / Purity',
      coumarin: 'Coumarin Level',
      volatileOil: 'Refractive Index (20°C)',
      cinnamaldehyde: 'Cinnamaldehyde Content',
      eugenol: 'Natural Eugenol (GC-MS)',
      density: 'Specific Gravity (20°C)',
      standard: 'SLS 187 / ISO 3524 Standard',
      packaging: 'Packaging Format',
      close: 'Close Window',
    },
    gallery: {
      badge: 'ESTATE & DISTILLATION ARCHIVE',
      title: 'From Ceylon Plantations to Global Sea Ports',
      subtitle: 'Witness the journey of pure Ceylon Cinnamon Leaf Oil from fresh foliage harvesting to steam hydro-distillation and global dispatch.',
      item1Title: 'Southern Ceylon Foliage Estates',
      item1Desc: 'Sustainably farmed Ceylon Cinnamon estates in Galle, Matara, and Ratnapura.',
      item2Title: 'Fresh Green Leaf Harvesting',
      item2Desc: 'Hand-harvested fresh foliage selected at peak aromatic potency.',
      item3Title: 'Traditional Steam Distillation Kilns',
      item3Desc: 'Low-temperature artisanal hydro-distillation extracting 100% pure essential oil.',
      item4Title: 'GC-MS Purity & Density Verification',
      item4Desc: 'Laboratory gas chromatography testing ensuring 75%–85% active eugenol.',
      item5Title: 'Luxury Amber Dropper Bottling',
      item5Desc: 'UV-protective dark amber glass packaging with tamper-evident precision pipettes.',
      item6Title: 'Global Container & Air Cargo Dispatch',
      item6Desc: 'Direct export dispatch from Port of Colombo with COA and Phytosanitary certification.',
    },
    rfq: {
      badge: 'INSTANT B2B QUOTATION ENGINE',
      title: 'Generate Live WhatsApp Purchase Inquiry',
      subtitle: 'Configure your commercial leaf oil order below. Our Trade Desk in Colombo responds within 15 minutes with current FOB Colombo or CIF container spot rates.',
      labelGrade: 'Select Product / Bottle Size',
      labelQty: 'Quantity',
      labelUnit: 'Measurement Unit',
      labelIncoterm: 'Preferred Incoterm',
      labelDestination: 'Destination Port / Country',
      labelNotes: 'Custom Packaging or Lab Requirements (Optional)',
      placeholderNotes: 'e.g. Need 500 units of 100ml amber bottles, custom private labeling, batch GC-MS COA, or bulk 25kg carboys.',
      placeholderDestination: 'e.g. Hamburg (Germany), Port of Los Angeles (USA), Jebel Ali (Dubai)',
      previewTitle: 'Real-Time WhatsApp Message Preview',
      previewDesc: 'This formatted inquiry will be sent directly to our Colombo trade desk.',
      btnSendWhatsApp: 'Send Quotation via WhatsApp',
      btnCopyMessage: 'Copy Formatted Text',
      copied: 'Copied to Clipboard!',
      disclaimer: 'Direct connection to Jade Cinnamon Lanka Official Trade Desk (+94 76 533 5308). Instant formal response with CIF/FOB proforma invoice.',
    },
    quality: {
      badge: 'SCIENTIFIC PURITY & QUALITY PILLARS',
      title: '100% Pure Ceylon Leaf Oil vs. Synthetic Adulteration',
      subtitle: 'Understand the biochemical distinctions that make authentic Cinnamomum verum leaf oil the premier choice for aromatherapy, cosmetics, dental care, and wellness.',
      trueCeylonTitle: 'Pure Ceylon Leaf Oil (C. Verum)',
      cassiaTitle: 'Synthetic / Adulterated Leaf Oil',
      coumarinMetric: 'Natural Eugenol Active (GC-MS)',
      coumarinCeylon: '75.0% - 85.0% (Natural Bioactive Antioxidant Profile)',
      coumarinCassia: 'Synthetic blend / < 60% (Lacks natural synergistic actives)',
      textureMetric: 'Cinnamaldehyde & Topical Safety',
      textureCeylon: '1.0% - 4.5% (Safe for topical dilution & aromatherapy)',
      textureCassia: 'Heavy cinnamaldehyde/synthetic solvents (Skin irritant)',
      healthMetric: 'Standards & Preservatives',
      healthCeylon: 'SLS 187 & ISO 3524:2003 Certified • 0% Preservatives',
      healthCassia: 'Unregulated mineral oil fillers & chemical stabilizer additives',
      cert1: 'SLS 187 & ISO 3524',
      cert1Desc: 'Full compliance with national and international standards for Ceylon Cinnamon Leaf Oil.',
      cert2: '100% Natural Steam Distilled',
      cert2Desc: 'Hydro-distilled solely from fresh green foliage without chemical extraction solvents.',
      cert3: 'GC-MS Purity Tested',
      cert3Desc: 'Batch-specific Gas Chromatography testing certifying 75%–85% natural eugenol.',
      cert4: 'Product of Sri Lanka & EDB',
      cert4Desc: 'Certified origin with official government phytosanitary and export registration.',
    },
    logistics: {
      badge: 'EXPORT READY INFRASTRUCTURE',
      title: 'Global Supply Chain & Packaging Standards',
      subtitle: 'From Colombo sea hub to global ports with UV amber glass protection, tamper-evident seals, and full export compliance.',
      card1Title: 'Sea Freight FCL & LCL',
      card1Desc: 'Palletized container shipments of retail cartons and bulk drums loaded under supervision at Port of Colombo.',
      card2Title: 'Express Air Cargo',
      card2Desc: 'Fast airfreight via Bandaranaike International Airport (CMB) for retail bottles, luxury gift sets, and urgent commercial orders.',
      card3Title: 'UV Amber Glass & UN Drums',
      card3Desc: '15ml–100ml amber dropper bottles, luxury embossed gift boxes, and 25kg HDPE carboys / 200kg steel drums.',
      card4Title: 'Complete Export Documentation',
      card4Desc: 'Bill of Lading, Certificate of Origin (GSP Form A), Phytosanitary Certificate, Commercial Invoice, Packing List, and Batch GC-MS COA.',
    },
    footer: {
      desc: 'Jade Cinnamon Lanka is an international registered exporter of authentic 100% Pure Ceylon Cinnamon Leaf Oil (Cinnamomum verum), operating under the regulations of the Sri Lanka Export Development Board (EDB).',
      quickLinks: 'Quick Navigation',
      contactDesk: 'International Trade Desk',
      directLine: 'Hotline / WhatsApp:',
      email: 'Export Inquiries:',
      colomboPort: 'Processing & Export Hub: Galle Road, Colombo 03, Sri Lanka',
      legalNote: '100% Authentic Cinnamomum Verum Leaf Oil Guarantee. Certified by Sri Lanka Department of Agriculture & EDB.',
      copyright: '© 2026 Jade Cinnamon Lanka. All Rights Reserved.',
    }
  },

  si: {
    brandTitle: 'ජේඩ් සිනමන් ලංකා',
    brandTagline: '100% ස්වභාවික පිරිසිදු ලංකා කුරුඳු කොළ තෙල් සෘජු නිෂ්පාදක සහ අපනයනකරු',
    nav: {
      home: 'මුල් පිටුව',
      about: 'අප ගැන',
      products: 'නිෂ්පාදන',
      quality: 'ප්‍රමිතිය & GC-MS',
      logistics: 'අපනයන & ඇසුරුම්',
      gallery: 'පින්තූර එකතුව',
      quoteBuilder: 'WhatsApp ඇණවුම්',
      contact: 'සම්බන්ධ වන්න',
      quickRfq: 'මිල ගණන් ලබාගන්න',
    },
    hero: {
      badge: '100% ස්වභාවික • ශ්‍රී ලාංකික උරුමය • සැබෑ කුරුඳු කොළ තෙල්',
      titlePart1: 'ලොව උසස්ම B2B අපනයනකරු',
      titleHighlight: '100% පිරිසිදු ලංකා කුරුඳු කොළ තෙල්',
      titlePart2: '(Cinnamomum verum)',
      description: 'අලුත් කුරුඳු කොළවලින් වාෂ්ප ආසවනයෙන් නිස්සාරණය කරන ලද 100% පිරිසිදු තෙල්. ස්වභාවික ඉයුජිනෝල් (75%–85%), ප්‍රතිඔක්සිකාරක ගුණයෙන් අනූනයි, කල්තබාගන්නා ද්‍රව්‍ය ශුන්‍යයි. 15ml, 30ml, 50ml, 100ml ඇම්බර් බෝතල්, සුඛෝපභෝගී තෑගි පෙට්ටි සහ තොග ඩ්‍රම්ස්.',
      ctaPrimary: 'WhatsApp මඟින් මිල කැඳවීම ලබාගන්න',
      ctaSecondary: 'නිෂ්පාදන පෙළ නරඹන්න',
      statCoumarin: '75% - 85%',
      statCoumarinLabel: 'ස්වභාවික ඉයුජිනෝල් (Eugenol)',
      statMoisture: '100% පිරිසිදු',
      statMoistureLabel: 'වාෂ්ප ආසවිත තෙල්',
      statOrigin: 'SLS 187',
      statOriginLabel: 'ISO 3524:2003 සහතිකලත්',
      statFob: 'FOB / CIF',
      statFobLabel: 'බෝතල්, පෙට්ටි & තොග ඩ්‍රම්ස්',
    },
    about: {
      badge: 'අපගේ සුවිශේෂී උරුමය & තෙල් ආසවන කලාව',
      title: 'ශතවර්ෂ ගණනාවක ලංකා කුරුඳු කොළ තෙල් ආසවනය',
      desc1: 'ජේඩ් සිනමන් ලංකා යනු ශ්‍රී ලංකාවේ දකුණු පළාතේ වතුයායන්හි අලුත් කුරුඳු කොළවලින් 100% ස්වභාවික පිරිසිදු කුරුඳු කොළ තෙල් (Cinnamomum verum) නිපදවා ලොව පුරා අපනයනය කරන ප්‍රමුඛතම ආයතනයකි.',
      desc2: 'කෘත්‍රිම තෙල් මෙන් නොව, අපගේ සැබෑ ලංකා කුරුඳු කොළ තෙල් 75% සිට 85% දක්වා ස්වභාවික ඉයුජිනෝල් වලින් පොහොසත් වන අතර සෞඛ්‍යාරක්ෂිත, ප්‍රතිඔක්සිකාරක සහ විශබීජ නාශක ගුණයෙන් අනූන වේ.',
      heritageTitle: 'තිරසාර කොළ අස්වැන්න',
      heritageDesc: 'ගස්වල පැවැත්ම ආරක්ෂා කරමින් ස්වභාවිකව කප්පාදු කර ලබාගන්නා නැවුම් කොළ.',
      craftTitle: 'පාරම්පරික වාෂ්ප ආසවනය',
      craftDesc: 'පාලිත උෂ්ණත්වයකදී පිරිසිදු වාෂ්ප ආසවනය මගින් උසස්ම තෙල් ලබාගැනීම.',
      globalTitle: 'විද්‍යාගාර පරීක්ෂිත අපනයනය',
      globalDesc: 'GC-MS වාර්තා සහිතව UV ආරක්ෂිත ඇම්බර් බෝතල් සහ තොග බහාලුම් මගින් ලොවටම සැපයීම.',
    },
    catalog: {
      badge: 'සහතික කළ අපනයන නාමාවලිය',
      title: 'පිරිසිදු ලංකා කුරුඳු සහ තෙල් එකතුව',
      subtitle: '15ml–100ml ඩ්‍රොපර් බෝතල්, 1kg 100% ස්වභාවික කුරුඳු කුඩු සහ සුඛෝපභෝගී රන් මුද්‍රිත තෑගි පෙට්ටි දක්වා.',
      catAll: 'සියලු නිෂ්පාදන',
      catRetail: 'ඇම්බර් ඩ්‍රොපර් බෝතල් (15ml - 100ml)',
      catPowders: 'කුරුඳු කුඩු සහ කුළුබඩු (Powders)',
      catGiftSets: 'සුඛෝපභෝගී තෑගි පෙට්ටි',
      catBulk: 'වාණිජ හා කාර්මික තොග අපනයනය',
      catQuills: 'ඇම්බර් ඩ්‍රොපර් බෝතල් (4)',
      catOils: 'කුරුඳු කොළ තෙල්',
      catSpices: 'සහතික කළ ලංකා කුරුඳු',
      originBadge: '100% පිරිසිදු ලංකා තෙල්',
      lowCoumarinBadge: 'උසස් ඉයුජිනෝල් (75%–85%)',
      viewSpecs: 'විද්‍යාගාර දත්ත & GC-MS',
      orderNow: 'WhatsApp ඇණවුම්',
      specsTitle: 'නිෂ්පාදන පිරිවිතර සහ ඇසුරුම් විස්තර',
      diameter: 'ශුද්ධ පරිමාව / බෝතල් ප්‍රමාණය',
      moisture: 'පාරිශුද්ධත්වය',
      coumarin: 'කූමරින් ප්‍රතිශතය',
      volatileOil: 'වර්තන අංකය (Refractive Index)',
      cinnamaldehyde: 'Cinnamaldehyde ප්‍රතිශතය',
      eugenol: 'ස්වභාවික ඉයුජිනෝල් (Eugenol)',
      density: 'විශිෂ්ට ගුරුත්වය (Specific Gravity)',
      standard: 'SLS 187 / ISO 3524 ප්‍රමිතිය',
      packaging: 'ඇසුරුම්කරණය',
      close: 'වසන්න',
    },
    gallery: {
      badge: 'ක්ෂේත්‍ර සහ ආසවන එකතුව',
      title: 'ලංකා වතුයායේ සිට ගෝලීය වරාය දක්වා',
      subtitle: 'නැවුම් කුරුඳු කොළ අස්වැන්න නෙළීමේ සිට වාෂ්ප ආසවනය හා අපනයනය දක්වා සම්පූර්ණ ක්‍රියාවලිය.',
      item1Title: 'දකුණු ලක කුරුඳු වතුයාය',
      item1Desc: 'ගාල්ල, මාතර සහ රත්නපුර දිස්ත්‍රික්කයන්හි ස්වභාවික කුරුඳු වතු.',
      item2Title: 'නැවුම් කොළ අස්වැන්න',
      item2Desc: 'උසස්ම තෙල් සාන්ද්‍රණයක් සහිත කොළ අතින් තෝරාගැනීම.',
      item3Title: 'පාරම්පරික වාෂ්ප ආසවන තාක්ෂණය',
      item3Desc: '100% ස්වභාවික තෙල් නිස්සාරණය කරගන්නා ක්‍රියාවලිය.',
      item4Title: 'GC-MS විද්‍යාගාර පරීක්ෂාව',
      item4Desc: 'ඉයුජිනෝල් ප්‍රතිශතය 75%–85% අතර බව තහවුරු කිරීම.',
      item5Title: 'ඇම්බර් ඩ්‍රොපර් බෝතල් ඇසුරුම්කරණය',
      item5Desc: 'ආලෝකයෙන් ආරක්ෂිත ඇම්බර් වීදුරු බෝතල්වල අසුරනු ලැබීම.',
      item6Title: 'ගෝලීය බහාලුම් හා ගුවන් ප්‍රවාහනය',
      item6Desc: 'කොළඹ වරායෙන් ලොව පුරා රටවලට සෘජුවම නැව්ගත කිරීම.',
    },
    rfq: {
      badge: 'ක්ෂණික මිල ගණන් යන්ත්‍රය',
      title: 'සෘජු WhatsApp ඇණවුම් තොරතුරු',
      subtitle: 'ඔබට අවශ්‍ය කුරුඳු කොළ තෙල් වර්ගය සහ ප්‍රමාණය තෝරා අපගේ කොළඹ අපනයන අංශය හා සෘජුව සම්බන්ධ වන්න.',
      labelGrade: 'නිෂ්පාදනය / ප්‍රමාණය තෝරන්න',
      labelQty: 'ප්‍රමාණය',
      labelUnit: 'මිනුම් ඒකකය',
      labelIncoterm: 'Incoterm වර්ගය',
      labelDestination: 'ගමනාන්ත වරාය / රට',
      labelNotes: 'විශේෂ අවශ්‍යතා (විකල්ප)',
      placeholderNotes: 'උදා: 100ml බෝතල් 500ක්, ලේබල් කිරීම, GC-MS වාර්තාව හෝ තොග ඩ්‍රම්ස්.',
      placeholderDestination: 'උදා: Hamburg, Los Angeles, Dubai',
      previewTitle: 'WhatsApp පණිවිඩ පෙරදසුන',
      previewDesc: 'මෙම පණිවිඩය සෘජුවම අපගේ නිලධාරියා වෙත යවනු ලැබේ.',
      btnSendWhatsApp: 'WhatsApp මඟින් මිල කැඳවීම ලබාගන්න',
      btnCopyMessage: 'පිටපත් කරගන්න',
      copied: 'පිටපත් විය!',
      disclaimer: 'ජේඩ් සිනමන් ලංකා නිල අපනයන අංශය (+94 76 533 5308).',
    },
    quality: {
      badge: 'විද්‍යාත්මක පරීක්ෂණ & ප්‍රමිති කුළුණු',
      title: '100% සැබෑ ලංකා කොළ තෙල් සහ කෘත්‍රිම තෙල් අතර වෙනස',
      subtitle: 'සුවඳ විලවුන්, ඖෂධ සහ දෛනික භාවිතයට සැබෑ ලංකා කුරුඳු කොළ තෙල් තෝරාගත යුත්තේ ඇයි?',
      trueCeylonTitle: 'සැබෑ ලංකා කොළ තෙල් (C. Verum)',
      cassiaTitle: 'කෘත්‍රිම / මිශ්‍ර කළ කොළ තෙල්',
      coumarinMetric: 'ස්වභාවික ඉයුජිනෝල් (GC-MS)',
      coumarinCeylon: '75.0% - 85.0% (ප්‍රබල ස්වභාවික ප්‍රතිඔක්සිකාරකයකි)',
      coumarinCassia: 'කෘත්‍රිම මිශ්‍රණ / < 60% (ස්වභාවික ගුණයෙන් තොරයි)',
      textureMetric: 'Cinnamaldehyde සහ සමට ආරක්ෂිත බව',
      textureCeylon: '1.0% - 4.5% (සමට සහ ආඝ්‍රාණයට සුරක්ෂිතයි)',
      textureCassia: 'අධික ද්‍රාවක සහ කෘත්‍රිම රසායනික (සමට අහිතකරයි)',
      healthMetric: 'ප්‍රමිති සහතිකය',
      healthCeylon: 'SLS 187 & ISO 3524:2003 සහතිකලත් • කල්තබාගන්නා ද්‍රව්‍ය 0%',
      healthCassia: 'ප්‍රමිතියෙන් තොර ඛනිජ තෙල් සහ කෘත්‍රිම කල්තබාගන්නා ද්‍රව්‍ය',
      cert1: 'SLS 187 & ISO 3524',
      cert1Desc: 'ශ්‍රී ලංකා ජාතික සහ ජාත්‍යන්තර කුරුඳු කොළ තෙල් ප්‍රමිතිය.',
      cert2: '100% ස්වභාවික වාෂ්ප ආසවිත',
      cert2Desc: 'රසායනික ද්‍රාවකවලින් තොරව නැවුම් කොළවලින් පමණක් ලබාගැනීම.',
      cert3: 'GC-MS පරීක්ෂණ සහතිකය',
      cert3Desc: 'සෑම තොගයකම ඉයුජිනෝල් 75%–85% බව විද්‍යාගාරයෙන් තහවුරු කෙරේ.',
      cert4: 'ශ්‍රී ලාංකික සම්භවය & EDB',
      cert4Desc: 'ශ්‍රී ලංකා අපනයන සංවර්ධන මණ්ඩලයේ ලියාපදිංචි නිල සහතිකය.',
    },
    logistics: {
      badge: 'නැව්ගත කිරීමේ සහ ඇසුරුම් ප්‍රමිතිය',
      title: 'ගෝලීය බහාලුම් සහ ආරක්ෂිත ඇසුරුම්',
      subtitle: 'කොළඹ වරායේ සිට ලොව පුරා රටවලට UV ආරක්ෂිත ඇම්බර් වීදුරු බෝතල් සහ UN සහතිකලත් ඩ්‍රම්ස් මගින් ප්‍රවාහනය.',
      card1Title: 'නැව් මගින් ප්‍රවාහනය (FCL / LCL)',
      card1Desc: 'පැලටයිස් කරන ලද බහාලුම් මගින් කොළඹ වරායෙන් ආරක්ෂිතව නැව්ගත කිරීම.',
      card2Title: 'ගුවන් මගින් ප්‍රවාහනය (Air Cargo)',
      card2Desc: 'බෝතල් සහ තෑගි පෙට්ටි කඩිනමින් බෙදාහැරීම සඳහා ගුවන් සේවාව.',
      card3Title: 'UV ආරක්ෂිත ඇම්බර් බෝතල් & ඩ්‍රම්ස්',
      card3Desc: '15ml–100ml ඇම්බර් බෝතල්, තෑගි පෙට්ටි සහ 25kg/200kg වානේ ඩ්‍රම්ස්.',
      card4Title: 'අපනයන ලියකියවිලි',
      card4Desc: 'Bill of Lading, Certificate of Origin, Phytosanitary Certificate සහ Batch GC-MS COA.',
    },
    footer: {
      desc: 'ජේඩ් සිනමන් ලංකා යනු 100% පිරිසිදු ලංකා කුරුඳු කොළ තෙල් (Cinnamomum verum) ශ්‍රී ලංකා අපනයන සංවර්ධන මණ්ඩලයේ (EDB) අධීක්ෂණය යටතේ අපනයනය කරන නිල ආයතනයකි.',
      quickLinks: 'පිටු සබැඳි',
      contactDesk: 'අපනයන අංශය',
      directLine: 'දුරකථන / WhatsApp:',
      email: 'විද්‍යුත් තැපෑල:',
      colomboPort: 'මධ්‍යස්ථානය: ගාලු පාර, කොළඹ 03, ශ්‍රී ලංකාව',
      legalNote: '100% අව්‍යාජ ශ්‍රී ලාංකික කුරුඳු කොළ තෙල් බවට සහතික කෙරේ.',
      copyright: '© 2026 ජේඩ් සිනමන් ලංකා. සියලු හිමිකම් ඇවිරිණි.',
    }
  },

  ta: {
    brandTitle: 'ஜேட் இலவங்கப்பட்டை லங்கா',
    brandTagline: '100% தூய சிலோன் இலவங்கப்பட்டை இலை எண்ணெய் நேரடி ஏற்றுமதியாளர்',
    nav: {
      home: 'முகப்பு',
      about: 'எங்களை பற்றி',
      products: 'தயாரிப்புகள்',
      quality: 'தரம் & GC-MS',
      logistics: 'ஏற்றுமதி & பேக்கிங்',
      gallery: 'படத்தொகுப்பு',
      quoteBuilder: 'WhatsApp RFQ',
      contact: 'தொடர்புகளுக்கு',
      quickRfq: 'விலை கேட்க',
    },
    hero: {
      badge: '100% இயற்கை • நேரடி இலங்கை தோட்டம் • தூய இலை எண்ணெய்',
      titlePart1: 'உலகத்தரம் வாய்ந்த B2B ஏற்றுமதியாளர்',
      titleHighlight: '100% தூய சிலோன் இலவங்கப்பட்டை இலை எண்ணெய்',
      titlePart2: '(Cinnamomum verum)',
      description: 'புதிய சிலோன் இலவங்கப்பட்டை இலைகளிலிருந்து நீராவி வடித்தல் மூலம் பெறப்பட்ட 100% தூய அத்தியாவசிய எண்ணெய். அதிக இயற்கை யூஜெனோல் (75%–85%), ஆன்டிஆக்ஸிடன்ட்கள் நிறைந்தது. 15ml, 30ml, 50ml, 100ml அம்பர் பாட்டில்கள் மற்றும் மொத்த ஏற்றுமதி.',
      ctaPrimary: 'WhatsApp மூலம் விலைப்புள்ளி பெறுக',
      ctaSecondary: 'தயாரிப்புகளை காண்க',
      statCoumarin: '75% - 85%',
      statCoumarinLabel: 'இயற்கை யூஜெனோல் (GC-MS)',
      statMoisture: '100% தூயது',
      statMoistureLabel: 'நீராவி வடித்தல் எண்ணெய்',
      statOrigin: 'SLS 187',
      statOriginLabel: 'ISO 3524:2003 சான்றளிக்கப்பட்டது',
      statFob: 'FOB / CIF',
      statFobLabel: 'பாட்டில்கள், பெட்டிகள் & டிரம்கள்',
    },
    about: {
      badge: 'தோட்ட பாரம்பரியம் & எண்ணெய் வடித்தல்',
      title: 'நூற்றாண்டு பாரம்பரிய சிலோன் இலை எண்ணெய் தயாரிப்பு',
      desc1: 'ஜேட் இலவங்கப்பட்டை லங்கா என்பது இலங்கையின் தென் மாகாணத் தோட்டங்களிலிருந்து புதிய இலைகளைக் கொண்டு 100% தூய சிலோன் இலவங்கப்பட்டை இலை எண்ணெயை (Cinnamomum verum) ஏற்றுமதி செய்யும் முன்னணி நிறுவனமாகும்.',
      desc2: 'செயற்கை எண்ணெய்கள் போலல்லாமல், எங்கள் தூய எண்ணெய் 75% முதல் 85% வரை இயற்கை யூஜெனோலைக் கொண்டு சிறந்த மருத்துவ நன்மைகளை வழங்குகிறது.',
      heritageTitle: 'நிலையான இலை அறுவடை',
      heritageDesc: 'மரங்களின் பாதுகாப்பை உறுதிசெய்து புதிய இலைகளை பாரம்பரியமாக சேகரித்தல்.',
      craftTitle: 'நீராவி வடித்தல் நுட்பம்',
      craftDesc: 'துல்லியமான வெப்பநிலையில் நீராவி வடித்தல் மூலம் தூய எண்ணெய் பிரித்தெடுத்தல்.',
      globalTitle: 'ஆய்வக சான்றளிக்கப்பட்ட ஏற்றுமதி',
      globalDesc: 'GC-MS சோதனைகளுடன் அம்பர் பாட்டில்கள் மற்றும் கொள்கலன்களில் உலகளாவிய விநியோகம்.',
    },
    catalog: {
      badge: 'சான்றளிக்கப்பட்ட ஏற்றுமதி பட்டியல்',
      title: 'தூய சிலோன் இலவங்கப்பட்டை & எண்ணெய் தொகுப்பு',
      subtitle: '15ml-100ml சொட்டு பாட்டில்கள், 1kg 100% தூய இலவங்கப்பட்டை பொடி மற்றும் ஆடம்பர பரிசு பெட்டிகள்.',
      catAll: 'அனைத்து தயாரிப்புகள்',
      catRetail: 'அம்பர் சொட்டு பாட்டில்கள் (15ml - 100ml)',
      catPowders: 'இலவங்கப்பட்டை பொடி & மசாலா',
      catGiftSets: 'ஆடம்பர பரிசு பெட்டிகள்',
      catBulk: 'வணிக மற்றும் தொழில்துறை மொத்த ஏற்றுமதி',
      catQuills: 'அம்பர் சொட்டு பாட்டில்கள் (4)',
      catOils: 'இலவங்கப்பட்டை எண்ணெய்',
      catSpices: 'சான்றளிக்கப்பட்ட சிலோன் இலவங்கப்பட்டை',
      originBadge: '100% தூய சிலோன் இலை எண்ணெய்',
      lowCoumarinBadge: 'அதிக யூஜெனோல் (75%–85%)',
      viewSpecs: 'GC-MS & ஆய்வக விவரங்கள்',
      orderNow: 'WhatsApp ஆணை',
      specsTitle: 'தொழில்நுட்ப விவரக்குறிப்புகள்',
      diameter: 'நிகர அளவு / பாட்டில் அளவு',
      moisture: 'தூய்மை',
      coumarin: 'கூமரின் அளவு',
      volatileOil: 'ஒளிவிலகல் எண் (Refractive Index)',
      cinnamaldehyde: 'சின்னமால்டிஹைட்',
      eugenol: 'இயற்கை யூஜெனோல் (GC-MS)',
      density: 'குறிப்பிட்ட அடர்த்தி (Specific Gravity)',
      standard: 'SLS 187 / ISO 3524 தரம்',
      packaging: 'பேக்கேஜிங்',
      close: 'மூடு',
    },
    gallery: {
      badge: 'தோட்ட மற்றும் வடித்தல் படத்தொகுப்பு',
      title: 'இலங்கை தோட்டங்களிலிருந்து உலகளாவிய துறைமுகங்களுக்கு',
      subtitle: 'புதிய இலை அறுவடை முதல் நீராவி வடித்தல் மற்றும் ஏற்றுமதி வரையிலான முழுமையான பயணம்.',
      item1Title: 'இலங்கை மலைத்தோட்டங்கள்',
      item1Desc: 'தென் இலங்கையில் இயற்கையான முறையில் பராமரிக்கப்படும் இலவங்கப்பட்டை தோட்டங்கள்.',
      item2Title: 'புதிய இலை அறுவடை',
      item2Desc: 'அதிக நறுமணம் கொண்ட புதிய இலைகளை தேர்ந்தெடுத்தல்.',
      item3Title: 'பாரம்பரிய நீராவி வடித்தல்',
      item3Desc: '100% தூய அத்தியாவசிய எண்ணெயை பிரித்தெடுக்கும் முறை.',
      item4Title: 'GC-MS ஆய்வக பரிசோதனை',
      item4Desc: 'யூஜெனோல் அளவு 75%–85% இருப்பதை உறுதிசெய்தல்.',
      item5Title: 'அம்பர் பாட்டில்களில் அடைத்தல்',
      item5Desc: 'ஒளி புகாத அம்பர் கண்ணாடி பாட்டில்களில் பாதுகாப்பாக அடைத்தல்.',
      item6Title: 'உலகளாவிய கப்பல் ஏற்றுமதி',
      item6Desc: 'கொழும்பு துறைமுகத்திலிருந்து உலகம் முழுவதும் நேரடி ஏற்றுமதி.',
    },
    rfq: {
      badge: 'உடனடி B2B மேற்கோள்',
      title: 'நேரடி WhatsApp விசாரணை',
      subtitle: 'உங்கள் தேவைகளைத் தேர்ந்தெடுத்து கொழும்பு ஏற்றுமதிப் பிரிவோடு உடனடியாகத் தொடர்பு கொள்ளுங்கள்.',
      labelGrade: 'பாட்டில் அளவு / தயாரிப்பு',
      labelQty: 'அளவு',
      labelUnit: 'அலகு',
      labelIncoterm: 'Incoterm முறை',
      labelDestination: 'இலக்கு துறைமுகம் / நாடு',
      labelNotes: 'கூடுதல் தேவைகள்',
      placeholderNotes: 'எ.கா. 100ml பாட்டில்கள் 500, லேபிளிங், அல்லது 25kg டிரம்கள்.',
      placeholderDestination: 'எ.கா. Hamburg, Dubai, New York',
      previewTitle: 'WhatsApp செய்தி முன்னோட்டம்',
      previewDesc: 'இந்த செய்தி நேரடியாக எங்கள் ஏற்றுமதி மேலாளருக்கு அனுப்பப்படும்.',
      btnSendWhatsApp: 'WhatsApp மூலம் விலைப்புள்ளி பெறுக',
      btnCopyMessage: 'நகலெடுக்கவும்',
      copied: 'நகலெடுக்கப்பட்டது!',
      disclaimer: 'ஜேட் இலவங்கப்பட்டை லங்கா உத்தியோகபூர்வ வர்த்தக மையம் (+94 76 533 5308).',
    },
    quality: {
      badge: 'பாதுகாப்பு & தூய்மை தூண்கள்',
      title: 'தூய சிலோன் இலை எண்ணெய் vs செயற்கை எண்ணெய்',
      subtitle: 'அரோமாதெரபி மற்றும் மருத்துவ பயன்பாட்டிற்கு உண்மையான சிலோன் இலை எண்ணெயை தேர்ந்தெடுக்கவும்.',
      trueCeylonTitle: 'தூய சிலோன் இலை எண்ணெய் (C. Verum)',
      cassiaTitle: 'செயற்கை / கலப்பட எண்ணெய்',
      coumarinMetric: 'இயற்கை யூஜெனோல் (GC-MS)',
      coumarinCeylon: '75.0% - 85.0% (இயற்கை ஆன்டிஆக்ஸிடன்ட் தரம்)',
      coumarinCassia: 'செயற்கை கலவை / < 60% (இயற்கை குணமற்றது)',
      textureMetric: 'சின்னமால்டிஹைட் & தோல் பாதுகாப்பு',
      textureCeylon: '1.0% - 4.5% (தோலுக்கு பாதுகாப்பான பயன்பாடு)',
      textureCassia: 'செயற்கை கரைப்பான்கள் (தோல் எரிச்சலை உண்டாக்கும்)',
      healthMetric: 'தர சான்றிதழ்கள்',
      healthCeylon: 'SLS 187 & ISO 3524:2003 சான்றளிக்கப்பட்டது • 0% பாதுகாப்புகள்',
      healthCassia: 'கனிம எண்ணெய்கள் மற்றும் இரசாயன கலவைகள்',
      cert1: 'SLS 187 & ISO 3524',
      cert1Desc: 'தேசிய மற்றும் சர்வதேச இலவங்கப்பட்டை இலை எண்ணெய் தரம்.',
      cert2: '100% இயற்கை நீராவி வடித்தல்',
      cert2Desc: 'இரசாயன கரைப்பான்கள் இன்றி புதிய இலைகளிலிருந்து பெறப்பட்டது.',
      cert3: 'GC-MS பரிசோதனை',
      cert3Desc: 'ஒவ்வொரு தொகுதிக்கும் ஆய்வக சோதனை சான்றிதழ்.',
      cert4: 'இலங்கை தோற்றம் & EDB',
      cert4Desc: 'அரசாங்க விவசாய அமைச்சகம் மற்றும் ஏற்றுமதி சபையின் ஒப்புதல்.',
    },
    logistics: {
      badge: 'ஏற்றுமதி மற்றும் பேக்கிங்',
      title: 'உலகளாவிய கொள்கலன் மற்றும் பேக்கிங் தரம்',
      subtitle: 'கொழும்பு துறைமுகத்திலிருந்து UV அம்பர் கண்ணாடி பாட்டில்கள் மற்றும் சான்றளிக்கப்பட்ட டிரம்களில் ஏற்றுமதி.',
      card1Title: 'கடல் சரக்கு (FCL / LCL)',
      card1Desc: 'கொழும்பு துறைமுகத்திலிருந்து பாதுகாப்பாக ஏற்றுமதி செய்யப்படுகிறது.',
      card2Title: 'விமான சரக்கு (Air Cargo)',
      card2Desc: 'பாட்டில்கள் மற்றும் பரிசு பெட்டிகளுக்கான விரைவு விமான சேவை.',
      card3Title: 'UV அம்பர் பாட்டில்கள் & டிரம்கள்',
      card3Desc: '15ml–100ml அம்பர் பாட்டில்கள், பரிசு பெட்டிகள் மற்றும் 25kg/200kg எஃகு டிரம்கள்.',
      card4Title: 'முழுமையான ஆவணங்கள்',
      card4Desc: 'Bill of Lading, Certificate of Origin, Phytosanitary மற்றும் GC-MS COA.',
    },
    footer: {
      desc: 'ஜேட் இலவங்கப்பட்டை லங்கா 100% தூய சிலோன் இலவங்கப்பட்டை இலை எண்ணெயை இலங்கை ஏற்றுமதி அபிவிருத்தி சபையின் (EDB) கீழ் ஏற்றுமதி செய்யும் அதிகாரப்பூர்வ நிறுவனமாகும்.',
      quickLinks: 'பக்கங்கள்',
      contactDesk: 'ஏற்றுமதி பிரிவு',
      directLine: 'தொலைபேசி / WhatsApp:',
      email: 'மின்னஞ்சல்:',
      colomboPort: 'மையம்: காலி வீதி, கொழும்பு 03, இலங்கை',
      legalNote: '100% தூய Cinnamomum Verum இலை எண்ணெய் உத்தரவாதம்.',
      copyright: '© 2026 ஜேட் இலவங்கப்பட்டை லங்கா. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    }
  },

  ar: {
    brandTitle: 'جايد سينامون لانكا',
    brandTagline: 'المصدر المباشر لزيت ورق القرفة السيلانية النقي 100%',
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      products: 'المنتجات',
      quality: 'الجودة و GC-MS',
      logistics: 'الشحن والتعبئة',
      gallery: 'معرض الصور',
      quoteBuilder: 'طلب واتساب',
      contact: 'مكتب التجارة',
      quickRfq: 'طلب تسعيرة B2B',
    },
    hero: {
      badge: 'طبيعي 100% • من مزارع سريلانكا مباشرة • زيت ورق القرفة السيلانية',
      titlePart1: 'المصدر الموثوق عالمياً لـ',
      titleHighlight: 'زيت ورق القرفة السيلانية النقي 100%',
      titlePart2: '(Cinnamomum verum)',
      description: 'زيت عطري أساسي نقي 100% مقطر بالبخار المائي من أوراق القرفة السيلانية الخضراء الطازجة. غني باليوجينول الطبيعي الفعال (75%–85%) ومضادات الأكسدة وبدون أي مواد حافظة. معتمد SLS 187 و ISO 3524. متوفر في عبوات قطارة كهرمانية (15، 30، 50، 100 مل)، علب هدايا فاخرة، وبراميل تصدير صناعية.',
      ctaPrimary: 'إرسال عرض الأسعار عبر واتساب',
      ctaSecondary: 'استكشف تشكيلة زيت ورق القرفة',
      statCoumarin: '75% - 85%',
      statCoumarinLabel: 'اليوجينول الطبيعي (GC-MS)',
      statMoisture: 'نقي 100%',
      statMoistureLabel: 'مقطر بالبخار المائي',
      statOrigin: 'SLS 187',
      statOriginLabel: 'معتمد وفق ISO 3524',
      statFob: 'FOB / CIF',
      statFobLabel: 'عبوات، علب فاخرة وبراميل',
    },
    about: {
      badge: 'أصالة التراث وخبرة تقطير أوراق القرفة',
      title: 'قرون من الإتقان في تقطير أوراق القرفة السيلانية',
      desc1: 'تعتبر جايد سينامون لانكا مؤسسة إنتاج وتصدير دولية رائدة متخصصة حصرياً في زيت ورق القرفة السيلانية النقي 100% (Cinnamomum verum) المقطر بالبخار من أوراق القرفة الطازجة المحصودة من مزارعنا الجنوبية في سريلانكا.',
      desc2: 'يتميز زيت ورق القرفة السيلانية باحتوائه على 75% إلى 85% من مادة اليوجينول الطبيعية ومستوى آمن للاستخدام الموضعي والعطري مع انعدام المواد الحافظة والمذيبات الكيميائية.',
      heritageTitle: 'حصاد مستدام للأوراق',
      heritageDesc: 'تقليم مستدام للأوراق الخضراء يحافظ على حيوية أشجار القرفة السيلانية وتنوعها البيئي.',
      craftTitle: 'تقطير مائي بالبخار',
      craftDesc: 'تقطير حرفي بطيء بالبخار بدرجات حرارة مضبوطة لاستخلاص كامل المركبات العطرية والعلاجية.',
      globalTitle: 'تصدير موثق مخبرياً',
      globalDesc: 'فحص كل دفعة بواسطة كروماتوغرافيا الغاز (GC-MS) وتعبئتها في زجاج كهرماني واقٍ من الضوء.',
    },
    catalog: {
      badge: 'دليل التصدير المعتمد',
      title: 'مجموعة منتجات القرفة السيلانية النقية',
      subtitle: 'من عبوات زيت ورق القرفة الكهرمانية 15-100 مل إلى مسحوق القرفة الطبيعي 1 كجم وعلب الهدايا الفاخرة.',
      catAll: 'جميع المنتجات',
      catRetail: 'عبوات قطارة كهرمانية (15 - 100 مل)',
      catPowders: 'مسحوق القرفة والتوابل النقية',
      catGiftSets: 'مجموعات العلب الفاخرة',
      catBulk: 'تصدير تجاري وصناعي بالجملة',
      catQuills: 'عبوات قطارة كهرمانية (4)',
      catOils: 'زيت ورق القرفة النقي',
      catSpices: 'منتجات القرفة السيلانية المعتمدة',
      originBadge: 'زيت ورق سيلاني نقي 100%',
      lowCoumarinBadge: 'يوجينول عالي (75%–85%)',
      viewSpecs: 'المواصفات ومخطط GC-MS',
      orderNow: 'طلب عبر واتساب',
      specsTitle: 'المواصفات العلمية والتعبئة الرسمية',
      diameter: 'الحجم الصافي / سعة العبوة',
      moisture: 'النقاء / الخلو من الإضافات',
      coumarin: 'مستوى الكومارين',
      volatileOil: 'معامل الانكسار (20°C)',
      cinnamaldehyde: 'سينامالدهيد',
      eugenol: 'اليوجينول الطبيعي (GC-MS)',
      density: 'الكثافة النوعية (20°C)',
      standard: 'المعيار القياسي SLS 187 / ISO 3524',
      packaging: 'نوع التعبئة والتغليف',
      close: 'إغلاق',
    },
    gallery: {
      badge: 'أرشيف المزارع والتقطير',
      title: 'من مزارع سريلانكا إلى موانئ العالم',
      subtitle: 'شاهد مراحل إنتاج زيت ورق القرفة السيلانية من حصاد الأوراق إلى التقطير بالبخار وشحن الحاويات.',
      item1Title: 'مزارع جنوب سريلانكا',
      item1Desc: 'مزارع القرفة السيلانية في محافظات غالي وماتارا وراتنابورا.',
      item2Title: 'حصاد الأوراق الخضراء الطازجة',
      item2Desc: 'اختيار الأوراق الطازجة يدوياً لضمان أعلى تركيز للزيوت الطيارة.',
      item3Title: 'أجهزة التقطير بالبخار التقليدية',
      item3Desc: 'استخلاص الزيت العطري النقي 100% بطريقة التقطير بالبخار المائي.',
      item4Title: 'فحص النقاء الكروماتوغرافي GC-MS',
      item4Desc: 'التأكد المخبري من نسبة اليوجينول النشطة بين 75% و 85%.',
      item5Title: 'التعبئة في زجاجات كهرمانية',
      item5Desc: 'عبوات زجاجية كهرمانية داكنة لحماية الزيت من الأشعة فوق البنفسجية.',
      item6Title: 'الشحن البحري والجوي الدولي',
      item6Desc: 'تصدير مباشر من ميناء كولومبو مع شهادات التحليل والصحة النباتية.',
    },
    rfq: {
      badge: 'محرك عروض الأسعار الفوري',
      title: 'توليد طلب شراء مباشر عبر واتساب',
      subtitle: 'حدد مواصفات طلبك التجاري وسيقوم مكتب التصدير في كولومبو بالرد عليك خلال 15 دقيقة بأسعار FOB أو CIF المحدثة.',
      labelGrade: 'اختر العبوة / الحجم',
      labelQty: 'الكمية المطلوبة',
      labelUnit: 'وحدة القياس',
      labelIncoterm: 'شرط الشحن (Incoterm)',
      labelDestination: 'ميناء الوصول / الدولة',
      labelNotes: 'متطلبات التعبئة أو الفحص المختبري (اختياري)',
      placeholderNotes: 'مثال: 500 عبوة 100 مل، علامة خاصة، شهادة GC-MS أو براميل 25 كجم.',
      placeholderDestination: 'مثال: ميناء جبل علي، جدة، الدمام، الإسكندرية',
      previewTitle: 'معاينة نص رسالة الواتساب',
      previewDesc: 'سيتم إرسال هذا الطلب مباشرة إلى مدير التصدير في كولومبو.',
      btnSendWhatsApp: 'إرسال عرض الأسعار عبر واتساب',
      btnCopyMessage: 'نسخ نص الرسالة',
      copied: 'تم النسخ بنجاح!',
      disclaimer: 'اتصال مباشر بمكتب التجارة لشركة جايد سينامون لانكا (+94 76 533 5308).',
    },
    quality: {
      badge: 'ركائز النقاء العلمي والجودة',
      title: 'مقارنة زيت ورق القرفة السيلانية بالزيوت المغشوشة',
      subtitle: 'تعرف على الخصائص الكيميائية التي تجعل زيت ورق القرفة السيلانية الخيار الأول للعلاج العطري والعناية والتجميل.',
      trueCeylonTitle: 'زيت ورق سيلاني نقي (C. Verum)',
      cassiaTitle: 'زيت صناعي / مغشوش',
      coumarinMetric: 'اليوجينول الطبيعي النشط (GC-MS)',
      coumarinCeylon: '75.0% - 85.0% (مركب حيوي مضاد للأكسدة ومطهر)',
      coumarinCassia: 'مركب يوجينول صناعي / < 60% (فاقد للخصائص التآزرية)',
      textureMetric: 'السينامالدهيد والأمان الموضعي',
      textureCeylon: '1.0% - 4.5% (آمن للاستخدام الموضعي المخفف والاستنشاق)',
      textureCassia: 'مذيبات صناعية حارقة (تسبب تهيجاً شديداً للبشرة)',
      healthMetric: 'معايير الجودة والمواد الحافظة',
      healthCeylon: 'معتمد SLS 187 و ISO 3524:2003 • بدون مواد حافظة 0%',
      healthCassia: 'مخلوط بزيوت معدنية رخيصة وإضافات كيميائية ضارة',
      cert1: 'SLS 187 & ISO 3524',
      cert1Desc: 'مطابقة تامة للمواصفات القياسية الدولية لزيت ورق القرفة السيلانية.',
      cert2: 'طبيعي 100% مقطر بالبخار',
      cert2Desc: 'مستخلص بالبخار المائي النقي بدون أي مذيبات كيميائية.',
      cert3: 'فحص كروماتوغرافي GC-MS',
      cert3Desc: 'شهادة تحليل مخبري معتمدة لكل شحنة تثبت نسبة اليوجينول.',
      cert4: 'منشأ سريلانكي مسجل EDB',
      cert4Desc: 'منشأ مضمون ومسجل لدى مجلس تنمية الصادرات السريلانكي.',
    },
    logistics: {
      badge: 'معايير الشحن والتعبئة الدولية',
      title: 'سلاسل الإمداد العالمية والتعبئة الآمنة',
      subtitle: 'من ميناء كولومبو إلى جميع موانئ العالم مع حماية الزجاج الكهرماني وأختام الأمان.',
      card1Title: 'شحن بحري للحاويات (FCL & LCL)',
      card1Desc: 'تحميل كراتين التجزئة والبراميل على منصات خشبية معقمة في ميناء كولومبو.',
      card2Title: 'شحن جوي سريع (Air Cargo)',
      card2Desc: 'شحن جوي سريع للعبوات الزجاجية وعلب الهدايا والطلبات العاجلة.',
      card3Title: 'زجاج كهرماني وبراميل UN',
      card3Desc: 'عبوات 15–100 مل بقطارات دقيقة، علب فاخرة، وبراميل فولاذية 200 كجم.',
      card4Title: 'توثيق رسمي كامل للتصدير',
      card4Desc: 'بوليصة الشحن، شهادة المنشأ، الشهادة الصحية الزراعية، وتقرير GC-MS COA.',
    },
    footer: {
      desc: 'جايد سينامون لانكا هي شركة تصدير دولية مسجلة لزيت ورق القرفة السيلانية النقي 100% (Cinnamomum verum) تحت مظلة مجلس تنمية الصادرات السريلانكي (EDB).',
      quickLinks: 'روابط سريعة',
      contactDesk: 'مكتب التجارة الدولي',
      directLine: 'الخط الساخن / واتساب:',
      email: 'البريد الإلكتروني:',
      colomboPort: 'مركز التصدير: طريق غالي، كولومبو 03، سريلانكا',
      legalNote: 'ضمان أصالة زيت ورق القرفة السيلانية 100% Cinnamomum Verum.',
      copyright: '© 2026 جايد سينامون لانكا. جميع الحقوق محفوظة.',
    }
  },

  de: {
    brandTitle: 'Jade Cinnamon Lanka',
    brandTagline: '100% Reines Ceylon-Zimtblattöl Direkthersteller & Exporteur',
    nav: {
      home: 'Startseite',
      about: 'Über Uns',
      products: 'Produkte',
      quality: 'Qualität & GC-MS',
      logistics: 'Export & Verpackung',
      gallery: 'Galerie',
      quoteBuilder: 'WhatsApp Angebot',
      contact: 'Export-Büro',
      quickRfq: 'B2B-Angebot anfordern',
    },
    hero: {
      badge: '100% NATÜRLICH • DIREKTE PLANTAGENHERKUNFT • SRI LANKA ORIGIN',
      titlePart1: 'Weltklasse-Exporteur von',
      titleHighlight: '100% Reinem Ceylon-Zimtblattöl',
      titlePart2: '(Cinnamomum verum)',
      description: 'Reines wasserdampfdestilliertes ätherisches Öl aus frischen Ceylon-Zimtblättern. Hoher natürlicher Eugenolgehalt (75%–85%), reich an Antioxidantien, 0% Konservierungsstoffe. SLS 187 & ISO 3524 zertifiziert. Erhältlich in 15ml, 30ml, 50ml, 100ml Braunglas-Tropfflaschen, luxuriösen Geschenkboxen und Exportfässern (1L–200L).',
      ctaPrimary: 'Angebot über WhatsApp anfordern',
      ctaSecondary: 'Zimtblattöl-Kollektion ansehen',
      statCoumarin: '75% - 85%',
      statCoumarinLabel: 'Aktives Eugenol (GC-MS)',
      statMoisture: '100% Rein',
      statMoistureLabel: 'Wasserdampfdestilliert',
      statOrigin: 'SLS 187',
      statOriginLabel: 'ISO 3524:2003 Zertifiziert',
      statFob: 'FOB / CIF',
      statFobLabel: 'Flaschen, Boxen & Exportfässer',
    },
    about: {
      badge: 'PLANTAGENTRADITION & DESTILLATIONSKUNST',
      title: 'Jahrhundertealte Meisterschaft in der Zimtblattdestillation',
      desc1: 'Jade Cinnamon Lanka ist ein B2B-Exporthaus, das sich ausschließlich der Produktion von 100% reinem Ceylon-Zimtblattöl (Cinnamomum verum) widmet, dampfdestilliert aus erntefrischen Blättern unserer Plantagen im Süden Sri Lankas.',
      desc2: 'Im Gegensatz zu synthetischen oder gestreckten Ölen enthält unser Zimtblattöl 75% bis 85% natürliches Eugenol bei sicherem Hautprofil (Cinnamaldehyd 1,0%–4,5%), garantiert ohne chemische Konservierungsmittel oder Mineralöle.',
      heritageTitle: 'Nachhaltige Blatternte',
      heritageDesc: 'Frische grüne Blätter werden nachhaltig geerntet, wodurch der Baumbestand geschont wird.',
      craftTitle: 'Artisanale Wasserdampfdestillation',
      craftDesc: 'Schonende Niedrigtemperatur-Dampfdestillation zur Bewahrung des vollen bioaktiven Profils.',
      globalTitle: 'Laborgeprüfter Export',
      globalDesc: 'Jede Charge wird per GC-MS-Gaschromatographie analysiert und in UV-geschütztem Braunglas geliefert.',
    },
    catalog: {
      badge: 'ZERTIFIZIERTES EXPORTVERZEICHNIS',
      title: 'Reine Ceylon-Zimt Kollektion',
      subtitle: 'Von 15ml–100ml Braunglas-Blattölflaschen über 1kg 100% reines Ceylon-Zimtpulver bis hin zu luxuriösen Geschenkboxen.',
      catAll: 'Alle Produkte',
      catRetail: 'Braunglas-Tropfflaschen (15ml - 100ml)',
      catPowders: 'Reines Ceylon-Zimtpulver & Gewürze',
      catGiftSets: 'Luxuriöse Geschenkboxen',
      catBulk: 'Kommerzieller & Industrieller Großexport',
      catQuills: 'Braunglas-Tropfflaschen (4)',
      catOils: 'Reines Ceylon-Blattöl',
      catSpices: 'Zertifizierter Ceylon-Zimt',
      originBadge: '100% Reines Ceylon-Blattöl',
      lowCoumarinBadge: 'Hoher Eugenolgehalt (75%–85%)',
      viewSpecs: 'GC-MS Labor- & Produktdaten',
      orderNow: 'WhatsApp Anfrage',
      specsTitle: 'Wissenschaftliche & Verpackungsspezifikationen',
      diameter: 'Netto-Volumen / Flaschengröße',
      moisture: 'Reinheit / Zusätze',
      coumarin: 'Cumaringehalt',
      volatileOil: 'Brechungsindex (20°C)',
      cinnamaldehyde: 'Cinnamaldehyd-Gehalt',
      eugenol: 'Natürliches Eugenol (GC-MS)',
      density: 'Spezifisches Gewicht (20°C)',
      standard: 'SLS 187 / ISO 3524 Standard',
      packaging: 'Verpackungsformat',
      close: 'Schließen',
    },
    gallery: {
      badge: 'PLANTAGEN- & DESTILLATIONSARCHIV',
      title: 'Von Ceylon-Plantagen zu den Häfen der Welt',
      subtitle: 'Verfolgen Sie die Reise des reinen Zimtblattöls von der Blatternte bis zur Laborprüfung und Ausfuhr.',
      item1Title: 'Ceylon Bergland-Plantagen',
      item1Desc: 'Nachhaltig bewirtschaftete Zimtgärten in Galle, Matara und Ratnapura.',
      item2Title: 'Ernte frischer grüner Blätter',
      item2Desc: 'Sorgfältige Handsortierung für maximale Aromen- und Wirkstoffausbeute.',
      item3Title: 'Traditionelle Wasserdampfdestillation',
      item3Desc: 'Reine hydrothermische Extraktion ohne jegliche chemische Lösungsmittel.',
      item4Title: 'GC-MS Laboranalyse',
      item4Desc: 'Gaschromatographische Prüfung des Eugenolgehalts (75%–85%).',
      item5Title: 'Braunglas-Abfüllung mit Pipette',
      item5Desc: 'Lichtgeschützte UV-Braunglasflaschen mit Originalitätsverschluss.',
      item6Title: 'Container- & Luftfrachtexport',
      item6Desc: 'Direktabfertigung ab Hafen Colombo mit COA und Pflanzengesundheitszeugnis.',
    },
    rfq: {
      badge: 'B2B-PREISKALKULATOR',
      title: 'Echtzeit-WhatsApp-Anfrage generieren',
      subtitle: 'Wählen Sie Flaschengröße und Menge. Unser Handelsteam in Colombo antwortet innerhalb von 15 Minuten mit aktuellen FOB- oder CIF-Raten.',
      labelGrade: 'Flaschengröße / Format wählen',
      labelQty: 'Menge',
      labelUnit: 'Einheit',
      labelIncoterm: 'Incoterm',
      labelDestination: 'Bestimmungshafen / Land',
      labelNotes: 'Spezielle Anforderungen (Optional)',
      placeholderNotes: 'z.B. 500 Einheiten 100ml Braunglas, Private Labeling, Chargen-GC-MS oder 25kg Kanister.',
      placeholderDestination: 'z.B. Hamburg, Rotterdam, Bremen, Wien',
      previewTitle: 'WhatsApp Nachrichtenvorschau',
      previewDesc: 'Diese strukturierte Anfrage wird direkt an unser Handelsteam gesendet.',
      btnSendWhatsApp: 'Angebot über WhatsApp anfordern',
      btnCopyMessage: 'Text kopieren',
      copied: 'In die Zwischenablage kopiert!',
      disclaimer: 'Direkte Verbindung zum Trade Desk von Jade Cinnamon Lanka (+94 76 533 5308).',
    },
    quality: {
      badge: 'WISSENSCHAFTLICHE REINHEIT & QUALITÄTSSÄULEN',
      title: 'Reines Ceylon-Zimtblattöl vs. Synthetische Fälschungen',
      subtitle: 'Warum echtes Cinnamomum verum Blattöl die erstklassige Wahl für Aromatherapie, Kosmetik und Pharmazeutik ist.',
      trueCeylonTitle: 'Reines Ceylon-Blattöl (C. Verum)',
      cassiaTitle: 'Synthetisches / Gestrecktes Öl',
      coumarinMetric: 'Natürliches Eugenol (GC-MS)',
      coumarinCeylon: '75,0% - 85,0% (Natürliches bioaktives Antioxidans)',
      coumarinCassia: 'Synthetisches Eugenol / < 60% (Fehlende Synergieeffekte)',
      textureMetric: 'Cinnamaldehyd & Hautverträglichkeit',
      textureCeylon: '1,0% - 4,5% (Sicher für Aromatherapie & verdünnte Anwendung)',
      textureCassia: 'Hohe Reizstoffgehalte & Lösungsmittel (Hautreizungsgefahr)',
      healthMetric: 'Standards & Reinheit',
      healthCeylon: 'SLS 187 & ISO 3524:2003 zertifiziert • 0% Konservierungsstoffe',
      healthCassia: 'Gestreckt mit Mineralölen & künstlichen Stabilisatoren',
      cert1: 'SLS 187 & ISO 3524',
      cert1Desc: 'Vollständige Konformität mit nationalen und globalen Blattölstandards.',
      cert2: '100% Wasserdampfdestilliert',
      cert2Desc: 'Reine Destillation aus frischem Blattgut ohne chemische Extraktionsmittel.',
      cert3: 'GC-MS Laborzertifiziert',
      cert3Desc: 'Chargenspezifische Gaschromatographie bestätigt 75%–85% Eugenol.',
      cert4: 'Sri Lanka Herkunft & EDB',
      cert4Desc: 'Offiziell registriert beim Sri Lanka Export Development Board.',
    },
    logistics: {
      badge: 'EXPORTINFRASTRUKTUR & VERPACKUNG',
      title: 'Globale Logistik & Verpackungsstandards',
      subtitle: 'Versand ab Hafen Colombo in UV-Braunglasflaschen mit Sicherheitsverschluss oder UN-geprüften Fässern.',
      card1Title: 'Seefracht (FCL & LCL)',
      card1Desc: 'Palettierte Kartons und Fässer unter kontrollierten Bedingungen verladen.',
      card2Title: 'Express-Luftfracht',
      card2Desc: 'Schnellversand per Luftfracht für Flaschen, Geschenkboxen und Eilaufträge.',
      card3Title: 'UV-Braunglas & UN-Fässer',
      card3Desc: '15ml–100ml Braunglasflaschen mit Tropfpipette, Geschenkboxen und 200L-Stahlfässer.',
      card4Title: 'Vollständige Exportdokumente',
      card4Desc: 'Konnossement (B/L), Ursprungszeugnis, Pflanzengesundheitszeugnis und GC-MS COA.',
    },
    footer: {
      desc: 'Jade Cinnamon Lanka ist ein registrierter Exporteur von 100% reinem Ceylon-Zimtblattöl (Cinnamomum verum) unter Aufsicht des Sri Lanka Export Development Board (EDB).',
      quickLinks: 'Navigation',
      contactDesk: 'Internationales Handelsbüro',
      directLine: 'Hotline / WhatsApp:',
      email: 'E-Mail:',
      colomboPort: 'Zentrum: Galle Road, Colombo 03, Sri Lanka',
      legalNote: '100% Echtheitsgarantie für Cinnamomum Verum Blattöl. Staatlich zertifiziert.',
      copyright: '© 2026 Jade Cinnamon Lanka. Alle Rechte vorbehalten.',
    }
  },

  fr: {
    brandTitle: 'Jade Cinnamon Lanka',
    brandTagline: 'Producteur & Exportateur Direct d\'Huile de Feuille de Cannelle de Ceylan 100% Pure',
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      products: 'Produits',
      quality: 'Qualité & GC-MS',
      logistics: 'Export & Emballage',
      gallery: 'Galerie',
      quoteBuilder: 'Devis WhatsApp',
      contact: 'Bureau Commercial',
      quickRfq: 'Demander un devis B2B',
    },
    hero: {
      badge: '100% NATUREL • PROVENANCE DIRECTE DES PLANTATIONS • SRI LANKA',
      titlePart1: 'Exportateur de référence de',
      titleHighlight: 'Huile de Feuille de Cannelle de Ceylan 100% Pure',
      titlePart2: '(Cinnamomum verum)',
      description: 'Huile essentielle pure distillée à la vapeur d\'eau à partir du feuillage frais de cannelle de Ceylan. Teneur élevée en eugénol naturel actif (75%–85%), riche en antioxydants, 0% conservateur. Certifiée SLS 187 & ISO 3524. Disponible en flacons compte-gouttes ambrés de 15ml, 30ml, 50ml, 100ml, coffrets cadeaux de luxe et fûts d\'exportation (1L–200L).',
      ctaPrimary: 'Envoyer le devis via WhatsApp',
      ctaSecondary: 'Découvrir la gamme d\'huiles',
      statCoumarin: '75% - 85%',
      statCoumarinLabel: 'Eugénol Naturel (GC-MS)',
      statMoisture: '100% Pure',
      statMoistureLabel: 'Distillée à la Vapeur',
      statOrigin: 'SLS 187',
      statOriginLabel: 'Certifiée ISO 3524:2003',
      statFob: 'FOB / CIF',
      statFobLabel: 'Flacons, Coffrets & Fûts',
    },
    about: {
      badge: 'PATRIMOINE ET MAÎTRISE DE LA DISTILLATION',
      title: 'Des siècles d\'excellence dans la distillation des feuilles de Ceylan',
      desc1: 'Jade Cinnamon Lanka est une maison de production et d\'exportation B2B dédiée exclusivement à l\'huile de feuille de cannelle de Ceylan 100% pure et naturelle (Cinnamomum verum), hydro-distillée à partir de feuilles fraîches récoltées dans nos plantations du sud du Sri Lanka.',
      desc2: 'Contrairement aux huiles synthétiques ou frelatées, notre huile de feuille de cannelle contient 75% à 85% d\'eugénol naturel avec un profil cutané sûr (cinnamaldéhyde 1,0%–4,5%), garantissant une efficacité antioxydante et purifiante sans aucun additif minéral.',
      heritageTitle: 'Récolte durable des feuilles',
      heritageDesc: 'Élagage respectueux des feuilles vertes préservant la vitalité des arbres Cinnamomum verum.',
      craftTitle: 'Hydro-distillation artisanale',
      craftDesc: 'Distillation lente à la vapeur d\'eau à basse température préservant tous les principes aromatiques.',
      globalTitle: 'Exportation certifiée par GC-MS',
      globalDesc: 'Chaque lot est analysé par chromatographie en phase gazeuse et conditionné en verre ambré protecteur.',
    },
    catalog: {
      badge: 'RÉPERTOIRE D\'EXPORTATION CERTIFIÉ',
      title: 'Collection Pure Cannelle de Ceylan',
      subtitle: 'Des flacons compte-gouttes 15ml–100ml à la poudre de cannelle 100% pure 1kg et coffrets de présentation de luxe.',
      catAll: 'Tous les produits',
      catRetail: 'Flacons compte-gouttes ambrés (15ml - 100ml)',
      catPowders: 'Poudres & Épices de Ceylan',
      catGiftSets: 'Coffrets de présentation de luxe',
      catBulk: 'Exportation commerciale & industrielle en vrac',
      catQuills: 'Flacons compte-gouttes ambrés (4)',
      catOils: 'Huile de feuille de Ceylan',
      catSpices: 'Cannelle de Ceylan certifiée',
      originBadge: 'Huile de feuille 100% Ceylan',
      lowCoumarinBadge: 'Haute teneur en eugénol (75%–85%)',
      viewSpecs: 'Fiche technique & GC-MS',
      orderNow: 'Commander via WhatsApp',
      specsTitle: 'Spécifications Scientifiques et de Conditionnement',
      diameter: 'Volume net / Taille du flacon',
      moisture: 'Pureté / Absence d\'eau',
      coumarin: 'Taux de coumarine',
      volatileOil: 'Indice de réfraction (20°C)',
      cinnamaldehyde: 'Teneur en Cinnamaldéhyde',
      eugenol: 'Eugénol naturel (GC-MS)',
      density: 'Densité relative (20°C)',
      standard: 'Norme SLS 187 / ISO 3524',
      packaging: 'Type de conditionnement',
      close: 'Fermer',
    },
    gallery: {
      badge: 'ARCHIVES PLANTATION ET DISTILLATION',
      title: 'Des Plantations de Ceylan aux Ports Mondiaux',
      subtitle: 'Découvrez le processus d\'élaboration de l\'huile de feuille de cannelle de la récolte à l\'exportation.',
      item1Title: 'Plantations du sud de Ceylan',
      item1Desc: 'Domaines durables situés à Galle, Matara et Ratnapura.',
      item2Title: 'Récolte des feuilles fraîches',
      item2Desc: 'Sélection manuelle des feuilles vertes à maturité aromatique optimale.',
      item3Title: 'Alambics de distillation à la vapeur',
      item3Desc: 'Extraction hydrothermique 100% pure sans aucun solvant chimique.',
      item4Title: 'Analyses de pureté par GC-MS',
      item4Desc: 'Vérification chromatographique garantissant 75% à 85% d\'eugénol.',
      item5Title: 'Conditionnement en flacons ambrés',
      item5Desc: 'Flacons en verre ambré anti-UV avec pipettes compte-gouttes sécurisées.',
      item6Title: 'Expédition maritime et aérienne',
      item6Desc: 'Acheminement direct depuis le port de Colombo avec certificat phytosanitaire et COA.',
    },
    rfq: {
      badge: 'CALCULATEUR DE DEVIS B2B',
      title: 'Générer une demande d\'achat via WhatsApp',
      subtitle: 'Configurez votre commande d\'huile de feuille. Notre bureau d\'exportation à Colombo vous répondra en 15 minutes avec les tarifs FOB ou CIF.',
      labelGrade: 'Sélectionner le format / flacon',
      labelQty: 'Quantité',
      labelUnit: 'Unité de mesure',
      labelIncoterm: 'Incoterm souhaité',
      labelDestination: 'Port de destination / Pays',
      labelNotes: 'Exigences particulières (Optionnel)',
      placeholderNotes: 'ex: 500 unités de 100ml, étiquetage personnalisé, certificat GC-MS ou fûts de 25kg.',
      placeholderDestination: 'ex: Le Havre, Marseille, Anvers, Montréal',
      previewTitle: 'Aperçu du message WhatsApp',
      previewDesc: 'Ce message structuré sera transmis directement à notre responsable commercial.',
      btnSendWhatsApp: 'Envoyer le devis via WhatsApp',
      btnCopyMessage: 'Copier le texte',
      copied: 'Copié dans le presse-papiers !',
      disclaimer: 'Ligne directe avec le bureau commercial de Jade Cinnamon Lanka (+94 76 533 5308).',
    },
    quality: {
      badge: 'PURETÉ SCIENTIFIQUE & PILIERS QUALITÉ',
      title: 'Huile de Feuille de Ceylan Pure vs. Huiles Synthétiques',
      subtitle: 'Pourquoi l\'huile authentique de Cinnamomum verum est la référence incontournable en aromathérapie et cosmétique.',
      trueCeylonTitle: 'Huile de Feuille de Ceylan Pure (C. Verum)',
      cassiaTitle: 'Huile Synthétique / Frelatée',
      coumarinMetric: 'Eugénol Naturel Actif (GC-MS)',
      coumarinCeylon: '75,0% - 85,0% (Puissant antioxydant et purifiant naturel)',
      coumarinCassia: 'Eugénol synthétique / < 60% (Dépourvu d\'actifs synergiques)',
      textureMetric: 'Cinnamaldéhyde et tolérance cutanée',
      textureCeylon: '1,0% - 4,5% (Sûr pour diffusion et application diluée)',
      textureCassia: 'Solvants chimiques irritants (Risque élevé de brûlure cutanée)',
      healthMetric: 'Normes & Conservateurs',
      healthCeylon: 'Certifié SLS 187 & ISO 3524:2003 • 0% Conservateur',
      healthCassia: 'Coupé aux huiles minérales et stabilisants de synthèse',
      cert1: 'SLS 187 & ISO 3524',
      cert1Desc: 'Conformité totale avec les normes nationales et internationales d\'huile de feuille.',
      cert2: '100% Naturel Distillé Vapeur',
      cert2Desc: 'Extraction à la vapeur d\'eau sans aucun solvant d\'extraction chimique.',
      cert3: 'Contrôle GC-MS par lot',
      cert3Desc: 'Analyses chromatographiques garantissant 75% à 85% d\'eugénol avec COA.',
      cert4: 'Origine Sri Lanka & EDB',
      cert4Desc: 'Enregistré auprès du Conseil de Développement des Exportations du Sri Lanka.',
    },
    logistics: {
      badge: 'INFRASTRUCTURE ET EMBALLAGE EXPORT',
      title: 'Logistique Mondiale et Standards de Conditionnement',
      subtitle: 'Expéditions depuis le port de Colombo en verre ambré anti-UV avec bouchon inviolable ou fûts certifiés UN.',
      card1Title: 'Fret Maritime FCL & LCL',
      card1Desc: 'Cartons et fûts palettisés chargés sous contrôle rigoureux au port de Colombo.',
      card2Title: 'Fret Aérien Express',
      card2Desc: 'Expéditions rapides pour flacons compte-gouttes, coffrets cadeaux et commandes urgentes.',
      card3Title: 'Verre Ambré UV & Fûts UN',
      card3Desc: 'Flacons 15ml–100ml avec pipette compte-gouttes, coffrets dorés et fûts en acier 200L.',
      card4Title: 'Documentation Export Complète',
      card4Desc: 'Connaissement (B/L), Certificat d\'Origine, Certificat Phytosanitaire et COA GC-MS.',
    },
    footer: {
      desc: 'Jade Cinnamon Lanka est un exportateur international enregistré d\'huile de feuille de cannelle de Ceylan 100% pure (Cinnamomum verum) sous la supervision de l\'EDB du Sri Lanka.',
      quickLinks: 'Navigation',
      contactDesk: 'Bureau Commercial International',
      directLine: 'Ligne directe / WhatsApp :',
      email: 'Courriel :',
      colomboPort: 'Centre d\'exportation : Galle Road, Colombo 03, Sri Lanka',
      legalNote: 'Garantie d\'authenticité 100% Cinnamomum Verum. Certifié officiel.',
      copyright: '© 2026 Jade Cinnamon Lanka. Tous droits réservés.',
    }
  },

  es: {
    brandTitle: 'Jade Cinnamon Lanka',
    brandTagline: 'Productor y Exportador Directo de Aceite de Hoja de Canela de Ceilán 100% Puro',
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      products: 'Productos',
      quality: 'Calidad & GC-MS',
      logistics: 'Exportación & Empaque',
      gallery: 'Galería',
      quoteBuilder: 'Cotizar WhatsApp',
      contact: 'Mesa Comercial',
      quickRfq: 'Solicitar Cotización B2B',
    },
    hero: {
      badge: '100% NATURAL • ORIGEN DIRECTO DE PLANTACIÓN • SRI LANKA',
      titlePart1: 'Exportador de clase mundial de',
      titleHighlight: 'Aceite de Hoja de Canela de Ceilán 100% Puro',
      titlePart2: '(Cinnamomum verum)',
      description: 'Aceite esencial puro destilado al vapor a partir de hojas verdes frescas de canela de Ceilán. Alto contenido de eugenol natural activo (75%–85%), rico en antioxidantes, 0% conservantes. Certificado SLS 187 e ISO 3524. Disponible en frascos goteros de vidrio ámbar de 15ml, 30ml, 50ml, 100ml, cajas de regalo de lujo y tambores de exportación (1L–200L).',
      ctaPrimary: 'Enviar cotización por WhatsApp',
      ctaSecondary: 'Explorar línea de aceites',
      statCoumarin: '75% - 85%',
      statCoumarinLabel: 'Eugenol Natural (GC-MS)',
      statMoisture: '100% Puro',
      statMoistureLabel: 'Destilado al Vapor',
      statOrigin: 'SLS 187',
      statOriginLabel: 'Certificado ISO 3524:2003',
      statFob: 'FOB / CIF',
      statFobLabel: 'Frascos, Cajas & Tambores',
    },
    about: {
      badge: 'HERENCIA Y MAESTRÍA EN DESTILACIÓN',
      title: 'Siglos de maestría en la destilación de hojas de canela de Ceilán',
      desc1: 'Jade Cinnamon Lanka es una empresa productora y exportadora B2B dedicada exclusivamente al aceite de hoja de canela de Ceilán 100% puro y natural (Cinnamomum verum), hidrodestilado a partir de hojas frescas cosechadas en nuestras plantaciones del sur de Sri Lanka.',
      desc2: 'A diferencia de los aceites sintéticos o adulterados, nuestro aceite de hoja contiene entre 75% y 85% de eugenol natural con un perfil tópico seguro (cinamaldehído 1.0%–4.5%), garantizando máxima potencia antioxidante sin conservantes químicos ni aceites minerales.',
      heritageTitle: 'Cosecha Sostenible de Hojas',
      heritageDesc: 'Poda ecológica de hojas verdes frescas preservando la vitalidad de las plantaciones de Cinnamomum verum.',
      craftTitle: 'Hidrodestilación Artesanal al Vapor',
      craftDesc: 'Destilación suave a baja temperatura que preserva el perfil aromático y terapéutico integral.',
      globalTitle: 'Exportación Certificada por GC-MS',
      globalDesc: 'Cada lote se analiza por cromatografía de gases (GC-MS) y se envasa en frascos de vidrio ámbar con protección UV.',
    },
    catalog: {
      badge: 'DIRECTORIO DE EXPORTACIÓN CERTIFICADO',
      title: 'Colección de Canela de Ceilán Pura',
      subtitle: 'Desde frascos goteros de 15ml–100ml hasta polvo de canela de Ceilán 100% natural de 1kg y cajas de regalo de lujo.',
      catAll: 'Todos los Productos',
      catRetail: 'Frascos Goteros de Vidrio Ámbar (15ml - 100ml)',
      catPowders: 'Polvos y Especias de Ceilán',
      catGiftSets: 'Cajas de Regalo de Lujo',
      catBulk: 'Exportación Comercial e Industrial a Granel',
      catQuills: 'Frascos Goteros de Vidrio Ámbar (4)',
      catOils: 'Aceite de Hoja de Ceilán',
      catSpices: 'Canela de Ceilán Certificada',
      originBadge: 'Aceite de Hoja 100% Ceilán',
      lowCoumarinBadge: 'Alto Eugenol (75%–85%)',
      viewSpecs: 'Ficha Técnica y GC-MS',
      orderNow: 'Pedir por WhatsApp',
      specsTitle: 'Especificaciones Científicas y de Empaque Oficial',
      diameter: 'Volumen Neto / Tamaño de Frasco',
      moisture: 'Pureza / Libre de Aditivos',
      coumarin: 'Nivel de Cumarina',
      volatileOil: 'Índice de Refracción (20°C)',
      cinnamaldehyde: 'Contenido de Cinamaldehído',
      eugenol: 'Eugenol Natural (GC-MS)',
      density: 'Gravedad Específica (20°C)',
      standard: 'Norma SLS 187 / ISO 3524',
      packaging: 'Formato de Empaque',
      close: 'Cerrar',
    },
    gallery: {
      badge: 'GALERÍA DE PLANTACIONES Y DESTILACIÓN',
      title: 'De las Plantaciones de Ceilán a los Puertos Globales',
      subtitle: 'Observe el proceso integral del aceite de hoja de canela desde la cosecha fresca hasta la destilación al vapor y el despacho marítimo.',
      item1Title: 'Plantaciones del Sur de Ceilán',
      item1Desc: 'Fincas sostenibles en Galle, Matara y Ratnapura.',
      item2Title: 'Cosecha de Hojas Verdes Frescas',
      item2Desc: 'Selección manual de hojas en su punto óptimo de concentración aromática.',
      item3Title: 'Alambiques de Destilación al Vapor',
      item3Desc: 'Extracción hidrotérmica 100% pura sin disolventes químicos.',
      item4Title: 'Análisis de Pureza por GC-MS',
      item4Desc: 'Pruebas cromatográficas que garantizan 75%–85% de eugenol activo.',
      item5Title: 'Envasado en Frascos Ámbar',
      item5Desc: 'Botellas de vidrio ámbar oscuro con goteros de precisión y sello de seguridad.',
      item6Title: 'Carga de Contenedores y Carga Aérea',
      item6Desc: 'Despacho directo en el Puerto de Colombo con certificado fitosanitario y COA.',
    },
    rfq: {
      badge: 'COTIZADOR B2B EN VIVO',
      title: 'Generar Consulta de Compra por WhatsApp',
      subtitle: 'Configure su orden comercial de aceite de hoja. Nuestro equipo en Colombo responderá en 15 minutos con cotizaciones actualizadas FOB o CIF.',
      labelGrade: 'Seleccionar Frasco / Formato',
      labelQty: 'Cantidad',
      labelUnit: 'Unidad de Medida',
      labelIncoterm: 'Incoterm Preferido',
      labelDestination: 'Puerto de Destino / País',
      labelNotes: 'Requisitos Especiales (Opcional)',
      placeholderNotes: 'ej: 500 unidades de frascos de 100ml, marca privada, certificado GC-MS o tambores de 25kg.',
      placeholderDestination: 'ej: Valencia, Barcelona, Callao, Veracruz, Manzanillo, Santos',
      previewTitle: 'Vista Previa del Mensaje de WhatsApp',
      previewDesc: 'Este mensaje se enviará directamente a nuestro equipo de exportación.',
      btnSendWhatsApp: 'Enviar cotización por WhatsApp',
      btnCopyMessage: 'Copiar Mensaje',
      copied: '¡Copiado al Portapapeles!',
      disclaimer: 'Conexión directa con la mesa comercial de Jade Cinnamon Lanka (+94 76 533 5308).',
    },
    quality: {
      badge: 'PUREZA CIENTÍFICA Y PILARES DE CALIDAD',
      title: 'Aceite de Hoja de Ceilán Puro vs. Aceites Sintéticos',
      subtitle: 'Conozca las características bioquímicas que hacen del aceite de Cinnamomum verum la opción superior para aromaterapia, cosmética y bienestar.',
      trueCeylonTitle: 'Aceite de Hoja de Ceilán Puro (C. Verum)',
      cassiaTitle: 'Aceite Sintético / Adulterado',
      coumarinMetric: 'Eugenol Natural Activo (GC-MS)',
      coumarinCeylon: '75.0% - 85.0% (Potente antioxidante y antiséptico natural)',
      coumarinCassia: 'Eugenol sintético / < 60% (Sin sinergia botánica natural)',
      textureMetric: 'Cinamaldehído y Seguridad Tópica',
      textureCeylon: '1.0% - 4.5% (Seguro para difusión y uso tópico diluido)',
      textureCassia: 'Solventes químicos irritantes (Alto riesgo de irritación dérmica)',
      healthMetric: 'Normativas Sanitarias y Pureza',
      healthCeylon: 'Certificado SLS 187 e ISO 3524:2003 • 0% Conservantes',
      healthCassia: 'Adulterado con aceites minerales e ingredientes sintéticos',
      cert1: 'SLS 187 & ISO 3524',
      cert1Desc: 'Cumplimiento con estándares nacionales e internacionales de aceite de hoja.',
      cert2: '100% Destilado al Vapor',
      cert2Desc: 'Extracción por vapor de agua sin disolventes químicos.',
      cert3: 'Pruebas GC-MS por Lote',
      cert3Desc: 'Certificado de análisis cromatográfico que garantiza 75%–85% de eugenol.',
      cert4: 'Origen Sri Lanka & EDB',
      cert4Desc: 'Exportador registrado ante la Junta de Desarrollo de Exportaciones de Sri Lanka.',
    },
    logistics: {
      badge: 'INFRAESTRUCTURA DE EXPORTACIÓN Y EMPAQUE',
      title: 'Logística Global y Estándares de Empaque',
      subtitle: 'Envíos desde el Puerto de Colombo en botellas de vidrio ámbar con protección UV y tambores certificados UN.',
      card1Title: 'Flete Marítimo (FCL y LCL)',
      card1Desc: 'Cajas y tambores paletizados cargados bajo estrictos controles en el Puerto de Colombo.',
      card2Title: 'Carga Aérea Express',
      card2Desc: 'Transporte aéreo ágil para frascos goteros, cajas de regalo y pedidos urgentes.',
      card3Title: 'Vidrio Ámbar UV & Tambores UN',
      card3Desc: 'Frascos de 15ml–100ml con gotero de precisión, cajas de regalo doradas y tambores de 200L.',
      card4Title: 'Documentación Completa de Exportación',
      card4Desc: 'Conocimiento de Embarque (B/L), Certificado de Origen, Fitosanitario y reporte GC-MS COA.',
    },
    footer: {
      desc: 'Jade Cinnamon Lanka es un exportador internacional registrado de aceite de hoja de canela de Ceilán 100% puro (Cinnamomum verum) bajo supervisión de la Junta de Desarrollo de Exportaciones de Sri Lanka (EDB).',
      quickLinks: 'Navegación',
      contactDesk: 'Mesa de Exportación',
      directLine: 'Línea Directa / WhatsApp:',
      email: 'Correo Comercial:',
      colomboPort: 'Centro de Exportación: Galle Road, Colombo 03, Sri Lanka',
      legalNote: 'Garantía de autenticidad 100% Cinnamomum Verum. Certificado oficial.',
      copyright: '© 2026 Jade Cinnamon Lanka. Todos los derechos reservados.',
    }
  }
};
