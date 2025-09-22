import { Service } from '@/types'
import { useCart } from '@/hooks/useCart'
import { useState } from 'react'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [notes, setNotes] = useState('');

  // Safe function to get category display value
  const getCategoryDisplay = (category: any): string => {
    if (!category) return '';
    if (typeof category === 'object' && category.value) {
      return category.value;
    }
    if (typeof category === 'string') {
      return category;
    }
    return '';
  };

  // Safe function to get pricing type display value
  const getPricingTypeDisplay = (pricingType: any): string => {
    if (!pricingType) return '';
    if (typeof pricingType === 'object' && pricingType.value) {
      return pricingType.value;
    }
    if (typeof pricingType === 'string') {
      return pricingType;
    }
    return '';
  };

  const categoryDisplay = getCategoryDisplay(service.metadata?.service_category);
  const pricingTypeDisplay = getPricingTypeDisplay(service.metadata?.pricing_type);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      addToCart(service, 1, notes);
      setNotes(''); // Clear notes after adding
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const currentQuantity = getItemQuantity(service.id);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
      {/* Service Icon */}
      {service.metadata?.service_icon?.imgix_url && (
        <div className="p-6 pb-4">
          <img
            src={`${service.metadata.service_icon.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
            alt={service.metadata?.service_name || service.title}
            width={60}
            height={60}
            className="w-15 h-15 object-contain"
          />
        </div>
      )}

      <div className="p-6 pt-2 flex-1 flex flex-col">
        {/* Category Badge */}
        {categoryDisplay && (
          <div className="inline-block mb-3">
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
              {categoryDisplay}
            </span>
          </div>
        )}

        {/* Service Name */}
        <h3 className="text-xl font-bold text-secondary-900 mb-3">
          {service.metadata?.service_name || service.title}
        </h3>

        {/* Short Description */}
        {service.metadata?.short_description && (
          <p className="text-secondary-600 mb-4 flex-1">
            {service.metadata.short_description}
          </p>
        )}

        {/* Features */}
        {service.metadata?.features && Array.isArray(service.metadata.features) && service.metadata.features.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-secondary-900 mb-2">Features:</h4>
            <ul className="text-sm text-secondary-600 space-y-1">
              {service.metadata.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
              {service.metadata.features.length > 3 && (
                <li className="text-primary-600 text-sm">
                  +{service.metadata.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Pricing */}
        <div className="mb-4">
          {service.metadata?.starting_price ? (
            <div className="text-2xl font-bold text-primary-600">
              {service.metadata.starting_price}
            </div>
          ) : service.metadata?.price_amount ? (
            <div className="text-2xl font-bold text-primary-600">
              ${service.metadata.price_amount.toLocaleString()}
            </div>
          ) : null}
          
          {pricingTypeDisplay && (
            <div className="text-sm text-secondary-600">{pricingTypeDisplay}</div>
          )}
          
          {service.metadata?.duration && (
            <div className="text-sm text-secondary-500">Duration: {service.metadata.duration}</div>
          )}
        </div>

        {/* Notes Input */}
        <div className="mb-4">
          <label htmlFor={`notes-${service.id}`} className="block text-sm font-medium text-secondary-700 mb-1">
            Special Requirements (Optional)
          </label>
          <textarea
            id={`notes-${service.id}`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any specific requirements or notes..."
            rows={2}
            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 text-sm"
          />
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          {service.metadata?.is_orderable ? (
            <div>
              {currentQuantity > 0 ? (
                <div className="text-center">
                  <div className="text-sm text-green-600 font-medium mb-2">
                    ✓ Added to cart ({currentQuantity})
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      isAdding
                        ? 'bg-secondary-400 cursor-not-allowed text-white'
                        : 'bg-secondary-600 hover:bg-secondary-700 text-white'
                    }`}
                  >
                    {isAdding ? 'Adding...' : 'Add Another'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    isAdding
                      ? 'bg-primary-400 cursor-not-allowed text-white'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
                </button>
              )}
            </div>
          ) : (
            <button
              className="w-full py-3 px-4 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg font-medium transition-colors duration-200"
              onClick={() => {
                // Scroll to contact section or open contact modal
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#contact';
                }
              }}
            >
              Get Quote
            </button>
          )}
        </div>
      </div>
    </div>
  )
}