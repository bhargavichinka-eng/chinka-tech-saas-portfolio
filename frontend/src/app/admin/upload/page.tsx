'use client';
import { useState, useRef } from 'react';
import api, { endpoints } from '@/lib/api';
import { Upload } from 'lucide-react';

export default function AdminUploadPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post(endpoints.upload, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setUploadedUrl(res.data.url);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Image Upload</h1>
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-xl">
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <Upload size={48} className="text-gray-400 mx-auto mb-4" />
            <input type="file" ref={fileRef} accept="image/*" className="hidden" id="file-input" />
            <label htmlFor="file-input" className="cursor-pointer text-blue-600 hover:underline font-medium">Choose an image</label>
            <p className="text-gray-400 text-sm mt-2">JPG, PNG, GIF, WebP up to 10MB</p>
          </div>
          {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
          <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50">
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>
        {uploadedUrl && (
          <div className="mt-6 p-4 bg-green-50 rounded-xl">
            <p className="text-green-800 font-semibold mb-2">✓ Uploaded successfully!</p>
            <p className="text-sm text-gray-600 break-all mb-3">{uploadedUrl}</p>
            <img src={uploadedUrl} alt="Uploaded" className="max-w-full rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
