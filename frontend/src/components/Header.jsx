import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ChevronDown, LogOut, User, Settings, FileText, BarChart, Bell, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/authStore';

const Header = () => {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = React.useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Use authStore's logout function
    logout();
    
    // Navigate to login
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-blue-100/50 dark:border-blue-900/30 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-shield-500 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="font-bold text-xl tracking-tight tech-gradient-text">
              Real<span className="tech-gradient-text">Shield</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors relative ${
              location.pathname === '/' 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Home
            {location.pathname === '/' && (
              <motion.span 
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                layoutId="navIndicator"
              />
            )}
          </Link>
          <Link 
            to="/detect" 
            className={`text-sm font-medium transition-colors relative ${
              location.pathname === '/detect' 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Detect
            {location.pathname === '/detect' && (
              <motion.span 
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                layoutId="navIndicator"
              />
            )}
          </Link>
          <Link 
            to="/verify" 
            className={`text-sm font-medium transition-colors relative ${
              location.pathname === '/verify' 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Verify
            {location.pathname === '/verify' && (
              <motion.span 
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                layoutId="navIndicator"
              />
            )}
          </Link>
          {user && (
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors relative ${
                location.pathname === '/dashboard' 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Dashboard
              {location.pathname === '/dashboard' && (
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                  layoutId="navIndicator"
                />
              )}
            </Link>
          )}
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors relative ${
              location.pathname === '/about' 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            About
            {location.pathname === '/about' && (
              <motion.span 
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                layoutId="navIndicator"
              />
            )}
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {!user ? (
            <>
              <Button variant="ghost" onClick={() => navigate('/login')} className="hover:text-blue-600">
                Log in
              </Button>
              <Button variant="tech" onClick={() => navigate('/register')}>
                Sign up
              </Button>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <span>{user.name}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md ring-1 ring-black/5 dark:ring-white/10 border border-gray-100 dark:border-gray-800"
                  >
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800/50">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                      <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20">
                        <BarChart className="h-4 w-4 text-blue-500" />
                        Dashboard
                      </Link>
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20">
                        <User className="h-4 w-4 text-blue-500" />
                        Profile
                      </Link>
                      <Link to="/settings" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20">
                        <Settings className="h-4 w-4 text-blue-500" />
                        Settings
                      </Link>
                      <Link to="/notifications" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20">
                        <Bell className="h-4 w-4 text-blue-500" />
                        Notifications
                      </Link>
                      <Link to="/billing" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 border-b border-gray-100 dark:border-gray-800/50">
                        <CreditCard className="h-4 w-4 text-blue-500" />
                        Billing
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50/50 dark:hover:bg-red-900/20"
                      >
                        <LogOut className="h-4 w-4 text-red-500" />
                        Log out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-100 dark:border-gray-800/50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md"
          >
            <div className="container py-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === '/' 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/detect"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === '/detect' 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Detect
                </Link>
                <Link 
                  to="/verify"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === '/verify' 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Verify
                </Link>
                {user && (
                  <Link 
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === '/dashboard' 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
                <Link 
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === '/about' 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  About
                </Link>
              </nav>
              
              {!user ? (
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                  >
                    Log in
                  </Button>
                  <Button 
                    variant="tech"
                    className="w-full"
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign up
                  </Button>
                </div>
              ) : (
                <div className="mt-6">
                  <div className="flex items-center gap-3 mb-4 py-2 border-b border-gray-100 dark:border-gray-800/50">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Link 
                      to="/profile" 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-xs bg-blue-50 dark:bg-blue-900/20 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40"
                    >
                      <User className="h-3.5 w-3.5" />
                      Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-xs bg-blue-50 dark:bg-blue-900/20 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40"
                    >
                      <Settings className="h-3.5 w-3.5" />
                      Settings
                    </Link>
                  </div>
                  
                  <Button 
                    variant="ghost"
                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-alert-600 dark:text-alert-400 hover:bg-alert-50 dark:hover:bg-alert-900/20 hover:text-alert-700 dark:hover:text-alert-300"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
