'use client'

import { useState, useEffect } from 'react'
import { CartState, CartItem, Service } from '@/types'
import { 
  getCartFromStorage, 
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  updateQuantity as updateQuantityUtil,
  clearCart as clearCartUtil
} from '@/lib/cart'

export function useCart() {
  const [cart, setCart] = useState<CartState>({ items: [], total: 0, itemCount: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from storage on mount
  useEffect(() => {
    const storedCart = getCartFromStorage();
    setCart(storedCart);
    setIsLoading(false);
  }, []);

  const addToCart = (service: Service, quantity: number = 1, notes?: string) => {
    const updatedCart = addToCartUtil(service, quantity, notes);
    setCart(updatedCart);
  };

  const removeFromCart = (serviceId: string) => {
    const updatedCart = removeFromCartUtil(serviceId);
    setCart(updatedCart);
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    const updatedCart = updateQuantityUtil(serviceId, quantity);
    setCart(updatedCart);
  };

  const clearCart = () => {
    const updatedCart = clearCartUtil();
    setCart(updatedCart);
  };

  const isInCart = (serviceId: string): boolean => {
    return cart.items.some(item => item.service.id === serviceId);
  };

  const getItemQuantity = (serviceId: string): number => {
    const item = cart.items.find(item => item.service.id === serviceId);
    return item ? item.quantity : 0;
  };

  return {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity
  };
}