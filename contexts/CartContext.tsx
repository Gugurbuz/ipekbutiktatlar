import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

export interface CartItem extends Product {
  cartId: string; // Benzersiz ID (aynı üründen 2 tane olabilir)
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (cartId: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sayfa yenilendiğinde sepeti hatırla (LocalStorage)
  useEffect(() => {
    const savedCart = localStorage.getItem('ipek_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ipek_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const newItem: CartItem = {
      ...product,
      cartId: `${product.id}-${Date.now()}`,
      quantity: 1
    };
    setCart(prev => [...prev, newItem]);
    setIsCartOpen(true); // Ürün eklenince sepeti aç
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const cartTotal = cart.reduce((total, item) => {
    // Fiyat string olduğu için (örn: "1200 TL") sayıya çeviriyoruz
    const price = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
    return total + price;
  }, 0);

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      addToCart,
      removeFromCart,
      toggleCart,
      clearCart,
      cartTotal,
      cartCount: cart.length
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};