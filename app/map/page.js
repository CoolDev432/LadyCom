'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Map } from 'lucide-react';
import { useEffect } from 'react';

const SafetyMap = dynamic(() => import('./SafetyMap'), { ssr: false });

export default function MapPage() {
  useEffect(() => {
    alert(
      'To use the map, drag it to the location you want to mark and then click on it to place a marker. You can zoom in too.'
    );
  }, []);

  return (
    <div className="p-6">
      <div className="w-40 bg-orange-700 text-white p-5 rounded-4xl m-auto mt-6 flex justify-center text-2xl items-center">
        <Map />
        <h1 className="ml-5">Map</h1>
      </div>

      <h1 className="text-3xl font-bold text-white mb-4">Crowdsourced Safety Map</h1>
      <SafetyMap />
    </div>
  );
}
