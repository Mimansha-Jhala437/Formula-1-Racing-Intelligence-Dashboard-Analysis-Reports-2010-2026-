import React from 'react';
import { Navbar } from './components/Navbar';
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

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F3F4F6] flex flex-col font-sans selection:bg-[#E10600] selection:text-white">
      {/* Top Navbar */}
      <Navbar tableauUrl={TABLEAU_PUBLIC_URL} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. About / Project Overview */}
        <AboutSection />

        {/* 3. Live Tableau Story Dashboard */}
        <TableauEmbed storySrc={TABLEAU_STORY_SRC} publicUrl={TABLEAU_PUBLIC_URL} />

        {/* 4. Circuits Explorer (including Circuit Insights mini-row charts) */}
        <CircuitsExplorer />

        {/* 5. Key Strategic Insights */}
        <KeyInsights />

        {/* 6. Tools & Skills */}
        <ToolsSkills />
      </main>

      {/* 7. Footer */}
      <Footer tableauProfileUrl={TABLEAU_PROFILE_URL} />

      {/* Floating Back-To-Top Button */}
      <BackToTop />
    </div>
  );
}
