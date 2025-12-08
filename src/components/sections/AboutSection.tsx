import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();

  const paragraphs = ['about.text1', 'about.text2', 'about.text3', 'about.text4'];

  return (
    <div className="space-y-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest animate-fade-up">{t('about.title')}</h2>
      <div className="space-y-6">
        {paragraphs.map((key, index) => (
          <p 
            key={key}
            className="text-sm md:text-base leading-relaxed font-serif text-pretty animate-fade-up"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            {t(key)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
