import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { 
  Users, 
  FolderOpen, 
  Settings, 
  Key,
  Save,
  Shield,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  Flame,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  RefreshCw,
  Database,
  History,
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  saveFirebaseConfig, 
  decryptFirebaseConfig, 
  hasFirebaseConfig,
  type FirebaseConfig 
} from '@/lib/firebaseConfig';
import { 
  saveAIKeysConfig, 
  decryptAIKeysConfig, 
  hasAIKeysConfig,
  defaultAIKeysConfig,
  type AIKeysConfig 
} from '@/lib/aiKeysConfig';
import { getLoginHistory, clearLoginHistory, type LoginRecord } from '@/lib/loginTracker';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { language } = useTheme();

  // AI Settings State
  const [aiSettings, setAiSettings] = useState<AIKeysConfig>(defaultAIKeysConfig);
  const [aiPassphrase, setAiPassphrase] = useState('');
  const [showAiPassphrase, setShowAiPassphrase] = useState(false);
  const [aiConfigLoaded, setAiConfigLoaded] = useState(false);

  // Firebase Settings State
  const [firebaseSettings, setFirebaseSettings] = useState<FirebaseConfig>({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  });
  const [firebasePassphrase, setFirebasePassphrase] = useState('');
  const [showFirebasePassphrase, setShowFirebasePassphrase] = useState(false);
  const [firebaseConfigLoaded, setFirebaseConfigLoaded] = useState(false);

  // Login History State
  const [loginHistory, setLoginHistory] = useState<LoginRecord[]>([]);

  const t = {
    ar: {
      title: 'لوحة تحكم الأدمن',
      overview: 'نظرة عامة',
      users: 'المستخدمين',
      projects: 'المشاريع',
      feedback: 'الآراء والاقتراحات',
      aiSettings: 'إعدادات AI',
      firebaseSettings: 'إعدادات Firebase',
      loginHistory: 'سجل الدخول',
      stats: {
        totalUsers: 'إجمالي المستخدمين',
        activeUsers: 'المستخدمين النشطين',
        totalProjects: 'إجمالي المشاريع',
        completedProjects: 'مشاريع مكتملة',
        pendingProjects: 'مشاريع معلقة',
        failedProjects: 'مشاريع فاشلة',
      },
      apiKey: 'مفتاح API',
      enabled: 'مفعل',
      save: 'حفظ مشفر',
      decrypt: 'فك التشفير',
      saveSuccess: 'تم حفظ الإعدادات بنجاح (مشفرة)',
      decryptSuccess: 'تم فك التشفير بنجاح',
      decryptError: 'فشل فك التشفير - تحقق من عبارة المرور',
      passphrase: 'عبارة المرور (لن تُخزن)',
      passphraseHint: 'أدخل عبارة مرور قوية لتشفير البيانات',
      noPassphrase: 'يرجى إدخال عبارة المرور أولاً',
      hasConfig: 'يوجد تكوين محفوظ',
      noConfig: 'لا يوجد تكوين محفوظ',
      providers: {
        chatgpt: 'ChatGPT (OpenAI)',
        gemini: 'Gemini (Google)',
        claude: 'Claude (Anthropic)',
        sonnet: 'Sonnet (Anthropic)',
      },
      firebase: {
        apiKey: 'API Key',
        authDomain: 'Auth Domain',
        projectId: 'Project ID',
        storageBucket: 'Storage Bucket',
        messagingSenderId: 'Messaging Sender ID',
        appId: 'App ID',
        measurementId: 'Measurement ID (اختياري)',
      },
      history: {
        noRecords: 'لا توجد سجلات دخول',
        clearHistory: 'مسح السجل',
        email: 'البريد الإلكتروني',
        time: 'الوقت',
        type: 'النوع',
        dashboard: 'لوحة التحكم',
        admin: 'صفحة الأدمن',
      },
    },
    en: {
      title: 'Admin Dashboard',
      overview: 'Overview',
      users: 'Users',
      projects: 'Projects',
      feedback: 'Feedback',
      aiSettings: 'AI Settings',
      firebaseSettings: 'Firebase Settings',
      loginHistory: 'Login History',
      stats: {
        totalUsers: 'Total Users',
        activeUsers: 'Active Users',
        totalProjects: 'Total Projects',
        completedProjects: 'Completed Projects',
        pendingProjects: 'Pending Projects',
        failedProjects: 'Failed Projects',
      },
      apiKey: 'API Key',
      enabled: 'Enabled',
      save: 'Save Encrypted',
      decrypt: 'Decrypt',
      saveSuccess: 'Settings saved successfully (encrypted)',
      decryptSuccess: 'Decryption successful',
      decryptError: 'Decryption failed - check passphrase',
      passphrase: 'Passphrase (not stored)',
      passphraseHint: 'Enter a strong passphrase to encrypt data',
      noPassphrase: 'Please enter passphrase first',
      hasConfig: 'Config exists',
      noConfig: 'No config saved',
      providers: {
        chatgpt: 'ChatGPT (OpenAI)',
        gemini: 'Gemini (Google)',
        claude: 'Claude (Anthropic)',
        sonnet: 'Sonnet (Anthropic)',
      },
      firebase: {
        apiKey: 'API Key',
        authDomain: 'Auth Domain',
        projectId: 'Project ID',
        storageBucket: 'Storage Bucket',
        messagingSenderId: 'Messaging Sender ID',
        appId: 'App ID',
        measurementId: 'Measurement ID (optional)',
      },
      history: {
        noRecords: 'No login records',
        clearHistory: 'Clear History',
        email: 'Email',
        time: 'Time',
        type: 'Type',
        dashboard: 'Dashboard',
        admin: 'Admin Page',
      },
    },
  };

  const text = t[language];

  const [activeTab, setActiveTab] = useState('overview');

  // Load login history on mount
  useEffect(() => {
    setLoginHistory(getLoginHistory());
  }, []);

  const stats = [
    { label: text.stats.totalUsers, value: 156, icon: Users, color: 'text-primary' },
    { label: text.stats.activeUsers, value: 89, icon: TrendingUp, color: 'text-green-500' },
    { label: text.stats.totalProjects, value: 342, icon: FolderOpen, color: 'text-ntfly-purple' },
    { label: text.stats.completedProjects, value: 256, icon: CheckCircle2, color: 'text-green-500' },
    { label: text.stats.pendingProjects, value: 67, icon: Clock, color: 'text-yellow-500' },
    { label: text.stats.failedProjects, value: 19, icon: AlertCircle, color: 'text-destructive' },
  ];

  // AI Settings Handlers
  const handleSaveAiSettings = async () => {
    if (!aiPassphrase) {
      toast.error(text.noPassphrase);
      return;
    }
    try {
      await saveAIKeysConfig(aiSettings, aiPassphrase);
      toast.success(text.saveSuccess);
      setAiConfigLoaded(true);
    } catch (e) {
      toast.error('Error saving AI settings');
      console.error(e);
    }
  };

  const handleDecryptAiSettings = async () => {
    if (!aiPassphrase) {
      toast.error(text.noPassphrase);
      return;
    }
    try {
      const config = await decryptAIKeysConfig(aiPassphrase);
      if (config) {
        setAiSettings(config);
        setAiConfigLoaded(true);
        toast.success(text.decryptSuccess);
      } else {
        toast.error(text.decryptError);
      }
    } catch (e) {
      toast.error(text.decryptError);
      console.error(e);
    }
  };

  const updateAiSetting = (provider: keyof AIKeysConfig, field: 'key' | 'enabled', value: string | boolean) => {
    setAiSettings(prev => ({
      ...prev,
      [provider]: {
        ...prev[provider],
        [field]: value,
      },
    }));
  };

  // Firebase Settings Handlers
  const handleSaveFirebaseSettings = async () => {
    if (!firebasePassphrase) {
      toast.error(text.noPassphrase);
      return;
    }
    try {
      await saveFirebaseConfig(firebaseSettings, firebasePassphrase);
      toast.success(text.saveSuccess);
      setFirebaseConfigLoaded(true);
    } catch (e) {
      toast.error('Error saving Firebase settings');
      console.error(e);
    }
  };

  const handleDecryptFirebaseSettings = async () => {
    if (!firebasePassphrase) {
      toast.error(text.noPassphrase);
      return;
    }
    try {
      const config = await decryptFirebaseConfig(firebasePassphrase);
      if (config) {
        setFirebaseSettings(config);
        setFirebaseConfigLoaded(true);
        toast.success(text.decryptSuccess);
      } else {
        toast.error(text.decryptError);
      }
    } catch (e) {
      toast.error(text.decryptError);
      console.error(e);
    }
  };

  const updateFirebaseSetting = (field: keyof FirebaseConfig, value: string) => {
    setFirebaseSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Login History Handlers
  const handleClearLoginHistory = () => {
    clearLoginHistory();
    setLoginHistory([]);
    toast.success(language === 'ar' ? 'تم مسح السجل' : 'History cleared');
  };

  const tabs = [
    { id: 'overview', label: text.overview, icon: TrendingUp },
    { id: 'users', label: text.users, icon: Users },
    { id: 'projects', label: text.projects, icon: FolderOpen },
    { id: 'feedback', label: text.feedback, icon: MessageSquare },
    { id: 'ai-settings', label: text.aiSettings, icon: Sparkles },
    { id: 'firebase-settings', label: text.firebaseSettings, icon: Flame },
    { id: 'login-history', label: text.loginHistory, icon: History },
  ];

  return (
    <MainLayout showFooter={false}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{text.title}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className="gap-2"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 rounded-2xl bg-card border border-border card-hover">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  <span className="text-3xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="rounded-2xl bg-card border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">{text.users}</h2>
            <div className="space-y-4">
              {[
                { name: 'أحمد محمد', email: 'ahmed@example.com', projects: 5, status: 'active' },
                { name: 'سارة خالد', email: 'sara@example.com', projects: 3, status: 'active' },
                { name: 'محمد علي', email: 'mohamed@example.com', projects: 8, status: 'inactive' },
              ].map((u, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-sm text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{u.projects} {language === 'ar' ? 'مشاريع' : 'projects'}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${u.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'}`}>
                      {u.status === 'active' ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'غير نشط' : 'Inactive')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Settings Tab */}
        {activeTab === 'ai-settings' && (
          <div className="rounded-2xl bg-card border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-ntfly-cyan/10 flex items-center justify-center">
                <Key className="w-5 h-5 text-ntfly-cyan" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{text.aiSettings}</h2>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'إدارة مفاتيح API للذكاء الاصطناعي (مشفرة)' : 'Manage AI API keys (encrypted)'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {hasAIKeysConfig() ? (
                  <span className="flex items-center gap-1 text-sm text-green-500">
                    <Lock className="w-4 h-4" />
                    {text.hasConfig}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Unlock className="w-4 h-4" />
                    {text.noConfig}
                  </span>
                )}
              </div>
            </div>

            {/* Passphrase Input */}
            <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border">
              <Label className="text-sm font-medium">{text.passphrase}</Label>
              <p className="text-xs text-muted-foreground mb-2">{text.passphraseHint}</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type={showAiPassphrase ? 'text' : 'password'}
                    value={aiPassphrase}
                    onChange={(e) => setAiPassphrase(e.target.value)}
                    placeholder="••••••••••••"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowAiPassphrase(!showAiPassphrase)}
                  >
                    {showAiPassphrase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {hasAIKeysConfig() && (
                  <Button variant="outline" onClick={handleDecryptAiSettings}>
                    <Unlock className="w-4 h-4 mr-2" />
                    {text.decrypt}
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {(Object.keys(aiSettings) as Array<keyof AIKeysConfig>).map(provider => (
                <div key={provider} className="p-4 rounded-xl bg-muted/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">{text.providers[provider]}</Label>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`${provider}-enabled`} className="text-sm text-muted-foreground">
                        {text.enabled}
                      </Label>
                      <Switch
                        id={`${provider}-enabled`}
                        checked={aiSettings[provider].enabled}
                        onCheckedChange={(checked) => updateAiSetting(provider, 'enabled', checked)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${provider}-key`}>{text.apiKey}</Label>
                    <Input
                      id={`${provider}-key`}
                      type="password"
                      value={aiSettings[provider].key}
                      onChange={(e) => updateAiSetting(provider, 'key', e.target.value)}
                      placeholder="sk-..."
                      className="font-mono"
                    />
                  </div>
                </div>
              ))}

              <Button variant="hero" onClick={handleSaveAiSettings} className="w-full sm:w-auto">
                <Save className="w-5 h-5" />
                {text.save}
              </Button>
            </div>
          </div>
        )}

        {/* Firebase Settings Tab */}
        {activeTab === 'firebase-settings' && (
          <div className="rounded-2xl bg-card border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{text.firebaseSettings}</h2>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'إعدادات Firebase مشفرة بالكامل' : 'Fully encrypted Firebase settings'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {hasFirebaseConfig() ? (
                  <span className="flex items-center gap-1 text-sm text-green-500">
                    <Lock className="w-4 h-4" />
                    {text.hasConfig}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Unlock className="w-4 h-4" />
                    {text.noConfig}
                  </span>
                )}
              </div>
            </div>

            {/* Passphrase Input */}
            <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border">
              <Label className="text-sm font-medium">{text.passphrase}</Label>
              <p className="text-xs text-muted-foreground mb-2">{text.passphraseHint}</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type={showFirebasePassphrase ? 'text' : 'password'}
                    value={firebasePassphrase}
                    onChange={(e) => setFirebasePassphrase(e.target.value)}
                    placeholder="••••••••••••"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowFirebasePassphrase(!showFirebasePassphrase)}
                  >
                    {showFirebasePassphrase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {hasFirebaseConfig() && (
                  <Button variant="outline" onClick={handleDecryptFirebaseSettings}>
                    <Unlock className="w-4 h-4 mr-2" />
                    {text.decrypt}
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {(Object.keys(text.firebase) as Array<keyof typeof text.firebase>).map((field) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={`firebase-${field}`}>{text.firebase[field]}</Label>
                  <Input
                    id={`firebase-${field}`}
                    type={field === 'apiKey' ? 'password' : 'text'}
                    value={firebaseSettings[field as keyof FirebaseConfig] || ''}
                    onChange={(e) => updateFirebaseSetting(field as keyof FirebaseConfig, e.target.value)}
                    placeholder={field === 'apiKey' ? 'AIza...' : `your-${field}`}
                    className="font-mono"
                  />
                </div>
              ))}

              <Button variant="hero" onClick={handleSaveFirebaseSettings} className="w-full sm:w-auto mt-6">
                <Save className="w-5 h-5" />
                {text.save}
              </Button>
            </div>
          </div>
        )}

        {/* Login History Tab */}
        {activeTab === 'login-history' && (
          <div className="rounded-2xl bg-card border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <History className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{text.loginHistory}</h2>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? `${loginHistory.length} سجل دخول` : `${loginHistory.length} login records`}
                  </p>
                </div>
              </div>
              {loginHistory.length > 0 && (
                <Button variant="outline" size="sm" onClick={handleClearLoginHistory}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {text.history.clearHistory}
                </Button>
              )}
            </div>

            {loginHistory.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{text.history.noRecords}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {loginHistory.slice().reverse().map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        record.type === 'admin' ? 'bg-orange-500/10' : 'bg-primary/10'
                      }`}>
                        {record.type === 'admin' ? (
                          <Shield className="w-5 h-5 text-orange-500" />
                        ) : (
                          <Users className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{record.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(record.timestamp).toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      record.type === 'admin' 
                        ? 'bg-orange-500/10 text-orange-500' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {record.type === 'admin' ? text.history.admin : text.history.dashboard}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="rounded-2xl bg-card border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">{text.projects}</h2>
            <p className="text-muted-foreground">{language === 'ar' ? 'قائمة جميع المشاريع...' : 'All projects list...'}</p>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="rounded-2xl bg-card border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">{text.feedback}</h2>
            <p className="text-muted-foreground">{language === 'ar' ? 'آراء واقتراحات المستخدمين...' : 'User feedback and suggestions...'}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
