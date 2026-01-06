import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { 
  Zap, 
  Plus, 
  FolderOpen, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { language } = useTheme();
  const navigate = useNavigate();

  const t = {
    ar: {
      welcome: 'مرحباً',
      dashboard: 'لوحة التحكم',
      createProject: 'مشروع جديد',
      myProjects: 'مشاريعي',
      recentProjects: 'المشاريع الأخيرة',
      noProjects: 'لا توجد مشاريع بعد',
      noProjectsDesc: 'ابدأ بإنشاء مشروعك الأول',
      startBuilding: 'ابدأ البناء',
      stats: {
        total: 'إجمالي المشاريع',
        completed: 'مكتملة',
        inProgress: 'قيد التنفيذ',
        pending: 'معلقة',
      },
      quickActions: 'إجراءات سريعة',
      newWebsite: 'موقع جديد',
      viewTemplates: 'عرض القوالب',
      aiAssistant: 'مساعد الذكاء الاصطناعي',
    },
    en: {
      welcome: 'Welcome',
      dashboard: 'Dashboard',
      createProject: 'New Project',
      myProjects: 'My Projects',
      recentProjects: 'Recent Projects',
      noProjects: 'No projects yet',
      noProjectsDesc: 'Start by creating your first project',
      startBuilding: 'Start Building',
      stats: {
        total: 'Total Projects',
        completed: 'Completed',
        inProgress: 'In Progress',
        pending: 'Pending',
      },
      quickActions: 'Quick Actions',
      newWebsite: 'New Website',
      viewTemplates: 'View Templates',
      aiAssistant: 'AI Assistant',
    },
  };

  const text = t[language];

  // Mock data
  const stats = [
    { label: text.stats.total, value: 3, icon: FolderOpen, color: 'text-primary' },
    { label: text.stats.completed, value: 1, icon: CheckCircle2, color: 'text-green-500' },
    { label: text.stats.inProgress, value: 1, icon: Clock, color: 'text-yellow-500' },
    { label: text.stats.pending, value: 1, icon: AlertCircle, color: 'text-muted-foreground' },
  ];

  const projects = [
    { id: 1, name: 'موقع شركة التقنية', status: 'completed', date: '2024-01-05' },
    { id: 2, name: 'متجر إلكتروني', status: 'in_progress', date: '2024-01-04' },
    { id: 3, name: 'صفحة هبوط', status: 'pending', date: '2024-01-03' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs">{language === 'ar' ? 'مكتمل' : 'Completed'}</span>;
      case 'in_progress':
        return <span className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs">{language === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</span>;
      default:
        return <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs">{language === 'ar' ? 'معلق' : 'Pending'}</span>;
    }
  };

  return (
    <MainLayout showFooter={false}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">{text.welcome}، {user?.name} 👋</h1>
            <p className="text-muted-foreground">{text.dashboard}</p>
          </div>
          <Link to="/builder">
            <Button variant="hero">
              <Plus className="w-5 h-5" />
              {text.createProject}
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 rounded-2xl bg-card border border-border card-hover">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-card border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">{text.recentProjects}</h2>
                <Link to="/projects" className="text-sm text-primary hover:underline flex items-center gap-1">
                  {text.myProjects}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {projects.length > 0 ? (
                <div className="space-y-4">
                  {projects.map(project => (
                    <div 
                      key={project.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg gradient-bg-subtle flex items-center justify-center">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-muted-foreground">{project.date}</p>
                        </div>
                      </div>
                      {getStatusBadge(project.status)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
                    <FolderOpen className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium mb-2">{text.noProjects}</p>
                  <p className="text-sm text-muted-foreground mb-4">{text.noProjectsDesc}</p>
                  <Link to="/builder">
                    <Button variant="hero">{text.startBuilding}</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="rounded-2xl bg-card border border-border p-6">
              <h2 className="text-lg font-semibold mb-6">{text.quickActions}</h2>
              <div className="space-y-3">
                <Link to="/builder" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <span>{text.newWebsite}</span>
                  </Button>
                </Link>
                <Link to="/templates" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                    <div className="w-10 h-10 rounded-lg bg-ntfly-purple/10 flex items-center justify-center">
                      <FolderOpen className="w-5 h-5 text-ntfly-purple" />
                    </div>
                    <span>{text.viewTemplates}</span>
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                  <div className="w-10 h-10 rounded-lg bg-ntfly-cyan/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-ntfly-cyan" />
                  </div>
                  <span>{text.aiAssistant}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
