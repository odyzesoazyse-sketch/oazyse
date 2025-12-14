import { useTranslation } from 'react-i18next';
import { GraduationCap, TestTube, Users, Eye } from 'lucide-react';

const InstituteSection = () => {
  const { t } = useTranslation();

  const sections = [
    { titleKey: 'institute.coursesTitle', textKey: 'institute.coursesText', icon: GraduationCap },
    { titleKey: 'institute.testsTitle', textKey: 'institute.testsText', icon: TestTube },
    { titleKey: 'institute.chatTitle', textKey: 'institute.chatText', icon: Users },
  ];

  return (
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-neon-green">{t('institute.title')}</span>
        <h1 className="title bg-gradient-to-r from-neon-green via-neon-purple to-neon-green bg-clip-text text-transparent">
          {t('institute.title')}
        </h1>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-neon-green via-neon-purple to-transparent animate-neon-line-pulse" />

      {/* Description */}
      <div className="space-y-4">
        <p className="body text-muted-foreground">{t('institute.description')}</p>
        <p className="body text-muted-foreground relative pl-4 border-l-2 border-neon-purple">
          {t('institute.vision')}
        </p>
      </div>

      {/* Vision Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-green flex items-center justify-center animate-neon-pulse-purple">
          <Eye className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={section.titleKey} 
              className={`p-6 border border-border rounded-lg hover:border-${isEven ? 'neon-purple' : 'neon-green'} hover:shadow-[0_0_25px_hsl(var(--${isEven ? 'neon-purple' : 'neon-green'})/0.2)] transition-all group cursor-default`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${isEven ? 'from-neon-purple to-neon-green' : 'from-neon-green to-neon-purple'} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <span className={`text-[10px] uppercase tracking-[0.2em] ${isEven ? 'text-neon-purple' : 'text-neon-green'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-sm font-medium group-hover:text-neon-purple transition-colors">
                    {t(section.titleKey)}
                  </h3>
                  <p className="mt-2 body text-muted-foreground">{t(section.textKey)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="text-center p-4 border border-neon-purple/30 rounded-lg hover:border-neon-purple transition-all">
          <div className="text-xl font-light text-neon-purple">50%</div>
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1">EQ Growth</div>
        </div>
        <div className="text-center p-4 border border-neon-green/30 rounded-lg hover:border-neon-green transition-all">
          <div className="text-xl font-light text-neon-green">2-3x</div>
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1">Faster</div>
        </div>
        <div className="text-center p-4 border border-neon-purple/30 rounded-lg hover:border-neon-purple transition-all">
          <div className="text-xl font-light text-neon-purple">AI</div>
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1">Powered</div>
        </div>
      </div>
    </div>
  );
};

export default InstituteSection;
