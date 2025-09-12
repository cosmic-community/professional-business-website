import Link from 'next/link'

export default function CTASection() {
  return (
    <section id="contact" className="py-20 bg-primary-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl text-primary-100 mb-8">
          Let's discuss how our expert team can help you achieve your business goals. 
          Get started with a free consultation today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#services"
            className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 inline-block"
          >
            Get Free Consultation
          </Link>
          <Link
            href="#team"
            className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 inline-block"
          >
            Meet Our Team
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-primary-100">Projects Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-primary-100">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-primary-100">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}