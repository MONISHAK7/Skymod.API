'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/axios';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            toast.success('Login successful!');
            setTimeout(() => router.push('/dashboard'), 1500);
        } catch (err) {
            setError('Login failed! Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/images/real-estate-bg.jpg')" }} //Optional to add background
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-indigo-900/70 backdrop-blur-sm" />

            {/* Top-left back button */}
            <Link
                href="/"
                className="absolute top-5 left-5 z-20 px-4 py-2 text-sm text-white border border-white/40 rounded-lg backdrop-blur-md bg-white/10 hover:bg-white/20 transition"
            >
                ← Back to Home
            </Link>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 shadow-2xl text-white">
                <div className="flex justify-center mb-4">
                    <img src="/favicon.ico" className="h-12 w-12" alt="Skymod Logo" />
                </div>
                <h1 className="text-3xl font-bold text-center mb-6 text-white tracking-wide">
                    Welcome Back
                </h1>

                {error && (
                    <p className="text-red-300 text-sm text-center mb-4">{error}</p>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-semibold text-white transition bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md hover:from-indigo-700 hover:to-blue-600 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                    />
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
