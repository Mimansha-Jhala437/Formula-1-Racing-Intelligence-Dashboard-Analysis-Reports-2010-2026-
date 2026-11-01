import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, LayoutDashboard, MapPin, Home, Lightbulb, Wrench, ArrowRight } from 'lucide-react';

export type NavTabId = 'home' | 'dashboard' | 'circuits' | 'insights' | 'skills';

interface NavbarProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  tableauUrl: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, tableauUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: NavTabId; name: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'circuits', name: 'Circuits', icon: MapPin },
    { id: 'insights', name: 'Insights', icon: Lightbulb },
    { id: 'skills', name: 'Skills', icon: Wrench },
  ];

  const handleTabClick = (tabId: NavTabId) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0F]/95 backdrop-blur-md border-b border-[#222230] shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
          : 'bg-[#0B0B0F]/85 backdrop-blur-sm border-b border-[#1C1C26]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Zone 1: Brand Wordmark (Clicking returns to Home /) */}
          <button
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 text-white group whitespace-nowrap shrink-0 text-left focus:outline-none"
            aria-label="F1 Racing Performance Analytics - Return to Home"
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
          </button>

          {/* Zone 2: Navigation Tabs (Home is default route /) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const IconComponent = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 relative ${
                    isActive
                      ? 'text-white bg-[#1A1A24] border border-[#2D2D3E] shadow-sm font-semibold'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#14141E]'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#E10600]' : 'text-[#64748B]'}`} />
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#E10600] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary CTA to Open Dashboard */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {activeTab !== 'dashboard' ? (
              <button
                onClick={() => handleTabClick('dashboard')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-white bg-[#E10600] hover:bg-[#B80500] transition-colors shadow-[0_0_16px_rgba(225,6,0,0.35)] whitespace-nowrap shrink-0 active:scale-95 cursor-pointer"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <a
                href={tableauUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-white bg-[#1C1C28] hover:bg-[#282838] border border-[#333346] transition-colors whitespace-nowrap shrink-0 active:scale-95"
              >
                <span>Tableau Public</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E10600]" />
              </a>
            )}
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
        <div className="md:hidden bg-[#121218] border-b border-[#222230] px-4 pt-3 pb-6 space-y-1.5 animate-fadeIn">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] px-3 py-1">
            Navigation Views
          </div>
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            const IconComponent = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleTabClick(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-base font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-[#1E1E2C] border-l-2 border-[#E10600]'
                    : 'text-[#E2E8F0] hover:text-white hover:bg-[#181822]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#E10600]' : 'text-[#64748B]'}`} />
                  <span>{link.name}</span>
                </div>
                {isActive && (
                  <span className="text-[11px] font-mono text-[#E10600] uppercase tracking-wider">Active</span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#222230]">
            <button
              onClick={() => handleTabClick('dashboard')}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded text-sm font-semibold uppercase tracking-wider text-white bg-[#E10600] hover:bg-[#B80500] transition-colors shadow-lg"
            >
              <span>Launch Interactive Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
