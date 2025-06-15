
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
    { label: 'How It Works', href: '/how-it-works', icon: Zap },
    { label: 'For Job Seekers', href: '/for-job-seekers', icon: User },
    { label: 'For Employers', href: '/for-employers', icon: Shield },
    { label: 'Verify Credentials', href: '/verify-credentials', icon: Shield },
    { label: 'About', href: '/about', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0B1B2B]/95 via-[#1A1A1A]/95 to-[#0B1B2B]/95 backdrop-blur-xl border-b border-gray-700/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00FFD1] to-[#6B46FF] rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-[#00FFD1] to-[#6B46FF] text-[#0B1B2B] font-bold text-2xl px-6 py-3 rounded-xl cursor-pointer"
                   onClick={() => window.location.href = '/'}>
                TrustHire Chain
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-[#00FFD1]/20 to-[#6B46FF]/20 text-[#00FFD1] border border-[#00FFD1]/30 backdrop-blur-sm verified-pulse">
              ⛓️ Web3 Powered
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => window.location.href = item.href}
                className="text-gray-300 hover:text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all duration-300 relative group"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00FFD1] to-[#6B46FF] group-hover:w-full transition-all duration-300"></div>
              </Button>
            ))}
          </div>

          {/* User Section or CTA */}
          <div className="flex items-center space-x-3">
            {userType ? (
              <>
                {/* Authenticated User UI */}
                <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all duration-300">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#FF6B35] to-[#6B46FF] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg verified-pulse">
                    3
                  </span>
                </Button>
                
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all duration-300">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-gradient font-semibold">
                    {userType === 'seeker' ? 'John Doe' : 'Tech Corp'}
                  </span>
                </Button>
                
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/auth'} className="text-gray-300 hover:text-[#FF6B35] hover:bg-[#FF6B35]/10 transition-all duration-300">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                {/* Guest User CTA */}
                <Button 
                  onClick={() => window.location.href = '/auth'}
                  className="cyber-button hidden md:flex"
                >
                  Launch dApp
                  <Zap className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-[#00FFD1] hover:bg-[#00FFD1]/10"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-700/30 bg-gradient-to-b from-[#1A1A1A]/95 to-[#0B1B2B]/95 backdrop-blur-xl">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => {
                    window.location.href = item.href;
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-start text-gray-300 hover:text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all duration-300"
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              ))}
              {!userType && (
                <Button 
                  onClick={() => {
                    window.location.href = '/auth';
                    setIsMenuOpen(false);
                  }}
                  className="w-full cyber-button mt-4"
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
