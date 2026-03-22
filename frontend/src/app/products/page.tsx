'use client';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Product } from '@/types';
import api, { endpoints } from '@/lib/api';
import { ExternalLink, Github } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(endpoints.products).then(r => setProducts(r.data)).catch(() => setProducts([])).finally(() => setLoading(false));
  }, []);

  const fallback: Product[] = [
    { id: 1, name: 'SaaS Starter Kit', description: 'A complete SaaS starter kit with multi-tenancy, billing, and admin.', techStack: 'Next.js, ASP.NET Core, SQL Server, Stripe', liveUrl: '#', githubUrl: '#', createdDate: new Date().toISOString() },
    { id: 2, name: 'Invoice Manager', description: 'Automated invoicing and payment tracking for freelancers.', techStack: 'React, Node.js, PostgreSQL', liveUrl: '#', createdDate: new Date().toISOString() },
  ];

  const displayProducts = products.length > 0 ? products : fallback;

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">SaaS Products</h1>
            <p className="text-gray-600 text-lg">Products I&apos;ve built and shipped.</p>
          </div>
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProducts.map((p) => (
                <div key={p.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    {p.imageUrl ? <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" /> : <span className="text-4xl">🚀</span>}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{p.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.techStack.split(',').map(t => (
                        <span key={t.trim()} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{t.trim()}</span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 text-sm hover:underline"><ExternalLink size={14} /> Live</a>}
                      {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-700 text-sm hover:underline"><Github size={14} /> GitHub</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
