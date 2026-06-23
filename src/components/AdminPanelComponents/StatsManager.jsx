import { useState, useEffect } from 'react';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import adminApi from '../../services/adminApi';

const GROUP_LABELS = {
  company: 'Homepage Stats Bar',
  infrastructure: 'Infrastructure & Logistics',
  mgps: 'MGPS Overview',
  company_info: 'Company Info',
};

const StatsManager = ({ token }) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ value: '', label: '', subtitle: '' });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await adminApi.get('/api/stats', token);
      setStats(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (stat) => {
    setEditingId(stat._id);
    setFormData({ value: stat.value, label: stat.label || '', subtitle: stat.subtitle || '' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ value: '', label: '', subtitle: '' });
  };

  const handleSave = async (id) => {
    try {
      setError('');
      await adminApi.put(`/api/stats/${id}`, token, formData);
      await fetchStats();
      handleCancel();
    } catch (err) {
      setError(err.message || 'Failed to update stat');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const groups = stats.reduce((acc, stat) => {
    acc[stat.group] = acc[stat.group] || [];
    acc[stat.group].push(stat);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <p className="text-sm text-gray-500">
        These are the headline numbers reused across the site (years of excellence, plant capacity, fleet size, etc).
        Editing a value here updates it everywhere it's displayed.
      </p>

      {Object.entries(groups).map(([group, items]) => (
        <div key={group}>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">
            {GROUP_LABELS[group] || group}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((stat) => {
              const isEditing = editingId === stat._id;
              return (
                <div key={stat._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        placeholder="Value (e.g. 40+)"
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={formData.label}
                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                        placeholder="Label"
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Subtitle (optional)"
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => handleSave(stat._id)}
                          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-semibold"
                        >
                          <FiSave size={12} /> Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs font-semibold"
                        >
                          <FiX size={12} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-mono text-gray-400">{stat.key}</p>
                        <p className="text-2xl font-bold text-gray-900 leading-tight">{stat.value}</p>
                        <p className="text-xs text-gray-500">{[stat.label, stat.subtitle].filter(Boolean).join(' ')}</p>
                      </div>
                      <button
                        onClick={() => handleEdit(stat)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg flex-shrink-0"
                      >
                        <FiEdit2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {stats.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-8">
          No stats found yet. Run the backend's <code>npm run seed-stats</code> script to populate defaults.
        </p>
      )}
    </div>
  );
};

export default StatsManager;
