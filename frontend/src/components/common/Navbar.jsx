import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Disease AI', href: '/ai-tools/disease-detection' },
    { name: 'Yield AI', href: '/ai-tools/yield-prediction' },
    { name: 'Experts', href: '/community/experts' },
    { name: 'Forum', href: '/community/forum' },
    { name: 'Videos', href: '/learning/videos' },
    { name: 'Schemes', href: '/learning/schemes' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-3xl transform group-hover:rotate-12 transition-transform">🌾</span>
              <div className="flex flex-col">
                <span className="text-xl font-black text-green-700 leading-none tracking-tighter">AgriPredict</span>
                <span className="text-sm font-bold text-gray-500 leading-none">Smart Farming</span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${router.pathname === link.href
                    ? 'bg-green-600 text-white shadow-md shadow-green-200'
                    : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link href="/profile" className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-2xl transition-all">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold shadow-sm">
                    {user?.fullName?.[0] || 'U'}
                  </div>
                  <span className="text-sm font-bold text-gray-700">{user?.fullName?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-2xl transition-all">
                  Login
                </Link>
                <Link href="/signup" className="px-6 py-2.5 text-sm font-black text-white bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl hover:shadow-lg hover:shadow-green-200 transition-all transform hover:-translate-y-0.5">
                  Join Now
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-2xl text-green-700 hover:bg-green-50 transition-all"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-fadeIn">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 rounded-2xl text-base font-bold transition-all ${router.pathname === link.href
                    ? 'bg-green-600 text-white shadow-lg shadow-green-100'
                    : 'text-gray-600 hover:bg-green-50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
              {isAuthenticated ? (
                <>
                  <Link href="/profile" className="block px-4 py-3 rounded-2xl text-base font-bold text-gray-900 bg-gray-50" onClick={() => setIsOpen(false)}>My Profile</Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left px-4 py-3 rounded-2xl text-base font-bold text-red-600 bg-red-50">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-4 py-3 rounded-2xl text-base font-bold text-gray-900 bg-gray-50" onClick={() => setIsOpen(false)}>Login</Link>
                  <Link href="/signup" className="block px-4 py-3 rounded-2xl text-base font-black text-white bg-green-600 text-center shadow-lg" onClick={() => setIsOpen(false)}>Join Now</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
