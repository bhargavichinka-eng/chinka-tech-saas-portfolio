'use client';
import { useEffect, useState } from 'react';
import { CaseStudy } from '@/types';
import api, { endpoints } from '@/lib/api';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function AdminCaseStudiesPage() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [form, setForm] = useState({ title: '', problem: '', solution: '', result: '', techStack: '', imageUrl: '' });
  const load = () => api.get(endpoints.caseStudies).then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) await api.put(`${endpoints.caseStudies}/${editing.id}`, form);
    else await api.post(endpoints.caseStudies, form);
    setShowForm(false); setEditing(null); load();
  };
  const del = async (id: number) => { if (confirm('Delete?')) { await api.delete(`${endpoints.caseStudies}/${id}`); load(); } };
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Case Studies</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ title: '', problem: '', solution: '', result: '', techStack: '', imageUrl: '' }); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"><Plus size={18} /> Add</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {[['title', 'Title'], ['techStack', 'Tech Stack'], ['imageUrl', 'Image URL']].map(([f, l]) => <div key={f}><label className="block text-sm font-medium text-gray-700 mb-1">{l}</label><input required={f !== 'imageUrl'} value={(form as Record<string, string>)[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>)}
            {[['problem', 'Problem'], ['solution', 'Solution'], ['result', 'Result']].map(([f, l]) => <div key={f}><label className="block text-sm font-medium text-gray-700 mb-1">{l}</label><textarea required rows={3} value={(form as Record<string, string>)[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>)}
            <div className="flex gap-3"><button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Save</button><button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg">Cancel</button></div>
          </form>
        </div>
      )}
      <div className="space-y-4">
        {items.map(cs => (
          <div key={cs.id} className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-start">
            <div><p className="font-semibold text-gray-900">{cs.title}</p><p className="text-gray-500 text-sm mt-1">{cs.techStack}</p><p className="text-gray-700 text-sm mt-2">{cs.result}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(cs); setForm({ title: cs.title, problem: cs.problem, solution: cs.solution, result: cs.result, techStack: cs.techStack, imageUrl: cs.imageUrl || '' }); setShowForm(true); }} className="text-blue-600 hover:text-blue-800"><Pencil size={16} /></button>
              <button onClick={() => del(cs.id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
