import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();
  const paragraphs = ['about.text1', 'about.text2', 'about.text3', 'about.text4'];

  return (
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-neon-green">{t('about.title')}</span>
        <h1 className="title bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent">{t('about.title')}</h1>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-neon-purple via-neon-green to-transparent" />

      <div className="space-y-6">
        {paragraphs.map((key, index) => (
          <p key={key} className="body relative pl-4 border-l-2 border-transparent hover:border-neon-purple transition-colors">
            {t(key)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;