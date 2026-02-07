import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(formData.email, formData.password);

        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.message || 'Login failed');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
            <Head>
                <title>Login - AgriPredict360</title>
            </Head>

            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 -top-48 -left-48 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute w-64 h-64 top-1/2 left-1/4 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-20 text-6xl animate-bounce" style={{ animationDuration: '3s' }}>🌾</div>
                <div className="absolute top-40 right-32 text-5xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🌻</div>
                <div className="absolute bottom-32 left-1/4 text-4xl animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>🌱</div>
                <div className="absolute bottom-40 right-1/4 text-5xl animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>🚜</div>
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 text-white">
                            <span className="text-4xl">🌾</span>
                            <span className="text-3xl font-bold">AgriPredict360</span>
                        </div>
                        <p className="text-green-200 mt-2">AI-Powered Smart Farming</p>
                    </div>

                    {/* Login Card */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
                        <h2 className="text-2xl font-bold text-white text-center mb-6">Welcome Back!</h2>

                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4 text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-green-100 text-sm font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-green-200/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                                    placeholder="farmer@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-green-100 text-sm font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-green-200/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center text-green-100">
                                    <input type="checkbox" className="mr-2 rounded border-white/30 bg-white/10" />
                                    Remember me
                                </label>
                                <a href="#" className="text-green-300 hover:text-white transition-colors">Forgot password?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Signing in...
                                    </>
                                ) : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <span className="text-green-200">Don't have an account? </span>
                            <Link href="/signup" className="text-green-300 hover:text-white font-semibold transition-colors">
                                Sign up
                            </Link>
                        </div>

                        {/* Social Login */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/20"></div></div>
                                <div className="relative flex justify-center text-sm"><span className="px-4 bg-transparent text-green-200">Or continue with</span></div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                    Google
                                </button>
                                <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all">
                                    📱 Phone OTP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
