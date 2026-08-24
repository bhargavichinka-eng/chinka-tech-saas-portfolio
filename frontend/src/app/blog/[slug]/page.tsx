import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BlogPost } from '@/types';

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Building Multi-Tenant SaaS with ASP.NET Core',
    slug: 'building-multi-tenant-saas-aspnet-core',
    content: 'In this post, we explore how to build a robust multi-tenant SaaS application using ASP.NET Core and Entity Framework Core. We cover shared infrastructure, isolated tenant data patterns, secure authentication flows, and deployment strategies that scale cleanly as your business grows.\n\nA good multi-tenant architecture starts with clear boundaries. Use a tenant identifier in every request, keep access rules explicit, and isolate resources by tenant wherever possible. For many teams, this means pairing a single app instance with a per-tenant database or a schema-based approach depending on compliance needs.\n\nWe also cover the importance of observability: logs, errors, tenant metrics, and audit trails. Without them, a growing SaaS platform becomes hard to support. The result is a system that can scale operationally while staying secure and predictable.',
    tags: 'SaaS,ASP.NET Core,Multi-Tenancy',
    publishedDate: '2026-08-01T00:00:00.000Z',
    isPublished: true,
  },
  {
    id: 2,
    title: 'Integrating Stripe Payments in Next.js',
    slug: 'stripe-payments-nextjs',
    content: 'A complete guide to integrating Stripe payment processing in your Next.js application. We cover customer checkout flows, subscription billing, secure webhooks, and how to keep your frontend and backend responsibilities properly separated.\n\nThe key to a reliable Stripe integration is webhook verification. Your frontend can handle the purchase experience, but the backend must be the source of truth for payment events. This reduces fraud risk and keeps your billing state consistent.\n\nWe also recommend centralizing subscription status, invoice events, and retries in your application layer so your product can respond to changes without brittle UI logic.',
    tags: 'Stripe,Next.js,Payments',
    publishedDate: '2026-08-05T00:00:00.000Z',
    isPublished: true,
  },
];

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20 max-w-3xl mx-auto px-4">
        <Link href="/blog" className="text-blue-600 text-sm hover:underline mb-4 inline-block">← Back to Blog</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex gap-2 flex-wrap mb-6">
          {post.tags.split(',').map((tag) => (
            <span key={tag.trim()} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{tag.trim()}</span>
          ))}
        </div>
        <p className="text-gray-500 text-sm mb-8">{new Date(post.publishedDate).toLocaleDateString()}</p>
        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{post.content}</div>
      </main>
      <Footer />
    </div>
  );
}
