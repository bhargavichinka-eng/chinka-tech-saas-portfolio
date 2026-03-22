'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-500 mt-2">Chinka Tech Portfolio</p>
        </div>
        {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="admin@chinkatech.com" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
