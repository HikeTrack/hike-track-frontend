import React, { useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import styles from './GoogleMap.module.scss';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const customIcon = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor the icon at its base
  popupAnchor: [1, -34], // Position popup relative to the icon
  shadowSize: [41, 41] // Size of the shadow
});

export const GoogleMap: React.FC = () => {
  const [markerLocation, setMarkerLocation] = useState<LatLngExpression>([51.509865, -0.118092]);
  
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={markerLocation}
        zoom={13}
        className={styles.map}
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <Marker position={markerLocation}>
          <Popup>Start location</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}