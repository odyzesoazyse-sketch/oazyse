import { useTranslation } from 'react-i18next';

const serviceKeys = ['tea', 'satsang', 'hypnotherapy', 'meditation', 'consultations'];

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      <h2 className="text-xs font-semibold uppercase tracking-widest animate-fade-up">{t('services.title')}</h2>
      {serviceKeys.map((key, index) => (
        <div 
          key={key} 
          className="space-y-3 animate-fade-up"
          style={{ animationDelay: `${(index + 1) * 80}ms` }}
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest">{t(`services.items.${key}.title`)}</h3>
          <p className="text-sm md:text-base leading-relaxed font-serif text-pretty">{t(`services.items.${key}.description`)}</p>
        </div>
      ))}
    </div>
  );
};

export default ServicesSection;
