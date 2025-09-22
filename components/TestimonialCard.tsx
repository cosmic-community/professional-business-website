import { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

// Helper function to render stars
const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => {
    const filled = index < rating
    return (
      <svg
        key={index}
        className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-secondary-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          clipRule="evenodd"
        />
      </svg>
    )
  })
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const ratingNumber = testimonial.metadata?.rating?.key ? parseInt(testimonial.metadata.rating.key) : 5
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center mb-4">
        <div className="flex text-yellow-400">
          {renderStars(ratingNumber)}
        </div>
      </div>
      
      <blockquote className="text-secondary-700 mb-6">
        "{testimonial.metadata?.testimonial}"
      </blockquote>
      
      <div className="flex items-center">
        {testimonial.metadata?.client_photo && (
          <img
            src={`${testimonial.metadata.client_photo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
            alt={testimonial.metadata?.client_name || 'Client'}
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
        )}
        <div>
          <div className="font-medium text-secondary-900">
            {testimonial.metadata?.client_name}
          </div>
          {testimonial.metadata?.position && testimonial.metadata?.company && (
            <div className="text-sm text-secondary-600">
              {testimonial.metadata.position} at {testimonial.metadata.company}
            </div>
          )}
          {testimonial.metadata?.project_type && (
            <div className="text-xs text-primary-600 mt-1">
              {testimonial.metadata.project_type}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}