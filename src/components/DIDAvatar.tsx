
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield, CheckCircle, Lock } from 'lucide-react';

interface DIDAvatarProps {
  name: string;
  avatar?: string;
  didVerified?: boolean;
  credentials?: string[];
  size?: 'sm' | 'md' | 'lg';
}

const DIDAvatar: React.FC<DIDAvatarProps> = ({ 
  name, 
  avatar, 
  didVerified = false, 
  credentials = [],
  size = 'md' 
}) => {
  const [showCredentials, setShowCredentials] = useState(false);

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setShowCredentials(true)}
      onMouseLeave={() => setShowCredentials(false)}
    >
      <div className="relative">
        <Avatar className={`${sizeClasses[size]} border-2 border-[#36B4A5]`}>
          <AvatarImage src={avatar} alt={name} className="rounded-full" />
          <AvatarFallback className="bg-[#303641] text-[#36B4A5] font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* DID Verification Badge */}
        {didVerified && (
          <div className="absolute -bottom-1 -right-1 bg-[#36B4A5] rounded-full p-1">
            <Shield className="h-3 w-3 text-[#0D1117]" />
          </div>
        )}
      </div>

      {/* Credentials Tooltip */}
      {showCredentials && credentials.length > 0 && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
          <div className="professional-card p-4 min-w-[200px] max-w-[280px]">
            <div className="flex items-center space-x-2 mb-3">
              <Lock className="h-4 w-4 text-[#36B4A5]" />
              <span className="text-sm font-semibold text-[#EDEEF2]">Verified Credentials</span>
            </div>
            <div className="space-y-2">
              {credentials.map((credential, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-[#36B4A5]" />
                  <span className="text-xs text-[#EDEEF2]/70">{credential}</span>
                </div>
              ))}
            </div>
            <div className="inline-flex items-center px-2 py-1 rounded-full bg-[#36B4A5]/10 text-[#36B4A5] text-xs font-medium mt-3">
              Blockchain Verified
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DIDAvatar;
