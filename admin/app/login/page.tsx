'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple authentication - in production, use proper backend auth
    if (username === 'admin' && password === 'admin123') {
      // Set auth token in localStorage
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminUser', username);
      
      // Redirect to admin dashboard
      router.push('/');
    } else {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#151515] via-[#202020] to-[#151515] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">
            KLYRO
          </h1>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#005E23] px-4 py-2">
            <Lock size={14} className="text-white" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Admin Login
            </span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-[#151515] mb-6">
            Sign in to continue
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-[#151515] mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-[#777777]" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#E5E5E5] rounded-xl focus:border-[#005E23] focus:outline-none transition-colors text-[#151515] font-medium"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#151515] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#777777]" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#E5E5E5] rounded-xl focus:border-[#005E23] focus:outline-none transition-colors text-[#151515] font-medium"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
                <p className="text-sm font-semibold text-red-600">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#005E23] hover:bg-[#004A1C] text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-[#F7F8F6] rounded-xl">
            <p className="text-xs font-semibold text-[#777777] mb-2">Demo Credentials:</p>
            <p className="text-xs text-[#151515]">
              <span className="font-bold">Username:</span> admin<br />
              <span className="font-bold">Password:</span> admin123
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#777777]">
            © 2024 KLYRO. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
