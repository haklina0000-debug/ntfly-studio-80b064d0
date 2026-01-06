import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export interface ProjectData {
  name: string;
  type: 'business' | 'ecommerce' | 'portfolio' | 'landing';
  description: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface GeneratedProject {
  id: string;
  data: ProjectData;
  files: Record<string, string>;
  createdAt: Date;
}

// Generate unique project ID
function generateProjectId(): string {
  return `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Generate HTML template based on project type
function generateHTML(data: ProjectData): string {
  const { name, type, description, primaryColor, secondaryColor } = data;
  
  const sections = {
    business: `
      <section class="hero">
        <h1>مرحباً بكم في ${name}</h1>
        <p>${description}</p>
        <a href="#contact" class="btn">تواصل معنا</a>
      </section>
      <section class="services" id="services">
        <h2>خدماتنا</h2>
        <div class="grid">
          <div class="card"><h3>خدمة 1</h3><p>وصف الخدمة الأولى</p></div>
          <div class="card"><h3>خدمة 2</h3><p>وصف الخدمة الثانية</p></div>
          <div class="card"><h3>خدمة 3</h3><p>وصف الخدمة الثالثة</p></div>
        </div>
      </section>
      <section class="about" id="about">
        <h2>من نحن</h2>
        <p>نحن شركة متخصصة في تقديم أفضل الحلول والخدمات.</p>
      </section>`,
    ecommerce: `
      <section class="hero">
        <h1>متجر ${name}</h1>
        <p>${description}</p>
        <a href="#products" class="btn">تسوق الآن</a>
      </section>
      <section class="products" id="products">
        <h2>منتجاتنا</h2>
        <div class="grid">
          <div class="product-card"><div class="product-img"></div><h3>منتج 1</h3><p class="price">99 ر.س</p></div>
          <div class="product-card"><div class="product-img"></div><h3>منتج 2</h3><p class="price">149 ر.س</p></div>
          <div class="product-card"><div class="product-img"></div><h3>منتج 3</h3><p class="price">199 ر.س</p></div>
        </div>
      </section>`,
    portfolio: `
      <section class="hero">
        <h1>${name}</h1>
        <p>${description}</p>
        <a href="#works" class="btn">استعرض أعمالي</a>
      </section>
      <section class="works" id="works">
        <h2>أعمالي</h2>
        <div class="grid">
          <div class="work-card"><div class="work-img"></div><h3>مشروع 1</h3></div>
          <div class="work-card"><div class="work-img"></div><h3>مشروع 2</h3></div>
          <div class="work-card"><div class="work-img"></div><h3>مشروع 3</h3></div>
        </div>
      </section>
      <section class="skills" id="skills">
        <h2>مهاراتي</h2>
        <div class="skills-list">
          <span class="skill">HTML</span>
          <span class="skill">CSS</span>
          <span class="skill">JavaScript</span>
          <span class="skill">React</span>
        </div>
      </section>`,
    landing: `
      <section class="hero">
        <h1>${name}</h1>
        <p>${description}</p>
        <a href="#signup" class="btn">ابدأ الآن</a>
      </section>
      <section class="features" id="features">
        <h2>المميزات</h2>
        <div class="grid">
          <div class="feature"><h3>ميزة 1</h3><p>وصف الميزة الأولى</p></div>
          <div class="feature"><h3>ميزة 2</h3><p>وصف الميزة الثانية</p></div>
          <div class="feature"><h3>ميزة 3</h3><p>وصف الميزة الثالثة</p></div>
        </div>
      </section>
      <section class="cta" id="signup">
        <h2>سجل الآن</h2>
        <form class="signup-form">
          <input type="email" placeholder="بريدك الإلكتروني" required>
          <button type="submit" class="btn">اشترك</button>
        </form>
      </section>`,
  };

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <title>${name}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <a href="#" class="logo">${name}</a>
      <ul class="nav-links">
        <li><a href="#about">من نحن</a></li>
        <li><a href="#services">الخدمات</a></li>
        <li><a href="#contact">تواصل</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    ${sections[type]}
  </main>
  
  <section class="contact" id="contact">
    <h2>تواصل معنا</h2>
    <form class="contact-form">
      <input type="text" placeholder="الاسم" required>
      <input type="email" placeholder="البريد الإلكتروني" required>
      <textarea placeholder="رسالتك" required></textarea>
      <button type="submit" class="btn">إرسال</button>
    </form>
  </section>
  
  <footer>
    <p>&copy; ${new Date().getFullYear()} ${name}. جميع الحقوق محفوظة.</p>
    <p>تم الإنشاء بواسطة <a href="https://ntfly.com">Ntfly</a></p>
  </footer>
  
  <script src="script.js"></script>
</body>
</html>`;
}

// Generate CSS styles
function generateCSS(data: ProjectData): string {
  const { primaryColor, secondaryColor } = data;
  
  return `/* ========================================
   ${data.name} - Generated by Ntfly
   ======================================== */

:root {
  --primary: ${primaryColor};
  --secondary: ${secondaryColor};
  --text: #1a1a2e;
  --text-light: #666;
  --bg: #ffffff;
  --bg-alt: #f8f9fa;
  --border: #e0e0e0;
  --shadow: 0 4px 20px rgba(0,0,0,0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text);
  background: var(--bg);
  line-height: 1.6;
}

/* Navigation */
header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow);
  z-index: 1000;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--primary);
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.25rem;
  max-width: 600px;
  margin-bottom: 2rem;
  opacity: 0.9;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: white;
  color: var(--primary);
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

/* Sections */
section {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text);
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Cards */
.card, .product-card, .work-card, .feature {
  background: var(--bg);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: var(--shadow);
  transition: transform 0.3s;
  text-align: center;
}

.card:hover, .product-card:hover, .work-card:hover, .feature:hover {
  transform: translateY(-5px);
}

.card h3, .product-card h3, .work-card h3, .feature h3 {
  color: var(--primary);
  margin-bottom: 1rem;
}

/* Product specific */
.product-img, .work-img {
  height: 200px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 12px;
  margin-bottom: 1rem;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--secondary);
}

/* Skills */
.skills-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.skill {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border-radius: 50px;
  font-weight: 500;
}

/* Contact Form */
.contact {
  background: var(--bg-alt);
}

.contact-form, .signup-form {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form input,
.contact-form textarea,
.signup-form input {
  padding: 1rem;
  border: 2px solid var(--border);
  border-radius: 12px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.contact-form input:focus,
.contact-form textarea:focus,
.signup-form input:focus {
  outline: none;
  border-color: var(--primary);
}

.contact-form .btn,
.signup-form .btn {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
}

/* Footer */
footer {
  text-align: center;
  padding: 2rem;
  background: var(--text);
  color: white;
}

footer a {
  color: var(--primary);
}

/* Responsive */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .nav-links {
    display: none;
  }
  
  section h2 {
    font-size: 1.75rem;
  }
}`;
}

// Generate JavaScript
function generateJS(data: ProjectData): string {
  return `// ========================================
// ${data.name} - Generated by Ntfly
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Form submission handling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('شكراً لك! تم استلام رسالتك بنجاح.');
      form.reset();
    });
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .product-card, .work-card, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});`;
}

// Generate README
function generateREADME(data: ProjectData): string {
  return `# ${data.name}

تم إنشاء هذا الموقع بواسطة [Ntfly](https://ntfly.com) - منصة إنشاء المواقع بالذكاء الاصطناعي.

## نوع الموقع
${data.type === 'business' ? 'موقع شركة' : 
  data.type === 'ecommerce' ? 'متجر إلكتروني' : 
  data.type === 'portfolio' ? 'معرض أعمال' : 'صفحة هبوط'}

## الوصف
${data.description}

## الألوان
- اللون الرئيسي: ${data.primaryColor}
- اللون الثانوي: ${data.secondaryColor}

## التشغيل
1. افتح ملف \`index.html\` في المتصفح
2. أو ارفع الملفات على أي استضافة

## الملفات
- \`index.html\` - الصفحة الرئيسية
- \`styles.css\` - أنماط التصميم
- \`script.js\` - الوظائف التفاعلية

## الدعم
للمساعدة، تواصل معنا عبر [Ntfly](https://ntfly.com)

---
© ${new Date().getFullYear()} Ntfly Digital
`;
}

// Generate project files
export function generateProjectFiles(data: ProjectData): GeneratedProject {
  const project: GeneratedProject = {
    id: generateProjectId(),
    data,
    files: {
      'index.html': generateHTML(data),
      'styles.css': generateCSS(data),
      'script.js': generateJS(data),
      'README.md': generateREADME(data),
    },
    createdAt: new Date(),
  };

  // Store in localStorage for persistence
  const projects = JSON.parse(localStorage.getItem('ntfly_projects') || '[]');
  projects.push({
    id: project.id,
    name: data.name,
    type: data.type,
    createdAt: project.createdAt.toISOString(),
  });
  localStorage.setItem('ntfly_projects', JSON.stringify(projects));
  localStorage.setItem(`ntfly_project_${project.id}`, JSON.stringify(project));

  return project;
}

// Download project as ZIP
export async function downloadProjectAsZip(project: GeneratedProject): Promise<void> {
  const zip = new JSZip();
  
  // Add all files to ZIP
  Object.entries(project.files).forEach(([filename, content]) => {
    zip.file(filename, content);
  });

  // Generate ZIP blob
  const blob = await zip.generateAsync({ 
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  // Download file
  const safeName = project.data.name.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_');
  saveAs(blob, `${safeName}_ntfly.zip`);
}

// Get project by ID
export function getProjectById(projectId: string): GeneratedProject | null {
  const stored = localStorage.getItem(`ntfly_project_${projectId}`);
  if (stored) {
    return JSON.parse(stored);
  }
  return null;
}

// Get all projects
export function getAllProjects(): Array<{ id: string; name: string; type: string; createdAt: string }> {
  return JSON.parse(localStorage.getItem('ntfly_projects') || '[]');
}
