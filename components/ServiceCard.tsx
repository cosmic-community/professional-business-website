'use client'

import { Service } from '@/types'
import { useCart } from '@/hooks/useCart'
import { useState } from 'react'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { addToCart, isInCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    if (!service.metadata?.is_orderable || isInCart(service.id)) return
    
    setIsAdding(true)
    addToCart(service)
    
    // Reset button state after animation
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  const isOrderable = service.metadata?.is_orderable
  const inCart = isInCart(service.id)
  const serviceName = service.metadata?.service_name || service.title
  const shortDescription = service.metadata?.short_description
  const startingPrice = service.metadata?.starting_price
  const features = service.metadata?.features || []
  const serviceIcon = service.metadata?.service_icon

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-secondary-100 transition-all duration-300 hover:shadow-xl hover:border-primary-200">
      {/* Service Icon */}
      {serviceIcon?.imgix_url && (
        <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
          <img
            src={`${serviceIcon.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={serviceName}
            className="w-20 h-20 object-cover rounded-lg"
            width="80"
            height="80"
          />
        </div>
      )}

      <div className="p-6">
        {/* Service Name */}
        <h3 className="text-xl font-bold text-secondary-900 mb-2">
          {serviceName}
        </h3>

        {/* Short Description */}
        {shortDescription && (
          <p className="text-secondary-600 mb-4 leading-relaxed">
            {shortDescription}
          </p>
        )}

        {/* Features */}
        {features.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-secondary-800 mb-2">What's Included:</h4>
            <ul className="space-y-1">
              {features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-secondary-600">
                  <svg className="w-4 h-4 text-primary-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
              {features.length > 4 && (
                <li className="text-sm text-secondary-500 ml-6">
                  +{features.length - 4} more features
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Pricing */}
        <div className="mb-6">
          {startingPrice ? (
            <div className="text-2xl font-bold text-primary-600">
              {startingPrice}
            </div>
          ) : (
            <div className="text-2xl font-bold text-primary-600">
              Custom Quote
            </div>
          )}
          {service.metadata?.duration && (
            <div className="text-sm text-secondary-500">
              Duration: {service.metadata.duration}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="space-y-2">
          {isOrderable ? (
            <button
              onClick={handleAddToCart}
              disabled={inCart || isAdding}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                inCart
                  ? 'bg-green-100 text-green-800 cursor-not-allowed'
                  : isAdding
                  ? 'bg-primary-500 text-white cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg'
              }`}
            >
              {inCart ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Added to Cart
                </span>
              ) : isAdding ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </span>
              ) : (
                'Add to Cart'
              )}
            </button>
          ) : (
            <button
              className="w-full py-3 px-4 rounded-lg font-medium bg-secondary-100 text-secondary-600 cursor-not-allowed"
              disabled
            >
              Contact for Quote
            </button>
          )}
          
          {service.metadata?.requires_consultation && (
            <div className="text-xs text-center text-secondary-500">
              Consultation required before starting
            </div>
          )}
        </div>
      </div>
    </div>
  )
}