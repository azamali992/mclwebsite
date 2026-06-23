import {
  FaFire, FaWind, FaFlask, FaTint,
  FaMicrochip, FaBurn, FaHeartbeat, FaCircle, FaHospital, FaPills,
} from 'react-icons/fa';

export const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const categoryGroups = [
  {
    label: 'Gases',
    id: 'gases',
    items: [
      { id: 'industrial', label: 'Industrial Gases', icon: FaFire },
      { id: 'medical', label: 'Medical Gases', icon: FaHeartbeat },
      { id: 'specialty', label: 'Specialty Gases', icon: FaFlask },
      { id: 'lpg', label: 'LPG', icon: FaBurn },
    ],
  },
  {
    label: 'Healthcare Engineering & Equipment',
    id: 'healthcare-engineering',
    items: [
      { id: 'mgps', label: 'Medical Gas Pipelines', icon: FaTint },
      { id: 'terminals', label: 'Terminal Units', icon: FaCircle },
      { id: 'delivery', label: 'Gas Delivery', icon: FaWind },
      { id: 'modular', label: 'Modular OT', icon: FaHospital },
      { id: 'diagnostic', label: 'Diagnostic Systems', icon: FaMicrochip },
      { id: 'critical', label: 'Critical Care', icon: FaHeartbeat },
      { id: 'therapeutic', label: 'Therapeutic', icon: FaPills },
    ],
  },
];
