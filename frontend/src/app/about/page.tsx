import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Me</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-xl mb-8">
              I&apos;m a senior full-stack developer specializing in SaaS application development with 8+ years of experience building scalable, production-ready platforms.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Expertise</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Full-Stack SaaS Development</li>
                  <li>✓ ASP.NET Core Web API</li>
                  <li>✓ Next.js / React</li>
                  <li>✓ Azure Cloud Architecture</li>
                  <li>✓ Stripe Payment Integration</li>
                  <li>✓ Multi-tenant Architecture</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-purple-900 mb-3">Numbers</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>📦 20+ SaaS products shipped</li>
                  <li>⭐ 50+ happy clients</li>
                  <li>🚀 8+ years of experience</li>
                  <li>💳 10+ Stripe integrations</li>
                  <li>☁️ 15+ Azure deployments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
