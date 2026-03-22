'use client';
import { useEffect, useState } from 'react';
import { Testimonial } from '@/types';
import api, { endpoints } from '@/lib/api';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ clientName: '', company: '', feedback: '', rating: 5 });
  const load = () => api.get(endpoints.testimonials).then(r => setItems(r.data));
  useEffect(() => { load(); }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) await api.put(`${endpoints.testimonials}/${editing.id}`, form);
    else await api.post(endpoints.testimonials, form);
    setShowForm(false); setEditing(null); load();
  };
  const del = async (id: number) => { if (confirm('Delete?')) { await api.delete(`${endpoints.testimonials}/${id}`); load(); } };
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ clientName: '', company: '', feedback: '', rating: 5 }); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"><Plus size={18} /> Add</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label><input required value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Company</label><input required value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label><textarea required rows={3} value={form.feedback} onChange={e => setForm({ ...form, feedback: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label><input type="number" min={1} max={5} value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className="w-24 border rounded-lg px-3 py-2" /></div>
            <div className="flex gap-3"><button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Save</button><button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg">Cancel</button></div>
          </form>
        </div>
      )}
      <div className="space-y-4">
        {items.map(t => (
          <div key={t.id} className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-900">{t.clientName} - {t.company}</p>
              <p className="text-yellow-500">{'★'.repeat(t.rating)}</p>
              <p className="text-gray-700 mt-1 text-sm">{t.feedback}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(t); setForm({ clientName: t.clientName, company: t.company, feedback: t.feedback, rating: t.rating }); setShowForm(true); }} className="text-blue-600 hover:text-blue-800"><Pencil size={16} /></button>
              <button onClick={() => del(t.id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
