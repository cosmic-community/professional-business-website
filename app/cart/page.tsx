'use client'

import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/cart'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, isLoading } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-secondary-600">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <svg className="mx-auto h-24 w-24 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L3 3z" />
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-secondary-900">Your cart is empty</h2>
            <p className="mt-2 text-secondary-600">Start by adding some services to your cart.</p>
            <Link
              href="/#services"
              className="mt-6 inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Shopping Cart</h1>
          <p className="mt-2 text-secondary-600">{cart.itemCount} service{cart.itemCount !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="divide-y divide-secondary-200">
            {cart.items.map((item) => (
              <div key={item.service.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4 flex-1">
                    {item.service.metadata?.service_icon && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={`${item.service.metadata.service_icon.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                          alt={item.service.metadata?.service_name || item.service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-secondary-900">
                        {item.service.metadata?.service_name || item.service.title}
                      </h3>
                      <p className="text-secondary-600 mt-1">
                        {item.service.metadata?.short_description}
                      </p>
                      {item.service.metadata?.duration && (
                        <p className="text-sm text-secondary-500 mt-1">
                          Duration: {item.service.metadata.duration}
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-sm text-secondary-600 mt-2 bg-secondary-50 p-2 rounded">
                          <strong>Notes:</strong> {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-secondary-900">
                      {formatPrice((item.service.metadata?.price_amount || 0) * item.quantity)}
                    </div>
                    <div className="text-sm text-secondary-500">
                      {formatPrice(item.service.metadata?.price_amount || 0)} each
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <label className="text-sm font-medium text-secondary-700">Quantity:</label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-secondary-200 hover:bg-secondary-300 flex items-center justify-center text-secondary-700 transition-colors duration-200"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-secondary-200 hover:bg-secondary-300 flex items-center justify-center text-secondary-700 transition-colors duration-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.service.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-secondary-50 p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-secondary-900">Total:</span>
              <span className="text-2xl font-bold text-primary-600">{formatPrice(cart.total)}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/#services"
                className="flex-1 bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-6 rounded-lg font-medium text-center transition-colors duration-200"
              >
                Continue Shopping
              </Link>
              <Link
                href="/checkout"
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium text-center transition-colors duration-200"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}