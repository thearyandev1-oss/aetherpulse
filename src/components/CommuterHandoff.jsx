import React, { useState, useEffect } from 'react';
import { Route, Map as MapIcon, ChevronRight, CheckCircle2, ChevronLeft, Ticket, ScanLine, ArrowRight, Leaf, MapPinned, AlertTriangle, X, Trees, Loader2, CreditCard, TreePine, Sparkles, TrendingDown } from 'lucide-react';
import AutocompleteInput from './AutocompleteInput';
import RouteMap from './RouteMap';

export default function CommuterHandoff({ juryDemoPhase }) {
  const [view, setView] = useState('planner'); 
  const [fromLoc, setFromLoc] = useState(null);
  const [toLoc, setToLoc] = useState(null);
  const [routePlan, setRoutePlan] = useState(null);
  const [booked, setBooked] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [etaSec, setEtaSec] = useState(0);
  const [bookingStep, setBookingStep] = useState(0);

  useEffect(() => {
    if (juryDemoPhase === 3) {
      setFromLoc({ name: 'Central Station', lat: 51.5300, lng: -0.1236 });
      setToLoc({ name: 'Tech Park', lat: 51.5230, lng: -0.0982 });
      setView('planner');
    }
  }, [juryDemoPhase]);

  useEffect(() => {
    if (!booked || etaSec <= 10) return;
    const iv = setInterval(() => setEtaSec(p => p > 10 ? p - 1 : p), 1000);
    return () => clearInterval(iv);
  }, [booked, etaSec]);

  const handleBook = () => {
    setView('processing');
    setBookingStep(0);
    
    setTimeout(() => setBookingStep(1), 1200); 
    setTimeout(() => setBookingStep(2), 2400); 
    setTimeout(() => {
      setBooked(true); 
      setView('booking'); 
      setEtaSec(220);
    }, 3500); 
  };

  const handleReset = () => {
    setView('planner'); setFromLoc(null); setToLoc(null); setRoutePlan(null);
    setBooked(false); setShowPass(false); setEtaSec(0); setBookingStep(0);
  };

  const fmtTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  
  const savings = routePlan ? {
    cost: routePlan.car.cost - routePlan.total.cost,
    time: routePlan.car.time - routePlan.total.time,
    co2: routePlan.car.co2,
    trees: Math.max(1, Math.round(routePlan.car.co2 / 1.5))
  } : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
            <MapIcon className="w-6 h-6 text-white"/>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">AetherRide Live Map</h2>
            <p className="text-sm text-gray-500 font-medium">Smart multi-modal routing globally (Powered by OpenStreetMap)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm relative z-20">
            <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
              <MapPinned className="w-5 h-5 text-indigo-500"/> Where to?
            </h3>
            
            <div className="space-y-4 relative">
                <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-gray-200"></div>
                
                <div className="relative pl-10">
                   <div className="absolute left-[15px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-indigo-600 border-2 border-white shadow-sm z-10"></div>
                   <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Pickup Location</div>
                   <AutocompleteInput placeholder="Search origin..." onPlaceSelect={(p) => {
                     setFromLoc(p);
                     setRoutePlan(null);
                     setBooked(false);
                     setShowPass(false);
                     setBookingStep(0);
                   }} />
                </div>
                
                <div className="relative pl-10">
                   <div className="absolute left-[15px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gray-900 border-2 border-white shadow-sm z-10"></div>
                   <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Drop Location</div>
                   <AutocompleteInput placeholder="Search destination..." onPlaceSelect={(p) => {
                     setToLoc(p);
                     setRoutePlan(null);
                     setBooked(false);
                     setShowPass(false);
                     setBookingStep(0);
                   }} />
                </div>
             </div>
          </div>
          
          {routePlan && view === 'planner' && (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm animate-fadeIn">
              
              <div className="mb-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden transform transition-all hover:scale-[1.02]">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                  <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-amber-300 opacity-20 rounded-full blur-2xl"></div>

                  <div className="flex items-center gap-2 mb-5 relative z-10">
                    <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
                    <h4 className="font-extrabold text-white text-lg tracking-wide uppercase">Your Massive Impact!</h4>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 relative z-10">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 shadow-inner flex flex-col justify-center">
                       <div className="text-[10px] uppercase font-bold text-green-100 mb-1 tracking-wider opacity-90">Cash Saved</div>
                       <div className="text-3xl font-black text-white drop-shadow-md">₹{savings.cost}</div>
                       <div className="text-[10px] text-green-200 mt-1 font-medium bg-black/20 rounded-full py-0.5 px-2 inline-block mx-auto">vs Cab</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 shadow-inner flex flex-col justify-center">
                       <div className="text-[10px] uppercase font-bold text-green-100 mb-1 tracking-wider opacity-90">Time Saved</div>
                       <div className="text-3xl font-black text-white drop-shadow-md flex items-center justify-center gap-1">
                          <TrendingDown className="w-5 h-5 text-amber-300"/>
                          {savings.time > 0 ? `${savings.time}m` : '0m'}
                       </div>
                       <div className="text-[10px] text-green-200 mt-1 font-medium bg-black/20 rounded-full py-0.5 px-2 inline-block mx-auto">vs Traffic</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 shadow-inner relative flex flex-col justify-center">
                       <div className="absolute -top-3 -right-3 bg-amber-300 text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg animate-bounce border-2 border-white">HERO!</div>
                       <div className="text-[10px] uppercase font-bold text-green-100 mb-1 tracking-wider opacity-90">CO₂ Avoided</div>
                       <div className="text-3xl font-black text-white drop-shadow-md">{savings.co2.toFixed(1)}<span className="text-lg text-green-200">kg</span></div>
                    </div>
                  </div>
                  
                  <div className="mt-5 text-sm font-bold flex items-center justify-center gap-2 bg-black/25 py-3 rounded-xl backdrop-blur-sm border border-black/10 relative z-10 shadow-inner">
                    <TreePine className="w-5 h-5 text-amber-300" /> 
                    <span>Equal to planting <span className="text-amber-300 text-lg px-1">{savings.trees} Trees</span> today!</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-100 text-center">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Time</div>
                  <div className="text-xl font-bold text-slate-900">{routePlan.total.time} <span className="text-sm text-gray-500 font-medium">min</span></div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-100 text-center">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Distance</div>
                  <div className="text-xl font-bold text-slate-900">{routePlan.total.dist.toFixed(1)} <span className="text-sm text-gray-500 font-medium">km</span></div>
                </div>
                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-center shadow-sm">
                  <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">Est. Fare</div>
                  <div className="text-xl font-bold text-slate-900">₹{routePlan.total.cost}</div>
                </div>
              </div>

              <div className="space-y-0 relative before:absolute before:left-[21px] before:top-6 before:bottom-6 before:w-0.5 before:bg-gray-200 max-h-72 overflow-y-auto pr-2">
                {routePlan.legs.map((leg, i) => (
                  <React.Fragment key={i}>
                    {leg.isTransfer && (
                      <div className="pl-[52px] py-2 flex items-center gap-2 text-xs font-bold text-gray-400 my-1 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> 2 min walk to {leg.from}
                      </div>
                    )}
                    <div className="flex items-start gap-4 relative py-2">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 z-10 text-xl border-2 border-white shadow-sm`} style={{ backgroundColor: leg.color, color: leg.color === '#4f46e5' ? '#ffffff' : '#fff' }}>
                        {leg.icon}
                      </div>
                      <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-slate-900">{leg.label}</span>
                          {leg.routeLabel && <div className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">{leg.routeLabel}</div>}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="font-medium truncate max-w-[100px]">{leg.from}</span> <ArrowRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"/> <span className="font-medium truncate max-w-[100px]">{leg.to}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-3 text-xs font-bold text-gray-500">
                          <span>{leg.dist.toFixed(1)} km</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span>{leg.time} min travel</span>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <button onClick={handleBook}
                className="w-full mt-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg transition transform active:scale-[0.98]">
                <CreditCard className="w-5 h-5"/> Checkout & Book — ₹{routePlan.total.cost}
              </button>
            </div>
          )}
          
          {view === 'processing' && (
            <div className="bg-white border border-gray-200 rounded-[32px] overflow-hidden shadow-xl p-12 text-center animate-fadeIn">
              <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-6" />
              <h3 className="font-bold text-xl text-slate-900 mb-2">
                {bookingStep === 0 && "Orchestrating Multi-Modal Route..."}
                {bookingStep === 1 && "Reserving E-Bike & Scooter Docks..."}
                {bookingStep === 2 && "Processing Secure Payment..."}
              </h3>
              <p className="text-gray-500 font-medium">Please wait while we confirm your connections.</p>
              
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${bookingStep >= 0 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${bookingStep >= 1 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${bookingStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              </div>
            </div>
          )}

          {view === 'booking' && booked && routePlan && (
            <div className="bg-white border border-gray-200 rounded-[32px] overflow-hidden shadow-xl animate-fadeIn">
              <div className="p-8 bg-gradient-to-br from-green-500 to-emerald-700 text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                 <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-amber-300 opacity-20 rounded-full blur-2xl"></div>

                 <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 animate-bounce">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                 </div>
                 <h2 className="text-3xl font-black mb-2 relative z-10 tracking-tight">Booking Confirmed!</h2>
                 <p className="text-green-100 font-medium text-sm mb-6 relative z-10">Your multi-modal ticket is ready to go.</p>
                 
                 <div className="bg-black/20 backdrop-blur-md p-5 rounded-2xl border border-white/20 w-full relative z-10 shadow-inner">
                    <div className="text-xs uppercase font-bold tracking-widest text-green-200 mb-4 opacity-90">Trip Impact Finalized</div>
                    <div className="flex gap-4 w-full">
                       <div className="flex-1 bg-white/10 rounded-xl p-3 text-center border border-white/10">
                          <div className="text-[10px] uppercase font-bold text-green-100 mb-1">Cash Saved</div>
                          <div className="text-2xl font-black">₹{savings.cost}</div>
                       </div>
                       <div className="flex-1 bg-white/10 rounded-xl p-3 text-center border border-white/10">
                          <div className="text-[10px] uppercase font-bold text-green-100 mb-1">Time Saved</div>
                          <div className="text-2xl font-black">{savings.time}m</div>
                       </div>
                    </div>
                    <div className="mt-4 text-sm font-bold flex items-center justify-center gap-2 bg-white/10 py-3 rounded-xl border border-white/10">
                       <TreePine className="w-6 h-6 text-amber-300 animate-pulse" />
                       Avoided <span className="text-amber-300 text-xl">{savings.co2.toFixed(1)}kg</span> CO₂ (≈ {savings.trees} trees)
                    </div>
                 </div>
              </div>
              <div className="p-6 bg-slate-50">
                 <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></div> <span className="font-bold text-sm text-slate-900">Live Journey Tracking</span></div>
                    <div className="bg-slate-900 text-indigo-500 px-4 py-1.5 rounded-full text-xs font-black tracking-widest">ETA {fmtTime(etaSec + routePlan.total.time*60)}</div>
                 </div>
                 
                 <button onClick={() => setShowPass(!showPass)} className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.98]">
                  <ScanLine className="w-5 h-5"/> Display Boarding Pass
                 </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Map */}
        <div className="lg:col-span-7 h-[600px] bg-white border border-indigo-200 rounded-3xl overflow-hidden shadow-sm relative z-10">
           {/* ALWAYS render RouteMap so the map is always visible */}
           <RouteMap origin={fromLoc} destination={toLoc} onRouteReady={setRoutePlan} />
           
           {!fromLoc && !toLoc && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-gray-200 pointer-events-none text-sm font-bold text-slate-900 flex items-center gap-2">
                 <MapIcon className="w-4 h-4 text-indigo-600"/> Please select Pickup and Drop locations
              </div>
           )}
        </div>
      </div>

      {/* Boarding Pass Modal */}
      {showPass && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl relative animate-slideUp">
              
              <div className="bg-indigo-600 p-6 text-center text-white relative">
                <button onClick={() => setShowPass(false)} className="absolute top-4 right-4 text-white hover:bg-indigo-700 p-1 rounded-full transition"><X className="w-5 h-5"/></button>
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-3"><Ticket className="w-6 h-6 text-indigo-500"/></div>
                <h3 className="font-bold text-xl text-white">AetherPass</h3>
                <p className="text-sm font-medium text-indigo-200">Multi-Modal Ticket</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
                  <div className="col-span-2">
                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">Route</div>
                    <div className="font-bold text-slate-900 truncate">{fromLoc?.name}</div>
                    <div className="text-sm text-gray-500 truncate">to {toLoc?.name}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">Ticket ID</div>
                    <div className="font-bold text-slate-900">AP-{Math.floor(Math.random()*90000)+10000}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">Fare Paid</div>
                    <div className="font-bold text-green-600">₹{routePlan.total.cost}</div>
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-gray-200 pt-6 pb-2">
                  <div className="w-full max-w-[200px] h-20 mx-auto mb-4 flex flex-col justify-between">
                     {/* Simulated Barcode */}
                     <div className="flex h-12 w-full bg-white gap-0.5 justify-center">
                        {Array.from({length: 40}).map((_, i) => (
                          <div key={i} className="h-full bg-slate-900" style={{ width: `${Math.random() > 0.5 ? 2 : 4}px`, opacity: Math.random() > 0.2 ? 1 : 0 }}></div>
                        ))}
                     </div>
                     <div className="text-center text-xs tracking-[0.2em] font-mono text-gray-500 font-bold">
                        {Math.random().toString().slice(2, 14)}
                     </div>
                  </div>
                  <p className="text-center text-sm font-bold text-gray-500 mt-2 flex items-center justify-center gap-2"><ScanLine className="w-4 h-4"/> Scan at gate or vehicle</p>
                </div>
              </div>
              <div className="absolute left-[-16px] top-[150px] w-8 h-8 bg-slate-900/60 rounded-full"></div>
              <div className="absolute right-[-16px] top-[150px] w-8 h-8 bg-slate-900/60 rounded-full"></div>
            </div>
         </div>
      )}
    </div>
  );
}
