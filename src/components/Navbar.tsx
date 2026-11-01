import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Flag } from 'lucide-react';

interface NavbarProps {
  tableauUrl: string;
}

export const Navbar: React.FC<NavbarProps> = ({ tableauUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Circuits', href: '#circuits' },
    { name: 'Insights', href: '#insights' },
    { name: 'Skills', href: '#skills' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0F]/90 backdrop-blur-md border-b border-[#222230] shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark (Single element) */}
          <a
            href="#"
            className="flex items-center gap-3 text-white group whitespace-nowrap shrink-0"
            aria-label="F1 Racing Performance Analytics Home"
          >
            <div className="w-10 h-10 rounded bg-[#E10600] flex items-center justify-center font-racing font-extrabold text-white text-lg tracking-wider shadow-[0_0_15px_rgba(225,6,0,0.5)] group-hover:scale-105 transition-transform">
              F1
            </div>
            <div className="flex flex-col">
              <span className="font-racing font-bold text-lg sm:text-xl tracking-wider text-white">
                RACING ANALYTICS
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] -mt-1 font-sans">
                Performance Intelligence
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (4-5 items, single-line text) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#94A3B8]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors py-1 whitespace-nowrap shrink-0 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E10600] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={tableauUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-white bg-[#E10600] hover:bg-[#B80500] transition-colors shadow-[0_0_16px_rgba(225,6,0,0.35)] whitespace-nowrap shrink-0 active:scale-95"
            >
              <span>Tableau Story</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-[#94A3B8] hover:text-white hover:bg-[#161620] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121218] border-b border-[#222230] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-3 py-2.5 rounded text-base font-medium text-[#E2E8F0] hover:text-white hover:bg-[#1D1D28] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-[#222230]">
            <a
              href={tableauUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded text-sm font-semibold uppercase tracking-wider text-white bg-[#E10600] hover:bg-[#B80500] transition-colors shadow-lg"
            >
              <span>Open Tableau Public</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
