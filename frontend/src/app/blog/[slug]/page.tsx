'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BlogPost } from '@/types';
import api, { endpoints } from '@/lib/api';
import Link from 'next/link';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    api.get(`${endpoints.blog}/${slug}`).then(r => setPost(r.data)).catch(() => setPost(null));
  }, [slug]);

  if (!post) return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20 max-w-3xl mx-auto px-4">
        <div className="text-center text-gray-500">Loading post...</div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20 max-w-3xl mx-auto px-4">
        <Link href="/blog" className="text-blue-600 text-sm hover:underline mb-4 inline-block">← Back to Blog</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex gap-2 flex-wrap mb-6">
          {post.tags.split(',').map(t => <span key={t.trim()} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{t.trim()}</span>)}
        </div>
        <p className="text-gray-500 text-sm mb-8">{new Date(post.publishedDate).toLocaleDateString()}</p>
        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{post.content}</div>
      </main>
      <Footer />
    </div>
  );
}
