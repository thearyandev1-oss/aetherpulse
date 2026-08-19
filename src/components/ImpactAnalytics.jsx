import React, { useState, useEffect } from 'react';
import { BarChart3, Activity, TrendingDown, Clock, Cloud, Zap, ShieldCheck, ArrowRight, Leaf, Users, Route } from 'lucide-react';

export default function ImpactAnalytics({ juryDemoPhase }) {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 1;
      
      let fixedE = 0, dynE = 0;
      if (juryDemoPhase === 0) {
        fixedE = 100 + Math.random() * 20;
        dynE = 100 + Math.random() * 20;
      } else if (juryDemoPhase === 1) {
        fixedE = 120 + t * 2 + Math.random() * 30; // Spiking
        dynE = 0; 
      } else if (juryDemoPhase === 2 || juryDemoPhase === 3) {
        fixedE = 180 + Math.random() * 30; 
        dynE = 60 + Math.random() * 15; // Lower and stable
      }

      setDataPoints(prev => {
        const next = [...prev, { time: t, fixed: fixedE, dynamic: dynE }];
        if (next.length > 30) next.shift(); // Keep last 30 points
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [juryDemoPhase]);

  const maxVal = Math.max(250, ...dataPoints.map(d => Math.max(d.fixed, d.dynamic)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center flex-shrink-0 shadow-sm">
          <BarChart3 className="w-6 h-6 text-indigo-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">City-Wide Impact Analytics</h2>
          <p className="text-sm text-gray-500 font-medium">Real-time performance comparison: Fixed Timers vs EADSO Mesh</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Wait Time */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm relative overflow-hidden group hover:shadow-md transition">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Avg Wait Time</h3>
            <div className="flex items-end gap-3 mb-4">
              <div className="text-3xl font-bold text-gray-900">3.4 <span className="text-base text-gray-500">m</span></div>
              <div className="text-sm font-bold text-gray-400 line-through mb-1">6.8 m</div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-xl text-sm font-bold">
              <TrendingDown className="w-4 h-4" /> 50.0% Reduction
            </div>
          </div>
        </div>

        {/* Emissions */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm relative overflow-hidden group hover:shadow-md transition">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-4 text-green-600">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Idle CO₂ Emission</h3>
            <div className="flex items-end gap-3 mb-4">
              <div className="text-3xl font-bold text-gray-900">19.2 <span className="text-base text-gray-500">kg/h</span></div>
              <div className="text-sm font-bold text-gray-400 line-through mb-1">28.4 kg</div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-xl text-sm font-bold">
              <TrendingDown className="w-4 h-4" /> 32.4% Cut
            </div>
          </div>
        </div>

        {/* Reliability */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm relative overflow-hidden group hover:shadow-md transition">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-4 text-purple-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Transit Punctual</h3>
            <div className="flex items-end gap-3 mb-4">
              <div className="text-3xl font-bold text-gray-900">93 <span className="text-base text-gray-500">%</span></div>
              <div className="text-sm font-bold text-gray-400 line-through mb-1">64%</div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-xl text-sm font-bold">
              <Zap className="w-4 h-4" /> +29% Reliability
            </div>
          </div>
        </div>
        
        {/* Multi-Modal Utilization */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm relative overflow-hidden group hover:shadow-md transition">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-4 text-indigo-600">
              <Route className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Multi-Modal Splits</h3>
            <div className="flex items-end gap-3 mb-4">
              <div className="text-3xl font-bold text-gray-900">14k <span className="text-base text-gray-500">/day</span></div>
              <div className="text-sm font-bold text-gray-400 line-through mb-1">2k</div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-800 rounded-xl text-sm font-bold">
              <Users className="w-4 h-4" /> 7x Adoption
            </div>
          </div>
        </div>
      </div>

      {/* Live Chart */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2"><Activity className="w-5 h-5 text-gray-400"/> Live Carbon Output vs Baseline</h3>
          <div className="flex items-center gap-4 text-sm font-bold">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-400"></div> <span className="text-gray-500">Fixed Timers</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div> <span className="text-gray-900">AetherPulse Mesh</span></div>
          </div>
        </div>
        
        <div className="h-64 relative w-full pt-4">
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs font-bold text-gray-400">
            <span>{maxVal.toFixed(0)}</span>
            <span>{(maxVal/2).toFixed(0)}</span>
            <span>0</span>
          </div>
          
          <div className="ml-14 h-full relative border-l border-b border-gray-200">
            <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-100"></div>
            
            <div className="absolute inset-0 flex items-end justify-between px-2 gap-1 pb-1">
              {dataPoints.map((d, i) => (
                <div key={i} className="flex-1 flex gap-0.5 h-full items-end justify-center group relative">
                  {d.fixed > 0 && (
                    <div 
                      className="w-full bg-red-100 hover:bg-red-200 rounded-t-sm transition-all relative"
                      style={{ height: `${(d.fixed / maxVal) * 100}%` }}
                    >
                       <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded font-bold whitespace-nowrap z-10 pointer-events-none">
                         Fixed: {d.fixed.toFixed(0)}
                       </div>
                    </div>
                  )}
                  {d.dynamic > 0 && (
                    <div 
                      className="w-full bg-green-400 hover:bg-green-500 rounded-t-sm transition-all relative shadow-[0_0_10px_rgba(74,222,128,0.3)]"
                      style={{ height: `${(d.dynamic / maxVal) * 100}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded font-bold whitespace-nowrap z-10 pointer-events-none">
                        Mesh: {d.dynamic.toFixed(0)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
