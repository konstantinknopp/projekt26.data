import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-8">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * {
          font-family: 'DM Sans', sans-serif;
        }
        
        .mono {
          font-family: 'JetBrains Mono', monospace;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }
      `}</style>

            <div className="w-full max-w-md">
                {/* Logo/Title */}
                <div className="text-center mb-12 animate-slide-up">
                    <div className="w-16 h-16 bg-black mx-auto mb-6"></div>
                    <h1 className="text-4xl font-bold text-black mb-2">
                        Data Migration Tool
                    </h1>
                    <p className="text-sm text-gray-500 uppercase tracking-widest">
                        Login
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                E-Mail
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <Mail size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-3 border-2 border-black bg-white text-black placeholder-gray-400 font-medium mono text-sm focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                Passwort
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3 border-2 border-black bg-white text-black placeholder-gray-400 font-medium mono text-sm focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 border-2 border-black bg-white checked:bg-black transition-colors cursor-pointer"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-600 group-hover:text-black transition-colors">
                  Angemeldet bleiben
                </span>
                            </label>
                            <a href="#" className="text-sm font-bold text-black hover:underline">
                                Passwort vergessen?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full px-6 py-4 bg-black text-white font-bold text-base uppercase tracking-wider transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2"
                        >
                            Anmelden
                        </button>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium uppercase tracking-wider">
                  Oder
                </span>
                            </div>
                        </div>

                        {/* Register Link */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-4">
                                Noch kein Konto?
                            </p>
                            <a
                                href="#"
                                className="inline-block px-6 py-3 border-2 border-black bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                            >
                                Registrieren
                            </a>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-xs text-gray-400 uppercase tracking-wider">
                    © 2026 Data Migration Tool
                </div>
            </div>
        </div>
    );
}