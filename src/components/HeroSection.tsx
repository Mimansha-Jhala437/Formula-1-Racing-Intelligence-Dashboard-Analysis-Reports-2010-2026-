import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Gauge, Globe2, Flag, ArrowRight, Activity, MapPin } from 'lucide-react';
import { TOTAL_CIRCUITS, TOTAL_UNIQUE_COUNTRIES, TOTAL_LAPS, LONGEST_LAP_KM } from '../data/circuitsData';

interface CounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  label: string;
  subtext: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  end,
  duration = 1800,
  decimals = 0,
  suffix = '',
  label,
  subtext,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(easeOut * end);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  const formattedValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();

  return (
    <div
      ref={ref}
      className="p-5 sm:p-6 bg-[#121218]/90 backdrop-blur-sm border border-[#222230] rounded-xl relative overflow-hidden group hover:border-[#E10600]/60 transition-all duration-300 hover:shadow-[0_0_25px_rgba(225,6,0,0.12)]"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-[#E10600] opacity-40 group-hover:opacity-100 transition-opacity" />
      <div className="text-3xl sm:text-4xl lg:text-5xl font-racing font-extrabold text-white tabular-nums tracking-tight mb-1 flex items-baseline gap-1">
        <span>{formattedValue}</span>
        {suffix && <span className="text-xl sm:text-2xl text-[#E10600] font-sans font-semibold">{suffix}</span>}
      </div>
      <div className="text-sm font-semibold tracking-wide text-[#F3F4F6] uppercase font-heading">
        {label}
      </div>
      <div className="text-xs text-[#94A3B8] mt-0.5">
        {subtext}
      </div>
    </div>
  );
};

interface HeroSectionProps {
  onSelectTab?: (tab: 'dashboard' | 'circuits' | 'overview' | 'insights' | 'skills') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
  const handleNav = (tabId: 'dashboard' | 'circuits') => {
    if (onSelectTab) {
      onSelectTab(tabId);
    } else {
      const el = document.getElementById(tabId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 speedlines-bg overflow-hidden">
      {/* Decorative track lines / SVG background accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <path
            d="M-100,500 C300,300 600,700 1100,350 C1300,200 1500,400 1600,300"
            fill="none"
            stroke="#E10600"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          <path
            d="M-50,650 C400,450 750,850 1200,450 C1400,300 1550,500 1650,400"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center my-auto">
        {/* Category tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822] border border-[#2D2D3E] text-xs font-medium text-[#E2E8F0] mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
          <span className="font-heading tracking-wider uppercase text-[#E10600] font-semibold">Tableau Public Story</span>
          <span className="text-[#64748B]">·</span>
          <span>End-to-End Race Intelligence</span>
        </div>

        {/* Big Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-racing font-black text-white tracking-tight uppercase max-w-5xl leading-[1.08] mb-6 drop-shadow-md">
          Formula 1 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E10600] via-[#FF3B30] to-white">Racing Performance</span> Analytics
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-[#94A3B8] max-w-3xl font-light mb-10 leading-relaxed font-sans">
          Drivers, teams, tyres and circuits, explored through data.
        </p>

        {/* Two Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 sm:mb-20 w-full sm:w-auto">
          <button
            onClick={() => handleNav('dashboard')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-[#E10600] hover:bg-[#B80500] text-white text-sm sm:text-base font-semibold uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(225,6,0,0.45)] hover:shadow-[0_0_35px_rgba(225,6,0,0.65)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>View Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleNav('circuits')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-[#14141E] hover:bg-[#1D1D2B] text-[#E2E8F0] hover:text-white text-sm sm:text-base font-semibold uppercase tracking-wider border border-[#2B2B3D] hover:border-[#E10600]/50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <MapPin className="w-4 h-4 text-[#E10600]" />
            <span>Explore Circuits</span>
          </button>
        </div>

        {/* 4 Animated Counter Stats (Count-up on scroll) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
          <AnimatedCounter
            end={TOTAL_CIRCUITS}
            label="Championship Venues"
            subtext="Modern & historic Grand Prix circuits"
          />
          <AnimatedCounter
            end={TOTAL_UNIQUE_COUNTRIES}
            label="Host Countries"
            subtext="Global racing destinations"
          />
          <AnimatedCounter
            end={TOTAL_LAPS}
            label="Total Calendar Laps"
            subtext="Combined distance across 29 tracks"
          />
          <AnimatedCounter
            end={LONGEST_LAP_KM}
            decimals={3}
            suffix="km"
            label="Longest Circuit Lap"
            subtext="Circuit de Spa-Francorchamps (Belgium)"
          />
        </div>
      </div>

      {/* Down indicator */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => {
            const el = document.getElementById('overview');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-[#64748B] hover:text-[#E10600] transition-colors p-2"
          aria-label="Scroll to Project Overview"
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
