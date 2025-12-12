import { useTranslation } from 'react-i18next';

const InstituteSection = () => {
  const { t } = useTranslation();

  const sections = [
    { titleKey: 'institute.coursesTitle', textKey: 'institute.coursesText' },
    { titleKey: 'institute.testsTitle', textKey: 'institute.testsText' },
    { titleKey: 'institute.chatTitle', textKey: 'institute.chatText' },
  ];

  const colors = ['neon-purple', 'neon-green', 'neon-purple'];

  return (
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-neon-green">{t('institute.title')}</span>
        <h1 className="title bg-gradient-to-r from-neon-green to-neon-purple bg-clip-text text-transparent">{t('institute.title')}</h1>
        <p className="body">{t('institute.description')}</p>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-neon-green via-neon-purple to-transparent" />

      <div className="space-y-8">
        {sections.map((section, index) => (
          <div 
            key={section.titleKey} 
            className={`py-4 border-b border-border hover:border-${colors[index]} transition-all group cursor-default relative`}
          >
            <span className={`text-[10px] uppercase tracking-[0.2em] ${index % 2 === 0 ? 'text-neon-purple' : 'text-neon-green'}`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 text-sm group-hover:text-neon-purple transition-colors">{t(section.titleKey)}</h3>
            <p className="mt-2 body">{t(section.textKey)}</p>
            <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${index % 2 === 0 ? 'bg-neon-purple/30' : 'bg-neon-green/30'} group-hover:${index % 2 === 0 ? 'bg-neon-purple' : 'bg-neon-green'} transition-colors`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstituteSection;