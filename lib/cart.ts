'use client'

import { CartItem, CartState, Service } from '@/types'

const CART_STORAGE_KEY = 'business-cart'

// Get cart from localStorage
export function getCartFromStorage(): CartState {
  if (typeof window === 'undefined') {
    return { items: [], total: 0, itemCount: 0 };
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return { items: [], total: 0, itemCount: 0 };
    }

    const cartData = JSON.parse(stored);
    return {
      items: cartData.items || [],
      total: calculateTotal(cartData.items || []),
      itemCount: calculateItemCount(cartData.items || [])
    };
  } catch {
    return { items: [], total: 0, itemCount: 0 };
  }
}

// Save cart to localStorage
export function saveCartToStorage(cart: CartState): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart to storage:', error);
  }
}

// Calculate cart total
export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const price = item.service.metadata?.price_amount || 0;
    return sum + (price * item.quantity);
  }, 0);
}

// Calculate total item count
export function calculateItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

// Add service to cart
export function addToCart(service: Service, quantity: number = 1, notes?: string): CartState {
  const currentCart = getCartFromStorage();
  const existingItemIndex = currentCart.items.findIndex(item => item.service.id === service.id);

  let updatedItems: CartItem[];
  
  if (existingItemIndex >= 0) {
    // Update existing item
    updatedItems = currentCart.items.map((item, index) => 
      index === existingItemIndex 
        ? { ...item, quantity: item.quantity + quantity, notes: notes || item.notes }
        : item
    );
  } else {
    // Add new item
    updatedItems = [...currentCart.items, { service, quantity, notes }];
  }

  const updatedCart = {
    items: updatedItems,
    total: calculateTotal(updatedItems),
    itemCount: calculateItemCount(updatedItems)
  };

  saveCartToStorage(updatedCart);
  return updatedCart;
}

// Remove service from cart
export function removeFromCart(serviceId: string): CartState {
  const currentCart = getCartFromStorage();
  const updatedItems = currentCart.items.filter(item => item.service.id !== serviceId);

  const updatedCart = {
    items: updatedItems,
    total: calculateTotal(updatedItems),
    itemCount: calculateItemCount(updatedItems)
  };

  saveCartToStorage(updatedCart);
  return updatedCart;
}

// Update item quantity
export function updateQuantity(serviceId: string, quantity: number): CartState {
  const currentCart = getCartFromStorage();
  
  if (quantity <= 0) {
    return removeFromCart(serviceId);
  }

  const updatedItems = currentCart.items.map(item => 
    item.service.id === serviceId 
      ? { ...item, quantity }
      : item
  );

  const updatedCart = {
    items: updatedItems,
    total: calculateTotal(updatedItems),
    itemCount: calculateItemCount(updatedItems)
  };

  saveCartToStorage(updatedCart);
  return updatedCart;
}

// Clear entire cart
export function clearCart(): CartState {
  const emptyCart = { items: [], total: 0, itemCount: 0 };
  saveCartToStorage(emptyCart);
  return emptyCart;
}

// Format price for display
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}