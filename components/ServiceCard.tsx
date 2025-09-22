'use client'

import { Service } from '@/types'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/cart'
import { useState } from 'react'

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const serviceIcon = service.metadata?.service_icon;
  const features = service.metadata?.features;
  const priceAmount = service.metadata?.price_amount || 0;
  const startingPrice = service.metadata?.starting_price;
  const pricingType = service.metadata?.pricing_type;
  const isOrderable = service.metadata?.is_orderable;
  const requiresConsultation = service.metadata?.requires_consultation;
  const minQuantity = service.metadata?.minimum_quantity || 1;
  const maxQuantity = service.metadata?.maximum_quantity;
  
  const handleAddToCart = async () => {
    if (!isOrderable) return;
    
    setIsAdding(true);
    addToCart(service, minQuantity);
    
    // Add a small delay for better UX
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const inCart = isInCart(service.id);
  const quantity = getItemQuantity(service.id);

  // Determine pricing display
  const getPricingDisplay = () => {
    if (priceAmount > 0) {
      switch (pricingType) {
        case 'Hourly Rate':
          return `${formatPrice(priceAmount)}/hour`;
        case 'Monthly Subscription':
          return `${formatPrice(priceAmount)}/month`;
        case 'Fixed Price':
          return formatPrice(priceAmount);
        default:
          return formatPrice(priceAmount);
      }
    } else if (startingPrice) {
      return `Starting at ${startingPrice}`;
    } else {
      return 'Contact for pricing';
    }
  };

  // Determine button text and action
  const getButtonConfig = () => {
    if (!isOrderable || pricingType === 'Custom Quote') {
      return {
        text: requiresConsultation ? 'Schedule Consultation' : 'Get Quote',
        action: () => {/* Handle consultation/quote request */},
        variant: 'secondary'
      };
    }

    if (inCart) {
      return {
        text: (
          <span className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Added to Cart ({quantity})
          </span>
        ),
        action: handleAddToCart,
        variant: 'success'
      };
    }

    if (isAdding) {
      return {
        text: (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </span>
        ),
        action: () => {},
        variant: 'loading'
      };
    }

    return {
      text: minQuantity > 1 ? `Add ${minQuantity} to Cart` : 'Add to Cart',
      action: handleAddToCart,
      variant: 'primary'
    };
  };

  const buttonConfig = getButtonConfig();

  const getButtonClasses = (variant: string) => {
    const baseClasses = "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200";
    
    switch (variant) {
      case 'success':
        return `${baseClasses} bg-green-600 hover:bg-green-700 text-white`;
      case 'secondary':
        return `${baseClasses} bg-secondary-600 hover:bg-secondary-700 text-white`;
      case 'loading':
        return `${baseClasses} bg-primary-600 text-white opacity-75 cursor-not-allowed`;
      default:
        return `${baseClasses} bg-primary-600 hover:bg-primary-700 text-white`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-secondary-100">
      {serviceIcon && (
        <div className="w-16 h-16 mb-6 rounded-lg overflow-hidden">
          <img
            src={`${serviceIcon.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
            alt={service.metadata?.service_name || service.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-xl font-bold text-secondary-900">
          {service.metadata?.service_name || service.title}
        </h3>
        {service.metadata?.service_category && (
          <span className="bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded-full">
            {service.metadata.service_category}
          </span>
        )}
      </div>
      
      <p className="text-secondary-600 mb-4">
        {service.metadata?.short_description || service.metadata?.description?.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
      </p>
      
      <div className="mb-4">
        <div className="text-2xl font-bold text-primary-600">
          {getPricingDisplay()}
        </div>
        {service.metadata?.duration && (
          <div className="text-sm text-secondary-500 mt-1">
            Duration: {service.metadata.duration}
          </div>
        )}
        {requiresConsultation && (
          <div className="text-sm text-amber-600 mt-1 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Consultation required
          </div>
        )}
      </div>
      
      {features && features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-secondary-700">
              <svg className="w-4 h-4 text-primary-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
          {features.length > 3 && (
            <li className="text-sm text-secondary-500 ml-6">
              +{features.length - 3} more features
            </li>
          )}
        </ul>
      )}
      
      <div className="space-y-2">
        <button
          onClick={buttonConfig.action}
          disabled={isAdding}
          className={getButtonClasses(buttonConfig.variant)}
        >
          {buttonConfig.text}
        </button>
        
        <button className="w-full bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 py-3 px-4 rounded-lg font-medium transition-colors duration-200">
          Learn More
        </button>
      </div>
    </div>
  )
}