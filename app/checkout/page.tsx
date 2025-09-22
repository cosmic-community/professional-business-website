'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/cart'
import { CheckoutFormData } from '@/types'

export default function CheckoutPage() {
  const { cart, clearCart, isLoading } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    billing_address: {
      street: '',
      city: '',
      state: '',
      zip_code: '',
      country: 'United States'
    },
    preferred_contact_method: 'Email',
    project_timeline: 'ASAP',
    notes: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && cart.items.length === 0) {
      router.push('/cart');
    }
  }, [mounted, isLoading, cart.items.length, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name.startsWith('billing_')) {
      const field = name.replace('billing_', '');
      setFormData(prev => ({
        ...prev,
        billing_address: {
          ...prev.billing_address,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          cartItems: cart.items
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const { order } = await response.json();
      
      // Clear cart after successful order
      clearCart();
      
      // Redirect to success page
      router.push(`/order-success?order=${order.metadata.order_number}`);
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-secondary-600">Loading checkout...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Checkout</h1>
          <p className="mt-2 text-secondary-600">Complete your order details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-secondary-900 mb-6">Contact Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customer_name" className="block text-sm font-medium text-secondary-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    required
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="customer_email" className="block text-sm font-medium text-secondary-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="customer_email"
                    name="customer_email"
                    required
                    value={formData.customer_email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="customer_phone" className="block text-sm font-medium text-secondary-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="customer_phone"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium text-secondary-900 mb-4">Billing Address</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="billing_street" className="block text-sm font-medium text-secondary-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="billing_street"
                      name="billing_street"
                      required
                      value={formData.billing_address.street}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="billing_city" className="block text-sm font-medium text-secondary-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        id="billing_city"
                        name="billing_city"
                        required
                        value={formData.billing_address.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="billing_state" className="block text-sm font-medium text-secondary-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        id="billing_state"
                        name="billing_state"
                        required
                        value={formData.billing_address.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="billing_zip_code" className="block text-sm font-medium text-secondary-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="billing_zip_code"
                        name="billing_zip_code"
                        required
                        value={formData.billing_address.zip_code}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferred_contact_method" className="block text-sm font-medium text-secondary-700 mb-1">
                    Preferred Contact Method
                  </label>
                  <select
                    id="preferred_contact_method"
                    name="preferred_contact_method"
                    value={formData.preferred_contact_method}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="project_timeline" className="block text-sm font-medium text-secondary-700 mb-1">
                    Project Timeline
                  </label>
                  <select
                    id="project_timeline"
                    name="project_timeline"
                    value={formData.project_timeline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  >
                    <option value="ASAP">ASAP</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-secondary-700 mb-1">
                  Project Notes or Requirements
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project, specific requirements, or any questions you have..."
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-secondary-400 cursor-not-allowed text-white'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Order...
                  </span>
                ) : (
                  'Submit Order'
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-secondary-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.service.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-secondary-900">
                      {item.service.metadata?.service_name || item.service.title}
                    </h3>
                    <p className="text-sm text-secondary-600">Quantity: {item.quantity}</p>
                    {item.service.metadata?.duration && (
                      <p className="text-sm text-secondary-500">Duration: {item.service.metadata.duration}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-secondary-900">
                      {formatPrice((item.service.metadata?.price_amount || 0) * item.quantity)}
                    </div>
                    <div className="text-sm text-secondary-500">
                      {formatPrice(item.service.metadata?.price_amount || 0)} each
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-secondary-200 mt-6 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-secondary-900">Total:</span>
                <span className="text-2xl font-bold text-primary-600">{formatPrice(cart.total)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
              <h3 className="font-medium text-secondary-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-secondary-600 space-y-1">
                <li>• We'll review your order and project requirements</li>
                <li>• Our team will contact you within 24 hours</li>
                <li>• We'll discuss project details and timeline</li>
                <li>• Payment and project kickoff will be arranged</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}