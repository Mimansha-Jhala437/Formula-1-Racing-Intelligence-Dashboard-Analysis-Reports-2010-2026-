import React from 'react';
import {
  BarChart3,
  FileSpreadsheet,
  Filter,
  PieChart,
  BookOpen,
  Code2,
  Database,
  Cpu,
} from 'lucide-react';

export const ToolsSkills: React.FC = () => {
  const skills = [
    {
      name: 'Tableau Public / Desktop',
      category: 'Primary Analytics Tool',
      icon: BarChart3,
      description:
        'Calculated fields, Level of Detail (LOD) expressions, parameter actions, dynamic sets, storytelling containers, and Web Embedding API v3 integration.',
      tag: 'Visualization Platform',
    },
    {
      name: 'Excel & CSV Data Modeling',
      category: 'Data Storage & Preparation',
      icon: FileSpreadsheet,
      description:
        'Data restructuring, multi-table consolidation, VLOOKUP/XLOOKUP transformations, pivot aggregation, and schema normalization across 29 circuits.',
      tag: 'Spreadsheet Modeling',
    },
    {
      name: 'Data Cleaning & Transformation',
      category: 'Pipeline Processing',
      icon: Filter,
      description:
        'Handling telemetry anomalies, resolving null/missing pitstop durations, standardizing DNF failure classifications, and metric unit alignment (km/h, meters).',
      tag: 'Data Quality & QA',
    },
    {
      name: 'Data Visualization & Design',
      category: 'Visual Analytics',
      icon: PieChart,
      description:
        'Preattentive visual encoding, accessible color theory for motorsport telemetry, cognitive load optimization, and responsive dashboard viewports.',
      tag: 'Visual Communication',
    },
    {
      name: 'Storytelling with Data',
      category: 'Narrative Strategy',
      icon: BookOpen,
      description:
        'Framing complex racing engineering dynamics into clear narrative arcs for engineers, team strategists, journalists, and motorsport enthusiasts.',
      tag: 'Narrative Architecture',
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0E0E14] border-t border-[#1C1C28]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181824] border border-[#262638] text-xs font-semibold text-[#E10600] uppercase tracking-widest font-heading mb-3">
            <span>Methodology & Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-racing font-bold text-white uppercase tracking-tight">
            Tools & Core Competencies
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8] font-sans">
            The technical toolset and analytical disciplines applied throughout this end-to-end Formula 1
            performance intelligence project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="bg-[#121218] border border-[#20202E] rounded-xl p-6 hover:border-[#E10600]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.6)] flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#181824] border border-[#262638] flex items-center justify-center text-[#E10600] group-hover:bg-[#E10600] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] bg-[#161622] px-2.5 py-1 rounded border border-[#242436]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-white group-hover:text-[#E10600] transition-colors mb-1">
                    {item.name}
                  </h3>
                  <div className="text-xs text-[#E10600] font-medium mb-3">
                    {item.category}
                  </div>

                  <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
