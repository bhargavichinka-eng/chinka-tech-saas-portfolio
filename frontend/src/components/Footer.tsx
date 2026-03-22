import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-blue-400 mb-4">Chinka Tech</h3>
          <p className="text-gray-400 text-sm">Expert SaaS development services. Building scalable, production-ready applications.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {[['/', 'Home'], ['/services', 'Services'], ['/products', 'Products'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([href, label]) => (
              <li key={href}><Link href={href} className="hover:text-blue-400 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-gray-400 text-sm">hello@chinkatech.com</p>
          <Link href="/book-a-call" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            Book a Call
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Chinka Tech. All rights reserved.
      </div>
    </footer>
  );
}
