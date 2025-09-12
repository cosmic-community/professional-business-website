import { TeamMember } from '@/types'

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const profilePhoto = member.metadata?.profile_photo
  const skills = member.metadata?.skills

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center">
      {profilePhoto && (
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
          <img
            src={`${profilePhoto.imgix_url}?w=192&h=192&fit=crop&auto=format,compress`}
            alt={member.metadata?.full_name || member.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <h3 className="text-xl font-bold text-secondary-900 mb-1">
        {member.metadata?.full_name || member.title}
      </h3>
      
      <p className="text-primary-600 font-medium mb-3">
        {member.metadata?.job_title}
      </p>
      
      {member.metadata?.years_experience && (
        <p className="text-sm text-secondary-600 mb-4">
          {member.metadata.years_experience} years experience
        </p>
      )}
      
      {member.metadata?.bio && (
        <p className="text-secondary-600 text-sm mb-4 line-clamp-3">
          {member.metadata.bio.replace(/<[^>]*>/g, '').substring(0, 150)}...
        </p>
      )}
      
      {skills && skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-center space-x-3">
        {member.metadata?.email && (
          <a
            href={`mailto:${member.metadata.email}`}
            className="text-secondary-400 hover:text-primary-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </a>
        )}
        {member.metadata?.linkedin_url && (
          <a
            href={member.metadata.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-400 hover:text-primary-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}