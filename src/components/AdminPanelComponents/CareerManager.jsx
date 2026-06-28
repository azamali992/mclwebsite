import { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiX, FiSearch } from 'react-icons/fi';
import useAdminResource from '../../hooks/useAdminResource';

const emptyForm = {
  position: '',
  description: '',
  department: '',
  location: '',
  type: 'Full-time',
  salary: '',
  requirements: '',
  responsibilities: '',
  isActive: true,
};

const CareerManager = ({ token }) => {
  const {
    items: careers,
    loading,
    error,
    setError,
    createItem,
    updateItem,
    removeItem,
  } = useAdminResource('/api/careers', token);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const handleSave = async () => {
    try {
      setError('');
      const dataToSend = {
        ...formData,
        requirements: formData.requirements.split('\n').map((r) => r.trim()).filter((r) => r),
        responsibilities: formData.responsibilities.split('\n').map((r) => r.trim()).filter((r) => r),
      };

      if (editingId) {
        await updateItem(editingId, dataToSend);
      } else {
        await createItem(dataToSend);
      }

      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
    } catch (err) {
      setError(err.message || 'Failed to save career');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this career posting?')) return;
    try {
      await removeItem(id, { refetch: true });
    } catch (err) {
      setError(err.message || 'Failed to delete career');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      position: item.position,
      description: item.description || '',
      department: item.department || '',
      location: item.location || '',
      type: item.type || 'Full-time',
      salary: item.salary || '',
      requirements: (item.requirements || []).join('\n'),
      responsibilities: (item.responsibilities || []).join('\n'),
      isActive: item.isActive,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const filteredCareers = careers.filter((c) => {
    const q = search.toLowerCase();
    return c.position?.toLowerCase().includes(q) || c.department?.toLowerCase().includes(q) || c.location?.toLowerCase().includes(q);
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
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData(emptyForm);
          }}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          <FiPlus /> Post Career
        </button>

        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by position, department, location..."
            className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{editingId ? 'Edit' : 'Add'} Career</h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="Job position"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Job description"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="Department"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="e.g., PKR 80,000 - 120,000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (one per line)</label>
              <textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="Requirement 1&#10;Requirement 2&#10;Requirement 3"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities (one per line)</label>
              <textarea
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                placeholder="Responsibility 1&#10;Responsibility 2&#10;Responsibility 3"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                Active
              </label>
            </div>

            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              <FiSave /> Save Career
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {filteredCareers.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">No career postings found.</p>
        )}
        {filteredCareers.map((career) => (
          <div key={career._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{career.position}</h3>
                <p className="text-sm text-gray-600">{career.department} &bull; {career.location}</p>
              </div>
              <span className="text-xs font-semibold bg-purple-100 text-purple-800 px-2 py-1 rounded">
                {career.type}
              </span>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(career)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDelete(career._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{career.description}</p>
            {career.salary && <p className="text-sm font-semibold text-gray-900 mt-2">{career.salary}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerManager;
