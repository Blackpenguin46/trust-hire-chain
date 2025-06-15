
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, User, LogOut } from 'lucide-react';

interface NavigationProps {
  userType: 'seeker' | 'employer';
}

const Navigation: React.FC<NavigationProps> = ({ userType }) => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="font-bold text-xl text-blue-600">
              TrustHire Chain
            </div>
            <Badge variant="secondary" className="text-xs">
              🔗 Blockchain Powered
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Button>
            
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              {userType === 'seeker' ? 'John Doe' : 'Tech Corp'}
            </Button>
            
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/auth'}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
