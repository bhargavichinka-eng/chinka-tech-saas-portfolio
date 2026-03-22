import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Code, Cloud, CreditCard, Database, Layout, Server, Shield, Zap } from 'lucide-react';

const services = [
  { icon: <Code size={32} />, title: 'SaaS Application Development', desc: 'End-to-end SaaS platforms with multi-tenancy, billing, and analytics.' },
  { icon: <Layout size={32} />, title: 'Web Application Development', desc: 'Modern, responsive web applications built with Next.js and React.' },
  { icon: <CreditCard size={32} />, title: 'Stripe Payment Integration', desc: 'Seamless payment processing, subscriptions, and billing management.' },
  { icon: <Cloud size={32} />, title: 'Azure Cloud Deployment', desc: 'Scalable Azure infrastructure with CI/CD pipelines and monitoring.' },
  { icon: <Server size={32} />, title: 'API Development', desc: 'Robust RESTful APIs with ASP.NET Core, JWT auth, and documentation.' },
  { icon: <Database size={32} />, title: 'Database Design', desc: 'Optimized SQL Server schemas with EF Core migrations and seed data.' },
  { icon: <Shield size={32} />, title: 'Admin Dashboard Development', desc: 'Feature-rich admin panels with CRUD operations and role-based access.' },
  { icon: <Zap size={32} />, title: 'Multi-tenant SaaS Architecture', desc: 'Isolated tenant data with shared infrastructure for maximum efficiency.' },
];

const techStack = [
  { name: 'React / Next.js', color: 'bg-blue-100 text-blue-800' },
  { name: 'ASP.NET Core', color: 'bg-purple-100 text-purple-800' },
  { name: 'SQL Server', color: 'bg-red-100 text-red-800' },
  { name: 'Microsoft Azure', color: 'bg-sky-100 text-sky-800' },
  { name: 'Stripe', color: 'bg-green-100 text-green-800' },
  { name: 'Docker', color: 'bg-blue-100 text-blue-800' },
  { name: 'GitHub Actions', color: 'bg-gray-100 text-gray-800' },
];

const process = [
  { step: '01', title: 'Discovery', desc: 'Understanding your requirements, goals, and technical constraints.' },
  { step: '02', title: 'Architecture', desc: 'Designing scalable, maintainable system architecture and data models.' },
  { step: '03', title: 'Development', desc: 'Agile development with regular demos and feedback iterations.' },
  { step: '04', title: 'Testing', desc: 'Comprehensive testing including unit, integration, and E2E tests.' },
  { step: '05', title: 'Deployment', desc: 'CI/CD pipeline setup with Azure deployment and monitoring.' },
  { step: '06', title: 'Support', desc: 'Post-launch support, maintenance, and feature enhancements.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block bg-blue-700/50 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Available for new projects
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Building SaaS Products
            <span className="text-blue-300 block">That Scale</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Expert full-stack SaaS development with Next.js, ASP.NET Core, and Azure. 
            From MVP to enterprise-grade platforms — delivered fast and built to last.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-a-call" className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center gap-2 justify-center">
              Book a Free Call <ArrowRight size={20} />
            </Link>
            <Link href="/products" className="border-2 border-blue-300 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-800 transition-colors">
              View My Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Comprehensive development services to bring your SaaS vision to life.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow group">
                <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">{s.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products placeholder */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SaaS Products</h2>
            <p className="text-gray-600 text-lg">Real products built and shipped.</p>
          </div>
          <div className="text-center">
            <Link href="/products" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies placeholder */}
      <section id="case-studies" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Case Studies</h2>
            <p className="text-gray-600 text-lg">Real problems solved with real results.</p>
          </div>
          <div className="text-center">
            <Link href="/case-studies" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
              View Case Studies <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech-stack" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tech Stack</h2>
            <p className="text-gray-600 text-lg">Modern, battle-tested technologies.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((t) => (
              <span key={t.name} className={`${t.color} px-6 py-3 rounded-full font-semibold text-lg`}>{t.name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'John Smith', company: 'TechStartup Inc', text: 'Outstanding work! Delivered a production-ready SaaS platform ahead of schedule.', rating: 5 },
              { name: 'Sarah Johnson', company: 'Digital Agency Co', text: 'Excellent ASP.NET Core expertise. Our API performance improved dramatically.', rating: 5 },
            ].map((t) => (
              <div key={t.name} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex mb-4">{Array.from({ length: t.rating }).map((_, i) => <span key={i} className="text-yellow-400 text-xl">★</span>)}</div>
                <p className="text-gray-700 italic mb-6">&quot;{t.text}&quot;</p>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-gray-600 text-sm">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Development Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((p) => (
              <div key={p.step} className="text-center">
                <div className="text-5xl font-bold text-blue-300 mb-4">{p.step}</div>
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-blue-200 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Build Your SaaS?</h2>
          <p className="text-gray-600 text-lg mb-10">Let&apos;s discuss your project and create a roadmap to success.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-a-call" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors">
              Book a Free Discovery Call
            </Link>
            <Link href="/contact" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors">
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <p className="text-gray-600 mb-8">Have a project in mind? I&apos;d love to hear about it.</p>
          <Link href="/contact" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Contact Me
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
