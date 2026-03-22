'use client';
import { useEffect, useState } from 'react';
import { ContactMessage } from '@/types';
import api, { endpoints } from '@/lib/api';
import { Trash2 } from 'lucide-react';

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const load = () => api.get(endpoints.contact).then(r => setMessages(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const del = async (id: number) => { if (confirm('Delete?')) { await api.delete(`${endpoints.contact}/${id}`); load(); } };
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Messages</h1>
      <div className="space-y-4">
        {messages.map(m => (
          <div key={m.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-2">
              <div><p className="font-semibold text-gray-900">{m.name} - {m.email}</p><p className="text-blue-600 font-medium">{m.subject}</p></div>
              <div className="flex items-center gap-3">
                <p className="text-gray-400 text-sm">{new Date(m.createdDate).toLocaleDateString()}</p>
                <button onClick={() => del(m.id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && <div className="text-center text-gray-500 py-8 bg-white rounded-xl">No messages yet</div>}
      </div>
    </div>
  );
}
