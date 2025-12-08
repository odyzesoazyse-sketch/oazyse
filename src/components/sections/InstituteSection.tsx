import { useTranslation } from 'react-i18next';

const InstituteSection = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-bold uppercase text-base md:text-lg">{t('institute.title')}</h2>
        <p className="text-sm md:text-base leading-relaxed">{t('institute.description')}</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold uppercase text-base">{t('institute.coursesTitle')}</h3>
        <p className="text-sm md:text-base leading-relaxed">{t('institute.coursesText')}</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold uppercase text-base">{t('institute.testsTitle')}</h3>
        <p className="text-sm md:text-base leading-relaxed">{t('institute.testsText')}</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold uppercase text-base">{t('institute.chatTitle')}</h3>
        <p className="text-sm md:text-base leading-relaxed">{t('institute.chatText')}</p>
      </div>
    </div>
  );
};

export default InstituteSection;
