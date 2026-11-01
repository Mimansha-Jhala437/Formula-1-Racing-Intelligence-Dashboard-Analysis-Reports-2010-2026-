import React from 'react';
import { UserCheck, ShieldCheck, Disc3, AlertTriangle, Edit3, ArrowUpRight } from 'lucide-react';

export const KeyInsights: React.FC = () => {
  const insights = [
    {
      id: 'driver',
      title: 'Top Performing Driver',
      category: 'Championship Lead & Win Rate',
      icon: UserCheck,
      statValue: '73.9%',
      statLabel: 'Win conversion from pole',
      content:
        'Dominant qualifying performances translated directly into race victories. Telemetry reveals exceptional tyre management during opening stints, yielding an average 0.34s per lap advantage over nearest title rivals during clean air running.',
      takeaway: 'Key Factor: Consistent throttle application and minimum apex speed in medium-to-high speed turns.',
      accent: '#E10600',
    },
    {
      id: 'team',
      title: 'Most Reliable Team',
      category: 'Mechanical Reliability & Strategy',
      icon: ShieldCheck,
      statValue: '96.2%',
      statLabel: 'Race finish completion rate',
      content:
        'Demonstrated the lowest rate of mechanical power unit and gearbox retirements across the entire season. Coupled with an average pit stop delta under 2.3 seconds, race executions consistently capitalized on rival safety car miscalculations.',
      takeaway: 'Key Factor: Pristine cooling package management and zero terminal MGU-K failures.',
      accent: '#38BDF8',
    },
    {
      id: 'tyre',
      title: 'Most Used Tyre Compound',
      category: 'Pirelli Compound Allocation',
      icon: Disc3,
      statValue: 'C3 Medium',
      statLabel: '48% of total racing distance',
      content:
        'The C3 Yellow Medium tyre served as the universal strategic baseline across 22 of 24 Grand Prix weekends. Providing optimal thermal balance between qualifying punch and 24-lap stint endurance, it was the preferred opening tyre for 82% of top-10 starters.',
      takeaway: 'Key Factor: Wide working temperature window resisting graining in mixed track conditions.',
      accent: '#FBBF24',
    },
    {
      id: 'circuit',
      title: 'Most Challenging Circuit',
      category: 'Telemetry & Incident Severity',
      icon: AlertTriangle,
      statValue: 'Spa-Francorchamps',
      statLabel: 'Highest altitude delta & micro-climates',
      content:
        'Featuring the longest 7.004 km lap, massive compression at Eau Rouge / Raidillon, and dynamic Ardennes weather, Spa posed the steepest aerodynamic setup compromise between sector 1/3 straight-line speed and sector 2 downforce.',
      takeaway: 'Key Factor: Extreme lateral load exceeding 5.2G alongside sudden wet-to-dry transitions.',
      accent: '#E10600',
    },
  ];

  return (
    <section id="insights" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F] border-t border-[#1C1C28]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#E10600] font-heading mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
              Executive Findings
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-racing font-bold text-white uppercase tracking-tight">
              Key Strategic Insights
            </h2>
            <p className="mt-3 text-base text-[#94A3B8] max-w-2xl font-sans">
              Critical qualitative and quantitative conclusions synthesized from the Tableau dashboard analysis,
              evaluating driver metrics, engineering reliability, tyre wear, and track architecture.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14141E] border border-[#222232] text-xs text-[#94A3B8]">
            <Edit3 className="w-3.5 h-3.5 text-[#E10600]" />
            <span>Structured editable insights block</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-[#121218] border border-[#20202E] rounded-xl p-6 sm:p-7 hover:border-[#E10600]/50 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#181824] border border-[#262638] flex items-center justify-center text-white group-hover:bg-[#E10600] transition-colors duration-200">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-heading">
                          {item.category}
                        </div>
                        <h3 className="text-xl font-bold font-heading text-white group-hover:text-[#E10600] transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xl sm:text-2xl font-racing font-bold text-white tabular-nums">
                        {item.statValue}
                      </div>
                      <div className="text-[10px] text-[#64748B] uppercase tracking-wider">
                        {item.statLabel}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-4 font-sans">
                    {item.content}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1C1C26] flex items-center justify-between text-xs text-[#C5C5D2] bg-[#0E0E14] -mx-6 -mb-6 p-4 rounded-b-xl border-x-0 border-b-0">
                  <span className="font-medium text-white">{item.takeaway}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
