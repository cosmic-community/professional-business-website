import { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const clientPhoto = testimonial.metadata?.client_photo
  const rating = testimonial.metadata?.rating
  
  // Convert rating key to number for star display
  const ratingNumber = rating ? parseInt(rating.key) : 5

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-secondary-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          clipRule="evenodd"
        />
      </svg>
    ))
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-secondary-100">
      <div className="flex text-yellow-400 mb-4">
        {renderStars(ratingNumber)}
      </div>
      
      <blockquote className="text-secondary-700 mb-6 italic">
        "{testimonial.metadata?.testimonial}"
      </blockquote>
      
      <div className="flex items-center">
        {clientPhoto && (
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
            <img
              src={`${clientPhoto.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
              alt={testimonial.metadata?.client_name || ''}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div>
          <div className="font-bold text-secondary-900">
            {testimonial.metadata?.client_name}
          </div>
          {testimonial.metadata?.position && testimonial.metadata?.company && (
            <div className="text-sm text-secondary-600">
              {testimonial.metadata.position}, {testimonial.metadata.company}
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