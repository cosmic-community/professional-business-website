import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-secondary-100 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
            Transform Your Business with
            <span className="text-primary-600 block">Expert Solutions</span>
          </h1>
          <p className="text-xl text-secondary-700 mb-8 max-w-3xl mx-auto">
            We help businesses grow with strategic consulting, modern web development, 
            and data-driven digital marketing. Let our experienced team take your company to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#services"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 inline-block"
            >
              Explore Our Services
            </Link>
            <Link
              href="#case-studies"
              className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 inline-block"
            >
              View Case Studies
            </Link>
          </div>
        </div>
        
        <div className="mt-16 animate-slide-up">
          <img
            src="https://imgix.cosmicjs.com/a6cc2d60-8fa5-11f0-8dcc-651091f6a7c0-photo-1461749280684-dccba630e2f6-1757660207780.jpg?w=1200&h=600&fit=crop&auto=format,compress"
            alt="Professional team working on business solutions"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}