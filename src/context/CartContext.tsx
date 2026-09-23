import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductVariant } from '../data/products';

export type QuotationUnit = 'Kg' | 'L' | 'Packs' | 'Bottles';

export interface CartItem {
  id: string; // Composite key, e.g. "leaf-oil-bottle-100ml" or "cinnamon-powder-1kg" or "cinnamon-quills"
  productId: string;
  name: string;
  variantId?: string;
  variantLabel?: string; // e.g., "100ml Standard Bottle", "1Kg Sealed Pouch", "4-Bottle Master Pack", "Bulk Custom Weight"
  gradeCode: string;
  category: string;
  categoryLabel: string;
  imageUrl: string;
  quantity: number;
  unit: QuotationUnit;
  specs?: {
    moisture?: string;
    coumarin?: string;
    cinnamaldehyde?: string;
    eugenol?: string;
    diameter?: string;
    meshSize?: string;
  };
  notes?: string;
}

export interface FlyingParticle {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  imageUrl: string;
}

export interface AddToCartPayload {
  product: Product;
  quantity: number;
  unit?: QuotationUnit;
  variant?: ProductVariant;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    product: Product,
    quantity?: number,
    unit?: QuotationUnit,
    event?: React.MouseEvent,
    variant?: ProductVariant
  ) => void;
  addMultipleToCart: (
    payloads: AddToCartPayload[],
    event?: React.MouseEvent
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateUnit: (itemId: string, unit: QuotationUnit) => void;
  clearCart: () => void;
  totalUniqueItems: number;
  totalItemQuantity: number;
  totalEstimatedWeightDisplay: string;
  flyingParticles: FlyingParticle[];
  
  // Structured Orderer & Shipment Parameters
  ordererName: string;
  setOrdererName: (name: string) => void;
  ordererAddress: string;
  setOrdererAddress: (addr: string) => void;
  ordererPhone: string;
  setOrdererPhone: (phone: string) => void;
  destinationPort: string;
  setDestinationPort: (dest: string) => void;
  incoterm: string;
  setIncoterm: (incoterm: string) => void;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  
  cartIconRef: React.RefObject<HTMLButtonElement>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'jade_cinnamon_b2b_cart_v3';
const NAME_STORAGE_KEY = 'jade_cinnamon_b2b_name';
const ADDR_STORAGE_KEY = 'jade_cinnamon_b2b_addr';
const PHONE_STORAGE_KEY = 'jade_cinnamon_b2b_phone';
const DEST_STORAGE_KEY = 'jade_cinnamon_b2b_dest';
const INCOTERM_STORAGE_KEY = 'jade_cinnamon_b2b_incoterm';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [ordererName, setOrdererName] = useState<string>(() => {
    try {
      return localStorage.getItem(NAME_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [ordererAddress, setOrdererAddress] = useState<string>(() => {
    try {
      return localStorage.getItem(ADDR_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [ordererPhone, setOrdererPhone] = useState<string>(() => {
    try {
      return localStorage.getItem(PHONE_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [destinationPort, setDestinationPort] = useState<string>(() => {
    try {
      return localStorage.getItem(DEST_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [incoterm, setIncoterm] = useState<string>(() => {
    try {
      return localStorage.getItem(INCOTERM_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [orderNotes, setOrderNotes] = useState<string>('');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [flyingParticles, setFlyingParticles] = useState<FlyingParticle[]>([]);
  const cartIconRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(NAME_STORAGE_KEY, ordererName);
    } catch {
      // ignore
    }
  }, [ordererName]);

  useEffect(() => {
    try {
      localStorage.setItem(ADDR_STORAGE_KEY, ordererAddress);
    } catch {
      // ignore
    }
  }, [ordererAddress]);

  useEffect(() => {
    try {
      localStorage.setItem(PHONE_STORAGE_KEY, ordererPhone);
    } catch {
      // ignore
    }
  }, [ordererPhone]);

  useEffect(() => {
    try {
      localStorage.setItem(DEST_STORAGE_KEY, destinationPort);
    } catch {
      // ignore
    }
  }, [destinationPort]);

  useEffect(() => {
    try {
      localStorage.setItem(INCOTERM_STORAGE_KEY, incoterm);
    } catch {
      // ignore
    }
  }, [incoterm]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const triggerFlyParticle = (event: React.MouseEvent, imageUrl: string) => {
    const sourceRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const targetRect = cartIconRef.current?.getBoundingClientRect();

    const startX = sourceRect.left + sourceRect.width / 2;
    const startY = sourceRect.top + sourceRect.height / 2;
    const targetX = targetRect ? targetRect.left + targetRect.width / 2 : window.innerWidth - 60;
    const targetY = targetRect ? targetRect.top + targetRect.height / 2 : 40;

    const newParticle: FlyingParticle = {
      id: Date.now() + Math.random(),
      startX,
      startY,
      targetX,
      targetY,
      imageUrl,
    };

    setFlyingParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setFlyingParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 950);
  };

  const addToCart = (
    product: Product,
    quantity: number = 0,
    unit?: QuotationUnit,
    event?: React.MouseEvent,
    variant?: ProductVariant
  ) => {
    if (event) {
      triggerFlyParticle(event, product.imageUrl);
    }

    const resolvedUnit: QuotationUnit = unit || product.baseUnit || 'Kg';
    const itemId = variant ? `${product.id}-${variant.id}` : product.id;
    const itemName = variant ? `${product.name} (${variant.label || variant.volume})` : product.name;
    const itemGradeCode = variant ? variant.gradeCode : product.gradeCode;
    const itemVariantLabel = variant ? (variant.label || variant.volume) : (
      (product.buyingModel === 'fixed_1kg_pack' || product.buyingModel === 'fixed_pack') && product.id !== 'leaf-oil-box-set' ? '1Kg Sealed Pouch' :
      (product.buyingModel === 'gift_pack' || product.id === 'leaf-oil-box-set') ? '4-Bottle Master Set' : 'Bulk Weight'
    );

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + (quantity > 0 ? quantity : 0) }
            : item
        );
      }

      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        variantId: variant?.id,
        variantLabel: itemVariantLabel,
        name: itemName,
        gradeCode: itemGradeCode,
        category: product.category,
        categoryLabel: product.categoryLabel,
        imageUrl: product.imageUrl,
        quantity: Math.max(0, quantity),
        unit: resolvedUnit,
        specs: {
          moisture: product.specs.moisture,
          coumarin: product.specs.coumarin,
          cinnamaldehyde: product.specs.cinnamaldehyde,
          eugenol: product.specs.eugenol,
          diameter: product.specs.diameter,
          meshSize: product.specs.meshSize,
        },
      };

      return [...prev, newItem];
    });
  };

  const addMultipleToCart = (
    payloads: AddToCartPayload[],
    event?: React.MouseEvent
  ) => {
    if (payloads.length === 0) return;

    if (event) {
      triggerFlyParticle(event, payloads[0].product.imageUrl);
    }

    setItems((prev) => {
      let updated = [...prev];

      payloads.forEach(({ product, quantity, unit, variant }) => {
        const resolvedUnit: QuotationUnit = unit || product.baseUnit || 'Kg';
        const itemId = variant ? `${product.id}-${variant.id}` : product.id;
        const itemName = variant ? `${product.name} (${variant.label || variant.volume})` : product.name;
        const itemGradeCode = variant ? variant.gradeCode : product.gradeCode;
        const itemVariantLabel = variant ? (variant.label || variant.volume) : (
          (product.buyingModel === 'fixed_1kg_pack' || product.buyingModel === 'fixed_pack') && product.id !== 'leaf-oil-box-set' ? '1Kg Sealed Pouch' :
          (product.buyingModel === 'gift_pack' || product.id === 'leaf-oil-box-set') ? '4-Bottle Master Set' : 'Bulk Weight'
        );

        const existingIndex = updated.findIndex((item) => item.id === itemId);
        if (existingIndex > -1) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + (quantity > 0 ? quantity : 0),
          };
        } else {
          updated.push({
            id: itemId,
            productId: product.id,
            variantId: variant?.id,
            variantLabel: itemVariantLabel,
            name: itemName,
            gradeCode: itemGradeCode,
            category: product.category,
            categoryLabel: product.categoryLabel,
            imageUrl: product.imageUrl,
            quantity: Math.max(0, quantity),
            unit: resolvedUnit,
            specs: {
              moisture: product.specs.moisture,
              coumarin: product.specs.coumarin,
              cinnamaldehyde: product.specs.cinnamaldehyde,
              eugenol: product.specs.eugenol,
              diameter: product.specs.diameter,
              meshSize: product.specs.meshSize,
            },
          });
        }
      });

      return updated;
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const validQty = isNaN(quantity) ? 0 : Math.max(0, quantity);
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: validQty } : item))
    );
  };

  const updateUnit = (itemId: string, unit: QuotationUnit) => {
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, unit } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalUniqueItems = items.length;
  const totalItemQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  // Compute clear B2B volume / weight / pack estimates
  const totalEstimatedWeightDisplay = (() => {
    if (items.length === 0) return '0 Items';

    let totalKg = 0;
    let totalBottles = 0;
    let totalPacks = 0;
    let totalLiters = 0;

    items.forEach((item) => {
      if (item.unit === 'Kg') {
        totalKg += item.quantity;
      } else if (item.unit === 'Bottles') {
        totalBottles += item.quantity;
      } else if (item.unit === 'Packs') {
        // If it's a 1Kg pack (Powder, Cut pieces), it also represents 1 Kg per pack
        if (item.productId === 'cinnamon-powder-1kg' || item.productId === 'cinnamon-cut-pieces-1kg') {
          totalKg += item.quantity;
          totalPacks += item.quantity;
        } else {
          totalPacks += item.quantity;
        }
      } else if (item.unit === 'L') {
        totalLiters += item.quantity;
      }
    });

    const parts: string[] = [];
    if (totalKg > 0) {
      parts.push(`${totalKg.toLocaleString()} Kg`);
    }
    if (totalBottles > 0) {
      parts.push(`${totalBottles.toLocaleString()} Bottles`);
    }
    if (totalPacks > 0 && totalKg === 0) {
      parts.push(`${totalPacks.toLocaleString()} Packs`);
    } else if (totalPacks > 0 && totalKg > 0) {
      // already counted in totalKg, or add gift packs
      const non1KgPacks = items.filter(i => i.unit === 'Packs' && i.productId !== 'cinnamon-powder-1kg' && i.productId !== 'cinnamon-cut-pieces-1kg')
        .reduce((a, b) => a + b.quantity, 0);
      if (non1KgPacks > 0) {
        parts.push(`${non1KgPacks.toLocaleString()} Gift Packs`);
      }
    }
    if (totalLiters > 0) {
      parts.push(`${totalLiters.toLocaleString()} L`);
    }

    return parts.join(' + ') || '0 Items';
  })();

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        addToCart,
        addMultipleToCart,
        removeFromCart,
        updateQuantity,
        updateUnit,
        clearCart,
        totalUniqueItems,
        totalItemQuantity,
        totalEstimatedWeightDisplay,
        flyingParticles,
        ordererName,
        setOrdererName,
        ordererAddress,
        setOrdererAddress,
        ordererPhone,
        setOrdererPhone,
        destinationPort,
        setDestinationPort,
        incoterm,
        setIncoterm,
        orderNotes,
        setOrderNotes,
        cartIconRef,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
