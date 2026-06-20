import React, { useState, useRef, useEffect } from 'react';
import { FiUpload, FiTrash2, FiCopy } from 'react-icons/fi';
import adminApi from '../../services/adminApi';

const ImageManager = ({ token }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await adminApi.get('/api/upload', token);
      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch images:', err);
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files) return;

    for (let file of files) {
      await uploadImage(file);
    }
    await fetchImages();
  };

  const uploadImage = async (file) => {
    try {
      setLoading(true);
      setError('');
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('image', file);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setUploadProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setImages((prev) => [...prev, response]);
          setUploadProgress(0);
        } else {
          const response = JSON.parse(xhr.responseText);
          setError(response.message || 'Upload failed');
        }
        setLoading(false);
      });

      xhr.addEventListener('error', () => {
        setError('Upload failed');
        setLoading(false);
      });

      xhr.open('POST', `${import.meta.env.VITE_API_URL}/api/upload/upload`);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData);
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await adminApi.delete(`/api/upload/${filename}`, token);
      setImages((prev) => prev.filter((img) => img.filename !== filename));
    } catch (err) {
      setError(err.message || 'Failed to delete image');
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert('Image URL copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Uploading...</span>
            <span className="text-sm font-bold text-blue-700">{Math.round(uploadProgress)}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:bg-blue-50 transition-colors"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <FiUpload className="mx-auto text-4xl text-blue-500 mb-2" />
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Drop images here</h3>
        <p className="text-sm text-gray-600">or click to browse your files</p>
        <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF, WebP up to 10MB</p>
      </div>

      {images.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Images</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img.filename} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${img.url}`}
                    alt={img.filename}
                    className="max-h-full max-w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 truncate mb-3">{img.filename}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(`${import.meta.env.VITE_API_URL}${img.url}`)}
                      className="flex-1 flex items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded text-sm font-medium transition-colors"
                    >
                      <FiCopy size={16} /> Copy URL
                    </button>
                    <button
                      onClick={() => handleDelete(img.filename)}
                      className="flex-1 flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded text-sm font-medium transition-colors"
                    >
                      <FiTrash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && images.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No images uploaded yet. Start by uploading some images!</p>
        </div>
      )}
    </div>
  );
};

export default ImageManager;
