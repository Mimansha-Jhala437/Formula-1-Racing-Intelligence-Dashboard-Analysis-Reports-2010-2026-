import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ExternalLink,
  RefreshCw,
  Maximize2,
  AlertCircle,
  Sparkles,
  MapPin,
  Lightbulb,
  Info,
  Layers,
  ChevronRight,
  ShieldCheck,
  Disc3,
  Bookmark,
  Check,
} from 'lucide-react';
import {
  TOTAL_CIRCUITS,
  TOTAL_UNIQUE_COUNTRIES,
  TOTAL_LAPS,
  LONGEST_LAP_KM,
} from '../data/circuitsData';
import { NavTabId } from './Navbar';

interface TableauEmbedProps {
  storySrc?: string;
  publicUrl?: string;
  onSelectTab?: (tab: NavTabId) => void;
  isStandaloneTab?: boolean;
}

export const STORY_POINTS = [
  {
    index: 0,
    shortTitle: 'Season Overview & KPIs',
    fullTitle: 'Formula 1 Season Overview & Key Performance Metrics',
    description: 'Championship points trajectory, race wins, and season milestones.',
  },
  {
    index: 1,
    shortTitle: 'Driver Standings & DNF',
    fullTitle: 'Driver Standings & DNF Breakdown',
    description: 'Driver telemetry, podium finishes, and mechanical vs crash retirements.',
  },
  {
    index: 2,
    shortTitle: 'Constructor Championship',
    fullTitle: 'Constructor Championship & Team Performance',
    description: 'Team reliability indices, development race, and pit stop execution.',
  },
  {
    index: 3,
    shortTitle: 'Tyre Strategy & Circuits',
    fullTitle: 'Tyre Compound Strategy & Circuits Insights',
    description: 'Pirelli compound usage (C1–C5), thermal degradation, and circuit profiles.',
  },
];

