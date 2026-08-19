import React, { useState } from 'react';
import { 
  Activity, 
  Map, 
  BarChart3, 
  Network, 
  Camera, 
  Route, 
  Globe2,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import IntersectionSimulator from './components/IntersectionSimulator';
import CommuterHandoff from './components/CommuterHandoff';
import ImpactAnalytics from './components/ImpactAnalytics';
import SystemArchitecture from './components/SystemArchitecture';
import LiveCameraAnalytics from './components/LiveCameraAnalytics';
import DigitalTwinAnalytics from './components/DigitalTwinAnalytics';

const TABS = [
  { id: 'simulator', label: 'Intersection Simulator', icon: Activity },
  { id: 'handoff', label: 'Commuter Handoff', icon: Route },
  { id: 'analytics', label: 'Impact & Analytics', icon: BarChart3 },
  { id: 'architecture', label: 'System Architecture', icon: Network },
  { id: 'camera', label: 'Live Edge AI', icon: Camera },
  { id: 'twin', label: 'Digital Twin', icon: Globe2 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('simulator');
  const [demoState, setDemoState] = useState({
    active: false,
    phase: 0, 
    showVerifiedModal: false
  });

  const runJuryDemo = () => {
    setDemoState({ active: true, phase: 1, showVerifiedModal: false });
    setActiveTab('simulator');

    setTimeout(() => setDemoState(p => ({ ...p, phase: 2 })), 15000);

    setTimeout(() => {
      setDemoState(p => ({ ...p, phase: 3 }));
      setActiveTab('handoff');
    }, 30000);

    setTimeout(() => {
      setDemoState({ active: false, phase: 0, showVerifiedModal: true });
    }, 45000);
  };

  return (
    <div className="min-h-screen">
      {/* Premium Glassmorphism Navbar */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl shadow-lg shadow-indigo-500/30">
              <Activity className="w-6 h-6 text-white" />
              <div className="absolute top-0 right-0 w-3 h-3 bg-teal-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
               <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                 AetherPulse
               </h1>
               <div className="text-[10px] font-bold tracking-widest uppercase text-indigo-600">Smart Mobility Platform</div>
            </div>
          </div>
          
          <button 
            onClick={runJuryDemo}
            disabled={demoState.active}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all shadow-lg ${
              demoState.active 
                ? 'bg-indigo-100 text-indigo-800 animate-pulse'
                : 'bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            {demoState.active ? (
              <>
                <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                Running Jury Demo (Phase {demoState.phase}/3)
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-teal-400" />
                Run Jury Demo Mode
              </>
            )}
          </button>
        </div>
        
        {/* Sleek Tab Navigation */}
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 py-3 border-t border-gray-100/50">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => !demoState.active && setActiveTab(tab.id)}
                  disabled={demoState.active}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 transform scale-105' 
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/50 hover:border-slate-300'
                  } ${demoState.active && !isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-100' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="animate-fadeIn">
          {activeTab === 'simulator' && <IntersectionSimulator juryDemoPhase={demoState.phase} />}
          {activeTab === 'handoff' && <CommuterHandoff juryDemoPhase={demoState.phase} />}
          {activeTab === 'analytics' && <ImpactAnalytics juryDemoPhase={demoState.phase} />}
          {activeTab === 'architecture' && <SystemArchitecture />}
          {activeTab === 'camera' && <LiveCameraAnalytics />}
          {activeTab === 'twin' && <DigitalTwinAnalytics />}
        </div>
      </main>

      {/* Verified Modal */}
      {demoState.showVerifiedModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl relative animate-slideUp text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-teal-400"></div>
            <button 
              onClick={() => setDemoState(p => ({ ...p, showVerifiedModal: false }))}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 bg-slate-50 rounded-full transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Demo Complete</h3>
            <p className="text-slate-500 font-medium mb-8">
              AetherPulse successfully demonstrated dynamic traffic optimization and seamless multi-modal handoff. 
              <br/><br/>
              <span className="text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-lg">Impact Verified!</span>
            </p>
            <button 
              onClick={() => setDemoState(p => ({ ...p, showVerifiedModal: false }))}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/30 transition-transform active:scale-95"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
