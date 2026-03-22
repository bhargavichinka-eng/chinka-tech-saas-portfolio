'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { BarChart3, BookOpen, Box, Briefcase, Calendar, LogOut, Mail, MessageSquare, Star, Upload } from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
  { href: '/admin/products', label: 'Products', icon: <Box size={18} /> },
  { href: '/admin/case-studies', label: 'Case Studies', icon: <Briefcase size={18} /> },
  { href: '/admin/blog', label: 'Blog Posts', icon: <BookOpen size={18} /> },
  { href: '/admin/testimonials', label: 'Testimonials', icon: <Star size={18} /> },
  { href: '/admin/leads', label: 'Leads', icon: <Mail size={18} /> },
  { href: '/admin/contacts', label: 'Contacts', icon: <MessageSquare size={18} /> },
  { href: '/admin/bookings', label: 'Bookings', icon: <Calendar size={18} /> },
  { href: '/admin/upload', label: 'Upload', icon: <Upload size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router, pathname]);

  if (pathname === '/admin/login') return <>{children}</>;

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-blue-400">Chinka Tech</h1>
          <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${pathname === item.href ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={logout} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
