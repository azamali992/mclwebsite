import React, { useState, useRef } from 'react';
import { FiUpload, FiImage, FiX } from 'react-icons/fi';
import adminApi from '../../services/adminApi';
import API_URL from '../../services/api';

const ImagePicker = ({ token, value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showLibrary, setShowLibrary] = useState(false);
  const [library, setLibrary] = useState([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const data = await adminApi.postForm('/api/upload/upload', token, formData);
      onChange({ url: data.url, filename: data.filename });
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const openLibrary = async () => {
    setShowLibrary(true);
    setLibraryLoading(true);
    try {
      const images = await adminApi.get('/api/upload', token);
      setLibrary(Array.isArray(images) ? images : []);
    } catch (err) {
      setError(err.message || 'Failed to load image library');
    } finally {
      setLibraryLoading(false);
    }
  };

  const pickFromLibrary = (img) => {
    onChange({ url: img.url, filename: img.filename });
    setShowLibrary(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>

      {error && <p className="text-xs text-red-600 mb-2">{error}</p>}

      {value?.url ? (
        <div className="relative w-32 h-32 mb-3 rounded-lg overflow-hidden border border-gray-200">
          <img src={`${API_URL}${value.url}`} alt="Selected" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove image"
            className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
          >
            <FiX size={14} />
          </button>
        </div>
      ) : (
        <div className="w-32 h-32 mb-3 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
          <FiImage size={28} />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <label className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <FiUpload size={14} /> {uploading ? 'Uploading...' : 'Upload New'}
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
        <button
          type="button"
          onClick={openLibrary}
          className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <FiImage size={14} /> Choose Existing
        </button>
      </div>

      {showLibrary && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowLibrary(false)}>
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Choose an image</h3>
              <button onClick={() => setShowLibrary(false)} aria-label="Close" className="text-gray-500 hover:text-gray-700">
                <FiX size={20} />
              </button>
            </div>
            {libraryLoading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : library.length === 0 ? (
              <p className="text-sm text-gray-500">No images uploaded yet.</p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {library.map((img) => (
                  <button
                    key={img.filename}
                    onClick={() => pickFromLibrary(img)}
                    className="aspect-square rounded-lg overflow-hidden border border-gray-200 hover:ring-2 hover:ring-blue-500"
                  >
                    <img src={`${API_URL}${img.url}`} alt={img.filename} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
