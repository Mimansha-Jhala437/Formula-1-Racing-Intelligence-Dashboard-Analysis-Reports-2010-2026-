import React from 'react';
import { Trophy, ShieldAlert, Wrench, CircleDot, Database, LineChart, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const cards = [
    {
      title: 'Season Overview & KPIs',
      icon: Trophy,
      summary:
        'Championship headline numbers, total Grand Prix contested, average safety car interventions, and pole-to-win conversion ratios across modern racing eras.',
      highlights: ['Championship Points Trajectory', 'Sprint vs Grand Prix Delta', 'Qualifying Conversion Rate'],
      badge: '01',
    },
    {
      title: 'Driver Standings & DNF Breakdown',
      icon: ShieldAlert,
      summary:
        'Detailed driver progression charts, telemetry analysis, podium consistency, and a granular breakdown of DNFs categorized by mechanical engine failures vs racing collisions.',
      highlights: ['Head-to-Head Teammate Deltas', 'Mechanical vs Crash DNF Split', 'Laps Led & Overtaking Prowess'],
      badge: '02',
    },
    {
      title: 'Constructor Championship & Team Performance',
      icon: Wrench,
      summary:
        'Constructor race pace benchmarking, development curve through aerodynamic upgrades, sub-2.5s pit stop reliability, and points distribution between teammates.',
      highlights: ['Pit Stop Execution Speed', 'Constructor Reliability Index', 'Aero Upgrade Impact'],
      badge: '03',
    },
    {
      title: 'Tyre Strategy & Circuits Insights',
      icon: CircleDot,
      summary:
        'Pirelli dry compound usage patterns (C1–C5 Soft, Medium, Hard), thermal degradation curves, undercut/overcut success rates, and topographical circuit characteristics.',
      highlights: ['Compound Stint Longevity', 'Pit Strategy Undercut Windows', 'Track Degradation Profiles'],
      badge: '04',
    },
  ];

  return (
    <section id="overview" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1C1C28] bg-[#0E0E14] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#E10600] font-heading mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
              Project Overview
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-racing font-bold text-white uppercase tracking-tight">
              Data-Driven Formula 1 Intelligence
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-sans">
              An end-to-end Formula 1 analytics project covering driver standings, DNF and reliability analysis,
              constructor performance, tyre compound strategy, and circuit insights — engineered from raw telemetry and race logs,
              then brought to life in an interactive Tableau Public story.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#14141E] border border-[#222232] shrink-0 max-w-sm">
            <div className="text-xs text-[#94A3B8] uppercase tracking-wider font-heading">Project Author</div>
            <div className="text-lg font-bold text-white mt-0.5">Mimansha Jhala</div>
            <div className="text-xs text-[#E10600] font-medium mt-1 flex items-center gap-1.5">
              <span>Tableau Data Specialist & Race Analyst</span>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-[#121218] border border-[#20202C] rounded-xl p-6 flex flex-col justify-between hover:border-[#E10600]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-lg bg-[#1A1A24] border border-[#292939] flex items-center justify-center text-[#E10600] group-hover:bg-[#E10600] group-hover:text-white transition-colors duration-200">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-racing font-bold text-2xl text-[#2C2C3D] group-hover:text-[#E10600]/40 transition-colors">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-white tracking-wide mb-3 group-hover:text-[#E10600] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                    {card.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1C1C26] space-y-2">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-[#64748B]">
                    Key Metrics Explored
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#CBD5E1]">
                    {card.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]/70 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
