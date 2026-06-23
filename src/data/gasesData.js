import gasesRaw from '../assets/mcl_gases_data.json';
import { slugify } from './products';

const FOOTER_USE_CASE_TITLES = new Set(['LOCATIONS']);

function isRealUseCase(title) {
  return title !== 'PRODUCT DATA' && !title.startsWith('—') && !FOOTER_USE_CASE_TITLES.has(title);
}

// "PRODUCT DATA" use-case entries pack alternating LABEL/value lines, with
// scraped boilerplate ("Need a Safety Data Sheet?...") run on at the end.
function parseTechSpecs(text) {
  if (!text) return [];
  const clean = text.split(/Need a/i)[0];
  const lines = clean.split('\n').map((l) => l.trim()).filter(Boolean);
  const pairs = [];
  for (let i = 0; i < lines.length - 1; i += 2) pairs.push({ label: lines[i], value: lines[i + 1] });
  return pairs;
}

// Scraped "stat_*" fields pack "VALUE\nLABEL", but several are templated
// counters the scraper couldn't read (rendered as a bare "0+") — drop those.
function parseStat(raw) {
  if (!raw) return null;
  const [value, label] = raw.split('\n').map((s) => s.trim());
  if (!value || /^0\+?$/.test(value)) return null;
  return { value, label: label || null };
}

function sectionId(name, category) {
  if (category === 'Medical Gases') return 'medical';
  if (category === 'Speciality Gases') return 'specialty';
  if (name === 'LPG') return 'lpg';
  return 'industrial';
}

export const gases = gasesRaw.map((g) => {
  const urlParts = g.url.split('/').filter(Boolean);
  const slug = slugify(urlParts.pop());
  const categoryPath = slugify(urlParts.pop());
  const techSpecEntry = g.use_cases.find((u) => u.title === 'PRODUCT DATA');

  return {
    ...g,
    slug,
    categoryPath,
    section: sectionId(g.name, g.category),
    cardTitle: g.formula && g.formula !== g.name ? `${g.name} (${g.formula})` : g.name,
    techSpecs: parseTechSpecs(techSpecEntry?.description),
    useCases: g.use_cases.filter((u) => isRealUseCase(u.title)),
    stats: {
      capacity: parseStat(g.stat_capacity),
      cylinders: parseStat(g.stat_cylinders),
      stations: parseStat(g.stat_stations),
      years: parseStat(g.stat_years),
    },
  };
});

export const gasesBySection = {
  industrial: gases.filter((g) => g.section === 'industrial'),
  medical: gases.filter((g) => g.section === 'medical'),
  specialty: gases.filter((g) => g.section === 'specialty'),
  lpg: gases.filter((g) => g.section === 'lpg'),
};

export function getGas(categoryPath, slug) {
  return gases.find((g) => g.categoryPath === categoryPath && g.slug === slug);
}

export function getRelatedGases(gas, count = 4) {
  return gases.filter((g) => g.category === gas.category && g.slug !== gas.slug).slice(0, count);
}
