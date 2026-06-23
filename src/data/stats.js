// Single source of truth for every reusable "stat" shown across the site.
// Each entry's `value` is the default shown until the matching record loads
// from MongoDB (see backend/models/Stat.js) — admins edit the live value
// from the admin panel's Stats tab. `key` must stay stable since it's used
// to match against the database record of the same name.
const STATS = {
  years_of_excellence: { value: '40+', label: 'Years Of', subtitle: 'Excellence', group: 'company', order: 1 },
  oxygen_plant_capacity: { value: '125 TPD', label: 'Oxygen Plant', subtitle: 'Capacity', group: 'company', order: 2 },
  cylinder_capacity: { value: '87000+', label: 'Cylinders', subtitle: 'Capacity', group: 'company', order: 3 },
  fleet_trucks: { value: '65+', label: 'Trucks In', subtitle: 'Our Fleet', group: 'company', order: 4 },
  filling_stations: { value: '35+', label: 'Filling Stations', subtitle: 'Nationwide', group: 'company', order: 5 },
  satisfied_clients: { value: '1000+', label: 'Satisfied', subtitle: 'Clients', group: 'company', order: 6 },

  authorized_distributors: { value: '30+', label: 'Authorized', subtitle: 'Distributors', group: 'infrastructure', order: 1 },
  tanker_trucks: { value: '20+', label: 'Tanker Trucks', subtitle: '', group: 'infrastructure', order: 2 },
  logistics_staff: { value: '100+', label: 'Dedicated Staff', subtitle: '', group: 'infrastructure', order: 3 },

  mgps_projects_completed: { value: '100+', label: 'MGPS Projects', subtitle: 'Completed', group: 'mgps', order: 1 },
  mgps_years_experience: { value: '25+', label: 'Years Of', subtitle: 'Experience', group: 'mgps', order: 2 },
  mgps_bed_capacity: { value: '50,000+', label: 'Bed Capacity', subtitle: 'Connected', group: 'mgps', order: 3 },

  founded_year: { value: '1985', label: 'Established', subtitle: '', group: 'company_info', order: 1 },
};

export const STATS_LIST = Object.entries(STATS).map(([key, stat]) => ({ key, ...stat }));

// Merges a live DB record (from useStats' statsMap) over the default for `key`,
// falling back to the default whenever the DB hasn't loaded yet or has no row for it.
export function resolveStat(statsMap, key) {
  const fallback = STATS[key];
  const live = statsMap?.[key];
  if (!fallback) return live || null;
  return {
    value: live?.value ?? fallback.value,
    label: live?.label ?? fallback.label,
    subtitle: live?.subtitle ?? fallback.subtitle,
  };
}

export default STATS;
