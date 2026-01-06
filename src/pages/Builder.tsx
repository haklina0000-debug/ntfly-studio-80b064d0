import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { MainLayout } from '@/components/layout/MainLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Sparkles, 
  Palette, 
  Layout, 
  Globe2, 
  ShoppingBag, 
  Briefcase,
  User,
  Rocket,
  Loader2,
  CheckCircle2,
  Download,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';

type WebsiteType = 'business' | 'ecommerce' | 'portfolio' | 'landing';

export default function Builder() {
  const { language } = useTheme();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    type: '' as WebsiteType | '',
    description: '',
    primaryColor: '#00B8D9',
    secondaryColor: '#7C3AED',
  });

  const t = {
    ar: {
      title: 'منشئ المواقع بالذكاء الاصطناعي',
      subtitle: 'أنشئ موقعك الاحترافي في دقائق',
      step1: 'معلومات أساسية',
      step2: 'نوع الموقع',
      step3: 'وصف الموقع',
      step4: 'الألوان',
      websiteName: 'اسم الموقع',
      websiteNamePlaceholder: 'مثال: متجر الأناقة',
      websiteType: 'نوع الموقع',
      types: {
        business: 'موقع شركة',
        ecommerce: 'متجر إلكتروني',
        portfolio: 'معرض أعمال',
        landing: 'صفحة هبوط',
      },
      description: 'وصف الموقع',
      descriptionPlaceholder: 'صف موقعك بالتفصيل... ما هي الأقسام؟ ما الخدمات أو المنتجات؟',
      colors: 'ألوان الموقع',
      primaryColor: 'اللون الرئيسي',
      secondaryColor: 'اللون الثانوي',
      next: 'التالي',
      back: 'رجوع',
      generate: 'إنشاء الموقع',
      generating: 'جاري الإنشاء...',
      generatingSteps: [
        'تحليل الوصف...',
        'اختيار القالب المناسب...',
        'إنشاء الهيكل...',
        'تصميم الصفحات...',
        'تطبيق الألوان...',
        'المراجعة النهائية...',
      ],
      complete: 'تم إنشاء موقعك بنجاح! 🎉',
      preview: 'معاينة الموقع',
      download: 'تحميل المشروع',
      createAnother: 'إنشاء موقع آخر',
    },
    en: {
      title: 'AI Website Builder',
      subtitle: 'Create your professional website in minutes',
      step1: 'Basic Info',
      step2: 'Website Type',
      step3: 'Description',
      step4: 'Colors',
      websiteName: 'Website Name',
      websiteNamePlaceholder: 'Example: Elegance Store',
      websiteType: 'Website Type',
      types: {
        business: 'Business',
        ecommerce: 'E-commerce',
        portfolio: 'Portfolio',
        landing: 'Landing Page',
      },
      description: 'Website Description',
      descriptionPlaceholder: 'Describe your website in detail... What sections? What services or products?',
      colors: 'Website Colors',
      primaryColor: 'Primary Color',
      secondaryColor: 'Secondary Color',
      next: 'Next',
      back: 'Back',
      generate: 'Generate Website',
      generating: 'Generating...',
      generatingSteps: [
        'Analyzing description...',
        'Selecting template...',
        'Creating structure...',
        'Designing pages...',
        'Applying colors...',
        'Final review...',
      ],
      complete: 'Your website is ready! 🎉',
      preview: 'Preview Website',
      download: 'Download Project',
      createAnother: 'Create Another',
    },
  };

  const text = t[language];

  const websiteTypes = [
    { id: 'business', icon: Briefcase, label: text.types.business },
    { id: 'ecommerce', icon: ShoppingBag, label: text.types.ecommerce },
    { id: 'portfolio', icon: User, label: text.types.portfolio },
    { id: 'landing', icon: Rocket, label: text.types.landing },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);

    // Simulate AI generation with progress
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setProgress(i);
    }

    setIsGenerating(false);
    setIsComplete(true);
    toast.success(text.complete);
  };

  const handleDownload = () => {
    toast.success(language === 'ar' ? 'جاري تحضير الملفات...' : 'Preparing files...');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{text.websiteName}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder={text.websiteNamePlaceholder}
                className="text-lg h-12"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <Label>{text.websiteType}</Label>
            <div className="grid grid-cols-2 gap-4">
              {websiteTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setFormData(prev => ({ ...prev, type: type.id as WebsiteType }))}
                  className={`p-6 rounded-2xl border-2 transition-all text-center ${
                    formData.type === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <type.icon className={`w-8 h-8 mx-auto mb-3 ${formData.type === type.id ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <Label htmlFor="description">{text.description}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder={text.descriptionPlaceholder}
              className="min-h-[200px] text-base"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Label>{text.colors}</Label>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="primaryColor" className="text-sm text-muted-foreground">{text.primaryColor}</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="primaryColor"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="w-16 h-16 rounded-xl border-2 border-border cursor-pointer"
                  />
                  <Input
                    value={formData.primaryColor}
                    onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="font-mono"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor" className="text-sm text-muted-foreground">{text.secondaryColor}</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="secondaryColor"
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                    className="w-16 h-16 rounded-xl border-2 border-border cursor-pointer"
                  />
                  <Input
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                    className="font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  if (isComplete) {
    return (
      <MainLayout showFooter={false}>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 rounded-3xl gradient-bg mx-auto mb-6 flex items-center justify-center pulse-glow">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">{text.complete}</h1>
            <p className="text-lg text-muted-foreground mb-8">{formData.name}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg">
                <Eye className="w-5 h-5" />
                {text.preview}
              </Button>
              <Button variant="heroOutline" size="lg" onClick={handleDownload}>
                <Download className="w-5 h-5" />
                {text.download}
              </Button>
            </div>

            <Button
              variant="ghost"
              className="mt-8"
              onClick={() => {
                setStep(1);
                setIsComplete(false);
                setFormData({ name: '', type: '', description: '', primaryColor: '#00B8D9', secondaryColor: '#7C3AED' });
              }}
            >
              {text.createAnother}
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (isGenerating) {
    return (
      <MainLayout showFooter={false}>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl gradient-bg mx-auto mb-6 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{text.generating}</h2>
            <p className="text-muted-foreground mb-8">
              {text.generatingSteps[Math.floor(progress / 17)] || text.generatingSteps[5]}
            </p>
            <Progress value={progress} className="h-3 mb-4" />
            <p className="text-sm text-muted-foreground">{progress}%</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout showFooter={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{text.title}</h1>
            <p className="text-muted-foreground">{text.subtitle}</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full transition-colors ${
                  s === step ? 'bg-primary w-8' : s < step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Form */}
          <div className="bg-card rounded-2xl border border-border p-8">
            {renderStep()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              {step > 1 ? (
                <Button variant="ghost" onClick={() => setStep(s => s - 1)}>
                  {text.back}
                </Button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <Button
                  variant="hero"
                  onClick={() => setStep(s => s + 1)}
                  disabled={
                    (step === 1 && !formData.name) ||
                    (step === 2 && !formData.type) ||
                    (step === 3 && !formData.description)
                  }
                >
                  {text.next}
                </Button>
              ) : (
                <Button variant="hero" onClick={handleGenerate}>
                  <Sparkles className="w-5 h-5" />
                  {text.generate}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
