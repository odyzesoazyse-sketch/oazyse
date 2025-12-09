import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

const InstituteSection = () => {
  const { t } = useTranslation();

  const sections = [
    { titleKey: 'institute.coursesTitle', textKey: 'institute.coursesText', num: '01' },
    { titleKey: 'institute.testsTitle', textKey: 'institute.testsText', num: '02' },
    { titleKey: 'institute.chatTitle', textKey: 'institute.chatText', num: '03' },
  ];

  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-24 py-12 pb-32">
      {/* Hero */}
      <div className="mb-16 animate-slide-up">
        <span className="yeezy-label text-muted-foreground">{t('institute.title')}</span>
        <h1 className="font-display text-huge tracking-tight mt-4 mb-8">
          ИНСТИТУТ
        </h1>
        <p className="yeezy-body text-muted-foreground max-w-2xl">
          {t('institute.description')}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
        {sections.map((section, index) => (
          <div 
            key={section.titleKey} 
            className="p-8 md:p-12 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 group cursor-pointer hover:bg-muted transition-colors animate-slide-up"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="space-y-6">
              <span className="font-display text-6xl text-muted-foreground/20 group-hover:text-muted-foreground/40 transition-colors">
                {section.num}
              </span>
              
              <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                {t(section.titleKey)}
              </h3>
              
              <p className="yeezy-body text-muted-foreground">
                {t(section.textKey)}
              </p>
              
              <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                <span className="yeezy-label">ПОДРОБНЕЕ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstituteSection;