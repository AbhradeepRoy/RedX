import React, { useState } from 'react';
import { BLOOD_GROUPS, MEDICAL_CONDITIONS, UserProfile } from '../types';
import { useApp } from '../contexts/AppContext';

interface ProfileSetupProps {
  email: string;
  onComplete: (profile: Partial<UserProfile>) => void;
  initialData?: Partial<UserProfile>;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ email, onComplete, initialData }) => {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    address: initialData?.address || '',
    dob: initialData?.dob || '',
    bloodGroup: initialData?.bloodGroup || '',
    contactNumber: initialData?.contactNumber || '',
    otherMedicalCondition: initialData?.otherMedicalCondition || '',
  });

  const [selectedConditions, setSelectedConditions] = useState<string[]>(initialData?.medicalConditions || []);

  const handleConditionToggle = (condition: string) => {
    setSelectedConditions(prev => 
      prev.includes(condition) 
        ? prev.filter(c => c !== condition) 
        : [...prev, condition]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      ...formData,
      email,
      medicalConditions: selectedConditions,
    });
  };

  const isEditing = !!initialData?.name;

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden animate-fade-in-up border border-gray-100 dark:border-slate-800">
      <div className="bg-gray-900 dark:bg-slate-950 px-8 py-6">
        <h2 className="text-xl font-bold text-white">{isEditing ? t('editProfile') : t('completeProfile')}</h2>
        <p className="text-gray-400 mt-1">{t('needDetails')}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('fullName')}</label>
            <input
              required
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 text-gray-900 dark:text-white"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('dob')}</label>
            <input
              required
              type="date"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 text-gray-900 dark:text-white"
              value={formData.dob}
              onChange={e => setFormData({...formData, dob: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('address')}</label>
          <textarea
            required
            rows={2}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 text-gray-900 dark:text-white"
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contact')}</label>
            <input
              required
              type="tel"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 text-gray-900 dark:text-white"
              value={formData.contactNumber}
              onChange={e => setFormData({...formData, contactNumber: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('bloodGroup')}</label>
            <select
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 text-gray-900 dark:text-white"
              value={formData.bloodGroup}
              onChange={e => setFormData({...formData, bloodGroup: e.target.value})}
            >
              <option value="">Select Group</option>
              {BLOOD_GROUPS.map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('medicalConditions')}</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {MEDICAL_CONDITIONS.map(condition => (
              <label key={condition} className="flex items-center space-x-2 p-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-brand-600 focus:ring-brand-500 bg-gray-100 dark:bg-slate-800 border-gray-300 dark:border-slate-600"
                  checked={selectedConditions.includes(condition)}
                  onChange={() => handleConditionToggle(condition)}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{condition}</span>
              </label>
            ))}
            <label className="flex items-center space-x-2 p-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer">
              <input
                type="checkbox"
                className="rounded text-brand-600 focus:ring-brand-500 bg-gray-100 dark:bg-slate-800 border-gray-300 dark:border-slate-600"
                checked={selectedConditions.includes('Others')}
                onChange={() => handleConditionToggle('Others')}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Others</span>
            </label>
          </div>
        </div>

        {selectedConditions.includes('Others') && (
           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('specifyOther')}</label>
             <input
               type="text"
               className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 text-gray-900 dark:text-white"
               value={formData.otherMedicalCondition}
               onChange={e => setFormData({...formData, otherMedicalCondition: e.target.value})}
               placeholder="Please specify..."
             />
           </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none transition-colors"
        >
          {isEditing ? t('updateProfile') : t('saveVerify')}
        </button>
      </form>
    </div>
  );
};