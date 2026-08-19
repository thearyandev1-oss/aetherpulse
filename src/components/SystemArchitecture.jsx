import React, { useState } from 'react';
import { Cpu, Server, Radio, Database, ChevronDown, ChevronUp, Check, Layers, Zap, ArrowRight, Shield } from 'lucide-react';

export default function SystemArchitecture() {
  const [openCard, setOpenCard] = useState(null);

  const toggle = (id) => setOpenCard(openCard === id ? null : id);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Layers className="w-6 h-6 text-indigo-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">System Architecture</h2>
          <p className="text-sm text-gray-500 font-medium">Under the hood of the AetherPulse Mesh</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tier 1 */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full transition-transform group-hover:scale-125"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6 border border-blue-200 shadow-sm">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Layer 1: Edge Sensing</h3>
            <p className="text-sm text-gray-600 mb-6 font-medium">Jetson Orin Nano nodes running YOLOv8-TRT at every intersection for real-time multi-class vehicle detection.</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100"><Check className="w-4 h-4 text-green-500"/> YOLOv8 TensorRT</div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100"><Check className="w-4 h-4 text-green-500"/> 30 FPS Stream</div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100"><Check className="w-4 h-4 text-green-500"/> Privacy-preserving Edge AI</div>
            </div>
          </div>
        </div>

        {/* Tier 2 */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full transition-transform group-hover:scale-125"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6 border border-indigo-200 shadow-sm">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Layer 2: Core Optimizer</h3>
            <p className="text-sm text-gray-600 mb-6 font-medium">FastAPI microservice mesh coordinating signal phases dynamically using the EADSO scoring algorithm.</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100"><Check className="w-4 h-4 text-green-500"/> Python FastAPI Mesh</div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100"><Check className="w-4 h-4 text-green-500"/> Distributed Actor Model</div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100"><Check className="w-4 h-4 text-green-500"/> Sub-10ms latency</div>
            </div>
          </div>
        </div>

        {/* Tier 3 */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full transition-transform group-hover:scale-125"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6 border border-purple-200 shadow-sm">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Layer 3: V2X & Commuter</h3>
            <p className="text-sm text-gray-600 mb-6 font-medium">Hardware controllers sync lights, while WebSockets push route updates to the commuter app.</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100"><Check className="w-4 h-4 text-green-500"/> ESP32 Signal Controllers</div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100"><Check className="w-4 h-4 text-green-500"/> MQTT / WebSockets</div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100"><Check className="w-4 h-4 text-green-500"/> React Native / Flutter App</div>
            </div>
          </div>
        </div>

      </div>

      {/* Formulas */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Database className="w-5 h-5 text-gray-400"/> Mathematical Models</h3>
        
        <div className="space-y-3">
          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50">
            <button onClick={() => toggle('f1')} className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition">
              <span className="font-bold text-gray-900 text-sm">Dynamic Priority Score (EADSO)</span>
              {openCard === 'f1' ? <ChevronUp className="w-4 h-4 text-gray-500"/> : <ChevronDown className="w-4 h-4 text-gray-500"/>}
            </button>
            {openCard === 'f1' && (
              <div className="p-4 pt-0 border-t border-gray-200 bg-white">
                <div className="bg-gray-900 p-4 rounded-xl mt-3 overflow-x-auto shadow-inner">
                  <code className="text-sm text-indigo-500 font-mono whitespace-nowrap">
                    S_i = Σ [ (α * occ_v + β * (1 / (err_v + ε))) * wait_v ]
                  </code>
                </div>
                <p className="text-sm text-gray-600 mt-4 font-medium leading-relaxed">
                  This algorithm prioritizes approaches that have either <strong className="text-gray-900">high passenger occupancy (occ_v)</strong> (e.g. buses) or <strong className="text-gray-900">low emissions (err_v)</strong> (e.g. EVs). It scales directly with the time waited (wait_v), ensuring fair but green-focused traffic clearance.
                </p>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50">
            <button onClick={() => toggle('f2')} className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition">
              <span className="font-bold text-gray-900 text-sm">Hardware Bill of Materials (Per Node)</span>
              {openCard === 'f2' ? <ChevronUp className="w-4 h-4 text-gray-500"/> : <ChevronDown className="w-4 h-4 text-gray-500"/>}
            </button>
            {openCard === 'f2' && (
              <div className="p-4 pt-0 border-t border-gray-200 bg-white">
                <table className="w-full text-left text-sm font-medium mt-3">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500">
                      <th className="pb-2">Component</th>
                      <th className="pb-2 text-right">Cost (Est)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-900">
                    <tr className="border-b border-gray-100"><td className="py-3">Jetson Orin Nano (Edge AI)</td><td className="py-3 text-right">₹ 24,500</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-3">CCTV IP Camera (1080p, PoE)</td><td className="py-3 text-right">₹ 4,200</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-3">ESP32 Signal Interface Board</td><td className="py-3 text-right">₹ 850</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-3">Enclosure & Power Supply</td><td className="py-3 text-right">₹ 1,500</td></tr>
                    <tr><td className="py-3 font-bold text-gray-900">Total Deploy Cost</td><td className="py-3 text-right font-bold text-indigo-600">₹ 31,050 / node</td></tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
