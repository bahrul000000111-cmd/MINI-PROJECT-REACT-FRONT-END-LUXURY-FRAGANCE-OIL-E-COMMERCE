import { useState } from "react";

const navLinks = [
  { label: "Shop Now", href: "#" },
  {
    label: "Shop All",
    dropdown: ["All Products", "Best Sellers", "New Arrivals", "Gift Sets"],
  },
  {
    label: "Scent Diffusers",
    dropdown: ["Cold-Air Diffusers", "Mini Diffusers", "Car Diffusers"],
  },
  {
    label: "Hotel Collection",
    dropdown: ["Hotel Scents", "Lobby Collection", "Premium Line"],
  },
  { label: "Designer Collection", href: "#" },
  { label: "Perfumes", href: "#" },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <a href="#" className="text-xl font-serif tracking-tight text-[#1A1A1A]">
          Fr<span style={{ fontStyle: "italic" }}>ä</span>gra.
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label} className="relative">
              {link.dropdown ? (
                <button
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-[#717171] hover:text-[#1A1A1A] transition-colors"
                >
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {/* Dropdown */}
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-[#E5E1D8] rounded-xl shadow-lg py-2 min-w-48 z-50">
                      {link.dropdown.map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block px-4 py-2 text-sm text-[#717171] hover:text-[#1A1A1A] hover:bg-[#F3F0E9] transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </button>
              ) : (
                <a
                  href={link.href}
                  className="block px-3 py-2 text-sm text-[#717171] hover:text-[#1A1A1A] transition-colors"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="p-2 text-[#717171] hover:text-[#1A1A1A] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7"/>
              <path d="M16.5 16.5L21 21" strokeLinecap="round"/>
            </svg>
          </button>

          {/* User */}
          <button className="p-2 text-[#717171] hover:text-[#1A1A1A] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Cart */}
          <button className="relative p-2 text-[#717171] hover:text-[#1A1A1A] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round"/>
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#1A1A1A] rounded-full"></span>
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-[#717171] hover:text-[#1A1A1A]"
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
        <div className="md:hidden bg-white border-t border-[#E5E1D8] px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href || "#"}
              className="text-sm text-[#717171] hover:text-[#1A1A1A] py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}