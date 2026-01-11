import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { Heart, Users, Building2, ChevronLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface RoleSelectionProps {
  onRoleComplete: (roleData: Partial<UserProfile>) => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleComplete }) => {
  const { t } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  
  // Additional form state
  const [medicalHistory, setMedicalHistory] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [neededDate, setNeededDate] = useState('');
  const [hospitalDetails, setHospitalDetails] = useState({ name: '', undertaken: '' });

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    onRoleComplete({
      role: selectedRole,
      medicalConditions: [], 
      aadhar,
      isEmergency,
      neededDate,
      hospitalName: hospitalDetails.name,
      undertakenBy: hospitalDetails.undertaken
    });
  };

  if (!selectedRole) {
    return (
      <div className="max-w-5xl mx-auto py-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{t('chooseRole')}</h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">{t('roleDesc')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {[
            { id: 'donor', icon: Heart, title: t('donor'), desc: t('donorDesc'), color: 'text-brand-500', bg: 'hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20' },
            { id: 'recipient', icon: Users, title: t('recipient'), desc: t('recipientDesc'), color: 'text-blue-500', bg: 'hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20' },
            { id: 'hospital', icon: Building2, title: t('hospital'), desc: t('hospitalDesc'), color: 'text-green-500', bg: 'hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20' }
          ].map((role, idx) => (
            <button 
              key={role.id}
              onClick={() => setSelectedRole(role.id as UserRole)}
              className={`group flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border-2 border-transparent dark:border-slate-800 transition-all duration-300 transform hover:-translate-y-2 ${role.bg}`}
              style={{ animation: `fadeInUp 0.6s ease-out forwards ${idx * 150}ms`, opacity: 0 }}
            >
              <div className={`p-4 rounded-2xl bg-gray-50 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors mb-6 shadow-sm group-hover:shadow-md`}>
                <role.icon className={`w-12 h-12 ${role.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white">{role.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mt-3 text-sm leading-relaxed">{role.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <button 
        onClick={() => setSelectedRole(null)} 
        className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-6 transition-colors group"
      >
        <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
        {t('back')}
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-gray-200/60 dark:shadow-none overflow-hidden border border-gray-100 dark:border-slate-800">
        <div className="bg-gray-50 dark:bg-slate-800 px-8 py-6 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Complete Profile: <span className="text-brand-600 dark:text-brand-400">{selectedRole.toUpperCase()}</span></h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('needDetails')}</p>
        </div>

        <form onSubmit={handleFinalSubmit} className="px-8 py-8 space-y-6">
          {selectedRole === 'donor' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 mb-1">Aadhar ID Number</label>
                <input 
                  required 
                  type="text" 
                  value={aadhar} 
                  onChange={e => setAadhar(e.target.value)} 
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-gray-900 dark:text-white transition-all outline-none" 
                  placeholder="XXXX-XXXX-XXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 mb-1">Detailed Medical History</label>
                <textarea 
                  rows={4} 
                  value={medicalHistory} 
                  onChange={e => setMedicalHistory(e.target.value)} 
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-gray-900 dark:text-white transition-all outline-none" 
                  placeholder="Any recent surgeries, tattoos, foreign travel, etc." 
                />
              </div>
            </div>
          )}

          {selectedRole === 'recipient' && (
            <div className="space-y-6 animate-fade-in">
               <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                 <label className="block text-sm font-bold text-blue-900 dark:text-blue-300 mb-3">Requirement Urgency</label>
                 <div className="flex flex-col sm:flex-row gap-4">
                   <label className="flex items-center p-3 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 rounded-xl cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex-1">
                     <input 
                      type="radio" 
                      name="urgency" 
                      checked={isEmergency} 
                      onChange={() => setIsEmergency(true)} 
                      className="text-red-600 focus:ring-red-500 h-5 w-5"
                    />
                     <span className="font-bold text-red-700 dark:text-red-400 ml-3">{t('emergency')}</span>
                   </label>
                   <label className="flex items-center p-3 border border-blue-200 dark:border-blue-900/50 bg-white dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors flex-1">
                     <input 
                      type="radio" 
                      name="urgency" 
                      checked={!isEmergency} 
                      onChange={() => setIsEmergency(false)} 
                      className="text-blue-600 focus:ring-blue-500 h-5 w-5"
                     />
                     <span className="font-medium text-gray-700 dark:text-gray-300 ml-3">{t('scheduled')}</span>
                   </label>
                 </div>
               </div>

               {!isEmergency && (
                 <div className="animate-fade-in">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 mb-1">Needed Date & Time</label>
                    <input 
                      required 
                      type="datetime-local" 
                      value={neededDate} 
                      onChange={e => setNeededDate(e.target.value)} 
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-gray-900 dark:text-white transition-all outline-none" 
                    />
                 </div>
               )}

               <div>
                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 mb-1">Reference Prescription Upload</label>
                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-slate-700 border-dashed rounded-xl hover:border-brand-400 hover:bg-brand-50/30 dark:hover:bg-brand-900/10 transition-all">
                   <div className="space-y-1 text-center">
                     <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                       <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                     <div className="flex text-sm text-gray-600 dark:text-gray-400">
                       <label className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-brand-600 dark:text-brand-400 hover:text-brand-500 focus-within:outline-none">
                         <span>Upload a file</span>
                         <input type="file" required className="sr-only" />
                       </label>
                       <p className="pl-1">or drag and drop</p>
                     </div>
                     <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, PDF up to 10MB</p>
                   </div>
                 </div>
               </div>
            </div>
          )}

          {(selectedRole === 'hospital' || selectedRole === 'bloodbank') && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 mb-1">Institution Name</label>
                <input 
                  required 
                  type="text" 
                  value={hospitalDetails.name} 
                  onChange={e => setHospitalDetails({...hospitalDetails, name: e.target.value})} 
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-gray-900 dark:text-white transition-all outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 mb-1">Undertaken By</label>
                <input 
                  required 
                  type="text" 
                  value={hospitalDetails.undertaken} 
                  onChange={e => setHospitalDetails({...hospitalDetails, undertaken: e.target.value})} 
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-gray-900 dark:text-white transition-all outline-none" 
                  placeholder="Govt, Private, Trust, etc." 
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white transition-all transform hover:-translate-y-1 hover:shadow-xl ${
              isEmergency 
              ? 'bg-red-600 hover:bg-red-700 shadow-red-500/30' 
              : 'bg-brand-600 hover:bg-brand-700 shadow-brand-500/30'
            }`}
          >
            {selectedRole === 'recipient' && isEmergency ? '🚨 ' + t('emergency') : t('completeSetup')}
          </button>
        </form>
      </div>
    </div>
  );
};