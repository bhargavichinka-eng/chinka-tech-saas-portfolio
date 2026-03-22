'use client';
import { useEffect, useState } from 'react';
import { Booking } from '@/types';
import api, { endpoints } from '@/lib/api';
import { Trash2 } from 'lucide-react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const load = () => api.get(endpoints.bookings).then(r => setBookings(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const del = async (id: number) => { if (confirm('Delete?')) { await api.delete(`${endpoints.bookings}/${id}`); load(); } };
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Bookings</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50"><tr>{['Name', 'Email', 'Booking Date', 'Message', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left font-medium text-gray-700">{h}</th>)}</tr></thead>
          <tbody className="divide-y">
            {bookings.map(b => (
              <tr key={b.id}>
                <td className="px-4 py-3 font-medium">{b.name}</td>
                <td className="px-4 py-3">{b.email}</td>
                <td className="px-4 py-3">{new Date(b.bookingDate).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{b.message || '-'}</td>
                <td className="px-4 py-3"><button onClick={() => del(b.id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && <div className="text-center text-gray-500 py-8">No bookings yet</div>}
      </div>
    </div>
  );
}
