'use client';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import api, { endpoints } from '@/lib/api';

export default function BookACallPage() {
  const [form, setForm] = useState({ name: '', email: '', bookingDate: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post(endpoints.bookings, { ...form, bookingDate: new Date(form.bookingDate).toISOString() });
      setStatus('success');
      setForm({ name: '', email: '', bookingDate: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Book a Call</h1>
          <p className="text-gray-600 mb-10">Schedule a free 30-minute discovery call to discuss your project.</p>
          {status === 'success' && <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg mb-6">✓ Booking confirmed! I&apos;ll send a calendar invite shortly.</div>}
          {status === 'error' && <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg mb-6">✗ Failed to book. Please try again.</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label><input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date & Time</label><input type="datetime-local" required value={form.bookingDate} onChange={e => setForm({ ...form, bookingDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">What do you want to discuss?</label><textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
            <button type="submit" disabled={status === 'loading'} className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50">
              {status === 'loading' ? 'Booking...' : 'Book Call'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
