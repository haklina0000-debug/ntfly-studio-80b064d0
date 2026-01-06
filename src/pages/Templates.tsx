import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/MainLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Briefcase, 
  ShoppingBag, 
  User, 
  Rocket,
  ArrowUpRight,
  Star,
} from 'lucide-react';

export default function Templates() {
  const { language } = useTheme();

  const t = {
    ar: {
      title: 'قوالب جاهزة',
      subtitle: 'اختر من مجموعة قوالب احترافية وابدأ تخصيصها',
      useTemplate: 'استخدم القالب',
      preview: 'معاينة',
      popular: 'شائع',
      categories: ['الكل', 'شركات', 'متاجر', 'معارض', 'صفحات هبوط'],
    },
    en: {
      title: 'Ready Templates',
      subtitle: 'Choose from professional templates and start customizing',
      useTemplate: 'Use Template',
      preview: 'Preview',
      popular: 'Popular',
      categories: ['All', 'Business', 'Stores', 'Portfolios', 'Landing Pages'],
    },
  };

  const text = t[language];

  const templates = [
    {
      id: 1,
      name: language === 'ar' ? 'موقع شركة حديث' : 'Modern Business',
      category: 'business',
      icon: Briefcase,
      popular: true,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      name: language === 'ar' ? 'متجر أنيق' : 'Elegant Store',
      category: 'ecommerce',
      icon: ShoppingBag,
      popular: true,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      name: language === 'ar' ? 'معرض أعمال إبداعي' : 'Creative Portfolio',
      category: 'portfolio',
      icon: User,
      popular: false,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 4,
      name: language === 'ar' ? 'صفحة هبوط منتج' : 'Product Landing',
      category: 'landing',
      icon: Rocket,
      popular: true,
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 5,
      name: language === 'ar' ? 'وكالة تسويق' : 'Marketing Agency',
      category: 'business',
      icon: Briefcase,
      popular: false,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 6,
      name: language === 'ar' ? 'متجر أزياء' : 'Fashion Store',
      category: 'ecommerce',
      icon: ShoppingBag,
      popular: false,
      color: 'from-rose-500 to-orange-500',
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{text.title}</h1>
          <p className="text-lg text-muted-foreground">{text.subtitle}</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {text.categories.map((cat, i) => (
            <Button
              key={i}
              variant={i === 0 ? 'default' : 'outline'}
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <div
              key={template.id}
              className="group rounded-2xl bg-card border border-border overflow-hidden card-hover"
            >
              {/* Preview */}
              <div className={`aspect-video bg-gradient-to-br ${template.color} p-8 flex items-center justify-center relative`}>
                <template.icon className="w-16 h-16 text-white/80" />
                {template.popular && (
                  <div className="absolute top-4 end-4 flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-white text-xs">
                    <Star className="w-3 h-3 fill-current" />
                    {text.popular}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">{template.name}</h3>
                <div className="flex items-center gap-2">
                  <Link to="/builder" className="flex-1">
                    <Button variant="hero" className="w-full">
                      {text.useTemplate}
                    </Button>
                  </Link>
                  <Button variant="outline" size="icon">
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
