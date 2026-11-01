import React from 'react';
import {
  ArrowRight,
  MapPin,
  LayoutDashboard,
  Trophy,
  ShieldAlert,
  Wrench,
  CircleDot,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { NavTabId } from './Navbar';

interface HomePageProps {
  onNavigate: (tab: NavTabId) => void;
  tableauUrl: string;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, tableauUrl }) => {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section with Headline, Counters, and Direct Action Buttons */}
      <HeroSection onSelectTab={onNavigate} />

      {/* 2. Featured Dashboard Teaser Card */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F] relative">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl border-2 border-[#E10600]/40 bg-gradient-to-br from-[#161622] via-[#101017] to-[#0D0D12] p-6 sm:p-10 shadow-[0_0_40px_rgba(225,6,0,0.15)] overflow-hidden">
            {/* Background racing line accents */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none hidden lg:block">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <circle cx="200" cy="200" r="180" fill="none" stroke="#E10600" strokeWidth="2" strokeDasharray="12 12" />
                <path d="M 50,350 Q 200,50 350,350" fill="none" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E10600]/10 border border-[#E10600]/30 text-xs font-semibold text-[#FF4D4D] uppercase tracking-wider font-heading mb-4">
                <LayoutDashboard className="w-3.5 h-3.5 text-[#E10600]" />
                <span>Primary BI Visual Experience</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-racing font-bold text-white uppercase tracking-tight">
                Formula 1 Race Intelligence Interactive Storyboard
              </h2>

              <p className="mt-3 text-sm sm:text-base text-[#94A3B8] font-sans leading-relaxed">
                Dive straight into published Tableau telemetry stories analyzing 2010–2026 Grand Prix history.
                Explore driver pace, DNF breakdowns, constructor reliability indices, and tyre stint degradation across 29 international circuits.
              </p>

              {/* 4 Story chapters indicator */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 my-6">
                <div className="bg-[#0B0B0F]/80 border border-[#222230] p-3 rounded-lg">
                  <div className="text-[10px] font-mono text-[#E10600]">Tab 01</div>
                  <div className="text-xs font-bold text-white font-heading mt-0.5">Season KPIs</div>
                </div>
                <div className="bg-[#0B0B0F]/80 border border-[#222230] p-3 rounded-lg">
                  <div className="text-[10px] font-mono text-[#E10600]">Tab 02</div>
                  <div className="text-xs font-bold text-white font-heading mt-0.5">Driver Standings</div>
                </div>
                <div className="bg-[#0B0B0F]/80 border border-[#222230] p-3 rounded-lg">
                  <div className="text-[10px] font-mono text-[#E10600]">Tab 03</div>
                  <div className="text-xs font-bold text-white font-heading mt-0.5">Constructors</div>
                </div>
                <div className="bg-[#0B0B0F]/80 border border-[#222230] p-3 rounded-lg">
                  <div className="text-[10px] font-mono text-[#E10600]">Tab 04</div>
                  <div className="text-xs font-bold text-white font-heading mt-0.5">Tyres & Circuits</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg bg-[#E10600] hover:bg-[#B80500] text-white text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(225,6,0,0.45)] hover:shadow-[0_0_35px_rgba(225,6,0,0.65)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Launch Interactive Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('circuits')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-[#14141E] hover:bg-[#1E1E2C] text-[#E2E8F0] hover:text-white text-sm font-semibold uppercase tracking-wider border border-[#2B2B3D] hover:border-[#E10600]/40 transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#E10600]" />
                  <span>Explore 29 Circuits</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Project Overview & 4 Pillars */}
      <AboutSection />

      {/* 4. Quick Highlights / Exploratory Strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F] border-t border-[#1C1C28]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Dashboard Jump */}
            <div
              onClick={() => onNavigate('dashboard')}
              className="bg-[#121218] border border-[#20202E] hover:border-[#E10600]/50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#181824] border border-[#282838] flex items-center justify-center text-[#E10600] group-hover:bg-[#E10600] group-hover:text-white transition-colors mb-4">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-white group-hover:text-[#E10600] transition-colors">
                Interactive Tableau Story
              </h3>
              <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                View the published 4-part Tableau Storyboard embedding official FIA championship data.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-[#E10600] font-semibold uppercase tracking-wider">
                <span>Open Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Circuits Explorer Jump */}
            <div
              onClick={() => onNavigate('circuits')}
              className="bg-[#121218] border border-[#20202E] hover:border-[#E10600]/50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#181824] border border-[#282838] flex items-center justify-center text-[#E10600] group-hover:bg-[#E10600] group-hover:text-white transition-colors mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-white group-hover:text-[#E10600] transition-colors">
                29 World Circuits Explorer
              </h3>
              <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                Filter and inspect track topography, elevation, lap km, and interactive Recharts.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-[#E10600] font-semibold uppercase tracking-wider">
                <span>Inspect Circuits</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Key Insights Jump */}
            <div
              onClick={() => onNavigate('insights')}
              className="bg-[#121218] border border-[#20202E] hover:border-[#E10600]/50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#181824] border border-[#282838] flex items-center justify-center text-[#E10600] group-hover:bg-[#E10600] group-hover:text-white transition-colors mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-white group-hover:text-[#E10600] transition-colors">
                Key Strategic Insights
              </h3>
              <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                Qualitative & quantitative conclusions on driver win-rates, team reliability, and tyres.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-[#E10600] font-semibold uppercase tracking-wider">
                <span>Read Insights</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
