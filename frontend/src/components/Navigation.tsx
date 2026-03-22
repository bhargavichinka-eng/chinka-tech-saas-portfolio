'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/products', label: 'Products' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/book-a-call', label: 'Book a Call' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">Chinka Tech</Link>
          <div className="hidden md:flex space-x-6">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium">
                {l.label}
              </Link>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className="block text-gray-700 hover:text-blue-600 font-medium" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
