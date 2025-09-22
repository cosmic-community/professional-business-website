'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { Service } from '@/types'
import { formatPrice } from '@/lib/cart'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { addToCart, isInCart, getItemQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  const handleAddToCart = () => {
    addToCart(service, quantity, notes)
    setQuantity(1)
    setNotes('')
  }

  const price = service.metadata?.price_amount
  const startingPrice = service.metadata?.starting_price
  const serviceName = service.metadata?.service_name || service.title
  const shortDescription = service.metadata?.short_description
  const features = service.metadata?.features || []
  const duration = service.metadata?.duration
  const categoryValue = service.metadata?.service_category
  const pricingTypeValue = service.metadata?.pricing_type
  const isOrderable = service.metadata?.is_orderable
  const requiresConsultation = service.metadata?.requires_consultation
  const minQuantity = service.metadata?.minimum_quantity || 1
  const maxQuantity = service.metadata?.maximum_quantity

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-secondary-900 mb-2">{serviceName}</h3>
            <p className="text-secondary-600 mb-3">{shortDescription}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {categoryValue && (
                <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                  {categoryValue}
                </span>
              )}
              {pricingTypeValue && (
                <span className="px-3 py-1 bg-secondary-100 text-secondary-800 text-sm rounded-full">
                  {pricingTypeValue}
                </span>
              )}
              {duration && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {duration}
                </span>
              )}
            </div>
          </div>

          {service.metadata?.service_icon && (
            <img
              src={`${service.metadata.service_icon.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
              alt={serviceName}
              className="w-16 h-16 object-cover rounded-lg ml-4 flex-shrink-0"
            />
          )}
        </div>

        <div className="mb-4">
          {price && price > 0 ? (
            <div className="text-2xl font-bold text-primary-600">
              {formatPrice(price)}
            </div>
          ) : startingPrice ? (
            <div className="text-2xl font-bold text-primary-600">
              {startingPrice}
            </div>
          ) : (
            <div className="text-xl font-medium text-secondary-600">
              Contact for Pricing
            </div>
          )}
        </div>

        {features && Array.isArray(features) && features.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
            >
              {showDetails ? 'Hide' : 'Show'} Features
              <svg
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDetails && (
              <ul className="mt-2 space-y-1">
                {features.map((feature, index) => (
                  <li key={index} className="text-sm text-secondary-600 flex items-start">
                    <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {requiresConsultation && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Consultation Required:</span> This service requires a consultation before ordering.
            </p>
          </div>
        )}

        {isOrderable && price && price > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor={`quantity-${service.id}`} className="block text-sm font-medium text-secondary-700 mb-1">
                  Quantity
                </label>
                <select
                  id={`quantity-${service.id}`}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-secondary-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {Array.from({ length: Math.min((maxQuantity || 10) - minQuantity + 1, 10) }, (_, i) => {
                    const value = minQuantity + i
                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className="text-sm text-secondary-600">
                <div>Total: <span className="font-medium">{formatPrice(price * quantity)}</span></div>
                {isInCart(service.id) && (
                  <div className="text-green-600">In cart: {getItemQuantity(service.id)}</div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor={`notes-${service.id}`} className="block text-sm font-medium text-secondary-700 mb-1">
                Special Requirements (Optional)
              </label>
              <textarea
                id={`notes-${service.id}`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Any specific requirements or notes for this service..."
                className="w-full border border-secondary-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        )}

        <div className="mt-6">
          {isOrderable && price && price > 0 ? (
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
            >
              Add to Cart
            </button>
          ) : (
            <button
              onClick={() => {
                // Scroll to contact form or open contact modal
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
            >
              Get Quote
            </button>
          )}
        </div>
      </div>
    </div>
  )
}