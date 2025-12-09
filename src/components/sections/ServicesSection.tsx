import { useTranslation } from 'react-i18next';

const serviceKeys = ['tea', 'satsang', 'hypnotherapy', 'meditation', 'consultations'];

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="label">{t('services.title')}</span>
        <h1 className="title">{t('services.title')}</h1>
      </div>

      <div className="space-y-8">
        {serviceKeys.map((key, index) => (
          <div key={key} className="py-4 border-b border-border">
            <span className="label">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-2 text-sm">{t(`services.items.${key}.title`)}</h3>
            <p className="mt-2 body">{t(`services.items.${key}.description`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;