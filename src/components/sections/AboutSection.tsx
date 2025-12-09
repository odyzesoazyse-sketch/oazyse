import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();
  const paragraphs = ['about.text1', 'about.text2', 'about.text3', 'about.text4'];

  return (
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="label">{t('about.title')}</span>
        <h1 className="title">{t('about.title')}</h1>
      </div>

      <div className="space-y-6">
        {paragraphs.map((key) => (
          <p key={key} className="body">{t(key)}</p>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;