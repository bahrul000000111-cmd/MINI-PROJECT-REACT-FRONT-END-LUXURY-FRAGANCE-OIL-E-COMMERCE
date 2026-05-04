import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { labelToSlug } from "../data/contentData";

const navLinks = [
  { label: "Belanja Sekarang", slug: "shop-now", to: "/shop/all" },
  {
    label: "Belanja Semua",
    dropdown: [
      { label: "Semua Produk",  to: "/shop/all" },
      { label: "Produk Terlaris",  to: "/shop/all" },
      { label: "Koleksi Baru",  to: "/shop/all" },
      { label: "Set Hadiah",     to: "/shop/gift-sets" },
    ],
  },
  {
    label: "Diffuser Aroma",
    dropdown: [
      { label: "Semua Diffuser", to: "/shop/scent-diffusers" },
      { label: "Diffuser Mini",to: "/shop/scent-diffusers" },
      { label: "Diffuser Mobil", to: "/shop/scent-diffusers" },
    ],
  },
  {
    label: "Koleksi Premium",
    dropdown: [
      { label: "Aroma Hotel",    to: "/shop/hotel-collection" },
      { label: "Koleksi Lobi",to: "/shop/hotel-collection" },
      { label: "Lini Premium",    to: "/shop/hotel-collection" },
    ],
  },
  { label: "Koleksi Desainer", slug: "designer-collection", to: "/shop/designer-collection" },
  { label: "Parfum",            slug: "perfumes", to: "/shop/perfumes" },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // We fallback to english slug if the translation isn't in labelToSlug
  // Since labelToSlug maps english, we explicitly assign slug for single links above
  const toHref = (label, slug) => {
    if (slug) return `/info/${slug}`;
    return `/info/${labelToSlug[label] ?? label.toLowerCase().replace(/\\s+/g, '-')}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-frag-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="text-2xl font-serif tracking-tight text-frag-dark hover:opacity-80 transition-opacity duration-300">
          Fr<span style={{ fontStyle: "italic" }}>ä</span>gra.
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <li key={link.label} className="relative">
              {link.dropdown ? (
                <div
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="py-2"
                >
                  <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-sans text-frag-gray hover:text-frag-dark transition-colors duration-300">
                    {link.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-300 ${openDropdown === link.label ? 'rotate-180' : ''}`}>
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 bg-white border border-frag-border rounded-xl shadow-lg py-3 min-w-[200px] z-50 opacity-100 transform translate-y-0 transition-all duration-300">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-5 py-2.5 text-sm font-sans text-frag-gray hover:text-frag-dark hover:bg-frag-cream transition-colors duration-300"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={link.to}
                  className="block px-3 py-2 text-sm font-sans text-frag-gray hover:text-frag-dark transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          {isAuthenticated && (
            <li>
              <Link to="/users" className="block px-3 py-2 text-sm font-sans text-frag-gray hover:text-frag-dark transition-colors duration-300">
                Pengguna
              </Link>
            </li>
          )}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-frag-gray hover:text-frag-dark transition-colors duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7"/>
              <path d="M16.5 16.5L21 21" strokeLinecap="round"/>
            </svg>
          </button>

          {isAuthenticated ? (
            <>
              <span className="hidden md:block text-sm font-sans text-frag-dark font-medium">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-sans font-medium text-white bg-frag-dark rounded-full hover:bg-[#333] transition-colors duration-300 shadow-sm"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:block px-4 py-2 text-sm font-sans font-medium text-frag-dark border border-frag-border rounded-full hover:bg-frag-cream transition-colors duration-300"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-sans font-medium text-white bg-frag-dark rounded-full hover:bg-[#333] transition-colors duration-300 shadow-sm"
              >
                Daftar
              </Link>
            </>
          )}

          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-frag-gray hover:text-frag-dark transition-colors duration-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" strokeLinecap="round"/>
                  <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round"/>
                  <line x1="3" y1="17" x2="21" y2="17" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-frag-border px-6 py-5 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.slug ? `/info/${link.slug}` : toHref(link.label, link.slug)}
              onClick={() => setMobileOpen(false)}
              className="text-base font-sans font-medium text-frag-dark hover:text-[#C9A96E] py-2 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link to="/users" onClick={() => setMobileOpen(false)} className="text-base font-sans font-medium text-frag-dark hover:text-[#C9A96E] py-2 transition-colors duration-300">
              Pengguna
            </Link>
          )}
          <hr className="border-frag-border my-2" />
          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-left text-base font-sans font-medium text-red-600 hover:text-red-700 py-2 transition-colors duration-300">
              Keluar
            </button>
          ) : (
            <div className="flex flex-col gap-3 mt-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-center text-sm font-sans font-medium text-frag-dark border border-frag-border rounded-full py-3 hover:bg-frag-cream transition-colors duration-300">Masuk</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="text-center text-sm font-sans font-medium text-white bg-frag-dark rounded-full py-3 hover:bg-[#333] transition-colors duration-300">Daftar</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
