import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { labelToSlug } from "../data/contentData";

const navLinks = [
  { label: "Shop Now", slug: null, to: "/shop/all" },
  {
    label: "Shop All",
    dropdown: [
      { label: "All Products",  to: "/shop/all" },
      { label: "Best Sellers",  to: "/shop/all" },
      { label: "New Arrivals",  to: "/shop/all" },
      { label: "Gift Sets",     to: "/shop/gift-sets" },
    ],
  },
  {
    label: "Scent Diffusers",
    dropdown: [
      { label: "All Diffusers", to: "/shop/scent-diffusers" },
      { label: "Mini Diffusers",to: "/shop/scent-diffusers" },
      { label: "Car Diffusers", to: "/shop/scent-diffusers" },
    ],
  },
  {
    label: "Hotel Collection",
    dropdown: [
      { label: "Hotel Scents",    to: "/shop/hotel-collection" },
      { label: "Lobby Collection",to: "/shop/hotel-collection" },
      { label: "Premium Line",    to: "/shop/hotel-collection" },
    ],
  },
  { label: "Designer Collection", slug: null, to: "/shop/designer-collection" },
  { label: "Perfumes",            slug: null, to: "/shop/perfumes" },
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

  const toHref = (label) => `/info/${labelToSlug[label] ?? label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-frag-border">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="text-xl font-serif tracking-tight text-frag-dark">
          Fr<span style={{ fontStyle: "italic" }}>ä</span>gra.
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label} className="relative">
              {link.dropdown ? (
                <div
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm text-frag-gray hover:text-frag-dark transition-colors">
                    {link.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-frag-border rounded-xl shadow-lg py-2 min-w-48 z-50">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-sm text-frag-gray hover:text-frag-dark hover:bg-frag-cream transition-colors"
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
                  className="block px-3 py-2 text-sm text-frag-gray hover:text-frag-dark transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}

        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-frag-gray hover:text-frag-dark transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7"/>
              <path d="M16.5 16.5L21 21" strokeLinecap="round"/>
            </svg>
          </button>

          {isAuthenticated ? (
            <>
              <span className="hidden md:block text-sm text-frag-dark font-medium">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm font-medium text-white bg-frag-dark rounded-lg hover:bg-frag-dark/90 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:block px-3 py-1.5 text-sm font-medium text-frag-dark border border-frag-border rounded-lg hover:bg-frag-cream transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 text-sm font-medium text-white bg-frag-dark rounded-lg hover:bg-frag-dark/90 transition-colors"
              >
                Register
              </Link>
            </>
          )}

          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-frag-gray hover:text-frag-dark"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
        <div className="md:hidden bg-white border-t border-frag-border px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.slug ? `/info/${link.slug}` : toHref(link.label)}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-frag-gray hover:text-frag-dark py-1 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-left text-sm text-red-600 hover:text-red-700 py-1 transition-colors">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm text-frag-gray hover:text-frag-dark py-1 transition-colors">Login</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="text-sm text-frag-gray hover:text-frag-dark py-1 transition-colors">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
