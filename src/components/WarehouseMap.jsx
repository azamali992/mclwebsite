import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import * as XLSX from 'xlsx';
import xlsxUrl from '../assets/MCL-Warehouse_Location.xlsx?url';
import 'leaflet/dist/leaflet.css';

function dmsToDecimal(dms) {
  if (!dms || typeof dms !== 'string') return null;
  const trimmed = dms.trim();
  if (trimmed.includes(',')) {
    const parts = trimmed.split(',').map(s => parseFloat(s.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return { lat: parts[0], lng: parts[1] };
    }
  }
  const dmsRegex = /(\d+)[°\s]\s*(\d+(?:\.\d+)?)'\s*(\d+(?:\.\d+)?)"?\s*([NSEW])/g;
  const matches = [...trimmed.matchAll(dmsRegex)];
  if (matches.length === 2) {
    const deg1 = parseFloat(matches[0][1]) + parseFloat(matches[0][2]) / 60 + parseFloat(matches[0][3]) / 3600;
    const dir1 = matches[0][4];
    const deg2 = parseFloat(matches[1][1]) + parseFloat(matches[1][2]) / 60 + parseFloat(matches[1][3]) / 3600;
    const dir2 = matches[1][4];
    return {
      lat: dir1 === 'S' ? -deg1 : deg1,
      lng: dir2 === 'W' ? -deg2 : deg2,
    };
  }
  return null;
}

export function normalizeWarehouseName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/warehouse/g, '')
    .replace(/lahore/g, '')
    .replace(/[^a-z\s]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

function createMarkerIcon(isHeadOffice, isHighlighted) {
  const bgColor = isHighlighted ? '#f59e0b' : isHeadOffice ? '#dc2626' : '#2563eb';
  const size = isHighlighted ? 18 : 12;
  return L.divIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${bgColor};border:1.5px solid rgba(255,255,255,0.8);box-shadow:0 0 4px rgba(0,0,0,0.4)"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    tooltipAnchor: [0, -10],
  });
}

function MapUpdater({ locations }) {
  const map = useMap();
  useEffect(() => {
    if (locations.length > 0) {
      const group = L.featureGroup(
        locations.map(loc => L.marker([loc.lat, loc.lng]))
      );
      map.fitBounds(group.getBounds().pad(0.15));
    }
  }, [locations, map]);
  return null;
}

export default function WarehouseMap({ className = 'h-[500px]', onLocationClick, highlightKey, tileTheme = 'dark', showLegend = true }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(xlsxUrl)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch Excel file');
        return res.arrayBuffer();
      })
      .then(buf => {
        const wb = XLSX.read(buf, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const parsed = [];
        for (let i = 2; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length < 3) continue;
          const name = row[1];
          const rawCoord = row[2];
          if (!name || !rawCoord) continue;
          const coord = dmsToDecimal(String(rawCoord));
          if (coord) {
            parsed.push({
              id: i - 1,
              name: String(name).trim(),
              key: normalizeWarehouseName(name),
              isHeadOffice: /head office/i.test(String(name)),
              lat: coord.lat,
              lng: coord.lng,
            });
          }
        }
        setLocations(parsed);
        setError(null);
      })
      .catch(err => {
        console.error('Excel parse error:', err);
        setError('Unable to load map data.');
        setLocations([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const tileUrl = tileTheme === 'dark'
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0B1A28] z-[1001]">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mb-3" />
          <p className="text-white text-sm">Loading map data...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0B1A28] z-[1001]">
          <p className="text-red-400 text-sm text-center px-4">{error}</p>
        </div>
      )}
      {!loading && !error && (
        <MapContainer
          center={[30.3753, 69.3451]}
          zoom={5}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            url={tileUrl}
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          />
          <MapUpdater locations={locations} />
          {locations.map(loc => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={createMarkerIcon(loc.isHeadOffice, loc.key === highlightKey)}
              eventHandlers={onLocationClick ? { click: () => onLocationClick(loc) } : undefined}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                <span className="text-xs font-medium">{loc.name}</span>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      )}
      {showLegend && !loading && !error && (
        <div className="absolute top-4 right-4 z-[1000] bg-[#0B1A28]/90 backdrop-blur-sm p-3 rounded-lg border border-white/10 flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="text-white text-xs">Warehouses</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-600" />
            <span className="text-white text-xs">Head Office</span>
          </div>
        </div>
      )}
    </div>
  );
}
