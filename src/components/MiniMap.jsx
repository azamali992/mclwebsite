import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

function createPinIcon() {
  return L.divIcon({
    className: '',
    html: '<div style="width:10px;height:10px;border-radius:50%;background:#dc2626;border:2px solid rgba(255,255,255,0.9);box-shadow:0 0 6px rgba(0,0,0,0.4)"></div>',
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });
}

export default function MiniMap({ lat, lng }) {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || !containerRef.current || lat == null || lng == null) return;
    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 8,
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);
    L.marker([lat, lng], { icon: createPinIcon() }).addTo(map);
    map.invalidateSize();

    requestAnimationFrame(() => map.invalidateSize());

    return () => { map.remove(); };
  }, [ready, lat, lng]);

  if (lat == null || lng == null) return null;

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-lg overflow-hidden bg-gray-100"
    />
  );
}
