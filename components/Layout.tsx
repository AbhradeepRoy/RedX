import React, { useState } from 'react';
import { User, HeartPulse, ChevronDown, LogOut, Sun, Moon, Globe, Phone, Edit } from 'lucide-react';
import { UserProfile } from '../types';
import { useApp, LANGUAGES } from '../contexts/AppContext';
import { Language } from '../translations';

interface LayoutProps {
  children: React.ReactNode;
  user: UserProfile | null;
  onLogout: () => void;
  onEditProfile: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onEditProfile }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const { isDarkMode, toggleTheme, language, setLanguage, t } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300">
      
      {/* Toll Free Banner */}
      <div className="bg-brand-700 dark:bg-brand-900 text-white text-xs sm:text-sm py-1.5 text-center font-bold tracking-wide flex justify-center items-center gap-2">
        <Phone className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
        {t('tollFree')}: 1800-123-4567
      </div>

      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-2 rounded-xl shadow-lg shadow-brand-200 dark:shadow-none">
                <HeartPulse className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white">RedX</span>
            </div>
            
            <div className="flex items-center gap-3">
              
              {/* Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => setShowLang(!showLang)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-colors flex items-center gap-1"
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase hidden sm:block">{language}</span>
                </button>
                
                {showLang && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 py-2 z-50 animate-pop-in border border-gray-100 dark:border-slate-800">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as Language);
                          setShowLang(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ${language === lang.code ? 'text-brand-600 font-bold bg-brand-50 dark:bg-slate-800' : 'text-gray-700 dark:text-gray-300'}`}
                      >
                        <span>{lang.native}</span>
                        <span className="text-xs text-gray-400 uppercase">{lang.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-colors"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* User Profile - Only show if name exists (post-registration) */}
              {user && user.name && (
                <div className="relative ml-2">
                  <button 
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-gray-200 dark:hover:border-slate-700"
                  >
                    <div className="w-9 h-9 bg-brand-50 dark:bg-brand-900/30 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:block">{user.name.split(' ')[0]}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} />
                  </button>

                  {showProfile && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl ring-1 ring-black ring-opacity-5 py-2 z-50 animate-pop-in origin-top-right border border-gray-100 dark:border-slate-800">
                      <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 rounded-t-2xl">
                        <p className="text-base font-bold text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      
                      <div className="px-6 py-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-gray-50 dark:bg-slate-800 p-2 rounded-lg">
                            <span className="block text-xs text-gray-400 uppercase font-bold">{t('profile')}</span>
                            <span className="font-medium text-brand-600 dark:text-brand-400 uppercase">{user.role || 'Pending'}</span>
                          </div>
                          <div className="bg-gray-50 dark:bg-slate-800 p-2 rounded-lg">
                            <span className="block text-xs text-gray-400 uppercase font-bold">{t('bloodGroup')}</span>
                            <span className="font-medium text-gray-900 dark:text-white">{user.bloodGroup}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-1 pt-2">
                          <p className="flex justify-between"><span className="text-gray-400">{t('contact')}</span> <span className="font-medium text-gray-800 dark:text-gray-200">{user.contactNumber}</span></p>
                          <p className="flex justify-between"><span className="text-gray-400">{t('address')}</span> <span className="font-medium text-gray-800 dark:text-gray-200">{user.address}</span></p>
                        </div>

                        {user.medicalConditions.length > 0 && (
                          <div className="pt-2">
                            <span className="text-xs font-semibold text-gray-400 uppercase block mb-2">{t('medicalConditions')}</span>
                            <div className="flex flex-wrap gap-1.5">
                              {user.medicalConditions.map(c => (
                                <span key={c} className="text-xs bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-900 px-2 py-1 rounded-full">{c}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-gray-100 dark:border-slate-800 p-2 space-y-1">
                        <button
                          onClick={() => {
                              setShowProfile(false);
                              onEditProfile();
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <Edit className="h-4 w-4" /> {t('editProfile')}
                        </button>

                        <button
                          onClick={onLogout}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl flex items-center gap-2 transition-colors"
                        >
                          <LogOut className="h-4 w-4" /> {t('signOut')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};