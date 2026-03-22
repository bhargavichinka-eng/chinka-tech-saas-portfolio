'use client';
import { useEffect, useState } from 'react';
import { Product } from '@/types';
import api, { endpoints } from '@/lib/api';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: '', description: '', techStack: '', liveUrl: '', githubUrl: '', imageUrl: '' });

  const load = () => api.get(endpoints.products).then(r => setProducts(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) await api.put(`${endpoints.products}/${editing.id}`, form);
    else await api.post(endpoints.products, form);
    setShowForm(false);
    setEditing(null);
    setForm({ name: '', description: '', techStack: '', liveUrl: '', githubUrl: '', imageUrl: '' });
    load();
  };

  const handleEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description, techStack: p.techStack, liveUrl: p.liveUrl || '', githubUrl: p.githubUrl || '', imageUrl: p.imageUrl || '' });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this product?')) { await api.delete(`${endpoints.products}/${id}`); load(); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ name: '', description: '', techStack: '', liveUrl: '', githubUrl: '', imageUrl: '' }); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"><Plus size={18} /> Add Product</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit Product' : 'New Product'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[['name', 'Name'], ['techStack', 'Tech Stack'], ['liveUrl', 'Live URL'], ['githubUrl', 'GitHub URL'], ['imageUrl', 'Image URL']].map(([field, label]) => (
              <div key={field}><label className="block text-sm font-medium text-gray-700 mb-1">{label}</label><input type="text" value={(form as Record<string, string>)[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} className="w-full border rounded-lg px-3 py-2" required={field === 'name'} /></div>
            ))}
            <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border rounded-lg px-3 py-2" required /></div>
            <div className="flex gap-3 md:col-span-2">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
            </div>
          </form>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50"><tr>{['Name', 'Tech Stack', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left font-medium text-gray-700">{h}</th>)}</tr></thead>
          <tbody className="divide-y">
            {products.map(p => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                <td className="px-4 py-3 text-gray-600">{p.techStack}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <div className="text-center text-gray-500 py-8">No products yet</div>}
      </div>
    </div>
  );
}
