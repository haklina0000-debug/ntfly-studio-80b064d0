import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Zap, Mail, Lock, User, Github, Loader2, ArrowLeft, ArrowRight, Heart, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithGithub, register, isAuthenticated, isLoading } = useAuth();
  const { language, isRTL } = useTheme();
  
  const [mode, setMode] = useState<'login' | 'register'>(
    searchParams.get('mode') === 'register' ? 'register' : 'login'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const t = {
    ar: {
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      name: 'الاسم الكامل',
      loginBtn: 'دخول',
      registerBtn: 'إنشاء الحساب',
      noAccount: 'ليس لديك حساب؟',
      hasAccount: 'لديك حساب بالفعل؟',
      createAccount: 'أنشئ حساباً',
      loginNow: 'سجل دخولك',
      orContinueWith: 'أو تابع باستخدام',
      google: 'Google',
      github: 'GitHub',
      welcome: 'مرحباً بك في',
      welcomeBack: 'مرحباً بعودتك',
      createAccountDesc: 'أنشئ حسابك وابدأ في بناء مواقعك',
      loginDesc: 'سجل دخولك للوصول لمشاريعك',
      backToHome: 'العودة للرئيسية',
      betaAlert: '⚠️ هذا إصدار تجريبي (Beta) مجاني لمدة شهر',
      supportProject: 'ادعم المشروع',
      supportDesc: 'تبرعك اختياري ويساعدنا في تطوير المنصة وإضافة ميزات جديدة',
      donateBtn: 'تبرع الآن',
      donateComingSoon: 'سيتم تفعيل بوابة الدفع قريباً',
    },
    en: {
      login: 'Login',
      register: 'Sign Up',
      email: 'Email',
      password: 'Password',
      name: 'Full Name',
      loginBtn: 'Sign In',
      registerBtn: 'Create Account',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      createAccount: 'Create one',
      loginNow: 'Sign in',
      orContinueWith: 'Or continue with',
      google: 'Google',
      github: 'GitHub',
      welcome: 'Welcome to',
      welcomeBack: 'Welcome Back',
      createAccountDesc: 'Create your account and start building websites',
      loginDesc: 'Sign in to access your projects',
      backToHome: 'Back to Home',
      betaAlert: '⚠️ Free Beta version for one month',
      supportProject: 'Support the Project',
      supportDesc: 'Your donation is optional and helps us develop the platform and add new features',
      donateBtn: 'Donate Now',
      donateComingSoon: 'Payment gateway coming soon',
    },
  };

  const text = t[language];
  const Arrow = isRTL ? ArrowRight : ArrowLeft;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        await login(email, password);
        toast.success(language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Logged in successfully');
      } else {
        await register(email, password, name);
        toast.success(language === 'ar' ? 'تم إنشاء الحساب بنجاح' : 'Account created successfully');
      }
      navigate('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'حدث خطأ';
      setError(message);
      toast.error(message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      toast.error(language === 'ar' ? 'فشل تسجيل الدخول بـ Google' : 'Google login failed');
    }
  };

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub();
      navigate('/dashboard');
    } catch (err) {
      toast.error(language === 'ar' ? 'فشل تسجيل الدخول بـ GitHub' : 'GitHub login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          {/* Back to Home */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <Arrow className="w-4 h-4" />
            {text.backToHome}
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Ntfly</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {mode === 'login' ? text.welcomeBack : text.welcome + ' Ntfly'}
            </h1>
            <p className="text-muted-foreground">
              {mode === 'login' ? text.loginDesc : text.createAccountDesc}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name">{text.name}</Label>
                <div className="relative">
                  <User className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="ps-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{text.email}</Label>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ps-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{text.password}</Label>
              <div className="relative">
                <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ps-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button 
              type="submit" 
              variant="hero" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : mode === 'login' ? (
                text.loginBtn
              ) : (
                text.registerBtn
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">
                {text.orContinueWith}
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {text.google}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleGithubLogin}
              disabled={isLoading}
              className="w-full"
            >
              <Github className="w-5 h-5" />
              {text.github}
            </Button>
          </div>

          {/* Toggle Mode */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === 'login' ? text.noAccount : text.hasAccount}{' '}
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-primary font-medium hover:underline"
            >
              {mode === 'login' ? text.createAccount : text.loginNow}
            </button>
          </p>


          {/* Beta Alert */}
          <Alert className="mt-6 border-amber-500/50 bg-amber-500/10">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-amber-600 dark:text-amber-400 font-medium">
              {text.betaAlert}
            </AlertDescription>
          </Alert>

          {/* Donations Section */}
          <div className="mt-6 p-5 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">{text.supportProject}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {text.supportDesc}
            </p>
            <Button 
              variant="outline" 
              className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary/50"
              onClick={() => {
                // Placeholder for future payment integration
                alert(text.donateComingSoon);
              }}
            >
              <Heart className="w-4 h-4 me-2" />
              {text.donateBtn}
            </Button>
            {/* Payment Integration Placeholder */}
            {/* TODO: Integrate payment gateway (Stripe, PayPal, etc.) here */}
          </div>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-1 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 start-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl float" />
        <div className="absolute bottom-1/4 end-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 end-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl float" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 flex flex-col items-center justify-center w-full text-white text-center p-12">
          <div className="w-24 h-24 rounded-3xl bg-white/20 flex items-center justify-center mb-8 pulse-glow">
            <Zap className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'أنشئ موقعك بالذكاء الاصطناعي' : 'Build Your Website with AI'}
          </h2>
          <p className="text-lg text-white/80 max-w-md">
            {language === 'ar' 
              ? 'انضم إلى آلاف المستخدمين الذين يبنون مواقعهم الاحترافية في دقائق'
              : 'Join thousands of users building professional websites in minutes'}
          </p>
        </div>
      </div>
    </div>
  );
}
