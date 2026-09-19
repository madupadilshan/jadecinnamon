import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  id: string; // product.id
  productId: string;
  name: string;
  grade?: string;
  gradeCode: string;
  category: string;
  categoryLabel: string;
  imageUrl: string;
  quantity: number;
  unit: 'Kg' | 'MT' | 'L' | 'Bales';
  pricePerKg?: number;
  specs?: {
    moisture?: string;
    coumarin?: string;
    cinnamaldehyde?: string;
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

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    product: Product,
    quantity?: number,
    unit?: 'Kg' | 'MT' | 'L' | 'Bales',
    event?: React.MouseEvent
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateUnit: (productId: string, unit: 'Kg' | 'MT' | 'L' | 'Bales') => void;
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

const CART_STORAGE_KEY = 'jade_cinnamon_b2b_cart_v2';
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
      return localStorage.getItem(DEST_STORAGE_KEY) || 'Port of Hamburg, Germany';
    } catch {
      return 'Port of Hamburg, Germany';
    }
  });

  const [incoterm, setIncoterm] = useState<string>(() => {
    try {
      return localStorage.getItem(INCOTERM_STORAGE_KEY) || 'FOB Colombo & CIF Destination';
    } catch {
      return 'FOB Colombo & CIF Destination';
    }
  });

  const [orderNotes, setOrderNotes] = useState<string>(
    'Require 25kg vacuum packs, private labeling, specific moisture level < 12%'
  );

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

  const addToCart = (
    product: Product,
    quantity: number = 500,
    unit?: 'Kg' | 'MT' | 'L' | 'Bales',
    event?: React.MouseEvent
  ) => {
    const defaultUnit: 'Kg' | 'MT' | 'L' | 'Bales' =
      unit || (product.category === 'oils' ? 'L' : 'Kg');

    // Trigger Anti-Gravity floating clone animation towards Cart Icon
    if (event) {
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
        imageUrl: product.imageUrl,
      };

      setFlyingParticles((prev) => [...prev, newParticle]);

      setTimeout(() => {
        setFlyingParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 950);
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (quantity > 0 ? quantity : 100) }
            : item
        );
      }

      const newItem: CartItem = {
        id: product.id,
        productId: product.id,
        name: product.name,
        grade: product.gradeCode,
        gradeCode: product.gradeCode,
        category: product.category,
        categoryLabel: product.categoryLabel,
        imageUrl: product.imageUrl,
        quantity: quantity > 0 ? quantity : 500,
        unit: defaultUnit,
        specs: {
          moisture: product.specs.moisture,
          coumarin: product.specs.coumarin,
          cinnamaldehyde: product.specs.cinnamaldehyde,
        },
      };

      return [...prev, newItem];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const validQty = Math.max(1, isNaN(quantity) ? 1 : quantity);
    setItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: validQty } : item))
    );
  };

  const updateUnit = (productId: string, unit: 'Kg' | 'MT' | 'L' | 'Bales') => {
    setItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, unit } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalUniqueItems = items.length;
  const totalItemQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  // Compute clean B2B volume / weight estimate
  const totalEstimatedWeightDisplay = (() => {
    if (items.length === 0) return '0 Kg';
    let totalKg = 0;
    let totalLiters = 0;

    items.forEach((item) => {
      if (item.unit === 'MT') {
        totalKg += item.quantity * 1000;
      } else if (item.unit === 'L') {
        totalLiters += item.quantity;
      } else {
        totalKg += item.quantity;
      }
    });

    const parts: string[] = [];
    if (totalKg >= 1000) {
      parts.push(`${(totalKg / 1000).toFixed(2)} MT (~${totalKg.toLocaleString()} Kg)`);
    } else if (totalKg > 0) {
      parts.push(`${totalKg.toLocaleString()} Kg`);
    }
    if (totalLiters > 0) {
      parts.push(`${totalLiters.toLocaleString()} Liters`);
    }

    return parts.join(' + ') || '0 Kg';
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
