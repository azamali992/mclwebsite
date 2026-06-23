const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchContentBySection(section) {
  const res = await fetch(`${API_URL}/api/content/section/${section}`);
  if (!res.ok) throw new Error(`Failed to fetch ${section} content`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export function contentToMap(contentArray) {
  const map = {};
  contentArray.forEach(item => { map[item.key] = item; });
  return map;
}

export async function fetchStats() {
  const res = await fetch(`${API_URL}/api/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export function statsToMap(statsArray) {
  const map = {};
  statsArray.forEach(item => { map[item.key] = item; });
  return map;
}

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function fetchCareers() {
  const res = await fetch(`${API_URL}/api/careers`);
  if (!res.ok) throw new Error('Failed to fetch careers');
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function fetchImages() {
  const res = await fetch(`${API_URL}/api/upload`);
  if (!res.ok) throw new Error('Failed to fetch images');
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function submitContact(data) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}

export async function sendChatMessage(message, history) {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to get a response');
  return data;
}

export async function subscribeNewsletter(email) {
  const res = await fetch(`${API_URL}/api/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('Failed to subscribe');
  return res.json();
}

export default API_URL;
