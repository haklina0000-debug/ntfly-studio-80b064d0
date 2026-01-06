import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Zap, Instagram, Mail, Heart, Phone, Code } from 'lucide-react';

export function Footer() {
  const { language } = useTheme();

  const t = {
    ar: {
      company: 'Ntfly Digital',
      tagline: 'منصة بناء المواقع بالذكاء الاصطناعي',
      product: 'المنتج',
      features: 'المميزات',
      templates: 'القوالب',
      pricing: 'الأسعار',
      builder: 'منشئ المواقع',
      legal: 'قانوني',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
      cookies: 'ملفات تعريف الارتباط',
      support: 'الدعم',
      help: 'مركز المساعدة',
      contact: 'تواصل معنا',
      feedback: 'اقتراحات',
      rights: 'جميع الحقوق محفوظة',
      madeWith: 'صنع بـ',
      inMorocco: 'في المغرب',
      developer: 'المطور',
      developerName: 'Soufyane',
    },
    en: {
      company: 'Ntfly Digital',
      tagline: 'AI-Powered Website Builder',
      product: 'Product',
      features: 'Features',
      templates: 'Templates',
      pricing: 'Pricing',
      builder: 'Website Builder',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy',
      support: 'Support',
      help: 'Help Center',
      contact: 'Contact Us',
      feedback: 'Feedback',
      rights: 'All rights reserved',
      madeWith: 'Made with',
      inMorocco: 'in Morocco',
      developer: 'Developer',
      developerName: 'Soufyane',
    },
  };

  const text = t[language];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">{text.company}</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              {text.tagline}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/soufiane__lr__77"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@ntfly.com"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">{text.product}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {text.features}
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {text.templates}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {text.pricing}
                </Link>
              </li>
              <li>
                <Link to="/builder" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {text.builder}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{text.legal}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {text.privacy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {text.terms}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {text.cookies}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">{text.support}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {text.help}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {text.contact}
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {text.feedback}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Developer Info */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-primary" />
              <span>{text.developer}: <strong className="text-foreground">{text.developerName}</strong></span>
            </div>
            <span className="hidden md:inline text-border">|</span>
            <a
              href="https://instagram.com/soufyane__lr__77"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Instagram className="w-4 h-4" />
              soufyane__lr__77
            </a>
            <span className="hidden md:inline text-border">|</span>
            <a
              href="mailto:lrsoufyane2007@gmail.com"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              lrsoufyane2007@gmail.com
            </a>
            <span className="hidden md:inline text-border">|</span>
            <a
              href="tel:0638369776"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              0638369776
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {text.company}. {text.rights}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {text.madeWith} <Heart className="w-4 h-4 text-destructive fill-destructive" /> {text.inMorocco}
          </p>
        </div>
      </div>
    </footer>
  );
}
