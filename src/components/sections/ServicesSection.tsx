import { useTranslation } from 'react-i18next';

const serviceKeys = ['tea', 'satsang', 'hypnotherapy', 'meditation', 'consultations'];

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <h2 className="font-bold uppercase text-base md:text-lg">{t('services.title')}</h2>
      {serviceKeys.map((key) => (
        <div key={key} className="space-y-2">
          <h3 className="font-bold uppercase text-sm md:text-base">{t(`services.items.${key}.title`)}</h3>
          <p className="text-sm md:text-base leading-relaxed">{t(`services.items.${key}.description`)}</p>
        </div>
      ))}
    </div>
  );
};

export default ServicesSection;
