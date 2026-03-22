'use client';
import { useEffect, useState } from 'react';
import { DashboardStats } from '@/types';
import api, { endpoints } from '@/lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    api.get(endpoints.dashboard).then(r => setStats(r.data)).catch(() => {});
  }, []);

  const cards = stats ? [
    { label: 'Products', value: stats.products, color: 'bg-blue-500' },
    { label: 'Case Studies', value: stats.caseStudies, color: 'bg-purple-500' },
    { label: 'Blog Posts', value: stats.blogPosts, color: 'bg-green-500' },
    { label: 'Published Posts', value: stats.publishedPosts, color: 'bg-teal-500' },
    { label: 'Leads', value: stats.leads, color: 'bg-yellow-500' },
    { label: 'Contacts', value: stats.contacts, color: 'bg-orange-500' },
    { label: 'Testimonials', value: stats.testimonials, color: 'bg-pink-500' },
    { label: 'Bookings', value: stats.bookings, color: 'bg-indigo-500' },
  ] : [];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      {!stats ? (
        <div className="text-gray-500">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(card => (
            <div key={card.label} className="bg-white rounded-xl shadow-sm p-6">
              <div className={`w-12 h-12 ${card.color} rounded-lg mb-4`} />
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              <p className="text-gray-500 text-sm mt-1">{card.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
