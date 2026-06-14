'use client';

import React, { useState } from 'react';
import { X, Phone, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onClose();
      // In a real app, redirect or update state
      window.location.reload(); 
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-8 pb-4 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {step === 'phone' ? 'Namaste!' : 'Verify OTP'}
            </h2>
            <p className="text-gray-500">
              {step === 'phone' 
                ? 'Welcome to BookPanditJi. Please enter your phone number to continue.' 
                : `Enter the code sent to +91 ${phone}`}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 pt-4">
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <span className="font-bold">+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl text-lg font-bold outline-none transition-all placeholder:font-normal placeholder:text-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading || phone.length < 10}
                className="w-full bg-primary hover:bg-orange-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-100 flex items-center justify-center gap-2 group transition-all disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Get Verification Code'}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-between gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-12 h-14 text-center text-2xl font-bold bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-xl outline-none transition-all"
                    required
                  />
                ))}
              </div>
              <button
                type="submit"
                disabled={loading || otp.join('').length < 6}
                className="w-full bg-primary hover:bg-orange-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-100 flex items-center justify-center gap-2 group transition-all disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify & Setup Profile'}
              </button>
              <p className="text-center text-sm text-gray-500">
                Didn't receive code? <button type="button" className="text-primary font-bold hover:underline">Resend OTP</button>
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 bg-gray-50 text-center text-xs text-gray-400 leading-relaxed">
          By continuing, you agree to BookPanditJi's <br />
          <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
