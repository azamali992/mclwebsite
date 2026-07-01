import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import * as XLSX from 'xlsx';
import xlsxUrl from '../assets/MCL-Warehouse_Location.xlsx?url';
import distributorXlsxUrl from '../assets/MCL_Distributors_Locations.xlsx?url';
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

function createMarkerIcon(loc, isHighlighted) {
  const bgColor = isHighlighted ? '#f59e0b' : loc.color || (loc.isHeadOffice ? '#dc2626' : '#2563eb');
  const size = isHighlighted ? 16 : 12;
  const pulse = isHighlighted
    ? '<span class="absolute inset-0 rounded-full bg-amber-400 opacity-75 animate-ping"></span>'
    : '';
  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:${size}px;height:${size}px;">${pulse}<span style="position:relative;display:block;width:${size}px;height:${size}px;border-radius:50%;background:${bgColor};border:1.5px solid rgba(255,255,255,0.9);box-shadow:0 0 6px rgba(0,0,0,0.5)"></span></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    tooltipAnchor: [0, -10],
  });
}

function MapUpdater({ locations }) {
  const map = useMap();
  useEffect(() => {
    const valid = locations.filter(l => l.lat != null && l.lng != null);
    if (valid.length > 0) {
      const group = L.featureGroup(
        valid.map(loc => L.marker([loc.lat, loc.lng]))
      );
      map.fitBounds(group.getBounds().pad(0.15));
    }
  }, [locations, map]);
  return null;
}

function FlyToHighlight({ locations, highlightKey }) {
  const map = useMap();
  useEffect(() => {
    if (!highlightKey) return;
    const loc = locations.find(l => l.key === highlightKey && l.lat != null && l.lng != null);
    if (loc) map.flyTo([loc.lat, loc.lng], Math.max(map.getZoom(), 7), { duration: 0.8 });
  }, [highlightKey, locations, map]);
  return null;
}

let cachedLocationsPromise = null;
let cachedDistributorsPromise = null;

const cityCoords = {
  Swat: [34.80, 72.36],
  Batkhela: [34.62, 71.97],
  Timergara: [34.83, 71.84],
  Mardan: [34.20, 72.05],
  Bannu: [32.99, 70.60],
  Jhang: [31.31, 72.31],
  Sialkot: [32.50, 74.54],
  Gujranwala: [32.16, 74.19],
  Chiniot: [31.72, 72.99],
  Sargodha: [32.08, 72.67],
  'Mandi Bahauddin': [32.58, 73.49],
  Mehran: [25.96, 68.15],
  Lahore: [31.52, 74.36],
  Peshawar: [34.01, 71.57],
  Hazara: [34.20, 73.25],
  Karachi: [24.86, 67.01],
};

function extractCityFromName(name) {
  const lower = name.toLowerCase();
  if (lower.includes('sawat') || lower.includes('swat')) return 'Swat';
  if (lower.includes('batkhela')) return 'Batkhela';
  if (lower.includes('timergara')) return 'Timergara';
  if (lower.includes('mardan')) return 'Mardan';
  if (lower.includes('bannu')) return 'Bannu';
  if (lower.includes('jhang')) return 'Jhang';
  if (lower.includes('(skt)')) return 'Sialkot';
  if (lower.includes('(grw)')) return 'Gujranwala';
  if (lower.includes('chiniot')) return 'Chiniot';
  if (lower.includes('sargodha')) return 'Sargodha';
  if (lower.includes('bahauddin')) return 'Mandi Bahauddin';
  if (lower.includes('mehran')) return 'Mehran';
  if (lower.includes('lahore')) return 'Lahore';
  if (lower.includes('peshawar')) return 'Peshawar';
  if (lower.includes('hazara')) return 'Hazara';
  if (lower.includes('karachi')) return 'Karachi';
  return '';
}

export function loadDistributorLocations() {
  if (!cachedDistributorsPromise) {
    cachedDistributorsPromise = fetch(distributorXlsxUrl)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch Distributor Excel file');
        return res.arrayBuffer();
      })
      .then(buf => {
        const wb = XLSX.read(buf, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const parsed = [];
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length < 2) continue;
          const name = row[1];
          const mapsUrl = row[2];
          if (!name) continue;
          const city = extractCityFromName(String(name));
          const coords = cityCoords[city] || null;
          parsed.push({
            id: `dist-${i}`,
            name: String(name).trim(),
            key: `dist-${i}`,
            city,
            color: '#059669',
            mapsUrl: mapsUrl ? String(mapsUrl).trim() : null,
            lat: coords ? coords[0] : null,
            lng: coords ? coords[1] : null,
          });
        }
        return parsed;
      })
      .catch(err => {
        cachedDistributorsPromise = null;
        throw err;
      });
  }
  return cachedDistributorsPromise;
}

export function loadWarehouseLocations() {
  if (!cachedLocationsPromise) {
    cachedLocationsPromise = fetch(xlsxUrl)
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
              mapsUrl: `https://www.google.com/maps?q=${coord.lat},${coord.lng}`,
            });
          }
        }
        return parsed;
      })
      .catch(err => {
        cachedLocationsPromise = null;
        throw err;
      });
  }
  return cachedLocationsPromise;
}

export default function WarehouseMap({ className = 'h-[500px]', onLocationClick, highlightKey, tileTheme = 'dark', showLegend = true, onLocationsLoaded, locations: externalLocations, loading: externalLoading }) {
  const [internalLocations, setInternalLocations] = useState([]);
  const [internalLoading, setInternalLoading] = useState(true);
  const [error, setError] = useState(null);

  const isExternal = externalLocations !== undefined;
  const locations = isExternal ? externalLocations : internalLocations;
  const loading = isExternal ? (externalLoading ?? false) : internalLoading;

  useEffect(() => {
    if (isExternal) {
      onLocationsLoaded?.(externalLocations);
      return;
    }
    let mounted = true;

    loadWarehouseLocations()
      .then(parsed => {
        if (!mounted) return;
        setInternalLocations(parsed);
        setError(null);
        onLocationsLoaded?.(parsed);
      })
      .catch(err => {
        if (!mounted) return;
        console.error('Excel parse error:', err);
        setError('Unable to load map data.');
        setInternalLocations([]);
      })
      .finally(() => { if (mounted) setInternalLoading(false); });

    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExternal]);

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
          <FlyToHighlight locations={locations} highlightKey={highlightKey} />
          {locations.filter(loc => loc.lat != null && loc.lng != null).map(loc => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={createMarkerIcon(loc, loc.key === highlightKey)}
              eventHandlers={onLocationClick ? { click: () => onLocationClick(loc) } : undefined}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                <span className="text-xs font-medium">{loc.name}</span>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      )}
      {showLegend && !loading && !error && locations.length > 0 && (
        <div className="absolute top-4 right-4 z-[1000] bg-[#0B1A28]/90 backdrop-blur-sm p-3 rounded-lg border border-white/10 flex flex-col space-y-2">
          {locations.some(l => l.color) ? (
            <>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600" />
                <span className="text-white text-xs">Distributors</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-white text-xs">Warehouses</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-600" />
                <span className="text-white text-xs">Head Office</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
