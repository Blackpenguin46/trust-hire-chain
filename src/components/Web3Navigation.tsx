
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, User, LogOut, Menu, X, Shield, Zap } from 'lucide-react';

interface Web3NavigationProps {
  userType?: 'seeker' | 'employer';
}

const Web3Navigation: React.FC<Web3NavigationProps> = ({ userType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'For Job Seekers', href: '/for-job-seekers' },
    { label: 'For Employers', href: '/for-employers' },
    { label: 'Verify Credentials', href: '/verify-credentials' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B1B2B]/95 backdrop-blur-xl border-b border-gray-700/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-[#00FFD1] text-[#0B1B2B] font-bold text-xl px-4 py-2 rounded-lg cursor-pointer"
                 onClick={() => window.location.href = '/'}>
              TrustHire Chain
            </div>
            <Badge className="verified-badge text-xs">
              Web3 Powered
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => window.location.href = item.href}
                className="text-gray-300 hover:text-white hover:bg-[#2A2A2A] transition-all duration-200 text-sm px-4 py-2"
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* User Section or CTA */}
          <div className="flex items-center space-x-3">
            {userType ? (
              <>
                <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-white hover:bg-[#2A2A2A] transition-all duration-200">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 bg-[#00FFD1] text-[#0B1B2B] text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    3
                  </span>
                </Button>
                
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-[#2A2A2A] transition-all duration-200">
                  <User className="h-4 w-4 mr-2" />
                  <span className="accent-text font-medium">
                    {userType === 'seeker' ? 'John Doe' : 'Tech Corp'}
                  </span>
                </Button>
                
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/auth'} className="text-gray-300 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => window.location.href = '/auth'}
                className="professional-button hidden md:flex text-sm"
              >
                Launch dApp
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-white hover:bg-[#2A2A2A]"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-700/30 bg-[#0B1B2B]/95 backdrop-blur-xl">
            <div className="py-4 space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => {
                    window.location.href = item.href;
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#2A2A2A] transition-all duration-200"
                >
                  {item.label}
                </Button>
              ))}
              {!userType && (
                <Button 
                  onClick={() => {
                    window.location.href = '/auth';
                    setIsMenuOpen(false);
                  }}
                  className="w-full professional-button mt-4"
                >
                  Launch dApp
                  <Zap className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Web3Navigation;
