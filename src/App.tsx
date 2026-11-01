import React, { useState, useEffect } from 'react';
import { Navbar, NavTabId } from './components/Navbar';
import { HomePage } from './components/HomePage';
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

const VALID_TABS: NavTabId[] = ['home', 'dashboard', 'circuits', 'insights', 'skills'];

export default function App() {
  // Default landing route is explicitly 'home' (the separate Home/Landing page)
  const [activeTab, setActiveTab] = useState<NavTabId>('home');

  useEffect(() => {
    // Check initial URL hash on mount
    const checkHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase() as NavTabId;
      if (VALID_TABS.includes(hash)) {
        setActiveTab(hash);
      } else {
        // If visiting root URL (/) or empty hash, default to 'home'!
        setActiveTab('home');
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
    if (tab === 'home') {
      // Clean root URL for home
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
      }
    } else {
      window.location.hash = tab;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F3F4F6] flex flex-col font-sans selection:bg-[#E10600] selection:text-white">
      {/* Top Navbar with active tab state, defaulting to Home */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        tableauUrl={TABLEAU_PUBLIC_URL}
      />

      {/* Main Content Area: Default root view (/) opens Home / Landing page */}
      <main className="flex-1">
        {/* 1. Home / Landing Page (Default route /) */}
        {activeTab === 'home' && (
          <HomePage onNavigate={handleSelectTab} tableauUrl={TABLEAU_PUBLIC_URL} />
        )}

        {/* 2. Tableau Story Dashboard View (Accessible via 'Dashboard' or 'View Dashboard') */}
        {activeTab === 'dashboard' && (
          <TableauEmbed
            storySrc={TABLEAU_STORY_SRC}
            publicUrl={TABLEAU_PUBLIC_URL}
            onSelectTab={handleSelectTab}
            isStandaloneTab={true}
          />
        )}

        {/* 3. Circuits Explorer */}
        {activeTab === 'circuits' && (
          <div className="pt-20">
            <CircuitsExplorer />
          </div>
        )}

        {/* 4. Key Strategic Insights */}
        {activeTab === 'insights' && (
          <div className="pt-20">
            <KeyInsights />
          </div>
        )}

        {/* 5. Tools & Skills */}
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
