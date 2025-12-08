import { useTranslation } from 'react-i18next';

const InstituteSection = () => {
  const { t } = useTranslation();

  const sections = [
    { titleKey: 'institute.coursesTitle', textKey: 'institute.coursesText' },
    { titleKey: 'institute.testsTitle', textKey: 'institute.testsText' },
    { titleKey: 'institute.chatTitle', textKey: 'institute.chatText' },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-6 animate-fade-up">
        <h2 className="section-title">{t('institute.title')}</h2>
        <p className="text-sm md:text-base leading-[1.8] font-serif text-muted-foreground text-pretty">
          {t('institute.description')}
        </p>
      </div>

      <div className="grid gap-4">
        {sections.map((section, index) => (
          <div 
            key={section.titleKey} 
            className="content-card animate-fade-up"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] mb-3">
              {t(section.titleKey)}
            </h3>
            <p className="text-sm leading-relaxed font-serif text-muted-foreground text-pretty">
              {t(section.textKey)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstituteSection;
