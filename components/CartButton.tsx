'use client'

import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function CartButton() {
  const { cart } = useCart();

  return (
    <Link href="/cart" className="relative">
      <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
        <ShoppingCart className="w-5 h-5" />
        <span>Cart</span>
        {cart.itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.itemCount}
          </span>
        )}
      </button>
    </Link>
  );
}