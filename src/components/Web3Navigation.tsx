import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Web3Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const navItems = [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'For Talent', href: '/for-job-seekers' },
    { label: 'For Employers', href: '/for-employers' },
    { label: 'Verify', href: '/verify-credentials' },
  ];

  return (
    <>
      {/* Scroll indicator */}
      <div 
        className="scroll-indicator" 
        style={{ width: `${scrollProgress}%` }}
      />
      
      <nav className="sticky top-0 z-50 bg-[--color-background]/95 backdrop-blur-xl border-b border-[--border]">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-xl font-semibold text-[--color-text-primary] cursor-pointer"
                   onClick={() => window.location.href = '/'}>
                TrustHire Chain
              </div>
            </div>

            {/* Center Navigation - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link text-sm font-medium py-2"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button variant="ghost" size="sm" className="relative text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 bg-[#36B4A5] text-[#0D1117] text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                      3
                    </span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-[#36B4A5] font-medium">
                      {user.get('userType') === 'seeker' ? user.get('username') : user.get('companyName') || user.get('username')}
                    </span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="text-[--color-text-primary]/70 hover:text-[--color-warning] hover:bg-[--color-warning]/10"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <Button 
                    onClick={() => window.location.href = '/auth'}
                    className="secondary-button text-sm font-medium"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/auth'}
                    className="primary-button text-sm font-medium"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-[--border] bg-[--color-background]/98 backdrop-blur-xl slide-in">
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border] transition-all duration-200 rounded-lg mx-2"
                  >
                    {item.label}
                  </a>
                ))}
                {!user && (
                  <div className="px-2 pt-4 space-y-2">
                    <Button 
                      onClick={() => {
                        window.location.href = '/auth';
                        setIsMenuOpen(false);
                      }}
                      className="secondary-button w-full"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => {
                        window.location.href = '/auth';
                        setIsMenuOpen(false);
                      }}
                      className="primary-button w-full"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Web3Navigation;


