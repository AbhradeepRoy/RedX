import React, { useState } from 'react';
import { UserProfile, BLOOD_GROUPS, SearchResult } from '../types';
import { MOCK_RESULTS } from '../constants';
import { AlertTriangle, Search, CheckCircle, CreditCard, Banknote, MapPin, Phone, Hospital, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface RecipientDashboardProps {
  user: UserProfile;
}

type Step = 'input' | 'list' | 'requested' | 'received' | 'payment';

export const RecipientDashboard: React.FC<RecipientDashboardProps> = ({ user }) => {
  const { t } = useApp();
  const [isEmergency, setIsEmergency] = useState(user.isEmergency || false);
  const [wantedBloodGroup, setWantedBloodGroup] = useState('');
  const [step, setStep] = useState<Step>('input');
  const [selectedEntity, setSelectedEntity] = useState<SearchResult | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Cash' | null>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  // Filter logic
  const filteredResults = MOCK_RESULTS.filter(r => 
    wantedBloodGroup ? r.bloodGroup === wantedBloodGroup : true
  );

  const handleSendRequest = () => {
    if(isEmergency) {
      alert("🚨 EMERGENCY SIGNAL SENT! Donors and Hospitals in your area have been alerted via SMS and Email.");
    } else {
      alert(`Request sent to ${selectedEntity?.name}. They have been notified.`);
    }
    setStep('requested');
  };

  const handleBloodReceived = () => {
    setStep('received');
  };

  const handleProceedToPay = () => {
    setShowPaymentDetails(true);
    alert(`Payment details for ${selectedEntity?.name || 'the donor'} sent to your email and phone.`);
  };

  // Emergency Input View
  if (step === 'input' && isEmergency) {
    return (
      <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 border-4 border-red-500 rounded-3xl p-10 text-center shadow-2xl shadow-red-500/20 animate-pop-in relative overflow-hidden">
        {/* Animated background pulses */}
        <div className="absolute top-0 left-0 w-full h-full bg-red-50 dark:bg-red-900/20 opacity-50 z-0 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="bg-red-100 dark:bg-red-900/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
             <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400 animate-bounce" />
          </div>
          
          <h2 className="text-3xl font-black text-red-800 dark:text-red-200 mb-2 uppercase tracking-wide">{t('emergency')}</h2>
          <p className="text-red-600 dark:text-red-300 font-medium mb-8 text-lg">Immediate alerts will be broadcasted to the network.</p>
          
          <div className="mb-8 text-left bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-red-100 dark:border-red-900/30 shadow-sm">
            <label className="block text-xs font-bold text-red-900 dark:text-red-200 uppercase tracking-widest mb-2 ml-1">{t('bloodGroup')}</label>
            <select 
              value={wantedBloodGroup}
              onChange={(e) => setWantedBloodGroup(e.target.value)}
              className="w-full text-3xl p-4 bg-red-50 dark:bg-slate-900 border-2 border-red-200 dark:border-red-900/50 rounded-xl text-red-900 dark:text-red-200 font-black focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900/50 focus:border-red-500 outline-none transition-all"
            >
              <option value="">SELECT</option>
              {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>

          <button
            disabled={!wantedBloodGroup}
            onClick={() => {
              setSelectedEntity(MOCK_RESULTS[0]); 
              handleSendRequest();
            }}
            className="w-full bg-red-600 text-white font-black py-5 rounded-xl text-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/40 transform active:scale-95 transition-all"
          >
            BROADCAST ALERT
          </button>
        </div>
      </div>
    );
  }

  // Non-Emergency Search View
  if (step === 'input' && !isEmergency) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-slate-800">
           <div className="flex flex-col md:flex-row gap-6 items-end">
             <div className="flex-grow w-full">
               <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1 uppercase tracking-wider">{t('findDonor')}</label>
               <div className="relative group">
                 <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
                 <select 
                    value={wantedBloodGroup}
                    onChange={(e) => setWantedBloodGroup(e.target.value)}
                    className="pl-12 block w-full px-4 py-4 text-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-brand-100 dark:focus:ring-brand-900/30 focus:border-brand-500 focus:bg-white dark:focus:bg-slate-800 text-gray-900 dark:text-white transition-all outline-none appearance-none font-medium"
                  >
                    <option value="">Select Blood Group to Search</option>
                    {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
               </div>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((result, idx) => (
            <div 
              key={result.id} 
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-800 overflow-hidden transform hover:-translate-y-1"
              style={{ animation: `fadeInUp 0.5s ease-out forwards ${idx * 100}ms`, opacity: 0 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${result.type === 'donor' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'}`}>
                    {result.type === 'donor' ? <User className="w-6 h-6" /> : <Hospital className="w-6 h-6" />}
                  </div>
                  <span className="bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 text-xl font-black px-4 py-2 rounded-xl border border-brand-100 dark:border-brand-900/50">
                    {result.bloodGroup}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{result.name}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
                  result.type === 'donor' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300' : 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'
                }`}>
                  {result.type}
                </span>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" /> 
                    <span>{result.location}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" /> 
                    <span>{result.contact}</span>
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedEntity(result);
                    setStep('list'); 
                  }}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-lg shadow-gray-200 dark:shadow-none"
                >
                  {t('requestBlood')}
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredResults.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-300 dark:border-slate-700">
             <div className="text-gray-400 text-lg">No donors found for this blood group.</div>
             <button onClick={() => setWantedBloodGroup('')} className="text-brand-600 dark:text-brand-400 font-bold mt-2 hover:underline">View All</button>
          </div>
        )}
      </div>
    );
  }

  // Confirmation Step
  if (step === 'list' && selectedEntity) {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 text-center animate-pop-in">
        <h3 className="text-2xl font-bold mb-2 dark:text-white">{t('confirmRequest')}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8">You are requesting blood from <br/><strong className="text-gray-900 dark:text-white text-lg">{selectedEntity.name}</strong>.</p>
        <div className="flex gap-4">
          <button onClick={() => setStep('input')} className="flex-1 py-3 border-2 border-gray-200 dark:border-slate-700 rounded-xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">{t('cancel')}</button>
          <button onClick={handleSendRequest} className="flex-1 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 shadow-lg shadow-brand-500/30 transition-colors">{t('confirm')}</button>
        </div>
      </div>
    );
  }

  // Active Request Step
  if (step === 'requested') {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-10 text-center animate-fade-in-up">
        <div className="mb-8 flex justify-center">
           <div className="h-24 w-24 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center animate-bounce ring-8 ring-green-50/50 dark:ring-green-900/30">
             <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
           </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Request Sent Successfully</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-md mx-auto">
          {isEmergency ? "Emergency protocols activated. Nearby donors are being alerted." : "The donor has been notified and will contact you shortly."}
        </p>

        <div className="bg-brand-50 dark:bg-brand-900/10 p-6 rounded-2xl border border-brand-100 dark:border-brand-900/30 mb-10">
           <p className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-1">{t('status')}</p>
           <p className="text-xl font-bold text-brand-900 dark:text-brand-100">Awaiting Blood Transfer</p>
        </div>

        <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700/80 transition-colors cursor-pointer" onClick={() => handleBloodReceived()}>
          <div className="flex items-center gap-4">
             <div className="w-6 h-6 rounded-full border-2 border-gray-400 dark:border-gray-500"></div>
             <span className="font-bold text-gray-600 dark:text-gray-300 text-lg">Mark as Received</span>
          </div>
        </div>
      </div>
    );
  }

  // Payment Step
  if (step === 'received') {
    return (
      <div className="max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">Complete Transaction</h2>
        
        <div className="space-y-4 mb-8">
          <button 
            onClick={() => setPaymentMethod('UPI')}
            className={`w-full flex items-center p-5 border-2 rounded-2xl transition-all duration-200 ${paymentMethod === 'UPI' ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/20 shadow-md transform scale-[1.02]' : 'border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 hover:border-gray-300'}`}
          >
            <div className={`p-2 rounded-lg mr-4 ${paymentMethod === 'UPI' ? 'bg-brand-100 text-brand-600' : 'bg-white text-gray-500'}`}>
               <CreditCard className="w-6 h-6" />
            </div>
            <div className="text-left">
                <span className={`block font-bold ${paymentMethod === 'UPI' ? 'text-brand-900 dark:text-brand-200' : 'text-gray-900 dark:text-white'}`}>UPI Payment</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">GPay, PhonePe, Paytm</span>
            </div>
          </button>
          
          <button 
            onClick={() => setPaymentMethod('Cash')}
            className={`w-full flex items-center p-5 border-2 rounded-2xl transition-all duration-200 ${paymentMethod === 'Cash' ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/20 shadow-md transform scale-[1.02]' : 'border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 hover:border-gray-300'}`}
          >
             <div className={`p-2 rounded-lg mr-4 ${paymentMethod === 'Cash' ? 'bg-brand-100 text-brand-600' : 'bg-white text-gray-500'}`}>
               <Banknote className="w-6 h-6" />
            </div>
            <div className="text-left">
                <span className={`block font-bold ${paymentMethod === 'Cash' ? 'text-brand-900 dark:text-brand-200' : 'text-gray-900 dark:text-white'}`}>Cash on Delivery</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Pay directly at location</span>
            </div>
          </button>
        </div>

        {paymentMethod && !showPaymentDetails && (
          <button 
            onClick={handleProceedToPay}
            className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/30 hover:-translate-y-1"
          >
            Show Payment Details
          </button>
        )}

        {showPaymentDetails && selectedEntity && (
          <div className="mt-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 animate-slide-in-right">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                {paymentMethod === 'UPI' ? <CreditCard className="w-5 h-5" /> : <Banknote className="w-5 h-5" />}
                Payment Details
            </h3>
            
            {paymentMethod === 'UPI' ? (
              <div className="space-y-4">
                <div className="bg-white dark:bg-slate-700 p-4 rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">UPI ID</p>
                    <p className="text-xl font-mono text-gray-900 dark:text-white mt-1 select-all">{selectedEntity.upiId || 'red.x@upi'}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Scan QR code or copy UPI ID to your payment app.</p>
              </div>
            ) : (
              <div className="space-y-4">
                 <div className="bg-white dark:bg-slate-700 p-4 rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Payable at</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">{selectedEntity.address}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Please collect the official receipt from the donor/hospital desk.</p>
              </div>
            )}
            
            <div className="mt-8 text-center">
               <button onClick={() => window.location.reload()} className="px-6 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
                 Back to Home
               </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};