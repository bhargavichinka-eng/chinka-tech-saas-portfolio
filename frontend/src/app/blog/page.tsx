'use client';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BlogPost } from '@/types';
import api, { endpoints } from '@/lib/api';
import Link from 'next/link';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`${endpoints.blog}?published=true`).then(r => setPosts(r.data)).catch(() => setPosts([])).finally(() => setLoading(false));
  }, []);

  const fallback: BlogPost[] = [
    { id: 1, title: 'Building Multi-Tenant SaaS with ASP.NET Core', slug: 'building-multi-tenant-saas-aspnet-core', content: '', tags: 'SaaS,ASP.NET Core,Multi-Tenancy', publishedDate: new Date().toISOString(), isPublished: true },
    { id: 2, title: 'Integrating Stripe Payments in Next.js', slug: 'stripe-payments-nextjs', content: '', tags: 'Stripe,Next.js,Payments', publishedDate: new Date().toISOString(), isPublished: true },
  ];

  const display = posts.length > 0 ? posts : fallback;

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-gray-600 text-lg">Insights on SaaS development, architecture, and best practices.</p>
          </div>
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {display.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow block">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-4xl">📝</div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.split(',').map(t => <span key={t.trim()} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{t.trim()}</span>)}
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h2>
                    <p className="text-gray-500 text-sm">{new Date(post.publishedDate).toLocaleDateString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
