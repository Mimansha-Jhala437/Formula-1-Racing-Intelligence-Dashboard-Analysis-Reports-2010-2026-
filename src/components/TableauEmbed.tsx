import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, RefreshCw, Maximize2, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';


interface TableauEmbedProps {
  storySrc?: string;
  publicUrl?: string;
}

export const TableauEmbed: React.FC<TableauEmbedProps> = ({
  storySrc = 'https://public.tableau.com/views/Formula1RacingPerformanceAnalyticsStoryDashboard/Story1',
  publicUrl = 'https://public.tableau.com/app/profile/mimansha.jhala/viz/Formula1RacingPerformanceAnalyticsStoryDashboard/Story1',
}) => {
  const [embedMode, setEmbedMode] = useState<'web-component' | 'iframe'>('web-component');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const vizRef = useRef<HTMLElement | null>(null);

  const iframeSrc = `${storySrc}?:showVizHome=no&:embed=true&:toolbar=bottom`;

  useEffect(() => {
    // If the Tableau script isn't loaded yet, make sure it is in document
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

    // Set a safety timeout: if web component doesn't finish or custom element isn't supported after 10s, offer fallback
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Hook into tableau-viz custom element events
  useEffect(() => {
    const vizElement = vizRef.current;
    if (!vizElement) return;

    const handleFirstInteractive = () => {
      setIsLoading(false);
      setLoadError(false);
    };

    const handleError = () => {
      console.warn('Tableau Web Component error event detected, switching to fallback iframe');
      setLoadError(true);
      setEmbedMode('iframe');
      setIsLoading(false);
    };

    vizElement.addEventListener('firstinteractive', handleFirstInteractive);
    vizElement.addEventListener('tableau-error', handleError);

    return () => {
      vizElement.removeEventListener('firstinteractive', handleFirstInteractive);
      vizElement.removeEventListener('tableau-error', handleError);
    };
  }, [embedMode]);

  const handleReload = () => {
    setIsLoading(true);
    setLoadError(false);
    const currentMode = embedMode;
    setEmbedMode(currentMode === 'web-component' ? 'iframe' : 'web-component');
    setTimeout(() => {
      setEmbedMode(currentMode);
    }, 100);
  };

  return (
    <section id="dashboard" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181824] border border-[#262638] text-xs font-semibold text-[#E10600] uppercase tracking-widest font-heading mb-3">
            <span>Official Embedding API v3</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-racing font-bold text-white uppercase tracking-tight">
            Interactive Dashboard
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8] font-sans">
            Explore race intelligence stories, lap-by-lap telemetry, DNF breakdowns, and tyre wear dynamics
            directly within the interactive Tableau Public container.
          </p>
        </div>

        {/* Dashboard Frame Container with Red Glowing Border */}
        <div className="relative rounded-2xl border-2 border-[#E10600]/40 shadow-[0_0_40px_rgba(225,6,0,0.18)] bg-[#101017] p-2 sm:p-4 transition-all duration-300 overflow-hidden">
          {/* Top toolbar within the frame */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2.5 mb-2 border-b border-[#222232] text-xs text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E10600] inline-block animate-pulse" />
              <span className="font-semibold text-white font-heading tracking-wide">
                Formula 1 Racing Performance Analytics Story
              </span>
              <span className="text-[#64748B] hidden sm:inline">|</span>
              <span className="text-[#64748B] hidden sm:inline">Tableau Public v2024.x</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Mode switch */}
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
                  Loading Race Intelligence Story
                </div>
                <p className="text-xs text-[#94A3B8] mt-2 max-w-md">
                  Fetching live Tableau Public workbook visuals, driver charts, and telemetry breakdowns...
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
              <strong className="text-white font-medium">Tip:</strong> Use fullscreen on Tableau for the best experience.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
