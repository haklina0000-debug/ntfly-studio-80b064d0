import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
  const { language, isRTL } = useTheme();

  const t = {
    ar: {
      title: 'جاهز لبناء موقعك؟',
      subtitle: 'انضم إلى آلاف المستخدمين الذين يبنون مواقعهم بالذكاء الاصطناعي',
      cta: 'ابدأ مجاناً الآن',
      note: 'لا تحتاج بطاقة ائتمان',
    },
    en: {
      title: 'Ready to Build Your Website?',
      subtitle: 'Join thousands of users building their websites with AI',
      cta: 'Start Free Now',
      note: 'No credit card required',
    },
  };

  const text = t[language];
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-90" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 start-[10%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-1/4 end-[10%] w-48 h-48 bg-white/10 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{text.title}</h2>
          <p className="text-xl text-white/80 mb-8">{text.subtitle}</p>
          
          <Link to="/auth?mode=register">
            <Button 
              size="xl" 
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow-xl group"
            >
              {text.cta}
              <Arrow className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <p className="mt-4 text-sm text-white/60">{text.note}</p>
        </div>
      </div>
    </section>
  );
}
