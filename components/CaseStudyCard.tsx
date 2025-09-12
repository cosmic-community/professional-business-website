import { CaseStudy } from '@/types'

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const featuredImage = caseStudy.metadata?.featured_image
  const relatedService = caseStudy.metadata?.related_service

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {featuredImage && (
        <div className="h-64 overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={caseStudy.metadata?.project_title || caseStudy.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-secondary-900">
            {caseStudy.metadata?.project_title || caseStudy.title}
          </h3>
          {relatedService && (
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
              {relatedService.metadata?.service_name || relatedService.title}
            </span>
          )}
        </div>
        
        <div className="flex items-center text-sm text-secondary-600 mb-4">
          <span className="font-medium">{caseStudy.metadata?.client_name}</span>
          {caseStudy.metadata?.industry && (
            <>
              <span className="mx-2">•</span>
              <span>{caseStudy.metadata.industry}</span>
            </>
          )}
          {caseStudy.metadata?.project_duration && (
            <>
              <span className="mx-2">•</span>
              <span>{caseStudy.metadata.project_duration}</span>
            </>
          )}
        </div>
        
        <div className="space-y-4 mb-6">
          {caseStudy.metadata?.challenge && (
            <div>
              <h4 className="font-bold text-secondary-900 mb-2">Challenge</h4>
              <p className="text-secondary-600 text-sm">
                {caseStudy.metadata.challenge.replace(/<[^>]*>/g, '').substring(0, 150)}...
              </p>
            </div>
          )}
          
          {caseStudy.metadata?.results && (
            <div>
              <h4 className="font-bold text-secondary-900 mb-2">Results</h4>
              <div className="text-secondary-600 text-sm">
                {caseStudy.metadata.results.includes('<li>') ? (
                  <div dangerouslySetInnerHTML={{ 
                    __html: caseStudy.metadata.results.replace(/<ul>/g, '<ul class="list-disc list-inside space-y-1">').replace(/<li>/g, '<li class="text-sm">') 
                  }} />
                ) : (
                  <p>{caseStudy.metadata.results.replace(/<[^>]*>/g, '').substring(0, 200)}...</p>
                )}
              </div>
            </div>
          )}
        </div>
        
        {caseStudy.metadata?.technologies && caseStudy.metadata.technologies.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold text-secondary-900 mb-2 text-sm">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {caseStudy.metadata.technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
          View Full Case Study
        </button>
      </div>
    </div>
  )
}