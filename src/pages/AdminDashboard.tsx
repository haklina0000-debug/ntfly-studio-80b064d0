import React, { useState } from 'react';
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
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { language } = useTheme();

  const [aiSettings, setAiSettings] = useState({
    chatgpt: { key: '', enabled: false },
    gemini: { key: '', enabled: false },
    claude: { key: '', enabled: false },
    sonnet: { key: '', enabled: false },
  });

  const t = {
    ar: {
      title: 'لوحة تحكم الأدمن',
      overview: 'نظرة عامة',
      users: 'المستخدمين',
      projects: 'المشاريع',
      feedback: 'الآراء والاقتراحات',
      aiSettings: 'إعدادات الذكاء الاصطناعي',
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
      save: 'حفظ الإعدادات',
      saveSuccess: 'تم حفظ الإعدادات بنجاح',
      providers: {
        chatgpt: 'ChatGPT (OpenAI)',
        gemini: 'Gemini (Google)',
        claude: 'Claude (Anthropic)',
        sonnet: 'Sonnet (Anthropic)',
      },
    },
    en: {
      title: 'Admin Dashboard',
      overview: 'Overview',
      users: 'Users',
      projects: 'Projects',
      feedback: 'Feedback',
      aiSettings: 'AI Settings',
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
      save: 'Save Settings',
      saveSuccess: 'Settings saved successfully',
      providers: {
        chatgpt: 'ChatGPT (OpenAI)',
        gemini: 'Gemini (Google)',
        claude: 'Claude (Anthropic)',
        sonnet: 'Sonnet (Anthropic)',
      },
    },
  };

  const text = t[language];

  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: text.stats.totalUsers, value: 156, icon: Users, color: 'text-primary' },
    { label: text.stats.activeUsers, value: 89, icon: TrendingUp, color: 'text-green-500' },
    { label: text.stats.totalProjects, value: 342, icon: FolderOpen, color: 'text-ntfly-purple' },
    { label: text.stats.completedProjects, value: 256, icon: CheckCircle2, color: 'text-green-500' },
    { label: text.stats.pendingProjects, value: 67, icon: Clock, color: 'text-yellow-500' },
    { label: text.stats.failedProjects, value: 19, icon: AlertCircle, color: 'text-destructive' },
  ];

  const handleSaveAiSettings = () => {
    // In production, this would save to Firestore
    toast.success(text.saveSuccess);
  };

  const updateAiSetting = (provider: keyof typeof aiSettings, field: 'key' | 'enabled', value: string | boolean) => {
    setAiSettings(prev => ({
      ...prev,
      [provider]: {
        ...prev[provider],
        [field]: value,
      },
    }));
  };

  const tabs = [
    { id: 'overview', label: text.overview, icon: TrendingUp },
    { id: 'users', label: text.users, icon: Users },
    { id: 'projects', label: text.projects, icon: FolderOpen },
    { id: 'feedback', label: text.feedback, icon: MessageSquare },
    { id: 'ai-settings', label: text.aiSettings, icon: Sparkles },
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

        {activeTab === 'ai-settings' && (
          <div className="rounded-2xl bg-card border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-ntfly-cyan/10 flex items-center justify-center">
                <Key className="w-5 h-5 text-ntfly-cyan" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{text.aiSettings}</h2>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'إدارة مفاتيح API للذكاء الاصطناعي' : 'Manage AI API keys'}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {(Object.keys(aiSettings) as Array<keyof typeof aiSettings>).map(provider => (
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
