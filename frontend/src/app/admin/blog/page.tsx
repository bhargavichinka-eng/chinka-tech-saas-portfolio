'use client';
import { useEffect, useState } from 'react';
import { BlogPost } from '@/types';
import api, { endpoints } from '@/lib/api';
import { Pencil, Trash2, Plus, Eye, EyeOff } from 'lucide-react';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({ title: '', slug: '', content: '', tags: '', isPublished: false });
  const load = () => api.get(endpoints.blog).then(r => setPosts(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) await api.put(`${endpoints.blog}/${editing.id}`, form);
    else await api.post(endpoints.blog, form);
    setShowForm(false); setEditing(null); load();
  };
  const del = async (id: number) => { if (confirm('Delete?')) { await api.delete(`${endpoints.blog}/${id}`); load(); } };
  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ title: '', slug: '', content: '', tags: '', isPublished: false }); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"><Plus size={18} /> New Post</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} className="w-full border rounded-lg px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Slug</label><input required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label><input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Content</label><textarea required rows={8} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
            <div className="flex items-center gap-2"><input type="checkbox" id="pub" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} /><label htmlFor="pub" className="text-sm font-medium text-gray-700">Published</label></div>
            <div className="flex gap-3"><button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Save</button><button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg">Cancel</button></div>
          </form>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50"><tr>{['Title', 'Slug', 'Status', 'Date', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left font-medium text-gray-700">{h}</th>)}</tr></thead>
          <tbody className="divide-y">
            {posts.map(p => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium text-gray-900">{p.title}</td>
                <td className="px-4 py-3 text-gray-500">{p.slug}</td>
                <td className="px-4 py-3">{p.isPublished ? <span className="flex items-center gap-1 text-green-600"><Eye size={14} /> Published</span> : <span className="flex items-center gap-1 text-gray-400"><EyeOff size={14} /> Draft</span>}</td>
                <td className="px-4 py-3 text-gray-500">{new Date(p.publishedDate).toLocaleDateString()}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => { setEditing(p); setForm({ title: p.title, slug: p.slug, content: p.content, tags: p.tags, isPublished: p.isPublished }); setShowForm(true); }} className="text-blue-600 hover:text-blue-800"><Pencil size={16} /></button>
                  <button onClick={() => del(p.id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <div className="text-center text-gray-500 py-8">No posts yet</div>}
      </div>
    </div>
  );
}
