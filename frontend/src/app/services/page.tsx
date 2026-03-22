import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

const services = [
  { title: 'SaaS Application Development', desc: 'End-to-end SaaS platform development with multi-tenancy, billing, and analytics built in.', price: 'From $5,000' },
  { title: 'Web Application Development', desc: 'Modern, responsive web applications with Next.js, TypeScript, and Tailwind CSS.', price: 'From $2,000' },
  { title: 'Stripe Payment Integration', desc: 'Complete payment processing setup with subscriptions, webhooks, and billing portal.', price: 'From $800' },
  { title: 'Azure Cloud Deployment', desc: 'Full Azure infrastructure setup with App Service, SQL, Blob Storage, and CI/CD.', price: 'From $1,200' },
  { title: 'API Development', desc: 'Scalable RESTful APIs with ASP.NET Core, JWT authentication, and Swagger docs.', price: 'From $1,500' },
  { title: 'Database Design', desc: 'Optimized database schemas, EF Core migrations, and performance tuning.', price: 'From $600' },
  { title: 'Admin Dashboard Development', desc: 'Custom admin panels with role-based access, charts, and full CRUD operations.', price: 'From $1,000' },
  { title: 'Multi-tenant SaaS Architecture', desc: 'Design and implement schema-based or row-based multi-tenancy for your platform.', price: 'From $2,500' },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Services</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Expert development services tailored to your SaaS needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s) => (
              <div key={s.title} className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 mb-6">{s.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">{s.price}</span>
                  <Link href="/book-a-call" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
