import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMap, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function BoundsFitter({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [bounds, map]);
  return null;
}

export default function RouteMap({ origin, destination, onRouteReady }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [legsData, setLegsData] = useState([]);
  const [bounds, setBounds] = useState([]);

  const defaultCenter = [51.505, -0.09];

  useEffect(() => {
    if (!origin || !destination) {
      setLegsData([]);
      setBounds([]);
      if (onRouteReady) onRouteReady(null);
      return;
    }
    setLoading(true);
    setError(null);
    setLegsData([]);
    
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.code !== 'Ok' || !data.routes.length) {
          setError('No route found.');
          return;
        }
        
        const route = data.routes[0];
        const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
        setBounds(coords);
        
        const len = coords.length;
        const p1 = Math.floor(len * 0.25);
        const p2 = Math.floor(len * 0.75);
        
        const leg1Coords = coords.slice(0, p1 + 1);
        const leg2Coords = coords.slice(p1, p2 + 1);
        const leg3Coords = coords.slice(p2);
        
        const totalDist = route.distance / 1000;
        const totalTime = Math.round(route.duration / 60);
        
        const hash = (str) => {
          let h = 0; for(let i=0;i<str.length;i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0; return Math.abs(h);
        };
        const stNames = ["Central", "Grand", "Market", "Park", "Main", "Broad", "River", "Valley", "Tech", "North", "Civic", "Union"];
        const stSuffix = ["Hub", "Station", "Plaza", "Transit Center", "Square", "Terminal"];
        
        const p1Str = leg2Coords[0].toString();
        const p2Str = leg3Coords[0].toString();
        
        const stationA = `${stNames[hash(p1Str) % stNames.length]} ${stSuffix[hash(p1Str) % stSuffix.length]}`;
        const stationB = `${stNames[hash(p2Str) % stNames.length]} ${stSuffix[hash(p2Str) % stSuffix.length]}`;
        const busLine = `Bus Route ${hash(p1Str) % 100 + 10}${['A','B','X','R'][hash(p2Str)%4]}`;
        const bikeId = `Bike #${hash(origin.name || p1Str)%9000 + 1000}`;
        const scooterId = `Scooter #${hash(destination.name || p2Str)%9000 + 1000}`;

        const newLegs = [
          {
            mode: 'bike', label: 'E-Bike Reservation', icon: '🚲', color: '#4f46e5',
            dist: totalDist * 0.25, time: Math.max(1, Math.round(totalTime * 0.3)),
            from: origin.name, to: stationA,
            routeLabel: bikeId,
            coords: leg1Coords,
            isTransfer: false
          },
          {
            mode: 'bus', label: 'City Transit Network', icon: '🚌', color: '#3b82f6',
            dist: totalDist * 0.5, time: Math.max(1, Math.round(totalTime * 0.5)),
            from: stationA, to: stationB,
            routeLabel: busLine,
            coords: leg2Coords,
            isTransfer: true
          },
          {
            mode: 'escooter', label: 'E-Scooter Reservation', icon: '🛴', color: '#14b8a6',
            dist: totalDist * 0.25, time: Math.max(1, Math.round(totalTime * 0.2)),
            from: stationB, to: destination.name,
            routeLabel: scooterId,
            coords: leg3Coords,
            isTransfer: true
          }
        ];
        
        setLegsData(newLegs);
        
        onRouteReady({
          legs: newLegs,
          total: {
             dist: totalDist,
             time: totalTime + 4,
             cost: Math.round(totalDist * 8) + 15
          },
          car: {
             dist: totalDist * 1.15,
             time: totalTime + 10,
             cost: Math.round(totalDist * 15) + 40,
             co2: totalDist * 0.21
          },
          stations: [
            { name: stationA, coords: leg2Coords[0] },
            { name: stationB, coords: leg3Coords[0] }
          ]
        });
      })
      .catch(err => {
        setLoading(false);
        setError('Error fetching route.');
        console.error(err);
      });
  }, [origin, destination, onRouteReady]);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 z-[1000] bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center">
           <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
           <p className="text-gray-900 font-bold text-sm">Orchestrating Route...</p>
        </div>
      )}
      
      {error && (
        <div className="absolute top-4 left-4 right-4 z-[1000] p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-200 shadow-md">
          {error}
        </div>
      )}
      
      <MapContainer 
        center={origin ? [origin.lat, origin.lng] : defaultCenter} 
        zoom={origin ? 13 : 11} 
        style={{ height: '100%', width: '100%', zIndex: 0 }} 
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {bounds.length > 0 && <BoundsFitter bounds={bounds} />}
        
        {origin && destination && legsData.length === 3 && (
          <>
            {legsData.map((leg, i) => (
              <Polyline key={i} positions={leg.coords} color={leg.color} weight={6} opacity={0.9} />
            ))}
            <CircleMarker center={legsData[1].coords[0]} radius={8} color="#ffffff" weight={3} fillColor="#3b82f6" fillOpacity={1}>
               <Popup className="font-bold">{legsData[1].from}</Popup>
            </CircleMarker>
            <CircleMarker center={legsData[2].coords[0]} radius={8} color="#ffffff" weight={3} fillColor="#14b8a6" fillOpacity={1}>
               <Popup className="font-bold">{legsData[2].from}</Popup>
            </CircleMarker>
            <Marker position={[origin.lat, origin.lng]}><Popup>Pickup: {origin.name}</Popup></Marker>
            <Marker position={[destination.lat, destination.lng]}><Popup>Dropoff: {destination.name}</Popup></Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
}
