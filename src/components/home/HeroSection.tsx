import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Sparkles, ArrowLeft, ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
  const { language, isRTL } = useTheme();

  const t = {
    ar: {
      badge: 'منصة الذكاء الاصطناعي #1',
      title: 'أنشئ موقعك الاحترافي',
      titleHighlight: 'بالذكاء الاصطناعي',
      subtitle: 'حوّل أفكارك إلى مواقع ويب مذهلة في دقائق. لا تحتاج لخبرة برمجية - فقط صف ما تريد ودع الذكاء الاصطناعي يفعل الباقي.',
      cta: 'ابدأ مجاناً',
      demo: 'شاهد العرض',
      stats: {
        websites: '+10,000',
        websitesLabel: 'موقع تم إنشاؤه',
        users: '+5,000',
        usersLabel: 'مستخدم نشط',
        rating: '4.9',
        ratingLabel: 'تقييم المستخدمين',
      },
    },
    en: {
      badge: '#1 AI Platform',
      title: 'Build Your Professional Website',
      titleHighlight: 'With AI Power',
      subtitle: 'Transform your ideas into stunning websites in minutes. No coding required - just describe what you want and let AI do the rest.',
      cta: 'Start Free',
      demo: 'Watch Demo',
      stats: {
        websites: '10,000+',
        websitesLabel: 'Websites Created',
        users: '5,000+',
        usersLabel: 'Active Users',
        rating: '4.9',
        ratingLabel: 'User Rating',
      },
    },
  };

  const text = t[language];
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/4 -start-1/4 w-96 h-96 bg-ntfly-cyan/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -end-1/4 w-96 h-96 bg-ntfly-purple/20 rounded-full blur-3xl" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/3 start-[10%] w-20 h-20 gradient-bg rounded-2xl opacity-20 float animation-delay-1000" />
      <div className="absolute bottom-1/3 end-[15%] w-16 h-16 bg-ntfly-purple rounded-xl opacity-20 float animation-delay-2000" />
      <div className="absolute top-1/2 end-[25%] w-12 h-12 bg-ntfly-cyan rounded-lg opacity-20 float" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-ntfly-cyan/30 mb-8 fade-in">
            <Sparkles className="w-4 h-4 text-ntfly-cyan" />
            <span className="text-sm font-medium">{text.badge}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight fade-in fade-in-delay-1">
            {text.title}
            <br />
            <span className="gradient-text">{text.titleHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 fade-in fade-in-delay-2">
            {text.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 fade-in fade-in-delay-3">
            <Link to="/auth?mode=register">
              <Button variant="hero" size="xl" className="group">
                {text.cta}
                <Arrow className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="heroOutline" size="xl" className="group">
              <Play className="w-5 h-5" />
              {text.demo}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto fade-in fade-in-delay-4">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{text.stats.websites}</div>
              <div className="text-sm text-muted-foreground">{text.stats.websitesLabel}</div>
            </div>
            <div className="text-center border-x border-border">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{text.stats.users}</div>
              <div className="text-sm text-muted-foreground">{text.stats.usersLabel}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{text.stats.rating}</div>
              <div className="text-sm text-muted-foreground">{text.stats.ratingLabel}</div>
            </div>
          </div>
        </div>

        {/* Hero Image/Preview */}
        <div className="mt-16 relative max-w-5xl mx-auto fade-in fade-in-delay-4">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border glass">
            <div className="absolute inset-0 gradient-bg opacity-5" />
            <div className="aspect-video bg-gradient-to-br from-card to-muted p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-2xl gradient-bg mx-auto mb-4 flex items-center justify-center pulse-glow">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <p className="text-xl font-semibold text-muted-foreground">
                  {language === 'ar' ? 'معاينة منشئ المواقع' : 'Website Builder Preview'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -start-4 w-24 h-24 gradient-bg rounded-2xl opacity-20 blur-xl" />
          <div className="absolute -bottom-4 -end-4 w-32 h-32 bg-ntfly-purple rounded-2xl opacity-20 blur-xl" />
        </div>
      </div>
    </section>
  );
}
