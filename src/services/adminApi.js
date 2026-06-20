import API_URL from './api';

async function request(path, { method = 'GET', token, body, isFormData = false } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!isFormData) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }

  return data;
}

export const adminApi = {
  get: (path, token) => request(path, { method: 'GET', token }),
  post: (path, token, body) => request(path, { method: 'POST', token, body }),
  put: (path, token, body) => request(path, { method: 'PUT', token, body }),
  delete: (path, token) => request(path, { method: 'DELETE', token }),
  postForm: (path, token, formData) => request(path, { method: 'POST', token, body: formData, isFormData: true }),
};

export default adminApi;
