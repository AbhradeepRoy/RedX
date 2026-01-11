import React from 'react';
import { UserProfile } from '../types';
import { Activity, Clock, Droplet, AlertCircle, CheckCircle, MapPin } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface DashboardViewProps {
  user: UserProfile;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ user }) => {
  const { t } = useApp();
  const isDonor = user.role === 'donor';
  
  // Mock Data
  const requests = [
    { id: 1, type: 'Emergency', bloodGroup: user.bloodGroup, location: 'General Hospital', time: '10 mins ago', distance: '2.5 km' },
    { id: 2, type: 'Scheduled', bloodGroup: user.bloodGroup, location: 'Red Cross Center', time: '2 hours ago', distance: '5 km' },
  ];

  const activities = [
    { id: 1, action: isDonor ? 'Donated Blood' : 'Dispatched Unit', date: '12 Oct 2023', detail: 'Successful' },
    { id: 2, action: 'Profile Verified', date: '10 Oct 2023', detail: 'Approved' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors">
        <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back, {user.name}</h2>
            <div className="flex items-center gap-2 mt-1 text-gray-500 dark:text-gray-400">
                <span className="capitalize font-medium bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded text-sm">{user.role}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-sm"><MapPin className="w-3 h-3" /> {user.address}</span>
            </div>
        </div>
        {user.bloodGroup && (
            <div className="bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg border border-red-100 dark:border-red-900/30 text-center">
                <span className="block text-xs text-red-600 dark:text-red-400 font-bold uppercase tracking-wider">{t('bloodGroup')}</span>
                <span className="text-2xl font-black text-red-700 dark:text-red-500">{user.bloodGroup}</span>
            </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-50 dark:bg-brand-900/10 p-6 rounded-xl border border-brand-100 dark:border-brand-900/20 flex items-center justify-between">
            <div>
                <p className="text-brand-600 dark:text-brand-400 font-medium text-sm">{isDonor ? t('livesImpacted') : t('unitsAvailable')}</p>
                <h3 className="text-3xl font-bold text-brand-900 dark:text-brand-100">{isDonor ? '3' : '142'}</h3>
            </div>
            <Activity className="h-10 w-10 text-brand-500 opacity-50" />
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/20 flex items-center justify-between">
            <div>
                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">{isDonor ? t('lastDonation') : t('pendingRequests')}</p>
                <h3 className="text-3xl font-bold text-blue-900 dark:text-blue-100">{isDonor ? '3 Months ago' : '5'}</h3>
            </div>
            <Clock className="h-10 w-10 text-blue-500 opacity-50" />
        </div>
        <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-100 dark:border-green-900/20 flex items-center justify-between">
            <div>
                <p className="text-green-600 dark:text-green-400 font-medium text-sm">{t('status')}</p>
                <h3 className="text-xl font-bold text-green-900 dark:text-green-100">{t('active')}</h3>
            </div>
            <CheckCircle className="h-10 w-10 text-green-500 opacity-50" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Requests Section */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{t('incoming')}</h3>
                <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs px-2 py-1 rounded-full animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Live
                </span>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-slate-800">
                {requests.map(req => (
                    <div key={req.id} className="p-6 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                                <div className={`p-3 rounded-lg ${req.type === 'Emergency' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                                    {req.type === 'Emergency' ? <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" /> : <Droplet className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-gray-900 dark:text-white">{req.bloodGroup} Request</h4>
                                        {req.type === 'Emergency' && <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-bold tracking-wider">URGENT</span>}
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{req.location} • {req.distance}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{req.time}</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                                {t('view')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Profile Summary / Recent Activity */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden h-fit">
             <div className="p-6 border-b border-gray-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{t('recentActivity')}</h3>
            </div>
            <div className="p-6">
                <div className="space-y-6">
                    {activities.map((act, i) => (
                        <div key={i} className="flex gap-4 relative">
                            {/* Timeline line */}
                            {i !== activities.length - 1 && <div className="absolute left-2.5 top-8 bottom-0 w-0.5 bg-gray-100 dark:bg-slate-700 -mb-6"></div>}
                            
                            <div className="h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-900/30 border-2 border-brand-500 flex-shrink-0 z-10 mt-1"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{act.action}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{act.date} • {act.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};