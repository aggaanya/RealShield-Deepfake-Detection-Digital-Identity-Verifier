import React from 'react';
import { Outlet } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Illustration/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-shield-500 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-shield-400 to-shield-700 opacity-80" />
        
        <div className="absolute w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse-shield" />
          <div className="absolute top-2/3 right-1/4 w-40 h-40 bg-white/10 rounded-full animate-pulse-shield animation-delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-white/10 rounded-full animate-pulse-shield animation-delay-2000" />
        </div>
        
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-6">RealShield</h1>
          <p className="text-white/80 text-lg max-w-md">
            Protect digital trust with AI-powered deepfake detection and source verification.
          </p>
          
          <div className="mt-12 space-y-4">
            <div className="flex items-center space-x-3 text-white/90">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg">✓</span>
              </div>
              <span>Real-time deepfake detection</span>
            </div>
            <div className="flex items-center space-x-3 text-white/90">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg">✓</span>
              </div>
              <span>Source integrity verification</span>
            </div>
            <div className="flex items-center space-x-3 text-white/90">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg">✓</span>
              </div>
              <span>Multi-language support</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
