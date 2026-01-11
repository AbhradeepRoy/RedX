import React, { useState } from 'react';
import { Eye, EyeOff, Droplet } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface RegisterProps {
  onRegister: (email: string) => void;
}

export const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onRegister(email);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-brand-900/10 dark:shadow-none overflow-hidden border border-gray-100 dark:border-slate-800">
          <div className="bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-10 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-10 -translate-y-10 blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/10 rounded-full translate-x-10 translate-y-10 blur-xl"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm mb-4">
                <Droplet className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">{t('welcome')}</h2>
              <p className="text-brand-100 mt-2 text-lg">{t('tagline')}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="px-8 py-10 space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">{t('email')}</label>
              <input
                type="email"
                required
                className="block w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 text-gray-900 dark:text-white transition-all outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">{t('password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 text-gray-900 dark:text-white transition-all outline-none pr-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400 hover:text-brand-600 transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-500/30 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('createAccount')}
            </button>
            
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
               <a href="#" className="text-brand-600 dark:text-brand-400 hover:underline">{t('terms')}</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};