import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Parse from 'parse';
import { useToast } from '@/components/ui/use-toast';

const Web3Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Parse.User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setCurrentUser(Parse.User.current());
  }, []);

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


