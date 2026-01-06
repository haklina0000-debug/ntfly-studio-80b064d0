import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { MessageSquare, Wand2, Rocket } from 'lucide-react';

export function HowItWorksSection() {
  const { language } = useTheme();

  const t = {
    ar: {
      badge: 'كيف يعمل',
      title: 'ثلاث خطوات بسيطة لموقعك',
      subtitle: 'من الفكرة إلى الموقع الحقيقي في دقائق',
      steps: [
        {
          icon: MessageSquare,
          step: '01',
          title: 'صف موقعك',
          description: 'اكتب وصفاً بسيطاً لموقعك - ما هو نوعه؟ ما هي أقسامه؟ ما الألوان المفضلة؟',
        },
        {
          icon: Wand2,
          step: '02',
          title: 'دع الذكاء الاصطناعي يعمل',
          description: 'يحلل الذكاء الاصطناعي وصفك ويبدأ في بناء الموقع بالهيكل والتصميم المناسب',
        },
        {
          icon: Rocket,
          step: '03',
          title: 'أطلق موقعك',
          description: 'راجع الموقع، عدّل ما تريد، ثم حمّله أو انشره مباشرة على الإنترنت',
        },
      ],
    },
    en: {
      badge: 'How It Works',
      title: 'Three Simple Steps to Your Website',
      subtitle: 'From idea to real website in minutes',
      steps: [
        {
          icon: MessageSquare,
          step: '01',
          title: 'Describe Your Site',
          description: 'Write a simple description - what type is it? What sections? What colors?',
        },
        {
          icon: Wand2,
          step: '02',
          title: 'Let AI Work',
          description: 'AI analyzes your description and builds the site with appropriate structure and design',
        },
        {
          icon: Rocket,
          step: '03',
          title: 'Launch Your Site',
          description: 'Review the site, make changes, then download or publish directly online',
        },
      ],
    },
  };

  const text = t[language];

  return (
    <section className="py-24 bg-muted/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {text.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{text.title}</h2>
          <p className="text-lg text-muted-foreground">{text.subtitle}</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {text.steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < text.steps.length - 1 && (
                <div className="hidden md:block absolute top-12 start-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}
              
              <div className="relative z-10 text-center">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl gradient-bg mb-6 shadow-xl relative">
                  <step.icon className="w-10 h-10 text-white" />
                  <span className="absolute -top-2 -end-2 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center text-sm font-bold text-primary">
                    {step.step}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
