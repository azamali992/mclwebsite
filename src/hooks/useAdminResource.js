import { useState, useEffect, useCallback } from 'react';
import adminApi from '../services/adminApi';

/**
 * Shared fetch/loading/error/CRUD state for the admin panel's resource
 * managers (Content, Product, Career, Stat, Application, Image). Mutators
 * intentionally re-throw on failure instead of catching — each manager keeps
 * its own try/catch around a call so it can show its own specific error
 * copy ("Failed to save content" vs "Failed to save product") and run its
 * own post-save UI logic (closing a form, resetting fields, etc).
 */
export default function useAdminResource(endpoint, token, { idField = '_id' } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminApi.get(endpoint, token);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [endpoint, token]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = useCallback(async (payload) => {
    await adminApi.post(endpoint, token, payload);
    await fetchItems();
  }, [endpoint, token, fetchItems]);

  const updateItem = useCallback(async (id, payload, { refetch = true } = {}) => {
    await adminApi.put(`${endpoint}/${id}`, token, payload);
    if (refetch) {
      await fetchItems();
    } else {
      setItems((prev) => prev.map((item) => (item[idField] === id ? { ...item, ...payload } : item)));
    }
  }, [endpoint, token, fetchItems, idField]);

  const removeItem = useCallback(async (id, { refetch = false } = {}) => {
    await adminApi.delete(`${endpoint}/${id}`, token);
    if (refetch) {
      await fetchItems();
    } else {
      setItems((prev) => prev.filter((item) => item[idField] !== id));
    }
  }, [endpoint, token, fetchItems, idField]);

  return { items, setItems, loading, error, setError, fetchItems, createItem, updateItem, removeItem };
}
