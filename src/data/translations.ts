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
    catQuills: string;
    catPowders: string;
    catOils: string;
    catSpices: string;
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
    brandTagline: '100% Pure Ceylon Cinnamon & Allied Spices Direct Exporter',
    nav: {
      home: 'Home',
      about: 'About Us',
      products: 'Products',
      quality: 'Quality & Lab',
      logistics: 'Export & Logistics',
      gallery: 'Gallery',
      quoteBuilder: 'WhatsApp RFQ',
      contact: 'Trade Desk',
      quickRfq: 'Request B2B Quote',
    },
    hero: {
      badge: 'DIRECT ESTATE PROVENANCE • SRI LANKA ORIGIN',
      titlePart1: 'World-Class B2B Exporter of',
      titleHighlight: '100% Pure Ceylon Cinnamon',
      titlePart2: 'and Pure Spices',
      description: 'Handcrafted Alba, C5 Special quills, pure essential oils, and organic spices. Certified ultra-low coumarin (<0.004%), compliant with EU & US FDA food safety regulations. Direct FOB Colombo & CIF worldwide.',
      ctaPrimary: 'Build Instant WhatsApp RFQ',
      ctaSecondary: 'Explore 17 Certified Grades',
      statCoumarin: '< 0.004%',
      statCoumarinLabel: 'Coumarin Safety Index',
      statMoisture: '< 12%',
      statMoistureLabel: 'Strict Moisture Control',
      statOrigin: '100% C. Verum',
      statOriginLabel: 'Botanical Purity Guaranteed',
      statFob: 'FOB / CIF',
      statFobLabel: 'Sea & Air Port of Colombo',
    },
    about: {
      badge: 'ESTATE HERITAGE & AUTHORITY',
      title: 'Centuries of True Cinnamon Mastery',
      desc1: 'Jade Cinnamon Lanka is an international B2B export house dedicated exclusively to authentic Ceylon Cinnamon (Cinnamomum zeylanicum / verum) and indigenous island spices harvested from our southern and central plantations.',
      desc2: 'Unlike toxic Cassia substitutes, Ceylon Cinnamon contains harmless trace amounts of coumarin, a delicate sweet flavor profile, and soft multi-layered golden quills hand-peeled by master craftsmen.',
      heritageTitle: 'Generational Craftsmanship',
      heritageDesc: 'Every single quill is rolled by hand using century-old techniques passed down through generations of Sri Lankan peeling artisans.',
      craftTitle: 'Modern Lab Precision',
      craftDesc: 'State-of-the-art moisture monitoring, metal detection, GC-MS testing for essential oils, and ISO-certified hygienic packaging facilities.',
      globalTitle: 'Dependable Global Supply',
      globalDesc: 'Seamless logistics handling FCL and LCL shipments from the Port of Colombo to Europe, North America, Middle East, and Asia-Pacific.',
    },
    catalog: {
      badge: 'EXPORT GRADE DIRECTORY',
      title: 'Certified Ceylon Cinnamon & Spices Catalog',
      subtitle: 'From delicate pencil-thin Alba to high-density black peppercorns and steam-distilled bark oils, explore our complete commercial inventory.',
      catAll: 'All Products (17)',
      catQuills: 'Ceylon Cinnamon Quills (8)',
      catPowders: 'Cuts & Powders (3)',
      catOils: 'Essential Oils (2)',
      catSpices: 'Allied Ceylon Spices (4)',
      originBadge: 'Premium Ceylon Origin',
      lowCoumarinBadge: 'Low Coumarin (<0.004%)',
      viewSpecs: 'Lab Specs & Grade Data',
      orderNow: 'Direct WhatsApp RFQ',
      specsTitle: 'Official Technical Specifications',
      diameter: 'Diameter / Size',
      moisture: 'Moisture Content',
      coumarin: 'Coumarin Level',
      volatileOil: 'Volatile Essential Oil',
      cinnamaldehyde: 'Cinnamaldehyde (GC-MS)',
      eugenol: 'Eugenol (GC-MS)',
      density: 'Bulk Density',
      standard: 'SLS / ISO Standard',
      packaging: 'Standard Packaging',
      close: 'Close Window',
    },
    gallery: {
      badge: 'ESTATE & PROCESSING ARCHIVE',
      title: 'From Ceylon Plantations to Global Sea Ports',
      subtitle: 'Witness our authentic heritage from lush southern hills to master peeling, solar drying kilns, and container freight operations.',
      item1Title: 'Lush Ceylon Hill Plantations',
      item1Desc: 'Sustainably farmed Ceylon Cinnamon estates in the central-southern highlands.',
      item2Title: 'Artisan Hand Peeling & Rolling',
      item2Desc: 'Generational master peelers crafting multi-layered delicate Alba & C5 quills.',
      item3Title: 'Controlled Sun & Kiln Drying',
      item3Desc: 'Hygienic solar tunnel drying maintaining precise moisture content below 12%.',
      item4Title: 'Micro-Grading & Inspection',
      item4Desc: 'Hand sorted and micrometer inspected to guarantee true diameter specifications.',
      item5Title: 'Steam Distillation Laboratory',
      item5Desc: 'Pure botanical extraction of high cinnamaldehyde bark oil and eugenol leaf oil.',
      item6Title: 'Container Vacuum Loading',
      item6Desc: 'Hermetic nitrogen packaging and container dispatch directly at Port of Colombo.',
    },
    rfq: {
      badge: 'INSTANT B2B QUOTATION ENGINE',
      title: 'Generate Live WhatsApp Purchase Inquiry',
      subtitle: 'Configure your commercial order parameters below. Our Trade Desk in Colombo responds within 15 minutes with current FOB Colombo or CIF container spot rates.',
      labelGrade: 'Select Product / Grade',
      labelQty: 'Quantity',
      labelUnit: 'Measurement Unit',
      labelIncoterm: 'Preferred Incoterm',
      labelDestination: 'Destination Port / Country',
      labelNotes: 'Custom Packaging or Lab Requirements (Optional)',
      placeholderNotes: 'e.g. Need 25kg vacuum packaging, private labeling, certificate of analysis (COA), or organic certificate.',
      placeholderDestination: 'e.g. Hamburg (Germany), Port of Los Angeles (USA), Jebel Ali (Dubai)',
      previewTitle: 'Real-Time WhatsApp Message Preview',
      previewDesc: 'This formatted inquiry will be sent directly to our Colombo trade desk.',
      btnSendWhatsApp: 'Send Order via WhatsApp Trade Desk',
      btnCopyMessage: 'Copy Formatted Text',
      copied: 'Copied to Clipboard!',
      disclaimer: 'Direct connection to Jade Cinnamon Lanka Official Trade Desk (+94 77 123 4567). Instant formal response with CIF/FOB proforma invoice.',
    },
    quality: {
      badge: 'SCIENTIFIC PURITY & SAFETY',
      title: 'True Ceylon Cinnamon vs. Cassia Adulteration',
      subtitle: 'Know the crucial health and chemical distinctions that make Ceylon Cinnamon the only safe choice for food, pharmaceutical, and daily consumption.',
      trueCeylonTitle: 'Pure Ceylon Cinnamon (C. Verum)',
      cassiaTitle: 'Common Cassia (C. Cassia / Burmannii)',
      coumarinMetric: 'Coumarin Content',
      coumarinCeylon: '< 0.004% (Safe for regular daily intake)',
      coumarinCassia: 'Up to 1.0% (Toxic liver & kidney hazard)',
      textureMetric: 'Quill Structure',
      textureCeylon: 'Soft, multi-layered paper-thin rings',
      textureCassia: 'Single hard, thick hollow tree bark',
      healthMetric: 'Global Food Safety',
      healthCeylon: 'Fully compliant with EU EFSA & US FDA regulations',
      healthCassia: 'Restricted in food manufacturing across EU & parts of Asia',
      cert1: 'ISO 6539 & SLS 81',
      cert1Desc: 'Full compliance with national & global standards for pure Ceylon Cinnamon.',
      cert2: 'Phytosanitary Certified',
      cert2Desc: 'Government inspection certificates with every commercial container export.',
      cert3: 'GC-MS Purity Tested',
      cert3Desc: 'Gas chromatography testing for pure essential oils and zero adulteration.',
      cert4: 'Non-GMO & Organic Ready',
      cert4Desc: 'Harvested from sustainably managed Sri Lankan family-owned estates.',
    },
    logistics: {
      badge: 'EXPORT READY INFRASTRUCTURE',
      title: 'Global Supply Chain & Container Freight',
      subtitle: 'From Colombo sea hub to global ports with vacuum seal integrity and full export compliance.',
      card1Title: 'FCL & LCL Sea Freight',
      card1Desc: 'Standard 20ft (approx. 7-10 MT) and 40ft High Cube containers loaded under humidity-controlled supervision at Port of Colombo.',
      card2Title: 'Air Cargo Express',
      card2Desc: 'Fast airfreight via Bandaranaike International Airport (CMB) for high-value Alba quills, essential oils, and urgent sample orders.',
      card3Title: 'Hermetic Nitrogen Packing',
      card3Desc: 'Heavy-duty multi-ply vacuum bales, nitrogen-flushed food-grade liner bags, or custom private label packaging.',
      card4Title: 'Complete Export Documentation',
      card4Desc: 'Bill of Lading, Certificate of Origin (GSP Form A), Phytosanitary Certificate, Commercial Invoice, Packing List, and COA provided.',
    },
    footer: {
      desc: 'Jade Cinnamon Lanka is an international registered exporter of authentic Ceylon Cinnamon (Cinnamomum verum) and Ceylon spices, operating under the regulations of the Sri Lanka Export Development Board (EDB).',
      quickLinks: 'Quick Navigation',
      contactDesk: 'International Trade Desk',
      directLine: 'Hotline / WhatsApp:',
      email: 'Export Inquiries:',
      colomboPort: 'Processing & Export Hub: Galle Road, Colombo 03, Sri Lanka',
      legalNote: '100% Authentic Cinnamomum Verum Guarantee. All shipments certified by Sri Lanka Department of Agriculture.',
      copyright: '© 2026 Jade Cinnamon Lanka. All Rights Reserved.',
    }
  },

  si: {
    brandTitle: 'ජේඩ් සිනමන් ලංකා',
    brandTagline: '100% පිරිසිදු ලංකා කුරුඳු සහ කුළුබඩු සෘජු අපනයනකරු',
    nav: {
      home: 'මුල් පිටුව',
      about: 'අප ගැන',
      products: 'නිෂ්පාදන',
      quality: 'ප්‍රමිතිය',
      logistics: 'අපනයන',
      gallery: 'පින්තූර එකතුව',
      quoteBuilder: 'WhatsApp ඇණවුම්',
      contact: 'සම්බන්ධ වන්න',
      quickRfq: 'මිල ගණන් ලබාගන්න',
    },
    hero: {
      badge: 'සෘජු ශ්‍රී ලාංකික උරුමය • සැබෑ ලංකා කුරුඳු',
      titlePart1: 'ලොව උසස්ම B2B අපනයනකරු',
      titleHighlight: '100% පිරිසිදු සැබෑ ලංකා කුරුඳු',
      titlePart2: 'සහ වටිනා කුළුබඩු',
      description: 'අල්බා, සී5 ස්පෙෂල් කුරුඳු, අත්‍යවශ්‍ය තෙල් සහ ස්වභාවික කුළුබඩු. අතිශය අඩු කූමරින් (<0.004%), යුරෝපා සහ ඇමරිකානු ප්‍රමිතීන්ට අනුකූලයි. කොළඹ වරායෙන් ලොව පුරා නැව්ගත කෙරේ.',
      ctaPrimary: 'WhatsApp මගින් මිල ගණන් ලබාගන්න',
      ctaSecondary: 'නිෂ්පාදන 17 නරඹන්න',
      statCoumarin: '< 0.004%',
      statCoumarinLabel: 'සුරක්ෂිත කූමරින් මට්ටම',
      statMoisture: '< 12%',
      statMoistureLabel: 'පාලිත තෙතමනය',
      statOrigin: '100% සැබෑ කුරුඳු',
      statOriginLabel: 'Cinnamomum Verum',
      statFob: 'FOB / CIF',
      statFobLabel: 'කොළඹ වරායෙන් සෘජුවම',
    },
    about: {
      badge: 'අපගේ සුවිශේෂී උරුමය',
      title: 'ශතවර්ෂ ගණනාවක සැබෑ කුරුඳු කලාව',
      desc1: 'ජේඩ් සිනමන් ලංකා යනු අව්‍යාජ ලංකා කුරුඳු (Cinnamomum verum) ලොව පුරා අපනයනය කරන ප්‍රමුඛතම ආයතනයකි.',
      desc2: 'හානිකර කැසියා වෙනුවට, සැබෑ ලංකා කුරුඳු සතුව අතිශය සෞඛ්‍යාරක්ෂිත බව සහ රසවත් සුවඳක් පවතී.',
      heritageTitle: 'පාරම්පරික කුසලතාව',
      heritageDesc: 'පරම්පරාවෙන් පැවත එන ශ්‍රී ලාංකික ශිල්පීන් විසින් සියුම් ලෙස අතින් නිමවන ලද කුරුඳු පොතු.',
      craftTitle: 'නූතන විද්‍යාගාර තාක්ෂණය',
      craftDesc: 'තෙතමනය සහ තෙල් සාන්ද්‍රණය තහවුරු කෙරෙන අති නවීන පරීක්ෂණ ක්‍රමවේද.',
      globalTitle: 'විශ්වසනීය ගෝලීය සැපයුම',
      globalDesc: 'යුරෝපය, ඇමරිකාව සහ මැදපෙරදිග වෙත සෘජු බහාලුම් ප්‍රවාහනය.',
    },
    catalog: {
      badge: 'අපනයන ශ්‍රේණි',
      title: 'සහතික කළ ලංකා කුරුඳු සහ කුළුබඩු',
      subtitle: 'අල්බා සිට පිරිසිදු කුරුඳු කුඩු සහ අත්‍යවශ්‍ය තෙල් දක්වා අපගේ සම්පූර්ණ නිෂ්පාදන පෙළ.',
      catAll: 'සියලු නිෂ්පාදන (17)',
      catQuills: 'කුරුඳු පොතු (8)',
      catPowders: 'කැබලි සහ කුඩු (3)',
      catOils: 'කුරුඳු තෙල් (2)',
      catSpices: 'වෙනත් කුළුබඩු (4)',
      originBadge: 'පිරිසිදු ලංකා සම්භවය',
      lowCoumarinBadge: 'අඩු කූමරින් (<0.004%)',
      viewSpecs: 'විද්‍යාගාර දත්ත',
      orderNow: 'WhatsApp ඇණවුම්',
      specsTitle: 'නිෂ්පාදන පිරිවිතර',
      diameter: 'විෂ්කම්භය',
      moisture: 'තෙතමනය',
      coumarin: 'කූමරින් ප්‍රතිශතය',
      volatileOil: 'අත්‍යවශ්‍ය තෙල්',
      cinnamaldehyde: 'Cinnamaldehyde ප්‍රතිශතය',
      eugenol: 'Eugenol ප්‍රතිශතය',
      density: 'ඝනත්වය',
      standard: 'SLS / ISO ප්‍රමිතිය',
      packaging: 'ඇසුරුම්කරණය',
      close: 'වසන්න',
    },
    gallery: {
      badge: 'ක්ෂේත්‍ර සහ සැකසුම් එකතුව',
      title: 'ලංකා වතුයායේ සිට ගෝලීය වරාය දක්වා',
      subtitle: 'අපගේ උසස් තත්ත්වයේ කුරුඳු අස්වැන්න නෙළීමේ සිට නැව්ගත කිරීම දක්වා ක්‍රියාවලිය.',
      item1Title: 'ශ්‍රී ලංකා කුරුඳු වතුයාය',
      item1Desc: 'මධ්‍යම හා දකුණු කඳුකරයේ ස්වභාවිකව වගා කරන ලද සැබෑ කුරුඳු වතු.',
      item2Title: 'පාරම්පරික අතින් තැලීම හා එතීම',
      item2Desc: 'පරම්පරාගත ශිල්පීන් විසින් සියුම් ලෙස අතින් නිමවන ලද අල්බා සහ සී5 කුරුඳු.',
      item3Title: 'පාලිත සූර්ය තාපයෙන් වේලීම',
      item3Desc: 'තෙතමනය 12% ට අඩුවෙන් පවත්වා ගනිමින් සිදුකරන වියළීමේ ක්‍රියාවලිය.',
      item4Title: 'ශ්‍රේණිගත කිරීම සහ පරීක්ෂාව',
      item4Desc: 'අවශ්‍ය විෂ්කම්භයන් නිවැරදිව පරීක්ෂා කර වෙන් කරනු ලබන කුරුඳු.',
      item5Title: 'වාෂ්ප ආසවන තෙල් නිස්සාරණය',
      item5Desc: 'කුරුඳු පොතු සහ කොළ තෙල් පිරිසිදුව ලබාගැනීමේ ක්‍රියාවලිය.',
      item6Title: 'රික්ත ඇසුරුම් සහ බහාලුම් පැටවීම',
      item6Desc: 'කොළඹ වරාය හරහා ලොව පුරා රටවලට සෘජුවම බහාලුම් ප්‍රවාහනය.',
    },
    rfq: {
      badge: 'ක්ෂණික මිල ගණන් යන්ත්‍රය',
      title: 'සෘජු WhatsApp ඇණවුම් තොරතුරු',
      subtitle: 'ඔබට අවශ්‍ය කුරුඳු වර්ගය සහ ප්‍රමාණය තෝරා අපගේ කොළඹ අපනයන අංශය හා සෘජුව සම්බන්ධ වන්න.',
      labelGrade: 'නිෂ්පාදනය / ශ්‍රේණිය තෝරන්න',
      labelQty: 'ප්‍රමාණය',
      labelUnit: 'මිනුම් ඒකකය',
      labelIncoterm: 'Incoterm වර්ගය',
      labelDestination: 'ගමනාන්ත වරාය / රට',
      labelNotes: 'විශේෂ අවශ්‍යතා (විකල්ප)',
      placeholderNotes: 'උදා: රික්ත ඇසුරුම් (Vacuum Pack) හෝ විශේෂ සහතික.',
      placeholderDestination: 'උදා: Hamburg, Los Angeles, Dubai',
      previewTitle: 'WhatsApp පණිවිඩ පෙරදසුන',
      previewDesc: 'මෙම පණිවිඩය සෘජුවම අපගේ නිලධාරියා වෙත යවනු ලැබේ.',
      btnSendWhatsApp: 'WhatsApp මගින් යවන්න',
      btnCopyMessage: 'පිටපත් කරගන්න',
      copied: 'පිටපත් විය!',
      disclaimer: 'ජේඩ් සිනමන් ලංකා නිල අපනයන අංශය (+94 77 123 4567).',
    },
    quality: {
      badge: 'විද්‍යාත්මක පරීක්ෂණ',
      title: 'සැබෑ ලංකා කුරුඳු සහ කැසියා අතර වෙනස',
      subtitle: 'සෞඛ්‍යයට හිතකර සැබෑ කුරුඳු තෝරාගැනීමේ වැදගත්කම.',
      trueCeylonTitle: 'සැබෑ ලංකා කුරුඳු (C. Verum)',
      cassiaTitle: 'කැසියා කුරුඳු (Cassia)',
      coumarinMetric: 'කූමරින් ප්‍රතිශතය',
      coumarinCeylon: '< 0.004% (නිරෝගී භාවිතයට සුදුසුයි)',
      coumarinCassia: '1.0% දක්වා (අක්මාවට හානිකරයි)',
      textureMetric: 'ස්වභාවය',
      textureCeylon: 'සිහින්, ස්ථර රැසකින් යුත් මෘදු පොතු',
      textureCassia: 'තනි ඝන දැවමය පොත්තක්',
      healthMetric: 'ආහාර ආරක්ෂණ අනුමැතිය',
      healthCeylon: 'EU සහ US FDA නියාමනයන්ට පූර්ණ අනුකූලයි',
      healthCassia: 'බොහෝ රටවල ආහාර භාවිතයට සීමා පනවා ඇත',
      cert1: 'ISO 6539 & SLS 81',
      cert1Desc: 'ශ්‍රී ලංකා ප්‍රමිති සහ ජාත්‍යන්තර ප්‍රමිතීන්.',
      cert2: 'ශාක සනීපාරක්ෂක සහතිකය',
      cert2Desc: 'රජයේ කෘෂිකර්ම දෙපාර්තමේන්තුවේ අධීක්ෂණය.',
      cert3: 'GC-MS පරීක්ෂණ',
      cert3Desc: 'තෙල්වල පාරිශුද්ධත්වය තහවුරු කළ වාර්තා.',
      cert4: 'ස්වභාවික සහ කාබනික',
      cert4Desc: 'තිරසාර ගොවිබිම්වලින් ලබාගත් අස්වැන්න.',
    },
    logistics: {
      badge: 'නැව්ගත කිරීමේ හැකියාව',
      title: 'ගෝලීය බහාලුම් සහ ගුවන් ප්‍රවාහනය',
      subtitle: 'කොළඹ වරායේ සිට ලොව පුරා රටවලට කඩිනමින් ආරක්ෂිතව ලබාදීම.',
      card1Title: 'නැව් මගින් ප්‍රවාහනය (FCL / LCL)',
      card1Desc: 'අඩි 20 සහ 40 බහාලුම් මගින් තෙතමනය පාලනය කර නැව්ගත කිරීම.',
      card2Title: 'ගුවන් මගින් ප්‍රවාහනය (Air Cargo)',
      card2Desc: 'අල්බා කුරුඳු සහ තෙල් සඳහා කඩිනම් ගුවන් සේවාව.',
      card3Title: 'විශේෂ ආරක්ෂිත ඇසුරුම්',
      card3Desc: 'රික්ත ඇසුරුම් සහ නයිට්‍රජන් සහිත ප්‍රමිතියෙන් උසස් බෑග්.',
      card4Title: 'අපනයන ලියකියවිලි',
      card4Desc: 'Bill of Lading, Certificate of Origin, Phytosanitary Certificate ඇතුළු සියලු ලිපිලේඛන.',
    },
    footer: {
      desc: 'ජේඩ් සිනමන් ලංකා යනු ශ්‍රී ලංකා අපනයන සංවර්ධන මණ්ඩලයේ (EDB) ලියාපදිංචි නිල අපනයන ආයතනයකි.',
      quickLinks: 'පිටු සබැඳි',
      contactDesk: 'අපනයන අංශය',
      directLine: 'දුරකථන / WhatsApp:',
      email: 'විද්‍යුත් තැපෑල:',
      colomboPort: 'මධ්‍යස්ථානය: ගාලු පාර, කොළඹ 03, ශ්‍රී ලංකාව',
      legalNote: '100% අව්‍යාජ ශ්‍රී ලාංකික නිෂ්පාදනයක් බවට සහතික කෙරේ.',
      copyright: '© 2026 ජේඩ් සිනමන් ලංකා. සියලු හිමිකම් ඇවිරිණි.',
    }
  },

  ta: {
    brandTitle: 'ஜேட் இலவங்கப்பட்டை லங்கா',
    brandTagline: '100% தூய சிலோன் இலவங்கப்பட்டை மற்றும் மசாலாப் பொருட்கள் நேரடி ஏற்றுமதியாளர்',
    nav: {
      home: 'முகப்பு',
      about: 'எங்களை பற்றி',
      products: 'தயாரிப்புகள்',
      quality: 'தரம் & ஆய்வு',
      logistics: 'ஏற்றுமதி',
      gallery: 'படத்தொகுப்பு',
      quoteBuilder: 'WhatsApp RFQ',
      contact: 'தொடர்புகளுக்கு',
      quickRfq: 'விலை கேட்க',
    },
    hero: {
      badge: 'நேரடி இலங்கை தோட்டம் • தூய சிலோன் இலவங்கப்பட்டை',
      titlePart1: 'உலகத்தரம் வாய்ந்த B2B ஏற்றுமதியாளர்',
      titleHighlight: '100% தூய சிலோன் இலவங்கப்பட்டை',
      titlePart2: 'மற்றும் வாசனைப் பொருட்கள்',
      description: 'அல்பா, சி5 ஸ்பெஷல் பட்டை, அத்தியாவசிய எண்ணெய்கள். குறைந்த கூமரின் (<0.004%), சர்வதேச உணவு பாதுகாப்பு தரம். கொழும்பு துறைமுகத்திலிருந்து உலகம் முழுவதும்.',
      ctaPrimary: 'WhatsApp இல் விலை கேட்க',
      ctaSecondary: '17 தரங்களை காண்க',
      statCoumarin: '< 0.004%',
      statCoumarinLabel: 'கூமரின் பாதுகாப்பு குறியீடு',
      statMoisture: '< 12%',
      statMoistureLabel: 'ஈரப்பத கட்டுப்பாடு',
      statOrigin: '100% C. Verum',
      statOriginLabel: 'தூய மூலிகைத் தரம்',
      statFob: 'FOB / CIF',
      statFobLabel: 'கொழும்பு துறைமுகம் வழியாக',
    },
    about: {
      badge: 'தோட்ட பாரம்பரியம்',
      title: 'நூற்றாண்டு பாரம்பரிய கைவினைத்திறன்',
      desc1: 'ஜேட் இலவங்கப்பட்டை லங்கா என்பது உண்மையான சிலோன் இலவங்கப்பட்டையை சர்வதேச சந்தைகளுக்கு ஏற்றுமதி செய்யும் முன்னணி நிறுவனமாகும்.',
      desc2: 'காசியா போலல்லாமல், உண்மையான சிலோன் இலவங்கப்பட்டை உடலுக்கு ஆரோக்கியமானதும் மிகக் குறைந்த கூமரினைக் கொண்டதும் ஆகும்.',
      heritageTitle: 'கைவினைத்திறன்',
      heritageDesc: 'தலைமுறை தலைமுறையாக வந்த இலங்கை கலைஞர்களால் கையால் சுருட்டப்பட்டது.',
      craftTitle: 'நவீன ஆய்வக துல்லியம்',
      craftDesc: 'ஈரப்பதம் மற்றும் அத்தியாவசிய எண்ணெய்களின் தரத்தை உறுதிசெய்யும் ஆய்வக சோதனைகள்.',
      globalTitle: 'உலகளாவிய விநியோகம்',
      globalDesc: 'ஐரோப்பா, அமெரிக்கா மற்றும் மத்திய கிழக்கு நாடுகளுக்கு தொடர்ச்சியான ஏற்றுமதி.',
    },
    catalog: {
      badge: 'ஏற்றுமதி தரங்கள்',
      title: 'சான்றளிக்கப்பட்ட சிலோன் இலவங்கப்பட்டை & மசாலாக்கள்',
      subtitle: 'அல்பா முதல் தூய பொடி மற்றும் அத்தியாவசிய எண்ணெய்கள் வரை எங்கள் முழுமையான தயாரிப்புகள்.',
      catAll: 'அனைத்து பொருட்கள் (17)',
      catQuills: 'பட்டைகள் (8)',
      catPowders: 'தூள் & துண்டுகள் (3)',
      catOils: 'எண்ணெய்கள் (2)',
      catSpices: 'இதர மசாலாக்கள் (4)',
      originBadge: 'தூய சிலோன் தோற்றம்',
      lowCoumarinBadge: 'குறைந்த கூமரின் (<0.004%)',
      viewSpecs: 'ஆய்வக விவரங்கள்',
      orderNow: 'WhatsApp ஆணை',
      specsTitle: 'தொழில்நுட்ப விவரக்குறிப்புகள்',
      diameter: 'விட்டம்',
      moisture: 'ஈரப்பதம்',
      coumarin: 'கூமரின் அளவு',
      volatileOil: 'எண்ணெய் செறிவு',
      cinnamaldehyde: 'சின்னமால்டிஹைட்',
      eugenol: 'யூஜெனோல்',
      density: 'அடர்த்தி',
      standard: 'SLS / ISO தரம்',
      packaging: 'பேக்கேஜிங்',
      close: 'மூடு',
    },
    gallery: {
      badge: 'தோட்ட மற்றும் பதப்படுத்தும் புகைப்படங்கள்',
      title: 'இலங்கை தோட்டங்களிலிருந்து உலகளாவிய துறைமுகங்களுக்கு',
      subtitle: 'எங்கள் உயர்தர பட்டைகளை அறுவடை செய்வது முதல் கொள்கலன் ஏற்றுமதி வரை.',
      item1Title: 'இலங்கை மலைத்தோட்டங்கள்',
      item1Desc: 'இயற்கையான முறையில் பராமரிக்கப்படும் உயர்தர இலவங்கப்பட்டை தோட்டங்கள்.',
      item2Title: 'பாரம்பரிய கை உருட்டல்',
      item2Desc: 'அல்பா மற்றும் சி5 தரங்களுக்கான கைவினைஞர்களின் நுட்பமான பணி.',
      item3Title: 'சூரிய வெப்பத்தில் உலர்த்துதல்',
      item3Desc: 'ஈரப்பதம் 12% க்குள் இருப்பதை உறுதிசெய்யும் நவீன உலர் கூடங்கள்.',
      item4Title: 'தரம் பிரித்தல் மற்றும் ஆய்வு',
      item4Desc: 'துல்லியமான விட்ட அளவுகளின்படி தரம் பிரிக்கப்படும் பட்டைகள்.',
      item5Title: 'நீராவி வடித்தல் ஆய்வகம்',
      item5Desc: 'அத்தியாவசிய பட்டை மற்றும் இலை எண்ணெய்களின் தூய தயாரிப்பு.',
      item6Title: 'கொள்கலன் ஏற்றுமதி',
      item6Desc: 'கொழும்பு துறைமுகத்திலிருந்து உலக நாடுகளுக்கு நேரடி கப்பல் ஏற்றுமதி.',
    },
    rfq: {
      badge: 'உடனடி B2B மேற்கோள்',
      title: 'நேரடி WhatsApp விசாரணை',
      subtitle: 'உங்கள் தேவைகளைத் தேர்ந்தெடுத்து கொழும்பு ஏற்றுமதிப் பிரிவோடு உடனடியாகத் தொடர்பு கொள்ளுங்கள்.',
      labelGrade: 'தயாரிப்பு / தரத்தைத் தேர்ந்தெடுக்கவும்',
      labelQty: 'அளவு',
      labelUnit: 'அலகு',
      labelIncoterm: 'Incoterm முறை',
      labelDestination: 'இலக்கு துறைமுகம் / நாடு',
      labelNotes: 'கூடுதல் தேவைகள்',
      placeholderNotes: 'எ.கா. வெற்றிட பேக்கிங் (Vacuum Pack) அல்லது சிறப்பு சான்றிதழ்.',
      placeholderDestination: 'எ.கா. Hamburg, Dubai, New York',
      previewTitle: 'WhatsApp செய்தி முன்னோட்டம்',
      previewDesc: 'இந்த செய்தி நேரடியாக எங்கள் ஏற்றுமதி மேலாளருக்கு அனுப்பப்படும்.',
      btnSendWhatsApp: 'WhatsApp மூலம் அனுப்புங்கள்',
      btnCopyMessage: 'நகலெடுக்கவும்',
      copied: 'நகலெடுக்கப்பட்டது!',
      disclaimer: 'ஜேட் இலவங்கப்பட்டை லங்கா உத்தியோகபூர்வ வர்த்தக மையம் (+94 77 123 4567).',
    },
    quality: {
      badge: 'பாதுகாப்பு & தூய்மை',
      title: 'உண்மையான சிலோன் பட்டை vs காசியா',
      subtitle: 'உடலுக்கு பாதுகாப்பான உண்மையான சிலோன் பட்டையைத் தேர்ந்தெடுங்கள்.',
      trueCeylonTitle: 'உண்மையான சிலோன் பட்டை (C. Verum)',
      cassiaTitle: 'காசியா பட்டை (Cassia)',
      coumarinMetric: 'கூமரின் அளவு',
      coumarinCeylon: '< 0.004% (தினசரி பயன்பாட்டிற்கு பாதுகாப்பானது)',
      coumarinCassia: '1.0% வரை (கல்லீரலுக்கு தீங்கு)',
      textureMetric: 'அமைப்பு',
      textureCeylon: 'மென்மையான பல அடுக்கு சுருள்கள்',
      textureCassia: 'தடிமனான மரப்பட்டை போன்றது',
      healthMetric: 'உணவு பாதுகாப்பு',
      healthCeylon: 'EU மற்றும் US FDA விதிகளுக்கு முழு இணக்கம்',
      healthCassia: 'பல நாடுகளில் உணவு பயன்பாட்டில் கட்டுப்பாடு',
      cert1: 'ISO 6539 & SLS 81',
      cert1Desc: 'இலங்கை மற்றும் சர்வதேச தர சான்றிதழ்கள்.',
      cert2: 'தாவர சுகாதார சான்றிதழ்',
      cert2Desc: 'அரசாங்க விவசாய அமைச்சகத்தின் ஒப்புதல்.',
      cert3: 'GC-MS பரிசோதனை',
      cert3Desc: 'எண்ணெய் தூய்மைக்கான ஆய்வக சோதனை.',
      cert4: 'இயற்கையானது',
      cert4Desc: 'பாரம்பரிய முறைப்படி பெறப்பட்ட அறுவடை.',
    },
    logistics: {
      badge: 'ஏற்றுமதி திறன்',
      title: 'உலகளாவிய கொள்கலன் மற்றும் விமான சரக்கு',
      subtitle: 'கொழும்பு துறைமுகத்திலிருந்து உலகளாவிய துறைமுகங்களுக்கு விரைவான விநியோகம்.',
      card1Title: 'கடல் சரக்கு (FCL / LCL)',
      card1Desc: '20 அடி மற்றும் 40 அடி கொள்கலன்களில் பாதுகாப்பாக ஏற்றுமதி செய்யப்படுகிறது.',
      card2Title: 'விமான சரக்கு (Air Cargo)',
      card2Desc: 'அல்பா பட்டை மற்றும் எண்ணெய்களுக்கான விரைவு விமான சேவை.',
      card3Title: 'பாதுகாப்பான பேக்கிங்',
      card3Desc: 'வெற்றிட மற்றும் நைட்ரஜன் நிரப்பப்பட்ட உயர்தர பைகள்.',
      card4Title: 'முழுமையான ஆவணங்கள்',
      card4Desc: 'Bill of Lading, Certificate of Origin, Phytosanitary சான்றிதழ்கள்.',
    },
    footer: {
      desc: 'ஜேட் இலவங்கப்பட்டை லங்கா இலங்கை ஏற்றுமதி அபிவிருத்தி சபையில் (EDB) பதிவுசெய்யப்பட்ட அதிகாரப்பூர்வ ஏற்றுமதி நிறுவனமாகும்.',
      quickLinks: 'பக்கங்கள்',
      contactDesk: 'ஏற்றுமதி பிரிவு',
      directLine: 'தொலைபேசி / WhatsApp:',
      email: 'மின்னஞ்சல்:',
      colomboPort: 'மையம்: காலி வீதி, கொழும்பு 03, இலங்கை',
      legalNote: '100% உண்மையான சிலோன் இலவங்கப்பட்டை உத்தரவாதம்.',
      copyright: '© 2026 ஜேட் இலவங்கப்பட்டை லங்கா. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    }
  },

  ar: {
    brandTitle: 'جايد سينامون لانكا',
    brandTagline: 'المصدر المباشر للقرفة السيلانية النقية 100% والتوابل الفاخرة',
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      products: 'المنتجات',
      quality: 'الجودة والمختبر',
      logistics: 'الشحن والتصدير',
      gallery: 'معرض الصور',
      quoteBuilder: 'طلب واتساب',
      contact: 'مكتب التجارة',
      quickRfq: 'طلب تسعيرة B2B',
    },
    hero: {
      badge: 'من مزارع سريلانكا مباشرة • قرفة سيلانية أصلية 100%',
      titlePart1: 'المصدر الموثوق عالمياً لـ',
      titleHighlight: 'القرفة السيلانية الحقيقية 100%',
      titlePart2: 'والتوابل الفاخرة',
      description: 'أعواد ألبا، سي5 سبيشال، الزيوت العطرية النقية والتوابل العضوية. نسبة كومارين منخفضة للغاية (<0.004%) ومطابقة لمعايير الاتحاد الأوروبي وهيئة الغذاء والدواء الأمريكية. شحن FOB كولومبو و CIF لجميع موانئ العالم.',
      ctaPrimary: 'إنشاء طلب تسعير فوري عبر واتساب',
      ctaSecondary: 'استكشف 17 صنفاً معتمداً',
      statCoumarin: '< 0.004%',
      statCoumarinLabel: 'مؤشر أمان الكومارين',
      statMoisture: '< 12%',
      statMoistureLabel: 'تحكم صارم في الرطوبة',
      statOrigin: '100% C. Verum',
      statOriginLabel: 'نقاء نباتي أصلي ومضمون',
      statFob: 'FOB / CIF',
      statFobLabel: 'شحن بحري وجوي من كولومبو',
    },
    about: {
      badge: 'الأصالة والتراث السيلاني',
      title: 'قرون من الإتقان والخبرة في القرفة الحقيقية',
      desc1: 'تعتبر جايد سينامون لانكا مؤسسة تصدير دولية رائدة متخصصة حصرياً في القرفة السيلانية الأصلية (Cinnamomum verum) والتوابل الفاخرة المحصودة من مزارعنا الخاصة في سريلانكا.',
      desc2: 'على عكس قرفة الكاسيا الضارة بالكبد، تتميز القرفة السيلانية بنسبة كومارين شبه معدومة، ونكهة سكرية راقية، وأعواد ذهبية ناعمة متعددة الطبقات مقشرة يدوياً بواسطة أمهر الحرفيين.',
      heritageTitle: 'حرفة متوارثة عبر الأجيال',
      heritageDesc: 'يتم لف كل عود قرفة يدوياً باتباع تقنيات تقليدية أصيلة متوارثة عبر أجيال من الحرفيين السريلانكيين.',
      craftTitle: 'دقة معملية متطورة',
      craftDesc: 'مراقبة دقيقة للرطوبة، واختبارات نقاء الغاز الكروماتوغرافي (GC-MS) للزيوت العطرية، وتعبئة معقمة ومطابقة لشهادات ISO.',
      globalTitle: 'إمداد عالمي موثوق',
      globalDesc: 'شحن حاويات كاملة FCL وجزئية LCL من ميناء كولومبو إلى دول الخليج العربي، أوروبا، وأمريكا الشمالية.',
    },
    catalog: {
      badge: 'دليل درجات التصدير',
      title: 'كتالوج القرفة السيلانية والتوابل المعتمدة',
      subtitle: 'من أعواد ألبا فائقة النعومة إلى مسحوق القرفة النقي وزيوت اللحاء المقطرة بالبخار، استكشف مجموعتنا التجارية الكاملة.',
      catAll: 'جميع المنتجات (17)',
      catQuills: 'أعواد القرفة السيلانية (8)',
      catPowders: 'القطع والمسحوق (3)',
      catOils: 'الزيوت العطرية (2)',
      catSpices: 'التوابل السيلانية الأخرى (4)',
      originBadge: 'منشأ سيلاني أصلي ممتاز',
      lowCoumarinBadge: 'كومارين منخفض (<0.004%)',
      viewSpecs: 'المواصفات الفنية والمختبر',
      orderNow: 'طلب عبر واتساب',
      specsTitle: 'المواصفات الفنية الرسمية للدرجة',
      diameter: 'القطر / الحجم',
      moisture: 'نسبة الرطوبة',
      coumarin: 'مستوى الكومارين',
      volatileOil: 'الزيت العطري الطيار',
      cinnamaldehyde: 'سينامالدهيد (GC-MS)',
      eugenol: 'يوجينول (GC-MS)',
      density: 'الكثافة الحجمية',
      standard: 'المعيار القياسي SLS / ISO',
      packaging: 'التعبئة والتغليف القياسي',
      close: 'إغلاق النافذة',
    },
    gallery: {
      badge: 'أرشيف المزارع والتجهيز',
      title: 'من مزارع سريلانكا الخضراء إلى موانئ العالم',
      subtitle: 'شاهد مراحل إنتاج وتجهيز القرفة السيلانية من الحصاد اليدوي وحتى شحن الحاويات.',
      item1Title: 'مزارع القرفة في جبال سريلانكا',
      item1Desc: 'مزارع عضوية مستدامة في المرتفعات الجنوبية والوسطى للجزيرة.',
      item2Title: 'التقشير واللف اليدوي التقليدي',
      item2Desc: 'حرفيون مهرة يقومون بلف طبقات القرفة الرقيقة لصنع أعواد ألبا و سي5.',
      item3Title: 'التجفيف في أنفاق شمسية معقمة',
      item3Desc: 'تجفيف محكم يضمن بقاء نسبة الرطوبة تحت 12% لحفظ النكهة والزيوت.',
      item4Title: 'الفرز والتدريج الدقيق',
      item4Desc: 'فحص ميكرومتري لقطر الأعواد للتأكد من مطابقة المواصفات العالمية.',
      item5Title: 'معمل التقطير بالبخار',
      item5Desc: 'استخلاص الزيوت العطرية النقية بنسبة سينامالدهيد ويوجينول عالية.',
      item6Title: 'التعبئة المفرغة وتحميل الحاويات',
      item6Desc: 'شحن مباشر من ميناء كولومبو إلى جميع موانئ الخليج والعالم.',
    },
    rfq: {
      badge: 'محرك عروض الأسعار الفوري',
      title: 'توليد طلب شراء مباشر عبر واتساب',
      subtitle: 'حدد مواصفات طلبك التجاري وسيقوم مكتب التصدير في كولومبو بالرد عليك خلال 15 دقيقة بأسعار الحاويات المحدثة FOB أو CIF.',
      labelGrade: 'اختر المنتج / الدرجة المطلوبة',
      labelQty: 'الكمية المطلوبة',
      labelUnit: 'وحدة القياس',
      labelIncoterm: 'شرط الشحن (Incoterm)',
      labelDestination: 'ميناء الوصول / الدولة',
      labelNotes: 'متطلبات التعبئة أو الفحص المختبري (اختياري)',
      placeholderNotes: 'مثال: تغليف مفرغ من الهواء (Vacuum)، ملصق خاص، أو شهادة تحليل COA.',
      placeholderDestination: 'مثال: ميناء جبل علي (دبي)، جدة، الدمام، الإسكندرية، الدوحة',
      previewTitle: 'معاينة نص رسالة الواتساب الفورية',
      previewDesc: 'سيتم إرسال هذا الطلب المنسق مباشرة إلى مدير التصدير في كولومبو.',
      btnSendWhatsApp: 'إرسال الطلب عبر واتساب الآن',
      btnCopyMessage: 'نسخ نص الرسالة',
      copied: 'تم النسخ بنجاح!',
      disclaimer: 'اتصال مباشر بمكتب التجارة الرسمي لشركة جايد سينامون لانكا (+94 77 123 4567). رد رسمي فوري مع فاتورة أولية.',
    },
    quality: {
      badge: 'النقاء والسلامة العلمية',
      title: 'مقارنة القرفة السيلانية الحقيقية بقرفة الكاسيا المغشوشة',
      subtitle: 'تعرف على الفروق الكيميائية والصحية الحيوية التي تجعل القرفة السيلانية الخيار الآمن الوحيد للاستهلاك الغذائي والصيدلاني.',
      trueCeylonTitle: 'القرفة السيلانية الحقيقية (C. Verum)',
      cassiaTitle: 'قرفة الكاسيا الشائعة (Cassia)',
      coumarinMetric: 'نسبة مادة الكومارين',
      coumarinCeylon: '< 0.004% (آمنة تماماً للاستهلاك اليومي المنتظم)',
      coumarinCassia: 'تصل إلى 1.0% (تسبب أضراراً بالغة للكبد والكلى)',
      textureMetric: 'بنية وشكل العود',
      textureCeylon: 'طبقات رقيقة ناعمة ومتعددة تشبه لفافة السيجار',
      textureCassia: 'طبقة خشبية واحدة سميكة وصلبة ومجوفة',
      healthMetric: 'معايير سلامة الأغذية العالمية',
      healthCeylon: 'مطابقة بالكامل لمعايير هيئة الغذاء والدواء الأمريكية والاتحاد الأوروبي',
      healthCassia: 'تخضع لقيود صارمة في التصنيع الغذائي في عدة دول',
      cert1: 'ISO 6539 & SLS 81',
      cert1Desc: 'مطابقة تامة للمواصفات القياسية الوطنية والدولية للقرفة السيلانية.',
      cert2: 'شهادة الصحة النباتية (Phyto)',
      cert2Desc: 'شهادة فحص زراعي حكومية تصدر مع كل حاوية تصدير.',
      cert3: 'فحص النقاء الكروماتوغرافي GC-MS',
      cert3Desc: 'اختبارات مخبرية دقيقة لضمان نقاء الزيوت وخلوها من أي غش.',
      cert4: 'عضوي وغير معدل وراثياً',
      cert4Desc: 'محصود من مزارع مستدامة تتبع أرقى الممارسات البيئية في سريلانكا.',
    },
    logistics: {
      badge: 'بنية تحتية للتصدير العالمي',
      title: 'سلاسل التوريد وشحن الحاويات الدولي',
      subtitle: 'من ميناء كولومبو الاستراتيجي إلى موانئ العالم مع ضمان التعبئة المفرغة من الهواء وسلامة الشحنات.',
      card1Title: 'شحن بحري للحاويات (FCL & LCL)',
      card1Desc: 'حاويات 20 قدم (حوالي 7-10 أطنان) و 40 قدم عالية السعة يتم تحميلها تحت إشراف معقم في ميناء كولومبو.',
      card2Title: 'شحن جوي سريع (Air Cargo)',
      card2Desc: 'شحن جوي سريع عبر مطار باندارانايكا الدولي للطلبات العاجلة وأعواد ألبا والزيوت العطرية الفاخرة.',
      card3Title: 'تعبئة محكمة بغاز النيتروجين',
      card3Desc: 'أكياس محكمة الإغلاق ومفرغة من الهواء مع حماية ضد الرطوبة للمحافظة على الزيوت الطيارة والنكهة.',
      card4Title: 'توثيق رسمي كامل للتصدير',
      card4Desc: 'بوليصة الشحن، شهادة المنشأ الأصلية، الشهادة الصحية الزراعية، الفاتورة التجارية، وقائمة التعبئة المعتمدة.',
    },
    footer: {
      desc: 'جايد سينامون لانكا هي شركة تصدير دولية مسجلة رسمياً ومصرح لها بتصدير القرفة السيلانية الأصلية والتوابل تحت مظلة مجلس تنمية الصادرات السريلانكي (EDB).',
      quickLinks: 'روابط سريعة',
      contactDesk: 'مكتب التجارة الدولي',
      directLine: 'الخط الساخن / واتساب:',
      email: 'البريد الإلكتروني التجاري:',
      colomboPort: 'مركز التجهيز والتصدير: طريق غالي، كولومبو 03، سريلانكا',
      legalNote: 'ضمان أصالة 100% Cinnamomum Verum. جميع الشحنات مفحوصة وموثقة من وزارة الزراعة السريلانكية.',
      copyright: '© 2026 جايد سينامون لانكا. جميع الحقوق محفوظة. منصة التجارة الدولية B2B.',
    }
  },

  de: {
    brandTitle: 'Jade Cinnamon Lanka',
    brandTagline: '100% Echter Ceylon-Zimt & Gewürze Direkt-Exporteur',
    nav: {
      home: 'Startseite',
      about: 'Über Uns',
      products: 'Produkte',
      quality: 'Qualität & Labor',
      logistics: 'Export & Fracht',
      gallery: 'Galerie',
      quoteBuilder: 'WhatsApp Angebot',
      contact: 'Export-Büro',
      quickRfq: 'B2B-Angebot anfordern',
    },
    hero: {
      badge: 'DIREKTE PLANTAGENHERKUNFT • SRI LANKA ORIGIN',
      titlePart1: 'Weltklasse B2B-Exporteur von',
      titleHighlight: '100% Echtem Ceylon-Zimt',
      titlePart2: 'und edlen Gewürzen',
      description: 'Handgerollte Alba- und C5-Zimtstangen, reine ätherische Öle und Bio-Gewürze. Garantiert ultra-niedriger Cumaringehalt (<0,004%), konform mit EU-Lebensmittelstandards. FOB Colombo & CIF weltweit.',
      ctaPrimary: 'Live WhatsApp RFQ erstellen',
      ctaSecondary: '17 zertifizierte Sorten ansehen',
      statCoumarin: '< 0,004%',
      statCoumarinLabel: 'Cumarin-Sicherheitsindex',
      statMoisture: '< 12%',
      statMoistureLabel: 'Strikte Feuchtigkeitskontrolle',
      statOrigin: '100% C. Verum',
      statOriginLabel: 'Botanische Reinheit Garantiert',
      statFob: 'FOB / CIF',
      statFobLabel: 'See- & Luftfracht ab Colombo',
    },
    about: {
      badge: 'TRADITION & HERKUNFT',
      title: 'Jahrhundertealte Handwerkskunst für echten Zimt',
      desc1: 'Jade Cinnamon Lanka ist ein B2B-Exporthaus, das sich ausschließlich dem authentischen Ceylon-Zimt (Cinnamomum verum) und erlesenen Gewürzen widmet.',
      desc2: 'Im Gegensatz zu gewöhnlichem Cassia-Zimt enthält echter Ceylon-Zimt unbedenkliche Cumarinwerte und besitzt zarte, vielschichtige Stangen.',
      heritageTitle: 'Meisterhafte Handarbeit',
      heritageDesc: 'Jede Zimtstange wird von erfahrenen Kunsthandwerkern nach traditioneller Methode von Hand gerollt.',
      craftTitle: 'Moderne Laborpräzision',
      craftDesc: 'Fortschrittliche Feuchtigkeitsmessung, GC-MS-Analysen für ätherische Öle und ISO-zertifizierte Verpackung.',
      globalTitle: 'Zuverlässige weltweite Lieferung',
      globalDesc: 'FCL- und LCL-Containerfracht vom Hafen Colombo nach Europa, Nordamerika und Asien.',
    },
    catalog: {
      badge: 'EXPORTQUALITÄTEN',
      title: 'Zertifizierter Ceylon-Zimt & Gewürzkatalog',
      subtitle: 'Von hauchdünnen Alba-Stangen bis zu feinstem Zimtpulver und dampfdestillierten Rindenölen.',
      catAll: 'Alle Produkte (17)',
      catQuills: 'Zimtstangen / Quills (8)',
      catPowders: 'Schnitte & Pulver (3)',
      catOils: 'Ätherische Öle (2)',
      catSpices: 'Weitere Ceylon-Gewürze (4)',
      originBadge: 'Premium Ceylon Herkunft',
      lowCoumarinBadge: 'Niedriger Cumaringehalt (<0,004%)',
      viewSpecs: 'Labor- & Produktdaten',
      orderNow: 'WhatsApp Anfrage',
      specsTitle: 'Technische Spezifikationen',
      diameter: 'Durchmesser / Größe',
      moisture: 'Feuchtigkeitsgehalt',
      coumarin: 'Cumaringehalt',
      volatileOil: 'Flüchtiges ätherisches Öl',
      cinnamaldehyde: 'Cinnamaldehyd (GC-MS)',
      eugenol: 'Eugenol (GC-MS)',
      density: 'Schüttdichte',
      standard: 'SLS / ISO Standard',
      packaging: 'Verpackung',
      close: 'Schließen',
    },
    gallery: {
      badge: 'PLANTAGEN- & VERARBEITUNGSARCHIV',
      title: 'Von Ceylon-Plantagen zu den Häfen der Welt',
      subtitle: 'Erleben Sie unsere traditionelle Handwerkskunst und modernen Exportprozesse.',
      item1Title: 'Ceylon Bergland-Plantagen',
      item1Desc: 'Nachhaltig bewirtschaftete Zimtgärten im Hochland Sri Lankas.',
      item2Title: 'Traditionelle Handschälung',
      item2Desc: 'Erfahrene Handwerker rollen hauchdünne Lagen für Alba- und C5-Stangen.',
      item3Title: 'Kontrollierte Solartrocknung',
      item3Desc: 'Hygienische Trocknung zur Einhaltung der Feuchtigkeit unter 12%.',
      item4Title: 'Feinsortierung & Qualitätskontrolle',
      item4Desc: 'Präzise Prüfung der Stangendurchmesser nach ISO 6539.',
      item5Title: 'Dampfdestillationsanlage',
      item5Desc: 'Reine Destillation für Zimtrinden- und Zimtblattöle.',
      item6Title: 'Container- & Vakuumverladung',
      item6Desc: 'Vakuumversiegelte Ausfuhr direkt ab dem Hafen Colombo.',
    },
    rfq: {
      badge: 'B2B-PREISKALKULATOR',
      title: 'Echtzeit-WhatsApp-Anfrage generieren',
      subtitle: 'Wählen Sie Sorte und Menge. Unser Handelsteam in Colombo antwortet innerhalb von 15 Minuten mit aktuellen FOB- oder CIF-Raten.',
      labelGrade: 'Produkt / Qualität wählen',
      labelQty: 'Menge',
      labelUnit: 'Einheit',
      labelIncoterm: 'Incoterm',
      labelDestination: 'Bestimmungshafen / Land',
      labelNotes: 'Spezielle Anforderungen (Optional)',
      placeholderNotes: 'z.B. 25kg Vakuumverpackung, Private Labeling oder Analysezertifikat (COA).',
      placeholderDestination: 'z.B. Hamburg, Rotterdam, Bremen, Wien',
      previewTitle: 'WhatsApp Nachrichtenvorschau',
      previewDesc: 'Diese strukturierte Anfrage wird direkt an unser Handelsteam gesendet.',
      btnSendWhatsApp: 'Anfrage über WhatsApp senden',
      btnCopyMessage: 'Text kopieren',
      copied: 'In die Zwischenablage kopiert!',
      disclaimer: 'Direkte Verbindung zum offiziellen Trade Desk von Jade Cinnamon Lanka (+94 77 123 4567).',
    },
    quality: {
      badge: 'WISSENSCHAFTLICHE REINHEIT',
      title: 'Echter Ceylon-Zimt vs. Cassia-Zimt',
      subtitle: 'Warum Ceylon-Zimt die einzig sichere Wahl für Lebensmittelindustrie und täglichen Konsum ist.',
      trueCeylonTitle: 'Echter Ceylon-Zimt (C. Verum)',
      cassiaTitle: 'Gewöhnlicher Cassia-Zimt (Cassia)',
      coumarinMetric: 'Cumaringehalt',
      coumarinCeylon: '< 0,004% (Unbedenklich für täglichen Verzehr)',
      coumarinCassia: 'Bis zu 1,0% (Leber- und Nierengefahr)',
      textureMetric: 'Struktur der Stange',
      textureCeylon: 'Feine, vielschichtige, weiche Papierlagen',
      textureCassia: 'Einzelne, harte, dicke Rinde',
      healthMetric: 'Lebensmittelsicherheit',
      healthCeylon: 'Vollständig EU EFSA- und US FDA-konform',
      healthCassia: 'In vielen Ländern für Lebensmittel stark reguliert',
      cert1: 'ISO 6539 & SLS 81',
      cert1Desc: 'Einhaltung aller internationalen Qualitätsstandards.',
      cert2: 'Pflanzengesundheitszeugnis',
      cert2Desc: 'Amtliche Zertifizierung bei jeder Containerausfuhr.',
      cert3: 'GC-MS Reinheitsprüfung',
      cert3Desc: 'Laboranalysen für 100% unverfälschte ätherische Öle.',
      cert4: 'Nachhaltig & Gentechnikfrei',
      cert4Desc: 'Aus nachhaltig bewirtschafteten Plantagen in Sri Lanka.',
    },
    logistics: {
      badge: 'EXPORTINFRASTRUKTUR',
      title: 'Globale Containerfracht & Logistik',
      subtitle: 'Zuverlässiger Versand vom Hafen Colombo in alle Welthäfen mit Vakuumschutz.',
      card1Title: 'Seefracht (FCL & LCL)',
      card1Desc: '20-Fuß- und 40-Fuß-High-Cube-Container unter kontrollierten Bedingungen verladen.',
      card2Title: 'Express-Luftfracht',
      card2Desc: 'Schnellversand per Luftfracht für Alba-Zimt, Öle und Eilaufträge.',
      card3Title: 'Hermetische Vakuumverpackung',
      card3Desc: 'Vakuumversiegelte Säcke mit Stickstoffspülung zum Erhalt des Aromas.',
      card4Title: 'Vollständige Exportdokumente',
      card4Desc: 'Konnossement (B/L), Ursprungszeugnis, Pflanzengesundheitszeugnis, Handelsrechnung.',
    },
    footer: {
      desc: 'Jade Cinnamon Lanka ist ein registrierter Exporteur von authentischem Ceylon-Zimt und Gewürzen unter Aufsicht des Sri Lanka Export Development Board (EDB).',
      quickLinks: 'Navigation',
      contactDesk: 'Internationales Handelsbüro',
      directLine: 'Hotline / WhatsApp:',
      email: 'E-Mail:',
      colomboPort: 'Zentrum: Galle Road, Colombo 03, Sri Lanka',
      legalNote: '100% Echtheitsgarantie für Cinnamomum Verum. Staatlich geprüft.',
      copyright: '© 2026 Jade Cinnamon Lanka. Alle Rechte vorbehalten.',
    }
  },

  fr: {
    brandTitle: 'Jade Cinnamon Lanka',
    brandTagline: 'Exportateur Direct de Cannelle de Ceylan Pure à 100% & Épices',
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      products: 'Produits',
      quality: 'Qualité & Labo',
      logistics: 'Fret & Export',
      gallery: 'Galerie',
      quoteBuilder: 'Devis WhatsApp',
      contact: 'Bureau Commercial',
      quickRfq: 'Demander un devis B2B',
    },
    hero: {
      badge: 'PROVENANCE DIRECTE DES PLANTATIONS • SRI LANKA',
      titlePart1: 'Exportateur B2B de référence mondiale de',
      titleHighlight: 'Véritable Cannelle de Ceylan 100% Pure',
      titlePart2: 'et d\'épices d\'exception',
      description: 'Bâtons Alba et C5 Special roulés à la main, huiles essentielles pures et épices biologiques. Taux de coumarine ultra-faible certifié (<0,004%), conforme aux normes UE et US FDA. FOB Colombo & CIF mondial.',
      ctaPrimary: 'Générer un devis WhatsApp en direct',
      ctaSecondary: 'Découvrir nos 17 grades certifiés',
      statCoumarin: '< 0,004%',
      statCoumarinLabel: 'Indice de sécurité coumarine',
      statMoisture: '< 12%',
      statMoistureLabel: 'Contrôle strict de l\'humidité',
      statOrigin: '100% C. Verum',
      statOriginLabel: 'Pureté botanique garantie',
      statFob: 'FOB / CIF',
      statFobLabel: 'Fret maritime & aérien depuis Colombo',
    },
    about: {
      badge: 'TRADITION ET EXPERTISE',
      title: 'Des siècles d\'excellence dans la véritable cannelle',
      desc1: 'Jade Cinnamon Lanka est une maison d\'exportation B2B internationale dédiée exclusivement à la cannelle authentique de Ceylan (Cinnamomum verum).',
      desc2: 'Contrairement à la casse nocive pour la santé, la véritable cannelle de Ceylan ne présente aucun danger hépatique et offre un arôme délicatement sucré.',
      heritageTitle: 'Savoir-faire artisanal',
      heritageDesc: 'Chaque bâton est minutieusement roulé à la main selon des techniques ancestrales transmises de génération en génération.',
      craftTitle: 'Rigueur de laboratoire',
      craftDesc: 'Contrôle rigoureux de l\'humidité, analyses GC-MS pour les huiles essentielles et conditionnement sous normes ISO.',
      globalTitle: 'Approvisionnement mondial fiable',
      globalDesc: 'Expéditions maritimes FCL et LCL depuis le port de Colombo vers l\'Europe, l\'Amérique du Nord et le Moyen-Orient.',
    },
    catalog: {
      badge: 'GRADES D\'EXPORTATION',
      title: 'Catalogue Certifié de Cannelle de Ceylan & Épices',
      subtitle: 'Des fins bâtons Alba aux poudres ultra-fines et huiles distillées à la vapeur.',
      catAll: 'Tous les produits (17)',
      catQuills: 'Bâtons de cannelle (8)',
      catPowders: 'Coupes & Poudres (3)',
      catOils: 'Huiles essentielles (2)',
      catSpices: 'Autres épices de Ceylan (4)',
      originBadge: 'Origine Ceylan Premium',
      lowCoumarinBadge: 'Faible en coumarine (<0,004%)',
      viewSpecs: 'Fiche technique & Labo',
      orderNow: 'Commander via WhatsApp',
      specsTitle: 'Spécifications Techniques Officielles',
      diameter: 'Diamètre / Taille',
      moisture: 'Humidité maximale',
      coumarin: 'Taux de coumarine',
      volatileOil: 'Huile essentielle volatile',
      cinnamaldehyde: 'Cinnamaldéhyde (GC-MS)',
      eugenol: 'Eugénol (GC-MS)',
      density: 'Densité apparente',
      standard: 'Norme SLS / ISO',
      packaging: 'Conditionnement',
      close: 'Fermer',
    },
    gallery: {
      badge: 'ARCHIVES PLANTATION & PRODUCTION',
      title: 'Des Plantations de Ceylan aux Ports Mondiaux',
      subtitle: 'Découvrez notre savoir-faire traditionnel et nos infrastructures d\'exportation modernes.',
      item1Title: 'Plantations des hauts plateaux',
      item1Desc: 'Domaines durables situés dans les collines du centre et du sud de Ceylan.',
      item2Title: 'Pelage et roulage artisanal',
      item2Desc: 'Maîtres artisans réalisant manuellement les bâtons fins Alba et C5.',
      item3Title: 'Séchage solaire sous tunnel',
      item3Desc: 'Contrôle hygrométrique rigoureux garantissant un taux d\'humidité inférieur à 12%.',
      item4Title: 'Calibration et contrôle qualité',
      item4Desc: 'Tri rigoureux et vérification micrométrique des diamètres.',
      item5Title: 'Laboratoire de distillation',
      item5Desc: 'Extraction à la vapeur d\'huiles essentielles pures d\'écorce et de feuille.',
      item6Title: 'Expédition de conteneurs sous vide',
      item6Desc: 'Conditionnement hermétique et acheminement direct au port de Colombo.',
    },
    rfq: {
      badge: 'CALCULATEUR DE DEVIS B2B',
      title: 'Générer une demande d\'achat via WhatsApp',
      subtitle: 'Configurez votre commande. Notre bureau d\'exportation à Colombo vous répondra en 15 minutes avec les tarifs FOB ou CIF.',
      labelGrade: 'Sélectionner le produit / grade',
      labelQty: 'Quantité',
      labelUnit: 'Unité de mesure',
      labelIncoterm: 'Incoterm souhaité',
      labelDestination: 'Port de destination / Pays',
      labelNotes: 'Exigences particulières (Optionnel)',
      placeholderNotes: 'ex: emballage sous vide 25kg, étiquetage personnalisé ou certificat d\'analyse (COA).',
      placeholderDestination: 'ex: Le Havre, Marseille, Anvers, Montréal',
      previewTitle: 'Aperçu du message WhatsApp',
      previewDesc: 'Ce message structuré sera transmis directement à notre responsable commercial.',
      btnSendWhatsApp: 'Envoyer la demande via WhatsApp',
      btnCopyMessage: 'Copier le texte',
      copied: 'Copié dans le presse-papiers !',
      disclaimer: 'Ligne directe avec le bureau commercial de Jade Cinnamon Lanka (+94 77 123 4567).',
    },
    quality: {
      badge: 'SÉCURITÉ & PURETÉ SCIENTIFIQUE',
      title: 'Véritable Cannelle de Ceylan vs. Cannelle Casse',
      subtitle: 'Comprenez pourquoi la cannelle de Ceylan est la seule recommandable pour l\'alimentation et la santé.',
      trueCeylonTitle: 'Cannelle de Ceylan Pure (C. Verum)',
      cassiaTitle: 'Cannelle Casse Ordinaire (Cassia)',
      coumarinMetric: 'Teneur en Coumarine',
      coumarinCeylon: '< 0,004% (Sans danger pour une consommation quotidienne)',
      coumarinCassia: 'Jusqu\'à 1,0% (Risque toxique pour le foie et les reins)',
      textureMetric: 'Structure du bâton',
      textureCeylon: 'Couches fines, tendres et multiples en parchemin',
      textureCassia: 'Écorce unique, dure, épaisse et creuse',
      healthMetric: 'Normes de sécurité alimentaire',
      healthCeylon: 'Conformité totale avec les règlements UE et US FDA',
      healthCassia: 'Utilisation restreinte dans l\'industrie alimentaire',
      cert1: 'ISO 6539 & SLS 81',
      cert1Desc: 'Respect des normes internationales les plus exigeantes.',
      cert2: 'Certificat Phytosanitaire',
      cert2Desc: 'Inspection officielle délivrée par le ministère de l\'Agriculture.',
      cert3: 'Contrôles GC-MS',
      cert3Desc: 'Analyses chromatographiques garantissant la pureté des huiles.',
      cert4: 'Naturel & Sans OGM',
      cert4Desc: 'Issu de plantations sri-lankaises durables et éco-responsables.',
    },
    logistics: {
      badge: 'INFRASTRUCTURE EXPORT',
      title: 'Fret Maritime & Logistique Mondiale',
      subtitle: 'Expéditions fiables depuis le port de Colombo vers tous les grands ports internationaux.',
      card1Title: 'Fret maritime conteneurisé (FCL & LCL)',
      card1Desc: 'Conteneurs 20ft et 40ft chargés sous contrôle d\'hygiène strict au port de Colombo.',
      card2Title: 'Fret Aérien Express',
      card2Desc: 'Expéditions rapides pour les bâtons Alba, les huiles et les échantillons urgents.',
      card3Title: 'Conditionnement sous vide hermétique',
      card3Desc: 'Sacs doublés et injectés d\'azote pour préserver les huiles volatiles et la fraîcheur.',
      card4Title: 'Documentation Export Complète',
      card4Desc: 'Connaissement (B/L), Certificat d\'Origine, Certificat Phytosanitaire, Facture commerciale.',
    },
    footer: {
      desc: 'Jade Cinnamon Lanka est un exportateur international officiel enregistré auprès du Conseil de Développement des Exportations du Sri Lanka (EDB).',
      quickLinks: 'Navigation',
      contactDesk: 'Bureau Commercial International',
      directLine: 'Ligne directe / WhatsApp :',
      email: 'Courriel :',
      colomboPort: 'Centre d\'exportation : Galle Road, Colombo 03, Sri Lanka',
      legalNote: 'Garantie d\'authenticité 100% Cinnamomum Verum. Contrôlé par les autorités.',
      copyright: '© 2026 Jade Cinnamon Lanka. Tous droits réservés.',
    }
  },

  es: {
    brandTitle: 'Jade Cinnamon Lanka',
    brandTagline: 'Exportador Directo de Canela de Ceilán 100% Pura y Especias',
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      products: 'Productos',
      quality: 'Calidad & Lab',
      logistics: 'Exportación',
      gallery: 'Galería',
      quoteBuilder: 'Cotizar WhatsApp',
      contact: 'Mesa Comercial',
      quickRfq: 'Solicitar Cotización B2B',
    },
    hero: {
      badge: 'ORIGEN DIRECTO DE PLANTACIÓN • SRI LANKA',
      titlePart1: 'Exportador B2B de clase mundial de',
      titleHighlight: 'Canela de Ceilán 100% Pura',
      titlePart2: 'y Especias Selectas',
      description: 'Canela en rama Alba y C5 Especial enrollada a mano, aceites esenciales puros y especias orgánicas. Nivel ultra-bajo de cumarina certificado (<0.004%), en total cumplimiento con normativas de la UE y US FDA. FOB Colombo y CIF mundial.',
      ctaPrimary: 'Cotizar en vivo por WhatsApp',
      ctaSecondary: 'Explorar 17 Grados Certificados',
      statCoumarin: '< 0.004%',
      statCoumarinLabel: 'Índice Seguro de Cumarina',
      statMoisture: '< 12%',
      statMoistureLabel: 'Control Estricto de Humedad',
      statOrigin: '100% C. Verum',
      statOriginLabel: 'Pureza Botánica Garantizada',
      statFob: 'FOB / CIF',
      statFobLabel: 'Envíos Marítimos y Aéreos desde Colombo',
    },
    about: {
      badge: 'HERENCIA Y TRADICIÓN',
      title: 'Siglos de maestría en la auténtica canela de Ceilán',
      desc1: 'Jade Cinnamon Lanka es una empresa exportadora internacional dedicada exclusivamente a la auténtica canela de Ceilán (Cinnamomum verum) y especias de plantaciones de Sri Lanka.',
      desc2: 'A diferencia de la canela Cassia dañina para la salud, la auténtica canela de Ceilán contiene niveles mínimos de cumarina y posee un sabor dulce y suave.',
      heritageTitle: 'Artesanía Generacional',
      heritageDesc: 'Cada rama es pelada y enrollada a mano siguiendo técnicas centenarias transmitidas por artesanos de Sri Lanka.',
      craftTitle: 'Precisión de Laboratorio',
      craftDesc: 'Monitoreo de humedad, pruebas cromatográficas GC-MS para aceites y empaque certificado bajo normas ISO.',
      globalTitle: 'Suministro Global Confiable',
      globalDesc: 'Envíos de contenedores FCL y LCL desde el Puerto de Colombo hacia Europa, América Latina, EE.UU. y Medio Oriente.',
    },
    catalog: {
      badge: 'GRADOS DE EXPORTACIÓN',
      title: 'Catálogo Certificado de Canela de Ceilán y Especias',
      subtitle: 'Desde finas ramas Alba hasta canela en polvo y aceites destilados al vapor.',
      catAll: 'Todos los productos (17)',
      catQuills: 'Canela en Rama / Quills (8)',
      catPowders: 'Cortes y Polvo (3)',
      catOils: 'Aceites Esenciales (2)',
      catSpices: 'Otras Especias de Ceilán (4)',
      originBadge: 'Origen Ceilán Premium',
      lowCoumarinBadge: 'Baja en Cumarina (<0.004%)',
      viewSpecs: 'Ficha Técnica y Laboratorio',
      orderNow: 'Pedir por WhatsApp',
      specsTitle: 'Especificaciones Técnicas Oficiales',
      diameter: 'Diámetro / Grosor',
      moisture: 'Humedad Máxima',
      coumarin: 'Nivel de Cumarina',
      volatileOil: 'Aceite Esencial Volátil',
      cinnamaldehyde: 'Cinamaldehído (GC-MS)',
      eugenol: 'Eugenol (GC-MS)',
      density: 'Densidad Aparente',
      standard: 'Norma SLS / ISO',
      packaging: 'Empaque Estándar',
      close: 'Cerrar',
    },
    gallery: {
      badge: 'GALERÍA DE PLANTACIONES Y PROCESO',
      title: 'De las Plantaciones de Ceilán a los Puertos Globales',
      subtitle: 'Observe la pureza y el cuidado artesanal desde la cosecha hasta la exportación marítima.',
      item1Title: 'Plantaciones en las Colinas de Ceilán',
      item1Desc: 'Fincas sostenibles en las tierras altas del sur y centro de Sri Lanka.',
      item2Title: 'Pelado y Enrollado Artesanal',
      item2Desc: 'Artesanos expertos creando finas capas múltiples para los grados Alba y C5.',
      item3Title: 'Secado Solar Controlado',
      item3Desc: 'Secado higiénico en túneles solares para mantener la humedad bajo el 12%.',
      item4Title: 'Clasificación y Control de Calidad',
      item4Desc: 'Inspección minuciosa de grosores y pureza botánica.',
      item5Title: 'Laboratorio de Destilación por Vapor',
      item5Desc: 'Extracción de aceites esenciales de corteza y hoja con alto contenido aromático.',
      item6Title: 'Carga de Contenedores al Vacío',
      item6Desc: 'Embalaje hermético y despacho directo en el Puerto de Colombo.',
    },
    rfq: {
      badge: 'COTIZADOR B2B EN VIVO',
      title: 'Generar Consulta de Compra por WhatsApp',
      subtitle: 'Configure su orden comercial. Nuestro equipo en Colombo responderá en 15 minutos con cotizaciones actualizadas FOB o CIF.',
      labelGrade: 'Seleccionar Producto / Grado',
      labelQty: 'Cantidad',
      labelUnit: 'Unidad de Medida',
      labelIncoterm: 'Incoterm Preferido',
      labelDestination: 'Puerto de Destino / País',
      labelNotes: 'Requisitos Especiales (Opcional)',
      placeholderNotes: 'ej: empaque al vacío de 25kg, marca privada o certificado de análisis (COA).',
      placeholderDestination: 'ej: Valencia, Barcelona, Callao, Veracruz, Manzanillo, Santos',
      previewTitle: 'Vista Previa del Mensaje de WhatsApp',
      previewDesc: 'Este mensaje formateado se enviará directamente a nuestro equipo de exportación.',
      btnSendWhatsApp: 'Enviar Pedido por WhatsApp',
      btnCopyMessage: 'Copiar Mensaje',
      copied: '¡Copiado al Portapapeles!',
      disclaimer: 'Conexión directa con la mesa comercial de Jade Cinnamon Lanka (+94 77 123 4567).',
    },
    quality: {
      badge: 'PUREZA CIENTÍFICA Y SEGURIDAD',
      title: 'Canela de Ceilán Verdadera vs. Canela Cassia',
      subtitle: 'Conozca las razones por las cuales la canela de Ceilán es la única opción segura para uso alimentario y medicinal.',
      trueCeylonTitle: 'Auténtica Canela de Ceilán (C. Verum)',
      cassiaTitle: 'Canela Cassia Común (Cassia)',
      coumarinMetric: 'Contenido de Cumarina',
      coumarinCeylon: '< 0.004% (Segura para consumo diario continuo)',
      coumarinCassia: 'Hasta 1.0% (Riesgo tóxico hepático y renal)',
      textureMetric: 'Estructura de la rama',
      textureCeylon: 'Capas suaves, delgadas y múltiples como papel',
      textureCassia: 'Corteza única, gruesa, dura y hueca',
      healthMetric: 'Normativas Sanitarias',
      healthCeylon: 'En total conformidad con regulaciones de la UE y FDA',
      healthCassia: 'Con restricciones severas para uso industrial',
      cert1: 'ISO 6539 & SLS 81',
      cert1Desc: 'Cumplimiento con estándares internacionales de exportación.',
      cert2: 'Certificado Fitosanitario',
      cert2Desc: 'Inspección oficial del Ministerio de Agricultura de Sri Lanka.',
      cert3: 'Pruebas GC-MS',
      cert3Desc: 'Análisis de laboratorio para pureza de aceites esenciales.',
      cert4: 'Orgánico y No-GMO',
      cert4Desc: 'Cultivado en plantaciones sostenibles en Sri Lanka.',
    },
    logistics: {
      badge: 'INFRAESTRUCTURA DE EXPORTACIÓN',
      title: 'Flete Marítimo y Logística Internacional',
      subtitle: 'Envíos rápidos desde el Puerto de Colombo con empaque al vacío y preservación total.',
      card1Title: 'Flete Marítimo (FCL y LCL)',
      card1Desc: 'Contenedores de 20 y 40 pies cargados bajo estrictos controles en el Puerto de Colombo.',
      card2Title: 'Carga Aérea Express',
      card2Desc: 'Transporte aéreo ágil para canela Alba, aceites y pedidos de muestra urgentes.',
      card3Title: 'Empaque Hermético con Nitrógeno',
      card3Desc: 'Bolsas especiales al vacío que protegen el aroma y los aceites volátiles.',
      card4Title: 'Documentación Completa de Exportación',
      card4Desc: 'Conocimiento de Embarque (B/L), Certificado de Origen, Fitosanitario y Factura.',
    },
    footer: {
      desc: 'Jade Cinnamon Lanka es un exportador internacional registrado ante la Junta de Desarrollo de Exportaciones de Sri Lanka (EDB).',
      quickLinks: 'Navegación',
      contactDesk: 'Mesa de Exportación',
      directLine: 'Línea Directa / WhatsApp:',
      email: 'Correo Comercial:',
      colomboPort: 'Centro de Exportación: Galle Road, Colombo 03, Sri Lanka',
      legalNote: 'Garantía 100% Cinnamomum Verum. Certificado oficial.',
      copyright: '© 2026 Jade Cinnamon Lanka. Todos los derechos reservados.',
    }
  }
};
