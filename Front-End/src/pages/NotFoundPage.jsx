import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-frag-cream flex flex-col items-center justify-center px-6 text-center pt-24 pb-20">
      {/* Decorative circle */}
      <div className="w-24 h-24 rounded-full border border-frag-border flex items-center justify-center mb-8">
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 32, color: '#C9A96E' }}>?</span>
      </div>

      <p className="text-xs tracking-widest text-frag-gray uppercase mb-4">404 — Page Not Found</p>

      <h1 style={{ fontFamily: 'Georgia, serif' }}
        className="text-4xl md:text-5xl font-normal text-frag-dark mb-5 leading-tight">
        This Page Has<br />
        <span style={{ fontStyle: 'italic', color: '#C9A96E' }}>Drifted Away.</span>
      </h1>

      <p className="text-frag-gray text-sm max-w-sm leading-relaxed mb-10">
        The page you're looking for doesn't exist or may have been moved.
        Return home and continue your journey.
      </p>

      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-frag-dark text-white text-sm font-medium px-7 py-3 rounded-full hover:bg-frag-dark/90 transition-colors"
        >
          Back to Home
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <Link
          to="/info/shop-all"
          className="inline-flex items-center gap-2 border border-frag-border text-frag-dark text-sm font-medium px-7 py-3 rounded-full hover:bg-white transition-colors"
        >
          Shop Collection
        </Link>
      </div>
    </div>
  );
}
