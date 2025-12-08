import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();

  const paragraphs = ['about.text1', 'about.text2', 'about.text3', 'about.text4'];

  return (
    <div className="space-y-8">
      <h2 className="section-title animate-fade-up">{t('about.title')}</h2>
      
      <div className="space-y-6">
        {paragraphs.map((key, index) => (
          <p 
            key={key}
            className="text-sm md:text-base leading-[1.8] font-serif text-muted-foreground text-pretty animate-fade-up"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            {t(key)}
          </p>
        ))}
      </div>

      <div className="pt-6 border-t border-border/30 animate-fade-up" style={{ animationDelay: '500ms' }}>
        <p className="text-xs text-muted-foreground/60 tracking-wider uppercase">
          15+ лет практики
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
