
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
        <Avatar className={`${sizeClasses[size]} border-2 border-[#00FFD1]`}>
          <AvatarImage src={avatar} alt={name} className="rounded-full" />
          <AvatarFallback className="bg-[#2A2A2A] text-[#00FFD1] font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* DID Verification Badge */}
        {didVerified && (
          <div className="absolute -bottom-1 -right-1 bg-[#00FFD1] rounded-full p-1">
            <Shield className="h-3 w-3 text-[#0B1B2B]" />
          </div>
        )}
      </div>

      {/* Credentials Tooltip */}
      {showCredentials && credentials.length > 0 && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50 slide-in">
          <div className="clean-card p-4 min-w-[200px] max-w-[280px]">
            <div className="flex items-center space-x-2 mb-3">
              <Lock className="h-4 w-4 text-[#00FFD1]" />
              <span className="text-sm font-semibold text-white">Verified Credentials</span>
            </div>
            <div className="space-y-2">
              {credentials.map((credential, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-[#00FFD1]" />
                  <span className="text-xs text-gray-300">{credential}</span>
                </div>
              ))}
            </div>
            <Badge className="verified-badge mt-3">
              Blockchain Verified
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default DIDAvatar;
