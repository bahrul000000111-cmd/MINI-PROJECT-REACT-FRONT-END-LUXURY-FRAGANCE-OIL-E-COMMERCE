import { useState } from 'react';
import { BRANDS, MAX_PRICE } from '../data/products';

const RATINGS = [4, 3, 2];

export default function FilterPanel({ filters, onChange, onReset }) {
  const [open, setOpen] = useState({ price: true, brand: true, rating: true });
  const toggle = (k) => setOpen((p) => ({ ...p, [k]: !p[k] }));

  return (
    <aside className="w-full bg-white rounded-2xl border border-frag-border p-5 sticky top-28 self-start">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs tracking-[0.15em] text-frag-dark uppercase font-medium">Filters</p>
        <button
          onClick={onReset}
          className="text-[10px] text-frag-gray hover:text-frag-dark transition-colors tracking-wider uppercase"
        >
          Reset
        </button>
      </div>

      {/* ── Price Range ── */}
      <div className="mb-5 pb-5 border-b border-frag-border">
        <button
          onClick={() => toggle('price')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="text-xs font-medium text-frag-dark">Price Range</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{ transform: open.price ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <path d="M2 4l4 4 4-4" stroke="#717171" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {open.price && (
          <div>
            <div className="flex justify-between text-[10px] text-frag-gray mb-2">
              <span>${filters.priceMin}</span>
              <span>${filters.priceMax}</span>
            </div>
            <input
              type="range"
              min={0}
              max={MAX_PRICE}
              step={5}
              value={filters.priceMax}
              onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
              className="w-full accent-frag-dark"
            />
            <div className="flex gap-2 mt-3">
              {[50, 100, 150, 'All'].map((v) => (
                <button
                  key={v}
                  onClick={() => onChange({ ...filters, priceMax: v === 'All' ? MAX_PRICE : v })}
                  className="flex-1 text-[10px] py-1 rounded-full border transition-all duration-150"
                  style={{
                    borderColor: (v === 'All' ? filters.priceMax >= MAX_PRICE : filters.priceMax === v) ? '#1A1A1A' : '#E5E1D8',
                    background: (v === 'All' ? filters.priceMax >= MAX_PRICE : filters.priceMax === v) ? '#1A1A1A' : 'white',
                    color: (v === 'All' ? filters.priceMax >= MAX_PRICE : filters.priceMax === v) ? 'white' : '#717171',
                  }}
                >
                  {v === 'All' ? 'All' : `$${v}`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Brand ── */}
      <div className="mb-5 pb-5 border-b border-frag-border">
        <button
          onClick={() => toggle('brand')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="text-xs font-medium text-frag-dark">Brand</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{ transform: open.brand ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <path d="M2 4l4 4 4-4" stroke="#717171" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {open.brand && (
          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {BRANDS.map((b) => (
              <label key={b} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(b)}
                  onChange={() => {
                    const next = filters.brands.includes(b)
                      ? filters.brands.filter((x) => x !== b)
                      : [...filters.brands, b];
                    onChange({ ...filters, brands: next });
                  }}
                  className="accent-frag-dark w-3.5 h-3.5"
                />
                <span className="text-[11px] text-frag-gray group-hover:text-frag-dark transition-colors truncate">
                  {b}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ── Rating ── */}
      <div>
        <button
          onClick={() => toggle('rating')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="text-xs font-medium text-frag-dark">Min. Rating</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{ transform: open.rating ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <path d="M2 4l4 4 4-4" stroke="#717171" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {open.rating && (
          <div className="space-y-2">
            {RATINGS.map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === r}
                  onChange={() => onChange({ ...filters, minRating: r })}
                  className="accent-frag-dark w-3.5 h-3.5"
                />
                <span className="text-[11px] text-frag-gray group-hover:text-frag-dark transition-colors flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="10" height="10" viewBox="0 0 16 16"
                      fill={i < r ? '#E8A838' : 'none'}
                      stroke={i < r ? 'none' : '#D4D0C8'} strokeWidth="1.2">
                      <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z"/>
                    </svg>
                  ))}
                  <span className="ml-0.5">& up</span>
                </span>
              </label>
            ))}
            {filters.minRating && (
              <button onClick={() => onChange({ ...filters, minRating: null })}
                className="text-[10px] text-frag-gray hover:text-frag-dark transition-colors">
                Clear rating
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
