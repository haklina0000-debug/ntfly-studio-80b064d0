import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { getProjectById, downloadProjectAsZip, GeneratedProject } from '@/lib/projectGenerator';
import { 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  Loader2,
  AlertCircle,
  Home,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { toast } from 'sonner';

type ViewMode = 'desktop' | 'tablet' | 'mobile';

export default function Preview() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { language } = useTheme();
  const { isAuthenticated } = useAuth();
  
  const [project, setProject] = useState<GeneratedProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [isDownloading, setIsDownloading] = useState(false);

  const t = {
    ar: {
      loading: 'جاري تحميل المعاينة...',
      notFound: 'المشروع غير موجود',
      notFoundDesc: 'لم نتمكن من العثور على هذا المشروع. قد يكون محذوفاً أو الرابط غير صحيح.',
      backToBuilder: 'العودة لمنشئ المواقع',
      backToDashboard: 'العودة للوحة التحكم',
      download: 'تحميل ZIP',
      downloading: 'جاري التحضير...',
      openNew: 'فتح في نافذة جديدة',
      preview: 'معاينة',
      desktop: 'سطح المكتب',
      tablet: 'جهاز لوحي',
      mobile: 'هاتف',
      downloadSuccess: 'تم تحميل الملفات بنجاح!',
      loginRequired: 'يرجى تسجيل الدخول أولاً',
    },
    en: {
      loading: 'Loading preview...',
      notFound: 'Project not found',
      notFoundDesc: 'We couldn\'t find this project. It may have been deleted or the link is incorrect.',
      backToBuilder: 'Back to Builder',
      backToDashboard: 'Back to Dashboard',
      download: 'Download ZIP',
      downloading: 'Preparing...',
      openNew: 'Open in new tab',
      preview: 'Preview',
      desktop: 'Desktop',
      tablet: 'Tablet',
      mobile: 'Mobile',
      downloadSuccess: 'Files downloaded successfully!',
      loginRequired: 'Please login first',
    },
  };

  const text = t[language];
  const isRTL = language === 'ar';
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  useEffect(() => {
    if (!projectId) {
      setError('no_id');
      setLoading(false);
      return;
    }

    const loadedProject = getProjectById(projectId);
    if (loadedProject) {
      setProject(loadedProject);
    } else {
      setError('not_found');
    }
    setLoading(false);
  }, [projectId]);

  const handleDownload = async () => {
    if (!project) return;
    
    setIsDownloading(true);
    try {
      await downloadProjectAsZip(project);
      toast.success(text.downloadSuccess);
    } catch (err) {
      toast.error(language === 'ar' ? 'فشل التحميل' : 'Download failed');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOpenNewTab = () => {
    if (!project) return;
    
    const html = project.files['index.html'];
    const css = project.files['styles.css'];
    const js = project.files['script.js'];
    
    // Inject CSS and JS inline for new tab
    const fullHtml = html
      .replace('</head>', `<style>${css}</style></head>`)
      .replace('</body>', `<script>${js}</script></body>`);
    
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      default: return 'w-full';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">{text.loading}</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{text.notFound}</h1>
          <p className="text-muted-foreground mb-6">{text.notFoundDesc}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="outline">
              <Link to="/builder">
                <BackIcon className="w-4 h-4" />
                {text.backToBuilder}
              </Link>
            </Button>
            {isAuthenticated && (
              <Button asChild>
                <Link to="/dashboard">
                  <Home className="w-4 h-4" />
                  {text.backToDashboard}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Generate preview HTML with inline styles
  const previewHtml = project.files['index.html']
    .replace('</head>', `<style>${project.files['styles.css']}</style></head>`)
    .replace('</body>', `<script>${project.files['script.js']}</script></body>`);

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Back & Title */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
              >
                <BackIcon className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="font-semibold">{project.data.name}</h1>
                <p className="text-xs text-muted-foreground">{text.preview}</p>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'desktop' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('desktop')}
                title={text.desktop}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'tablet' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('tablet')}
                title={text.tablet}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mobile')}
                title={text.mobile}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenNewTab}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">{text.openNew}</span>
              </Button>
              <Button
                variant="hero"
                size="sm"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {isDownloading ? text.downloading : text.download}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Frame */}
      <main className="flex-1 p-4 overflow-auto">
        <div className={`mx-auto ${getPreviewWidth()} h-full`}>
          <div className="bg-background rounded-lg shadow-xl overflow-hidden h-[calc(100vh-120px)]">
            <iframe
              srcDoc={previewHtml}
              className="w-full h-full border-0"
              title={project.data.name}
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
