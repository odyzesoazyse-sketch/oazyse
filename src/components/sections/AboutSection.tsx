import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <h2 className="font-bold uppercase text-base md:text-lg">{t('about.title')}</h2>
      <div className="space-y-4">
        <p className="text-sm md:text-base leading-relaxed">{t('about.text1')}</p>
        <p className="text-sm md:text-base leading-relaxed">{t('about.text2')}</p>
        <p className="text-sm md:text-base leading-relaxed">{t('about.text3')}</p>
        <p className="text-sm md:text-base leading-relaxed">{t('about.text4')}</p>
      </div>
    </div>
  );
};

export default AboutSection;
