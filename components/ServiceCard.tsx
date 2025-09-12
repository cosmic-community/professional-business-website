import { Service } from '@/types'

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const serviceIcon = service.metadata?.service_icon
  const features = service.metadata?.features

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
      
      <h3 className="text-xl font-bold text-secondary-900 mb-3">
        {service.metadata?.service_name || service.title}
      </h3>
      
      <p className="text-secondary-600 mb-4">
        {service.metadata?.short_description || service.metadata?.description?.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
      </p>
      
      {service.metadata?.starting_price && (
        <div className="text-2xl font-bold text-primary-600 mb-4">
          Starting at {service.metadata.starting_price}
        </div>
      )}
      
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
        </ul>
      )}
      
      <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
        Learn More
      </button>
    </div>
  )
}