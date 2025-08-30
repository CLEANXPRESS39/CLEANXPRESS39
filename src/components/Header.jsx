import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoImage from '../assets/clean_xpress_logo_v2.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoImage} alt="Clean Xpress Logo" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-slate-700 hover:text-red-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Contact Button */}
            <a
              href="tel:0683967427"
              className="bg-red-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Appeler</span>
            </a>

            {/* User Menu or Login Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-slate-700 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-slate-100"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline font-medium">{user.first_name}</span>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                    <div className="px-4 py-2 border-b border-slate-200">
                      <p className="text-sm font-medium text-slate-900">{user.first_name} {user.last_name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    
                    {user.is_admin ? (
                      <Link
                        to="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Administration</span>
                      </Link>
                    ) : (
                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Mon espace</span>
                      </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden lg:flex items-center space-x-2 text-slate-700 hover:text-red-600 transition-colors font-medium"
              >
                <User className="w-5 h-5" />
                <span>Connexion</span>
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium transition-colors px-2 py-2 rounded-lg ${
                    isActive(item.href)
                      ? 'text-red-600 bg-red-50'
                      : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile User Menu */}
              {user ? (
                <div className="border-t border-slate-200 pt-4 mt-4">
                  <div className="px-2 py-2 text-sm text-slate-600">
                    Connecté en tant que <span className="font-medium">{user.first_name}</span>
                  </div>
                  {user.is_admin ? (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 px-2 py-2 text-slate-700 hover:text-red-600 hover:bg-slate-50 rounded-lg font-medium"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Administration</span>
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 px-2 py-2 text-slate-700 hover:text-red-600 hover:bg-slate-50 rounded-lg font-medium"
                    >
                      <User className="w-5 h-5" />
                      <span>Mon espace</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-2 py-2 text-slate-700 hover:text-red-600 hover:bg-slate-50 rounded-lg font-medium"
                >
                  <User className="w-5 h-5" />
                  <span>Connexion</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

