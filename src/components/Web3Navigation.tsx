import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
<<<<<<< HEAD
import { Menu, X } from 'lucide-react';
import Parse from 'parse';
import { useToast } from '@/components/ui/use-toast';
=======
import { Bell, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
>>>>>>> b56f796f6323efeac8d9aaff538f1eb82896d1c8

const Web3Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
<<<<<<< HEAD
  const [currentUser, setCurrentUser] = useState<Parse.User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
=======
  const [scrollProgress, setScrollProgress] = useState(0);
  const { user, profile, signOut } = useAuth();
>>>>>>> b56f796f6323efeac8d9aaff538f1eb82896d1c8

  useEffect(() => {
    setCurrentUser(Parse.User.current());
  }, []);

<<<<<<< HEAD
  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      setCurrentUser(null);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to log out.',
        variant: 'destructive',
      });
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[--color-background]/95 backdrop-blur-xl border-b border-[--border]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="text-xl font-semibold text-[--color-text-primary] cursor-pointer">
                TrustHire Chain
              </div>
            </Link>
          </div>
          <div className="hidden lg:ml-6 lg:flex lg:space-x-8 items-center">
            <Link to="/for-employers" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">For Employers</Link>
            <Link to="/for-job-seekers" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">For Job Seekers</Link>
            <Link to="/how-it-works" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">How It Works</Link>
            <Link to="/about" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">About</Link>
            <Link to="/contact" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            
            {currentUser ? (
              <>
                {currentUser.get('userType') === 'employer' && (
                  <Link to="/dashboard/employer" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">Employer Dashboard</Link>
=======
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
              {user && profile ? (
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
                      {profile.user_role === 'job_seeker' ? profile.full_name : profile.company_name || profile.full_name}
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
>>>>>>> b56f796f6323efeac8d9aaff538f1eb82896d1c8
                )}
                {currentUser.get('userType') === 'seeker' && (
                  <Link to="/dashboard/seeker" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">Job Seeker Dashboard</Link>
                )}
                <Link to="/profile" className="text-[--color-text-primary]/70 hover:text-[--color-text-primary] px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                <Button onClick={handleLogout} variant="outline" className="text-[--color-primary] border-[--color-primary] hover:bg-[--color-primary] hover:text-white">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/auth')} className="primary-button">
                Sign In / Sign Up
              </Button>
            )}
          </div>
          <div className="-mr-2 flex items-center lg:hidden">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[--color-primary]"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-[--border] bg-[--color-background]/98 backdrop-blur-xl slide-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/for-employers" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">For Employers</Link>
            <Link to="/for-job-seekers" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">For Job Seekers</Link>
            <Link to="/how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">How It Works</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">About</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">Contact</Link>
            
            {currentUser ? (
              <>
                {currentUser.get('userType') === 'employer' && (
                  <Link to="/dashboard/employer" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">Employer Dashboard</Link>
                )}
                {currentUser.get('userType') === 'seeker' && (
                  <Link to="/dashboard/seeker" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">Job Seeker Dashboard</Link>
                )}
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-[--color-text-primary]/70 hover:text-[--color-text-primary] hover:bg-[--border]">Profile</Link>
                <Button onClick={handleLogout} variant="outline" className="w-full mt-2 text-[--color-primary] border-[--color-primary] hover:bg-[--color-primary] hover:text-white">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/auth')} className="w-full mt-2 primary-button">
                Sign In / Sign Up
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Web3Navigation;


