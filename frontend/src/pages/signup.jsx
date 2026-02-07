import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const router = useRouter();
    const { register } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        username: '',
        state: '',
        district: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (step === 1) {
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }
            setStep(2);
            return;
        }

        setLoading(true);
        setError('');

        const result = await register({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            username: formData.username || formData.email.split('@')[0],
            location: {
                state: formData.state,
                district: formData.district
            }
        });

        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.message || 'Registration failed');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
            <Head>
                <title>Sign Up - AgriPredict360</title>
            </Head>

            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 -top-48 -right-48 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute w-64 h-64 top-1/3 right-1/4 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Floating Elements */}
                <div className="absolute top-16 right-20 text-6xl animate-bounce" style={{ animationDuration: '3s' }}>🌾</div>
                <div className="absolute top-32 left-24 text-5xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🌿</div>
                <div className="absolute bottom-24 right-1/4 text-4xl animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>🌽</div>
                <div className="absolute bottom-32 left-20 text-5xl animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>🍃</div>
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 text-white">
                            <span className="text-4xl">🌾</span>
                            <span className="text-3xl font-bold">AgriPredict360</span>
                        </div>
                        <p className="text-emerald-200 mt-2">Join the Smart Farming Revolution</p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center mb-6">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-green-500 text-white' : 'bg-white/20 text-white/50'}`}>1</div>
                        <div className={`w-16 h-1 ${step >= 2 ? 'bg-green-500' : 'bg-white/20'}`}></div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-green-500 text-white' : 'bg-white/20 text-white/50'}`}>2</div>
                    </div>

                    {/* Signup Card */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
                        <h2 className="text-2xl font-bold text-white text-center mb-2">
                            {step === 1 ? 'Create Your Account' : 'Complete Your Profile'}
                        </h2>
                        <p className="text-emerald-200 text-center text-sm mb-6">
                            {step === 1 ? 'Enter your basic details' : 'Tell us about your location'}
                        </p>

                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4 text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {step === 1 ? (
                                <>
                                    <div>
                                        <label className="block text-emerald-100 text-sm font-medium mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                            placeholder="राम कुमार"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-emerald-100 text-sm font-medium mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                            placeholder="farmer@example.com"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-emerald-100 text-sm font-medium mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                            placeholder="+91 98765 43210"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-emerald-100 text-sm font-medium mb-2">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-emerald-100 text-sm font-medium mb-2">Confirm</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-emerald-100 text-sm font-medium mb-2">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                            placeholder="ramkumar_farmer"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-emerald-100 text-sm font-medium mb-2">State</label>
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                            required
                                        >
                                            <option value="" className="bg-gray-800">Select State</option>
                                            <option value="Punjab" className="bg-gray-800">Punjab</option>
                                            <option value="Haryana" className="bg-gray-800">Haryana</option>
                                            <option value="Uttar Pradesh" className="bg-gray-800">Uttar Pradesh</option>
                                            <option value="Maharashtra" className="bg-gray-800">Maharashtra</option>
                                            <option value="Madhya Pradesh" className="bg-gray-800">Madhya Pradesh</option>
                                            <option value="Rajasthan" className="bg-gray-800">Rajasthan</option>
                                            <option value="Gujarat" className="bg-gray-800">Gujarat</option>
                                            <option value="Bihar" className="bg-gray-800">Bihar</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-emerald-100 text-sm font-medium mb-2">District</label>
                                        <input
                                            type="text"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                                            placeholder="Enter your district"
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex gap-3 pt-2">
                                {step === 2 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-3 px-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
                                    >
                                        ← Back
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all transform hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Creating...
                                        </>
                                    ) : step === 1 ? 'Continue →' : 'Create Account 🚀'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <span className="text-emerald-200">Already have an account? </span>
                            <Link href="/login" className="text-green-300 hover:text-white font-semibold transition-colors">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
