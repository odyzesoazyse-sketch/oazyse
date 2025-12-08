import { useTranslation } from 'react-i18next';

const InstituteSection = () => {
  const { t } = useTranslation();

  const sections = [
    { titleKey: 'institute.coursesTitle', textKey: 'institute.coursesText' },
    { titleKey: 'institute.testsTitle', textKey: 'institute.testsText' },
    { titleKey: 'institute.chatTitle', textKey: 'institute.chatText' },
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-6 animate-fade-up">
        <h2 className="text-xs font-semibold uppercase tracking-widest">{t('institute.title')}</h2>
        <p className="text-sm md:text-base leading-relaxed font-serif text-pretty">{t('institute.description')}</p>
      </div>

      {sections.map((section, index) => (
        <div 
          key={section.titleKey} 
          className="space-y-4 animate-fade-up"
          style={{ animationDelay: `${(index + 1) * 100}ms` }}
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest">{t(section.titleKey)}</h3>
          <p className="text-sm md:text-base leading-relaxed font-serif text-pretty">{t(section.textKey)}</p>
        </div>
      ))}
    </div>
  );
};

export default InstituteSection;
