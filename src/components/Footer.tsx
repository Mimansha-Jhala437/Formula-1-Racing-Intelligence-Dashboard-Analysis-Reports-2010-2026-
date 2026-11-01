import React from 'react';
import { ExternalLink, Github, Linkedin, Flag, Heart } from 'lucide-react';

interface FooterProps {
  tableauProfileUrl: string;
}

export const Footer: React.FC<FooterProps> = ({
  tableauProfileUrl = 'https://public.tableau.com/app/profile/mimansha.jhala',
}) => {
  return (
    <footer className="bg-[#07070A] border-t border-[#1C1C26] text-[#94A3B8] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#181822]">
          {/* Brand & Author */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#E10600] flex items-center justify-center font-racing font-extrabold text-white text-sm shadow-[0_0_12px_rgba(225,6,0,0.5)]">
                F1
              </div>
              <span className="font-racing font-bold text-lg text-white tracking-wider">
                RACING ANALYTICS
              </span>
            </div>
            <p className="text-xs text-[#8E8EA0] leading-relaxed">
              Formula 1 Racing Performance Analytics — an interactive data intelligence platform built to explore
              driver telemetry, team reliability, tyre compounds, and 29 world championship circuits.
            </p>
            <div className="text-xs text-white">
              Built by{' '}
              <a
                href={tableauProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E10600] font-semibold hover:underline"
              >
                Mimansha Jhala
              </a>
            </div>
          </div>

          {/* Links & Profiles */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <a
              href={tableauProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#121218] border border-[#222230] text-white hover:text-[#E10600] hover:border-[#E10600]/40 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#E10600]" />
              <span>Tableau Public Profile</span>
            </a>

            <a
              href="https://linkedin.com/in/mimansha-jhala"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#121218] border border-[#222230] text-white hover:text-[#E10600] hover:border-[#E10600]/40 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-[#0077B5]" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/Mimansha-Jhala437/Formula-1-Racing-Intelligence-Dashboard-Analysis-Reports-2010-2026-"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#121218] border border-[#222230] text-white hover:text-[#E10600] hover:border-[#E10600]/40 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Bottom notes & legal disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div>
            © {new Date().getFullYear()} Mimansha Jhala. All rights reserved.
          </div>
          <div className="text-center sm:text-right max-w-xl text-[11px]">
            Formula 1, F1, and related marks are trademarks of Formula One Licensing B.V. This site and dashboard
            are an independent analytics portfolio project created for data exploration and educational purposes.
          </div>
        </div>
      </div>
    </footer>
  );
};
