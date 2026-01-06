import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Sun, Moon, Menu, X, Globe, Zap } from 'lucide-react';

export function Navbar() {
  const { theme, toggleTheme, language, setLanguage, isRTL } = useTheme();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = {
    ar: {
      home: 'الرئيسية',
      features: 'المميزات',
      pricing: 'الأسعار',
      templates: 'القوالب',
      login: 'تسجيل الدخول',
      dashboard: 'لوحة التحكم',
      adminDashboard: 'لوحة الأدمن',
      logout: 'خروج',
      getStarted: 'ابدأ الآن',
    },
    en: {
      home: 'Home',
      features: 'Features',
      pricing: 'Pricing',
      templates: 'Templates',
      login: 'Login',
      dashboard: 'Dashboard',
      adminDashboard: 'Admin Panel',
      logout: 'Logout',
      getStarted: 'Get Started',
    },
  };

  const text = t[language];

  const navLinks = [
    { href: '/', label: text.home },
    { href: '/features', label: text.features },
    { href: '/templates', label: text.templates },
    { href: '/pricing', label: text.pricing },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Ntfly</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              title={language === 'ar' ? 'English' : 'العربية'}
            >
              <Globe className="w-5 h-5" />
            </Button>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            {isAuthenticated ? (
              <>
                <Link to={isAdmin ? '/admin' : '/dashboard'}>
                  <Button variant="ghost">
                    {isAdmin ? text.adminDashboard : text.dashboard}
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => logout()}>
                  {text.logout}
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost">{text.login}</Button>
                </Link>
                <Link to="/auth?mode=register">
                  <Button variant="hero" size="default">
                    {text.getStarted}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-in-up">
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="flex items-center gap-2 px-4 py-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                >
                  <Globe className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </Button>
              </div>

              <div className="flex flex-col gap-2 px-4 pt-2 border-t border-border/50">
                {isAuthenticated ? (
                  <>
                    <Link to={isAdmin ? '/admin' : '/dashboard'} onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        {isAdmin ? text.adminDashboard : text.dashboard}
                      </Button>
                    </Link>
                    <Button variant="ghost" onClick={() => { logout(); setIsMenuOpen(false); }}>
                      {text.logout}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">{text.login}</Button>
                    </Link>
                    <Link to="/auth?mode=register" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="hero" className="w-full">{text.getStarted}</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
