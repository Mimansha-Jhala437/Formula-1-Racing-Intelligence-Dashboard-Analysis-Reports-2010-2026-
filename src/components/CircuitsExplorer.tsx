import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Compass,
  ArrowUpDown,
  RotateCcw,
  Gauge,
  Mountain,
  Flag,
  MapPin,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { CIRCUITS_DATA, Circuit, calculateRaceDistance } from '../data/circuitsData';
import { CircuitCharts } from './CircuitCharts';

export const CircuitsExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedDirection, setSelectedDirection] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'lap_km' | 'altitude_m' | 'laps' | 'distance' | 'name'>('lap_km');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedCircuits = useMemo(() => {
    return CIRCUITS_DATA.filter((circuit) => {
      const matchesSearch =
        circuit.circuit_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        circuit.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        circuit.country.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType === 'ALL' || circuit.type === selectedType;
      const matchesDirection = selectedDirection === 'ALL' || circuit.direction === selectedDirection;

      return matchesSearch && matchesType && matchesDirection;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'lap_km') {
        comparison = a.lap_km - b.lap_km;
      } else if (sortBy === 'altitude_m') {
        comparison = a.altitude_m - b.altitude_m;
      } else if (sortBy === 'laps') {
        comparison = a.laps - b.laps;
      } else if (sortBy === 'distance') {
        comparison = calculateRaceDistance(a.laps, a.lap_km) - calculateRaceDistance(b.laps, b.lap_km);
      } else if (sortBy === 'name') {
        comparison = a.circuit_name.localeCompare(b.circuit_name);
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [searchTerm, selectedType, selectedDirection, sortBy, sortOrder]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedType('ALL');
    setSelectedDirection('ALL');
    setSortBy('lap_km');
    setSortOrder('desc');
  };

  const hasActiveFilters = searchTerm !== '' || selectedType !== 'ALL' || selectedDirection !== 'ALL';

  return (
    <section id="circuits" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0E0E14] border-t border-[#1C1C28]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#E10600] font-heading mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
              Database & Telemetry
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-racing font-bold text-white uppercase tracking-tight">
              Circuits Explorer
            </h2>
            <p className="mt-3 text-base text-[#94A3B8] max-w-2xl font-sans">
              Search, filter, and inspect physical track geometry, lap distances, race lengths, and elevation
              profiles across all 29 venues in the championship dataset.
            </p>
          </div>

          <div className="text-sm font-mono text-[#94A3B8] bg-[#14141E] px-4 py-2.5 rounded-xl border border-[#222232] self-start md:self-auto flex items-center gap-2">
            <span>Showing:</span>
            <span className="text-[#E10600] font-bold text-base">{filteredAndSortedCircuits.length}</span>
            <span>of {CIRCUITS_DATA.length} circuits</span>
          </div>
        </div>

        {/* Circuit Insights Mini-Row (Charts) */}
        <CircuitCharts />

        {/* Controls: Search, Filters, and Sorting */}
        <div className="bg-[#121218] border border-[#222230] rounded-xl p-4 sm:p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <label htmlFor="circuit-search" className="sr-only">
                Search circuits, city or country
              </label>
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
              <input
                id="circuit-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search circuit, city, or country..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#0B0B0F] border border-[#282838] rounded-lg text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#E10600] transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#64748B] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Type Filter */}
            <div className="md:col-span-3">
              <label htmlFor="type-filter" className="sr-only">
                Filter by Type
              </label>
              <select
                id="type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#0B0B0F] border border-[#282838] rounded-lg text-sm text-[#E2E8F0] focus:outline-none focus:border-[#E10600] transition-colors"
              >
                <option value="ALL">All Track Types</option>
                <option value="Permanent">Permanent Facility</option>
                <option value="Street">Street Circuit</option>
                <option value="Street/Park">Street / Park Hybrid</option>
              </select>
            </div>

            {/* Direction Filter */}
            <div className="md:col-span-2">
              <label htmlFor="direction-filter" className="sr-only">
                Filter by Direction
              </label>
              <select
                id="direction-filter"
                value={selectedDirection}
                onChange={(e) => setSelectedDirection(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#0B0B0F] border border-[#282838] rounded-lg text-sm text-[#E2E8F0] focus:outline-none focus:border-[#E10600] transition-colors"
              >
                <option value="ALL">All Directions</option>
                <option value="Clockwise">Clockwise ↻</option>
                <option value="Anti-clockwise">Anti-clockwise ↺</option>
                <option value="Mixed">Mixed (Figure-8)</option>
              </select>
            </div>

            {/* Sort Dropdown & Toggle Order */}
            <div className="md:col-span-3 flex items-center gap-2">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort circuits by"
                className="w-full px-3 py-2.5 bg-[#0B0B0F] border border-[#282838] rounded-lg text-sm text-[#E2E8F0] focus:outline-none focus:border-[#E10600] transition-colors"
              >
                <option value="lap_km">Sort: Lap Length</option>
                <option value="altitude_m">Sort: Altitude</option>
                <option value="laps">Sort: Lap Count</option>
                <option value="distance">Sort: Total Race Distance</option>
                <option value="name">Sort: Circuit Name</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2.5 bg-[#0B0B0F] border border-[#282838] rounded-lg text-[#94A3B8] hover:text-white hover:border-[#E10600] transition-colors shrink-0"
                title={`Toggle sort order (Current: ${sortOrder.toUpperCase()})`}
                aria-label="Toggle sort order"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active filters pill list / reset */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-[#1C1C26] text-xs">
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <span>Filters active:</span>
                {selectedType !== 'ALL' && (
                  <span className="text-white bg-[#1C1C26] px-2 py-0.5 rounded">Type: {selectedType}</span>
                )}
                {selectedDirection !== 'ALL' && (
                  <span className="text-white bg-[#1C1C26] px-2 py-0.5 rounded">Direction: {selectedDirection}</span>
                )}
                {searchTerm && (
                  <span className="text-white bg-[#1C1C26] px-2 py-0.5 rounded">Query: "{searchTerm}"</span>
                )}
              </div>
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-[#E10600] hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredAndSortedCircuits.length === 0 && (
          <div className="bg-[#121218] border border-[#222230] rounded-xl p-12 text-center my-8">
            <MapPin className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white font-heading">No Circuits Found</h4>
            <p className="text-sm text-[#94A3B8] mt-1 max-w-sm mx-auto">
              No Grand Prix venues match your search query or filter selection.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-[#E10600] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#B80500] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Responsive Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCircuits.map((circuit) => {
            const raceDistance = calculateRaceDistance(circuit.laps, circuit.lap_km);

            return (
              <div
                key={circuit.circuit_id}
                className="bg-[#121218] border border-[#20202E] rounded-xl p-5 hover:border-[#E10600]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.6)] flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Badges for Type and Direction */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                        circuit.type === 'Permanent'
                          ? 'bg-[#E10600]/10 text-[#FF4D4D] border-[#E10600]/30'
                          : circuit.type === 'Street'
                          ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {circuit.type}
                    </span>

                    <span className="text-[11px] text-[#94A3B8] bg-[#181824] px-2.5 py-1 rounded-md border border-[#252536] flex items-center gap-1 font-mono">
                      <Compass className="w-3 h-3 text-[#64748B]" />
                      <span>{circuit.direction}</span>
                    </span>
                  </div>

                  {/* Circuit Name */}
                  <h3 className="text-lg font-bold font-heading text-white group-hover:text-[#E10600] transition-colors leading-snug">
                    {circuit.circuit_name}
                  </h3>

                  {/* Location with Flag Emoji */}
                  <div className="flex items-center gap-2 text-sm text-[#94A3B8] mt-1.5 mb-5 font-sans">
                    <span className="text-base" role="img" aria-label={circuit.country}>
                      {circuit.flag}
                    </span>
                    <span>{circuit.city}, {circuit.country}</span>
                  </div>
                </div>

                {/* Circuit Metrics Grid */}
                <div className="pt-4 border-t border-[#1C1C26] grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#0B0B0F] p-2.5 rounded-lg border border-[#1A1A24]">
                    <div className="text-[#64748B] uppercase tracking-wider text-[10px] font-heading">
                      Lap Length
                    </div>
                    <div className="font-mono text-white text-sm font-semibold mt-0.5 tabular-nums">
                      {circuit.lap_km.toFixed(3)} km
                    </div>
                  </div>

                  <div className="bg-[#0B0B0F] p-2.5 rounded-lg border border-[#1A1A24]">
                    <div className="text-[#64748B] uppercase tracking-wider text-[10px] font-heading">
                      Grand Prix Laps
                    </div>
                    <div className="font-mono text-white text-sm font-semibold mt-0.5 tabular-nums">
                      {circuit.laps} laps
                    </div>
                  </div>

                  <div className="bg-[#0B0B0F] p-2.5 rounded-lg border border-[#1A1A24]">
                    <div className="text-[#64748B] uppercase tracking-wider text-[10px] font-heading">
                      Race Distance
                    </div>
                    <div className="font-mono text-[#E10600] text-sm font-semibold mt-0.5 tabular-nums">
                      {raceDistance.toFixed(1)} km
                    </div>
                  </div>

                  <div className="bg-[#0B0B0F] p-2.5 rounded-lg border border-[#1A1A24]">
                    <div className="text-[#64748B] uppercase tracking-wider text-[10px] font-heading">
                      Altitude (MSL)
                    </div>
                    <div className="font-mono text-white text-sm font-semibold mt-0.5 tabular-nums flex items-center gap-1">
                      <Mountain className="w-3 h-3 text-[#64748B]" />
                      <span>{circuit.altitude_m} m</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
