'use client';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CaseStudy } from '@/types';
import api, { endpoints } from '@/lib/api';

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(endpoints.caseStudies).then(r => setCaseStudies(r.data)).catch(() => setCaseStudies([])).finally(() => setLoading(false));
  }, []);

  const fallback: CaseStudy[] = [
    { id: 1, title: 'E-Commerce Platform Migration', problem: 'Client had a legacy PHP monolith causing slow performance.', solution: 'Migrated to Next.js frontend with ASP.NET Core microservices.', result: '60% faster page loads, 40% increase in conversions.', techStack: 'Next.js, ASP.NET Core, Azure', createdDate: new Date().toISOString() },
    { id: 2, title: 'Multi-tenant SaaS Dashboard', problem: 'Client needed isolated data per tenant with shared infrastructure.', solution: 'Implemented schema-based multi-tenancy with EF Core.', result: 'Onboarded 50+ tenants with zero data leakage.', techStack: 'ASP.NET Core, SQL Server, Azure', createdDate: new Date().toISOString() },
  ];

  const display = caseStudies.length > 0 ? caseStudies : fallback;

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Case Studies</h1>
            <p className="text-gray-600 text-lg">Real problems solved with measurable results.</p>
          </div>
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <div className="space-y-12">
              {display.map((cs, i) => (
                <div key={cs.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="h-64 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center text-6xl">
                    {cs.imageUrl ? <img src={cs.imageUrl} alt={cs.title} className="h-full w-full object-cover rounded-2xl" /> : '💡'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{cs.title}</h2>
                    <div className="space-y-4">
                      <div className="bg-red-50 p-4 rounded-lg"><p className="font-semibold text-red-800 text-sm uppercase mb-1">Problem</p><p className="text-gray-700">{cs.problem}</p></div>
                      <div className="bg-blue-50 p-4 rounded-lg"><p className="font-semibold text-blue-800 text-sm uppercase mb-1">Solution</p><p className="text-gray-700">{cs.solution}</p></div>
                      <div className="bg-green-50 p-4 rounded-lg"><p className="font-semibold text-green-800 text-sm uppercase mb-1">Result</p><p className="text-gray-700">{cs.result}</p></div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {cs.techStack.split(',').map(t => <span key={t.trim()} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{t.trim()}</span>)}
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
