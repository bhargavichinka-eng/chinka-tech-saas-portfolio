'use client';
import { useEffect, useState } from 'react';
import { Lead } from '@/types';
import api, { endpoints } from '@/lib/api';
import { Trash2 } from 'lucide-react';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const load = () => api.get(endpoints.leads).then(r => setLeads(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const del = async (id: number) => { if (confirm('Delete?')) { await api.delete(`${endpoints.leads}/${id}`); load(); } };
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Leads</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50"><tr>{['Name', 'Email', 'Company', 'Budget', 'Date', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left font-medium text-gray-700">{h}</th>)}</tr></thead>
          <tbody className="divide-y">
            {leads.map(l => (
              <tr key={l.id}>
                <td className="px-4 py-3 font-medium">{l.name}</td>
                <td className="px-4 py-3">{l.email}</td>
                <td className="px-4 py-3">{l.company || '-'}</td>
                <td className="px-4 py-3">{l.budget || '-'}</td>
                <td className="px-4 py-3">{new Date(l.createdDate).toLocaleDateString()}</td>
                <td className="px-4 py-3"><button onClick={() => del(l.id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && <div className="text-center text-gray-500 py-8">No leads yet</div>}
      </div>
    </div>
  );
}
