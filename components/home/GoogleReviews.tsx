// Placeholder reviews — replace with live Google Places API data when ready

const reviews = [
  {
    name: 'Michael T.',
    rating: 5,
    date: 'March 2025',
    text: "I've been coming here for over 15 years. They designed my wife's engagement ring and we couldn't be happier. The personal attention and quality of work is unmatched anywhere in New Jersey.",
  },
  {
    name: 'Sarah K.',
    rating: 5,
    date: 'January 2025',
    text: 'Best jewelry store in New Jersey. Fair, transparent pricing and they stand behind everything they sell. Had a ring resized perfectly and a diamond reset — both came back flawless.',
  },
  {
    name: 'James R.',
    rating: 5,
    date: 'November 2024',
    text: 'Had a watch serviced and two pieces appraised. Fast turnaround, honest pricing, and the staff actually take the time to explain everything. I won\'t go anywhere else.',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-brand-gold' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function GoogleReviews() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-serif text-xs tracking-[0.3em] uppercase text-brand-gold mb-3">
            What Our Customers Say
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal">
            Client Reviews
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="w-12 h-px bg-brand-gold/50" />
            <div className="w-1 h-1 rounded-full bg-brand-gold/50" />
            <div className="w-12 h-px bg-brand-gold/50" />
          </div>
          {/* Google badge */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-serif text-sm text-gray-500">Google Reviews</span>
            <div className="flex items-center gap-1">
              <StarRating count={5} />
              <span className="font-serif text-sm text-gray-500 ml-1">5.0</span>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.name} className="p-8 border border-gray-100 hover:border-brand-gold/30 transition-colors duration-300">
              <StarRating count={review.rating} />
              <blockquote className="mt-5 font-serif text-sm text-gray-600 leading-relaxed italic">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center justify-between">
                <p className="font-serif text-sm font-semibold text-brand-charcoal">{review.name}</p>
                <p className="font-serif text-xs text-gray-400">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
