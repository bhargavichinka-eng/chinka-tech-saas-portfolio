import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Chinka Tech - SaaS Development Expert',
  description: 'Expert SaaS, Web, and API development services. Specializing in Next.js, ASP.NET Core, Azure, and Stripe integrations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
