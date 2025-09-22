import Hero from '@/components/Hero'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CaseStudiesSection from '@/components/CaseStudiesSection'
import TeamSection from '@/components/TeamSection'
import CTASection from '@/components/CTASection'
import CosmicBadge from '@/components/CosmicBadge'

export default function HomePage() {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <main>
      <Hero />
      <ServicesSection />
      <TestimonialsSection />
      <CaseStudiesSection />
      <TeamSection />
      <CTASection />
      <CosmicBadge bucketSlug={bucketSlug} />
    </main>
  )
}