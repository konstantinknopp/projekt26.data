import React, { useState } from 'react';
import { User, Mail, Lock, Building, Eye, EyeOff, Check } from 'lucide-react';

export default function RegistrationPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });

    const updateField = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <div className="min-h-screen bg-white p-8">
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

            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-slide-up">
                    <div className="w-16 h-16 bg-black mx-auto mb-6"></div>
                    <h1 className="text-4xl font-bold text-black mb-2">
                        Konto erstellen
                    </h1>
                    <p className="text-sm text-gray-500 uppercase tracking-widest">
                        Registrierung
                    </p>
                </div>

                {/* Registration Form */}
                <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                    Vorname *
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <User size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        placeholder="Max"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-black bg-white text-black placeholder-gray-400 font-medium mono text-sm focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                    Nachname *
                                </label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => updateField('lastName', e.target.value)}
                                    placeholder="Mustermann"
                                    className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-gray-400 font-medium mono text-sm focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                E-Mail *
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <Mail size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-3 border-2 border-black bg-white text-black placeholder-gray-400 font-medium mono text-sm focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Company Field */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                Unternehmen (optional)
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <Building size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => updateField('company', e.target.value)}
                                    placeholder="Firma GmbH"
                                    className="w-full pl-12 pr-4 py-3 border-2 border-black bg-white text-black placeholder-gray-400 font-medium mono text-sm focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                    Passwort *
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <Lock size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => updateField('password', e.target.value)}
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

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                    Passwort bestätigen *
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={(e) => updateField('confirmPassword', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 pr-12 py-3 border-2 border-black bg-white text-black placeholder-gray-400 font-medium mono text-sm focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-gray-50 border-2 border-gray-200 p-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                                Passwort-Anforderungen
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Check size={16} className={formData.password.length >= 8 ? "text-black" : "text-gray-300"} strokeWidth={3} />
                                    <span className={formData.password.length >= 8 ? "text-black font-medium" : "text-gray-400"}>
                    Mindestens 8 Zeichen
                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Check size={16} className={/[A-Z]/.test(formData.password) ? "text-black" : "text-gray-300"} strokeWidth={3} />
                                    <span className={/[A-Z]/.test(formData.password) ? "text-black font-medium" : "text-gray-400"}>
                    Ein Großbuchstabe
                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Check size={16} className={/[0-9]/.test(formData.password) ? "text-black" : "text-gray-300"} strokeWidth={3} />
                                    <span className={/[0-9]/.test(formData.password) ? "text-black font-medium" : "text-gray-400"}>
                    Eine Zahl
                  </span>
                                </div>
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="border-t-2 border-gray-200 pt-6">
                            <label className="flex items-start cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.acceptTerms}
                                    onChange={(e) => updateField('acceptTerms', e.target.checked)}
                                    className="w-5 h-5 mt-0.5 border-2 border-black bg-white checked:bg-black transition-colors cursor-pointer flex-shrink-0"
                                />
                                <span className="ml-3 text-sm text-gray-600 group-hover:text-black transition-colors">
                  Ich akzeptiere die{' '}
                                    <a href="#" className="font-bold text-black hover:underline">
                    Nutzungsbedingungen
                  </a>{' '}
                                    und{' '}
                                    <a href="#" className="font-bold text-black hover:underline">
                    Datenschutzerklärung
                  </a>
                </span>
                            </label>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={!formData.acceptTerms}
                            className="w-full px-6 py-4 bg-black text-white font-bold text-base uppercase tracking-wider transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                        >
                            Konto erstellen
                        </button>

                        {/* Login Link */}
                        <div className="text-center pt-4">
                            <p className="text-sm text-gray-600">
                                Bereits registriert?{' '}
                                <a href="#" className="font-bold text-black hover:underline">
                                    Jetzt anmelden
                                </a>
                            </p>
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