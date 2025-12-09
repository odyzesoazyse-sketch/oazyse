import { useTranslation } from 'react-i18next';

const InstituteSection = () => {
  const { t } = useTranslation();

  const sections = [
    { titleKey: 'institute.coursesTitle', textKey: 'institute.coursesText' },
    { titleKey: 'institute.testsTitle', textKey: 'institute.testsText' },
    { titleKey: 'institute.chatTitle', textKey: 'institute.chatText' },
  ];

  return (
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="label">{t('institute.title')}</span>
        <h1 className="title">{t('institute.title')}</h1>
        <p className="body">{t('institute.description')}</p>
      </div>

      <div className="space-y-8">
        {sections.map((section, index) => (
          <div key={section.titleKey} className="py-4 border-b border-border">
            <span className="label">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-2 text-sm">{t(section.titleKey)}</h3>
            <p className="mt-2 body">{t(section.textKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstituteSection;