'use client'

import { Service } from '@/types'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/cart'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(service, 1)
  }

  // Safely access nested properties
  const serviceName = service.metadata?.service_name || service.title
  const shortDescription = service.metadata?.short_description
  const startingPrice = service.metadata?.starting_price
  const priceAmount = service.metadata?.price_amount
  const duration = service.metadata?.duration
  const features = service.metadata?.features || []
  const isOrderable = service.metadata?.is_orderable || false
  const requiresConsultation = service.metadata?.requires_consultation || false
  
  // Handle service category safely
  const categoryValue = service.metadata?.service_category && typeof service.metadata.service_category === 'object' 
    ? service.metadata.service_category.value 
    : service.metadata?.service_category || ''

  // Handle pricing type safely  
  const pricingTypeValue = service.metadata?.pricing_type && typeof service.metadata.pricing_type === 'object'
    ? service.metadata.pricing_type.value
    : service.metadata?.pricing_type || ''

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      {service.metadata?.service_icon && (
        <div className="w-12 h-12 mb-4">
          <img
            src={`${service.metadata.service_icon.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
            alt={serviceName}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-secondary-900 mb-2">
            {serviceName}
          </h3>
          {categoryValue && (
            <span className="inline-block bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm font-medium">
              {categoryValue}
            </span>
          )}
        </div>
        {(startingPrice || priceAmount) && (
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              {startingPrice || (priceAmount ? formatPrice(priceAmount) : '')}
            </div>
            {pricingTypeValue && (
              <div className="text-sm text-secondary-500">{pricingTypeValue}</div>
            )}
          </div>
        )}
      </div>

      {shortDescription && (
        <p className="text-secondary-600 mb-4 line-clamp-3">
          {shortDescription}
        </p>
      )}

      {duration && (
        <div className="mb-4">
          <span className="text-sm font-medium text-secondary-700">Duration: </span>
          <span className="text-sm text-secondary-600">{duration}</span>
        </div>
      )}

      {Array.isArray(features) && features.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-secondary-900 mb-2">Features:</h4>
          <ul className="text-sm text-secondary-600 space-y-1">
            {features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
            {features.length > 4 && (
              <li className="text-primary-600 text-sm">
                +{features.length - 4} more features
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {requiresConsultation ? (
          <button className="w-full bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
            Request Consultation
          </button>
        ) : isOrderable ? (
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Add to Cart
          </button>
        ) : (
          <button className="w-full bg-secondary-400 text-white px-4 py-2 rounded-lg font-medium cursor-not-allowed">
            Coming Soon
          </button>
        )}
        
        <button className="w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
          Learn More
        </button>
      </div>
    </div>
  )
}