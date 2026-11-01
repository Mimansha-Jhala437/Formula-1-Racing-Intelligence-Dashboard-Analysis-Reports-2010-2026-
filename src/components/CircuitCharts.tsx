import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';
import { CIRCUITS_DATA } from '../data/circuitsData';

const F1_COLORS = ['#E10600', '#FF3B30', '#FF6961', '#8E8E93', '#3A3A3C'];

export const CircuitCharts: React.FC = () => {
  // 1. Top 10 longest lap circuits
  const longestCircuits = [...CIRCUITS_DATA]
    .sort((a, b) => b.lap_km - a.lap_km)
    .slice(0, 10)
    .map((c) => ({
      name: c.circuit_name.split(' (')[0].replace('Circuit de ', '').replace('International ', '').replace('Autódromo ', ''),
      fullName: c.circuit_name,
      lap_km: c.lap_km,
      country: c.country,
      flag: c.flag,
    }));

  // 2. Circuits by Type
  const typeCounts = CIRCUITS_DATA.reduce((acc, c) => {
    acc[c.type] = (acc[c.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeData = Object.entries(typeCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // 3. Top 10 highest altitude circuits
  const highestAltitudes = [...CIRCUITS_DATA]
    .sort((a, b) => b.altitude_m - a.altitude_m)
    .slice(0, 10)
    .map((c) => ({
      name: c.circuit_name.split(' (')[0].replace('Circuit de ', '').replace('International ', '').replace('Autódromo ', ''),
      fullName: c.circuit_name,
      altitude_m: c.altitude_m,
      country: c.country,
      flag: c.flag,
    }));

  const TYPE_COLOR_MAP: Record<string, string> = {
    Permanent: '#E10600',
    Street: '#38BDF8',
    'Street/Park': '#FBBF24',
  };

  return (
    <div className="mb-14 space-y-6">
      <div className="flex items-center justify-between border-b border-[#20202E] pb-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-racing font-bold text-white tracking-wide uppercase">
            Circuit Analytics Insights
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Interactive comparative metrics across modern Grand Prix layouts
          </p>
        </div>
        <div className="text-xs text-[#E10600] font-heading font-semibold uppercase tracking-wider hidden sm:block">
          Telemetry & Topography
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* a) Top 10 Longest Circuits */}
        <div className="bg-[#121218] border border-[#222230] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold font-heading text-white tracking-wide uppercase">
                Lap Length (Top 10 Longest)
              </span>
              <span className="text-xs text-[#E10600] font-mono tabular-nums">km / lap</span>
            </div>
            <p className="text-xs text-[#828294] mb-4">
              Spa-Francorchamps leads with 7.004 km, followed by Las Vegas and Jeddah.
            </p>
          </div>

          <div className="h-[270px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={longestCircuits}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1F1F2B" />
                <XAxis
                  type="number"
                  domain={[3, 8]}
                  tick={{ fill: '#828294', fontSize: 11 }}
                  unit=" km"
                  stroke="#2E2E3E"
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: '#C5C5D2', fontSize: 10 }}
                  width={90}
                  stroke="#2E2E3E"
                />
                <Tooltip
                  cursor={{ fill: 'rgba(225, 6, 0, 0.08)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#1A1A24] border border-[#333346] p-2.5 rounded-lg text-xs shadow-xl">
                          <p className="font-bold text-white flex items-center gap-1.5">
                            <span>{data.flag}</span>
                            <span>{data.fullName}</span>
                          </p>
                          <p className="text-[#E10600] font-mono mt-1 font-semibold">
                            {data.lap_km} km
                          </p>
                          <p className="text-[#8E8EA0] text-[11px]">{data.country}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="lap_km" radius={[0, 4, 4, 0]}>
                  {longestCircuits.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#E10600' : index < 3 ? '#FF453A' : '#71717A'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* b) Donut Chart: Circuits by Type */}
        <div className="bg-[#121218] border border-[#222230] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold font-heading text-white tracking-wide uppercase">
                Circuits by Type
              </span>
              <span className="text-xs text-[#E10600] font-mono tabular-nums">29 venues</span>
            </div>
            <p className="text-xs text-[#828294] mb-4">
              Permanent raceways make up the majority, complemented by modern street layouts.
            </p>
          </div>

          <div className="h-[210px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#1A1A24] border border-[#333346] p-2.5 rounded-lg text-xs shadow-xl">
                          <p className="font-bold text-white">{data.name}</p>
                          <p className="text-[#E10600] font-mono font-semibold mt-0.5">
                            {data.value} circuits ({((data.value / 29) * 100).toFixed(1)}%)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {typeData.map((entry) => (
                    <Cell
                      key={`type-${entry.name}`}
                      fill={TYPE_COLOR_MAP[entry.name] || '#8E8E93'}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-racing font-extrabold text-white">29</span>
              <span className="text-[10px] uppercase tracking-wider text-[#8E8EA0] font-heading">
                Tracks
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 pt-2 border-t border-[#1C1C26]">
            {typeData.map((t) => (
              <div key={t.name} className="flex items-center gap-1.5 text-xs text-[#C5C5D2]">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: TYPE_COLOR_MAP[t.name] || '#8E8E93' }}
                />
                <span>{t.name}:</span>
                <span className="font-mono text-white font-semibold">{t.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* c) Top 10 Highest Altitude Circuits */}
        <div className="bg-[#121218] border border-[#222230] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold font-heading text-white tracking-wide uppercase">
                Altitude Comparison (Top 10)
              </span>
              <span className="text-xs text-[#E10600] font-mono tabular-nums">Meters MSL</span>
            </div>
            <p className="text-xs text-[#828294] mb-4">
              Mexico City stands at an extreme 2,285m, significantly reducing air density and downforce.
            </p>
          </div>

          <div className="h-[270px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={highestAltitudes}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1F1F2B" />
                <XAxis
                  type="number"
                  domain={[0, 2400]}
                  tick={{ fill: '#828294', fontSize: 11 }}
                  unit="m"
                  stroke="#2E2E3E"
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: '#C5C5D2', fontSize: 10 }}
                  width={90}
                  stroke="#2E2E3E"
                />
                <Tooltip
                  cursor={{ fill: 'rgba(225, 6, 0, 0.08)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#1A1A24] border border-[#333346] p-2.5 rounded-lg text-xs shadow-xl">
                          <p className="font-bold text-white flex items-center gap-1.5">
                            <span>{data.flag}</span>
                            <span>{data.fullName}</span>
                          </p>
                          <p className="text-[#38BDF8] font-mono mt-1 font-semibold">
                            {data.altitude_m} meters ({Math.round(data.altitude_m * 3.28084)} ft)
                          </p>
                          <p className="text-[#8E8EA0] text-[11px]">{data.country}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="altitude_m" radius={[0, 4, 4, 0]}>
                  {highestAltitudes.map((entry, index) => (
                    <Cell
                      key={`alt-${index}`}
                      fill={index === 0 ? '#E10600' : index < 3 ? '#FF6B6B' : '#52525B'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
