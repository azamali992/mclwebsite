import { useState } from 'react';
import { FiTrash2, FiDownload, FiSearch } from 'react-icons/fi';
import useAdminResource from '../../hooks/useAdminResource';
import API_URL from '../../services/api';

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  reviewed: 'bg-yellow-100 text-yellow-800',
  rejected: 'bg-red-100 text-red-800',
  hired: 'bg-green-100 text-green-800',
};

const ApplicationsManager = ({ token }) => {
  const {
    items: applications,
    loading,
    error,
    setError,
    updateItem,
    removeItem,
  } = useAdminResource('/api/applications', token);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleStatusChange = async (id, status) => {
    try {
      await updateItem(id, { status }, { refetch: false });
    } catch (err) {
      setError(err.message || 'Failed to update application');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      await removeItem(id);
    } catch (err) {
      setError(err.message || 'Failed to delete application');
    }
  };

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase();
    const matchesSearch = a.fullname?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q) || a.jobId?.position?.toLowerCase().includes(q);
    const matchesStatus = !statusFilter || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or job..."
            className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="reviewed">Reviewed</option>
          <option value="rejected">Rejected</option>
          <option value="hired">Hired</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">No applications found.</p>
        )}
        {filtered.map((app) => (
          <div key={app._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">{app.fullname}</h3>
                <p className="text-sm text-gray-600">{app.email} {app.phone && `• ${app.phone}`}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Applied for: <span className="font-medium text-gray-700">{app.jobId?.position || 'Unknown position'}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColors[app.status] || 'bg-gray-100 text-gray-800'}`}>
                  {app.status}
                </span>
                <button
                  onClick={() => handleDelete(app._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  aria-label="Delete application"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>

            {app.experience && <p className="text-sm text-gray-600 mt-2">Experience: {app.experience}</p>}
            {app.message && <p className="text-sm text-gray-600 mt-2 line-clamp-3">{app.message}</p>}

            <div className="flex flex-wrap items-center gap-3 mt-3">
              {app.resume?.url && (
                <a
                  href={`${API_URL}${app.resume.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                  <FiDownload size={14} /> Download resume
                </a>
              )}
              <select
                value={app.status}
                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsManager;
