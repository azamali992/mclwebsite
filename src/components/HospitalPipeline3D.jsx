/**
 * HospitalPipeline3D.jsx  —  v2 (full hospital detail)
 *
 * Rooms:  Operating Theatre · Plant/Manifold Room · ICU (4 beds) · Radiology/MRI · Nurse Station · Corridor
 * Gases:  O₂ (blue) · Medical Air (orange) · N₂O (green) · Vacuum (purple) · CO₂ (red)
 * Equipment per room listed in comments below.
 *
 * USAGE
 *   import HospitalPipeline3D from './HospitalPipeline3D';
 *   <HospitalPipeline3D height={580} />
 *
 * DEPS  — CDN loader built-in (no npm install needed).
 *   OR:  npm install three   and swap the CDN block for  import * as THREE from 'three'
 *
 * Next.js App Router:
 *   const HospitalPipeline3D = dynamic(() => import('./HospitalPipeline3D'), { ssr: false });
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import mclLogoImg from '../assets/mcl_client_logos/mcl-logo.png';

// ─── CDN loader ──────────────────────────────────────────────────────────────
function loadScript(src) {
  return new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
    const s = document.createElement('script');
    s.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
}

const CTRL_BTN = { background:'rgba(255,255,255,0.92)', border:'0.5px solid #cdd5de', borderRadius:6, padding:'6px 12px', fontSize:12, cursor:'pointer', color:'#333' };

// ─── Component ───────────────────────────────────────────────────────────────
export default function HospitalPipeline3D({ height = 580 }) {
  const mountRef = useRef(null);
  const stateRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [wire, setWire] = useState(false);
  const [pipesOn, setPipesOn] = useState(true);

  const build = useCallback((THREE) => {
    if (stateRef.current) return;
    const cont = mountRef.current;
    if (!cont) return;
    const W = cont.clientWidth, H = cont.clientHeight;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    cont.appendChild(renderer.domElement);

    // ── Scene ──
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd0dbe5);
    scene.fog = new THREE.Fog(0xd0dbe5, 35, 70);

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 120);

    // ── Lights ──
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const sun = new THREE.DirectionalLight(0xfff8ee, 1.2);
    sun.position.set(12, 22, 10); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { near: 1, far: 70, left: -20, right: 20, top: 20, bottom: -20 });
    scene.add(sun);
    const fill1 = new THREE.DirectionalLight(0xb8cfe0, 0.35);
    fill1.position.set(-10, 8, -8); scene.add(fill1);
    const fill2 = new THREE.DirectionalLight(0xffeedd, 0.2);
    fill2.position.set(0, 5, 14); scene.add(fill2);

    // ── Materials ──
    const M = c => new THREE.MeshLambertMaterial({ color: c });
    const m = {
      wall: M(0xeff3f7), floor: M(0xe0e8f0), ceil: M(0xf8fafb),
      blue: M(0x1E88E5), orange: M(0xFB8C00), green: M(0x43A047),
      purple: M(0x8E24AA), red: M(0xE53935), dkRed: M(0xC62828),
      equip: M(0xccd6e0), cyl: M(0xb0bec5), bed: M(0xe8edf2),
      accent: M(0x1565C0), dark: M(0x37474f), white: M(0xfafafa),
      junc: M(0x78909c), padOR: M(0xcfe8cf), padICU: M(0xd6e4f7),
      padRad: M(0xf5e6d3), padNurse: M(0xf0e8f5), padCorr: M(0xe8e8e8),
      ctScan: M(0xe4ecf5), ctRing: M(0xcfd8dc), monitor: M(0x263238),
      scrn: M(0x00BCD4), green2: M(0x1B5E20), beige: M(0xf5f0e8),
      chrome: M(0xd4dce6), yellow: M(0xF9A825), teal: M(0x00796B),
      mriBore: M(0x1a2a3a),
    };

    const all = [];
    const pipeGroup = new THREE.Group();
    scene.add(pipeGroup);

    // ── Geometry helpers ──
    function mk(geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, rz);
      mesh.castShadow = true; mesh.receiveShadow = true;
      scene.add(mesh); all.push(mesh); return mesh;
    }
    const box  = (w, h, d, mat, x, y, z, rx=0, ry=0, rz=0) => mk(new THREE.BoxGeometry(w,h,d), mat, x,y,z, rx,ry,rz);
    const cyl  = (r, h, mat, x, y, z, rx=0, ry=0)           => mk(new THREE.CylinderGeometry(r,r,h,10), mat, x,y,z, rx,ry);
    const sph  = (r, mat, x, y, z)                           => mk(new THREE.SphereGeometry(r,8,8), mat, x,y,z);

    function pipe(mat, r, pts) {
      for (let i = 0; i < pts.length - 1; i++) {
        const a = new THREE.Vector3(...pts[i]), b = new THREE.Vector3(...pts[i + 1]);
        const len = a.distanceTo(b);
        const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3().subVectors(b, a).normalize()
        );
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 8), mat);
        mesh.position.copy(mid); mesh.quaternion.copy(quat); mesh.castShadow = true;
        pipeGroup.add(mesh); all.push(mesh);
        const s = new THREE.Mesh(new THREE.SphereGeometry(r * 1.05, 8, 8), mat);
        s.position.copy(a); pipeGroup.add(s); all.push(s);
      }
    }

    // ════════════════════════════════════════════
    //  FLOOR PLAN  (28 × 22 units centred at 0,0)
    // ════════════════════════════════════════════

    // Ground
    box(28, 0.14, 22, m.floor, 0, -0.07, 0);

    // Room colour pads
    box(10, 0.02, 9,  m.padOR,    -8, -0.06,  4);
    box(10, 0.02, 12, m.padICU,    8, -0.06, -4);
    box(10, 0.02, 8,  m.padRad,    8, -0.06,  6);
    box(10, 0.02, 12, m.padOR,    -8, -0.06, -6);
    box(6,  0.02, 6,  m.padNurse,  0, -0.06,  0);
    box(28, 0.02, 3,  m.padCorr,   0, -0.06, -8.5);

    // Outer walls — removed
    const WH = 2.8, WT = 0.16;

    // Internal walls
    box(WT, WH, 10, m.wall, -3, WH/2, -5);
    box(WT, WH, 8,  m.wall,  3, WH/2,  2);
    box(10, WH, WT, m.wall, -8, WH/2, -1);
    box(10, WH, WT, m.wall, -8, WH/2,  8);
    box(4,  WH, WT, m.wall,-12, WH/2,  8);
    box(10, WH, WT, m.wall,  8, WH/2, -1);
    box(10, WH, WT, m.wall,  8, WH/2,  2);
    box(6,  WH, WT, m.wall,-10, WH/2, -7.5);
    box(WT, WH, 3,  m.wall,  3, WH/2, -8);
    box(WT, WH, 3,  m.wall, -3, WH/2, -8);

    // Ceiling panels — removed (roof removed per request)

    // ══════════════════════════════════
    //  OPERATING THEATRE
    //  Equipment: OR table, 2x surgical lights, anaesthesia machine,
    //  ESU, Mayo trolley, 2x IV stands, ceiling gas panel, patient monitor
    // ══════════════════════════════════

    // OR table
    box(0.7,  0.08, 2.2, m.white,  -8, 0.70,  4);
    box(0.65, 0.65, 0.06, m.chrome, -8, 0.35,  4);
    [[-8.3,3.2],[-7.7,3.2],[-8.3,4.8],[-7.7,4.8]].forEach(([x,z]) =>
      box(0.08, 0.5, 0.08, m.cyl, x, 0.28, z)
    );
    box(0.6, 0.04, 0.5, m.beige, -8, 0.74, 3.8); // pillow

    // Surgical overhead lights
    function surgLight(x, z) {
      cyl(0.04, 1.2, m.chrome, x, WH-0.6, z);
      cyl(0.35, 0.10, m.chrome, x, WH-1.35, z);
      cyl(0.28, 0.06, m.yellow, x, WH-1.43, z);
      cyl(0.02, 0.4, m.chrome, x-0.45, WH-1.0, z, 0, 0, Math.PI/6);
      cyl(0.22, 0.08, m.chrome, x-0.62, WH-1.15, z);
      cyl(0.18, 0.05, m.yellow, x-0.62, WH-1.2, z);
    }
    surgLight(-7.5, 3.5);
    surgLight(-8.5, 4.5);

    // Anaesthesia machine
    box(0.7, 1.4, 0.5, m.equip, -10.5, 0.70, 3.5);
    box(0.65,0.04,0.45, m.dark, -10.5, 1.45, 3.5);
    box(0.5, 0.3, 0.06, m.scrn, -10.5, 1.20, 3.25);
    [-10.2,-10.5,-10.8].forEach(x => cyl(0.06, 0.5, m.cyl, x, 1.7, 3.5));

    // Electrosurgical unit
    box(0.5, 0.5, 0.35, m.equip, -10.5, 0.25, 5.5);
    box(0.45,0.04,0.30, m.dark,  -10.5, 0.52, 5.5);

    // Mayo trolley
    box(0.5, 0.04, 0.4, m.chrome, -6.5, 1.2, 4.5);
    box(0.02, 1.0, 0.02, m.chrome, -6.5, 0.7, 4.3);
    box(0.02, 1.0, 0.02, m.chrome, -6.5, 0.7, 4.7);

    // IV stands
    function ivStand(x, z) {
      cyl(0.03, 1.9, m.chrome, x, 0.95, z);
      box(0.3, 0.03, 0.3, m.chrome, x, 1.9, z);
      sph(0.07, m.beige, x, 2.05, z);
    }
    ivStand(-6.2, 3.2); ivStand(-9.8, 4.8);

    // Ceiling gas panel (left wall)
    box(0.1, 0.5, 0.9, m.white,  -13.85, 1.8, 4);
    box(0.05,0.1, 0.1, m.blue,   -13.85, 1.9, 3.8);
    box(0.05,0.1, 0.1, m.purple, -13.85, 1.9, 4.0);
    box(0.05,0.1, 0.1, m.green,  -13.85, 1.9, 4.2);

    // Patient monitor on pole
    box(0.35,0.6, 0.1, m.dark,  -10.5, 1.0, 6.0);
    box(0.3, 0.5, 0.05,m.scrn,  -10.5, 1.05,5.94);
    cyl(0.03, 0.5, m.chrome,    -10.5, 0.75, 6.2);

    // ══════════════════════════════════
    //  PLANT / MANIFOLD ROOM
    //  Equipment: O₂ bank (4 cyl), N₂O bank (3 cyl), CO₂ (1 cyl),
    //  2x manifold headers, control cabinet, alarm panel,
    //  2x air compressors, vacuum pump
    // ══════════════════════════════════

    // O2 cylinders
    for (let i = 0; i < 4; i++) {
      cyl(0.22, 1.5, m.blue,  -12.5 + i*0.55, 0.82, -9.5);
      box(0.42, 0.1, 0.14, m.green2, -12.5 + i*0.55, 1.65, -9.5);
    }
    // N2O cylinders
    for (let i = 0; i < 3; i++) {
      cyl(0.22, 1.5, m.green, -12.5 + i*0.55, 0.82, -7.5);
      box(0.42, 0.1, 0.14, m.green2, -12.5 + i*0.55, 1.65, -7.5);
    }
    // CO2 cylinder
    cyl(0.22, 1.5, m.red, -10.5, 0.82, -9.5);
    box(0.42, 0.1, 0.14, m.dkRed, -10.5, 1.65, -9.5);

    // Manifold headers
    box(2.5, 0.35, 0.4, m.equip, -11.5, 1.9, -9.2);
    box(1.8, 0.35, 0.4, m.equip, -12.0, 1.9, -7.3);

    // Control cabinet
    box(1.2, 1.8, 0.5, m.white, -12, 1.0, -5.5);
    box(1.1, 1.6, 0.05,m.dark,  -12, 1.0, -5.24);

    // Alarm panel
    box(0.5, 0.7, 0.1, m.dkRed, -10.8, 1.5, -5.0);
    sph(0.1, m.yellow, -10.8, 1.95, -5.0);

    // Air compressors
    for (let i = 0; i < 2; i++) {
      box(0.7, 1.0, 0.6, m.equip,  -12.5+i*1.1, 0.0,  -3.5);
      cyl(0.28,0.55,m.cyl,          -12.5+i*1.1, 1.1,  -3.5);
      cyl(0.06,0.4, m.chrome,       -12.5+i*1.1, 1.4,  -3.5);
    }

    // Vacuum pump
    box(0.8, 0.7, 0.55, m.dark,  -11.5, 0.4, -1.8);
    cyl(0.18,0.5,  m.cyl,        -11.5, 0.97,-1.8);

    // ══════════════════════════════════
    //  ICU  (4 beds)
    //  Per bed: frame, mattress, headboard, footboard, ventilator,
    //  patient monitor, IV pole+bag, bedside table, outlet panel
    // ══════════════════════════════════

    function icuBed(x, z) {
      box(1.1, 0.22,2.1, m.bed,   x, 0.11, z);
      box(1.1, 0.5, 0.14,m.equip, x, 0.36, z-1.05);
      box(1.1, 0.3, 0.14,m.equip, x, 0.21, z+1.05);
      box(0.95,0.12,1.9, m.white, x, 0.28, z);
      box(0.7, 0.07,0.35,m.beige, x, 0.35, z-0.77);

      // Ventilator
      box(0.45,0.9, 0.4, m.equip, x+0.85, 0.45, z-0.5);
      box(0.4, 0.04,0.35,m.dark,  x+0.85, 0.92, z-0.5);
      box(0.35,0.28,0.05,m.scrn,  x+0.85, 0.72, z-0.7);
      cyl(0.06,0.35,m.cyl,        x+0.85, 1.12, z-0.5);
      cyl(0.04,0.5, m.cyl,        x+0.73, 0.25, z-0.7, 0, 0, Math.PI/8);

      // Patient monitor
      box(0.3, 0.6, 0.1, m.dark, x-0.9, 1.1, z-0.3);
      box(0.26,0.52,0.04,m.scrn, x-0.9, 1.1, z-0.35);
      cyl(0.03,0.8, m.chrome,    x-0.9, 0.7, z-0.3);

      // IV pole + bag
      cyl(0.03, 2.1, m.chrome, x+0.6, 1.05, z-0.9);
      box(0.25, 0.03,0.25, m.chrome, x+0.6, 2.08, z-0.9);
      box(0.12, 0.22,0.04, m.beige,  x+0.6, 1.98, z-0.9);

      // Bedside table
      box(0.45,0.5, 0.4, m.equip,  x-0.9, 0.25, z+0.7);
      box(0.45,0.03,0.4, m.chrome, x-0.9, 0.51, z+0.7);

      // Outlet panel
      box(0.08,0.5, 0.6, m.white,  x-0.9, 1.4,  z);
      box(0.04,0.08,0.08,m.blue,   x-0.94,1.55, z-0.18);
      box(0.04,0.08,0.08,m.orange, x-0.94,1.45, z-0.05);
      box(0.04,0.08,0.08,m.purple, x-0.94,1.35, z+0.08);
      box(0.04,0.08,0.08,m.green,  x-0.94,1.55, z+0.18);
    }
    icuBed(6, -7.5); icuBed(11, -7.5);
    icuBed(6, -3.5); icuBed(11, -3.5);

    // ICU nurse workstation
    box(2.0, 0.7, 0.6, m.equip,  8.5, 0.0,  -0.5);
    box(1.8, 0.04,0.55,m.dark,   8.5, 0.72, -0.5);
    [-1, 0, 1].forEach(dx => {
      box(0.5, 0.5, 0.06, m.dark, 7.5+dx, 1.0,  -0.82);
      box(0.44,0.42,0.04, m.scrn, 7.5+dx, 1.0,  -0.78);
    });

    // ══════════════════════════════════
    //  RADIOLOGY / MRI ROOM
    //  Equipment: MRI bore + rings, patient table, RF shield,
    //  operator console + 2 screens, x-ray lightbox
    // ══════════════════════════════════

    box(3.0, 1.6, 1.6, m.ctScan, 8, 0.8, 7);
    box(1.6, 1.0, 1.65,m.dark,   8, 0.8, 7);
    box(1.5, 0.9, 1.66,m.mriBore,8, 0.8, 7);
    cyl(0.82,0.18,m.ctRing, 8, 1.2, 6.18, Math.PI/2);
    cyl(0.82,0.18,m.ctRing, 8, 1.2, 7.82, Math.PI/2);
    cyl(0.5, 0.5, m.dark,   8, 0.8, 6.15, Math.PI/2);
    cyl(0.5, 0.5, m.dark,   8, 0.8, 7.85, Math.PI/2);
    box(0.45,0.12,2.2,m.white,  8, 0.3, 7);
    cyl(0.22,0.4, m.cyl,        8, 0.14,7);

    box(0.08,0.6, 1.0, m.chrome, 13.92, 1.4, 7);   // RF shield
    box(0.08,WH,  4,   m.chrome,  3.08,WH/2, 7);   // glazed partition

    box(1.8, 0.7, 0.7, m.equip, 5, 0.35, 7);
    box(1.6, 0.04,0.6, m.dark,  5, 0.72, 7);
    box(1.4, 0.7, 0.06,m.dark,  5, 1.1,  6.63);
    box(1.3, 0.6, 0.04,m.scrn,  5, 1.1,  6.6);
    box(0.4, 0.04,0.35,m.dark,  5, 0.76, 7);

    box(0.06,0.9, 1.4, m.accent,13.92, 1.8, 5);   // x-ray lightbox

    // ══════════════════════════════════
    //  NURSE STATION
    //  Equipment: L-shaped desk, 3x monitors, drug trolley,
    //  crash cart, fire extinguisher
    // ══════════════════════════════════

    box(6, 0.7, 0.5, m.equip, 0,    0.35,-0.25);
    box(0.5,0.7, 2.5,m.equip, 2.75, 0.35, 1.25);
    box(6, 0.04,0.48,m.chrome,0,    0.72,-0.25);
    box(0.48,0.04,2.5,m.chrome,2.75,0.72, 1.25);

    [-1.5, 0, 1.5].forEach(dx => {
      box(0.5, 0.5, 0.06, m.dark, dx, 1.0,  -0.25);
      box(0.44,0.42,0.04, m.scrn, dx, 1.0,  -0.22);
      cyl(0.04,0.28,m.chrome,     dx, 0.75, -0.25);
    });

    // Drug trolley
    box(0.5, 0.8, 0.4, m.white,  -2, 0.4,  1);
    box(0.48,0.04,0.38,m.chrome, -2, 0.82, 1);
    box(0.48,0.16,0.38,m.equip,  -2, 0.58, 1);
    box(0.48,0.14,0.38,m.equip,  -2, 0.38, 1);

    // Fire extinguisher
    cyl(0.1, 0.6, m.dkRed, -2.8, 0.3, -2.5);
    cyl(0.06,0.1, m.chrome,-2.8, 0.65,-2.5);

    // Crash cart
    box(0.65,1.0, 0.45,m.yellow,-2.5,0.5,  2.5);
    box(0.6, 0.04,0.4, m.chrome,-2.5,1.02, 2.5);
    box(0.5, 0.45,0.06,m.dark,  -2.5,0.75, 2.73);
    box(0.44,0.38,0.04,m.scrn,  -2.5,0.75, 2.72);
    cyl(0.06,0.25,m.chrome,     -2.8,1.14, 2.5);

    // ══════════════════════════════════
    //  CORRIDOR
    //  Equipment: gurney, wheelchair, wall alarm, signage
    // ══════════════════════════════════

    box(0.7, 0.2, 1.8, m.white, -1.5, 0.1, -8.5);
    box(0.7, 0.06,0.4, m.chrome,-1.5, 0.22,-9.4);
    [[0.3,0.3],[0.3,-0.3],[-0.3,0.3],[-0.3,-0.3]].forEach(([dx,dz]) =>
      cyl(0.04,0.25,m.chrome,-1.5+dx,0.12,-8.5+dz)
    );

    // Wheelchair
    box(0.5, 0.7, 0.04,m.dark, 0, 0.5, -9.5);
    box(0.5, 0.04,0.45,m.dark, 0, 0.12,-9.28);
    [[-0.3],[0.3]].forEach(([dx]) => {
      cyl(0.18,0.05,m.dark,  dx, 0.18,-9.28, Math.PI/2);
      cyl(0.1, 0.05,m.chrome,dx, 0.5, -9.28, Math.PI/2);
    });

    box(0.08,0.3, 0.22,m.dkRed,-2.92,2.1,-7);
    sph(0.06, m.yellow,-2.92,2.42,-7);

    box(0.06,0.35,0.9,m.accent,-13.9,2.1,-6);
    box(0.06,0.35,0.9,m.teal,   13.9,2.1,-6);
    box(0.06,0.35,0.9,m.accent,-13.9,2.1, 3);

    // ══════════════════════════════════
    //  PIPE NETWORK
    //  5 gases at staggered heights: O₂=1.5, Air=1.2, N₂O=1.8, Vac=0.9, CO₂=2.1
    // ══════════════════════════════════

    const PR = 0.065;
    const MX = -3.1; // main riser column x

    // ── Oxygen (blue) ─────────────────
    pipe(m.blue, PR, [[-13,1.5,-8],[-13,1.5,-5],[MX,1.5,-5],[MX,1.5,8]]);
    pipe(m.blue, PR*0.85, [[MX,1.5,-1],[-8,1.5,-1],[-8,1.5,2]]);
    pipe(m.blue, PR*0.7,  [[-8,1.5,2],[-13.8,1.5,2],[-13.8,0.9,2]]);
    pipe(m.blue, PR*0.85, [[MX,1.5,0],[3.1,1.5,0],[3.1,1.5,-10],[13,1.5,-10]]);
    [[6,-7.5],[11,-7.5],[6,-3.5],[11,-3.5]].forEach(([x,z]) =>
      pipe(m.blue, PR*0.65, [[x+0.05,1.5,z-0.5],[x+0.05,0.88,z-0.5]])
    );
    pipe(m.blue, PR*0.7, [[MX,1.5,6],[3.1,1.5,6],[3.1,1.5,9]]);

    // ── Medical air (orange) ──────────
    pipe(m.orange, PR, [[-13,1.2,-7.5],[-13,1.2,-5],[MX,1.2,-5],[MX,1.2,8]]);
    pipe(m.orange, PR*0.85, [[MX,1.2,-1],[-8,1.2,-1],[-8,1.2,2]]);
    pipe(m.orange, PR*0.7,  [[-8,1.2,2],[-13.8,1.2,2],[-13.8,0.85,2]]);
    pipe(m.orange, PR*0.85, [[MX,1.2,0],[3.1,1.2,0],[3.1,1.2,-10]]);
    [[6,-7.5],[11,-7.5],[6,-3.5],[11,-3.5]].forEach(([x,z]) =>
      pipe(m.orange, PR*0.65, [[x+0.05,1.2,z-0.5],[x+0.05,0.8,z-0.5]])
    );
    pipe(m.orange, PR*0.7, [[MX,1.2,5],[3.1,1.2,5],[3.1,1.2,8]]);

    // ── Nitrous oxide (green) ─────────
    pipe(m.green, PR, [[-13,1.8,-7.0],[-13,1.8,-5],[MX,1.8,-5],[MX,1.8,5]]);
    pipe(m.green, PR*0.85, [[MX,1.8,-1],[-8,1.8,-1],[-8,1.8,3]]);
    pipe(m.green, PR*0.7,  [[-8,1.8,3],[-13.8,1.8,3],[-13.8,0.8,3]]);
    pipe(m.green, PR*0.85, [[MX,1.8,0],[3.1,1.8,0],[3.1,1.8,-9]]);
    [[6,-7.5],[11,-7.5],[6,-3.5],[11,-3.5]].forEach(([x,z]) =>
      pipe(m.green, PR*0.6, [[x+0.05,1.8,z-0.5],[x+0.05,0.76,z-0.5]])
    );

    // ── Vacuum / suction (purple) ─────
    pipe(m.purple, PR, [[-13,0.9,-5],[MX,0.9,-5],[MX,0.9,7]]);
    pipe(m.purple, PR*0.85, [[MX,0.9,-1],[-8,0.9,-1],[-8,0.9,4]]);
    pipe(m.purple, PR*0.7,  [[-8,0.9,4],[-13.8,0.9,4],[-13.8,0.7,4]]);
    pipe(m.purple, PR*0.85, [[MX,0.9,0],[3.1,0.9,0],[3.1,0.9,-10]]);
    [[6,-7.5],[11,-7.5],[6,-3.5],[11,-3.5]].forEach(([x,z]) =>
      pipe(m.purple, PR*0.6, [[x+0.05,0.9,z-0.5],[x+0.05,0.72,z-0.5]])
    );
    pipe(m.purple, PR*0.7, [[MX,0.9,5],[3.1,0.9,5],[3.1,0.9,9]]);

    // ── CO₂ (red) — OR only ───────────
    pipe(m.red, PR, [[-13,2.1,-9],[-13,2.1,-5],[MX,2.1,-5],[MX,2.1,-2],[-8,2.1,-2],[-8,2.1,5]]);
    pipe(m.red, PR*0.65, [[-8,2.1,5],[-13.8,2.1,5],[-13.8,0.75,5]]);

    // ── Junction / riser boxes ────────
    [
      [MX,1.35,-5],[MX,1.35,0],[MX,1.35,5],
      [-8,1.35,-1],[-8,1.35,2],[-8,1.35,3],
      [3.1,1.35,0],[3.1,1.35,-5],[3.1,1.35,-9],
    ].forEach(([x,y,z]) => box(0.35,0.55,0.35,m.junc,x,y,z));

    // ══════════════════════════════════
    //  WALL-MOUNTED MCL LOGO PLAQUES
    // ══════════════════════════════════

    const logoLoader = new THREE.TextureLoader();
    const logoTexture = logoLoader.load(mclLogoImg);
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    function wallLogo(x, y, z, ry) {
      const mat = new THREE.MeshLambertMaterial({ map: logoTexture, transparent: true });
      const geo = new THREE.PlaneGeometry(1.6, 0.5);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.rotation.y = ry;
      scene.add(mesh); all.push(mesh);
    }
    wallLogo(3.08, 1.5,  2,   Math.PI/2);   // ICU corridor wall
    wallLogo(3.08, 1.5, -4,   Math.PI/2);   // ICU south wall
    wallLogo(-2.92, 1.5, -5,  Math.PI/2);   // Plant room wall
    wallLogo(-8,  1.5,  8.08, 0);            // OR rear wall
    wallLogo(8,   1.5, -1.05, 0);            // Radiology wall

    // ══════════════════════════════════
    //  CAMERA ORBIT CONTROLS
    // ══════════════════════════════════
    let isDrag = false, lx = 0, ly = 0;
    let theta = 0.62, phi = 0.55, rad = 30;
    const tgt = new THREE.Vector3(0, 0, 0);

    function camPos() {
      camera.position.set(
        tgt.x + rad * Math.sin(phi) * Math.sin(theta),
        tgt.y + rad * Math.cos(phi),
        tgt.z + rad * Math.sin(phi) * Math.cos(theta)
      );
      camera.lookAt(tgt);
    }
    camPos();

    const el = renderer.domElement;
    el.addEventListener('mousedown', e => { isDrag=true; lx=e.clientX; ly=e.clientY; });
    el.addEventListener('mouseup',   () => isDrag=false);
    el.addEventListener('mouseleave',() => isDrag=false);
    el.addEventListener('mousemove', e => {
      if (!isDrag) return;
      theta -= (e.clientX-lx)*0.007;
      phi = Math.max(0.12, Math.min(1.45, phi+(e.clientY-ly)*0.007));
      lx=e.clientX; ly=e.clientY; camPos();
    });
    el.addEventListener('wheel', e => {
      rad = Math.max(7, Math.min(55, rad+e.deltaY*0.035)); camPos(); e.preventDefault();
    }, { passive: false });
    let ltx=0,lty=0;
    el.addEventListener('touchstart', e => { ltx=e.touches[0].clientX; lty=e.touches[0].clientY; });
    el.addEventListener('touchmove',  e => {
      theta -= (e.touches[0].clientX-ltx)*0.007;
      phi = Math.max(0.12,Math.min(1.45,phi+(e.touches[0].clientY-lty)*0.007));
      ltx=e.touches[0].clientX; lty=e.touches[0].clientY; camPos(); e.preventDefault();
    }, { passive: false });

    function onResize() {
      const w=cont.clientWidth, h=cont.clientHeight;
      renderer.setSize(w,h); camera.aspect=w/h; camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize);

    let animId;
    function animate() { animId=requestAnimationFrame(animate); renderer.render(scene,camera); }
    animate();

    stateRef.current = {
      renderer, scene, all, pipeGroup, animId, onResize,
      resetCamera: () => { theta=0.62; phi=0.55; rad=30; camPos(); },
    };
    setReady(true);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js')
      .then(() => build(window.THREE))
      .catch(console.error);
    return () => {
      const s = stateRef.current;
      if (!s) return;
      cancelAnimationFrame(s.animId);
      window.removeEventListener('resize', s.onResize);
      s.renderer.dispose();
      while (mount?.firstChild) mount.removeChild(mount.firstChild);
      stateRef.current = null;
    };
  }, [build]);

  // Wireframe toggle
  useEffect(() => {
    const s = stateRef.current;
    if (!s) return;
    s.all.forEach(mesh => {
      [mesh.material].flat().forEach(mt => { mt.wireframe = wire; });
    });
  }, [wire]);

  // Pipe visibility toggle
  useEffect(() => {
    const s = stateRef.current;
    if (!s) return;
    s.pipeGroup.visible = pipesOn;
  }, [pipesOn]);

  const resetView = useCallback(() => stateRef.current?.resetCamera(), []);

  const LEGEND = [
    { color: '#1E88E5', label: 'Oxygen (O₂)' },
    { color: '#FB8C00', label: 'Medical air' },
    { color: '#43A047', label: 'Nitrous oxide (N₂O)' },
    { color: '#8E24AA', label: 'Vacuum / suction' },
    { color: '#E53935', label: 'CO₂' },
  ];

  return (
    <div style={{ position:'relative', width:'100%', height, borderRadius:0, overflow:'hidden', border:'none', background:'#1e293b' }}>
      <div ref={mountRef} style={{ width:'100%', height:'100%' }} />

      {ready && (
        <>
          {/* Hint */}
          <div style={{ position:'absolute',top:12,left:12,background:'rgba(255,255,255,0.9)',borderRadius:6,padding:'4px 10px',fontSize:11,color:'#555',border:'0.5px solid #cdd5de',pointerEvents:'none' }}>
            Drag to rotate · Scroll to zoom
          </div>

          {/* Controls */}
          <div style={{ position:'absolute',top:12,right:12,display:'flex',flexDirection:'column',gap:6 }}>
            <button onClick={resetView} style={CTRL_BTN}>Reset view</button>
            <button onClick={() => setWire(w => !w)} style={CTRL_BTN}>{wire ? 'Solid' : 'Wireframe'}</button>
            <button onClick={() => setPipesOn(p => !p)} style={CTRL_BTN}>{pipesOn ? 'Hide pipes' : 'Show pipes'}</button>
          </div>

          {/* Legend */}
          <div style={{ position:'absolute',bottom:14,left:14,background:'rgba(255,255,255,0.93)',border:'0.5px solid #cdd5de',borderRadius:8,padding:'10px 14px',display:'flex',flexDirection:'column',gap:5 }}>
            {LEGEND.map(({ color, label }) => (
              <div key={label} style={{ display:'flex',alignItems:'center',gap:8,fontSize:11,color:'#333' }}>
                <div style={{ width:26,height:5,borderRadius:3,background:color }} />
                {label}
              </div>
            ))}
          </div>
        </>
      )}

      {!ready && (
        <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:'#666' }}>
          Loading 3D scene…
        </div>
      )}
    </div>
  );
}
