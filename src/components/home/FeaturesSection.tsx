import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Sparkles, 
  Zap, 
  Palette, 
  Globe2, 
  Shield, 
  Layers,
  MousePointer2,
  Download,
} from 'lucide-react';

export function FeaturesSection() {
  const { language } = useTheme();

  const t = {
    ar: {
      badge: 'المميزات',
      title: 'كل ما تحتاجه لبناء موقعك المثالي',
      subtitle: 'أدوات قوية ومتطورة تجعل إنشاء المواقع أمراً سهلاً وممتعاً',
      features: [
        {
          icon: Sparkles,
          title: 'ذكاء اصطناعي متقدم',
          description: 'يفهم وصفك ويحوله إلى موقع ويب كامل ومتناسق تلقائياً',
        },
        {
          icon: Zap,
          title: 'سرعة فائقة',
          description: 'احصل على موقعك جاهزاً في دقائق معدودة بدلاً من أسابيع',
        },
        {
          icon: Palette,
          title: 'تخصيص كامل',
          description: 'اختر الألوان والخطوط والتصميم الذي يناسب علامتك التجارية',
        },
        {
          icon: Globe2,
          title: 'دعم RTL',
          description: 'دعم كامل للغة العربية واللغات التي تكتب من اليمين لليسار',
        },
        {
          icon: Layers,
          title: 'قوالب احترافية',
          description: 'مكتبة ضخمة من القوالب الجاهزة لمختلف أنواع المواقع',
        },
        {
          icon: MousePointer2,
          title: 'سهولة الاستخدام',
          description: 'واجهة بسيطة وسهلة لا تحتاج أي خبرة برمجية',
        },
        {
          icon: Download,
          title: 'تصدير المشروع',
          description: 'حمّل موقعك كملفات جاهزة للاستضافة في أي مكان',
        },
        {
          icon: Shield,
          title: 'آمن ومحمي',
          description: 'حماية بياناتك ومشاريعك بأعلى معايير الأمان',
        },
      ],
    },
    en: {
      badge: 'Features',
      title: 'Everything You Need to Build Your Perfect Website',
      subtitle: 'Powerful and advanced tools that make website creation easy and enjoyable',
      features: [
        {
          icon: Sparkles,
          title: 'Advanced AI',
          description: 'Understands your description and transforms it into a complete website automatically',
        },
        {
          icon: Zap,
          title: 'Lightning Fast',
          description: 'Get your website ready in minutes instead of weeks',
        },
        {
          icon: Palette,
          title: 'Full Customization',
          description: 'Choose colors, fonts, and design that match your brand',
        },
        {
          icon: Globe2,
          title: 'RTL Support',
          description: 'Full support for Arabic and right-to-left languages',
        },
        {
          icon: Layers,
          title: 'Professional Templates',
          description: 'Huge library of ready-made templates for all website types',
        },
        {
          icon: MousePointer2,
          title: 'Easy to Use',
          description: 'Simple interface that requires no coding experience',
        },
        {
          icon: Download,
          title: 'Export Project',
          description: 'Download your site as files ready for any hosting',
        },
        {
          icon: Shield,
          title: 'Secure & Protected',
          description: 'Your data and projects protected with highest security standards',
        },
      ],
    },
  };

  const text = t[language];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dots-pattern opacity-30" />
      <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-ntfly-cyan/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {text.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{text.title}</h2>
          <p className="text-lg text-muted-foreground">{text.subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {text.features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border card-hover"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg-subtle flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