export const TableauEmbed: React.FC<TableauEmbedProps> = ({
  storySrc = 'https://public.tableau.com/views/Formula1RacingPerformanceAnalyticsStoryDashboard/Story1',
  publicUrl = 'https://public.tableau.com/app/profile/mimansha.jhala/viz/Formula1RacingPerformanceAnalyticsStoryDashboard/Story1',
  onSelectTab,
  isStandaloneTab = true,
}) => {
  const [embedMode, setEmbedMode] = useState<'web-component' | 'iframe'>('web-component');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  // Default to Story Point 0 ('Formula 1 Season Overview & Key Performance Metrics')
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const [isActivatingPoint, setIsActivatingPoint] = useState(false);
  const vizRef = useRef<HTMLElement | null>(null);

  const iframeSrc = `${storySrc}?:showVizHome=no&:embed=true&:toolbar=bottom`;

  // Helper to programmatically activate a specific story point via Tableau Embedding API v3
  const activateStoryPoint = useCallback(async (targetIndex = 0) => {
    setActiveStoryIndex(targetIndex);
    const viz = vizRef.current as any;
    if (!viz) return;

    try {
      setIsActivatingPoint(true);
      let activeSheet = viz.workbook?.activeSheet;
      if (!activeSheet && typeof viz.workbook?.getActiveSheetAsync === 'function') {
        activeSheet = await viz.workbook.getActiveSheetAsync();
      }

      if (activeSheet && typeof activeSheet.activateStoryPointAsync === 'function') {
        await activeSheet.activateStoryPointAsync(targetIndex);
      }
    } catch (err) {
      console.warn('activateStoryPointAsync info/delay:', err);
    } finally {
      setIsActivatingPoint(false);
    }
  }, []);

  useEffect(() => {
    const scriptId = 'tableau-embedding-api-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      script.src = 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js';
      script.async = true;
      document.head.appendChild(script);
    }

    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [isLoading]);

  // Handle Tableau lifecycle events & activate the first story point by default
  useEffect(() => {
    const vizElement = vizRef.current;
    if (!vizElement) return;

    const handleFirstInteractive = async () => {
      setIsLoading(false);
      setLoadError(false);

      // Force first story point ('Formula 1 Season Overview & Key Performance Metrics')
      await activateStoryPoint(0);

      // Re-apply after short delays to ensure Tableau didn't fall back to a saved state
      setTimeout(() => activateStoryPoint(0), 400);
      setTimeout(() => activateStoryPoint(0), 1200);
    };

    const handleStorySwitched = (e: any) => {
      try {
        if (e && e.storyPoint && typeof e.storyPoint.index === 'number') {
          setActiveStoryIndex(e.storyPoint.index);
        }
      } catch {}
    };

    const handleError = () => {
      console.warn('Tableau Web Component error detected, switching to fallback iframe');
      setLoadError(true);
      setEmbedMode('iframe');
      setIsLoading(false);
    };

    vizElement.addEventListener('firstinteractive', handleFirstInteractive);
    vizElement.addEventListener('storypointswitched', handleStorySwitched);
    vizElement.addEventListener('tableau-error', handleError);

    return () => {
      vizElement.removeEventListener('firstinteractive', handleFirstInteractive);
      vizElement.removeEventListener('storypointswitched', handleStorySwitched);
      vizElement.removeEventListener('tableau-error', handleError);
    };
  }, [embedMode, activateStoryPoint]);

  const handleReload = () => {
    setIsLoading(true);
    setLoadError(false);
    const currentMode = embedMode;
    setEmbedMode(currentMode === 'web-component' ? 'iframe' : 'web-component');
    setTimeout(() => {
      setEmbedMode(currentMode);
      setTimeout(() => activateStoryPoint(0), 500);
    }, 120);
  };

  return (
    <section id="dashboard" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F] relative">
      <div className="max-w-7xl mx-auto">
        {/* Top Hero / Header for Default Home Landing Route */}
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161622] border border-[#2B2B3E] text-xs font-medium text-[#E2E8F0] mb-4 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
            <span className="font-heading tracking-wider uppercase text-[#E10600] font-semibold">
              Default Landing View · Story Point 1
            </span>
            <span className="text-[#64748B]">·</span>
            <span className="text-[#94A3B8]">Author: Mimansha Jhala</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-racing font-extrabold text-white uppercase tracking-tight leading-tight">
            Formula 1 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E10600] via-[#FF3B30] to-white">Race Intelligence</span> Dashboard
          </h1>

          <p className="mt-3 text-base sm:text-lg text-[#94A3B8] font-sans max-w-2xl mx-auto">
            Defaulting to <strong className="text-white font-medium">Tab 1: Season Overview & Key Performance Metrics</strong>.
            Explore driver standings, DNF reliability, team performance, and tyre wear dynamics below.
          </p>

          {/* Quick Telemetry KPI Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 text-left">
            <div className="bg-[#121218] border border-[#20202E] p-3 sm:p-4 rounded-xl">
              <div className="text-xs text-[#64748B] uppercase tracking-wider font-heading">Championship</div>
              <div className="text-xl sm:text-2xl font-racing font-bold text-white tabular-nums mt-0.5">
                {TOTAL_CIRCUITS} <span className="text-xs font-sans text-[#E10600] font-normal">Venues</span>
              </div>
            </div>

            <div className="bg-[#121218] border border-[#20202E] p-3 sm:p-4 rounded-xl">
              <div className="text-xs text-[#64748B] uppercase tracking-wider font-heading">Global Reach</div>
              <div className="text-xl sm:text-2xl font-racing font-bold text-white tabular-nums mt-0.5">
                {TOTAL_UNIQUE_COUNTRIES} <span className="text-xs font-sans text-[#E10600] font-normal">Countries</span>
              </div>
            </div>

            <div className="bg-[#121218] border border-[#20202E] p-3 sm:p-4 rounded-xl">
              <div className="text-xs text-[#64748B] uppercase tracking-wider font-heading">Total Distance</div>
              <div className="text-xl sm:text-2xl font-racing font-bold text-white tabular-nums mt-0.5">
                {TOTAL_LAPS.toLocaleString()} <span className="text-xs font-sans text-[#E10600] font-normal">Laps</span>
              </div>
            </div>

            <div className="bg-[#121218] border border-[#20202E] p-3 sm:p-4 rounded-xl">
              <div className="text-xs text-[#64748B] uppercase tracking-wider font-heading">Longest Lap</div>
              <div className="text-xl sm:text-2xl font-racing font-bold text-white tabular-nums mt-0.5">
                {LONGEST_LAP_KM.toFixed(3)} <span className="text-xs font-sans text-[#E10600] font-normal">km (Spa)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Point Tab Bar Selector */}
        <div className="mb-4 bg-[#121218] border border-[#20202E] rounded-xl p-2.5">
          <div className="flex items-center justify-between gap-3 px-2 mb-2 text-xs">
            <span className="font-heading uppercase tracking-wider text-[#94A3B8] font-semibold flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-[#E10600]" />
              <span>Tableau Story Points</span>
            </span>
            <div className="text-[11px] text-[#64748B] hidden sm:block">
              Click any tab to switch view programmatically
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {STORY_POINTS.map((sp) => {
              const isSelected = activeStoryIndex === sp.index;
              return (
                <button
                  key={sp.index}
                  onClick={() => activateStoryPoint(sp.index)}
                  className={`flex flex-col text-left p-3 rounded-lg border transition-all duration-200 relative ${
                    isSelected
                      ? 'bg-[#1C1C28] border-[#E10600] shadow-[0_0_15px_rgba(225,6,0,0.25)]'
                      : 'bg-[#0E0E14] border-[#222230] hover:border-[#38384C] hover:bg-[#151520]'
                  }`}
                  aria-label={`Select Story Point ${sp.index + 1}: ${sp.fullTitle}`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                        isSelected ? 'text-[#E10600]' : 'text-[#64748B]'
                      }`}
                    >
                      Point 0{sp.index + 1} {isSelected && '• Active'}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#E10600]" />}
                  </div>
                  <div
                    className={`text-xs font-bold font-heading line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-[#C5C5D2]'
                    }`}
                  >
                    {sp.shortTitle}
                  </div>
                  <div className="text-[10px] text-[#828294] mt-0.5 line-clamp-1">
                    {sp.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dashboard Frame Container with Red Glowing Border */}
        <div className="relative rounded-2xl border-2 border-[#E10600]/45 shadow-[0_0_45px_rgba(225,6,0,0.2)] bg-[#101017] p-2 sm:p-4 transition-all duration-300 overflow-hidden">
          {/* Top toolbar within the frame */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2.5 mb-2 border-b border-[#222232] text-xs text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E10600] inline-block animate-pulse" />
              <span className="font-semibold text-white font-heading tracking-wide">
                {STORY_POINTS[activeStoryIndex]?.fullTitle || 'Formula 1 Season Overview & Key Performance Metrics'}
              </span>
              <span className="text-[#64748B] hidden sm:inline">|</span>
              <span className="text-[#64748B] hidden sm:inline">Tableau Public Story</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Quick Reset to Story Point 1 */}
              <button
                onClick={() => activateStoryPoint(0)}
                className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors flex items-center gap-1.5 ${
                  activeStoryIndex === 0
                    ? 'bg-[#E10600]/15 text-[#FF6B6B] border-[#E10600]/40'
                    : 'bg-[#181824] text-[#94A3B8] border-[#2B2B3D] hover:text-white'
                }`}
                title="Reset to Tab 1 (Formula 1 Season Overview & Key Performance Metrics)"
              >
                <span>Tab 1 (Overview)</span>
              </button>

              {/* Embed mode switcher */}
              <div className="flex items-center rounded-lg bg-[#181824] p-0.5 border border-[#2B2B3D]">
                <button
                  onClick={() => {
                    setEmbedMode('web-component');
                    setIsLoading(true);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    embedMode === 'web-component'
                      ? 'bg-[#E10600] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Tableau-Viz v3
                </button>
                <button
                  onClick={() => {
                    setEmbedMode('iframe');
                    setIsLoading(true);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    embedMode === 'iframe'
                      ? 'bg-[#E10600] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Fallback iFrame
                </button>
              </div>

              <button
                onClick={handleReload}
                className="p-1.5 rounded bg-[#181824] border border-[#2B2B3D] text-[#94A3B8] hover:text-white hover:border-[#E10600] transition-colors"
                title="Reload Dashboard"
                aria-label="Reload Dashboard"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded bg-[#181824] border border-[#2B2B3D] text-[#94A3B8] hover:text-white hover:border-[#E10600] transition-colors"
                title="View in new tab"
                aria-label="View on Tableau Public"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Visual Embed Container */}
          <div className="relative w-full rounded-xl overflow-hidden bg-[#0A0A0E] min-h-[700px] lg:min-h-[850px] flex items-center justify-center">
            {/* Loading Skeleton */}
            {isLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0B0B0F]/95 backdrop-blur-sm p-6 text-center">
                <div className="w-16 h-16 rounded-full border-4 border-[#222230] border-t-[#E10600] animate-spin mb-4" />
                <div className="text-lg font-bold font-racing text-white tracking-wider uppercase">
                  Loading Season Overview & Key Performance Metrics
                </div>
                <p className="text-xs text-[#94A3B8] mt-2 max-w-md">
                  Activating Story Point 1 ('Formula 1 Season Overview & Key Performance Metrics')...
                </p>
                <div className="mt-4 flex items-center gap-2 text-[11px] text-[#64748B]">
                  <span>Connecting to public.tableau.com</span>
                </div>
              </div>
            )}

            {/* Embed Presentation */}
            {embedMode === 'web-component' ? (
              <div className="w-full h-full min-h-[700px] lg:min-h-[850px] overflow-auto">
                <tableau-viz
                  ref={vizRef}
                  id="tableauViz"
                  src={storySrc}
                  toolbar="bottom"
                  hide-tabs
                  className="w-full h-full min-h-[700px] lg:min-h-[850px] block border-0"
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            ) : (
              <iframe
                title="Formula 1 Racing Performance Analytics Tableau Story"
                src={iframeSrc}
                className="w-full h-full min-h-[700px] lg:min-h-[850px] border-0"
                onLoad={() => setIsLoading(false)}
                allowFullScreen
              />
            )}
          </div>
        </div>

        {/* Below Embed Action & Helpful Note */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1C1C28]">
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#E10600] hover:bg-[#B80500] text-white text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(225,6,0,0.35)] hover:shadow-[0_0_28px_rgba(225,6,0,0.55)] active:scale-95"
          >
            <span>Open full dashboard on Tableau Public</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#94A3B8] bg-[#14141E] px-4 py-2.5 rounded-lg border border-[#222232]">
            <span className="w-2 h-2 rounded-full bg-[#E10600]" />
            <span>
              <strong className="text-white font-medium">Tip:</strong> First tab ('Formula 1 Season Overview') is selected by default.
            </span>
          </div>
        </div>

        {/* Quick Route Cards: Jump to other sections */}
        {onSelectTab && (
          <div className="mt-14 pt-10 border-t border-[#1C1C28]">
            <div className="text-xs uppercase font-heading tracking-widest text-[#64748B] mb-4">
              Explore More Sections
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => onSelectTab('circuits')}
                className="flex items-center justify-between p-4 rounded-xl bg-[#121218] border border-[#20202E] hover:border-[#E10600]/50 transition-all text-left group"
              >
                <div>
                  <div className="flex items-center gap-2 text-[#E10600] font-heading font-semibold text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>29 Circuits Explorer</span>
                  </div>
                  <p className="text-xs text-[#8E8EA0] mt-1">
                    Search, filter, and inspect track telemetry & elevation profiles.
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#64748B] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => onSelectTab('insights')}
                className="flex items-center justify-between p-4 rounded-xl bg-[#121218] border border-[#20202E] hover:border-[#E10600]/50 transition-all text-left group"
              >
                <div>
                  <div className="flex items-center gap-2 text-[#E10600] font-heading font-semibold text-sm">
                    <Lightbulb className="w-4 h-4" />
                    <span>Key Strategic Insights</span>
                  </div>
                  <p className="text-xs text-[#8E8EA0] mt-1">
                    Driver rankings, team reliability coefficients, and tyre compounds.
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#64748B] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => onSelectTab('overview')}
                className="flex items-center justify-between p-4 rounded-xl bg-[#121218] border border-[#20202E] hover:border-[#E10600]/50 transition-all text-left group"
              >
                <div>
                  <div className="flex items-center gap-2 text-[#E10600] font-heading font-semibold text-sm">
                    <Info className="w-4 h-4" />
                    <span>Project Overview & KPIs</span>
                  </div>
                  <p className="text-xs text-[#8E8EA0] mt-1">
                    Season milestones, 4 core dashboard pillars, and methodology.
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#64748B] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
