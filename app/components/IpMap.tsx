// app/components/IpMap.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface IpMapProps {
  location: [number, number];
  ipAddress: string;
  city: string;
}

export default function IpMap({ location, ipAddress, city }: IpMapProps) {
  if (!location || !location[0] || !location[1]) {
    return <div className="w-full h-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">No location data.</div>;
  }
  
  return (
    // التغيير الرئيسي هنا: أضفنا zIndex: 0 إلى خاصية style
    // هذا يجبر الخريطة على البقاء في الطبقة السفلية
    <MapContainer 
        center={location} 
        zoom={10} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location}>
        <Popup>
          <strong>{city}</strong><br />
          Approximate location of <br /> {ipAddress}
        </Popup>
      </Marker>
    </MapContainer>
  );
}