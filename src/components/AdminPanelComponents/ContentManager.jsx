import { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiX, FiSearch } from 'react-icons/fi';
import useAdminResource from '../../hooks/useAdminResource';
import ImagePicker from './ImagePicker';

const emptyForm = {
  section: 'hero',
  key: '',
  title: '',
  description: '',
  text: '',
  image: null,
  isActive: true,
};

const ContentManager = ({ token }) => {
  const {
    items: content,
    loading,
    error,
    setError,
    createItem,
    updateItem,
    removeItem,
  } = useAdminResource('/api/content', token);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const handleSave = async () => {
    try {
      setError('');
      if (editingId) {
        await updateItem(editingId, formData);
      } else {
        await createItem(formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
    } catch (err) {
      setError(err.message || 'Failed to save content');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;
    try {
      await removeItem(id, { refetch: true });
    } catch (err) {
      setError(err.message || 'Failed to delete content');
    }
  };

  const handleEdit = (item) => {
    setFormData({ ...emptyForm, ...item });
    setEditingId(item._id);
    setShowForm(true);
  };

  const filteredContent = content.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.section?.toLowerCase().includes(q) ||
      item.key?.toLowerCase().includes(q) ||
      item.title?.toLowerCase().includes(q)
    );
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
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <FiPlus /> Add Content
        </button>

        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by section, key, or title..."
            className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{editingId ? 'Edit' : 'Add'} Content</h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="hero">Hero</option>
                <option value="about">About</option>
                <option value="products">Products</option>
                <option value="services">Services</option>
                <option value="careers">Careers</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="footer">Footer</option>
                <option value="navbar">Navbar</option>
                <option value="contact">Contact</option>
                <option value="divisions">Divisions</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Key</label>
              <input
                type="text"
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                placeholder="e.g., main_title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="Main text content"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <ImagePicker
              token={token}
              value={formData.image}
              onChange={(image) => setFormData({ ...formData, image })}
            />

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
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              <FiSave /> Save Content
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {filteredContent.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">No content found.</p>
        )}
        {filteredContent.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start gap-3">
                {item.image?.url && (
                  <img src={`${import.meta.env.VITE_API_URL}${item.image.url}`} alt="" className="w-12 h-12 rounded object-cover flex-shrink-0" />
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {item.section}
                    </span>
                    <span className="text-xs font-semibold bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {item.key}
                    </span>
                    {!item.isActive && (
                      <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        Inactive
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManager;
