
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, User, LogOut, Sparkles } from 'lucide-react';

interface NavigationProps {
  userType: 'seeker' | 'employer';
}

const Navigation: React.FC<NavigationProps> = ({ userType }) => {
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl border-b border-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-50"></div>
              <div className="relative font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent px-2">
                TrustHire Chain
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-sm animate-pulse">
              ⛓️ Blockchain Powered
            </Badge>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                2
              </span>
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200">
              <User className="h-4 w-4 mr-2" />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                {userType === 'seeker' ? 'John Doe' : 'Tech Corp'}
              </span>
            </Button>
            
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/auth'} className="text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
