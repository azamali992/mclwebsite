import { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiX, FiSearch } from 'react-icons/fi';
import useAdminResource from '../../hooks/useAdminResource';
import ImagePicker from './ImagePicker';

const emptyForm = {
  name: '',
  description: '',
  category: '',
  price: '',
  features: '',
  image: null,
  isActive: true,
  order: 0,
};

const ProductManager = ({ token }) => {
  const {
    items: products,
    loading,
    error,
    setError,
    createItem,
    updateItem,
    removeItem,
  } = useAdminResource('/api/products', token);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const handleSave = async () => {
    try {
      setError('');
      const dataToSend = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        features: formData.features.split(',').map((f) => f.trim()).filter((f) => f),
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
      setError(err.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await removeItem(id, { refetch: true });
    } catch (err) {
      setError(err.message || 'Failed to delete product');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description || '',
      category: item.category || '',
      price: item.price || '',
      features: (item.features || []).join(', '),
      image: item.image || null,
      isActive: item.isActive,
      order: item.order,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    return p.name?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q);
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
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          <FiPlus /> Add Product
        </button>

        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or category..."
            className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{editingId ? 'Edit' : 'Add'} Product</h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Industrial Gases"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma-separated)</label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Feature 1, Feature 2, Feature 3"
                rows="3"
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
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <FiSave /> Save Product
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {filteredProducts.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">No products found.</p>
        )}
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start gap-3">
                {product.image?.url && (
                  <img src={`${import.meta.env.VITE_API_URL}${product.image.url}`} alt="" className="w-12 h-12 rounded object-cover flex-shrink-0" />
                )}
                <div>
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
            {product.price && <p className="text-sm font-semibold text-gray-900 mt-2">${product.price}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;
