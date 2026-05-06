import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import contentData from '../data/contentData';
import Footer from '../components/Footer';

// ─── Loading Skeleton ───
function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-frag-border rounded-lg ${className}`} />
  );
}

// ─── Image with lazy + fallback ───
function LazyImage({ src, alt, className = '', style = {} }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const fallback = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="relative overflow-hidden w-full h-full">
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <img
        src={error ? fallback : src}
        alt={alt}
        loading="lazy"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true); }}
        className={`${className} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={style}
      />
    </div>
  );
}

export default function ContentDetailView() {
  const { slug } = useParams();
  const [visible, setVisible] = useState(false);

  const data = contentData[slug];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, [slug]);

  // ── Redirect unknown slugs → 404 ──
  if (!data) return <Navigate to="/404" replace />;

  const hasGallery = data.gallery && data.gallery.length > 0;

  return (
    <>
      {/* ── HERO SECTION ── */}
      <div className="relative w-full overflow-hidden" style={{ height: '70vh', minHeight: 480 }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <LazyImage
            src={data.heroImage}
            alt={data.title}
            className="w-full h-full object-cover object-center"
            style={{ transform: 'scale(1.03)' }}
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />

        {/* Hero text — fade in */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          {data.subtitle && (
            <p className="text-xs tracking-[0.22em] text-white/60 uppercase mb-4">
              {data.subtitle}
            </p>
          )}
          <h1
            className="text-4xl md:text-6xl font-normal text-white leading-tight mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {data.title}
          </h1>

          {/* Glassmorphism pill badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-white/80 text-xs tracking-widest uppercase"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
            Frägra Collection
          </div>
        </div>

        {/* Bottom fade into cream */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to top, #F3F0E9, transparent)' }}
        />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        className="bg-frag-cream"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease-out 0.3s',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 pt-4 pb-20">

          {/* Back link */}
          <div className="mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs tracking-widest text-frag-gray uppercase border border-frag-border rounded-full px-5 py-2 hover:border-frag-dark hover:text-frag-dark transition-all duration-300"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 6H2M2 6l4-4M2 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Shop
            </Link>
          </div>

          {/* ── Decorative divider ── */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-frag-border" />
            <span style={{ color: '#C9A96E', fontSize: 18 }}>✦</span>
            <div className="flex-1 h-px bg-frag-border" />
          </div>

          {/* ── Deep Dive Section ── */}
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            {/* Description */}
            <div className="md:col-span-3 space-y-5">
              <p className="text-xs tracking-[0.18em] text-frag-gray uppercase mb-6">
                Deep Dive
              </p>
              {data.description.map((para, i) => (
                <p
                  key={i}
                  className="text-frag-dark/80 text-sm leading-relaxed"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(12px)',
                    transition: `opacity 0.6s ease-out ${0.4 + i * 0.12}s, transform 0.6s ease-out ${0.4 + i * 0.12}s`,
                  }}
                >
                  {i === 0 && (
                    <span
                      className="float-left text-5xl leading-none mr-2 text-frag-dark"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {para[0]}
                    </span>
                  )}
                  {i === 0 ? para.slice(1) : para}
                </p>
              ))}
            </div>

            {/* Specifications Card — glassmorphism */}
            <div className="md:col-span-2">
              <div
                className="rounded-2xl p-6 border border-frag-border sticky top-24"
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                <p className="text-xs tracking-[0.15em] text-frag-gray uppercase mb-5">
                  Specifications
                </p>
                <ul className="space-y-0 divide-y divide-frag-border">
                  {data.specifications.map((spec, i) => (
                    <li key={i} className="flex justify-between items-start py-3 gap-4">
                      <span className="text-xs text-frag-gray">{spec.label}</span>
                      <span
                        className="text-xs text-frag-dark font-medium text-right"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {spec.value}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA inside card */}
                <Link
                  to="/info/shop-all"
                  className="mt-6 flex items-center justify-center gap-2 w-full bg-frag-dark text-white text-xs font-medium py-3 rounded-full hover:bg-frag-dark/90 transition-colors"
                >
                  Explore Full Collection
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H4M10 2v6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Gallery Section ── */}
          {hasGallery && (
            <div className="mb-16">
              {/* Section header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-frag-border" />
                <p className="text-xs tracking-[0.18em] text-frag-gray uppercase">Gallery</p>
                <div className="flex-1 h-px bg-frag-border" />
              </div>

              {/* Grid 2x2 or 1x3 depending on count */}
              <div
                className={`grid gap-3 ${
                  data.gallery.length >= 4
                    ? 'grid-cols-2 md:grid-cols-4'
                    : 'grid-cols-2 md:grid-cols-3'
                }`}
              >
                {data.gallery.map((imgUrl, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-frag-border"
                    style={{
                      height: 200,
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(16px)',
                      transition: `opacity 0.6s ease-out ${0.5 + i * 0.1}s, transform 0.6s ease-out ${0.5 + i * 0.1}s`,
                    }}
                  >
                    <LazyImage
                      src={imgUrl}
                      alt={`${data.title} ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Cert Badge Bar ── */}
          <div
            className="rounded-2xl border border-frag-border p-6 flex flex-wrap items-center justify-center gap-6"
            style={{
              background: 'rgba(255,255,255,0.4)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            {['IFRA Certified', 'Vegan Formula', 'Cruelty Free', 'No Phthalates', 'Kid & Pet Safe'].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-frag-dark flex items-center justify-center flex-shrink-0">
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xs text-frag-gray">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
