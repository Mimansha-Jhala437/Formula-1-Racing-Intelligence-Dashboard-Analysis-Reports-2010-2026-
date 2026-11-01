import React, { useState, useEffect } from 'react';
import { Navbar, NavTabId } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TableauEmbed } from './components/TableauEmbed';
import { CircuitsExplorer } from './components/CircuitsExplorer';
import { KeyInsights } from './components/KeyInsights';
import { ToolsSkills } from './components/ToolsSkills';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

const TABLEAU_PUBLIC_URL =
  'https://public.tableau.com/app/profile/mimansha.jhala/viz/Formula1RacingPerformanceAnalyticsStoryDashboard/Story1';
const TABLEAU_STORY_SRC =
  'https://public.tableau.com/views/Formula1RacingPerformanceAnalyticsStoryDashboard/Story1';
const TABLEAU_PROFILE_URL =
  'https://public.tableau.com/app/profile/mimansha.jhala';

const VALID_TABS: NavTabId[] = ['dashboard', 'circuits', 'overview', 'insights', 'skills'];

export default function App() {
  // Default landing route is explicitly 'dashboard' (the Tableau / F1 Race Intelligence Dashboard view)
  const [activeTab, setActiveTab] = useState<NavTabId>('dashboard');

  useEffect(() => {
    // Check initial hash on mount
    const checkHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase() as NavTabId;
      if (VALID_TABS.includes(hash)) {
        setActiveTab(hash);
      } else {
        // If visiting root URL (/) or empty hash, default to dashboard!
        setActiveTab('dashboard');
        // If there's no hash, set it or keep root clean while dashboard renders
      }
    };

    checkHash();

    // Listen for hash changes (e.g. browser back/forward buttons)
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase() as NavTabId;
      if (VALID_TABS.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: NavTabId) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F3F4F6] flex flex-col font-sans selection:bg-[#E10600] selection:text-white">
      {/* Top Navbar with active tab state, defaulting to Dashboard */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        tableauUrl={TABLEAU_PUBLIC_URL}
      />

      {/* Main Content Area: Default root view opens Tableau Dashboard */}
      <main className="flex-1">
        {activeTab === 'dashboard' && (
          <TableauEmbed
            storySrc={TABLEAU_STORY_SRC}
            publicUrl={TABLEAU_PUBLIC_URL}
            onSelectTab={handleSelectTab}
            isStandaloneTab={true}
          />
        )}

        {activeTab === 'circuits' && (
          <div className="pt-20">
            <CircuitsExplorer />
          </div>
        )}

        {activeTab === 'overview' && (
          <div>
            <HeroSection onSelectTab={handleSelectTab} />
            <AboutSection />
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="pt-20">
            <KeyInsights />
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="pt-20">
            <ToolsSkills />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer tableauProfileUrl={TABLEAU_PROFILE_URL} />

      {/* Floating Back-To-Top Button */}
      <BackToTop />
    </div>
  );
}
